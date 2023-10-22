var image1 = ui.import && ui.import("image1", "image", {
      "id": "users/201501824/ZONE_1/2000/ET2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/ET2000"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/201501824/ZONE_1/2000/LAI2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/LAI2000"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/201501824/ZONE_1/2000/LST2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/LST2000"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/201501824/ZONE_1/2000/NDVI2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/NDVI2000"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/201501824/ZONE_1/2000/b1_2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/b1_2000"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/201501824/ZONE_1/2000/b2_2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/b2_2000"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/201501824/ZONE_1/2000/b3_2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/b3_2000"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/201501824/ZONE_1/2000/b4_2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/b4_2000"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/201501824/ZONE_1/2000/b6_2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/b6_2000"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/201501824/soil_clip"
    }) || ee.Image("users/201501824/soil_clip"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/201501824/permafrost"
    }) || ee.Image("users/201501824/permafrost"),
    sampleData_1 = ui.import && ui.import("sampleData_1", "table", {
      "id": "users/201501824/Alaska_plots_2000_5"
    }) || ee.FeatureCollection("users/201501824/Alaska_plots_2000_5"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/0219135/elizabeth"
    }) || ee.FeatureCollection("users/0219135/elizabeth"),
    b3 = ui.import && ui.import("b3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -125.06082768048478,
            58.293409579456004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.79715580548478,
            57.98023349985914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.55545658673478,
            57.81675966291843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.07205814923478,
            57.16731413584637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.61014408673478,
            58.37415442210576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.11551518048478,
            58.523620222060764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.52176518048478,
            58.23562167644203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.33016295149025,
            56.78133677730448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.51668638899025,
            57.057177095494545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.15389342024025,
            57.295384364415355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.68123717024025,
            57.52026177007723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.21386934632055,
            57.2375720330901
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.89502169007055,
            57.58079151070531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.98291231507055,
            57.93247150676468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.16943575257056,
            58.5339792836446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.60888887757056,
            58.59128024649995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.91650606507056,
            58.682766937454836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -129.77343965882056,
            58.989768878131855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -130.21289278382056,
            59.31649089878194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.84742453275302,
            56.96525490518017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.75953390775302,
            56.72491696907411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.45191672025302,
            55.94541835444008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.15455343900302,
            56.47089806002097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.93482687650302,
            56.239597231178614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.61549093900302,
            57.275392173646686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.96705343900302,
            56.9892038821276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.81324484525302,
            56.91731073322619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -129.58228781400302,
            57.156415886905336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.65203152744976,
            53.65827288422233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.86101590244976,
            53.26583047728138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.57652824339416,
            53.176510475262035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.35680168089416,
            53.20284109365793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.60973136839416,
            52.76631534895803
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.92857902464416,
            52.3119378520791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.17027824339416,
            52.51297826660205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.22545402464416,
            51.77134120758434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.98375480589416,
            51.70330644530802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.08287589964416,
            50.71221727933617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.77477043089416,
            51.90710358660441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.19225089964416,
            52.1369609271034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.60973136839416,
            52.40587075708847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.11510246214416,
            52.553076427752586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.62047355589416,
            52.71310312586644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.74156730589416,
            52.1369609271034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.92857902464416,
            51.744139594121194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.73082511839416,
            51.457532521282296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.33531730589416,
            51.33414677090081
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.02770011839416,
            51.14155145152882
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.71959464964416,
            51.41644091353579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.07115714964416,
            51.70330644530802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.67516105589416,
            52.75301838348701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.11461418089416,
            52.93880669250067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.11461418089416,
            52.71310312586644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.54381339964416,
            51.04495128492217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.95055168089416,
            50.8650152977535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.59898918089416,
            50.62866232435877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.19273918089416,
            50.5170243029598
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.88512199339416,
            50.670458391070326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.81685975393809,
            51.702798291598754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.47079041800059,
            51.82179325898661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.48177674612559,
            51.937088203155575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.57241395315684,
            51.85234128515274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.52022889456309,
            51.617609791775656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.11373475393809,
            51.690881541872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.03957703909434,
            51.60055287059243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.87203553518809,
            51.5459276487886
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.95717957815684,
            51.43476799728175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.48751405081309,
            51.4604442823613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.34194520315684,
            51.36622730034846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.39962342581309,
            51.218516826896995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.25631287893809,
            51.37822933728175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.36892274221934,
            51.68917889288525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.59414246878184,
            51.908292183804626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.37441590628184,
            51.85573423104227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.90629384784533,
            52.16326247868967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.77421376972033,
            52.19526198973734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97495839862658,
            52.478877005895434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.20591542987658,
            52.44373383569239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.71702382831408,
            52.35994667583804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.73624990253283,
            52.45377760403183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.81315419940783,
            52.5256909376726
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.20276696171462,
            52.71261089500424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.27967125858962,
            52.75252660309529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32062584843337,
            53.01769823925788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.56781823124587,
            53.02595873184869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.81226403202712,
            53.0276106405687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.03748375858962,
            53.55853738378565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.10614830937087,
            53.583002401765896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.33411461796462,
            53.483423042460615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.47419030155837,
            53.440908181160665
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.58680016483962,
            53.46544118155954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96881920780837,
            53.37869446974402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.68042809452712,
            53.54874741313592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.81501061405837,
            53.581371840899855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.01825768437087,
            53.53895517729582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.39704186405837,
            53.9078517948327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.70764977421462,
            53.94019870132661
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.29566246952712,
            53.66770491825171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.36133629765212,
            54.047288585245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.54535729374587,
            54.027933288336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19379479374587,
            54.11818092921164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.60852868046462,
            54.185737972683135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.75135094608962,
            54.3012936933008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.96558434452712,
            54.46284770362298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.14411217655837,
            54.41013265909524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.40082810203825,
            54.547678557013995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.584849098132,
            54.59544317956949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.52167771141325,
            54.649508776020916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.49421189110075,
            54.708263257461354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.66999314110075,
            54.72412825396914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.9528910903195,
            54.90297161380292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.89521286766325,
            54.95662802877072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.3816020278195,
            54.83342760924424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.60956833641325,
            54.83342760924424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.78010056297575,
            54.616123803427605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.69770310203825,
            54.566791122792715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.56586716453825,
            54.45198131542776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.50544235985075,
            54.39925227949445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.5246684340695,
            54.271142544901245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.398325660632,
            54.23423709332391
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 4
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
            ee.Geometry.Point([-125.06082768048478, 58.293409579456004]),
            {
              "Name": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.79715580548478, 57.98023349985914]),
            {
              "Name": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.55545658673478, 57.81675966291843]),
            {
              "Name": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.07205814923478, 57.16731413584637]),
            {
              "Name": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.61014408673478, 58.37415442210576]),
            {
              "Name": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.11551518048478, 58.523620222060764]),
            {
              "Name": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.52176518048478, 58.23562167644203]),
            {
              "Name": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.33016295149025, 56.78133677730448]),
            {
              "Name": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.51668638899025, 57.057177095494545]),
            {
              "Name": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.15389342024025, 57.295384364415355]),
            {
              "Name": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.68123717024025, 57.52026177007723]),
            {
              "Name": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.21386934632055, 57.2375720330901]),
            {
              "Name": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.89502169007055, 57.58079151070531]),
            {
              "Name": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.98291231507055, 57.93247150676468]),
            {
              "Name": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.16943575257056, 58.5339792836446]),
            {
              "Name": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.60888887757056, 58.59128024649995]),
            {
              "Name": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.91650606507056, 58.682766937454836]),
            {
              "Name": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-129.77343965882056, 58.989768878131855]),
            {
              "Name": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-130.21289278382056, 59.31649089878194]),
            {
              "Name": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.84742453275302, 56.96525490518017]),
            {
              "Name": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.75953390775302, 56.72491696907411]),
            {
              "Name": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.45191672025302, 55.94541835444008]),
            {
              "Name": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.15455343900302, 56.47089806002097]),
            {
              "Name": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.93482687650302, 56.239597231178614]),
            {
              "Name": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.61549093900302, 57.275392173646686]),
            {
              "Name": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.96705343900302, 56.9892038821276]),
            {
              "Name": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.81324484525302, 56.91731073322619]),
            {
              "Name": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-129.58228781400302, 57.156415886905336]),
            {
              "Name": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.65203152744976, 53.65827288422233]),
            {
              "Name": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.86101590244976, 53.26583047728138]),
            {
              "Name": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.57652824339416, 53.176510475262035]),
            {
              "Name": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.35680168089416, 53.20284109365793]),
            {
              "Name": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.60973136839416, 52.76631534895803]),
            {
              "Name": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.92857902464416, 52.3119378520791]),
            {
              "Name": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.17027824339416, 52.51297826660205]),
            {
              "Name": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.22545402464416, 51.77134120758434]),
            {
              "Name": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.98375480589416, 51.70330644530802]),
            {
              "Name": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.08287589964416, 50.71221727933617]),
            {
              "Name": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.77477043089416, 51.90710358660441]),
            {
              "Name": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.19225089964416, 52.1369609271034]),
            {
              "Name": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.60973136839416, 52.40587075708847]),
            {
              "Name": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.11510246214416, 52.553076427752586]),
            {
              "Name": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.62047355589416, 52.71310312586644]),
            {
              "Name": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.74156730589416, 52.1369609271034]),
            {
              "Name": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.92857902464416, 51.744139594121194]),
            {
              "Name": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.73082511839416, 51.457532521282296]),
            {
              "Name": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.33531730589416, 51.33414677090081]),
            {
              "Name": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.02770011839416, 51.14155145152882]),
            {
              "Name": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.71959464964416, 51.41644091353579]),
            {
              "Name": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.07115714964416, 51.70330644530802]),
            {
              "Name": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.67516105589416, 52.75301838348701]),
            {
              "Name": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.11461418089416, 52.93880669250067]),
            {
              "Name": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.11461418089416, 52.71310312586644]),
            {
              "Name": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.54381339964416, 51.04495128492217]),
            {
              "Name": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.95055168089416, 50.8650152977535]),
            {
              "Name": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.59898918089416, 50.62866232435877]),
            {
              "Name": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.19273918089416, 50.5170243029598]),
            {
              "Name": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.88512199339416, 50.670458391070326]),
            {
              "Name": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.81685975393809, 51.702798291598754]),
            {
              "Name": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.47079041800059, 51.82179325898661]),
            {
              "Name": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.48177674612559, 51.937088203155575]),
            {
              "Name": 4,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.57241395315684, 51.85234128515274]),
            {
              "Name": 4,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.52022889456309, 51.617609791775656]),
            {
              "Name": 4,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.11373475393809, 51.690881541872]),
            {
              "Name": 4,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.03957703909434, 51.60055287059243]),
            {
              "Name": 4,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.87203553518809, 51.5459276487886]),
            {
              "Name": 4,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.95717957815684, 51.43476799728175]),
            {
              "Name": 4,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.48751405081309, 51.4604442823613]),
            {
              "Name": 4,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.34194520315684, 51.36622730034846]),
            {
              "Name": 4,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.39962342581309, 51.218516826896995]),
            {
              "Name": 4,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.25631287893809, 51.37822933728175]),
            {
              "Name": 4,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.36892274221934, 51.68917889288525]),
            {
              "Name": 4,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.59414246878184, 51.908292183804626]),
            {
              "Name": 4,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.37441590628184, 51.85573423104227]),
            {
              "Name": 4,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.90629384784533, 52.16326247868967]),
            {
              "Name": 4,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.77421376972033, 52.19526198973734]),
            {
              "Name": 4,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97495839862658, 52.478877005895434]),
            {
              "Name": 4,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.20591542987658, 52.44373383569239]),
            {
              "Name": 4,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.71702382831408, 52.35994667583804]),
            {
              "Name": 4,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.73624990253283, 52.45377760403183]),
            {
              "Name": 4,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.81315419940783, 52.5256909376726]),
            {
              "Name": 4,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.20276696171462, 52.71261089500424]),
            {
              "Name": 4,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.27967125858962, 52.75252660309529]),
            {
              "Name": 4,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32062584843337, 53.01769823925788]),
            {
              "Name": 4,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.56781823124587, 53.02595873184869]),
            {
              "Name": 4,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.81226403202712, 53.0276106405687]),
            {
              "Name": 4,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.03748375858962, 53.55853738378565]),
            {
              "Name": 4,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.10614830937087, 53.583002401765896]),
            {
              "Name": 4,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.33411461796462, 53.483423042460615]),
            {
              "Name": 4,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.47419030155837, 53.440908181160665]),
            {
              "Name": 4,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.58680016483962, 53.46544118155954]),
            {
              "Name": 4,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96881920780837, 53.37869446974402]),
            {
              "Name": 4,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.68042809452712, 53.54874741313592]),
            {
              "Name": 4,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.81501061405837, 53.581371840899855]),
            {
              "Name": 4,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.01825768437087, 53.53895517729582]),
            {
              "Name": 4,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.39704186405837, 53.9078517948327]),
            {
              "Name": 4,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.70764977421462, 53.94019870132661]),
            {
              "Name": 4,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.29566246952712, 53.66770491825171]),
            {
              "Name": 4,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.36133629765212, 54.047288585245]),
            {
              "Name": 4,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.54535729374587, 54.027933288336]),
            {
              "Name": 4,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19379479374587, 54.11818092921164]),
            {
              "Name": 4,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.60852868046462, 54.185737972683135]),
            {
              "Name": 4,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.75135094608962, 54.3012936933008]),
            {
              "Name": 4,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.96558434452712, 54.46284770362298]),
            {
              "Name": 4,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.14411217655837, 54.41013265909524]),
            {
              "Name": 4,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.40082810203825, 54.547678557013995]),
            {
              "Name": 4,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.584849098132, 54.59544317956949]),
            {
              "Name": 4,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.52167771141325, 54.649508776020916]),
            {
              "Name": 4,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.49421189110075, 54.708263257461354]),
            {
              "Name": 4,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.66999314110075, 54.72412825396914]),
            {
              "Name": 4,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.9528910903195, 54.90297161380292]),
            {
              "Name": 4,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.89521286766325, 54.95662802877072]),
            {
              "Name": 4,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.3816020278195, 54.83342760924424]),
            {
              "Name": 4,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.60956833641325, 54.83342760924424]),
            {
              "Name": 4,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.78010056297575, 54.616123803427605]),
            {
              "Name": 4,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.69770310203825, 54.566791122792715]),
            {
              "Name": 4,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.56586716453825, 54.45198131542776]),
            {
              "Name": 4,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.50544235985075, 54.39925227949445]),
            {
              "Name": 4,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.5246684340695, 54.271142544901245]),
            {
              "Name": 4,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.398325660632, 54.23423709332391]),
            {
              "Name": 4,
              "system:index": "119"
            })]),
    f1 = ui.import && ui.import("f1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -122.13609855589416,
            53.81696622607121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.67467277464416,
            53.08422593539209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.85045402464416,
            53.56977425819778
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.52086418089416,
            53.946484803929366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.20201652464416,
            54.39664628292595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.67467277464416,
            52.872544980955176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.60875480589416,
            52.52634838878648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.92760246214416,
            52.325369064648044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.70787589964416,
            52.06947842781172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.78502433714416,
            51.59423768537802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.38951652464416,
            51.34787273534501
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.84020011839416,
            50.80951016385188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.48863761839416,
            49.67128966530348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.09312980589416,
            49.44323594112717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.88414543089416,
            50.41912393718213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.79625480589416,
            49.72813674997573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.11510246214416,
            49.1710379693361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.03844230589416,
            48.98393030973061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.42320793089416,
            48.91177809717541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.89586418089416,
            49.08476816942367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.72008293089416,
            48.723693899040164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.90660636839416,
            48.651165861646106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.67564933714416,
            48.79611749491718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.84020011839416,
            49.156670092695954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.25768058714416,
            49.44323594112717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.03795402464416,
            49.67128966530348
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.13658683714416,
            49.62861070116556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.16544514826381,
            48.37660178279274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.67081624201381,
            47.30000845496635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.34122639826381,
            47.00114896283997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.61564046076381,
            48.11321497499003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.38517171076381,
            48.405783277783854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.57218342951381,
            48.7256757454282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.75870686701381,
            47.8632147643875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.49503499201381,
            46.76085099353016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.93942430120711,
            52.55654965736226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.70846726995711,
            53.087656973692994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.34567430120711,
            53.390109881038825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.01559617620711,
            54.271864324677914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.60885789495711,
            54.45110309980861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.46627976995711,
            54.48940970911482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23606632898998,
            53.82656101669562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.34867619227123,
            53.82980312978551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.43382023523998,
            53.83304499195919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.88700627039623,
            53.8346658289553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.07377384852123,
            53.820076037731056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.94743107508373,
            53.8346658289553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.17814396570873,
            54.09158180241653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.41145159540304,
            54.130973392117355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.60645891962179,
            54.278766124136375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.78498675165304,
            54.27395513238102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.95802141962179,
            54.42443276760895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.57349993524679,
            54.23384168724709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.55427386102804,
            54.14545471174705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.74378802118429,
            54.10682660616906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.93604876337179,
            54.10843682958679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.29609515009054,
            54.095553291256
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22193743524679,
            54.23063092596703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.07636858759054,
            54.23384168724709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.36201311884054,
            54.31883588217527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.50483538446554,
            54.3220397783415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.54353167352804,
            53.82245222582309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.42542864618429,
            53.81758810871524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.90882708368429,
            53.80461436922557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.03293720864951,
            53.4586532036429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.22519795083701,
            53.57623323589239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.38724629068076,
            53.660949324072654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.48337666177451,
            53.67884825374623
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.90384785318076,
            53.455382432823285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.95877949380576,
            53.40137833412095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19223896646201,
            53.26688910531527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.32706562661826,
            53.16821354066721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.24741474771201,
            53.12208712813166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.63193623208701,
            53.22251323027158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.05253114416192,
            52.97012542586599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.71470155431817,
            52.61636925349795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.61857118322442,
            52.541263640006804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.48124208166192,
            52.664702487845766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.53617372228692,
            52.737933715567046
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.58561219884942,
            52.7146461978516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.66251649572442,
            52.794437350608845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.08549012853692,
            52.86745089671184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.15140809728692,
            52.9965825693856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.82181490789694,
            59.422618862153406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.25052584539694,
            58.722487950810354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.15189303289694,
            57.84463733228433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.09720553289694,
            58.193758708160466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.26224459539694,
            57.86801817651215
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.98783053289694,
            57.44483451639445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.32962740789695,
            56.413783236112856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.25247897039695,
            56.992766468528664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.08743990789695,
            56.728504812258834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.46048678289694,
            57.08839929086775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.04251803289694,
            57.11226904561712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.28372897039694,
            57.58644439195737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.55814303289694,
            58.28628321929308
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.88822115789694,
            58.92722419396036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.99857272039694,
            58.92722419396036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.98783053289694,
            58.42461792912866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.56009615789695,
            57.961389802337486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.15384615789695,
            58.05451891382879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -113.75833834539695,
            57.20759443396038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -112.79154147039695,
            55.801160935836585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -113.53861178289695,
            56.55936479629112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.63724459539695,
            56.04738030811919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.77982272039695,
            56.02282872854945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -112.04447115789695,
            55.50362890830632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.39768399801677,
            55.292168557481965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -108.85959806051677,
            54.940310607485834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.82737149801677,
            54.813894977942226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -104.42112149801677,
            54.32989113762851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.39963712301677,
            53.94371297259594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -111.40359952979689,
            55.31778959424171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -113.68875577979689,
            55.715869560480314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -113.95242765479689,
            55.29277575995107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.49051359229689,
            54.81450947703727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.54520109229689,
            54.45843795217914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.23758390479689,
            55.864113011028984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.54520109229689,
            56.69354807350735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.58914640479689,
            57.43420840295708
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.75418546729689,
            57.599414526398746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.97290098505603,
            57.37421533307804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.79062643874477,
            56.884635310784624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.94443503249477,
            57.05231721463181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.81284323561977,
            56.57727144682396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.27353659499477,
            56.84259682669288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.75693503249477,
            56.69207333989317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.11157427126625,
            56.35773767760266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.70483599001625,
            56.52777882558033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.19946489626625,
            56.76335605542859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.40940045290927,
            55.104475251449124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.14548443728427,
            54.864927874412686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.04636334353427,
            54.4965412524446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.32102154665927,
            55.154724255538014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.93576764040927,
            52.86533810775911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.21091412478427,
            51.16162778403585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.10080670290927,
            52.32478679755509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.66110943728427,
            52.652583755012785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -129.60593365603427,
            53.41888447839458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -130.08933209353427,
            53.431977291622154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.78582554900187,
            54.71508380547306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -114.74188023650187,
            55.76728572037359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -113.02801304900187,
            55.34474760216224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -111.79754429900187,
            55.21960570900814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -111.84148961150187,
            56.282992620323
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -112.50066929900187,
            56.57459766770461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -112.50066929900187,
            57.151123322538446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.74285679900187,
            55.144331112675175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.68816929900187,
            55.01855723956388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.07293492400187,
            54.86710605665255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -108.45770054900187,
            54.71508380547306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.62273961150187,
            55.1945299755711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -108.63348179900187,
            55.618673282644416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.42449742400187,
            55.890698268404925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.78680211150187,
            56.20974157485921
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.07391148650187,
            53.998064466972934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.97527867400187,
            53.998064466972934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.52508336150187,
            53.738946196162466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -106.34832554900187,
            54.12702224886047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -108.10613804900187,
            54.613417844520335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.51238804900187,
            54.6388581916146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.17156773650187,
            54.71508380547306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -106.78777867400187,
            55.39469396145687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.07000523650187,
            57.57770743516347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.20184117400187,
            57.36503531956074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.76238804900187,
            57.22256534814519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.04852086150187,
            58.09237960771229
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52117711150187,
            58.138804068323815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.79559117400187,
            58.3700206662211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.76238804900187,
            58.73683927002719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.73992711150187,
            58.64549445860564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.49773961150187,
            58.986805139529494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.42059117400187,
            59.592739555375616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.47527867400187,
            59.70376884641134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.49871617400187,
            56.88798537111152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.79559117400187,
            56.815896922857995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.44402867400187,
            57.60126131955614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.66375523650187,
            57.95274307385282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.55438023650187,
            57.74226461277204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.77410679900187,
            58.138804068323815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30145054900187,
            58.06914469545983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.52996617400187,
            60.1442237159477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.58465367400188,
            60.1442237159477
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.09051304900187,
            59.8144311047397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.78289586150187,
            59.52594547254372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.06902867400187,
            60.60043753196555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -131.44109898650188,
            62.15779157926292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -133.63836461150188,
            62.4437685176595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -135.79168492400188,
            62.50469614027099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -137.59344273650188,
            62.98766036865302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.69207554900188,
            63.48239600392863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -115.39314985722348,
            54.440119787439905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.44783735722348,
            54.26083298651618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.76814985722348,
            54.08076317240899
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -111.26229048222348,
            54.79635100082173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.29549360722348,
            56.409742184604056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -109.81209516972348,
            56.820818711763366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -110.51522016972348,
            56.14136102038866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -111.52596235722348,
            56.16583716996688
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -106.51619673222348,
            55.09921472351174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.13143110722348,
            54.26083298651618
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.72518110722348,
            53.7182679953575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -104.05525923222348,
            53.82215905964204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.00057173222348,
            54.49120100025268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.26424360722348,
            55.59893077360346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -104.93416548222348,
            55.920373276725265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -100.45174360722348,
            53.7182679953575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -100.62752485722348,
            54.94806810569114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.07772016972348,
            54.99851364513709
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 17
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
            ee.Geometry.Point([-122.13609855589416, 53.81696622607121]),
            {
              "Name": 17,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.67467277464416, 53.08422593539209]),
            {
              "Name": 17,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.85045402464416, 53.56977425819778]),
            {
              "Name": 17,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.52086418089416, 53.946484803929366]),
            {
              "Name": 17,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.20201652464416, 54.39664628292595]),
            {
              "Name": 17,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.67467277464416, 52.872544980955176]),
            {
              "Name": 17,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.60875480589416, 52.52634838878648]),
            {
              "Name": 17,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.92760246214416, 52.325369064648044]),
            {
              "Name": 17,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.70787589964416, 52.06947842781172]),
            {
              "Name": 17,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.78502433714416, 51.59423768537802]),
            {
              "Name": 17,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.38951652464416, 51.34787273534501]),
            {
              "Name": 17,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.84020011839416, 50.80951016385188]),
            {
              "Name": 17,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.48863761839416, 49.67128966530348]),
            {
              "Name": 17,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.09312980589416, 49.44323594112717]),
            {
              "Name": 17,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.88414543089416, 50.41912393718213]),
            {
              "Name": 17,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.79625480589416, 49.72813674997573]),
            {
              "Name": 17,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.11510246214416, 49.1710379693361]),
            {
              "Name": 17,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.03844230589416, 48.98393030973061]),
            {
              "Name": 17,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.42320793089416, 48.91177809717541]),
            {
              "Name": 17,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.89586418089416, 49.08476816942367]),
            {
              "Name": 17,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.72008293089416, 48.723693899040164]),
            {
              "Name": 17,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.90660636839416, 48.651165861646106]),
            {
              "Name": 17,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.67564933714416, 48.79611749491718]),
            {
              "Name": 17,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.84020011839416, 49.156670092695954]),
            {
              "Name": 17,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.25768058714416, 49.44323594112717]),
            {
              "Name": 17,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.03795402464416, 49.67128966530348]),
            {
              "Name": 17,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.13658683714416, 49.62861070116556]),
            {
              "Name": 17,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.16544514826381, 48.37660178279274]),
            {
              "Name": 17,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.67081624201381, 47.30000845496635]),
            {
              "Name": 17,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.34122639826381, 47.00114896283997]),
            {
              "Name": 17,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.61564046076381, 48.11321497499003]),
            {
              "Name": 17,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.38517171076381, 48.405783277783854]),
            {
              "Name": 17,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.57218342951381, 48.7256757454282]),
            {
              "Name": 17,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.75870686701381, 47.8632147643875]),
            {
              "Name": 17,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.49503499201381, 46.76085099353016]),
            {
              "Name": 17,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.93942430120711, 52.55654965736226]),
            {
              "Name": 17,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.70846726995711, 53.087656973692994]),
            {
              "Name": 17,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.34567430120711, 53.390109881038825]),
            {
              "Name": 17,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.01559617620711, 54.271864324677914]),
            {
              "Name": 17,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60885789495711, 54.45110309980861]),
            {
              "Name": 17,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.46627976995711, 54.48940970911482]),
            {
              "Name": 17,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23606632898998, 53.82656101669562]),
            {
              "Name": 17,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.34867619227123, 53.82980312978551]),
            {
              "Name": 17,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.43382023523998, 53.83304499195919]),
            {
              "Name": 17,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.88700627039623, 53.8346658289553]),
            {
              "Name": 17,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.07377384852123, 53.820076037731056]),
            {
              "Name": 17,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.94743107508373, 53.8346658289553]),
            {
              "Name": 17,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.17814396570873, 54.09158180241653]),
            {
              "Name": 17,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.41145159540304, 54.130973392117355]),
            {
              "Name": 17,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60645891962179, 54.278766124136375]),
            {
              "Name": 17,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.78498675165304, 54.27395513238102]),
            {
              "Name": 17,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.95802141962179, 54.42443276760895]),
            {
              "Name": 17,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.57349993524679, 54.23384168724709]),
            {
              "Name": 17,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.55427386102804, 54.14545471174705]),
            {
              "Name": 17,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.74378802118429, 54.10682660616906]),
            {
              "Name": 17,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.93604876337179, 54.10843682958679]),
            {
              "Name": 17,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.29609515009054, 54.095553291256]),
            {
              "Name": 17,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22193743524679, 54.23063092596703]),
            {
              "Name": 17,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.07636858759054, 54.23384168724709]),
            {
              "Name": 17,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.36201311884054, 54.31883588217527]),
            {
              "Name": 17,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.50483538446554, 54.3220397783415]),
            {
              "Name": 17,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.54353167352804, 53.82245222582309]),
            {
              "Name": 17,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.42542864618429, 53.81758810871524]),
            {
              "Name": 17,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.90882708368429, 53.80461436922557]),
            {
              "Name": 17,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.03293720864951, 53.4586532036429]),
            {
              "Name": 17,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.22519795083701, 53.57623323589239]),
            {
              "Name": 17,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.38724629068076, 53.660949324072654]),
            {
              "Name": 17,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.48337666177451, 53.67884825374623]),
            {
              "Name": 17,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.90384785318076, 53.455382432823285]),
            {
              "Name": 17,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.95877949380576, 53.40137833412095]),
            {
              "Name": 17,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.19223896646201, 53.26688910531527]),
            {
              "Name": 17,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.32706562661826, 53.16821354066721]),
            {
              "Name": 17,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.24741474771201, 53.12208712813166]),
            {
              "Name": 17,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.63193623208701, 53.22251323027158]),
            {
              "Name": 17,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.05253114416192, 52.97012542586599]),
            {
              "Name": 17,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.71470155431817, 52.61636925349795]),
            {
              "Name": 17,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.61857118322442, 52.541263640006804]),
            {
              "Name": 17,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.48124208166192, 52.664702487845766]),
            {
              "Name": 17,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.53617372228692, 52.737933715567046]),
            {
              "Name": 17,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.58561219884942, 52.7146461978516]),
            {
              "Name": 17,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.66251649572442, 52.794437350608845]),
            {
              "Name": 17,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.08549012853692, 52.86745089671184]),
            {
              "Name": 17,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.15140809728692, 52.9965825693856]),
            {
              "Name": 17,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.82181490789694, 59.422618862153406]),
            {
              "Name": 17,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.25052584539694, 58.722487950810354]),
            {
              "Name": 17,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.15189303289694, 57.84463733228433]),
            {
              "Name": 17,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.09720553289694, 58.193758708160466]),
            {
              "Name": 17,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26224459539694, 57.86801817651215]),
            {
              "Name": 17,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.98783053289694, 57.44483451639445]),
            {
              "Name": 17,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.32962740789695, 56.413783236112856]),
            {
              "Name": 17,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.25247897039695, 56.992766468528664]),
            {
              "Name": 17,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.08743990789695, 56.728504812258834]),
            {
              "Name": 17,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.46048678289694, 57.08839929086775]),
            {
              "Name": 17,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04251803289694, 57.11226904561712]),
            {
              "Name": 17,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.28372897039694, 57.58644439195737]),
            {
              "Name": 17,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.55814303289694, 58.28628321929308]),
            {
              "Name": 17,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.88822115789694, 58.92722419396036]),
            {
              "Name": 17,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.99857272039694, 58.92722419396036]),
            {
              "Name": 17,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.98783053289694, 58.42461792912866]),
            {
              "Name": 17,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.56009615789695, 57.961389802337486]),
            {
              "Name": 17,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.15384615789695, 58.05451891382879]),
            {
              "Name": 17,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-113.75833834539695, 57.20759443396038]),
            {
              "Name": 17,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-112.79154147039695, 55.801160935836585]),
            {
              "Name": 17,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-113.53861178289695, 56.55936479629112]),
            {
              "Name": 17,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.63724459539695, 56.04738030811919]),
            {
              "Name": 17,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.77982272039695, 56.02282872854945]),
            {
              "Name": 17,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-112.04447115789695, 55.50362890830632]),
            {
              "Name": 17,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.39768399801677, 55.292168557481965]),
            {
              "Name": 17,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-108.85959806051677, 54.940310607485834]),
            {
              "Name": 17,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.82737149801677, 54.813894977942226]),
            {
              "Name": 17,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-104.42112149801677, 54.32989113762851]),
            {
              "Name": 17,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.39963712301677, 53.94371297259594]),
            {
              "Name": 17,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-111.40359952979689, 55.31778959424171]),
            {
              "Name": 17,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-113.68875577979689, 55.715869560480314]),
            {
              "Name": 17,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-113.95242765479689, 55.29277575995107]),
            {
              "Name": 17,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.49051359229689, 54.81450947703727]),
            {
              "Name": 17,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.54520109229689, 54.45843795217914]),
            {
              "Name": 17,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.23758390479689, 55.864113011028984]),
            {
              "Name": 17,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.54520109229689, 56.69354807350735]),
            {
              "Name": 17,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.58914640479689, 57.43420840295708]),
            {
              "Name": 17,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.75418546729689, 57.599414526398746]),
            {
              "Name": 17,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.97290098505603, 57.37421533307804]),
            {
              "Name": 17,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.79062643874477, 56.884635310784624]),
            {
              "Name": 17,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.94443503249477, 57.05231721463181]),
            {
              "Name": 17,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.81284323561977, 56.57727144682396]),
            {
              "Name": 17,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.27353659499477, 56.84259682669288]),
            {
              "Name": 17,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.75693503249477, 56.69207333989317]),
            {
              "Name": 17,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.11157427126625, 56.35773767760266]),
            {
              "Name": 17,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.70483599001625, 56.52777882558033]),
            {
              "Name": 17,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.19946489626625, 56.76335605542859]),
            {
              "Name": 17,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.40940045290927, 55.104475251449124]),
            {
              "Name": 17,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.14548443728427, 54.864927874412686]),
            {
              "Name": 17,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.04636334353427, 54.4965412524446]),
            {
              "Name": 17,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.32102154665927, 55.154724255538014]),
            {
              "Name": 17,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.93576764040927, 52.86533810775911]),
            {
              "Name": 17,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.21091412478427, 51.16162778403585]),
            {
              "Name": 17,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.10080670290927, 52.32478679755509]),
            {
              "Name": 17,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.66110943728427, 52.652583755012785]),
            {
              "Name": 17,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([-129.60593365603427, 53.41888447839458]),
            {
              "Name": 17,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([-130.08933209353427, 53.431977291622154]),
            {
              "Name": 17,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.78582554900187, 54.71508380547306]),
            {
              "Name": 17,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([-114.74188023650187, 55.76728572037359]),
            {
              "Name": 17,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([-113.02801304900187, 55.34474760216224]),
            {
              "Name": 17,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([-111.79754429900187, 55.21960570900814]),
            {
              "Name": 17,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([-111.84148961150187, 56.282992620323]),
            {
              "Name": 17,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([-112.50066929900187, 56.57459766770461]),
            {
              "Name": 17,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([-112.50066929900187, 57.151123322538446]),
            {
              "Name": 17,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.74285679900187, 55.144331112675175]),
            {
              "Name": 17,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.68816929900187, 55.01855723956388]),
            {
              "Name": 17,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.07293492400187, 54.86710605665255]),
            {
              "Name": 17,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([-108.45770054900187, 54.71508380547306]),
            {
              "Name": 17,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([-107.62273961150187, 55.1945299755711]),
            {
              "Name": 17,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([-108.63348179900187, 55.618673282644416]),
            {
              "Name": 17,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.42449742400187, 55.890698268404925]),
            {
              "Name": 17,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.78680211150187, 56.20974157485921]),
            {
              "Name": 17,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.07391148650187, 53.998064466972934]),
            {
              "Name": 17,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.97527867400187, 53.998064466972934]),
            {
              "Name": 17,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.52508336150187, 53.738946196162466]),
            {
              "Name": 17,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([-106.34832554900187, 54.12702224886047]),
            {
              "Name": 17,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([-108.10613804900187, 54.613417844520335]),
            {
              "Name": 17,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.51238804900187, 54.6388581916146]),
            {
              "Name": 17,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.17156773650187, 54.71508380547306]),
            {
              "Name": 17,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([-106.78777867400187, 55.39469396145687]),
            {
              "Name": 17,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.07000523650187, 57.57770743516347]),
            {
              "Name": 17,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.20184117400187, 57.36503531956074]),
            {
              "Name": 17,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.76238804900187, 57.22256534814519]),
            {
              "Name": 17,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.04852086150187, 58.09237960771229]),
            {
              "Name": 17,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52117711150187, 58.138804068323815]),
            {
              "Name": 17,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.79559117400187, 58.3700206662211]),
            {
              "Name": 17,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.76238804900187, 58.73683927002719]),
            {
              "Name": 17,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.73992711150187, 58.64549445860564]),
            {
              "Name": 17,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.49773961150187, 58.986805139529494]),
            {
              "Name": 17,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.42059117400187, 59.592739555375616]),
            {
              "Name": 17,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.47527867400187, 59.70376884641134]),
            {
              "Name": 17,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.49871617400187, 56.88798537111152]),
            {
              "Name": 17,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.79559117400187, 56.815896922857995]),
            {
              "Name": 17,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.44402867400187, 57.60126131955614]),
            {
              "Name": 17,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.66375523650187, 57.95274307385282]),
            {
              "Name": 17,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.55438023650187, 57.74226461277204]),
            {
              "Name": 17,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.77410679900187, 58.138804068323815]),
            {
              "Name": 17,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30145054900187, 58.06914469545983]),
            {
              "Name": 17,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.52996617400187, 60.1442237159477]),
            {
              "Name": 17,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.58465367400188, 60.1442237159477]),
            {
              "Name": 17,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.09051304900187, 59.8144311047397]),
            {
              "Name": 17,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.78289586150187, 59.52594547254372]),
            {
              "Name": 17,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.06902867400187, 60.60043753196555]),
            {
              "Name": 17,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([-131.44109898650188, 62.15779157926292]),
            {
              "Name": 17,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([-133.63836461150188, 62.4437685176595]),
            {
              "Name": 17,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([-135.79168492400188, 62.50469614027099]),
            {
              "Name": 17,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([-137.59344273650188, 62.98766036865302]),
            {
              "Name": 17,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.69207554900188, 63.48239600392863]),
            {
              "Name": 17,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([-115.39314985722348, 54.440119787439905]),
            {
              "Name": 17,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.44783735722348, 54.26083298651618]),
            {
              "Name": 17,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.76814985722348, 54.08076317240899]),
            {
              "Name": 17,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([-111.26229048222348, 54.79635100082173]),
            {
              "Name": 17,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.29549360722348, 56.409742184604056]),
            {
              "Name": 17,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([-109.81209516972348, 56.820818711763366]),
            {
              "Name": 17,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([-110.51522016972348, 56.14136102038866]),
            {
              "Name": 17,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([-111.52596235722348, 56.16583716996688]),
            {
              "Name": 17,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([-106.51619673222348, 55.09921472351174]),
            {
              "Name": 17,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([-107.13143110722348, 54.26083298651618]),
            {
              "Name": 17,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.72518110722348, 53.7182679953575]),
            {
              "Name": 17,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([-104.05525923222348, 53.82215905964204]),
            {
              "Name": 17,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.00057173222348, 54.49120100025268]),
            {
              "Name": 17,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.26424360722348, 55.59893077360346]),
            {
              "Name": 17,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([-104.93416548222348, 55.920373276725265]),
            {
              "Name": 17,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([-100.45174360722348, 53.7182679953575]),
            {
              "Name": 17,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([-100.62752485722348, 54.94806810569114]),
            {
              "Name": 17,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.07772016972348, 54.99851364513709]),
            {
              "Name": 17,
              "system:index": "208"
            })]),
    b2 = ui.import && ui.import("b2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -87.86674068658519,
            65.99036427598976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -89.00931881158519,
            66.07961242511192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.40531490533519,
            65.81992920833022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -86.94388912408519,
            65.95457737046341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -87.58109615533519,
            66.30136833283602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -88.81156490533519,
            66.66085845196609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -90.87699459283519,
            66.50367158658987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.22855709283519,
            67.2627468760786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.95365474908519,
            67.36444156303219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -90.34965084283519,
            67.41512717651645
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.68998287408519,
            67.00661448056994
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.56888912408519,
            66.86889698349216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.38187740533519,
            67.13502007941337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.84330318658519,
            67.36444156303219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.40385006158519,
            66.67826226233217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.43705318658519,
            66.3631120627336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -88.50394771783519,
            64.90402664635057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.40433834283519,
            65.329308537333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.63480709283519,
            65.329308537333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.38187740533519,
            65.2005947935834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -94.97358940729328,
            65.63276675840116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.90718315729328,
            65.37768653153697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -90.61906478777568,
            64.99976346763849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -90.90470931902568,
            64.55973546897916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.98136947527568,
            64.33226108204742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -88.07023666277568,
            64.72566854200012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -88.76237533465068,
            64.61756839673436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -89.30070541277568,
            64.74911159504185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -90.47624252215068,
            64.82866606868566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.16838119402568,
            64.81931889291268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -91.54191635027568,
            64.89400552628463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.69548080340068,
            64.935925674096
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.20109603777568,
            65.08907327837247
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.23381088152568,
            64.66932222980773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.43180892840068,
            64.76316767270535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.22282455340068,
            64.9498845017727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.75041244402568,
            64.53739097779336
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 3
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
            ee.Geometry.Point([-87.86674068658519, 65.99036427598976]),
            {
              "Name": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-89.00931881158519, 66.07961242511192]),
            {
              "Name": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.40531490533519, 65.81992920833022]),
            {
              "Name": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-86.94388912408519, 65.95457737046341]),
            {
              "Name": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-87.58109615533519, 66.30136833283602]),
            {
              "Name": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-88.81156490533519, 66.66085845196609]),
            {
              "Name": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-90.87699459283519, 66.50367158658987]),
            {
              "Name": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.22855709283519, 67.2627468760786]),
            {
              "Name": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.95365474908519, 67.36444156303219]),
            {
              "Name": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-90.34965084283519, 67.41512717651645]),
            {
              "Name": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.68998287408519, 67.00661448056994]),
            {
              "Name": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.56888912408519, 66.86889698349216]),
            {
              "Name": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.38187740533519, 67.13502007941337]),
            {
              "Name": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.84330318658519, 67.36444156303219]),
            {
              "Name": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.40385006158519, 66.67826226233217]),
            {
              "Name": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.43705318658519, 66.3631120627336]),
            {
              "Name": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-88.50394771783519, 64.90402664635057]),
            {
              "Name": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.40433834283519, 65.329308537333]),
            {
              "Name": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.63480709283519, 65.329308537333]),
            {
              "Name": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.38187740533519, 65.2005947935834]),
            {
              "Name": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-94.97358940729328, 65.63276675840116]),
            {
              "Name": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.90718315729328, 65.37768653153697]),
            {
              "Name": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-90.61906478777568, 64.99976346763849]),
            {
              "Name": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-90.90470931902568, 64.55973546897916]),
            {
              "Name": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.98136947527568, 64.33226108204742]),
            {
              "Name": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-88.07023666277568, 64.72566854200012]),
            {
              "Name": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-88.76237533465068, 64.61756839673436]),
            {
              "Name": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-89.30070541277568, 64.74911159504185]),
            {
              "Name": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-90.47624252215068, 64.82866606868566]),
            {
              "Name": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.16838119402568, 64.81931889291268]),
            {
              "Name": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-91.54191635027568, 64.89400552628463]),
            {
              "Name": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.69548080340068, 64.935925674096]),
            {
              "Name": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.20109603777568, 65.08907327837247]),
            {
              "Name": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.23381088152568, 64.66932222980773]),
            {
              "Name": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.43180892840068, 64.76316767270535]),
            {
              "Name": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.22282455340068, 64.9498845017727]),
            {
              "Name": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.75041244402568, 64.53739097779336]),
            {
              "Name": 3,
              "system:index": "36"
            })]),
    s2 = ui.import && ui.import("s2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -99.4129077186129,
            64.53046708014386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -101.0828295936129,
            63.60816649381876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.7097827186129,
            63.822230308319575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -99.5886889686129,
            62.836064531279035
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -99.6765795936129,
            62.00190780673693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -99.5007983436129,
            61.355637894426806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.4461108436129,
            62.1254352685956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -101.7859545936129,
            62.43206313329697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.3572436561129,
            63.13546878059675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.8513842811129,
            62.81599497980254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.8074389686129,
            63.860977254086414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.2576342811129,
            64.03467946066746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.0603686561129,
            64.58710177682586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -101.7420092811129,
            64.34083311801326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.0164233436129,
            64.03467946066746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -104.0271655311129,
            63.62769380584274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -104.5984545936129,
            63.03600819527083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.1922045936129,
            63.49072054028354
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.0056811561129,
            63.860977254086414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.0164233436129,
            62.79591173076809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -102.4011889686129,
            62.00190780673693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -100.6433764686129,
            61.98127103757589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -99.6765795936129,
            63.67578388104024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.7429858436129,
            62.94551580070024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.7869311561129,
            61.04795405255077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.2156420936129,
            60.338133734856406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.0291186561129,
            59.70132980609102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.8093920936129,
            59.254970025643296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.9734545936129,
            60.14181683835435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.1609545936129,
            61.06921984917758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -94.9304858436129,
            61.281094043723876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.7322436561129,
            61.76302542744607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.7322436561129,
            62.7248204899251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -94.4031420936129,
            62.965496954836155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -103.7195483436129,
            65.35793832250562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.0379077186129,
            65.46764615398608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -105.3015795936129,
            64.65238061899932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.0593920936129,
            65.43112787768099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.9382983436129,
            65.0260496457408
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 13
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
            ee.Geometry.Point([-99.4129077186129, 64.53046708014386]),
            {
              "Name": 13,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-101.0828295936129, 63.60816649381876]),
            {
              "Name": 13,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.7097827186129, 63.822230308319575]),
            {
              "Name": 13,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.5886889686129, 62.836064531279035]),
            {
              "Name": 13,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.6765795936129, 62.00190780673693]),
            {
              "Name": 13,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.5007983436129, 61.355637894426806]),
            {
              "Name": 13,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.4461108436129, 62.1254352685956]),
            {
              "Name": 13,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-101.7859545936129, 62.43206313329697]),
            {
              "Name": 13,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.3572436561129, 63.13546878059675]),
            {
              "Name": 13,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.8513842811129, 62.81599497980254]),
            {
              "Name": 13,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.8074389686129, 63.860977254086414]),
            {
              "Name": 13,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.2576342811129, 64.03467946066746]),
            {
              "Name": 13,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.0603686561129, 64.58710177682586]),
            {
              "Name": 13,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-101.7420092811129, 64.34083311801326]),
            {
              "Name": 13,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.0164233436129, 64.03467946066746]),
            {
              "Name": 13,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-104.0271655311129, 63.62769380584274]),
            {
              "Name": 13,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-104.5984545936129, 63.03600819527083]),
            {
              "Name": 13,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.1922045936129, 63.49072054028354]),
            {
              "Name": 13,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.0056811561129, 63.860977254086414]),
            {
              "Name": 13,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.0164233436129, 62.79591173076809]),
            {
              "Name": 13,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-102.4011889686129, 62.00190780673693]),
            {
              "Name": 13,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-100.6433764686129, 61.98127103757589]),
            {
              "Name": 13,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.6765795936129, 63.67578388104024]),
            {
              "Name": 13,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.7429858436129, 62.94551580070024]),
            {
              "Name": 13,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.7869311561129, 61.04795405255077]),
            {
              "Name": 13,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.2156420936129, 60.338133734856406]),
            {
              "Name": 13,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.0291186561129, 59.70132980609102]),
            {
              "Name": 13,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.8093920936129, 59.254970025643296]),
            {
              "Name": 13,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.9734545936129, 60.14181683835435]),
            {
              "Name": 13,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.1609545936129, 61.06921984917758]),
            {
              "Name": 13,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-94.9304858436129, 61.281094043723876]),
            {
              "Name": 13,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.7322436561129, 61.76302542744607]),
            {
              "Name": 13,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.7322436561129, 62.7248204899251]),
            {
              "Name": 13,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-94.4031420936129, 62.965496954836155]),
            {
              "Name": 13,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-103.7195483436129, 65.35793832250562]),
            {
              "Name": 13,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.0379077186129, 65.46764615398608]),
            {
              "Name": 13,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-105.3015795936129, 64.65238061899932]),
            {
              "Name": 13,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-107.0593920936129, 65.43112787768099]),
            {
              "Name": 13,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-107.9382983436129, 65.0260496457408]),
            {
              "Name": 13,
              "system:index": "38"
            })]),
    w3 = ui.import && ui.import("w3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -95.33733966032541,
            59.68553026356158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.35931231657541,
            59.387540448306375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.28240801970041,
            59.247387872726804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.06268145720041,
            59.367953859803265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.13409259001291,
            59.546610621874535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.63088828869179,
            59.19719803115653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.68581992931679,
            59.08167157715193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.72976524181679,
            58.98274270806872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.42214805431679,
            58.98557319850017
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.25735313244179,
            59.10424394151675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.13650352306679,
            59.0986022429767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.43313438244179,
            59.174686887778165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.49355918712929,
            59.10424394151675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.08157188244179,
            59.00255125765896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -94.92227012462929,
            59.19719803115653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.10903770275429,
            59.27587032477581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.40017539806679,
            59.368358458396955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.61440879650429,
            59.33755704058714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.55398399181679,
            59.533089676887364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.10354453869179,
            59.47175828911568
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -94.82339317150429,
            59.34315937715549
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.0963690114243,
            59.9090297396103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.2941229176743,
            60.049193620899125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.6401922536118,
            59.999791764515145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.7885076832993,
            60.16691051918173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -95.1403143239243,
            60.20787563721992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.0576727223618,
            60.06016178453481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.3982488942368,
            60.04645101047198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.37483714213991,
            60.467425632103236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.7173116591978,
            59.53392031441981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.1899679091978,
            59.183969550768516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.2446554091978,
            59.5728904096255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.8489034560728,
            59.667344470372115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.3652608779478,
            59.80023972103968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.6563985732603,
            59.8857874567553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.9697530654478,
            59.56732601377106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.1018331435728,
            59.39437291144754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.9864766982603,
            59.578453885544384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.5467794326353,
            59.899564897589116
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.0960958388853,
            59.902319700185906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.2553975966978,
            59.68398527287681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.5630147841978,
            59.72832036422944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.7662618545103,
            59.82509881079875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.82822945763373,
            60.080029661632516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.44370797325873,
            60.07454933714093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.91636422325873,
            60.06632714259972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.80650094200873,
            60.27399190969914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.58653023888373,
            60.41803519203784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.51511910607123,
            60.52362357379334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.63071969200873,
            60.404473364858696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.50437691857123,
            60.15119104221983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.53208687950873,
            60.159392076870304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.18601754357123,
            60.2521942405646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.90562203575873,
            60.08550907541343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.32310250450873,
            60.63798636729052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.29539254357123,
            60.71600158312109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -96.20249703575873,
            60.686431865490505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -97.26817086388373,
            60.785785600573135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -98.59751656700873,
            60.7777413429233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -99.27317574669623,
            60.76432975890127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.16218129589035,
            62.58377224277342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.48078481151535,
            62.5584681365404
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.62360707714035,
            62.482426527489274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.77741567089035,
            62.43162424573759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.74445668651535,
            62.299133576152336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.29401723339035,
            62.380735538675175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.95319692089035,
            62.30934595090687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.10700551464035,
            62.15579578978085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.30475942089035,
            61.99114583171129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.35969106151535,
            61.93950946753387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.21686879589035,
            61.88778565658003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.12897817089035,
            62.02208571984564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.23884145214035,
            62.140397755581574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.52448598339035,
            61.92917170447451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.34870473339035,
            62.396011231808814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.04108754589035,
            62.457036183097756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.86530629589035,
            62.598944373136305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.15095082714035,
            62.43162424573759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.34870473339035,
            62.268475639794346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.48054067089035,
            62.18144178132987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -92.77741567089035,
            62.248019663616674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.18390981151535,
            62.355258742269065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -93.60139028026535,
            62.421453421769364
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 16
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
            ee.Geometry.Point([-95.33733966032541, 59.68553026356158]),
            {
              "Name": 16,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.35931231657541, 59.387540448306375]),
            {
              "Name": 16,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.28240801970041, 59.247387872726804]),
            {
              "Name": 16,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.06268145720041, 59.367953859803265]),
            {
              "Name": 16,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.13409259001291, 59.546610621874535]),
            {
              "Name": 16,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.63088828869179, 59.19719803115653]),
            {
              "Name": 16,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.68581992931679, 59.08167157715193]),
            {
              "Name": 16,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.72976524181679, 58.98274270806872]),
            {
              "Name": 16,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.42214805431679, 58.98557319850017]),
            {
              "Name": 16,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.25735313244179, 59.10424394151675]),
            {
              "Name": 16,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.13650352306679, 59.0986022429767]),
            {
              "Name": 16,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.43313438244179, 59.174686887778165]),
            {
              "Name": 16,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.49355918712929, 59.10424394151675]),
            {
              "Name": 16,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.08157188244179, 59.00255125765896]),
            {
              "Name": 16,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-94.92227012462929, 59.19719803115653]),
            {
              "Name": 16,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.10903770275429, 59.27587032477581]),
            {
              "Name": 16,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.40017539806679, 59.368358458396955]),
            {
              "Name": 16,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.61440879650429, 59.33755704058714]),
            {
              "Name": 16,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.55398399181679, 59.533089676887364]),
            {
              "Name": 16,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.10354453869179, 59.47175828911568]),
            {
              "Name": 16,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-94.82339317150429, 59.34315937715549]),
            {
              "Name": 16,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.0963690114243, 59.9090297396103]),
            {
              "Name": 16,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.2941229176743, 60.049193620899125]),
            {
              "Name": 16,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.6401922536118, 59.999791764515145]),
            {
              "Name": 16,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.7885076832993, 60.16691051918173]),
            {
              "Name": 16,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-95.1403143239243, 60.20787563721992]),
            {
              "Name": 16,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.0576727223618, 60.06016178453481]),
            {
              "Name": 16,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.3982488942368, 60.04645101047198]),
            {
              "Name": 16,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.37483714213991, 60.467425632103236]),
            {
              "Name": 16,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.7173116591978, 59.53392031441981]),
            {
              "Name": 16,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.1899679091978, 59.183969550768516]),
            {
              "Name": 16,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.2446554091978, 59.5728904096255]),
            {
              "Name": 16,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.8489034560728, 59.667344470372115]),
            {
              "Name": 16,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.3652608779478, 59.80023972103968]),
            {
              "Name": 16,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.6563985732603, 59.8857874567553]),
            {
              "Name": 16,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.9697530654478, 59.56732601377106]),
            {
              "Name": 16,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.1018331435728, 59.39437291144754]),
            {
              "Name": 16,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.9864766982603, 59.578453885544384]),
            {
              "Name": 16,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.5467794326353, 59.899564897589116]),
            {
              "Name": 16,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.0960958388853, 59.902319700185906]),
            {
              "Name": 16,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.2553975966978, 59.68398527287681]),
            {
              "Name": 16,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.5630147841978, 59.72832036422944]),
            {
              "Name": 16,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.7662618545103, 59.82509881079875]),
            {
              "Name": 16,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.82822945763373, 60.080029661632516]),
            {
              "Name": 16,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.44370797325873, 60.07454933714093]),
            {
              "Name": 16,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.91636422325873, 60.06632714259972]),
            {
              "Name": 16,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.80650094200873, 60.27399190969914]),
            {
              "Name": 16,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.58653023888373, 60.41803519203784]),
            {
              "Name": 16,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.51511910607123, 60.52362357379334]),
            {
              "Name": 16,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.63071969200873, 60.404473364858696]),
            {
              "Name": 16,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.50437691857123, 60.15119104221983]),
            {
              "Name": 16,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.53208687950873, 60.159392076870304]),
            {
              "Name": 16,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.18601754357123, 60.2521942405646]),
            {
              "Name": 16,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.90562203575873, 60.08550907541343]),
            {
              "Name": 16,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.32310250450873, 60.63798636729052]),
            {
              "Name": 16,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.29539254357123, 60.71600158312109]),
            {
              "Name": 16,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-96.20249703575873, 60.686431865490505]),
            {
              "Name": 16,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-97.26817086388373, 60.785785600573135]),
            {
              "Name": 16,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-98.59751656700873, 60.7777413429233]),
            {
              "Name": 16,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-99.27317574669623, 60.76432975890127]),
            {
              "Name": 16,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.16218129589035, 62.58377224277342]),
            {
              "Name": 16,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.48078481151535, 62.5584681365404]),
            {
              "Name": 16,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.62360707714035, 62.482426527489274]),
            {
              "Name": 16,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.77741567089035, 62.43162424573759]),
            {
              "Name": 16,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.74445668651535, 62.299133576152336]),
            {
              "Name": 16,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.29401723339035, 62.380735538675175]),
            {
              "Name": 16,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.95319692089035, 62.30934595090687]),
            {
              "Name": 16,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.10700551464035, 62.15579578978085]),
            {
              "Name": 16,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.30475942089035, 61.99114583171129]),
            {
              "Name": 16,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.35969106151535, 61.93950946753387]),
            {
              "Name": 16,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.21686879589035, 61.88778565658003]),
            {
              "Name": 16,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.12897817089035, 62.02208571984564]),
            {
              "Name": 16,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.23884145214035, 62.140397755581574]),
            {
              "Name": 16,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.52448598339035, 61.92917170447451]),
            {
              "Name": 16,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.34870473339035, 62.396011231808814]),
            {
              "Name": 16,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.04108754589035, 62.457036183097756]),
            {
              "Name": 16,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.86530629589035, 62.598944373136305]),
            {
              "Name": 16,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.15095082714035, 62.43162424573759]),
            {
              "Name": 16,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.34870473339035, 62.268475639794346]),
            {
              "Name": 16,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.48054067089035, 62.18144178132987]),
            {
              "Name": 16,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-92.77741567089035, 62.248019663616674]),
            {
              "Name": 16,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.18390981151535, 62.355258742269065]),
            {
              "Name": 16,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-93.60139028026535, 62.421453421769364]),
            {
              "Name": 16,
              "system:index": "82"
            })]),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/201501824/ZONE_1/1999/ET1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/ET1999"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/201501824/ZONE_1/1999/LAI1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/LAI1999"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/201501824/ZONE_1/1999/LST1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/LST1999"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/201501824/ZONE_1/1999/NDVI1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/NDVI1999"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/201501824/ZONE_1/1999/b1_1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/b1_1999"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/201501824/ZONE_1/1999/b2_1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/b2_1999"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/201501824/ZONE_1/1999/b3_1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/b3_1999"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/201501824/ZONE_1/1999/b4_1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/b4_1999"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/201501824/ZONE_1/1999/b6_1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/b6_1999"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/201501824/ZONE_1/1998/ET1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/ET1998"),
    image28 = ui.import && ui.import("image28", "image", {
      "id": "users/201501824/ZONE_1/1998/LAI1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/LAI1998"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/201501824/ZONE_1/1998/LST1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/LST1998"),
    image30 = ui.import && ui.import("image30", "image", {
      "id": "users/201501824/ZONE_1/1998/NDVI1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/NDVI1998"),
    image32 = ui.import && ui.import("image32", "image", {
      "id": "users/201501824/ZONE_1/1998/b1_1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/b1_1998"),
    image33 = ui.import && ui.import("image33", "image", {
      "id": "users/201501824/ZONE_1/1998/b2_1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/b2_1998"),
    image34 = ui.import && ui.import("image34", "image", {
      "id": "users/201501824/ZONE_1/1998/b3_1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/b3_1998"),
    image35 = ui.import && ui.import("image35", "image", {
      "id": "users/201501824/ZONE_1/1998/b4_1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/b4_1998"),
    image36 = ui.import && ui.import("image36", "image", {
      "id": "users/201501824/ZONE_1/1998/b6_1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/b6_1998"),
    image39 = ui.import && ui.import("image39", "image", {
      "id": "users/201501824/ZONE_1/1997/ET1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/ET1997"),
    image40 = ui.import && ui.import("image40", "image", {
      "id": "users/201501824/ZONE_1/1997/LAI1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/LAI1997"),
    image41 = ui.import && ui.import("image41", "image", {
      "id": "users/201501824/ZONE_1/1997/LST1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/LST1997"),
    image42 = ui.import && ui.import("image42", "image", {
      "id": "users/201501824/ZONE_1/1997/NDVI1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/NDVI1997"),
    image44 = ui.import && ui.import("image44", "image", {
      "id": "users/201501824/ZONE_1/1997/b1_1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/b1_1997"),
    image45 = ui.import && ui.import("image45", "image", {
      "id": "users/201501824/ZONE_1/1997/b2_1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/b2_1997"),
    image46 = ui.import && ui.import("image46", "image", {
      "id": "users/201501824/ZONE_1/1997/b3_1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/b3_1997"),
    image47 = ui.import && ui.import("image47", "image", {
      "id": "users/201501824/ZONE_1/1997/b4_1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/b4_1997"),
    image48 = ui.import && ui.import("image48", "image", {
      "id": "users/201501824/ZONE_1/1997/b6_1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/b6_1997"),
    image51 = ui.import && ui.import("image51", "image", {
      "id": "users/201501824/ZONE_1/1996/ET1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/ET1996"),
    image52 = ui.import && ui.import("image52", "image", {
      "id": "users/201501824/ZONE_1/1996/LAI1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/LAI1996"),
    image53 = ui.import && ui.import("image53", "image", {
      "id": "users/201501824/ZONE_1/1996/LST1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/LST1996"),
    image54 = ui.import && ui.import("image54", "image", {
      "id": "users/201501824/ZONE_1/1996/NDVI1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/NDVI1996"),
    image56 = ui.import && ui.import("image56", "image", {
      "id": "users/201501824/ZONE_1/1996/b1_1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/b1_1996"),
    image57 = ui.import && ui.import("image57", "image", {
      "id": "users/201501824/ZONE_1/1996/b2_1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/b2_1996"),
    image58 = ui.import && ui.import("image58", "image", {
      "id": "users/201501824/ZONE_1/1996/b3_1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/b3_1996"),
    image59 = ui.import && ui.import("image59", "image", {
      "id": "users/201501824/ZONE_1/1996/b4_1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/b4_1996"),
    image60 = ui.import && ui.import("image60", "image", {
      "id": "users/201501824/ZONE_1/1996/b6_1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/b6_1996"),
    image61 = ui.import && ui.import("image61", "image", {
      "id": "users/201501824/ZONE_1/1996/pr1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/pr1996"),
    image62 = ui.import && ui.import("image62", "image", {
      "id": "users/201501824/ZONE_1/1996/tmmx1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/tmmx1996"),
    image63 = ui.import && ui.import("image63", "image", {
      "id": "users/201501824/ZONE_1/1995/ET1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/ET1995"),
    image64 = ui.import && ui.import("image64", "image", {
      "id": "users/201501824/ZONE_1/1995/LAI1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/LAI1995"),
    image65 = ui.import && ui.import("image65", "image", {
      "id": "users/201501824/ZONE_1/1995/LST1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/LST1995"),
    image66 = ui.import && ui.import("image66", "image", {
      "id": "users/201501824/ZONE_1/1995/NDVI1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/NDVI1995"),
    image68 = ui.import && ui.import("image68", "image", {
      "id": "users/201501824/ZONE_1/1995/b1_1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/b1_1995"),
    image69 = ui.import && ui.import("image69", "image", {
      "id": "users/201501824/ZONE_1/1995/b2_1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/b2_1995"),
    image70 = ui.import && ui.import("image70", "image", {
      "id": "users/201501824/ZONE_1/1995/b3_1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/b3_1995"),
    image71 = ui.import && ui.import("image71", "image", {
      "id": "users/201501824/ZONE_1/1995/b4_1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/b4_1995"),
    image72 = ui.import && ui.import("image72", "image", {
      "id": "users/201501824/ZONE_1/1995/b6_1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/b6_1995"),
    image73 = ui.import && ui.import("image73", "image", {
      "id": "users/201501824/ZONE_1/1995/pr1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/pr1995"),
    image74 = ui.import && ui.import("image74", "image", {
      "id": "users/201501824/ZONE_1/1995/tmmx1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/tmmx1995"),
    image75 = ui.import && ui.import("image75", "image", {
      "id": "users/201501824/ZONE_1/1994/ET1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/ET1994"),
    image76 = ui.import && ui.import("image76", "image", {
      "id": "users/201501824/ZONE_1/1994/LAI1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/LAI1994"),
    image77 = ui.import && ui.import("image77", "image", {
      "id": "users/201501824/ZONE_1/1994/LST1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/LST1994"),
    image78 = ui.import && ui.import("image78", "image", {
      "id": "users/201501824/ZONE_1/1994/NDVI1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/NDVI1994"),
    image80 = ui.import && ui.import("image80", "image", {
      "id": "users/201501824/ZONE_1/1994/b1_1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/b1_1994"),
    image81 = ui.import && ui.import("image81", "image", {
      "id": "users/201501824/ZONE_1/1994/b2_1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/b2_1994"),
    image82 = ui.import && ui.import("image82", "image", {
      "id": "users/201501824/ZONE_1/1994/b3_1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/b3_1994"),
    image83 = ui.import && ui.import("image83", "image", {
      "id": "users/201501824/ZONE_1/1994/b4_1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/b4_1994"),
    image84 = ui.import && ui.import("image84", "image", {
      "id": "users/201501824/ZONE_1/1994/b6_1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/b6_1994"),
    image85 = ui.import && ui.import("image85", "image", {
      "id": "users/201501824/ZONE_1/1994/pr1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/pr1994"),
    image86 = ui.import && ui.import("image86", "image", {
      "id": "users/201501824/ZONE_1/1994/tmmx1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/tmmx1994"),
    image87 = ui.import && ui.import("image87", "image", {
      "id": "users/201501824/ZONE_1/1993/ET1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/ET1993"),
    image88 = ui.import && ui.import("image88", "image", {
      "id": "users/201501824/ZONE_1/1993/LAI1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/LAI1993"),
    image89 = ui.import && ui.import("image89", "image", {
      "id": "users/201501824/ZONE_1/1993/LST1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/LST1993"),
    image90 = ui.import && ui.import("image90", "image", {
      "id": "users/201501824/ZONE_1/1993/NDVI1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/NDVI1993"),
    image92 = ui.import && ui.import("image92", "image", {
      "id": "users/201501824/ZONE_1/1993/b1_1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/b1_1993"),
    image93 = ui.import && ui.import("image93", "image", {
      "id": "users/201501824/ZONE_1/1993/b2_1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/b2_1993"),
    image94 = ui.import && ui.import("image94", "image", {
      "id": "users/201501824/ZONE_1/1993/b3_1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/b3_1993"),
    image95 = ui.import && ui.import("image95", "image", {
      "id": "users/201501824/ZONE_1/1993/b4_1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/b4_1993"),
    image96 = ui.import && ui.import("image96", "image", {
      "id": "users/201501824/ZONE_1/1993/b6_1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/b6_1993"),
    image97 = ui.import && ui.import("image97", "image", {
      "id": "users/201501824/ZONE_1/1993/pr1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/pr1993"),
    image98 = ui.import && ui.import("image98", "image", {
      "id": "users/201501824/ZONE_1/1993/tmmx1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/tmmx1993"),
    image99 = ui.import && ui.import("image99", "image", {
      "id": "users/201501824/ZONE_1/1992/ET1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/ET1992"),
    image100 = ui.import && ui.import("image100", "image", {
      "id": "users/201501824/ZONE_1/1992/LAI1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/LAI1992"),
    image101 = ui.import && ui.import("image101", "image", {
      "id": "users/201501824/ZONE_1/1992/LST1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/LST1992"),
    image102 = ui.import && ui.import("image102", "image", {
      "id": "users/201501824/ZONE_1/1992/NDVI1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/NDVI1992"),
    image104 = ui.import && ui.import("image104", "image", {
      "id": "users/201501824/ZONE_1/1992/b1_1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/b1_1992"),
    image105 = ui.import && ui.import("image105", "image", {
      "id": "users/201501824/ZONE_1/1992/b2_1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/b2_1992"),
    image106 = ui.import && ui.import("image106", "image", {
      "id": "users/201501824/ZONE_1/1992/b3_1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/b3_1992"),
    image107 = ui.import && ui.import("image107", "image", {
      "id": "users/201501824/ZONE_1/1992/b4_1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/b4_1992"),
    image108 = ui.import && ui.import("image108", "image", {
      "id": "users/201501824/ZONE_1/1992/b6_1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/b6_1992"),
    image109 = ui.import && ui.import("image109", "image", {
      "id": "users/201501824/ZONE_1/1992/pr1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/pr1992"),
    image110 = ui.import && ui.import("image110", "image", {
      "id": "users/201501824/ZONE_1/1992/tmmx1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/tmmx1992"),
    image111 = ui.import && ui.import("image111", "image", {
      "id": "users/201501824/ZONE_1/1991/ET1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/ET1991"),
    image112 = ui.import && ui.import("image112", "image", {
      "id": "users/201501824/ZONE_1/1991/LAI1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/LAI1991"),
    image113 = ui.import && ui.import("image113", "image", {
      "id": "users/201501824/ZONE_1/1991/LST1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/LST1991"),
    image114 = ui.import && ui.import("image114", "image", {
      "id": "users/201501824/ZONE_1/1991/NDVI1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/NDVI1991"),
    image116 = ui.import && ui.import("image116", "image", {
      "id": "users/201501824/ZONE_1/1991/b1_1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/b1_1991"),
    image117 = ui.import && ui.import("image117", "image", {
      "id": "users/201501824/ZONE_1/1991/b2_1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/b2_1991"),
    image118 = ui.import && ui.import("image118", "image", {
      "id": "users/201501824/ZONE_1/1991/b3_1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/b3_1991"),
    image119 = ui.import && ui.import("image119", "image", {
      "id": "users/201501824/ZONE_1/1991/b4_1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/b4_1991"),
    image120 = ui.import && ui.import("image120", "image", {
      "id": "users/201501824/ZONE_1/1991/b6_1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/b6_1991"),
    image121 = ui.import && ui.import("image121", "image", {
      "id": "users/201501824/ZONE_1/1991/pr1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/pr1991"),
    image122 = ui.import && ui.import("image122", "image", {
      "id": "users/201501824/ZONE_1/1991/tmmx1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/tmmx1991"),
    image123 = ui.import && ui.import("image123", "image", {
      "id": "users/201501824/ZONE_1/1990/ET1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/ET1990"),
    image124 = ui.import && ui.import("image124", "image", {
      "id": "users/201501824/ZONE_1/1990/LAI1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/LAI1990"),
    image125 = ui.import && ui.import("image125", "image", {
      "id": "users/201501824/ZONE_1/1990/LST1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/LST1990"),
    image126 = ui.import && ui.import("image126", "image", {
      "id": "users/201501824/ZONE_1/1990/NDVI1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/NDVI1990"),
    image128 = ui.import && ui.import("image128", "image", {
      "id": "users/201501824/ZONE_1/1990/b1_1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/b1_1990"),
    image129 = ui.import && ui.import("image129", "image", {
      "id": "users/201501824/ZONE_1/1990/b2_1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/b2_1990"),
    image130 = ui.import && ui.import("image130", "image", {
      "id": "users/201501824/ZONE_1/1990/b3_1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/b3_1990"),
    image131 = ui.import && ui.import("image131", "image", {
      "id": "users/201501824/ZONE_1/1990/b4_1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/b4_1990"),
    image132 = ui.import && ui.import("image132", "image", {
      "id": "users/201501824/ZONE_1/1990/b6_1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/b6_1990"),
    image133 = ui.import && ui.import("image133", "image", {
      "id": "users/201501824/ZONE_1/1990/pr1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/pr1990"),
    image134 = ui.import && ui.import("image134", "image", {
      "id": "users/201501824/ZONE_1/1990/tmmx1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/tmmx1990"),
    image135 = ui.import && ui.import("image135", "image", {
      "id": "users/201501824/ZONE_1/1989/ET1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/ET1989"),
    image136 = ui.import && ui.import("image136", "image", {
      "id": "users/201501824/ZONE_1/1989/LAI1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/LAI1989"),
    image137 = ui.import && ui.import("image137", "image", {
      "id": "users/201501824/ZONE_1/1989/LST1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/LST1989"),
    image138 = ui.import && ui.import("image138", "image", {
      "id": "users/201501824/ZONE_1/1989/NDVI1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/NDVI1989"),
    image140 = ui.import && ui.import("image140", "image", {
      "id": "users/201501824/ZONE_1/1989/b1_1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/b1_1989"),
    image141 = ui.import && ui.import("image141", "image", {
      "id": "users/201501824/ZONE_1/1989/b2_1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/b2_1989"),
    image142 = ui.import && ui.import("image142", "image", {
      "id": "users/201501824/ZONE_1/1989/b3_1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/b3_1989"),
    image143 = ui.import && ui.import("image143", "image", {
      "id": "users/201501824/ZONE_1/1989/b4_1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/b4_1989"),
    image144 = ui.import && ui.import("image144", "image", {
      "id": "users/201501824/ZONE_1/1989/b6_1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/b6_1989"),
    image145 = ui.import && ui.import("image145", "image", {
      "id": "users/201501824/ZONE_1/1989/pr1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/pr1989"),
    image146 = ui.import && ui.import("image146", "image", {
      "id": "users/201501824/ZONE_1/1989/tmmx1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/tmmx1989"),
    image147 = ui.import && ui.import("image147", "image", {
      "id": "users/201501824/ZONE_1/1988/ET1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/ET1988"),
    image148 = ui.import && ui.import("image148", "image", {
      "id": "users/201501824/ZONE_1/1988/LAI1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/LAI1988"),
    image149 = ui.import && ui.import("image149", "image", {
      "id": "users/201501824/ZONE_1/1988/LST1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/LST1988"),
    image150 = ui.import && ui.import("image150", "image", {
      "id": "users/201501824/ZONE_1/1988/NDVI1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/NDVI1988"),
    image152 = ui.import && ui.import("image152", "image", {
      "id": "users/201501824/ZONE_1/1988/b1_1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/b1_1988"),
    image153 = ui.import && ui.import("image153", "image", {
      "id": "users/201501824/ZONE_1/1988/b2_1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/b2_1988"),
    image154 = ui.import && ui.import("image154", "image", {
      "id": "users/201501824/ZONE_1/1988/b3_1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/b3_1988"),
    image155 = ui.import && ui.import("image155", "image", {
      "id": "users/201501824/ZONE_1/1988/b4_1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/b4_1988"),
    image156 = ui.import && ui.import("image156", "image", {
      "id": "users/201501824/ZONE_1/1988/b6_1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/b6_1988"),
    image157 = ui.import && ui.import("image157", "image", {
      "id": "users/201501824/ZONE_1/1988/pr1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/pr1988"),
    image158 = ui.import && ui.import("image158", "image", {
      "id": "users/201501824/ZONE_1/1988/tmmx1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/tmmx1988"),
    image159 = ui.import && ui.import("image159", "image", {
      "id": "users/201501824/ZONE_1/1987/ET1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/ET1987"),
    image160 = ui.import && ui.import("image160", "image", {
      "id": "users/201501824/ZONE_1/1987/LAI1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/LAI1987"),
    image161 = ui.import && ui.import("image161", "image", {
      "id": "users/201501824/ZONE_1/1987/LST1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/LST1987"),
    image162 = ui.import && ui.import("image162", "image", {
      "id": "users/201501824/ZONE_1/1987/NDVI1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/NDVI1987"),
    image164 = ui.import && ui.import("image164", "image", {
      "id": "users/201501824/ZONE_1/1987/b1_1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/b1_1987"),
    image165 = ui.import && ui.import("image165", "image", {
      "id": "users/201501824/ZONE_1/1987/b2_1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/b2_1987"),
    image166 = ui.import && ui.import("image166", "image", {
      "id": "users/201501824/ZONE_1/1987/b3_1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/b3_1987"),
    image167 = ui.import && ui.import("image167", "image", {
      "id": "users/201501824/ZONE_1/1987/b4_1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/b4_1987"),
    image168 = ui.import && ui.import("image168", "image", {
      "id": "users/201501824/ZONE_1/1987/b6_1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/b6_1987"),
    image169 = ui.import && ui.import("image169", "image", {
      "id": "users/201501824/ZONE_1/1987/pr1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/pr1987"),
    image170 = ui.import && ui.import("image170", "image", {
      "id": "users/201501824/ZONE_1/1987/tmmx1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/tmmx1987"),
    image171 = ui.import && ui.import("image171", "image", {
      "id": "users/201501824/ZONE_1/1986/ET1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/ET1986"),
    image172 = ui.import && ui.import("image172", "image", {
      "id": "users/201501824/ZONE_1/1986/LAI1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/LAI1986"),
    image173 = ui.import && ui.import("image173", "image", {
      "id": "users/201501824/ZONE_1/1986/LST1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/LST1986"),
    image174 = ui.import && ui.import("image174", "image", {
      "id": "users/201501824/ZONE_1/1986/NDVI1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/NDVI1986"),
    image176 = ui.import && ui.import("image176", "image", {
      "id": "users/201501824/ZONE_1/1986/b1_1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/b1_1986"),
    image177 = ui.import && ui.import("image177", "image", {
      "id": "users/201501824/ZONE_1/1986/b2_1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/b2_1986"),
    image178 = ui.import && ui.import("image178", "image", {
      "id": "users/201501824/ZONE_1/1986/b3_1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/b3_1986"),
    image179 = ui.import && ui.import("image179", "image", {
      "id": "users/201501824/ZONE_1/1986/b4_1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/b4_1986"),
    image180 = ui.import && ui.import("image180", "image", {
      "id": "users/201501824/ZONE_1/1986/b6_1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/b6_1986"),
    image181 = ui.import && ui.import("image181", "image", {
      "id": "users/201501824/ZONE_1/1986/pr1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/pr1986"),
    image182 = ui.import && ui.import("image182", "image", {
      "id": "users/201501824/ZONE_1/1986/tmmx1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/tmmx1986"),
    image183 = ui.import && ui.import("image183", "image", {
      "id": "users/201501824/ZONE_1/1985/ET1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/ET1985"),
    image184 = ui.import && ui.import("image184", "image", {
      "id": "users/201501824/ZONE_1/1985/LAI1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/LAI1985"),
    image185 = ui.import && ui.import("image185", "image", {
      "id": "users/201501824/ZONE_1/1985/LST1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/LST1985"),
    image186 = ui.import && ui.import("image186", "image", {
      "id": "users/201501824/ZONE_1/1985/NDVI1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/NDVI1985"),
    image188 = ui.import && ui.import("image188", "image", {
      "id": "users/201501824/ZONE_1/1985/b1_1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/b1_1985"),
    image189 = ui.import && ui.import("image189", "image", {
      "id": "users/201501824/ZONE_1/1985/b2_1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/b2_1985"),
    image190 = ui.import && ui.import("image190", "image", {
      "id": "users/201501824/ZONE_1/1985/b3_1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/b3_1985"),
    image191 = ui.import && ui.import("image191", "image", {
      "id": "users/201501824/ZONE_1/1985/b4_1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/b4_1985"),
    image192 = ui.import && ui.import("image192", "image", {
      "id": "users/201501824/ZONE_1/1985/b6_1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/b6_1985"),
    image193 = ui.import && ui.import("image193", "image", {
      "id": "users/201501824/ZONE_1/1985/pr1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/pr1985"),
    image194 = ui.import && ui.import("image194", "image", {
      "id": "users/201501824/ZONE_1/1985/tmmx1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/tmmx1985"),
    image195 = ui.import && ui.import("image195", "image", {
      "id": "users/201501824/ZONE_1/1984/ET1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/ET1984"),
    image196 = ui.import && ui.import("image196", "image", {
      "id": "users/201501824/ZONE_1/1984/LAI1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/LAI1984"),
    image197 = ui.import && ui.import("image197", "image", {
      "id": "users/201501824/ZONE_1/1984/LST1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/LST1984"),
    image198 = ui.import && ui.import("image198", "image", {
      "id": "users/201501824/ZONE_1/1984/NDVI1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/NDVI1984"),
    image200 = ui.import && ui.import("image200", "image", {
      "id": "users/201501824/ZONE_1/1984/b1_1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/b1_1984"),
    image201 = ui.import && ui.import("image201", "image", {
      "id": "users/201501824/ZONE_1/1984/b2_1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/b2_1984"),
    image202 = ui.import && ui.import("image202", "image", {
      "id": "users/201501824/ZONE_1/1984/b3_1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/b3_1984"),
    image203 = ui.import && ui.import("image203", "image", {
      "id": "users/201501824/ZONE_1/1984/b4_1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/b4_1984"),
    image204 = ui.import && ui.import("image204", "image", {
      "id": "users/201501824/ZONE_1/1984/b6_1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/b6_1984"),
    image205 = ui.import && ui.import("image205", "image", {
      "id": "users/201501824/ZONE_1/1984/pr1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/pr1984"),
    image206 = ui.import && ui.import("image206", "image", {
      "id": "users/201501824/ZONE_1/1984/tmmx1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/tmmx1984"),
    image207 = ui.import && ui.import("image207", "image", {
      "id": "users/201501824/ZONE_1/1983/ET1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/ET1983"),
    image208 = ui.import && ui.import("image208", "image", {
      "id": "users/201501824/ZONE_1/1983/LAI1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/LAI1983"),
    image209 = ui.import && ui.import("image209", "image", {
      "id": "users/201501824/ZONE_1/1983/LST1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/LST1983"),
    image210 = ui.import && ui.import("image210", "image", {
      "id": "users/201501824/ZONE_1/1983/NDVI1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/NDVI1983"),
    image212 = ui.import && ui.import("image212", "image", {
      "id": "users/201501824/ZONE_1/1983/b1_1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/b1_1983"),
    image213 = ui.import && ui.import("image213", "image", {
      "id": "users/201501824/ZONE_1/1983/b2_1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/b2_1983"),
    image214 = ui.import && ui.import("image214", "image", {
      "id": "users/201501824/ZONE_1/1983/b3_1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/b3_1983"),
    image215 = ui.import && ui.import("image215", "image", {
      "id": "users/201501824/ZONE_1/1983/b4_1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/b4_1983"),
    image216 = ui.import && ui.import("image216", "image", {
      "id": "users/201501824/ZONE_1/1983/b6_1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/b6_1983"),
    image217 = ui.import && ui.import("image217", "image", {
      "id": "users/201501824/ZONE_1/1983/pr1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/pr1983"),
    image218 = ui.import && ui.import("image218", "image", {
      "id": "users/201501824/ZONE_1/1983/tmmx1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/tmmx1983"),
    image219 = ui.import && ui.import("image219", "image", {
      "id": "users/201501824/ZONE_1/1982/ET1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/ET1982"),
    image220 = ui.import && ui.import("image220", "image", {
      "id": "users/201501824/ZONE_1/1982/LAI1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/LAI1982"),
    image221 = ui.import && ui.import("image221", "image", {
      "id": "users/201501824/ZONE_1/1982/LST1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/LST1982"),
    image222 = ui.import && ui.import("image222", "image", {
      "id": "users/201501824/ZONE_1/1982/NDVI1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/NDVI1982"),
    image224 = ui.import && ui.import("image224", "image", {
      "id": "users/201501824/ZONE_1/1982/b1_1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/b1_1982"),
    image225 = ui.import && ui.import("image225", "image", {
      "id": "users/201501824/ZONE_1/1982/b2_1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/b2_1982"),
    image226 = ui.import && ui.import("image226", "image", {
      "id": "users/201501824/ZONE_1/1982/b3_1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/b3_1982"),
    image227 = ui.import && ui.import("image227", "image", {
      "id": "users/201501824/ZONE_1/1982/b4_1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/b4_1982"),
    image228 = ui.import && ui.import("image228", "image", {
      "id": "users/201501824/ZONE_1/1982/b6_1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/b6_1982"),
    image229 = ui.import && ui.import("image229", "image", {
      "id": "users/201501824/ZONE_1/1982/pr1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/pr1982"),
    image230 = ui.import && ui.import("image230", "image", {
      "id": "users/201501824/ZONE_1/1982/tmmx1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/tmmx1982"),
    p4 = ui.import && ui.import("p4", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -120.44671883090025,
            67.38083992056755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.33636726840025,
            67.59955141388372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50140633090025,
            67.86598134832212
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.24847664340025,
            68.53503014840318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.23773445590025,
            69.1222288311577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.20453133090025,
            69.18478325546648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.42425789340025,
            69.20039385507589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.89691414340025,
            69.1065621842644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.58929695590025,
            68.99658082889702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50140633090025,
            68.69526747330411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.24847664340025,
            68.40601416733192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.42425789340025,
            68.90187133405504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.20453133090025,
            68.83850537131761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.76507820590025,
            68.71122834043831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.58929695590025,
            68.47061420772025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.24847664340025,
            68.325004550506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.07269539340025,
            68.22741116780401
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.94085945590025,
            68.325004550506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50140633090025,
            68.325004550506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.01800789340025,
            68.40601416733192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.06195320590025,
            67.76642456437473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.67718758090025,
            67.53247003775355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.19378914340025,
            67.39773548285922
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.36957039340025,
            67.24524405062157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.58929695590025,
            67.24524405062157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.60003914340025,
            67.41461908594692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.60003914340025,
            68.16211679831287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.86371101840025,
            68.69526747330411
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.81976570590025,
            69.47947799911474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.98480476840025,
            69.67880675850704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50140633090025,
            69.63297301212201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.28167976840025,
            69.52564238051342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.01800789340025,
            69.0280603612019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.01800789340025,
            68.27626001192112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.22601570590025,
            68.90187133405504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.12738289340025,
            69.29382272699846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.47894539340025,
            68.72717780516906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.78656258090025,
            68.17845783054078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.93988289340025,
            68.71122834043831
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.76410164340025,
            68.98082414884185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.33539070590025,
            69.15352846222326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.30218758090025,
            69.24715854823873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.35687508090027,
            69.27827915758014
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.1393289332286,
            68.93348637042929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.1178445582286,
            69.1065621842644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.1617898707286,
            68.77495785404176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.8541726832286,
            68.325004550506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.3268289332286,
            68.0474033146326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.5797586207286,
            67.51566995313725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.3160867457286,
            67.1941974250904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.3600320582286,
            66.98892513597538
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.0631570582286,
            66.971740450811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.4586648707286,
            67.41461908594692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.1178445582286,
            67.43149073683077
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.9860086207286,
            68.06382596009209
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.3815164332286,
            67.94862177374729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.9860086207286,
            67.12596661928606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.6783914332286,
            66.93733467013239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.5905008082286,
            66.88563486795984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.2828836207286,
            66.8511074971774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.6237039332286,
            66.93733467013239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.2389383082286,
            66.72987754790417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.9420633082286,
            66.6603343252766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.2936258082286,
            67.46519820998301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.0299539332286,
            67.83284288222583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.7330789332286,
            67.76642456437473
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.5133523707286,
            67.04040645497746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.5133523707286,
            66.71251010893084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.9967508082286,
            67.5492582191434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.0846414332286,
            68.17845783054078
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.0846414332286,
            68.64731638835198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.6451883082286,
            68.55110541997098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.9088601832286,
            67.96511464493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.6891336207286,
            67.14304241017079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.6891336207286,
            66.88563486795984
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.6891336207286,
            66.6254891769653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.9860086207286,
            66.46807758996505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.17433642484166,
            66.45021684972579
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.54835986234166,
            65.9272768173725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.96532491934163,
            65.98141527518352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.66844991934163,
            65.87743740208052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.22899679434163,
            65.69720756719478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.36083273184163,
            65.53391997661636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.66844991934163,
            65.4062072505556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.37157491934163,
            65.87743740208052
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.19579366934163,
            65.47926232711892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.84423116934163,
            65.332948092202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.09716085684163,
            65.67911516565601
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.49266866934163,
            65.332948092202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.66844991934163,
            64.9077249150196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.18505148184163,
            64.77695389127875
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.78954366934163,
            64.60788381662273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.30614523184163,
            64.47565393591485
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.91063741934163,
            64.55129235028336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.11962179434163,
            65.1455017300851
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.85594991934163,
            65.34790535451093
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.50438741934163,
            64.5666925527085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.68016866934163,
            64.10996528133174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.68016866934163,
            63.99459561361982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.07567648184163,
            64.62325204559168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.55907491934163,
            64.35829973456573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.33934835684163,
            64.10996528133174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.07567648184163,
            67.1864340897626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.89989523184163,
            68.203670558394
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.37255148184163,
            69.17766590687332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.41649679434163,
            68.47939053653616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.37255148184163,
            68.13830847407608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.50438741934163,
            68.2851117553636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19677023184163,
            68.00702474226321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19677023184163,
            68.83127500876506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.41649679434163,
            69.02089183083115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19677023184163,
            67.82528581659219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.28466085684163,
            67.2204881761559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.76805929434163,
            63.87874778836512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.76805929434163,
            69.11555715212768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.54833273184163,
            68.54425972171838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.41625265371663,
            69.39572986719553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.10863546621663,
            69.43049770455944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.80101827871663,
            69.39959573447588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.91088155996663,
            69.32602549278992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.43822530996663,
            69.36090582259963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.85570577871663,
            69.51909402081725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.51488546621663,
            69.59583733582441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.31713155996663,
            69.46135532557243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.09740499746663,
            69.43049770455944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.67992452871663,
            69.34928530376122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.20751241934163,
            69.31826665686877
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.76805929434163,
            69.30274063149136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.53734640371663,
            69.25998658108126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.53734640371663,
            69.20154953101812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.53734640371663,
            69.1429551448297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.52636007559163,
            69.06458392548264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.29564718496663,
            68.95439158975451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.09789327871663,
            69.07635751463145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.87816671621663,
            69.14686633940346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.54857687246663,
            69.00168451872801
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.75731710684163,
            69.24831174058527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.28466085684163,
            69.31050503672144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.69115499746663,
            69.47676752227547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.99877218496663,
            69.51909402081725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.97679952871663,
            69.34928530376122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.94384054434163,
            69.25609566538883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.59227804434163,
            69.11555715212768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.38353780996663,
            68.9346562066025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.02074484121663,
            69.01349188683567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.10863546621663,
            68.80395902204555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.06469015371663,
            68.64049995803963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.48241476309163,
            68.42337835229817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.63919265634713,
            68.4137672138723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.63919265634713,
            68.30031160488429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.60623367197213,
            68.18628861355795
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.56228835947213,
            68.1003975916309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.57327468759713,
            67.99772710244658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.03470046884713,
            68.12497064568463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.46316726572213,
            68.14951747833925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.25393875009713,
            68.28405739938029
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.10013015634713,
            68.31655423116179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.56204421884713,
            68.12906360475672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83694656259713,
            68.05527881178735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.77102859384713,
            68.08810122424033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.65017898447213,
            68.02240966518956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.39749343759713,
            67.9647760370336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.67215164072213,
            68.26779160770413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83694656259713,
            68.38140908287706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.79300125009713,
            68.45011498312397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.45242507822213,
            68.4178087361157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.35354812509713,
            68.39354879051119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.36453445322213,
            68.36521270407351
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.25268199009048,
            67.75119161475625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.67016245884048,
            67.87565229311754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.86791636509048,
            68.03235328427367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.98852183384048,
            68.08161827629206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.27416636509048,
            67.99945150160748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.62572886509048,
            67.99945150160748
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.09838511509048,
            68.00768133529047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.81274058384048,
            68.04878663224697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.21947886509048,
            68.07341474459277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.75805308384048,
            67.77613680927789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.69213511509048,
            67.6761964776868
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.69213511509048,
            67.47503523655412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.71410777134048,
            67.3568988006486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.73608042759048,
            67.28064421786813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.29662730259048,
            67.3653565502491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.25268199009048,
            67.23817553480772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.31859995884048,
            67.15301258754728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.56029917759048,
            67.10177015286312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.95580699009048,
            67.10177015286312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.24145152134048,
            67.06754813524326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.86791636509048,
            67.05898507349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.91186167759048,
            66.9989589007091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.13158824009048,
            66.93878421716582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.43920542759048,
            66.9043318896193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.57104136509048,
            66.84392322406251
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.72484995884048,
            66.80068279602293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.09838511509048,
            66.70528521052277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.31811167759048,
            66.66180031497827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.71361949009048,
            66.7920255608827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.02123667759048,
            66.97318795315317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.98852183384048,
            67.39071184362616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.18627574009048,
            67.30608939778827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.65893199009048,
            67.22967278283424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.91137339634048,
            67.28064421786813
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.38402964634048,
            67.29761067159788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.44994761509048,
            67.22116702369647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.01049449009048,
            67.21265825651837
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.68090464634048,
            67.62606652266668
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.13158824009048,
            67.71789001003772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.68090464634048,
            67.81765313849516
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.43969370884048,
            67.56744660677734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.12084605259048,
            67.98298305298415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.85717417759048,
            68.36690969643342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.54955699009048,
            68.82397228595802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.54955699009048,
            68.30201344262696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.50561167759048,
            68.09801658628763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.52758433384048,
            67.95001100632268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.72533824009048,
            67.61770115409679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.87914683384048,
            67.8673755261699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.31859995884048,
            67.68454110227565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.96703745884048,
            68.24507726792037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.01098277134048,
            68.3831048657089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.18676402134048,
            68.7125718029525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.87914683384048,
            68.76038313985373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.90111949009048,
            68.70459327524739
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.87914683384048,
            68.95060605271061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.51635386509048,
            68.72852030786059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.75805308384048,
            68.9111108423541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.86544843126316,
            67.62508669313986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.10714765001316,
            67.71691399650423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.37081952501316,
            67.69190571390068
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.67843671251316,
            67.71691399650423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.16183515001316,
            67.62508669313986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.89816327501316,
            67.61672097704756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.55783124376316,
            67.4150516739387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.40402265001316,
            67.16907052700789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.42599530626316,
            66.98936543872524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.95333905626316,
            67.10931688839072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.86544843126316,
            67.35590779960864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.39279218126316,
            67.68356370254044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.12912030626316,
            67.62508669313986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.01925702501316,
            67.4150516739387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.01925702501316,
            67.17759470048478
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.85421796251316,
            66.94638174919295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.59054608751316,
            66.98936543872524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.41476483751316,
            67.00653768571637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.21701093126316,
            67.04941529253767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.05197186876316,
            66.9205551081176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.27169843126316,
            66.85155029237866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.88693280626316,
            66.70426725602037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.57980390001316,
            66.5997704393124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.79953046251316,
            66.57357718980525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.88742108751316,
            66.52986028319643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.90939374376316,
            66.46852729881695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.75558515001316,
            66.45975311294717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.55783124376316,
            66.45975311294717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.40402265001316,
            66.45975311294717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.33810468126316,
            66.45975311294717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.40402265001316,
            66.44219548420034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.51388593126316,
            66.4246255069177
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.71163983751316,
            66.43341203956547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.93087811876316,
            66.05279101713442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.04074140001316,
            66.05279101713442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.23849530626316,
            66.05279101713442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.59005780626316,
            66.04387086824646
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.85372968126316,
            65.97239704207149
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.67794843126316,
            65.7657910473368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.65597577501316,
            65.71161987003926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.76583905626316,
            65.648276404407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.20529218126316,
            65.46643938821629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.20529218126316,
            65.38419777256048
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.90841718126316,
            65.7748085328824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.75460858751316,
            65.79283404559952
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.55685468126316,
            65.82884726216292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.33712811876316,
            65.89174923441537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.08419843126316,
            65.82884726216292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.04025311876316,
            65.72065629256038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.90841718126316,
            65.56660685499047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.99630780626316,
            65.45731417456781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.57882733751316,
            65.19129443085625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.16134686876316,
            65.2649478625098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.38107343126316,
            65.2925150369817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.78829999376316,
            65.32005341432273
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.09591718126316,
            65.23735186718187
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.46945233751316,
            65.03409834265958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.26095624376316,
            64.82928426927299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.48068280626316,
            64.85730569482425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83224530626316,
            64.79187695428911
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83224530626316,
            64.62290030271338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83224530626316,
            64.5380158577515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.31564374376316,
            64.57577494731254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.71115155626316,
            64.82928426927299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.77706952501316,
            64.93188695879506
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.69992108751316,
            64.90394326342309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.39230390001316,
            64.81058710245466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.23849530626316,
            64.85730569482425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.15060468126316,
            64.81058710245466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.39230390001316,
            64.78251701000849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.86496015001316,
            64.55690194053523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.53537030626316,
            64.5380158577515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.96408124376316,
            64.42442437262936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.96408124376316,
            64.34843430863182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.29367108751316,
            64.41493710821923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.16183515001316,
            64.31036038646896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.48068280626316,
            64.5380158577515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.39279218126316,
            64.31988380245528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.28292890001316,
            64.1671136466408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.63449140001316,
            64.41493710821923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.35958905626316,
            64.4623406264422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.41427655626316,
            64.50020443614112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.66671796251316,
            64.76378737666676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.62277265001316,
            65.37504387252172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.41427655626316,
            65.99922320571906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.81027265001316,
            67.47404913595959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.63449140001316,
            68.5595504823782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.09591718126316,
            68.70365842324465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.55734296251316,
            68.66372132622581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.46945233751316,
            68.52740052574265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.51339765001316,
            68.28480809158505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.97482343126316,
            68.08885835849836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.24972577501316,
            67.89122824548129
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.67843671251316,
            67.81668127375117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.30490155626316,
            68.47102755596741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.01925702501316,
            69.07559746282593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.62374921251316,
            68.94968150709084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.57980390001316,
            68.78331886870504
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.46994061876316,
            68.52740052574265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.76681561876316,
            68.75945062358991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.16232343126316,
            68.36596072572462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            68.10525151822102
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.20626874376316,
            67.82497604326664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            67.70858086000949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            67.53290048571976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.20626874376316,
            67.43192301856652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.20626874376316,
            67.31357236862773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.20626874376316,
            67.2116612779171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.14035077501316,
            69.14610873451964
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.14035077501316,
            69.08344328075695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            69.0284634959999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            68.98122815058835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            68.92599186835231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            68.86269503561968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            68.77536563093565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            68.71961329605944
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            68.65572534305427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            68.61570256081032
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            68.5595504823782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            69.16174704899503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87667890001316,
            68.98122815058835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87667890001316,
            68.86269503561968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            68.7116372849303
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.83273358751316,
            68.64772650327652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.83273358751316,
            68.55151729586372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.85470624376316,
            68.49520464190894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.85470624376316,
            68.31730385418338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87667890001316,
            68.24412321140818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            68.06424673681735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            68.00671738127674
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            67.8332678675832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            67.71691399650423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            67.62508669313986
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.92062421251316,
            67.49087870361545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96456952501316,
            67.31357236862773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96456952501316,
            67.15201313897761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96456952501316,
            67.09221725754492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.98654218126316,
            66.97218106448761
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.98654218126316,
            66.79101118680258
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96456952501316,
            66.61721724760271
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.96456952501316,
            66.49483135295809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.54708905626316,
            69.08344328075695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            68.98122815058835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            68.94968150709084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.56906171251316,
            68.81510340056582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.54708905626316,
            68.63972480602796
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52511640001316,
            68.47102755596741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52511640001316,
            68.33353437406814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            68.16253578204973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.98201807019818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.87393834052894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70089765001316,
            67.44802432601664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.59103436876316,
            67.50694013611681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.76610281249103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.63269723877006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.41429250717937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.61300702501316,
            67.18534940812734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.65695233751316,
            67.04007475541101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.65695233751316,
            66.85077321258254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70089765001316,
            66.61643274066816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70089765001316,
            66.56405379467074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70089765001316,
            66.44140543854071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            66.70348550659284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            69.01202166931608
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            68.94107751705812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.26144452501316,
            68.90156524269698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.26144452501316,
            68.74280758606211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            68.6789860259729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            68.55882792206873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            68.39761313850397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            68.2678109389647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            68.19447137331237
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30538983751316,
            68.038869608631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.34933515001316,
            67.81593491924127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.34933515001316,
            67.5740938001884
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32736249376316,
            67.51534475956754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            67.32975367163233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            67.19386782832949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            67.07433555940483
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.26144452501316,
            66.91116498762892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23947186876316,
            66.75557018888675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            66.59898537992814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32736249376316,
            68.57488621069088
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.41525311876316,
            68.44609840255599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.34933515001316,
            68.32469048736615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32736249376316,
            68.05529832279575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32736249376316,
            67.9895132953339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.32736249376316,
            67.70783105339163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.34933515001316,
            67.59922737092343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.08566327501316,
            68.99627604932617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01974530626316,
            68.89365430149523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01974530626316,
            68.84612917758287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01974530626316,
            68.79055415040617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01974530626316,
            68.7507724596973
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.04171796251316,
            68.68697370122838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.04171796251316,
            68.59093303797785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01974530626316,
            68.51058421894595
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            68.39761313850397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            68.28407671687192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            68.17814174729594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            68.06350829812007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            68.01420461553735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            67.90701845250966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            67.79103213531609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            67.65776850038364
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.99777265001316,
            67.60759928897329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            67.50694013611681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            67.32128331991758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            67.2023832376815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            67.04007475541101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            66.93700156258758
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.90988202501316,
            66.80754487007094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97579999376316,
            66.68609946835436
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17355390001316,
            66.57279130115369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.50314374376316,
            66.51156415190854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.65695233751316,
            66.47650946480458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18429608751316,
            66.40625201686832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19552655626316,
            65.47474091739662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28341718126316,
            65.3467385012387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.00851483751316,
            65.56578921225231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.36007733751316,
            65.61119430262728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.49191327501316,
            65.58396076241547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.20626874376316,
            65.43823254760954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.05246015001316,
            65.26412075589026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.09640546251316,
            65.15356014946343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.55783124376316,
            65.0981064424399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.03048749376316,
            64.99614027359416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87667890001316,
            64.97755904214353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.56906171251316,
            64.94966297060822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.50314374376316,
            64.74420138097113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.50314374376316,
            64.48042749861932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.16232343126316,
            64.67849765116142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22824140001316,
            64.79103505239196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.93136640001316,
            64.79103505239196
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.41283897134939,
            65.50261315100539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.24804404947439,
            65.59356432447703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23156455728689,
            65.67514926062057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.27550986978689,
            65.56631230480201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.28100303384939,
            65.46614370503971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17663291666189,
            65.33580702249532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.36889365884939,
            65.33122203688166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52819541666189,
            65.37016895776183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70397666666189,
            65.40677221013448
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.86877158853689,
            65.477545875058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.94567588541189,
            65.39305197237331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.27001670572439,
            65.42733911527499
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17663291666189,
            65.66609693058773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.22057822916189,
            65.30369534048697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.16015342447439,
            65.23475260228268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17663291666189,
            65.20021364663172
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17663291666189,
            65.16793658116119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17663291666189,
            65.12175823242649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19311240884939,
            65.08012898050382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19860557291189,
            64.97809392706584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19860557291189,
            64.9315852446934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.63226288831969,
            53.88066725060427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.30267304456969,
            53.490293122737846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.08294648206969,
            53.13585615574734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.19280976331969,
            53.93244395268843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.54437226331969,
            54.305908577766566
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.96185273206969,
            54.764849892816734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.17034882581969,
            55.2812668856704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.60980195081969,
            55.43115691557238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.46673554456969,
            55.63012860195074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.77484101331969,
            55.1308088086357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.48919648206969,
            55.030187292943246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.26946991956969,
            54.92931249129058
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.07171601331969,
            54.71411107256479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.80804413831969,
            54.497761374294186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.63226288831969,
            53.69894298996317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.45648163831969,
            53.43796956526044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.12689179456969,
            53.04348423693615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.88519257581969,
            52.831603254145534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.47845429456969,
            54.57425140049517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.00579804456969,
            55.21864511778094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.76361054456969,
            55.58048002102127
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.13714570081969,
            55.65492933097717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.52191132581969,
            56.074143891646514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.60980195081969,
            56.513101848433415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.85150116956969,
            56.70657930669101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.47747773206969,
            56.08640531105528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.33441132581969,
            56.2942530475574
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.12542695081969,
            56.30644434205606
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.52093476331969,
            56.06187856992087
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.59759491956967,
            56.26985878787826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.96087616956969,
            56.537340757274514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -126.04876679456969,
            56.80294669098459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.30120820081969,
            56.99494057897869
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.76361054456969,
            56.48884742950693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.96136445081969,
            56.70657930669101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -124.29095429456969,
            57.13828916094231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.87298554456969,
            56.46457749491961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -125.98284882581969,
            56.28205786306097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -127.69671601331969,
            56.75479390667332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -128.26800507581967,
            56.037336216800654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.34613007581969,
            55.91439008158794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.23626679456969,
            55.71686247516958
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.10443085706969,
            55.60531216706135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.90667695081969,
            55.468540797000124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.68695038831969,
            55.36877169820026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.26946991956969,
            55.10567715745955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.91790741956969,
            54.91668531574755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.74212616956969,
            54.8028623123111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50042695081969,
            54.650598143372335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.97308320081969,
            54.35715708234597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.81927460706969,
            54.22891602297131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.31390351331969,
            53.78990352288961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.35784882581969,
            54.113157389315695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.57757538831969,
            54.21606994637605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.53363007581969,
            53.01705583420992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.22601288831969,
            52.87140997955036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.00628632581969,
            52.7651775698372
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.91839570081969,
            52.711963956810315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.87445038831969,
            52.63202168301471
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.11614960706969,
            53.8158560900333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.66546601331969,
            54.13890952763311
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.66546601331969,
            54.1517795955425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.59543859485458,
            54.1365884406012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.26584875110458,
            54.007660409713104
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.37571203235458,
            53.93011130990977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.01340734485458,
            53.527138370612214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.91453039172958,
            53.363555141850725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.35422765735458,
            53.23223468226628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.22239171985458,
            53.120294633613966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.76047765735458,
            52.94190667016617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.09006750110458,
            53.087315485009555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87058507922958,
            53.33732334706458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.33225500110458,
            53.041102187527144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.14548742297958,
            52.77607415544284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.35422765735458,
            52.75613165501612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.71677648547958,
            52.7627801700038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.07956945422958,
            52.656282101762066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.79392492297958,
            52.79600752324296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.69504796985458,
            52.88227996107261
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.39841711047958,
            52.66960857755823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.21164953235458,
            52.722873854781255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.21164953235458,
            52.81593176018719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.35398351672958,
            53.48139855372552
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.45286046985458,
            53.520607132573524
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.62864171985458,
            53.72260758187336
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.72751867297958,
            53.61847000187949
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.15598546985458,
            53.51407488747985
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.81516515735458,
            53.45523935256684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.21140539172958,
            52.636284768593676
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.92576086047958,
            52.5361608941746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.74997961047958,
            52.66960857755823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.87082921985458,
            52.79600752324296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.24460851672958,
            52.455897040456655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.10178625110458,
            52.489358118552296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.07981359485458,
            52.542842936204366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.86008703235458,
            52.34865055636716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.68430578235458,
            52.2411432503367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -116.86008703235458,
            52.21422564046338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.16770421985458,
            52.26804454289293
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.11228429797958,
            53.527138370612214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.47483312610458,
            53.43560937049775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.58445226672958,
            53.81351693527907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.07883703235458,
            54.130151545740766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.43088781360458,
            53.85241784443441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.81565343860458,
            53.59239537848326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.41990148547958,
            53.41597031673132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.09006750110458,
            53.05431104619914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.00242101672958,
            53.3897707969245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.61765539172958,
            53.47486026482585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.59568273547958,
            53.37011056854373
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.33201086047958,
            53.1532485004735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.79343664172958,
            53.93657924712137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.40891515735458,
            52.62294813274459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.82663976672958,
            52.75613165501612
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.15622961047958,
            52.948526793755605
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.74949132922958,
            53.2388102967299
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.99119054797958,
            53.4944721091655
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.99119054797958,
            53.78756291988065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.95847570422958,
            53.23223468226628
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.59592687610458,
            52.5562039693224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.82663976672958,
            53.107106008456036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.09031164172958,
            53.284811320627504
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 4
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
            ee.Geometry.Point([-120.44671883090025, 67.38083992056755]),
            {
              "Name": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.33636726840025, 67.59955141388372]),
            {
              "Name": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50140633090025, 67.86598134832212]),
            {
              "Name": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.24847664340025, 68.53503014840318]),
            {
              "Name": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.23773445590025, 69.1222288311577]),
            {
              "Name": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.20453133090025, 69.18478325546648]),
            {
              "Name": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.42425789340025, 69.20039385507589]),
            {
              "Name": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.89691414340025, 69.1065621842644]),
            {
              "Name": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.58929695590025, 68.99658082889702]),
            {
              "Name": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50140633090025, 68.69526747330411]),
            {
              "Name": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.24847664340025, 68.40601416733192]),
            {
              "Name": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.42425789340025, 68.90187133405504]),
            {
              "Name": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.20453133090025, 68.83850537131761]),
            {
              "Name": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.76507820590025, 68.71122834043831]),
            {
              "Name": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.58929695590025, 68.47061420772025]),
            {
              "Name": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.24847664340025, 68.325004550506]),
            {
              "Name": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.07269539340025, 68.22741116780401]),
            {
              "Name": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.94085945590025, 68.325004550506]),
            {
              "Name": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50140633090025, 68.325004550506]),
            {
              "Name": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.01800789340025, 68.40601416733192]),
            {
              "Name": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.06195320590025, 67.76642456437473]),
            {
              "Name": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.67718758090025, 67.53247003775355]),
            {
              "Name": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.19378914340025, 67.39773548285922]),
            {
              "Name": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.36957039340025, 67.24524405062157]),
            {
              "Name": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.58929695590025, 67.24524405062157]),
            {
              "Name": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.60003914340025, 67.41461908594692]),
            {
              "Name": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.60003914340025, 68.16211679831287]),
            {
              "Name": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.86371101840025, 68.69526747330411]),
            {
              "Name": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.81976570590025, 69.47947799911474]),
            {
              "Name": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.98480476840025, 69.67880675850704]),
            {
              "Name": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50140633090025, 69.63297301212201]),
            {
              "Name": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.28167976840025, 69.52564238051342]),
            {
              "Name": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.01800789340025, 69.0280603612019]),
            {
              "Name": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.01800789340025, 68.27626001192112]),
            {
              "Name": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.22601570590025, 68.90187133405504]),
            {
              "Name": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.12738289340025, 69.29382272699846]),
            {
              "Name": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.47894539340025, 68.72717780516906]),
            {
              "Name": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.78656258090025, 68.17845783054078]),
            {
              "Name": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.93988289340025, 68.71122834043831]),
            {
              "Name": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.76410164340025, 68.98082414884185]),
            {
              "Name": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.33539070590025, 69.15352846222326]),
            {
              "Name": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.30218758090025, 69.24715854823873]),
            {
              "Name": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.35687508090027, 69.27827915758014]),
            {
              "Name": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.1393289332286, 68.93348637042929]),
            {
              "Name": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.1178445582286, 69.1065621842644]),
            {
              "Name": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.1617898707286, 68.77495785404176]),
            {
              "Name": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.8541726832286, 68.325004550506]),
            {
              "Name": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.3268289332286, 68.0474033146326]),
            {
              "Name": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.5797586207286, 67.51566995313725]),
            {
              "Name": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.3160867457286, 67.1941974250904]),
            {
              "Name": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.3600320582286, 66.98892513597538]),
            {
              "Name": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.0631570582286, 66.971740450811]),
            {
              "Name": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.4586648707286, 67.41461908594692]),
            {
              "Name": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.1178445582286, 67.43149073683077]),
            {
              "Name": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.9860086207286, 68.06382596009209]),
            {
              "Name": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.3815164332286, 67.94862177374729]),
            {
              "Name": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.9860086207286, 67.12596661928606]),
            {
              "Name": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.6783914332286, 66.93733467013239]),
            {
              "Name": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.5905008082286, 66.88563486795984]),
            {
              "Name": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.2828836207286, 66.8511074971774]),
            {
              "Name": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.6237039332286, 66.93733467013239]),
            {
              "Name": 4,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.2389383082286, 66.72987754790417]),
            {
              "Name": 4,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.9420633082286, 66.6603343252766]),
            {
              "Name": 4,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.2936258082286, 67.46519820998301]),
            {
              "Name": 4,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.0299539332286, 67.83284288222583]),
            {
              "Name": 4,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.7330789332286, 67.76642456437473]),
            {
              "Name": 4,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.5133523707286, 67.04040645497746]),
            {
              "Name": 4,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.5133523707286, 66.71251010893084]),
            {
              "Name": 4,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.9967508082286, 67.5492582191434]),
            {
              "Name": 4,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.0846414332286, 68.17845783054078]),
            {
              "Name": 4,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.0846414332286, 68.64731638835198]),
            {
              "Name": 4,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.6451883082286, 68.55110541997098]),
            {
              "Name": 4,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.9088601832286, 67.96511464493]),
            {
              "Name": 4,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.6891336207286, 67.14304241017079]),
            {
              "Name": 4,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.6891336207286, 66.88563486795984]),
            {
              "Name": 4,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.6891336207286, 66.6254891769653]),
            {
              "Name": 4,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.9860086207286, 66.46807758996505]),
            {
              "Name": 4,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.17433642484166, 66.45021684972579]),
            {
              "Name": 4,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.54835986234166, 65.9272768173725]),
            {
              "Name": 4,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.96532491934163, 65.98141527518352]),
            {
              "Name": 4,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.66844991934163, 65.87743740208052]),
            {
              "Name": 4,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.22899679434163, 65.69720756719478]),
            {
              "Name": 4,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.36083273184163, 65.53391997661636]),
            {
              "Name": 4,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.66844991934163, 65.4062072505556]),
            {
              "Name": 4,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.37157491934163, 65.87743740208052]),
            {
              "Name": 4,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.19579366934163, 65.47926232711892]),
            {
              "Name": 4,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.84423116934163, 65.332948092202]),
            {
              "Name": 4,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.09716085684163, 65.67911516565601]),
            {
              "Name": 4,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.49266866934163, 65.332948092202]),
            {
              "Name": 4,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.66844991934163, 64.9077249150196]),
            {
              "Name": 4,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.18505148184163, 64.77695389127875]),
            {
              "Name": 4,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.78954366934163, 64.60788381662273]),
            {
              "Name": 4,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.30614523184163, 64.47565393591485]),
            {
              "Name": 4,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.91063741934163, 64.55129235028336]),
            {
              "Name": 4,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.11962179434163, 65.1455017300851]),
            {
              "Name": 4,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.85594991934163, 65.34790535451093]),
            {
              "Name": 4,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.50438741934163, 64.5666925527085]),
            {
              "Name": 4,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.68016866934163, 64.10996528133174]),
            {
              "Name": 4,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.68016866934163, 63.99459561361982]),
            {
              "Name": 4,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.07567648184163, 64.62325204559168]),
            {
              "Name": 4,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.55907491934163, 64.35829973456573]),
            {
              "Name": 4,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.33934835684163, 64.10996528133174]),
            {
              "Name": 4,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.07567648184163, 67.1864340897626]),
            {
              "Name": 4,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.89989523184163, 68.203670558394]),
            {
              "Name": 4,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37255148184163, 69.17766590687332]),
            {
              "Name": 4,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.41649679434163, 68.47939053653616]),
            {
              "Name": 4,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37255148184163, 68.13830847407608]),
            {
              "Name": 4,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.50438741934163, 68.2851117553636]),
            {
              "Name": 4,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19677023184163, 68.00702474226321]),
            {
              "Name": 4,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19677023184163, 68.83127500876506]),
            {
              "Name": 4,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.41649679434163, 69.02089183083115]),
            {
              "Name": 4,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19677023184163, 67.82528581659219]),
            {
              "Name": 4,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.28466085684163, 67.2204881761559]),
            {
              "Name": 4,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.76805929434163, 63.87874778836512]),
            {
              "Name": 4,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.76805929434163, 69.11555715212768]),
            {
              "Name": 4,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.54833273184163, 68.54425972171838]),
            {
              "Name": 4,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.41625265371663, 69.39572986719553]),
            {
              "Name": 4,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.10863546621663, 69.43049770455944]),
            {
              "Name": 4,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.80101827871663, 69.39959573447588]),
            {
              "Name": 4,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.91088155996663, 69.32602549278992]),
            {
              "Name": 4,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.43822530996663, 69.36090582259963]),
            {
              "Name": 4,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.85570577871663, 69.51909402081725]),
            {
              "Name": 4,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.51488546621663, 69.59583733582441]),
            {
              "Name": 4,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.31713155996663, 69.46135532557243]),
            {
              "Name": 4,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.09740499746663, 69.43049770455944]),
            {
              "Name": 4,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.67992452871663, 69.34928530376122]),
            {
              "Name": 4,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.20751241934163, 69.31826665686877]),
            {
              "Name": 4,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.76805929434163, 69.30274063149136]),
            {
              "Name": 4,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.53734640371663, 69.25998658108126]),
            {
              "Name": 4,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.53734640371663, 69.20154953101812]),
            {
              "Name": 4,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.53734640371663, 69.1429551448297]),
            {
              "Name": 4,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.52636007559163, 69.06458392548264]),
            {
              "Name": 4,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.29564718496663, 68.95439158975451]),
            {
              "Name": 4,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.09789327871663, 69.07635751463145]),
            {
              "Name": 4,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87816671621663, 69.14686633940346]),
            {
              "Name": 4,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.54857687246663, 69.00168451872801]),
            {
              "Name": 4,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.75731710684163, 69.24831174058527]),
            {
              "Name": 4,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.28466085684163, 69.31050503672144]),
            {
              "Name": 4,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.69115499746663, 69.47676752227547]),
            {
              "Name": 4,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.99877218496663, 69.51909402081725]),
            {
              "Name": 4,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.97679952871663, 69.34928530376122]),
            {
              "Name": 4,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.94384054434163, 69.25609566538883]),
            {
              "Name": 4,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.59227804434163, 69.11555715212768]),
            {
              "Name": 4,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.38353780996663, 68.9346562066025]),
            {
              "Name": 4,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.02074484121663, 69.01349188683567]),
            {
              "Name": 4,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.10863546621663, 68.80395902204555]),
            {
              "Name": 4,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.06469015371663, 68.64049995803963]),
            {
              "Name": 4,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.48241476309163, 68.42337835229817]),
            {
              "Name": 4,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.63919265634713, 68.4137672138723]),
            {
              "Name": 4,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.63919265634713, 68.30031160488429]),
            {
              "Name": 4,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.60623367197213, 68.18628861355795]),
            {
              "Name": 4,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.56228835947213, 68.1003975916309]),
            {
              "Name": 4,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.57327468759713, 67.99772710244658]),
            {
              "Name": 4,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.03470046884713, 68.12497064568463]),
            {
              "Name": 4,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.46316726572213, 68.14951747833925]),
            {
              "Name": 4,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.25393875009713, 68.28405739938029]),
            {
              "Name": 4,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.10013015634713, 68.31655423116179]),
            {
              "Name": 4,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.56204421884713, 68.12906360475672]),
            {
              "Name": 4,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83694656259713, 68.05527881178735]),
            {
              "Name": 4,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.77102859384713, 68.08810122424033]),
            {
              "Name": 4,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.65017898447213, 68.02240966518956]),
            {
              "Name": 4,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.39749343759713, 67.9647760370336]),
            {
              "Name": 4,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.67215164072213, 68.26779160770413]),
            {
              "Name": 4,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83694656259713, 68.38140908287706]),
            {
              "Name": 4,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.79300125009713, 68.45011498312397]),
            {
              "Name": 4,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.45242507822213, 68.4178087361157]),
            {
              "Name": 4,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.35354812509713, 68.39354879051119]),
            {
              "Name": 4,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.36453445322213, 68.36521270407351]),
            {
              "Name": 4,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.25268199009048, 67.75119161475625]),
            {
              "Name": 4,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.67016245884048, 67.87565229311754]),
            {
              "Name": 4,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.86791636509048, 68.03235328427367]),
            {
              "Name": 4,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.98852183384048, 68.08161827629206]),
            {
              "Name": 4,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.27416636509048, 67.99945150160748]),
            {
              "Name": 4,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.62572886509048, 67.99945150160748]),
            {
              "Name": 4,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.09838511509048, 68.00768133529047]),
            {
              "Name": 4,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.81274058384048, 68.04878663224697]),
            {
              "Name": 4,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.21947886509048, 68.07341474459277]),
            {
              "Name": 4,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.75805308384048, 67.77613680927789]),
            {
              "Name": 4,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.69213511509048, 67.6761964776868]),
            {
              "Name": 4,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.69213511509048, 67.47503523655412]),
            {
              "Name": 4,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.71410777134048, 67.3568988006486]),
            {
              "Name": 4,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.73608042759048, 67.28064421786813]),
            {
              "Name": 4,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.29662730259048, 67.3653565502491]),
            {
              "Name": 4,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.25268199009048, 67.23817553480772]),
            {
              "Name": 4,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.31859995884048, 67.15301258754728]),
            {
              "Name": 4,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.56029917759048, 67.10177015286312]),
            {
              "Name": 4,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.95580699009048, 67.10177015286312]),
            {
              "Name": 4,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.24145152134048, 67.06754813524326]),
            {
              "Name": 4,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.86791636509048, 67.05898507349]),
            {
              "Name": 4,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.91186167759048, 66.9989589007091]),
            {
              "Name": 4,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.13158824009048, 66.93878421716582]),
            {
              "Name": 4,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.43920542759048, 66.9043318896193]),
            {
              "Name": 4,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.57104136509048, 66.84392322406251]),
            {
              "Name": 4,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.72484995884048, 66.80068279602293]),
            {
              "Name": 4,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.09838511509048, 66.70528521052277]),
            {
              "Name": 4,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.31811167759048, 66.66180031497827]),
            {
              "Name": 4,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.71361949009048, 66.7920255608827]),
            {
              "Name": 4,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.02123667759048, 66.97318795315317]),
            {
              "Name": 4,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.98852183384048, 67.39071184362616]),
            {
              "Name": 4,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.18627574009048, 67.30608939778827]),
            {
              "Name": 4,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.65893199009048, 67.22967278283424]),
            {
              "Name": 4,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.91137339634048, 67.28064421786813]),
            {
              "Name": 4,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.38402964634048, 67.29761067159788]),
            {
              "Name": 4,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.44994761509048, 67.22116702369647]),
            {
              "Name": 4,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.01049449009048, 67.21265825651837]),
            {
              "Name": 4,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.68090464634048, 67.62606652266668]),
            {
              "Name": 4,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.13158824009048, 67.71789001003772]),
            {
              "Name": 4,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.68090464634048, 67.81765313849516]),
            {
              "Name": 4,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.43969370884048, 67.56744660677734]),
            {
              "Name": 4,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12084605259048, 67.98298305298415]),
            {
              "Name": 4,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.85717417759048, 68.36690969643342]),
            {
              "Name": 4,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.54955699009048, 68.82397228595802]),
            {
              "Name": 4,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.54955699009048, 68.30201344262696]),
            {
              "Name": 4,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.50561167759048, 68.09801658628763]),
            {
              "Name": 4,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.52758433384048, 67.95001100632268]),
            {
              "Name": 4,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.72533824009048, 67.61770115409679]),
            {
              "Name": 4,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87914683384048, 67.8673755261699]),
            {
              "Name": 4,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.31859995884048, 67.68454110227565]),
            {
              "Name": 4,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.96703745884048, 68.24507726792037]),
            {
              "Name": 4,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.01098277134048, 68.3831048657089]),
            {
              "Name": 4,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.18676402134048, 68.7125718029525]),
            {
              "Name": 4,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87914683384048, 68.76038313985373]),
            {
              "Name": 4,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.90111949009048, 68.70459327524739]),
            {
              "Name": 4,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87914683384048, 68.95060605271061]),
            {
              "Name": 4,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.51635386509048, 68.72852030786059]),
            {
              "Name": 4,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.75805308384048, 68.9111108423541]),
            {
              "Name": 4,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.86544843126316, 67.62508669313986]),
            {
              "Name": 4,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.10714765001316, 67.71691399650423]),
            {
              "Name": 4,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37081952501316, 67.69190571390068]),
            {
              "Name": 4,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.67843671251316, 67.71691399650423]),
            {
              "Name": 4,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.16183515001316, 67.62508669313986]),
            {
              "Name": 4,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.89816327501316, 67.61672097704756]),
            {
              "Name": 4,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.55783124376316, 67.4150516739387]),
            {
              "Name": 4,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.40402265001316, 67.16907052700789]),
            {
              "Name": 4,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.42599530626316, 66.98936543872524]),
            {
              "Name": 4,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.95333905626316, 67.10931688839072]),
            {
              "Name": 4,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.86544843126316, 67.35590779960864]),
            {
              "Name": 4,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.39279218126316, 67.68356370254044]),
            {
              "Name": 4,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12912030626316, 67.62508669313986]),
            {
              "Name": 4,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.01925702501316, 67.4150516739387]),
            {
              "Name": 4,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.01925702501316, 67.17759470048478]),
            {
              "Name": 4,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.85421796251316, 66.94638174919295]),
            {
              "Name": 4,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.59054608751316, 66.98936543872524]),
            {
              "Name": 4,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.41476483751316, 67.00653768571637]),
            {
              "Name": 4,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.21701093126316, 67.04941529253767]),
            {
              "Name": 4,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.05197186876316, 66.9205551081176]),
            {
              "Name": 4,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.27169843126316, 66.85155029237866]),
            {
              "Name": 4,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.88693280626316, 66.70426725602037]),
            {
              "Name": 4,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.57980390001316, 66.5997704393124]),
            {
              "Name": 4,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.79953046251316, 66.57357718980525]),
            {
              "Name": 4,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.88742108751316, 66.52986028319643]),
            {
              "Name": 4,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.90939374376316, 66.46852729881695]),
            {
              "Name": 4,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.75558515001316, 66.45975311294717]),
            {
              "Name": 4,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.55783124376316, 66.45975311294717]),
            {
              "Name": 4,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.40402265001316, 66.45975311294717]),
            {
              "Name": 4,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.33810468126316, 66.45975311294717]),
            {
              "Name": 4,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.40402265001316, 66.44219548420034]),
            {
              "Name": 4,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.51388593126316, 66.4246255069177]),
            {
              "Name": 4,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.71163983751316, 66.43341203956547]),
            {
              "Name": 4,
              "system:index": "258"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.93087811876316, 66.05279101713442]),
            {
              "Name": 4,
              "system:index": "259"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.04074140001316, 66.05279101713442]),
            {
              "Name": 4,
              "system:index": "260"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.23849530626316, 66.05279101713442]),
            {
              "Name": 4,
              "system:index": "261"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.59005780626316, 66.04387086824646]),
            {
              "Name": 4,
              "system:index": "262"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.85372968126316, 65.97239704207149]),
            {
              "Name": 4,
              "system:index": "263"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.67794843126316, 65.7657910473368]),
            {
              "Name": 4,
              "system:index": "264"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.65597577501316, 65.71161987003926]),
            {
              "Name": 4,
              "system:index": "265"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.76583905626316, 65.648276404407]),
            {
              "Name": 4,
              "system:index": "266"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.20529218126316, 65.46643938821629]),
            {
              "Name": 4,
              "system:index": "267"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.20529218126316, 65.38419777256048]),
            {
              "Name": 4,
              "system:index": "268"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.90841718126316, 65.7748085328824]),
            {
              "Name": 4,
              "system:index": "269"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.75460858751316, 65.79283404559952]),
            {
              "Name": 4,
              "system:index": "270"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.55685468126316, 65.82884726216292]),
            {
              "Name": 4,
              "system:index": "271"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.33712811876316, 65.89174923441537]),
            {
              "Name": 4,
              "system:index": "272"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.08419843126316, 65.82884726216292]),
            {
              "Name": 4,
              "system:index": "273"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.04025311876316, 65.72065629256038]),
            {
              "Name": 4,
              "system:index": "274"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.90841718126316, 65.56660685499047]),
            {
              "Name": 4,
              "system:index": "275"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.99630780626316, 65.45731417456781]),
            {
              "Name": 4,
              "system:index": "276"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.57882733751316, 65.19129443085625]),
            {
              "Name": 4,
              "system:index": "277"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.16134686876316, 65.2649478625098]),
            {
              "Name": 4,
              "system:index": "278"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.38107343126316, 65.2925150369817]),
            {
              "Name": 4,
              "system:index": "279"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.78829999376316, 65.32005341432273]),
            {
              "Name": 4,
              "system:index": "280"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.09591718126316, 65.23735186718187]),
            {
              "Name": 4,
              "system:index": "281"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.46945233751316, 65.03409834265958]),
            {
              "Name": 4,
              "system:index": "282"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26095624376316, 64.82928426927299]),
            {
              "Name": 4,
              "system:index": "283"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.48068280626316, 64.85730569482425]),
            {
              "Name": 4,
              "system:index": "284"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83224530626316, 64.79187695428911]),
            {
              "Name": 4,
              "system:index": "285"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83224530626316, 64.62290030271338]),
            {
              "Name": 4,
              "system:index": "286"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83224530626316, 64.5380158577515]),
            {
              "Name": 4,
              "system:index": "287"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.31564374376316, 64.57577494731254]),
            {
              "Name": 4,
              "system:index": "288"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.71115155626316, 64.82928426927299]),
            {
              "Name": 4,
              "system:index": "289"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.77706952501316, 64.93188695879506]),
            {
              "Name": 4,
              "system:index": "290"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.69992108751316, 64.90394326342309]),
            {
              "Name": 4,
              "system:index": "291"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.39230390001316, 64.81058710245466]),
            {
              "Name": 4,
              "system:index": "292"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.23849530626316, 64.85730569482425]),
            {
              "Name": 4,
              "system:index": "293"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.15060468126316, 64.81058710245466]),
            {
              "Name": 4,
              "system:index": "294"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.39230390001316, 64.78251701000849]),
            {
              "Name": 4,
              "system:index": "295"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.86496015001316, 64.55690194053523]),
            {
              "Name": 4,
              "system:index": "296"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.53537030626316, 64.5380158577515]),
            {
              "Name": 4,
              "system:index": "297"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.96408124376316, 64.42442437262936]),
            {
              "Name": 4,
              "system:index": "298"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.96408124376316, 64.34843430863182]),
            {
              "Name": 4,
              "system:index": "299"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.29367108751316, 64.41493710821923]),
            {
              "Name": 4,
              "system:index": "300"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.16183515001316, 64.31036038646896]),
            {
              "Name": 4,
              "system:index": "301"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.48068280626316, 64.5380158577515]),
            {
              "Name": 4,
              "system:index": "302"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.39279218126316, 64.31988380245528]),
            {
              "Name": 4,
              "system:index": "303"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.28292890001316, 64.1671136466408]),
            {
              "Name": 4,
              "system:index": "304"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.63449140001316, 64.41493710821923]),
            {
              "Name": 4,
              "system:index": "305"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.35958905626316, 64.4623406264422]),
            {
              "Name": 4,
              "system:index": "306"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.41427655626316, 64.50020443614112]),
            {
              "Name": 4,
              "system:index": "307"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.66671796251316, 64.76378737666676]),
            {
              "Name": 4,
              "system:index": "308"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.62277265001316, 65.37504387252172]),
            {
              "Name": 4,
              "system:index": "309"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.41427655626316, 65.99922320571906]),
            {
              "Name": 4,
              "system:index": "310"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.81027265001316, 67.47404913595959]),
            {
              "Name": 4,
              "system:index": "311"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.63449140001316, 68.5595504823782]),
            {
              "Name": 4,
              "system:index": "312"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.09591718126316, 68.70365842324465]),
            {
              "Name": 4,
              "system:index": "313"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.55734296251316, 68.66372132622581]),
            {
              "Name": 4,
              "system:index": "314"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.46945233751316, 68.52740052574265]),
            {
              "Name": 4,
              "system:index": "315"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.51339765001316, 68.28480809158505]),
            {
              "Name": 4,
              "system:index": "316"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.97482343126316, 68.08885835849836]),
            {
              "Name": 4,
              "system:index": "317"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.24972577501316, 67.89122824548129]),
            {
              "Name": 4,
              "system:index": "318"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.67843671251316, 67.81668127375117]),
            {
              "Name": 4,
              "system:index": "319"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.30490155626316, 68.47102755596741]),
            {
              "Name": 4,
              "system:index": "320"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.01925702501316, 69.07559746282593]),
            {
              "Name": 4,
              "system:index": "321"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62374921251316, 68.94968150709084]),
            {
              "Name": 4,
              "system:index": "322"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.57980390001316, 68.78331886870504]),
            {
              "Name": 4,
              "system:index": "323"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.46994061876316, 68.52740052574265]),
            {
              "Name": 4,
              "system:index": "324"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.76681561876316, 68.75945062358991]),
            {
              "Name": 4,
              "system:index": "325"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.16232343126316, 68.36596072572462]),
            {
              "Name": 4,
              "system:index": "326"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 68.10525151822102]),
            {
              "Name": 4,
              "system:index": "327"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20626874376316, 67.82497604326664]),
            {
              "Name": 4,
              "system:index": "328"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 67.70858086000949]),
            {
              "Name": 4,
              "system:index": "329"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 67.53290048571976]),
            {
              "Name": 4,
              "system:index": "330"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20626874376316, 67.43192301856652]),
            {
              "Name": 4,
              "system:index": "331"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20626874376316, 67.31357236862773]),
            {
              "Name": 4,
              "system:index": "332"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20626874376316, 67.2116612779171]),
            {
              "Name": 4,
              "system:index": "333"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.14035077501316, 69.14610873451964]),
            {
              "Name": 4,
              "system:index": "334"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.14035077501316, 69.08344328075695]),
            {
              "Name": 4,
              "system:index": "335"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 69.0284634959999]),
            {
              "Name": 4,
              "system:index": "336"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 68.98122815058835]),
            {
              "Name": 4,
              "system:index": "337"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 68.92599186835231]),
            {
              "Name": 4,
              "system:index": "338"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 68.86269503561968]),
            {
              "Name": 4,
              "system:index": "339"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 68.77536563093565]),
            {
              "Name": 4,
              "system:index": "340"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 68.71961329605944]),
            {
              "Name": 4,
              "system:index": "341"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 68.65572534305427]),
            {
              "Name": 4,
              "system:index": "342"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 68.61570256081032]),
            {
              "Name": 4,
              "system:index": "343"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 68.5595504823782]),
            {
              "Name": 4,
              "system:index": "344"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 69.16174704899503]),
            {
              "Name": 4,
              "system:index": "345"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87667890001316, 68.98122815058835]),
            {
              "Name": 4,
              "system:index": "346"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87667890001316, 68.86269503561968]),
            {
              "Name": 4,
              "system:index": "347"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 68.7116372849303]),
            {
              "Name": 4,
              "system:index": "348"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.83273358751316, 68.64772650327652]),
            {
              "Name": 4,
              "system:index": "349"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.83273358751316, 68.55151729586372]),
            {
              "Name": 4,
              "system:index": "350"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.85470624376316, 68.49520464190894]),
            {
              "Name": 4,
              "system:index": "351"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.85470624376316, 68.31730385418338]),
            {
              "Name": 4,
              "system:index": "352"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87667890001316, 68.24412321140818]),
            {
              "Name": 4,
              "system:index": "353"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 68.06424673681735]),
            {
              "Name": 4,
              "system:index": "354"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 68.00671738127674]),
            {
              "Name": 4,
              "system:index": "355"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 67.8332678675832]),
            {
              "Name": 4,
              "system:index": "356"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 67.71691399650423]),
            {
              "Name": 4,
              "system:index": "357"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 67.62508669313986]),
            {
              "Name": 4,
              "system:index": "358"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.92062421251316, 67.49087870361545]),
            {
              "Name": 4,
              "system:index": "359"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96456952501316, 67.31357236862773]),
            {
              "Name": 4,
              "system:index": "360"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96456952501316, 67.15201313897761]),
            {
              "Name": 4,
              "system:index": "361"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96456952501316, 67.09221725754492]),
            {
              "Name": 4,
              "system:index": "362"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.98654218126316, 66.97218106448761]),
            {
              "Name": 4,
              "system:index": "363"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.98654218126316, 66.79101118680258]),
            {
              "Name": 4,
              "system:index": "364"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96456952501316, 66.61721724760271]),
            {
              "Name": 4,
              "system:index": "365"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.96456952501316, 66.49483135295809]),
            {
              "Name": 4,
              "system:index": "366"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.54708905626316, 69.08344328075695]),
            {
              "Name": 4,
              "system:index": "367"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 68.98122815058835]),
            {
              "Name": 4,
              "system:index": "368"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 68.94968150709084]),
            {
              "Name": 4,
              "system:index": "369"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.56906171251316, 68.81510340056582]),
            {
              "Name": 4,
              "system:index": "370"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.54708905626316, 68.63972480602796]),
            {
              "Name": 4,
              "system:index": "371"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52511640001316, 68.47102755596741]),
            {
              "Name": 4,
              "system:index": "372"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52511640001316, 68.33353437406814]),
            {
              "Name": 4,
              "system:index": "373"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 68.16253578204973]),
            {
              "Name": 4,
              "system:index": "374"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.98201807019818]),
            {
              "Name": 4,
              "system:index": "375"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.87393834052894]),
            {
              "Name": 4,
              "system:index": "376"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70089765001316, 67.44802432601664]),
            {
              "Name": 4,
              "system:index": "377"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.59103436876316, 67.50694013611681]),
            {
              "Name": 4,
              "system:index": "378"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.76610281249103]),
            {
              "Name": 4,
              "system:index": "379"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.63269723877006]),
            {
              "Name": 4,
              "system:index": "380"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.41429250717937]),
            {
              "Name": 4,
              "system:index": "381"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.61300702501316, 67.18534940812734]),
            {
              "Name": 4,
              "system:index": "382"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.65695233751316, 67.04007475541101]),
            {
              "Name": 4,
              "system:index": "383"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.65695233751316, 66.85077321258254]),
            {
              "Name": 4,
              "system:index": "384"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70089765001316, 66.61643274066816]),
            {
              "Name": 4,
              "system:index": "385"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70089765001316, 66.56405379467074]),
            {
              "Name": 4,
              "system:index": "386"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70089765001316, 66.44140543854071]),
            {
              "Name": 4,
              "system:index": "387"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 66.70348550659284]),
            {
              "Name": 4,
              "system:index": "388"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 69.01202166931608]),
            {
              "Name": 4,
              "system:index": "389"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 68.94107751705812]),
            {
              "Name": 4,
              "system:index": "390"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.26144452501316, 68.90156524269698]),
            {
              "Name": 4,
              "system:index": "391"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.26144452501316, 68.74280758606211]),
            {
              "Name": 4,
              "system:index": "392"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 68.6789860259729]),
            {
              "Name": 4,
              "system:index": "393"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 68.55882792206873]),
            {
              "Name": 4,
              "system:index": "394"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 68.39761313850397]),
            {
              "Name": 4,
              "system:index": "395"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 68.2678109389647]),
            {
              "Name": 4,
              "system:index": "396"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 68.19447137331237]),
            {
              "Name": 4,
              "system:index": "397"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30538983751316, 68.038869608631]),
            {
              "Name": 4,
              "system:index": "398"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.34933515001316, 67.81593491924127]),
            {
              "Name": 4,
              "system:index": "399"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.34933515001316, 67.5740938001884]),
            {
              "Name": 4,
              "system:index": "400"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32736249376316, 67.51534475956754]),
            {
              "Name": 4,
              "system:index": "401"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 67.32975367163233]),
            {
              "Name": 4,
              "system:index": "402"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 67.19386782832949]),
            {
              "Name": 4,
              "system:index": "403"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 67.07433555940483]),
            {
              "Name": 4,
              "system:index": "404"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.26144452501316, 66.91116498762892]),
            {
              "Name": 4,
              "system:index": "405"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23947186876316, 66.75557018888675]),
            {
              "Name": 4,
              "system:index": "406"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 66.59898537992814]),
            {
              "Name": 4,
              "system:index": "407"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32736249376316, 68.57488621069088]),
            {
              "Name": 4,
              "system:index": "408"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.41525311876316, 68.44609840255599]),
            {
              "Name": 4,
              "system:index": "409"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.34933515001316, 68.32469048736615]),
            {
              "Name": 4,
              "system:index": "410"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32736249376316, 68.05529832279575]),
            {
              "Name": 4,
              "system:index": "411"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32736249376316, 67.9895132953339]),
            {
              "Name": 4,
              "system:index": "412"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.32736249376316, 67.70783105339163]),
            {
              "Name": 4,
              "system:index": "413"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.34933515001316, 67.59922737092343]),
            {
              "Name": 4,
              "system:index": "414"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.08566327501316, 68.99627604932617]),
            {
              "Name": 4,
              "system:index": "415"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01974530626316, 68.89365430149523]),
            {
              "Name": 4,
              "system:index": "416"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01974530626316, 68.84612917758287]),
            {
              "Name": 4,
              "system:index": "417"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01974530626316, 68.79055415040617]),
            {
              "Name": 4,
              "system:index": "418"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01974530626316, 68.7507724596973]),
            {
              "Name": 4,
              "system:index": "419"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.04171796251316, 68.68697370122838]),
            {
              "Name": 4,
              "system:index": "420"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.04171796251316, 68.59093303797785]),
            {
              "Name": 4,
              "system:index": "421"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01974530626316, 68.51058421894595]),
            {
              "Name": 4,
              "system:index": "422"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 68.39761313850397]),
            {
              "Name": 4,
              "system:index": "423"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 68.28407671687192]),
            {
              "Name": 4,
              "system:index": "424"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 68.17814174729594]),
            {
              "Name": 4,
              "system:index": "425"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 68.06350829812007]),
            {
              "Name": 4,
              "system:index": "426"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 68.01420461553735]),
            {
              "Name": 4,
              "system:index": "427"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 67.90701845250966]),
            {
              "Name": 4,
              "system:index": "428"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 67.79103213531609]),
            {
              "Name": 4,
              "system:index": "429"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 67.65776850038364]),
            {
              "Name": 4,
              "system:index": "430"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.99777265001316, 67.60759928897329]),
            {
              "Name": 4,
              "system:index": "431"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 67.50694013611681]),
            {
              "Name": 4,
              "system:index": "432"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 67.32128331991758]),
            {
              "Name": 4,
              "system:index": "433"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 67.2023832376815]),
            {
              "Name": 4,
              "system:index": "434"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 67.04007475541101]),
            {
              "Name": 4,
              "system:index": "435"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 66.93700156258758]),
            {
              "Name": 4,
              "system:index": "436"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.90988202501316, 66.80754487007094]),
            {
              "Name": 4,
              "system:index": "437"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97579999376316, 66.68609946835436]),
            {
              "Name": 4,
              "system:index": "438"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17355390001316, 66.57279130115369]),
            {
              "Name": 4,
              "system:index": "439"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.50314374376316, 66.51156415190854]),
            {
              "Name": 4,
              "system:index": "440"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.65695233751316, 66.47650946480458]),
            {
              "Name": 4,
              "system:index": "441"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18429608751316, 66.40625201686832]),
            {
              "Name": 4,
              "system:index": "442"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.19552655626316, 65.47474091739662]),
            {
              "Name": 4,
              "system:index": "443"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28341718126316, 65.3467385012387]),
            {
              "Name": 4,
              "system:index": "444"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.00851483751316, 65.56578921225231]),
            {
              "Name": 4,
              "system:index": "445"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.36007733751316, 65.61119430262728]),
            {
              "Name": 4,
              "system:index": "446"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.49191327501316, 65.58396076241547]),
            {
              "Name": 4,
              "system:index": "447"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.20626874376316, 65.43823254760954]),
            {
              "Name": 4,
              "system:index": "448"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.05246015001316, 65.26412075589026]),
            {
              "Name": 4,
              "system:index": "449"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.09640546251316, 65.15356014946343]),
            {
              "Name": 4,
              "system:index": "450"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.55783124376316, 65.0981064424399]),
            {
              "Name": 4,
              "system:index": "451"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.03048749376316, 64.99614027359416]),
            {
              "Name": 4,
              "system:index": "452"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87667890001316, 64.97755904214353]),
            {
              "Name": 4,
              "system:index": "453"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.56906171251316, 64.94966297060822]),
            {
              "Name": 4,
              "system:index": "454"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.50314374376316, 64.74420138097113]),
            {
              "Name": 4,
              "system:index": "455"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.50314374376316, 64.48042749861932]),
            {
              "Name": 4,
              "system:index": "456"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.16232343126316, 64.67849765116142]),
            {
              "Name": 4,
              "system:index": "457"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22824140001316, 64.79103505239196]),
            {
              "Name": 4,
              "system:index": "458"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.93136640001316, 64.79103505239196]),
            {
              "Name": 4,
              "system:index": "459"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.41283897134939, 65.50261315100539]),
            {
              "Name": 4,
              "system:index": "460"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.24804404947439, 65.59356432447703]),
            {
              "Name": 4,
              "system:index": "461"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23156455728689, 65.67514926062057]),
            {
              "Name": 4,
              "system:index": "462"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.27550986978689, 65.56631230480201]),
            {
              "Name": 4,
              "system:index": "463"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.28100303384939, 65.46614370503971]),
            {
              "Name": 4,
              "system:index": "464"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17663291666189, 65.33580702249532]),
            {
              "Name": 4,
              "system:index": "465"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.36889365884939, 65.33122203688166]),
            {
              "Name": 4,
              "system:index": "466"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52819541666189, 65.37016895776183]),
            {
              "Name": 4,
              "system:index": "467"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70397666666189, 65.40677221013448]),
            {
              "Name": 4,
              "system:index": "468"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.86877158853689, 65.477545875058]),
            {
              "Name": 4,
              "system:index": "469"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.94567588541189, 65.39305197237331]),
            {
              "Name": 4,
              "system:index": "470"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.27001670572439, 65.42733911527499]),
            {
              "Name": 4,
              "system:index": "471"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17663291666189, 65.66609693058773]),
            {
              "Name": 4,
              "system:index": "472"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.22057822916189, 65.30369534048697]),
            {
              "Name": 4,
              "system:index": "473"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.16015342447439, 65.23475260228268]),
            {
              "Name": 4,
              "system:index": "474"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17663291666189, 65.20021364663172]),
            {
              "Name": 4,
              "system:index": "475"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17663291666189, 65.16793658116119]),
            {
              "Name": 4,
              "system:index": "476"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17663291666189, 65.12175823242649]),
            {
              "Name": 4,
              "system:index": "477"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.19311240884939, 65.08012898050382]),
            {
              "Name": 4,
              "system:index": "478"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.19860557291189, 64.97809392706584]),
            {
              "Name": 4,
              "system:index": "479"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.19860557291189, 64.9315852446934]),
            {
              "Name": 4,
              "system:index": "480"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.63226288831969, 53.88066725060427]),
            {
              "Name": 4,
              "system:index": "481"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.30267304456969, 53.490293122737846]),
            {
              "Name": 4,
              "system:index": "482"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.08294648206969, 53.13585615574734]),
            {
              "Name": 4,
              "system:index": "483"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.19280976331969, 53.93244395268843]),
            {
              "Name": 4,
              "system:index": "484"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.54437226331969, 54.305908577766566]),
            {
              "Name": 4,
              "system:index": "485"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.96185273206969, 54.764849892816734]),
            {
              "Name": 4,
              "system:index": "486"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.17034882581969, 55.2812668856704]),
            {
              "Name": 4,
              "system:index": "487"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.60980195081969, 55.43115691557238]),
            {
              "Name": 4,
              "system:index": "488"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.46673554456969, 55.63012860195074]),
            {
              "Name": 4,
              "system:index": "489"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.77484101331969, 55.1308088086357]),
            {
              "Name": 4,
              "system:index": "490"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.48919648206969, 55.030187292943246]),
            {
              "Name": 4,
              "system:index": "491"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.26946991956969, 54.92931249129058]),
            {
              "Name": 4,
              "system:index": "492"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.07171601331969, 54.71411107256479]),
            {
              "Name": 4,
              "system:index": "493"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.80804413831969, 54.497761374294186]),
            {
              "Name": 4,
              "system:index": "494"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.63226288831969, 53.69894298996317]),
            {
              "Name": 4,
              "system:index": "495"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.45648163831969, 53.43796956526044]),
            {
              "Name": 4,
              "system:index": "496"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.12689179456969, 53.04348423693615]),
            {
              "Name": 4,
              "system:index": "497"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.88519257581969, 52.831603254145534]),
            {
              "Name": 4,
              "system:index": "498"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.47845429456969, 54.57425140049517]),
            {
              "Name": 4,
              "system:index": "499"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.00579804456969, 55.21864511778094]),
            {
              "Name": 4,
              "system:index": "500"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.76361054456969, 55.58048002102127]),
            {
              "Name": 4,
              "system:index": "501"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.13714570081969, 55.65492933097717]),
            {
              "Name": 4,
              "system:index": "502"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.52191132581969, 56.074143891646514]),
            {
              "Name": 4,
              "system:index": "503"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.60980195081969, 56.513101848433415]),
            {
              "Name": 4,
              "system:index": "504"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.85150116956969, 56.70657930669101]),
            {
              "Name": 4,
              "system:index": "505"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.47747773206969, 56.08640531105528]),
            {
              "Name": 4,
              "system:index": "506"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.33441132581969, 56.2942530475574]),
            {
              "Name": 4,
              "system:index": "507"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.12542695081969, 56.30644434205606]),
            {
              "Name": 4,
              "system:index": "508"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.52093476331969, 56.06187856992087]),
            {
              "Name": 4,
              "system:index": "509"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.59759491956967, 56.26985878787826]),
            {
              "Name": 4,
              "system:index": "510"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.96087616956969, 56.537340757274514]),
            {
              "Name": 4,
              "system:index": "511"
            }),
        ee.Feature(
            ee.Geometry.Point([-126.04876679456969, 56.80294669098459]),
            {
              "Name": 4,
              "system:index": "512"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.30120820081969, 56.99494057897869]),
            {
              "Name": 4,
              "system:index": "513"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.76361054456969, 56.48884742950693]),
            {
              "Name": 4,
              "system:index": "514"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.96136445081969, 56.70657930669101]),
            {
              "Name": 4,
              "system:index": "515"
            }),
        ee.Feature(
            ee.Geometry.Point([-124.29095429456969, 57.13828916094231]),
            {
              "Name": 4,
              "system:index": "516"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.87298554456969, 56.46457749491961]),
            {
              "Name": 4,
              "system:index": "517"
            }),
        ee.Feature(
            ee.Geometry.Point([-125.98284882581969, 56.28205786306097]),
            {
              "Name": 4,
              "system:index": "518"
            }),
        ee.Feature(
            ee.Geometry.Point([-127.69671601331969, 56.75479390667332]),
            {
              "Name": 4,
              "system:index": "519"
            }),
        ee.Feature(
            ee.Geometry.Point([-128.26800507581967, 56.037336216800654]),
            {
              "Name": 4,
              "system:index": "520"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.34613007581969, 55.91439008158794]),
            {
              "Name": 4,
              "system:index": "521"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.23626679456969, 55.71686247516958]),
            {
              "Name": 4,
              "system:index": "522"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.10443085706969, 55.60531216706135]),
            {
              "Name": 4,
              "system:index": "523"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.90667695081969, 55.468540797000124]),
            {
              "Name": 4,
              "system:index": "524"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.68695038831969, 55.36877169820026]),
            {
              "Name": 4,
              "system:index": "525"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.26946991956969, 55.10567715745955]),
            {
              "Name": 4,
              "system:index": "526"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.91790741956969, 54.91668531574755]),
            {
              "Name": 4,
              "system:index": "527"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.74212616956969, 54.8028623123111]),
            {
              "Name": 4,
              "system:index": "528"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50042695081969, 54.650598143372335]),
            {
              "Name": 4,
              "system:index": "529"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.97308320081969, 54.35715708234597]),
            {
              "Name": 4,
              "system:index": "530"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.81927460706969, 54.22891602297131]),
            {
              "Name": 4,
              "system:index": "531"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.31390351331969, 53.78990352288961]),
            {
              "Name": 4,
              "system:index": "532"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.35784882581969, 54.113157389315695]),
            {
              "Name": 4,
              "system:index": "533"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.57757538831969, 54.21606994637605]),
            {
              "Name": 4,
              "system:index": "534"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.53363007581969, 53.01705583420992]),
            {
              "Name": 4,
              "system:index": "535"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22601288831969, 52.87140997955036]),
            {
              "Name": 4,
              "system:index": "536"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.00628632581969, 52.7651775698372]),
            {
              "Name": 4,
              "system:index": "537"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.91839570081969, 52.711963956810315]),
            {
              "Name": 4,
              "system:index": "538"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.87445038831969, 52.63202168301471]),
            {
              "Name": 4,
              "system:index": "539"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.11614960706969, 53.8158560900333]),
            {
              "Name": 4,
              "system:index": "540"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.66546601331969, 54.13890952763311]),
            {
              "Name": 4,
              "system:index": "541"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.66546601331969, 54.1517795955425]),
            {
              "Name": 4,
              "system:index": "542"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.59543859485458, 54.1365884406012]),
            {
              "Name": 4,
              "system:index": "543"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26584875110458, 54.007660409713104]),
            {
              "Name": 4,
              "system:index": "544"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37571203235458, 53.93011130990977]),
            {
              "Name": 4,
              "system:index": "545"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.01340734485458, 53.527138370612214]),
            {
              "Name": 4,
              "system:index": "546"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.91453039172958, 53.363555141850725]),
            {
              "Name": 4,
              "system:index": "547"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.35422765735458, 53.23223468226628]),
            {
              "Name": 4,
              "system:index": "548"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.22239171985458, 53.120294633613966]),
            {
              "Name": 4,
              "system:index": "549"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.76047765735458, 52.94190667016617]),
            {
              "Name": 4,
              "system:index": "550"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.09006750110458, 53.087315485009555]),
            {
              "Name": 4,
              "system:index": "551"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87058507922958, 53.33732334706458]),
            {
              "Name": 4,
              "system:index": "552"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.33225500110458, 53.041102187527144]),
            {
              "Name": 4,
              "system:index": "553"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.14548742297958, 52.77607415544284]),
            {
              "Name": 4,
              "system:index": "554"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.35422765735458, 52.75613165501612]),
            {
              "Name": 4,
              "system:index": "555"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.71677648547958, 52.7627801700038]),
            {
              "Name": 4,
              "system:index": "556"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.07956945422958, 52.656282101762066]),
            {
              "Name": 4,
              "system:index": "557"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.79392492297958, 52.79600752324296]),
            {
              "Name": 4,
              "system:index": "558"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.69504796985458, 52.88227996107261]),
            {
              "Name": 4,
              "system:index": "559"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.39841711047958, 52.66960857755823]),
            {
              "Name": 4,
              "system:index": "560"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.21164953235458, 52.722873854781255]),
            {
              "Name": 4,
              "system:index": "561"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.21164953235458, 52.81593176018719]),
            {
              "Name": 4,
              "system:index": "562"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.35398351672958, 53.48139855372552]),
            {
              "Name": 4,
              "system:index": "563"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.45286046985458, 53.520607132573524]),
            {
              "Name": 4,
              "system:index": "564"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62864171985458, 53.72260758187336]),
            {
              "Name": 4,
              "system:index": "565"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.72751867297958, 53.61847000187949]),
            {
              "Name": 4,
              "system:index": "566"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.15598546985458, 53.51407488747985]),
            {
              "Name": 4,
              "system:index": "567"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.81516515735458, 53.45523935256684]),
            {
              "Name": 4,
              "system:index": "568"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.21140539172958, 52.636284768593676]),
            {
              "Name": 4,
              "system:index": "569"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.92576086047958, 52.5361608941746]),
            {
              "Name": 4,
              "system:index": "570"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.74997961047958, 52.66960857755823]),
            {
              "Name": 4,
              "system:index": "571"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.87082921985458, 52.79600752324296]),
            {
              "Name": 4,
              "system:index": "572"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.24460851672958, 52.455897040456655]),
            {
              "Name": 4,
              "system:index": "573"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.10178625110458, 52.489358118552296]),
            {
              "Name": 4,
              "system:index": "574"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.07981359485458, 52.542842936204366]),
            {
              "Name": 4,
              "system:index": "575"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.86008703235458, 52.34865055636716]),
            {
              "Name": 4,
              "system:index": "576"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.68430578235458, 52.2411432503367]),
            {
              "Name": 4,
              "system:index": "577"
            }),
        ee.Feature(
            ee.Geometry.Point([-116.86008703235458, 52.21422564046338]),
            {
              "Name": 4,
              "system:index": "578"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.16770421985458, 52.26804454289293]),
            {
              "Name": 4,
              "system:index": "579"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.11228429797958, 53.527138370612214]),
            {
              "Name": 4,
              "system:index": "580"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.47483312610458, 53.43560937049775]),
            {
              "Name": 4,
              "system:index": "581"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.58445226672958, 53.81351693527907]),
            {
              "Name": 4,
              "system:index": "582"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.07883703235458, 54.130151545740766]),
            {
              "Name": 4,
              "system:index": "583"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.43088781360458, 53.85241784443441]),
            {
              "Name": 4,
              "system:index": "584"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.81565343860458, 53.59239537848326]),
            {
              "Name": 4,
              "system:index": "585"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.41990148547958, 53.41597031673132]),
            {
              "Name": 4,
              "system:index": "586"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.09006750110458, 53.05431104619914]),
            {
              "Name": 4,
              "system:index": "587"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.00242101672958, 53.3897707969245]),
            {
              "Name": 4,
              "system:index": "588"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.61765539172958, 53.47486026482585]),
            {
              "Name": 4,
              "system:index": "589"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.59568273547958, 53.37011056854373]),
            {
              "Name": 4,
              "system:index": "590"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.33201086047958, 53.1532485004735]),
            {
              "Name": 4,
              "system:index": "591"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.79343664172958, 53.93657924712137]),
            {
              "Name": 4,
              "system:index": "592"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.40891515735458, 52.62294813274459]),
            {
              "Name": 4,
              "system:index": "593"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.82663976672958, 52.75613165501612]),
            {
              "Name": 4,
              "system:index": "594"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.15622961047958, 52.948526793755605]),
            {
              "Name": 4,
              "system:index": "595"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.74949132922958, 53.2388102967299]),
            {
              "Name": 4,
              "system:index": "596"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.99119054797958, 53.4944721091655]),
            {
              "Name": 4,
              "system:index": "597"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.99119054797958, 53.78756291988065]),
            {
              "Name": 4,
              "system:index": "598"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.95847570422958, 53.23223468226628]),
            {
              "Name": 4,
              "system:index": "599"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.59592687610458, 52.5562039693224]),
            {
              "Name": 4,
              "system:index": "600"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.82663976672958, 53.107106008456036]),
            {
              "Name": 4,
              "system:index": "601"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.09031164172958, 53.284811320627504]),
            {
              "Name": 4,
              "system:index": "602"
            })]),
    p3 = ui.import && ui.import("p3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -117.96496593787998,
            56.12199343491746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.11877453162998,
            56.04229811335691
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.31652843787998,
            56.011602155895424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.44836437537998,
            56.00546003541055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.31652843787998,
            55.993172864770706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.08581554725498,
            55.999316938397186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.87707531287998,
            56.02388346761844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.83313000037998,
            56.09136089667049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.17370617225498,
            56.00546003541055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.25061046912998,
            55.9562879094016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.50329601600498,
            55.993172864770706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.51428234412998,
            56.011602155895424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.43737804725498,
            55.9501369971165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.37146007850498,
            55.919367774669745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.60217296912998,
            56.27479074677248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.75598156287998,
            56.262589353390865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.81091320350498,
            56.20152399598338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.82189953162998,
            56.14036125820908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.82189953162998,
            56.07910105458481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.73400890662998,
            55.993172864770706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.71203625037998,
            55.987027814446556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.84387218787998,
            56.15872030957208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.21740734412998,
            56.32355741622143
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.39318859412998,
            56.31746498574301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.45910656287998,
            56.280889984259176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.51403820350498,
            56.262589353390865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.57995617225498,
            56.23817489058815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.62390148475498,
            56.21985382424659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.42614757850498,
            56.280889984259176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.37121593787998,
            56.30527720818609
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.32727062537998,
            56.31746498574301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.50305187537998,
            56.27479074677248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.86560070350498,
            56.21374485515333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.98645031287998,
            56.18929924159775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.12927257850498,
            56.170954804992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19519054725498,
            56.170954804992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.27209484412998,
            56.21374485515333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.34899914100498,
            56.268690536511684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.59069835975498,
            56.335739361009274
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.79943859412998,
            56.38442827056926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83239757850498,
            56.46948432096065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.83239757850498,
            56.59671199402678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.99719250037998,
            56.83786992711807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.01916515662998,
            56.777725362046375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.01916515662998,
            56.75364050604098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.00817882850498,
            56.632984300280825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.99719250037998,
            56.56645844817368
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.00817882850498,
            56.4573451022564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.99719250037998,
            56.4087494132759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.92028820350498,
            56.360091588325425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.85437023475498,
            56.31137158309331
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.77746593787998,
            56.23206884187827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.70056164100498,
            56.18929924159775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.64563000037998,
            56.16483804444063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.43688976600498,
            56.12199343491746
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.26110851600498,
            56.17707059131161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.89855968787998,
            56.195412105735315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.98645031287998,
            56.195412105735315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.30505382850498,
            55.993172864770706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.19519054725498,
            55.9501369971165
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.12927257850498,
            55.919367774669745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.11828625037998,
            55.919367774669745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.94250500037998,
            55.92552357424291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.82165539100498,
            55.94398510754243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.66784679725498,
            55.987027814446556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.48107921912998,
            56.06070397491512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.29431164100498,
            56.07910105458481
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.15148937537998,
            56.01774329993651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.50305187537998,
            56.011602155895424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.79968273475498,
            55.919367774669745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.90954601600498,
            55.87624979705455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.04138195350498,
            55.83308388279384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.14025890662998,
            55.808396112424475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.22814953162998,
            55.79604635224947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.23913585975498,
            55.75897356373978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.23913585975498,
            55.728052627139505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.29406750037998,
            55.72186549923675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.35998546912998,
            55.71567739094559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.48083507850498,
            55.84542189432722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.57971203162998,
            55.85158943197427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.48083507850498,
            56.20152399598338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.50280773475498,
            56.16483804444063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.37097179725498,
            56.14036125820908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.25012218787998,
            56.14036125820908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.10729992225498,
            56.15872030957208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.01940929725498,
            56.16483804444063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.88757335975498,
            56.18929924159775
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.81066906287998,
            56.21374485515333
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.49206554725498,
            56.28698824905783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.36022960975498,
            56.347917418147055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.12951671912998,
            56.43305502198812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.94274914100498,
            56.493751118986786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.93176281287998,
            56.4573451022564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.04162609412998,
            56.439128997629844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.06359875037998,
            56.42090415903459
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.06359875037998,
            56.38442827056926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.93176281287998,
            56.43305502198812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.79992687537998,
            56.34182887549124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.71203625037998,
            56.28698824905783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.64611828162998,
            56.256487197324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.75598156287998,
            56.21985382424659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.77795421912998,
            56.11586887743806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.72302257850498,
            56.01774329993651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.54724132850498,
            55.993172864770706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.49230968787998,
            55.93783224059498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.42639171912998,
            55.94398510754243
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.25061046912998,
            55.96858680244238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.04187023475498,
            56.00546003541055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.78918468787998,
            56.05456966360767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.61340343787998,
            56.12811701748224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.48156750037998,
            56.17707059131161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.23986828162998,
            56.22596181979298
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.19592296912998,
            56.14648191654169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.15197765662998,
            56.11586887743806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.09704601600498,
            56.06683731045716
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.05310070350498,
            56.01774329993651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.30578625037998,
            56.00546003541055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.27282726600498,
            55.96858680244238
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.23986828162998,
            55.931678396189916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.20690929725498,
            55.894734798431486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.17395031287998,
            55.79604635224947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.13000500037998,
            55.647543470348396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.11901867225498,
            55.585500500129065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.22888195350498,
            55.63514273002374
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.30578625037998,
            55.69091515223417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.38269054725498,
            55.77133507857507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.40466320350498,
            55.87008617344287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.40466320350498,
            55.97473478336693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.39367687537998,
            55.87008617344287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.30578625037998,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.26184093787998,
            55.62273806350063
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.21789562537998,
            55.585500500129065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.15197765662998,
            55.54822757719148
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.11901867225498,
            55.535795408788644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.08605968787998,
            55.51713978446312
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.09704601600498,
            55.49225185470036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.26184093787998,
            55.59170921573541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.34973156287998,
            55.628940887578345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.44860851600498,
            55.684722140754246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.83313000037998,
            55.84542189432722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.00891125037998,
            55.78987000312171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.30554210975498,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52526867225498,
            55.74042394211255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.67907726600498,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.87683117225498,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.62414562537998,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.38244640662998,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23962414100498,
            55.74042394211255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.86608898475498,
            55.80222172198916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.65734875037998,
            55.87008617344287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.61340343787998,
            55.900894509351204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.72326671912998,
            55.83308388279384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.77819835975498,
            55.77133507857507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.87707531287998,
            55.73423877473702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.98693859412998,
            55.71567739094559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.14074718787998,
            55.709488302182855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.31652843787998,
            55.703298232865414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.40441906287998,
            55.71567739094559
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.66809093787998,
            55.73423877473702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.85485851600498,
            55.746608129349326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.93176281287998,
            55.752791336530635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.00866710975498,
            55.77133507857507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23962414100498,
            55.61653425770797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.38244640662998,
            55.59791694921395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.48132335975498,
            55.59791694921395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.64611828162998,
            55.59791694921395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.81091320350498,
            55.604123700647186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.94274914100498,
            55.61653425770797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.77795421912998,
            55.61032947011769
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.56921398475498,
            55.59170921573541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.27258312537998,
            55.59170921573541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.16271984412998,
            55.57308012220314
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.52526867225498,
            55.348840738668976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.77795421912998,
            55.36757607483199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.01965343787998,
            55.348840738668976
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.18444835975498,
            55.36133194796154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.30529796912998,
            55.36133194796154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.48107921912998,
            55.33009653463324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.60192882850498,
            55.29258151418521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.63488781287998,
            55.24876912390633
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.44812023475498,
            55.22997758762522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.21740734412998,
            55.211177169646284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.09655773475498,
            55.20490838956706
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.99768078162998,
            55.173549679906934
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.88781750037998,
            55.18609612594509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.84387218787998,
            55.26755178066509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.90979015662998,
            55.29883648224219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.77795421912998,
            55.29883648224219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.56921398475498,
            55.31134346053451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.49230968787998,
            55.32384649560429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.44836437537998,
            55.30509046433164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.36047375037998,
            55.25503099599865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.29455578162998,
            55.211177169646284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.27258312537998,
            55.16727497556003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.37146007850498,
            55.198638622310696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.47033703162998,
            55.223711768594896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.71203625037998,
            55.27381069340059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.97570812537998,
            55.19236786779681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.14050304725498,
            55.12332438619791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.56896984412998,
            55.12332438619791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.47033703162998,
            55.223711768594896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.23962414100498,
            55.261291881558016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.18469250037998,
            55.28006861984527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.03088390662998,
            55.18609612594509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01989757850498,
            55.14844493624567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.40466320350498,
            55.44866011189866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.30578625037998,
            55.44866011189866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.28381359412998,
            55.39878193467764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.23986828162998,
            55.39878193467764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.19592296912998,
            55.392542732371616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.18493664100498,
            55.37381921662694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.07507335975498,
            55.54201198438335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.10803234412998,
            55.647543470348396
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.98693859412998,
            55.75897356373978
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.25085460975498,
            57.30866937941458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.39367687537998,
            57.201704712618266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.40466320350498,
            57.18384706766879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.30578625037998,
            57.02871883100427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.50354015662998,
            56.82487754311492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.45959484412998,
            56.9449190363715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.41564953162998,
            56.9688810853242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.38269054725498,
            56.938926116705744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.38269054725498,
            56.90294836945112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.42663585975498,
            56.818865343545774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.33874523475498,
            56.64409145337283
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.55847179725498,
            56.99881198636509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.69030773475498,
            56.9449190363715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.63537609412998,
            56.884946487289916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.59143078162998,
            56.82487754311492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.97595226600498,
            56.553372030560546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.91003429725498,
            56.54125964435894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.84411632850498,
            56.52308379752617
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.77819835975498,
            56.492771333574325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.70129406287998,
            56.46850390883099
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.62438976600498,
            56.34693386906567
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.72326671912998,
            56.31038709183639
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.75622570350498,
            56.27990470747306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.75622570350498,
            55.979888794076125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.01989757850498,
            55.99832441851872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.12976085975498,
            55.96144437770967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.20666515662998,
            55.94914321460357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.89880382850498,
            55.936838142287044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.95373546912998,
            55.869090337289855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.06359875037998,
            55.78887211103678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.36047375037998,
            55.59070625320355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.70104992225498,
            55.62173589412996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.89880382850498,
            55.58449737892497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.93127453162998,
            56.78878987000956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.2150650125666,
            55.37782672520083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.4128189188166,
            55.42149671739319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.3578872781916,
            55.41526110084773
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.3249282938166,
            55.37782672520083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -117.9072036844416,
            55.70108188096535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.24039109199194,
            53.29240464061367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.50406296699194,
            53.580370885672785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.85562546699194,
            53.77559403275981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.03140671699194,
            53.8534301078874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.72378952949194,
            52.41675684735146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.98746140449194,
            52.65732307215896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.22916062324194,
            52.790401880602346
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.82242234199194,
            53.09494385700787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.36099656074194,
            51.95875129693768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.64664109199194,
            52.01287930490287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.08609421699194,
            51.99935343550751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.49283249824194,
            51.7687877899836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.75650437324194,
            51.97228943200542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.59146531074194,
            52.25564644565402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.87710984199194,
            52.57728076798576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.94302781074194,
            52.65732307215896
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 3
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
            ee.Geometry.Point([-117.96496593787998, 56.12199343491746]),
            {
              "Name": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.11877453162998, 56.04229811335691]),
            {
              "Name": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.31652843787998, 56.011602155895424]),
            {
              "Name": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.44836437537998, 56.00546003541055]),
            {
              "Name": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.31652843787998, 55.993172864770706]),
            {
              "Name": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.08581554725498, 55.999316938397186]),
            {
              "Name": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.87707531287998, 56.02388346761844]),
            {
              "Name": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.83313000037998, 56.09136089667049]),
            {
              "Name": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.17370617225498, 56.00546003541055]),
            {
              "Name": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.25061046912998, 55.9562879094016]),
            {
              "Name": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.50329601600498, 55.993172864770706]),
            {
              "Name": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.51428234412998, 56.011602155895424]),
            {
              "Name": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.43737804725498, 55.9501369971165]),
            {
              "Name": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.37146007850498, 55.919367774669745]),
            {
              "Name": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.60217296912998, 56.27479074677248]),
            {
              "Name": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.75598156287998, 56.262589353390865]),
            {
              "Name": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.81091320350498, 56.20152399598338]),
            {
              "Name": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.82189953162998, 56.14036125820908]),
            {
              "Name": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.82189953162998, 56.07910105458481]),
            {
              "Name": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.73400890662998, 55.993172864770706]),
            {
              "Name": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.71203625037998, 55.987027814446556]),
            {
              "Name": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.84387218787998, 56.15872030957208]),
            {
              "Name": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.21740734412998, 56.32355741622143]),
            {
              "Name": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.39318859412998, 56.31746498574301]),
            {
              "Name": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.45910656287998, 56.280889984259176]),
            {
              "Name": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.51403820350498, 56.262589353390865]),
            {
              "Name": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.57995617225498, 56.23817489058815]),
            {
              "Name": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.62390148475498, 56.21985382424659]),
            {
              "Name": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.42614757850498, 56.280889984259176]),
            {
              "Name": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.37121593787998, 56.30527720818609]),
            {
              "Name": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.32727062537998, 56.31746498574301]),
            {
              "Name": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.50305187537998, 56.27479074677248]),
            {
              "Name": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.86560070350498, 56.21374485515333]),
            {
              "Name": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.98645031287998, 56.18929924159775]),
            {
              "Name": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12927257850498, 56.170954804992]),
            {
              "Name": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19519054725498, 56.170954804992]),
            {
              "Name": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.27209484412998, 56.21374485515333]),
            {
              "Name": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.34899914100498, 56.268690536511684]),
            {
              "Name": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.59069835975498, 56.335739361009274]),
            {
              "Name": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.79943859412998, 56.38442827056926]),
            {
              "Name": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83239757850498, 56.46948432096065]),
            {
              "Name": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.83239757850498, 56.59671199402678]),
            {
              "Name": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.99719250037998, 56.83786992711807]),
            {
              "Name": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.01916515662998, 56.777725362046375]),
            {
              "Name": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.01916515662998, 56.75364050604098]),
            {
              "Name": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.00817882850498, 56.632984300280825]),
            {
              "Name": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.99719250037998, 56.56645844817368]),
            {
              "Name": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.00817882850498, 56.4573451022564]),
            {
              "Name": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.99719250037998, 56.4087494132759]),
            {
              "Name": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.92028820350498, 56.360091588325425]),
            {
              "Name": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.85437023475498, 56.31137158309331]),
            {
              "Name": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.77746593787998, 56.23206884187827]),
            {
              "Name": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.70056164100498, 56.18929924159775]),
            {
              "Name": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.64563000037998, 56.16483804444063]),
            {
              "Name": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.43688976600498, 56.12199343491746]),
            {
              "Name": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.26110851600498, 56.17707059131161]),
            {
              "Name": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.89855968787998, 56.195412105735315]),
            {
              "Name": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.98645031287998, 56.195412105735315]),
            {
              "Name": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.30505382850498, 55.993172864770706]),
            {
              "Name": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.19519054725498, 55.9501369971165]),
            {
              "Name": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.12927257850498, 55.919367774669745]),
            {
              "Name": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.11828625037998, 55.919367774669745]),
            {
              "Name": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.94250500037998, 55.92552357424291]),
            {
              "Name": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.82165539100498, 55.94398510754243]),
            {
              "Name": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.66784679725498, 55.987027814446556]),
            {
              "Name": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.48107921912998, 56.06070397491512]),
            {
              "Name": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.29431164100498, 56.07910105458481]),
            {
              "Name": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.15148937537998, 56.01774329993651]),
            {
              "Name": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.50305187537998, 56.011602155895424]),
            {
              "Name": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.79968273475498, 55.919367774669745]),
            {
              "Name": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.90954601600498, 55.87624979705455]),
            {
              "Name": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.04138195350498, 55.83308388279384]),
            {
              "Name": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.14025890662998, 55.808396112424475]),
            {
              "Name": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.22814953162998, 55.79604635224947]),
            {
              "Name": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23913585975498, 55.75897356373978]),
            {
              "Name": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23913585975498, 55.728052627139505]),
            {
              "Name": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.29406750037998, 55.72186549923675]),
            {
              "Name": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.35998546912998, 55.71567739094559]),
            {
              "Name": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.48083507850498, 55.84542189432722]),
            {
              "Name": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.57971203162998, 55.85158943197427]),
            {
              "Name": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.48083507850498, 56.20152399598338]),
            {
              "Name": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.50280773475498, 56.16483804444063]),
            {
              "Name": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.37097179725498, 56.14036125820908]),
            {
              "Name": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.25012218787998, 56.14036125820908]),
            {
              "Name": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.10729992225498, 56.15872030957208]),
            {
              "Name": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.01940929725498, 56.16483804444063]),
            {
              "Name": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.88757335975498, 56.18929924159775]),
            {
              "Name": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.81066906287998, 56.21374485515333]),
            {
              "Name": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.49206554725498, 56.28698824905783]),
            {
              "Name": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.36022960975498, 56.347917418147055]),
            {
              "Name": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.12951671912998, 56.43305502198812]),
            {
              "Name": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.94274914100498, 56.493751118986786]),
            {
              "Name": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.93176281287998, 56.4573451022564]),
            {
              "Name": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.04162609412998, 56.439128997629844]),
            {
              "Name": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.06359875037998, 56.42090415903459]),
            {
              "Name": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.06359875037998, 56.38442827056926]),
            {
              "Name": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.93176281287998, 56.43305502198812]),
            {
              "Name": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.79992687537998, 56.34182887549124]),
            {
              "Name": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.71203625037998, 56.28698824905783]),
            {
              "Name": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.64611828162998, 56.256487197324]),
            {
              "Name": 3,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.75598156287998, 56.21985382424659]),
            {
              "Name": 3,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.77795421912998, 56.11586887743806]),
            {
              "Name": 3,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.72302257850498, 56.01774329993651]),
            {
              "Name": 3,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.54724132850498, 55.993172864770706]),
            {
              "Name": 3,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.49230968787998, 55.93783224059498]),
            {
              "Name": 3,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.42639171912998, 55.94398510754243]),
            {
              "Name": 3,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.25061046912998, 55.96858680244238]),
            {
              "Name": 3,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.04187023475498, 56.00546003541055]),
            {
              "Name": 3,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.78918468787998, 56.05456966360767]),
            {
              "Name": 3,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.61340343787998, 56.12811701748224]),
            {
              "Name": 3,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.48156750037998, 56.17707059131161]),
            {
              "Name": 3,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.23986828162998, 56.22596181979298]),
            {
              "Name": 3,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.19592296912998, 56.14648191654169]),
            {
              "Name": 3,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.15197765662998, 56.11586887743806]),
            {
              "Name": 3,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.09704601600498, 56.06683731045716]),
            {
              "Name": 3,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.05310070350498, 56.01774329993651]),
            {
              "Name": 3,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.30578625037998, 56.00546003541055]),
            {
              "Name": 3,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.27282726600498, 55.96858680244238]),
            {
              "Name": 3,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.23986828162998, 55.931678396189916]),
            {
              "Name": 3,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.20690929725498, 55.894734798431486]),
            {
              "Name": 3,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.17395031287998, 55.79604635224947]),
            {
              "Name": 3,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.13000500037998, 55.647543470348396]),
            {
              "Name": 3,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.11901867225498, 55.585500500129065]),
            {
              "Name": 3,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.22888195350498, 55.63514273002374]),
            {
              "Name": 3,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.30578625037998, 55.69091515223417]),
            {
              "Name": 3,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.38269054725498, 55.77133507857507]),
            {
              "Name": 3,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.40466320350498, 55.87008617344287]),
            {
              "Name": 3,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.40466320350498, 55.97473478336693]),
            {
              "Name": 3,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.39367687537998, 55.87008617344287]),
            {
              "Name": 3,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.30578625037998, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.26184093787998, 55.62273806350063]),
            {
              "Name": 3,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.21789562537998, 55.585500500129065]),
            {
              "Name": 3,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.15197765662998, 55.54822757719148]),
            {
              "Name": 3,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.11901867225498, 55.535795408788644]),
            {
              "Name": 3,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.08605968787998, 55.51713978446312]),
            {
              "Name": 3,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.09704601600498, 55.49225185470036]),
            {
              "Name": 3,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.26184093787998, 55.59170921573541]),
            {
              "Name": 3,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.34973156287998, 55.628940887578345]),
            {
              "Name": 3,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.44860851600498, 55.684722140754246]),
            {
              "Name": 3,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.83313000037998, 55.84542189432722]),
            {
              "Name": 3,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.00891125037998, 55.78987000312171]),
            {
              "Name": 3,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.30554210975498, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52526867225498, 55.74042394211255]),
            {
              "Name": 3,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.67907726600498, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.87683117225498, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.62414562537998, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.38244640662998, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23962414100498, 55.74042394211255]),
            {
              "Name": 3,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.86608898475498, 55.80222172198916]),
            {
              "Name": 3,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.65734875037998, 55.87008617344287]),
            {
              "Name": 3,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.61340343787998, 55.900894509351204]),
            {
              "Name": 3,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.72326671912998, 55.83308388279384]),
            {
              "Name": 3,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.77819835975498, 55.77133507857507]),
            {
              "Name": 3,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.87707531287998, 55.73423877473702]),
            {
              "Name": 3,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.98693859412998, 55.71567739094559]),
            {
              "Name": 3,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.14074718787998, 55.709488302182855]),
            {
              "Name": 3,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.31652843787998, 55.703298232865414]),
            {
              "Name": 3,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.40441906287998, 55.71567739094559]),
            {
              "Name": 3,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.66809093787998, 55.73423877473702]),
            {
              "Name": 3,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.85485851600498, 55.746608129349326]),
            {
              "Name": 3,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.93176281287998, 55.752791336530635]),
            {
              "Name": 3,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.00866710975498, 55.77133507857507]),
            {
              "Name": 3,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23962414100498, 55.61653425770797]),
            {
              "Name": 3,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.38244640662998, 55.59791694921395]),
            {
              "Name": 3,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.48132335975498, 55.59791694921395]),
            {
              "Name": 3,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.64611828162998, 55.59791694921395]),
            {
              "Name": 3,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.81091320350498, 55.604123700647186]),
            {
              "Name": 3,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.94274914100498, 55.61653425770797]),
            {
              "Name": 3,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.77795421912998, 55.61032947011769]),
            {
              "Name": 3,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.56921398475498, 55.59170921573541]),
            {
              "Name": 3,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.27258312537998, 55.59170921573541]),
            {
              "Name": 3,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.16271984412998, 55.57308012220314]),
            {
              "Name": 3,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.52526867225498, 55.348840738668976]),
            {
              "Name": 3,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.77795421912998, 55.36757607483199]),
            {
              "Name": 3,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.01965343787998, 55.348840738668976]),
            {
              "Name": 3,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.18444835975498, 55.36133194796154]),
            {
              "Name": 3,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.30529796912998, 55.36133194796154]),
            {
              "Name": 3,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.48107921912998, 55.33009653463324]),
            {
              "Name": 3,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.60192882850498, 55.29258151418521]),
            {
              "Name": 3,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.63488781287998, 55.24876912390633]),
            {
              "Name": 3,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.44812023475498, 55.22997758762522]),
            {
              "Name": 3,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.21740734412998, 55.211177169646284]),
            {
              "Name": 3,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.09655773475498, 55.20490838956706]),
            {
              "Name": 3,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.99768078162998, 55.173549679906934]),
            {
              "Name": 3,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.88781750037998, 55.18609612594509]),
            {
              "Name": 3,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.84387218787998, 55.26755178066509]),
            {
              "Name": 3,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.90979015662998, 55.29883648224219]),
            {
              "Name": 3,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.77795421912998, 55.29883648224219]),
            {
              "Name": 3,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.56921398475498, 55.31134346053451]),
            {
              "Name": 3,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.49230968787998, 55.32384649560429]),
            {
              "Name": 3,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.44836437537998, 55.30509046433164]),
            {
              "Name": 3,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.36047375037998, 55.25503099599865]),
            {
              "Name": 3,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.29455578162998, 55.211177169646284]),
            {
              "Name": 3,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.27258312537998, 55.16727497556003]),
            {
              "Name": 3,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.37146007850498, 55.198638622310696]),
            {
              "Name": 3,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.47033703162998, 55.223711768594896]),
            {
              "Name": 3,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.71203625037998, 55.27381069340059]),
            {
              "Name": 3,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.97570812537998, 55.19236786779681]),
            {
              "Name": 3,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.14050304725498, 55.12332438619791]),
            {
              "Name": 3,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.56896984412998, 55.12332438619791]),
            {
              "Name": 3,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.47033703162998, 55.223711768594896]),
            {
              "Name": 3,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.23962414100498, 55.261291881558016]),
            {
              "Name": 3,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.18469250037998, 55.28006861984527]),
            {
              "Name": 3,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.03088390662998, 55.18609612594509]),
            {
              "Name": 3,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01989757850498, 55.14844493624567]),
            {
              "Name": 3,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.40466320350498, 55.44866011189866]),
            {
              "Name": 3,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.30578625037998, 55.44866011189866]),
            {
              "Name": 3,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.28381359412998, 55.39878193467764]),
            {
              "Name": 3,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.23986828162998, 55.39878193467764]),
            {
              "Name": 3,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.19592296912998, 55.392542732371616]),
            {
              "Name": 3,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.18493664100498, 55.37381921662694]),
            {
              "Name": 3,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.07507335975498, 55.54201198438335]),
            {
              "Name": 3,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.10803234412998, 55.647543470348396]),
            {
              "Name": 3,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.98693859412998, 55.75897356373978]),
            {
              "Name": 3,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.25085460975498, 57.30866937941458]),
            {
              "Name": 3,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.39367687537998, 57.201704712618266]),
            {
              "Name": 3,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.40466320350498, 57.18384706766879]),
            {
              "Name": 3,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.30578625037998, 57.02871883100427]),
            {
              "Name": 3,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.50354015662998, 56.82487754311492]),
            {
              "Name": 3,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.45959484412998, 56.9449190363715]),
            {
              "Name": 3,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.41564953162998, 56.9688810853242]),
            {
              "Name": 3,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.38269054725498, 56.938926116705744]),
            {
              "Name": 3,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.38269054725498, 56.90294836945112]),
            {
              "Name": 3,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.42663585975498, 56.818865343545774]),
            {
              "Name": 3,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.33874523475498, 56.64409145337283]),
            {
              "Name": 3,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.55847179725498, 56.99881198636509]),
            {
              "Name": 3,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.69030773475498, 56.9449190363715]),
            {
              "Name": 3,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.63537609412998, 56.884946487289916]),
            {
              "Name": 3,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.59143078162998, 56.82487754311492]),
            {
              "Name": 3,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.97595226600498, 56.553372030560546]),
            {
              "Name": 3,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.91003429725498, 56.54125964435894]),
            {
              "Name": 3,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.84411632850498, 56.52308379752617]),
            {
              "Name": 3,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.77819835975498, 56.492771333574325]),
            {
              "Name": 3,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.70129406287998, 56.46850390883099]),
            {
              "Name": 3,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.62438976600498, 56.34693386906567]),
            {
              "Name": 3,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.72326671912998, 56.31038709183639]),
            {
              "Name": 3,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.75622570350498, 56.27990470747306]),
            {
              "Name": 3,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.75622570350498, 55.979888794076125]),
            {
              "Name": 3,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.01989757850498, 55.99832441851872]),
            {
              "Name": 3,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.12976085975498, 55.96144437770967]),
            {
              "Name": 3,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.20666515662998, 55.94914321460357]),
            {
              "Name": 3,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.89880382850498, 55.936838142287044]),
            {
              "Name": 3,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.95373546912998, 55.869090337289855]),
            {
              "Name": 3,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.06359875037998, 55.78887211103678]),
            {
              "Name": 3,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.36047375037998, 55.59070625320355]),
            {
              "Name": 3,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.70104992225498, 55.62173589412996]),
            {
              "Name": 3,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.89880382850498, 55.58449737892497]),
            {
              "Name": 3,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.93127453162998, 56.78878987000956]),
            {
              "Name": 3,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.2150650125666, 55.37782672520083]),
            {
              "Name": 3,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.4128189188166, 55.42149671739319]),
            {
              "Name": 3,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.3578872781916, 55.41526110084773]),
            {
              "Name": 3,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.3249282938166, 55.37782672520083]),
            {
              "Name": 3,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Point([-117.9072036844416, 55.70108188096535]),
            {
              "Name": 3,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.24039109199194, 53.29240464061367]),
            {
              "Name": 3,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.50406296699194, 53.580370885672785]),
            {
              "Name": 3,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.85562546699194, 53.77559403275981]),
            {
              "Name": 3,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.03140671699194, 53.8534301078874]),
            {
              "Name": 3,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.72378952949194, 52.41675684735146]),
            {
              "Name": 3,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Point([-118.98746140449194, 52.65732307215896]),
            {
              "Name": 3,
              "system:index": "258"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.22916062324194, 52.790401880602346]),
            {
              "Name": 3,
              "system:index": "259"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.82242234199194, 53.09494385700787]),
            {
              "Name": 3,
              "system:index": "260"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.36099656074194, 51.95875129693768]),
            {
              "Name": 3,
              "system:index": "261"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.64664109199194, 52.01287930490287]),
            {
              "Name": 3,
              "system:index": "262"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.08609421699194, 51.99935343550751]),
            {
              "Name": 3,
              "system:index": "263"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.49283249824194, 51.7687877899836]),
            {
              "Name": 3,
              "system:index": "264"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.75650437324194, 51.97228943200542]),
            {
              "Name": 3,
              "system:index": "265"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.59146531074194, 52.25564644565402]),
            {
              "Name": 3,
              "system:index": "266"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.87710984199194, 52.57728076798576]),
            {
              "Name": 3,
              "system:index": "267"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.94302781074194, 52.65732307215896]),
            {
              "Name": 3,
              "system:index": "268"
            })]),
    p7 = ui.import && ui.import("p7", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -120.60503883288852,
            67.42693830558649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.23150367663852,
            67.4606522234213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.76958961413852,
            67.1128117945627
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.57183570788852,
            67.07860538957213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.65972633288852,
            67.01004743466535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.61578102038852,
            66.94129557902782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.65972633288852,
            66.8896041697707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.79156227038852,
            66.97569577250509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.87945289538852,
            67.01004743466535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.03326148913852,
            67.0186277737659
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.72564430163852,
            66.92407726550009
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.61578102038852,
            66.8809782930793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.08843727038852,
            67.06148405448285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.37408180163852,
            67.02720508404474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.37408180163852,
            66.94129557902782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.04449195788852,
            66.99287766649107
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.51714820788852,
            67.1298968784907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.84673805163852,
            67.1298968784907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.00054664538852,
            67.00146406586613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.61578102038852,
            66.82915910218
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.90142555163852,
            66.73387211570846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.50591773913852,
            66.79455202411825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.93462867663852,
            66.97569577250509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.56109352038852,
            67.01004743466535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -120.20953102038852,
            67.07860538957213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -119.85796852038852,
            67.20663049491907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -121.33013648913852,
            67.07004623380762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -122.75835914538852,
            66.66434016443512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -123.02203102038852,
            66.5946120654166
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 7
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
            ee.Geometry.Point([-120.60503883288852, 67.42693830558649]),
            {
              "Name": 7,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.23150367663852, 67.4606522234213]),
            {
              "Name": 7,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.76958961413852, 67.1128117945627]),
            {
              "Name": 7,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.57183570788852, 67.07860538957213]),
            {
              "Name": 7,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.65972633288852, 67.01004743466535]),
            {
              "Name": 7,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.61578102038852, 66.94129557902782]),
            {
              "Name": 7,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.65972633288852, 66.8896041697707]),
            {
              "Name": 7,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.79156227038852, 66.97569577250509]),
            {
              "Name": 7,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.87945289538852, 67.01004743466535]),
            {
              "Name": 7,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.03326148913852, 67.0186277737659]),
            {
              "Name": 7,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.72564430163852, 66.92407726550009]),
            {
              "Name": 7,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.61578102038852, 66.8809782930793]),
            {
              "Name": 7,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.08843727038852, 67.06148405448285]),
            {
              "Name": 7,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.37408180163852, 67.02720508404474]),
            {
              "Name": 7,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.37408180163852, 66.94129557902782]),
            {
              "Name": 7,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.04449195788852, 66.99287766649107]),
            {
              "Name": 7,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.51714820788852, 67.1298968784907]),
            {
              "Name": 7,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.84673805163852, 67.1298968784907]),
            {
              "Name": 7,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.00054664538852, 67.00146406586613]),
            {
              "Name": 7,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.61578102038852, 66.82915910218]),
            {
              "Name": 7,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.90142555163852, 66.73387211570846]),
            {
              "Name": 7,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.50591773913852, 66.79455202411825]),
            {
              "Name": 7,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.93462867663852, 66.97569577250509]),
            {
              "Name": 7,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.56109352038852, 67.01004743466535]),
            {
              "Name": 7,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-120.20953102038852, 67.07860538957213]),
            {
              "Name": 7,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-119.85796852038852, 67.20663049491907]),
            {
              "Name": 7,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-121.33013648913852, 67.07004623380762]),
            {
              "Name": 7,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-122.75835914538852, 66.66434016443512]),
            {
              "Name": 7,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-123.02203102038852, 66.5946120654166]),
            {
              "Name": 7,
              "system:index": "28"
            })]),
    p4_2 = ui.import && ui.import("p4_2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -178.89920778369955,
            66.69930159877718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -178.63553590869955,
            66.69930159877718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -178.54764528369955,
            66.67321352502694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -178.24002809619955,
            66.67321352502694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.84452028369955,
            66.72536212102584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.58084840869955,
            66.89839659237686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.60282106494955,
            66.82068203402959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.71268434619955,
            66.65580615776008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.47098512744955,
            66.54235905370511
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.38309450244955,
            66.53361083836158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.16336793994955,
            66.63838652781534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.14139528369955,
            66.60351045178315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.11942262744955,
            66.44595925163064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.25125856494955,
            66.34918595190928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.22928590869955,
            66.14562970195539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.31717653369955,
            65.76063717192675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.83377809619955,
            65.69741378464855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.14139528369955,
            65.72452846820015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.53690309619955,
            65.69741378464855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.58084840869955,
            65.9583343741979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.31717653369955,
            66.00305359967847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.09744997119955,
            66.00305359967847
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.20731325244955,
            65.76063717192675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.42703981494955,
            65.66121662042725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.75662965869955,
            65.67932152730057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.91043825244955,
            65.67932152730057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -178.04227418994955,
            65.66121662042725
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.05350465869955,
            65.69741378464855
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.85575075244955,
            65.67027065549429
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.57010622119955,
            65.62496882996432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.50418825244955,
            65.62496882996432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.32840700244955,
            65.58867035698067
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.17459840869955,
            65.5614132079848
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.15262575244955,
            65.51592113834838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.04276247119955,
            65.92250256697137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.60330934619955,
            66.05661336615968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.06473512744955,
            66.2697291719542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.13065309619955,
            66.47228709861257
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.06473512744955,
            66.58605399164011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.50418825244955,
            66.50734772100155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -177.91043825244955,
            66.44595925163064
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.07498903369955,
            66.60351045178315
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.73416872119955,
            66.39322019149003
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.69022340869955,
            68.2150185410408
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.69022340869955,
            68.14150951840908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.77811403369955,
            68.14150951840908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.80008668994955,
            68.14968882292305
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.86600465869955,
            68.19054169995607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.69022340869955,
            68.1823769410565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.60233278369955,
            68.1742092747727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.49246950244955,
            68.1742092747727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.47049684619955,
            68.1823769410565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.71219606494955,
            68.10876317434453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.16287965869955,
            67.93607833085593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -179.11893434619955,
            68.01847005583909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.42752809619955,
            65.48858776509451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.42752809619955,
            65.37896775855216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.36161012744955,
            65.34232570674199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.31766481494955,
            65.29645124990137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.41912301954432,
            65.25833703053175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -175.17742380079432,
            65.00887027609205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -174.07879098829432,
            65.1107878472777
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -173.04607614454432,
            64.56899199768284
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -173.09002145704432,
            64.50286279097723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -173.39763864454432,
            64.45552944055956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -173.50750192579432,
            64.41760375452208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -171.61785348829432,
            66.53231957621075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -171.68377145704432,
            66.47976288829784
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -171.74968942579432,
            66.4446634406445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.80340036329432,
            66.79344463767306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -176.89129098829432,
            66.75878717125735
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 4
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
            ee.Geometry.Point([-178.89920778369955, 66.69930159877718]),
            {
              "Name": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-178.63553590869955, 66.69930159877718]),
            {
              "Name": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-178.54764528369955, 66.67321352502694]),
            {
              "Name": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-178.24002809619955, 66.67321352502694]),
            {
              "Name": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.84452028369955, 66.72536212102584]),
            {
              "Name": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.58084840869955, 66.89839659237686]),
            {
              "Name": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.60282106494955, 66.82068203402959]),
            {
              "Name": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.71268434619955, 66.65580615776008]),
            {
              "Name": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.47098512744955, 66.54235905370511]),
            {
              "Name": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.38309450244955, 66.53361083836158]),
            {
              "Name": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.16336793994955, 66.63838652781534]),
            {
              "Name": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.14139528369955, 66.60351045178315]),
            {
              "Name": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.11942262744955, 66.44595925163064]),
            {
              "Name": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.25125856494955, 66.34918595190928]),
            {
              "Name": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.22928590869955, 66.14562970195539]),
            {
              "Name": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.31717653369955, 65.76063717192675]),
            {
              "Name": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.83377809619955, 65.69741378464855]),
            {
              "Name": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.14139528369955, 65.72452846820015]),
            {
              "Name": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.53690309619955, 65.69741378464855]),
            {
              "Name": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.58084840869955, 65.9583343741979]),
            {
              "Name": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.31717653369955, 66.00305359967847]),
            {
              "Name": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.09744997119955, 66.00305359967847]),
            {
              "Name": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.20731325244955, 65.76063717192675]),
            {
              "Name": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.42703981494955, 65.66121662042725]),
            {
              "Name": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.75662965869955, 65.67932152730057]),
            {
              "Name": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.91043825244955, 65.67932152730057]),
            {
              "Name": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-178.04227418994955, 65.66121662042725]),
            {
              "Name": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.05350465869955, 65.69741378464855]),
            {
              "Name": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.85575075244955, 65.67027065549429]),
            {
              "Name": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.57010622119955, 65.62496882996432]),
            {
              "Name": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.50418825244955, 65.62496882996432]),
            {
              "Name": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.32840700244955, 65.58867035698067]),
            {
              "Name": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.17459840869955, 65.5614132079848]),
            {
              "Name": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.15262575244955, 65.51592113834838]),
            {
              "Name": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.04276247119955, 65.92250256697137]),
            {
              "Name": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.60330934619955, 66.05661336615968]),
            {
              "Name": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.06473512744955, 66.2697291719542]),
            {
              "Name": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.13065309619955, 66.47228709861257]),
            {
              "Name": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.06473512744955, 66.58605399164011]),
            {
              "Name": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.50418825244955, 66.50734772100155]),
            {
              "Name": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-177.91043825244955, 66.44595925163064]),
            {
              "Name": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.07498903369955, 66.60351045178315]),
            {
              "Name": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.73416872119955, 66.39322019149003]),
            {
              "Name": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.69022340869955, 68.2150185410408]),
            {
              "Name": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.69022340869955, 68.14150951840908]),
            {
              "Name": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.77811403369955, 68.14150951840908]),
            {
              "Name": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.80008668994955, 68.14968882292305]),
            {
              "Name": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.86600465869955, 68.19054169995607]),
            {
              "Name": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.69022340869955, 68.1823769410565]),
            {
              "Name": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.60233278369955, 68.1742092747727]),
            {
              "Name": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.49246950244955, 68.1742092747727]),
            {
              "Name": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.47049684619955, 68.1823769410565]),
            {
              "Name": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.71219606494955, 68.10876317434453]),
            {
              "Name": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.16287965869955, 67.93607833085593]),
            {
              "Name": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-179.11893434619955, 68.01847005583909]),
            {
              "Name": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.42752809619955, 65.48858776509451]),
            {
              "Name": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.42752809619955, 65.37896775855216]),
            {
              "Name": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.36161012744955, 65.34232570674199]),
            {
              "Name": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.31766481494955, 65.29645124990137]),
            {
              "Name": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.41912301954432, 65.25833703053175]),
            {
              "Name": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-175.17742380079432, 65.00887027609205]),
            {
              "Name": 4,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-174.07879098829432, 65.1107878472777]),
            {
              "Name": 4,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-173.04607614454432, 64.56899199768284]),
            {
              "Name": 4,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-173.09002145704432, 64.50286279097723]),
            {
              "Name": 4,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-173.39763864454432, 64.45552944055956]),
            {
              "Name": 4,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-173.50750192579432, 64.41760375452208]),
            {
              "Name": 4,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-171.61785348829432, 66.53231957621075]),
            {
              "Name": 4,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-171.68377145704432, 66.47976288829784]),
            {
              "Name": 4,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-171.74968942579432, 66.4446634406445]),
            {
              "Name": 4,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.80340036329432, 66.79344463767306]),
            {
              "Name": 4,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-176.89129098829432, 66.75878717125735]),
            {
              "Name": 4,
              "system:index": "70"
            })]),
    image300 = ui.import && ui.import("image300", "image", {
      "id": "users/201501824/ZONE_1/1982/SoilMoi00_10cm1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/SoilMoi00_10cm1982"),
    image301 = ui.import && ui.import("image301", "image", {
      "id": "users/201501824/ZONE_1/1982/SoilMoi10_40cm1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/SoilMoi10_40cm1982"),
    image302 = ui.import && ui.import("image302", "image", {
      "id": "users/201501824/ZONE_1/1982/Totalpr1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/Totalpr1982"),
    image303 = ui.import && ui.import("image303", "image", {
      "id": "users/201501824/ZONE_1/1982/growingSeason1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/growingSeason1982"),
    image304 = ui.import && ui.import("image304", "image", {
      "id": "users/201501824/ZONE_1/1982/temp1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/temp1982"),
    image305 = ui.import && ui.import("image305", "image", {
      "id": "users/201501824/ZONE_1/1982/temp_x1982"
    }) || ee.Image("users/201501824/ZONE_1/1982/temp_x1982"),
    image306 = ui.import && ui.import("image306", "image", {
      "id": "users/201501824/ZONE_1/1983/SoilMoi00_10cm1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/SoilMoi00_10cm1983"),
    image307 = ui.import && ui.import("image307", "image", {
      "id": "users/201501824/ZONE_1/1983/SoilMoi10_40cm1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/SoilMoi10_40cm1983"),
    image308 = ui.import && ui.import("image308", "image", {
      "id": "users/201501824/ZONE_1/1983/Totalpr1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/Totalpr1983"),
    image309 = ui.import && ui.import("image309", "image", {
      "id": "users/201501824/ZONE_1/1983/growingSeason1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/growingSeason1983"),
    image310 = ui.import && ui.import("image310", "image", {
      "id": "users/201501824/ZONE_1/1983/temp1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/temp1983"),
    image311 = ui.import && ui.import("image311", "image", {
      "id": "users/201501824/ZONE_1/1983/temp_x1983"
    }) || ee.Image("users/201501824/ZONE_1/1983/temp_x1983"),
    image312 = ui.import && ui.import("image312", "image", {
      "id": "users/201501824/ZONE_1/1984/SoilMoi00_10cm1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/SoilMoi00_10cm1984"),
    image313 = ui.import && ui.import("image313", "image", {
      "id": "users/201501824/ZONE_1/1984/SoilMoi10_40cm1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/SoilMoi10_40cm1984"),
    image314 = ui.import && ui.import("image314", "image", {
      "id": "users/201501824/ZONE_1/1984/Totalpr1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/Totalpr1984"),
    image315 = ui.import && ui.import("image315", "image", {
      "id": "users/201501824/ZONE_1/1984/growingSeason1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/growingSeason1984"),
    image316 = ui.import && ui.import("image316", "image", {
      "id": "users/201501824/ZONE_1/1984/temp1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/temp1984"),
    image317 = ui.import && ui.import("image317", "image", {
      "id": "users/201501824/ZONE_1/1984/temp_x1984"
    }) || ee.Image("users/201501824/ZONE_1/1984/temp_x1984"),
    image318 = ui.import && ui.import("image318", "image", {
      "id": "users/201501824/ZONE_1/1985/SoilMoi00_10cm1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/SoilMoi00_10cm1985"),
    image319 = ui.import && ui.import("image319", "image", {
      "id": "users/201501824/ZONE_1/1985/SoilMoi10_40cm1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/SoilMoi10_40cm1985"),
    image320 = ui.import && ui.import("image320", "image", {
      "id": "users/201501824/ZONE_1/1985/Totalpr1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/Totalpr1985"),
    image321 = ui.import && ui.import("image321", "image", {
      "id": "users/201501824/ZONE_1/1985/growingSeason1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/growingSeason1985"),
    image322 = ui.import && ui.import("image322", "image", {
      "id": "users/201501824/ZONE_1/1985/temp1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/temp1985"),
    image323 = ui.import && ui.import("image323", "image", {
      "id": "users/201501824/ZONE_1/1985/temp_x1985"
    }) || ee.Image("users/201501824/ZONE_1/1985/temp_x1985"),
    image324 = ui.import && ui.import("image324", "image", {
      "id": "users/201501824/ZONE_1/1986/SoilMoi00_10cm1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/SoilMoi00_10cm1986"),
    image325 = ui.import && ui.import("image325", "image", {
      "id": "users/201501824/ZONE_1/1986/SoilMoi10_40cm1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/SoilMoi10_40cm1986"),
    image326 = ui.import && ui.import("image326", "image", {
      "id": "users/201501824/ZONE_1/1986/Totalpr1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/Totalpr1986"),
    image327 = ui.import && ui.import("image327", "image", {
      "id": "users/201501824/ZONE_1/1986/growingSeason1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/growingSeason1986"),
    image328 = ui.import && ui.import("image328", "image", {
      "id": "users/201501824/ZONE_1/1986/temp1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/temp1986"),
    image329 = ui.import && ui.import("image329", "image", {
      "id": "users/201501824/ZONE_1/1986/temp_x1986"
    }) || ee.Image("users/201501824/ZONE_1/1986/temp_x1986"),
    image330 = ui.import && ui.import("image330", "image", {
      "id": "users/201501824/ZONE_1/1987/SoilMoi00_10cm1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/SoilMoi00_10cm1987"),
    image331 = ui.import && ui.import("image331", "image", {
      "id": "users/201501824/ZONE_1/1987/SoilMoi10_40cm1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/SoilMoi10_40cm1987"),
    image332 = ui.import && ui.import("image332", "image", {
      "id": "users/201501824/ZONE_1/1987/Totalpr1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/Totalpr1987"),
    image333 = ui.import && ui.import("image333", "image", {
      "id": "users/201501824/ZONE_1/1987/growingSeason1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/growingSeason1987"),
    image334 = ui.import && ui.import("image334", "image", {
      "id": "users/201501824/ZONE_1/1987/temp1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/temp1987"),
    image335 = ui.import && ui.import("image335", "image", {
      "id": "users/201501824/ZONE_1/1987/temp_x1987"
    }) || ee.Image("users/201501824/ZONE_1/1987/temp_x1987"),
    image336 = ui.import && ui.import("image336", "image", {
      "id": "users/201501824/ZONE_1/1988/SoilMoi00_10cm1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/SoilMoi00_10cm1988"),
    image337 = ui.import && ui.import("image337", "image", {
      "id": "users/201501824/ZONE_1/1988/SoilMoi10_40cm1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/SoilMoi10_40cm1988"),
    image338 = ui.import && ui.import("image338", "image", {
      "id": "users/201501824/ZONE_1/1988/Totalpr1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/Totalpr1988"),
    image339 = ui.import && ui.import("image339", "image", {
      "id": "users/201501824/ZONE_1/1988/growingSeason1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/growingSeason1988"),
    image340 = ui.import && ui.import("image340", "image", {
      "id": "users/201501824/ZONE_1/1988/temp1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/temp1988"),
    image341 = ui.import && ui.import("image341", "image", {
      "id": "users/201501824/ZONE_1/1988/temp_x1988"
    }) || ee.Image("users/201501824/ZONE_1/1988/temp_x1988"),
    image342 = ui.import && ui.import("image342", "image", {
      "id": "users/201501824/ZONE_1/1989/SoilMoi00_10cm1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/SoilMoi00_10cm1989"),
    image343 = ui.import && ui.import("image343", "image", {
      "id": "users/201501824/ZONE_1/1989/SoilMoi10_40cm1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/SoilMoi10_40cm1989"),
    image344 = ui.import && ui.import("image344", "image", {
      "id": "users/201501824/ZONE_1/1989/Totalpr1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/Totalpr1989"),
    image345 = ui.import && ui.import("image345", "image", {
      "id": "users/201501824/ZONE_1/1989/growingSeason1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/growingSeason1989"),
    image346 = ui.import && ui.import("image346", "image", {
      "id": "users/201501824/ZONE_1/1989/temp1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/temp1989"),
    image347 = ui.import && ui.import("image347", "image", {
      "id": "users/201501824/ZONE_1/1989/temp_x1989"
    }) || ee.Image("users/201501824/ZONE_1/1989/temp_x1989"),
    image348 = ui.import && ui.import("image348", "image", {
      "id": "users/201501824/ZONE_1/1990/SoilMoi00_10cm1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/SoilMoi00_10cm1990"),
    image349 = ui.import && ui.import("image349", "image", {
      "id": "users/201501824/ZONE_1/1990/SoilMoi10_40cm1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/SoilMoi10_40cm1990"),
    image350 = ui.import && ui.import("image350", "image", {
      "id": "users/201501824/ZONE_1/1990/Totalpr1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/Totalpr1990"),
    image351 = ui.import && ui.import("image351", "image", {
      "id": "users/201501824/ZONE_1/1990/growingSeason1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/growingSeason1990"),
    image352 = ui.import && ui.import("image352", "image", {
      "id": "users/201501824/ZONE_1/1990/temp1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/temp1990"),
    image353 = ui.import && ui.import("image353", "image", {
      "id": "users/201501824/ZONE_1/1990/temp_x1990"
    }) || ee.Image("users/201501824/ZONE_1/1990/temp_x1990"),
    image354 = ui.import && ui.import("image354", "image", {
      "id": "users/201501824/ZONE_1/1991/SoilMoi00_10cm1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/SoilMoi00_10cm1991"),
    image355 = ui.import && ui.import("image355", "image", {
      "id": "users/201501824/ZONE_1/1991/SoilMoi10_40cm1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/SoilMoi10_40cm1991"),
    image356 = ui.import && ui.import("image356", "image", {
      "id": "users/201501824/ZONE_1/1991/Totalpr1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/Totalpr1991"),
    image357 = ui.import && ui.import("image357", "image", {
      "id": "users/201501824/ZONE_1/1991/growingSeason1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/growingSeason1991"),
    image358 = ui.import && ui.import("image358", "image", {
      "id": "users/201501824/ZONE_1/1991/temp1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/temp1991"),
    image359 = ui.import && ui.import("image359", "image", {
      "id": "users/201501824/ZONE_1/1991/temp_x1991"
    }) || ee.Image("users/201501824/ZONE_1/1991/temp_x1991"),
    image360 = ui.import && ui.import("image360", "image", {
      "id": "users/201501824/ZONE_1/1992/SoilMoi00_10cm1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/SoilMoi00_10cm1992"),
    image361 = ui.import && ui.import("image361", "image", {
      "id": "users/201501824/ZONE_1/1992/SoilMoi10_40cm1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/SoilMoi10_40cm1992"),
    image362 = ui.import && ui.import("image362", "image", {
      "id": "users/201501824/ZONE_1/1992/Totalpr1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/Totalpr1992"),
    image363 = ui.import && ui.import("image363", "image", {
      "id": "users/201501824/ZONE_1/1992/growingSeason1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/growingSeason1992"),
    image364 = ui.import && ui.import("image364", "image", {
      "id": "users/201501824/ZONE_1/1992/temp1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/temp1992"),
    image365 = ui.import && ui.import("image365", "image", {
      "id": "users/201501824/ZONE_1/1992/temp_x1992"
    }) || ee.Image("users/201501824/ZONE_1/1992/temp_x1992"),
    image366 = ui.import && ui.import("image366", "image", {
      "id": "users/201501824/ZONE_1/1993/SoilMoi00_10cm1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/SoilMoi00_10cm1993"),
    image367 = ui.import && ui.import("image367", "image", {
      "id": "users/201501824/ZONE_1/1993/SoilMoi10_40cm1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/SoilMoi10_40cm1993"),
    image368 = ui.import && ui.import("image368", "image", {
      "id": "users/201501824/ZONE_1/1993/Totalpr1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/Totalpr1993"),
    image369 = ui.import && ui.import("image369", "image", {
      "id": "users/201501824/ZONE_1/1993/growingSeason1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/growingSeason1993"),
    image370 = ui.import && ui.import("image370", "image", {
      "id": "users/201501824/ZONE_1/1993/temp1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/temp1993"),
    image371 = ui.import && ui.import("image371", "image", {
      "id": "users/201501824/ZONE_1/1993/temp_x1993"
    }) || ee.Image("users/201501824/ZONE_1/1993/temp_x1993"),
    image372 = ui.import && ui.import("image372", "image", {
      "id": "users/201501824/ZONE_1/1994/SoilMoi00_10cm1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/SoilMoi00_10cm1994"),
    image373 = ui.import && ui.import("image373", "image", {
      "id": "users/201501824/ZONE_1/1994/SoilMoi10_40cm1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/SoilMoi10_40cm1994"),
    image374 = ui.import && ui.import("image374", "image", {
      "id": "users/201501824/ZONE_1/1994/Totalpr1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/Totalpr1994"),
    image375 = ui.import && ui.import("image375", "image", {
      "id": "users/201501824/ZONE_1/1994/growingSeason1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/growingSeason1994"),
    image376 = ui.import && ui.import("image376", "image", {
      "id": "users/201501824/ZONE_1/1994/temp1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/temp1994"),
    image377 = ui.import && ui.import("image377", "image", {
      "id": "users/201501824/ZONE_1/1994/temp_x1994"
    }) || ee.Image("users/201501824/ZONE_1/1994/temp_x1994"),
    image378 = ui.import && ui.import("image378", "image", {
      "id": "users/201501824/ZONE_1/1995/SoilMoi00_10cm1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/SoilMoi00_10cm1995"),
    image379 = ui.import && ui.import("image379", "image", {
      "id": "users/201501824/ZONE_1/1995/SoilMoi10_40cm1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/SoilMoi10_40cm1995"),
    image380 = ui.import && ui.import("image380", "image", {
      "id": "users/201501824/ZONE_1/1995/Totalpr1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/Totalpr1995"),
    image381 = ui.import && ui.import("image381", "image", {
      "id": "users/201501824/ZONE_1/1995/growingSeason1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/growingSeason1995"),
    image382 = ui.import && ui.import("image382", "image", {
      "id": "users/201501824/ZONE_1/1995/temp1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/temp1995"),
    image383 = ui.import && ui.import("image383", "image", {
      "id": "users/201501824/ZONE_1/1995/temp_x1995"
    }) || ee.Image("users/201501824/ZONE_1/1995/temp_x1995"),
    image384 = ui.import && ui.import("image384", "image", {
      "id": "users/201501824/ZONE_1/1996/SoilMoi00_10cm1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/SoilMoi00_10cm1996"),
    image385 = ui.import && ui.import("image385", "image", {
      "id": "users/201501824/ZONE_1/1996/SoilMoi10_40cm1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/SoilMoi10_40cm1996"),
    image386 = ui.import && ui.import("image386", "image", {
      "id": "users/201501824/ZONE_1/1996/Totalpr1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/Totalpr1996"),
    image387 = ui.import && ui.import("image387", "image", {
      "id": "users/201501824/ZONE_1/1996/growingSeason1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/growingSeason1996"),
    image388 = ui.import && ui.import("image388", "image", {
      "id": "users/201501824/ZONE_1/1996/temp1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/temp1996"),
    image389 = ui.import && ui.import("image389", "image", {
      "id": "users/201501824/ZONE_1/1996/temp_x1996"
    }) || ee.Image("users/201501824/ZONE_1/1996/temp_x1996"),
    image390 = ui.import && ui.import("image390", "image", {
      "id": "users/201501824/ZONE_1/1997/SoilMoi00_10cm1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/SoilMoi00_10cm1997"),
    image391 = ui.import && ui.import("image391", "image", {
      "id": "users/201501824/ZONE_1/1997/SoilMoi10_40cm1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/SoilMoi10_40cm1997"),
    image392 = ui.import && ui.import("image392", "image", {
      "id": "users/201501824/ZONE_1/1997/Totalpr1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/Totalpr1997"),
    image393 = ui.import && ui.import("image393", "image", {
      "id": "users/201501824/ZONE_1/1997/growingSeason1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/growingSeason1997"),
    image394 = ui.import && ui.import("image394", "image", {
      "id": "users/201501824/ZONE_1/1997/temp1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/temp1997"),
    image395 = ui.import && ui.import("image395", "image", {
      "id": "users/201501824/ZONE_1/1997/temp_x1997"
    }) || ee.Image("users/201501824/ZONE_1/1997/temp_x1997"),
    image396 = ui.import && ui.import("image396", "image", {
      "id": "users/201501824/ZONE_1/1998/SoilMoi00_10cm1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/SoilMoi00_10cm1998"),
    image397 = ui.import && ui.import("image397", "image", {
      "id": "users/201501824/ZONE_1/1998/SoilMoi10_40cm1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/SoilMoi10_40cm1998"),
    image398 = ui.import && ui.import("image398", "image", {
      "id": "users/201501824/ZONE_1/1998/Totalpr1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/Totalpr1998"),
    image399 = ui.import && ui.import("image399", "image", {
      "id": "users/201501824/ZONE_1/1998/growingSeason1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/growingSeason1998"),
    image400 = ui.import && ui.import("image400", "image", {
      "id": "users/201501824/ZONE_1/1998/temp1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/temp1998"),
    image401 = ui.import && ui.import("image401", "image", {
      "id": "users/201501824/ZONE_1/1998/temp_x1998"
    }) || ee.Image("users/201501824/ZONE_1/1998/temp_x1998"),
    image402 = ui.import && ui.import("image402", "image", {
      "id": "users/201501824/ZONE_1/1999/SoilMoi00_10cm1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/SoilMoi00_10cm1999"),
    image403 = ui.import && ui.import("image403", "image", {
      "id": "users/201501824/ZONE_1/1999/SoilMoi10_40cm1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/SoilMoi10_40cm1999"),
    image404 = ui.import && ui.import("image404", "image", {
      "id": "users/201501824/ZONE_1/1999/Totalpr1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/Totalpr1999"),
    image405 = ui.import && ui.import("image405", "image", {
      "id": "users/201501824/ZONE_1/1999/growingSeason1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/growingSeason1999"),
    image406 = ui.import && ui.import("image406", "image", {
      "id": "users/201501824/ZONE_1/1999/temp1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/temp1999"),
    image407 = ui.import && ui.import("image407", "image", {
      "id": "users/201501824/ZONE_1/1999/temp_x1999"
    }) || ee.Image("users/201501824/ZONE_1/1999/temp_x1999"),
    image408 = ui.import && ui.import("image408", "image", {
      "id": "users/201501824/ZONE_1/2000/SoilMoi00_10cm2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/SoilMoi00_10cm2000"),
    image409 = ui.import && ui.import("image409", "image", {
      "id": "users/201501824/ZONE_1/2000/SoilMoi10_40cm2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/SoilMoi10_40cm2000"),
    image410 = ui.import && ui.import("image410", "image", {
      "id": "users/201501824/ZONE_1/2000/Totalpr2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/Totalpr2000"),
    image411 = ui.import && ui.import("image411", "image", {
      "id": "users/201501824/ZONE_1/2000/growingSeason2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/growingSeason2000"),
    image412 = ui.import && ui.import("image412", "image", {
      "id": "users/201501824/ZONE_1/2000/temp2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/temp2000"),
    image413 = ui.import && ui.import("image413", "image", {
      "id": "users/201501824/ZONE_1/2000/temp_x2000"
    }) || ee.Image("users/201501824/ZONE_1/2000/temp_x2000"),
    ice = ui.import && ui.import("ice", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -132.55451482275384,
            57.59340831702264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -132.42267888525384,
            57.214630729195584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -134.31232732275384,
            59.04712812952945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -134.00471013525384,
            58.75203684235349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -134.31232732275384,
            58.6149896501681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -136.86115544775384,
            59.227473057950434
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -137.38849919775384,
            59.0245181773034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -137.34455388525384,
            58.75203684235349
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -136.94904607275384,
            58.68358059608742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.75080388525384,
            59.98339903436591
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.23420232275384,
            60.33327359115021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.89338201025384,
            60.246153896301166
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.64045232275384,
            60.33327359115021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.69513982275384,
            60.39846113197928
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.04670232275384,
            60.420161350829034
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.16779607275384,
            60.33327359115021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.55256169775384,
            60.26795558676684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.10138982275384,
            60.52844552877198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -147.01252263525384,
            61.40283632899954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.96955388525384,
            61.79993993715729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.12385076025384,
            61.2974873604503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -151.18732732275384,
            63.02090386278689
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.4840447386568,
            61.89381286726887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -146.6920525511568,
            61.329705700894515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -147.1095330199068,
            61.276952385260856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.8136345824068,
            60.62618199031767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.4620720824068,
            60.572248396662225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.9786736449068,
            60.38819925468582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.4952752074068,
            60.56145086340673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.8692986449068,
            61.22411028841461
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.4298455199068,
            61.07567921309656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.1661736449068,
            60.926548988971206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.9025017699068,
            60.798164890133265
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.7267205199068,
            60.64773020923012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.4630486449068,
            60.32299117055741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.3751580199068,
            60.235844041472134
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.1114861449068,
            60.060852162640735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.8146111449068,
            60.13752570803588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.8912713011568,
            60.159399675849365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.4845330199068,
            60.21402096272534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.9239861449068,
            60.2903382052583
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.1993767699068,
            60.104687464887085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.2320916136568,
            60.50740907935011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.8146111449068,
            60.62618199031767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.0123650511568,
            60.84101693744829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.2101189574068,
            60.915870016720596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.2208611449068,
            61.287510147541816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.1105095824068,
            61.8108889422352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.6598259886568,
            61.883459641171896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.8478142699068,
            60.377340295082476
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.0235955199068,
            60.49658989324069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.6388298949068,
            60.56145086340673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.0782830199068,
            60.35561151302335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.2540642699068,
            60.192183352370066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.5289666136568,
            60.02793742407424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -139.1114861449068,
            59.99498986533857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.7818963011568,
            59.884927355002326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.4962517699068,
            59.75236952515235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -138.3204705199068,
            59.663704379146026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -136.7604119261568,
            59.171832984932266
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -137.6832634886568,
            59.1493051298555
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.1661736449068,
            60.192183352370066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.0890252074068,
            60.36647771480053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.7042595824068,
            60.409906315124715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.3194939574068,
            60.453277023820334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.1764275511568,
            60.453277023820334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -149.9220330199068,
            60.104687464887085
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -150.0978142699068,
            59.973006581977906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -150.1857048949068,
            59.87390100280573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -150.3614861449068,
            59.77449912748681
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -151.4161736449068,
            62.94159544015892
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -151.6578728636568,
            62.86152350238586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -152.2950798949068,
            61.434946406721025
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -152.6026970824068,
            60.99054769853291
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -152.7784783324068,
            60.94789619816433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -145.0001580199068,
            60.71228848792264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -147.2853142699068,
            61.29806435940963
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -147.9225213011568,
            61.308615021700206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.5060173949068,
            60.49658989324069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -142.6271111449068,
            60.529036619810654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -143.9454705199068,
            61.98683443118575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -140.5616814574068,
            59.973006581977906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -141.7921502074068,
            60.159399675849365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -148.6915642699068,
            60.235844041472134
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Name": 0
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
            ee.Geometry.Point([-132.55451482275384, 57.59340831702264]),
            {
              "Name": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-132.42267888525384, 57.214630729195584]),
            {
              "Name": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-134.31232732275384, 59.04712812952945]),
            {
              "Name": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-134.00471013525384, 58.75203684235349]),
            {
              "Name": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-134.31232732275384, 58.6149896501681]),
            {
              "Name": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-136.86115544775384, 59.227473057950434]),
            {
              "Name": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-137.38849919775384, 59.0245181773034]),
            {
              "Name": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-137.34455388525384, 58.75203684235349]),
            {
              "Name": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-136.94904607275384, 58.68358059608742]),
            {
              "Name": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.75080388525384, 59.98339903436591]),
            {
              "Name": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.23420232275384, 60.33327359115021]),
            {
              "Name": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.89338201025384, 60.246153896301166]),
            {
              "Name": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.64045232275384, 60.33327359115021]),
            {
              "Name": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.69513982275384, 60.39846113197928]),
            {
              "Name": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.04670232275384, 60.420161350829034]),
            {
              "Name": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.16779607275384, 60.33327359115021]),
            {
              "Name": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.55256169775384, 60.26795558676684]),
            {
              "Name": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.10138982275384, 60.52844552877198]),
            {
              "Name": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([-147.01252263525384, 61.40283632899954]),
            {
              "Name": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.96955388525384, 61.79993993715729]),
            {
              "Name": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.12385076025384, 61.2974873604503]),
            {
              "Name": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([-151.18732732275384, 63.02090386278689]),
            {
              "Name": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.4840447386568, 61.89381286726887]),
            {
              "Name": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([-146.6920525511568, 61.329705700894515]),
            {
              "Name": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([-147.1095330199068, 61.276952385260856]),
            {
              "Name": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.8136345824068, 60.62618199031767]),
            {
              "Name": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.4620720824068, 60.572248396662225]),
            {
              "Name": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.9786736449068, 60.38819925468582]),
            {
              "Name": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.4952752074068, 60.56145086340673]),
            {
              "Name": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.8692986449068, 61.22411028841461]),
            {
              "Name": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.4298455199068, 61.07567921309656]),
            {
              "Name": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.1661736449068, 60.926548988971206]),
            {
              "Name": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.9025017699068, 60.798164890133265]),
            {
              "Name": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.7267205199068, 60.64773020923012]),
            {
              "Name": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.4630486449068, 60.32299117055741]),
            {
              "Name": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.3751580199068, 60.235844041472134]),
            {
              "Name": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.1114861449068, 60.060852162640735]),
            {
              "Name": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.8146111449068, 60.13752570803588]),
            {
              "Name": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.8912713011568, 60.159399675849365]),
            {
              "Name": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.4845330199068, 60.21402096272534]),
            {
              "Name": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.9239861449068, 60.2903382052583]),
            {
              "Name": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.1993767699068, 60.104687464887085]),
            {
              "Name": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.2320916136568, 60.50740907935011]),
            {
              "Name": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.8146111449068, 60.62618199031767]),
            {
              "Name": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.0123650511568, 60.84101693744829]),
            {
              "Name": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.2101189574068, 60.915870016720596]),
            {
              "Name": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.2208611449068, 61.287510147541816]),
            {
              "Name": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.1105095824068, 61.8108889422352]),
            {
              "Name": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.6598259886568, 61.883459641171896]),
            {
              "Name": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.8478142699068, 60.377340295082476]),
            {
              "Name": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.0235955199068, 60.49658989324069]),
            {
              "Name": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.6388298949068, 60.56145086340673]),
            {
              "Name": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.0782830199068, 60.35561151302335]),
            {
              "Name": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.2540642699068, 60.192183352370066]),
            {
              "Name": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.5289666136568, 60.02793742407424]),
            {
              "Name": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([-139.1114861449068, 59.99498986533857]),
            {
              "Name": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.7818963011568, 59.884927355002326]),
            {
              "Name": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.4962517699068, 59.75236952515235]),
            {
              "Name": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([-138.3204705199068, 59.663704379146026]),
            {
              "Name": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([-136.7604119261568, 59.171832984932266]),
            {
              "Name": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([-137.6832634886568, 59.1493051298555]),
            {
              "Name": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.1661736449068, 60.192183352370066]),
            {
              "Name": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.0890252074068, 60.36647771480053]),
            {
              "Name": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.7042595824068, 60.409906315124715]),
            {
              "Name": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.3194939574068, 60.453277023820334]),
            {
              "Name": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.1764275511568, 60.453277023820334]),
            {
              "Name": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([-149.9220330199068, 60.104687464887085]),
            {
              "Name": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([-150.0978142699068, 59.973006581977906]),
            {
              "Name": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([-150.1857048949068, 59.87390100280573]),
            {
              "Name": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([-150.3614861449068, 59.77449912748681]),
            {
              "Name": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([-151.4161736449068, 62.94159544015892]),
            {
              "Name": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([-151.6578728636568, 62.86152350238586]),
            {
              "Name": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([-152.2950798949068, 61.434946406721025]),
            {
              "Name": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([-152.6026970824068, 60.99054769853291]),
            {
              "Name": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([-152.7784783324068, 60.94789619816433]),
            {
              "Name": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([-145.0001580199068, 60.71228848792264]),
            {
              "Name": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([-147.2853142699068, 61.29806435940963]),
            {
              "Name": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([-147.9225213011568, 61.308615021700206]),
            {
              "Name": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.5060173949068, 60.49658989324069]),
            {
              "Name": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([-142.6271111449068, 60.529036619810654]),
            {
              "Name": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([-143.9454705199068, 61.98683443118575]),
            {
              "Name": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([-140.5616814574068, 59.973006581977906]),
            {
              "Name": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([-141.7921502074068, 60.159399675849365]),
            {
              "Name": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([-148.6915642699068, 60.235844041472134]),
            {
              "Name": 0,
              "system:index": "83"
            })]),
    sampleData = ui.import && ui.import("sampleData", "table", {
      "id": "users/201501824/test/2000total"
    }) || ee.FeatureCollection("users/201501824/test/2000total"),
    cavm = ui.import && ui.import("cavm", "image", {
      "id": "users/0219135/CAVM"
    }) || ee.Image("users/0219135/CAVM"),
    boundary = ui.import && ui.import("boundary", "table", {
      "id": "users/0219135/cavmBoundary_EPSG4326"
    }) || ee.FeatureCollection("users/0219135/cavmBoundary_EPSG4326");
//Map.addLayer(sampleData)
//cavm.remap([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
//Map.addLayer(sampleData)
//sampleData = sampleData.merge(table).merge(b3).merge(f1).merge(b2).merge(s2).merge(w3).merge(p4).merge(p4).merge(p4)
//.merge(p4).merge(p3).merge(p7).merge(p4_2).merge(ice)
var roi = ee.Geometry.MultiPolygon(
        [[[[-180, 89],
          [-180, 50],
          [-119, 50],
          [-119, 89]] 
          ]], null, false); 
//sampleData = sampleData.filterBounds(boundary) 
var soil = image13.select('b1').rename('soil')
var CanopyHeight = ee.Image('NASA/JPL/global_forest_canopy_height_2005')
.select('1')
.rename('CanopyHeight')
.clip(roi);
var dem = ee.Image('USGS/GMTED2010').clip(roi);
var elevation = dem.select('be75');
var slope = ee.Terrain.slope(elevation).clip(roi);
var hillshade = ee.Terrain.hillshade(dem);
// Smoothing filter
var gaussianFilter = ee.Kernel.gaussian({
  radius: 3, sigma: 2, units: 'pixels', normalize: true
});
// Smoothing the DEM with the gaussian kernel.
var dem = dem.convolve(gaussianFilter).resample("bilinear");
var TAGEE = require('users/joselucassafanelli/TAGEE:TAGEE-functions');
// Terrain analysis
//https://github.com/zecojls/tagee
var DEMAttributes = TAGEE.terrainAnalysis(TAGEE, dem, roi).select('MeanCurvature');
// https://en.wikipedia.org/wiki/Universal_Transverse_Mercator_coordinate_system
var longitude = ee.Image.pixelLonLat().select('longitude').clip(roi);
var latitude = ee.Image.pixelLonLat().select('latitude').clip(roi);
var ALBEDO2000 =image1
                  .addBands(image2)
                  .addBands(image3)
                  .addBands(image4)
                  //.addBands(image5)
                  .addBands(image6)
                  .addBands(image7)
                  .addBands(image8)
                  .addBands(image9)
                  .addBands(image10)
                  .addBands(image408)
                  .addBands(image409)
                  .addBands(image410)
                  .addBands(image411)
                  .addBands(image412)
                  .addBands(image413)
                  .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1999 =image15
                  .addBands(image16)
                  .addBands(image17)
                  .addBands(image18)
                  //.addBands(image19)
                  .addBands(image20)
                  .addBands(image21)
                  .addBands(image22)
                  .addBands(image23)
                  .addBands(image24)
                  .addBands(image402)
                  .addBands(image403)
                  .addBands(image404)
                  .addBands(image405)
                  .addBands(image406)
                  .addBands(image407)
 .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                  .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1998 =image27
                  .addBands(image28)
                  .addBands(image29)
                  .addBands(image30)
                  //.addBands(image31)
                  .addBands(image32)
                  .addBands(image33)
                  .addBands(image34)
                  .addBands(image35)
                  .addBands(image36)
                  .addBands(image396)
                  .addBands(image397)
                  .addBands(image398)
                  .addBands(image399)
                  .addBands(image400)
                  .addBands(image401)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1997 =image39
                  .addBands(image40)
                  .addBands(image41)
                  .addBands(image42)
                  //.addBands(image43)
                  .addBands(image44)
                  .addBands(image45)
                  .addBands(image46)
                  .addBands(image47)
                  .addBands(image48)
                  .addBands(image390)
                  .addBands(image391)
                  .addBands(image392)
                  .addBands(image393)
                  .addBands(image394)
                  .addBands(image395)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1996 =image51
                  .addBands(image52)
                  .addBands(image53)
                  .addBands(image54)
                  //.addBands(image55)
                  .addBands(image56)
                  .addBands(image57)
                  .addBands(image58)
                  .addBands(image59)
                  .addBands(image60)
                  .addBands(image384)
                  .addBands(image385)
                  .addBands(image386)
                  .addBands(image387)
                  .addBands(image388)
                  .addBands(image389)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1995 =image63
                  .addBands(image64)
                  .addBands(image65)
                  .addBands(image66)
                 // .addBands(image67)
                  .addBands(image68)
                  .addBands(image69)
                  .addBands(image70)
                  .addBands(image71)
                  .addBands(image72)
                  .addBands(image378)
                  .addBands(image379)
                  .addBands(image380)
                  .addBands(image381)
                  .addBands(image382)
                  .addBands(image383)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1994 =image75
                  .addBands(image76)
                  .addBands(image77)
                  .addBands(image78)
                  //.addBands(image79)
                  .addBands(image80)
                  .addBands(image81)
                  .addBands(image82)
                  .addBands(image83)
                  .addBands(image84)
                  .addBands(image372)
                  .addBands(image373)
                  .addBands(image374)
                  .addBands(image375)
                  .addBands(image376)
                  .addBands(image377)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1993 =image87
                  .addBands(image88)
                  .addBands(image89)
                  .addBands(image90)
                  //.addBands(image91)
                  .addBands(image92)
                  .addBands(image93)
                  .addBands(image94)
                  .addBands(image95)
                  .addBands(image96)
                  .addBands(image366)
                  .addBands(image367)
                  .addBands(image368)
                  .addBands(image369)
                  .addBands(image370)
                  .addBands(image371)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1992 =image99
                  .addBands(image100)
                  .addBands(image101)
                  .addBands(image102)
                  //.addBands(image103)
                  .addBands(image104)
                  .addBands(image105)
                  .addBands(image106)
                  .addBands(image107)
                  .addBands(image108)
                  .addBands(image360)
                  .addBands(image361)
                  .addBands(image362)
                  .addBands(image363)
                  .addBands(image364)
                  .addBands(image365)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
.unmask(-9999)
                  .clip(roi);
var ALBEDO1991 =image111
                  .addBands(image112)
                  .addBands(image113)
                  .addBands(image114)
                 // .addBands(image115)
                  .addBands(image116)
                  .addBands(image117)
                  .addBands(image118)
                  .addBands(image119)
                  .addBands(image120)
                  .addBands(image354)
                  .addBands(image355)
                  .addBands(image356)
                  .addBands(image357)
                  .addBands(image358)
                  .addBands(image359)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                  .unmask(-9999)
                  .clip(roi);
//print(ALBEDO1991);
var ALBEDO1990 =image123
                  .addBands(image124)
                  .addBands(image125)
                  .addBands(image126)
                 // .addBands(image127)
                  .addBands(image128)
                  .addBands(image129)
                  .addBands(image130)
                  .addBands(image131)
                  .addBands(image132)
                  .addBands(image348)
                  .addBands(image349)
                  .addBands(image350)
                  .addBands(image351)
                  .addBands(image352)
                  .addBands(image353)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                 .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1989 =image135
                  .addBands(image136)
                  .addBands(image137)
                  .addBands(image138)
                 // .addBands(image139)
                  .addBands(image140)
                  .addBands(image141)
                  .addBands(image142)
                  .addBands(image143)
                  .addBands(image144)
                  .addBands(image342)
                  .addBands(image343)
                  .addBands(image344)
                  .addBands(image345)
                  .addBands(image346)
                  .addBands(image347)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                  .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1988 =image147
                  .addBands(image148)
                  .addBands(image149)
                  .addBands(image150)
                  //.addBands(image151)
                  .addBands(image152)
                  .addBands(image153)
                  .addBands(image154)
                  .addBands(image155)
                  .addBands(image156)
                  .addBands(image336)
                  .addBands(image337)
                  .addBands(image338)
                  .addBands(image339)
                  .addBands(image340)
                  .addBands(image341)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                  .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1987 =image159
                  .addBands(image160)
                  .addBands(image161)
                  .addBands(image162)
                 // .addBands(image163)
                  .addBands(image164)
                  .addBands(image165)
                  .addBands(image166)
                  .addBands(image167)
                  .addBands(image168)
                  .addBands(image330)
                  .addBands(image331)
                  .addBands(image332)
                  .addBands(image333)
                  .addBands(image334)
                  .addBands(image335)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
          .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1986 =image171
                  .addBands(image172)
                  .addBands(image173)
                  .addBands(image174)
                  //.addBands(image175)
                  .addBands(image176)
                  .addBands(image177)
                  .addBands(image178)
                  .addBands(image179)
                  .addBands(image180)
                  .addBands(image324)
                  .addBands(image325)
                  .addBands(image326)
                  .addBands(image327)
                  .addBands(image328)
                  .addBands(image329)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
               .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1985 =image183
                  .addBands(image184)
                  .addBands(image185)
                  .addBands(image186)
                 // .addBands(image187)
                  .addBands(image188)
                  .addBands(image189)
                  .addBands(image190)
                  .addBands(image191)
                  .addBands(image192)
                  .addBands(image318)
                  .addBands(image319)
                  .addBands(image320)
                  .addBands(image321)
                  .addBands(image322)
                  .addBands(image323)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                  .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1984 =image195
                  .addBands(image196)
                  .addBands(image197)
                  .addBands(image198)
                 // .addBands(image199)
                  .addBands(image200)
                  .addBands(image201)
                  .addBands(image202)
                  .addBands(image203)
                  .addBands(image204)
                  .addBands(image312)
                  .addBands(image313)
                  .addBands(image314)
                  .addBands(image315)
                  .addBands(image316)
                  .addBands(image317)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1983 =image207
                  .addBands(image208)
                  .addBands(image209)
                  .addBands(image210)
                 // .addBands(image211)
                  .addBands(image212)
                  .addBands(image213)
                  .addBands(image214)
                  .addBands(image215)
                  .addBands(image216)
                  .addBands(image306)
                  .addBands(image307)
                  .addBands(image308)
                  .addBands(image309)
                  .addBands(image310)
                  .addBands(image311)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
                .unmask(-9999)
                  .clip(roi);
//print(ALBEDO2000);
var ALBEDO1982 =image219
                  .addBands(image220)
                  .addBands(image221)
                  .addBands(image222)
                 // .addBands(image223)
                  .addBands(image224)
                  .addBands(image225)
                  .addBands(image226)
                  .addBands(image227)
                  .addBands(image228)
                  .addBands(image300)
                  .addBands(image301)
                  .addBands(image302)
                  .addBands(image303)
                  .addBands(image304)
                  .addBands(image305)
                   .addBands(DEMAttributes)
                  .addBands(soil)
                  .addBands(longitude)
                  .addBands(latitude)
                  .addBands(slope)
                  .addBands(elevation)
                  .addBands(hillshade)
                  .addBands(CanopyHeight)
               .unmask(-9999)
                  .clip(roi);
//print(ALBEDO1982);
var bands = ["total_evaporation","NDVI","mean_2m_air_temperature",
"SREFL_CH1","LAI","skin_temperature","maximum_2m_air_temperature",
"SREFL_CH2","SREFL_CH3","BT_CH3","BT_CH5","total_precipitation","temperature_2m"
,"soil","MeanCurvature","SoilMoi00_10cm_tavg","SoilMoi10_40cm_tavg",
"longitude","latitude","slope","be75","hillshade","CanopyHeight"]
sampleData = sampleData.randomColumn('random');  
var sample_training = sampleData.filter(ee.Filter.lte("random", 0.7));   
var sample_validate  = sampleData.filter(ee.Filter.gt("random", 0.7)); 
var training =ALBEDO2000.sampleRegions({  
  collection: sample_training,   
  properties: ["Name"],   
  scale: 5000  
});  
var validation = ALBEDO2000.select(bands).sampleRegions({  
  collection: sample_validate,   
  properties: ["Name"],   
  scale: 5000  
});
// Spatial join.
var distFilter = ee.Filter.withinDistance({
  distance: 1000,
  leftField: '.geo',
  rightField: '.geo',
  maxError: 10
});
var join = ee.Join.inverted();
// Apply the join.
training = join.apply(training, validation, distFilter);
var classifier = ee.Classifier.smileRandomForest(150)
  .train({
  features: training,   
  classProperty: "Name",  
  inputProperties: bands
});
//分类结果：验证数据集合调用classify得到分类结果  
var classified = ALBEDO1996.classify(classifier);
//验证数据集合调用classify进行验证分析得到验证结果  验证验证
var validated = validation.classify(classifier);
//训练结果的混淆矩阵  
var trainAccuracy = classifier.confusionMatrix();  
//导出训练精度结果CSV  
Export.table.toDrive({  
  collection: ee.FeatureCollection([  
    ee.Feature(null, {  
      matrix: trainAccuracy.array(),  
      kappa: trainAccuracy.kappa(),  
      accuracy: trainAccuracy.accuracy()  
    }  
  )]),  
  description: "ALBEDOTrainConf",  
  folder:"Alaska vegetation map_2",  
  fileFormat: "CSV"  
});  
//导出影像  
var resultImg = classified.clip(roi).toByte();  
resultImg = resultImg.remap([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], 
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]);  
Export.image.toDrive({  
  image:resultImg,  
  description:'Drive-Classifiedmap',  
  fileNamePrefix: "Classifiedmap",  
  folder:"Alaska vegetation map_2",  
  region: roi,  
  scale:5000,  
  crs: "EPSG:4326",  
  maxPixels:1e13  
});  
//验证结果的混淆矩阵  
var testAccuracy = validated.errorMatrix('Name', 'classification');  
//导出验证精度结果CSV  
Export.table.toDrive({  
  collection: ee.FeatureCollection([  
    ee.Feature(null, {  
      matrix: testAccuracy.array(),  
      kappa: testAccuracy.kappa(),  
      accuracy: testAccuracy.accuracy()  
    }  
  )]),  
  description: "TestConf",  
  folder:"Alaska vegetation map_2",  
  fileFormat: "CSV"  
});  
var matchfeature =cavm.sampleRegions({  
  collection: sample_training,   
  properties: ["Name"],   
  scale: 5000  
});  
var test = matchfeature.errorMatrix('Name', 'b1');  
Export.table.toDrive({  
  collection: ee.FeatureCollection([  
    ee.Feature(null, {  
      matrix: test.array(),  
      kappa: test.kappa(),  
      accuracy: test.accuracy()  
    }  
  )]),  
  description: "match",  
  folder:"Alaska vegetation map_2",  
  fileFormat: "CSV"  
});