var S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    train_image = ui.import && ui.import("train_image", "image", {
      "id": "COPERNICUS/S2/20200129T051041_20200129T052502_T43PHN"
    }) || ee.Image("COPERNICUS/S2/20200129T051041_20200129T052502_T43PHN"),
    districts = ui.import && ui.import("districts", "table", {
      "id": "users/balakumaran247/TN_Districts"
    }) || ee.FeatureCollection("users/balakumaran247/TN_Districts"),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.21803929117438,
            10.97510252869695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.21848990228888,
            10.971416093703649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.21765305307623,
            10.971373962752224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.21803929117438,
            10.970025769135717
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.21578623560187,
            10.968003467181317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.22134377268073,
            10.968572241004287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.22827089439473,
            10.971124815557369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2264469922646,
            10.971567190620709
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.22963714332428,
            10.978304277737562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2236075374588,
            10.975881794747782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2147455188736,
            10.974975991657644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.20970368194932,
            10.974613953614211
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2262440467869,
            10.982926163018206
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2278104568516,
            10.981541032872906
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23426476414114,
            10.981484093167971
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23409310276419,
            10.982537329103428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23214045460135,
            10.982537329103428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23179713184744,
            10.983990788524114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25407381479965,
            11.61920772157254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25330133860336,
            11.62303296346942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.27428694193588,
            11.628371400060407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.27926512186752,
            11.627951054434433
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.28553076212631,
            11.62753070817385
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.29115267222153,
            11.631313801672004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.28875598013794,
            11.60902773416344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30169391155422,
            11.61767384597658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30746043219087,
            11.62336420696715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30115187658784,
            11.6229018184301
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.32905707859413,
            11.602077689697403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3368676712455,
            11.600816531965007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3601353301791,
            11.613933525043329
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.35910536191739,
            11.618809740666531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23737425177944,
            11.600660015852819
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23634428351772,
            11.604443474073586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25146753934133,
            11.652706382819119
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25753698162109,
            11.653793151929536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.24972638896972,
            11.655558435246702
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25335273555785,
            11.654465642135069
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25296649745971,
            11.655201176433225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25369605831176,
            11.653162690883342
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.26757243528512,
            11.643509816788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.224313130304,
            11.642810845806757
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23435532085576,
            11.638649612068313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.26551370014651,
            10.938431560153386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25847558369144,
            10.942055203341132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2567589699219,
            10.941718122122747
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.24740342487796,
            10.947027106772602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2934086739014,
            10.946690031210437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.27341012348636,
            10.951746124363826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.30412343967195,
            10.94820686821956
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 0
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
            ee.Geometry.Point([78.21803929117438, 10.97510252869695]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.21848990228888, 10.971416093703649]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.21765305307623, 10.971373962752224]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.21803929117438, 10.970025769135717]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.21578623560187, 10.968003467181317]),
            {
              "class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.22134377268073, 10.968572241004287]),
            {
              "class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.22827089439473, 10.971124815557369]),
            {
              "class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2264469922646, 10.971567190620709]),
            {
              "class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.22963714332428, 10.978304277737562]),
            {
              "class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2236075374588, 10.975881794747782]),
            {
              "class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2147455188736, 10.974975991657644]),
            {
              "class": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.20970368194932, 10.974613953614211]),
            {
              "class": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2262440467869, 10.982926163018206]),
            {
              "class": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2278104568516, 10.981541032872906]),
            {
              "class": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23426476414114, 10.981484093167971]),
            {
              "class": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23409310276419, 10.982537329103428]),
            {
              "class": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23214045460135, 10.982537329103428]),
            {
              "class": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23179713184744, 10.983990788524114]),
            {
              "class": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25407381479965, 11.61920772157254]),
            {
              "class": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25330133860336, 11.62303296346942]),
            {
              "class": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.27428694193588, 11.628371400060407]),
            {
              "class": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.27926512186752, 11.627951054434433]),
            {
              "class": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.28553076212631, 11.62753070817385]),
            {
              "class": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.29115267222153, 11.631313801672004]),
            {
              "class": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.28875598013794, 11.60902773416344]),
            {
              "class": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30169391155422, 11.61767384597658]),
            {
              "class": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30746043219087, 11.62336420696715]),
            {
              "class": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30115187658784, 11.6229018184301]),
            {
              "class": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.32905707859413, 11.602077689697403]),
            {
              "class": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3368676712455, 11.600816531965007]),
            {
              "class": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3601353301791, 11.613933525043329]),
            {
              "class": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.35910536191739, 11.618809740666531]),
            {
              "class": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23737425177944, 11.600660015852819]),
            {
              "class": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23634428351772, 11.604443474073586]),
            {
              "class": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25146753934133, 11.652706382819119]),
            {
              "class": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25753698162109, 11.653793151929536]),
            {
              "class": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.24972638896972, 11.655558435246702]),
            {
              "class": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25335273555785, 11.654465642135069]),
            {
              "class": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25296649745971, 11.655201176433225]),
            {
              "class": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25369605831176, 11.653162690883342]),
            {
              "class": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.26757243528512, 11.643509816788]),
            {
              "class": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.224313130304, 11.642810845806757]),
            {
              "class": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23435532085576, 11.638649612068313]),
            {
              "class": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([78.26551370014651, 10.938431560153386]),
            {
              "class": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25847558369144, 10.942055203341132]),
            {
              "class": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2567589699219, 10.941718122122747]),
            {
              "class": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([78.24740342487796, 10.947027106772602]),
            {
              "class": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2934086739014, 10.946690031210437]),
            {
              "class": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([78.27341012348636, 10.951746124363826]),
            {
              "class": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([78.30412343967195, 10.94820686821956]),
            {
              "class": 0,
              "system:index": "49"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.19614950011885,
            10.964513934235267
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23237005065596,
            10.959626589742268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.23056760619795,
            10.96459819808733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.20919576476729,
            10.95794127981695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.20541921447432,
            10.961986007510163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.19034624164699,
            10.969174231082917
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.3111124514099,
            10.966237956330897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.34604049290961,
            10.959188209830582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.43286334482478,
            10.940662403542344
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.42367946115779,
            10.948330933711588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00915723547742,
            11.041559863550845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00572400793835,
            11.042233797461098
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00126081213757,
            11.047625213046386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03789733892701,
            11.434137563710939
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03347705847047,
            11.43308597142324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03918479925416,
            11.432328822559157
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.01697963307105,
            11.41987799600249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.01672214100562,
            11.422696385873914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0151342732688,
            11.421013768424288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.04125916075533,
            11.438492996502799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03400646757906,
            11.436978725656742
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02696835112398,
            11.409762534139443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.20851823211311,
            11.398123431124974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.79061122384128,
            11.60448737878705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.78333059410251,
            11.568892529839204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.83053747276462,
            11.569481138051584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.82101026634372,
            11.563805221571599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.83336988548434,
            11.56788348430962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.82890668968356,
            11.568976616802479
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.11641765468455,
            11.614511679725872
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1191642367158,
            11.612914283509975
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.11135364406444,
            11.599882551554842
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.11212612026073,
            11.596183110289589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.18977086802101,
            11.710345361820384
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.19122998972512,
            11.710177273321445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1792136933384,
            11.689249457132643
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17878453989601,
            11.685887411433026
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.25053899546242,
            11.720598566917644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.2535430695591,
            11.718581573029695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.81365980968174,
            11.032790064713806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.81838049754795,
            11.026977147042878
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.8086816297501,
            11.03826589647334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.86322995320698,
            11.028720235790667
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.88909033532433,
            11.083142562735594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.90877089977346,
            11.072564076286403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.93409686985362,
            11.068464228663249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.89356735611715,
            11.074478700251513
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.90041939946798,
            11.170344431577128
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.88119332524923,
            11.161460702519992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.8685739383774,
            11.171820242171684
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 1
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
            ee.Geometry.Point([78.19614950011885, 10.964513934235267]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23237005065596, 10.959626589742268]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.23056760619795, 10.96459819808733]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.20919576476729, 10.95794127981695]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.20541921447432, 10.961986007510163]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.19034624164699, 10.969174231082917]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.3111124514099, 10.966237956330897]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.34604049290961, 10.959188209830582]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.43286334482478, 10.940662403542344]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.42367946115779, 10.948330933711588]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00915723547742, 11.041559863550845]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00572400793835, 11.042233797461098]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00126081213757, 11.047625213046386]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03789733892701, 11.434137563710939]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03347705847047, 11.43308597142324]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03918479925416, 11.432328822559157]),
            {
              "class": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.01697963307105, 11.41987799600249]),
            {
              "class": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.01672214100562, 11.422696385873914]),
            {
              "class": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0151342732688, 11.421013768424288]),
            {
              "class": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.04125916075533, 11.438492996502799]),
            {
              "class": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03400646757906, 11.436978725656742]),
            {
              "class": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02696835112398, 11.409762534139443]),
            {
              "class": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.20851823211311, 11.398123431124974]),
            {
              "class": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([77.79061122384128, 11.60448737878705]),
            {
              "class": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([77.78333059410251, 11.568892529839204]),
            {
              "class": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([77.83053747276462, 11.569481138051584]),
            {
              "class": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([77.82101026634372, 11.563805221571599]),
            {
              "class": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([77.83336988548434, 11.56788348430962]),
            {
              "class": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([77.82890668968356, 11.568976616802479]),
            {
              "class": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.11641765468455, 11.614511679725872]),
            {
              "class": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1191642367158, 11.612914283509975]),
            {
              "class": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.11135364406444, 11.599882551554842]),
            {
              "class": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.11212612026073, 11.596183110289589]),
            {
              "class": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.18977086802101, 11.710345361820384]),
            {
              "class": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.19122998972512, 11.710177273321445]),
            {
              "class": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1792136933384, 11.689249457132643]),
            {
              "class": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17878453989601, 11.685887411433026]),
            {
              "class": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.25053899546242, 11.720598566917644]),
            {
              "class": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.2535430695591, 11.718581573029695]),
            {
              "class": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([77.81365980968174, 11.032790064713806]),
            {
              "class": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([77.81838049754795, 11.026977147042878]),
            {
              "class": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([77.8086816297501, 11.03826589647334]),
            {
              "class": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([77.86322995320698, 11.028720235790667]),
            {
              "class": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([77.88909033532433, 11.083142562735594]),
            {
              "class": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([77.90877089977346, 11.072564076286403]),
            {
              "class": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([77.93409686985362, 11.068464228663249]),
            {
              "class": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([77.89356735611715, 11.074478700251513]),
            {
              "class": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([77.90041939946798, 11.170344431577128]),
            {
              "class": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([77.88119332524923, 11.161460702519992]),
            {
              "class": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([77.8685739383774, 11.171820242171684]),
            {
              "class": 1,
              "system:index": "49"
            })]),
    builtup = ui.import && ui.import("builtup", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.00355898627333,
            11.076356561512164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00162779578261,
            11.07715676286614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00029742011122,
            11.076272329663414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.9998253513246,
            11.072102822855362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99849497565322,
            11.073029385055865
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00222861060195,
            11.070712974056883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00347315558486,
            11.070544507087575
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99068438300185,
            11.075303661660561
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.98956858405165,
            11.074756152240926
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.01905142554335,
            11.069786404526397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02012430914931,
            11.07180800699484
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02016722449355,
            11.071007791019925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0137299228578,
            11.071218374383252
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0090092349916,
            11.07206070632204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0078934360414,
            11.069070416972204
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00600516089492,
            11.069870638241213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00282942542128,
            11.069365235588858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00081240424208,
            11.069617937024065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00308691748671,
            11.07951523833905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03162562140517,
            11.071723773837306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.03106772193007,
            11.070586623838983
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99115888830026,
            11.048555699552173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.9891847824653,
            11.04821874004789
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.98774711843332,
            11.052388586676571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.98684589620431,
            11.052430706037125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99581068875146,
            11.055643957953945
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.9961969268496,
            11.056086206029176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99510258557153,
            11.05855983544083
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99703377606225,
            11.057843820454073
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99748438717675,
            11.056685557214397
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99465197445703,
            11.057949116885316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99336451412988,
            11.059612795479744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99295681835962,
            11.058833605414783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99273193107453,
            11.053177009048033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99133718238679,
            11.05361926084343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99099385963288,
            11.05389303543022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99238860832062,
            11.055935806971332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.9929250501236,
            11.055851569250938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99941412234222,
            11.051915894328634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99896351122771,
            11.052126491410288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00281580591336,
            11.044217237402309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.00905998850003,
            11.044785864094065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0117207398428,
            11.044132996317268
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99891050958767,
            11.045775693114997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.9993825783743,
            11.045544031302907
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99833029599338,
            11.04825672438208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            77.99768656582981,
            11.048741103485106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.07431842112068,
            11.045842713580873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0738892676783,
            11.045863773731732
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.06215192102913,
            11.040156417572753
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 2
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
            ee.Geometry.Point([78.00355898627333, 11.076356561512164]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00162779578261, 11.07715676286614]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00029742011122, 11.076272329663414]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([77.9998253513246, 11.072102822855362]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99849497565322, 11.073029385055865]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00222861060195, 11.070712974056883]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00347315558486, 11.070544507087575]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99068438300185, 11.075303661660561]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([77.98956858405165, 11.074756152240926]),
            {
              "class": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.01905142554335, 11.069786404526397]),
            {
              "class": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02012430914931, 11.07180800699484]),
            {
              "class": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02016722449355, 11.071007791019925]),
            {
              "class": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0137299228578, 11.071218374383252]),
            {
              "class": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0090092349916, 11.07206070632204]),
            {
              "class": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0078934360414, 11.069070416972204]),
            {
              "class": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00600516089492, 11.069870638241213]),
            {
              "class": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00282942542128, 11.069365235588858]),
            {
              "class": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00081240424208, 11.069617937024065]),
            {
              "class": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00308691748671, 11.07951523833905]),
            {
              "class": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03162562140517, 11.071723773837306]),
            {
              "class": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.03106772193007, 11.070586623838983]),
            {
              "class": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99115888830026, 11.048555699552173]),
            {
              "class": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([77.9891847824653, 11.04821874004789]),
            {
              "class": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([77.98774711843332, 11.052388586676571]),
            {
              "class": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([77.98684589620431, 11.052430706037125]),
            {
              "class": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99581068875146, 11.055643957953945]),
            {
              "class": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([77.9961969268496, 11.056086206029176]),
            {
              "class": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99510258557153, 11.05855983544083]),
            {
              "class": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99703377606225, 11.057843820454073]),
            {
              "class": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99748438717675, 11.056685557214397]),
            {
              "class": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99465197445703, 11.057949116885316]),
            {
              "class": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99336451412988, 11.059612795479744]),
            {
              "class": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99295681835962, 11.058833605414783]),
            {
              "class": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99273193107453, 11.053177009048033]),
            {
              "class": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99133718238679, 11.05361926084343]),
            {
              "class": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99099385963288, 11.05389303543022]),
            {
              "class": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99238860832062, 11.055935806971332]),
            {
              "class": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([77.9929250501236, 11.055851569250938]),
            {
              "class": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99941412234222, 11.051915894328634]),
            {
              "class": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99896351122771, 11.052126491410288]),
            {
              "class": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00281580591336, 11.044217237402309]),
            {
              "class": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.00905998850003, 11.044785864094065]),
            {
              "class": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0117207398428, 11.044132996317268]),
            {
              "class": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99891050958767, 11.045775693114997]),
            {
              "class": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([77.9993825783743, 11.045544031302907]),
            {
              "class": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99833029599338, 11.04825672438208]),
            {
              "class": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([77.99768656582981, 11.048741103485106]),
            {
              "class": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([78.07431842112068, 11.045842713580873]),
            {
              "class": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0738892676783, 11.045863773731732]),
            {
              "class": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([78.06215192102913, 11.040156417572753]),
            {
              "class": 2,
              "system:index": "49"
            })]),
    wasteland = ui.import && ui.import("wasteland", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.01013035430154,
            11.072418715260826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15471000686411,
            11.51596750737192
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15594587740006,
            11.517014466395542
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14998064455094,
            11.51596318284509
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15154705461563,
            11.51417599178998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1504956286818,
            11.515080101625522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17510757860245,
            11.514344198491075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17551527437271,
            11.5152483077859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.18112249620053,
            11.514580187905864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14599400159562,
            11.494482710638861
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14837580320085,
            11.49571280587302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.10556103788744,
            11.519583746140624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1075887879027,
            11.519972716503577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.10725619398485,
            11.520340660946163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.07745158854239,
            11.524314804824153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.07616412821524,
            11.524714281167787
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.07564914408438,
            11.525744507012028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.09714881441862,
            11.527605211464142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.0994164713648,
            11.533423184584375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1000816592005,
            11.533086793920413
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.11880355350519,
            11.541488673835369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.11824565403009,
            11.541993244575954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.12300087161543,
            11.540103921582496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14816932817537,
            11.5384711271997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14814787050325,
            11.537819381641954
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15035801073152,
            11.537525044442377
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15098028322298,
            11.536831248393545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15072279115755,
            11.536158474829698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.14911346574861,
            11.537861429788123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15111727061101,
            11.538744439402512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.15165371241399,
            11.538933655387005
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1515464240534,
            11.539732565915031
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.16511071795716,
            11.548600007974597
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.16584027880921,
            11.548789217311464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.16575444812074,
            11.549840377969
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.1648103105475,
            11.55005060962759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.16654838198914,
            11.549609122962469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.12177897871173,
            11.547241816122176
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.12225104749835,
            11.546316786379482
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17265230070933,
            11.52620733975045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17308145415171,
            11.525955040308562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17316728484019,
            11.525450440745118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17995626244588,
            11.518751851998662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.18004209313436,
            11.519151336248786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.17989188942953,
            11.519719023417181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.18270284447713,
            11.519382616344648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02244474263726,
            10.890637619478897
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02139331670342,
            10.890532263406097
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.02025606008111,
            10.891817604947562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            78.50500104394288,
            10.842176962508418
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 3
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([78.01013035430154, 11.072418715260826]),
            {
              "class": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15471000686411, 11.51596750737192]),
            {
              "class": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15594587740006, 11.517014466395542]),
            {
              "class": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14998064455094, 11.51596318284509]),
            {
              "class": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15154705461563, 11.51417599178998]),
            {
              "class": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1504956286818, 11.515080101625522]),
            {
              "class": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17510757860245, 11.514344198491075]),
            {
              "class": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17551527437271, 11.5152483077859]),
            {
              "class": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([78.18112249620053, 11.514580187905864]),
            {
              "class": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14599400159562, 11.494482710638861]),
            {
              "class": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14837580320085, 11.49571280587302]),
            {
              "class": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([78.10556103788744, 11.519583746140624]),
            {
              "class": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1075887879027, 11.519972716503577]),
            {
              "class": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([78.10725619398485, 11.520340660946163]),
            {
              "class": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([78.07745158854239, 11.524314804824153]),
            {
              "class": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([78.07616412821524, 11.524714281167787]),
            {
              "class": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([78.07564914408438, 11.525744507012028]),
            {
              "class": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([78.09714881441862, 11.527605211464142]),
            {
              "class": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([78.0994164713648, 11.533423184584375]),
            {
              "class": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1000816592005, 11.533086793920413]),
            {
              "class": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([78.11880355350519, 11.541488673835369]),
            {
              "class": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([78.11824565403009, 11.541993244575954]),
            {
              "class": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([78.12300087161543, 11.540103921582496]),
            {
              "class": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14816932817537, 11.5384711271997]),
            {
              "class": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14814787050325, 11.537819381641954]),
            {
              "class": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15035801073152, 11.537525044442377]),
            {
              "class": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15098028322298, 11.536831248393545]),
            {
              "class": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15072279115755, 11.536158474829698]),
            {
              "class": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([78.14911346574861, 11.537861429788123]),
            {
              "class": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15111727061101, 11.538744439402512]),
            {
              "class": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([78.15165371241399, 11.538933655387005]),
            {
              "class": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1515464240534, 11.539732565915031]),
            {
              "class": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([78.16511071795716, 11.548600007974597]),
            {
              "class": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([78.16584027880921, 11.548789217311464]),
            {
              "class": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([78.16575444812074, 11.549840377969]),
            {
              "class": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([78.1648103105475, 11.55005060962759]),
            {
              "class": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([78.16654838198914, 11.549609122962469]),
            {
              "class": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([78.12177897871173, 11.547241816122176]),
            {
              "class": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([78.12225104749835, 11.546316786379482]),
            {
              "class": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17265230070933, 11.52620733975045]),
            {
              "class": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17308145415171, 11.525955040308562]),
            {
              "class": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17316728484019, 11.525450440745118]),
            {
              "class": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17995626244588, 11.518751851998662]),
            {
              "class": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([78.18004209313436, 11.519151336248786]),
            {
              "class": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([78.17989188942953, 11.519719023417181]),
            {
              "class": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([78.18270284447713, 11.519382616344648]),
            {
              "class": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02244474263726, 10.890637619478897]),
            {
              "class": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02139331670342, 10.890532263406097]),
            {
              "class": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([78.02025606008111, 10.891817604947562]),
            {
              "class": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([78.50500104394288, 10.842176962508418]),
            {
              "class": 3,
              "system:index": "49"
            })]);
var now = ee.Date(Date.now());
var present_year = now.get('year');
var start_date = now.advance(-6, 'month');
ui.root.clear();
var title = ui.Label('Tamil Nadu Landuse/Landcover Classification', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
present_year.evaluate(function(value){title.setValue('Tamil Nadu Landuse/Landcover Classification - '+ JSON.stringify(value))});
var map_properties = function (map) {
  var styledMapType = {
  Grey: [
    {stylers: [{ saturation: -80 }]},
    { featureType: 'road', elementType: 'geometry',
      stylers: [{ lightness: 100 },{ visibility: 'simplified' }]},
    { featureType: 'road', elementType: 'labels'},
    { featureType: 'water', stylers: [{ visibility: 'simplified' }]},
    { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: 'simplified' }]}
  ]
  };
  map.setOptions("Grey", styledMapType);
  map.setControlVisibility({all: false, zoomControl: true, scaleControl: true,});
  return map;
};
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
var state_map = ui.Map();
map_properties(state_map);
state_map.addLayer(districts, {color: 'black'}, 'boundary');
state_map.centerObject(districts);
ui.root.widgets().reset([title, state_map]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
var calNDVI = function (image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var calNDWI = function (image) {
  var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return image.addBands(ndwi);
};
var newfc = vegetation.merge(waterbody).merge(builtup).merge(wasteland);
var bands = ['B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8', 'B11', 'B12', 'NDVI', 'NDWI'];
train_image = calNDVI(train_image);
train_image = calNDWI(train_image);
var training = train_image.select(bands).sampleRegions({
  collection: newfc, 
  properties: ['class'], 
  scale: 30,
  tileScale: 16,
});
var classifier = ee.Classifier.smileRandomForest(10).train({
  features: training, 
  classProperty: 'class', 
  inputProperties: bands,
});
var calculation = function (district) {
  var district_label = ui.Label(district, {fontWeight: 'bold',fontSize: '22px',position: 'top-center'});
  district = districts.filter(ee.Filter.eq('dist_name', district));
  var S2_collection = S2.filterDate(start_date, now)
                    .filterBounds(district)
                    .select(['B4', 'B3', 'B2', 'B5', 'B6', 'B7', 'B8', 'B11', 'B12', 'QA60'])
                    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
                    .sort('CLOUDY_PIXEL_PERCENTAGE', false).map(maskS2clouds);
  ui.root.remove(state_map);
  var image = S2_collection.median();
  image = calNDVI(image);
  image = calNDWI(image);
  var classified = image.select(bands).classify(classifier);
  classified = classified.clipToCollection(district);
  var classified_map = ui.Map();
  map_properties(classified_map);
  var classification_palette = ['#00FF00', '#0000FF', '#FF0000', '#FFC0CB'];
  classified_map.addLayer(classified, 
          {min: 0, max: 3, palette: classification_palette}, 
          'classification');
  classified_map.centerObject(district);
  classified_map.add(district_label);
  var callout = ui.Map();
  map_properties(callout);
  callout.setControlVisibility({zoomControl: false, scaleControl: false});
  callout.style().set({
    border: '1.5px solid black',
    position: 'bottom-left',
    height: '100px',
    width: '100px',
  });
  var rgbViz = {min: 0,max: 2500, bands: ['B4', 'B3', 'B2']};
  callout.addLayer(image, rgbViz, 'RGB');
  classified_map.add(callout);
  var callout_label = ui.Label('Sentinel-2', {position: 'top-left'});
  callout.add(callout_label);
  var panel_left = ui.Panel();
  panel_left.style().set({
    width: '30%',
    height: '100%',
    border: '1px solid black',
    position: 'middle-left',
    stretch: 'vertical',
  });
  var panel_right = ui.Panel();
  panel_right.style().set({
    width: '20%',
    height: '100%',
    border: '1px solid black',
    position: 'middle-right',
    stretch: 'vertical',
  });
  var ndvi_map = ui.Map();
  map_properties(ndvi_map);
  ndvi_map.style().set({border: '1px solid black', margin: '4px'});
  var ndviViz = {min: 0, max: 0.6, palette: ['#FF0000', '#FF8C00', '#FFFF00', '#32CD32', '#006400']};
  ndvi_map.addLayer(image.select('NDVI').clipToCollection(district), ndviViz, 'NDVI');
  panel_left.add(ndvi_map);
  var ndvi_label = ui.Label('NDVI', {fontWeight: 'bold',fontSize: '18px',position: 'top-center'});
  ndvi_map.add(ndvi_label);
  var ndwi_map = ui.Map();
  map_properties(ndwi_map);
  ndwi_map.style().set({border: '1px solid black', margin: '4px'});
  var ndwiViz = {min: -0.4, max: 0.1, palette: ['#ff0000', '#FF8C00', '#FFFF00', '#0000FF']};
  ndwi_map.addLayer(image.select('NDWI').clipToCollection(district), ndwiViz, 'NDWI');
  panel_left.add(ndwi_map);
  var ndwi_label = ui.Label('NDWI', {fontWeight: 'bold',fontSize: '18px',position: 'top-center'});
  ndwi_map.add(ndwi_label);
  var linker = ui.Map.Linker([classified_map, ndvi_map, ndwi_map, callout]);
  var legend = ui.Panel({
  style: {
    border: '1px solid black',
    margin: '4px',
    height: '124px',
    stretch: 'horizontal',
    }
  });
  var legendTitle = ui.Label('Legend',{fontWeight: 'bold',fontSize: '18px',});
  legend.add(legendTitle);
  var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 0 4px 4px'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
  };
  var names = ['Vegetation','Waterbody','Built-up', 'Wasteland'];
  for (var i = 0; i < 4; i++) {
  legend.add(makeRow(classification_palette[i], names[i]));
  }
  panel_right.add(legend);
  var statistics_panel = ui.Panel();
  statistics_panel.style().set({
    border: '1px solid black',
    margin: '2px',
    stretch: 'both',
  });
  panel_right.add(statistics_panel);
  var statistics_title = ui.Label('Area in Hectares', {fontWeight: 'bold', fontSize: '18px',});
  var veg_label = ui.Label('Vegetation  : Computing...');
  var water_label = ui.Label('Waterbody : Computing...');
  var built_label = ui.Label('Built-up  : Computing...');
  var waste_label = ui.Label('Wasteland : Computing...');
  statistics_panel.add(statistics_title);
  statistics_panel.add(veg_label);
  statistics_panel.add(water_label);
  statistics_panel.add(built_label);
  statistics_panel.add(waste_label);
  var Lmap = ui.Map();
  map_properties(Lmap);
  Lmap.setControlVisibility({zoomControl: false});
  Lmap.style().set({border: '1px solid black', margin: '2px'});
  Lmap.addLayer(districts, {color: 'black'}, 'boundary');
  Lmap.centerObject(districts);
  Lmap.addLayer(district, {color: 'red'}, 'district');
  panel_right.add(Lmap);
  var state_label = ui.Label('Tamil Nadu', {position: 'top-left'});
  Lmap.add(state_label);
  var info_panel = ui.Panel({
  style: {
    border: '1px solid black',
    margin: '4px',
    height: '125px',
    stretch: 'horizontal',
    }
  });
  panel_right.add(info_panel);
  var infoTitle = ui.Label('Balakumaran Ramachandran',{fontWeight: 'bold',fontSize: '18px',textAlign: 'center'});
  info_panel.add(infoTitle);
  var infoDesc = ui.Label('App displays the current Landuse/Landcover Classification generated by Random Forest Classifier');
  info_panel.add(infoDesc);
  var mapGrid = ui.Panel();
  mapGrid.style().set({
    width: '100%',
    height: '100%',
    border: '1px solid black',
    stretch: 'horizontal',
  });
  mapGrid.setLayout(ui.Panel.Layout.Flow('horizontal'));
  mapGrid.add(panel_left);
  mapGrid.add(classified_map);
  mapGrid.add(panel_right);
  ui.root.widgets().reset([title, mapGrid]);
  ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
  var area_classified = ee.Image.pixelArea().divide(1e4).addBands(classified).reduceRegion({
  reducer: ee.Reducer.sum().group(1, 'group'),
  geometry: district.geometry(),
  scale: 50,
  tileScale: 16,
  maxPixels: 10e10
  });
  var outputReducers = ee.List(area_classified.get('groups'));
  var area_values = ee.List([ee.Dictionary(outputReducers.get(0)).get('sum'),
                              ee.Dictionary(outputReducers.get(1)).get('sum'),
                              ee.Dictionary(outputReducers.get(2)).get('sum'),
                              ee.Dictionary(outputReducers.get(3)).get('sum')]);
  area_values.evaluate(function (value) {
    var dataTable = {
      cols: [{id: 'area', label: 'Area (Ha)', type: 'string'},
              {id: 'class', label: 'class', type: 'number'}],
      rows: [{c: [{v: 'Vegetation'}, {v: value[0]}]},
              {c: [{v: 'Waterbody'}, {v: value[1]}]},
              {c: [{v: 'Built-up'}, {v: value[2]}]},
              {c: [{v: 'Wasteland'}, {v: value[3]}]},]
    };
    var options = {
      title: 'Area Statistics (log scale)',
      vAxis: {title: 'Area (Ha)', logScale: true},
      legend: {position: 'none'},
      hAxis: {
        title: 'Class',
      }
    };
    var chart = new ui.Chart(dataTable, 'ColumnChart', options);
    statistics_panel.clear();
    statistics_panel.add(chart);
  });
};
var places = {
  dists: ['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore',
          'Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram',
          'Kanniyakumari','Karur','Krishnagiri','Madurai','Nagapattinam',
          'Namakkal','Perambalur','Pudukkottai','Ramanathapuram','Ranipet',
          'Salem','Sivagangai','Tenkasi','Thanjavur','Nilgiris','Theni',
          'Thoothukudi','Tiruchirapalli','Tirunelveli','Tirupathur','Tiruppur',
          'Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore','Villupuram',
          'Virudhunagar'],
};
var select = ui.Select({
  items: places.dists,
  onChange: function(key) {
    calculation(key);
  }
});
select.setPlaceholder('Select a District');
select.style().set('position', 'top-center');
state_map.add(select);