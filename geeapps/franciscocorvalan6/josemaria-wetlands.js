/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var tpi = ee.Image("users/fabiananavar/TPI_RN"),
    AOI = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-69.79618095900156, -28.19360361468798],
          [-69.79618095900156, -29.956633997738745],
          [-69.08069633986094, -29.956633997738745],
          [-69.08069633986094, -28.19360361468798]]], null, false),
    Wetlands = 
    /* color: #248f16 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49301883857783, -28.5141350655088],
                  [-69.49329778831537, -28.51379567778951],
                  [-69.49354283214234, -28.51470862582147],
                  [-69.49313513637208, -28.51508571995556],
                  [-69.49319950938843, -28.514614352077274]]]),
            {
              "id": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49240557552002, -28.519045126952793],
                  [-69.49284402703948, -28.518584460950926],
                  [-69.49224321222015, -28.519376327969724],
                  [-69.49226466989226, -28.519150080856882]]]),
            {
              "id": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49415294503875, -28.521379536435816],
                  [-69.49436215734191, -28.52158686570549],
                  [-69.49487177705474, -28.522044062345255],
                  [-69.49540285443969, -28.522378710175374],
                  [-69.49526874398894, -28.52246826363989],
                  [-69.49492542123504, -28.522147756152673],
                  [-69.49431387757964, -28.521638712846777],
                  [-69.49413685178466, -28.521445464281467]]]),
            {
              "id": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49284939145751, -28.519277285365956],
                  [-69.49302529848282, -28.518895492722816],
                  [-69.49323987520401, -28.519145307818494],
                  [-69.4934008077449, -28.519824047731323],
                  [-69.49334179914658, -28.520168129490454],
                  [-69.49304675615494, -28.519795766988853],
                  [-69.49288582361405, -28.519399835797824]]]),
            {
              "id": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49288582361405, -28.519399835797824],
                  [-69.49239111549437, -28.51946606337724],
                  [-69.49241793758452, -28.519187968136023],
                  [-69.49288464195311, -28.518980574597308]]]),
            {
              "id": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50412013729019, -28.52656553167896],
                  [-69.50501867731018, -28.52732906003122],
                  [-69.50514205892486, -28.527439818314324],
                  [-69.50493016441268, -28.527505801917044],
                  [-69.50422474344177, -28.527178240054305],
                  [-69.5031143089096, -28.52654903563501],
                  [-69.5032028218071, -28.526497190908636],
                  [-69.50363465745849, -28.52649012117124]]]),
            {
              "id": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50885252693347, -28.52930427582746],
                  [-69.50961963871173, -28.529455092762255],
                  [-69.51045648792437, -28.530001802341722],
                  [-69.5097591135805, -28.52971430886468],
                  [-69.50871305206469, -28.5293608322033]]]),
            {
              "id": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52485485966174, -28.52762264111846],
                  [-69.52505870754688, -28.52738698546604],
                  [-69.52552004749744, -28.52765091976133],
                  [-69.52526255543201, -28.527754608053666],
                  [-69.52498360569446, -28.527811165261042]]]),
            {
              "id": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53075571949451, -28.527104197987704],
                  [-69.53157111103503, -28.526821409750703],
                  [-69.53193188468101, -28.52711600986678],
                  [-69.53141690055016, -28.5274176497829],
                  [-69.5307946280587, -28.5272196986853]]]),
            {
              "id": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5344965467561, -28.525343793878257],
                  [-69.53592348195203, -28.52468394245882],
                  [-69.53636336423047, -28.52449541272321],
                  [-69.53758645154126, -28.524372868214257],
                  [-69.53689914281996, -28.524750510493238],
                  [-69.5371029907051, -28.524948466227745],
                  [-69.53774672086867, -28.52470337812069],
                  [-69.53848701055678, -28.52449599543121],
                  [-69.53858357008131, -28.52470337812069],
                  [-69.53833680685194, -28.52487305456319],
                  [-69.53757505949172, -28.52529724447457],
                  [-69.53662019308241, -28.525146421590524],
                  [-69.5360944801155, -28.52512756871484],
                  [-69.53557949598463, -28.525627168781075],
                  [-69.53494649465712, -28.525825122869342],
                  [-69.53464608724745, -28.525674300740576],
                  [-69.53448515470656, -28.52540093508217]]]),
            {
              "id": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5344207816902, -28.52626816162463],
                  [-69.53471046026381, -28.526070208368353],
                  [-69.5348177486244, -28.526635788114323],
                  [-69.53443151052626, -28.52707882346238],
                  [-69.53421693380507, -28.526946855681093],
                  [-69.53450661237868, -28.526484967145457]]]),
            {
              "id": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5406071240187, -28.53024950649262],
                  [-69.54113283698562, -28.530541711487118],
                  [-69.54047837798599, -28.531031859981184],
                  [-69.54034963195328, -28.530287210408396],
                  [-69.53972735946182, -28.529184365299034],
                  [-69.53993120734695, -28.52894871313829],
                  [-69.54008141105179, -28.529316330278895],
                  [-69.54051056449417, -28.530145820654663]]]),
            {
              "id": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.48171553465309, -28.48953081500081],
                  [-69.48197302671852, -28.489709977628568],
                  [-69.48055682035866, -28.490304041008216],
                  [-69.48043421285546, -28.489806971209248],
                  [-69.48106721418297, -28.48978811201692]]]),
            {
              "id": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4843655571598, -28.48823894915833],
                  [-69.48523459288063, -28.48748456763321],
                  [-69.48565301748695, -28.487758031558887],
                  [-69.48550281378212, -28.487993775753903],
                  [-69.48529896589699, -28.487965486478295],
                  [-69.4849234566349, -28.487956056718073]]]),
            {
              "id": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41173841242332, -28.447153010430426],
                  [-69.4131760764553, -28.446511537109792],
                  [-69.41388417963523, -28.44753034586035],
                  [-69.41315461878318, -28.448624610993704],
                  [-69.41191007380027, -28.448851009262793],
                  [-69.41107322458762, -28.448700077137254],
                  [-69.4107084441616, -28.449096273507372],
                  [-69.41027929071922, -28.448737810188835],
                  [-69.40989305262107, -28.448624610993704],
                  [-69.4092493224575, -28.448624610993704],
                  [-69.40875579599876, -28.448360479067148],
                  [-69.40759708170432, -28.448190679623142],
                  [-69.40676023249168, -28.44771901307045],
                  [-69.40804769281883, -28.447379411849926],
                  [-69.40972139124412, -28.447511479120834]]]),
            {
              "id": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41948463205833, -28.451303626110445],
                  [-69.42036439661521, -28.45060557941424],
                  [-69.4207935500576, -28.450869705733112],
                  [-69.42141582254905, -28.45122816182491],
                  [-69.42205955271262, -28.45175641069268],
                  [-69.42160894159812, -28.452114863778565],
                  [-69.42014981989402, -28.451454554519948]]]),
            {
              "id": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4873090078577, -28.395439087110642],
                  [-69.4875235845789, -28.395835482852537],
                  [-69.48733046552982, -28.396231877111838],
                  [-69.48690131208744, -28.396005366288062],
                  [-69.48655798933353, -28.39619412534149],
                  [-69.48604300520267, -28.396911406678562],
                  [-69.48623612425175, -28.39732667260222],
                  [-69.48709443113651, -28.397477677989208],
                  [-69.48683693907108, -28.398062821831484],
                  [-69.48625758192387, -28.398704588782227],
                  [-69.48576898252901, -28.39793069285919],
                  [-69.48581189787325, -28.39613749766076],
                  [-69.48539431796549, -28.39560536678634],
                  [-69.48565181003092, -28.394982457173867],
                  [-69.48629554019449, -28.395378854623562]]]),
            {
              "id": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49370339414921, -28.393815736700237],
                  [-69.4944758703455, -28.39340045702016],
                  [-69.49484065077152, -28.39345708616326],
                  [-69.4952698042139, -28.3932683222353],
                  [-69.49580624601688, -28.39307955797117],
                  [-69.4964928915247, -28.39379686038644],
                  [-69.49617102644291, -28.394325395902044],
                  [-69.49494793913212, -28.395420211085955],
                  [-69.49462607405033, -28.395042689886207],
                  [-69.49385359785404, -28.395231450654165],
                  [-69.49338152906742, -28.39568447512567],
                  [-69.4943685819849, -28.397081288389455],
                  [-69.49348881742802, -28.396817027832626],
                  [-69.49276160447045, -28.396550701227614],
                  [-69.49278306214256, -28.39726798015138],
                  [-69.49379157273216, -28.39824951186431],
                  [-69.49471425263329, -28.399495289023683],
                  [-69.49447821823998, -28.399816168647337],
                  [-69.49398469178124, -28.39972179238831],
                  [-69.4903583451931, -28.39807963202609],
                  [-69.4893498346035, -28.39807963202609],
                  [-69.48831986634178, -28.39841939143024],
                  [-69.48759030548973, -28.398004129788344],
                  [-69.4895644113247, -28.39740010994993],
                  [-69.49042271820946, -28.39666395611727],
                  [-69.49155997483177, -28.39613543226344],
                  [-69.4919247552578, -28.395418145674647],
                  [-69.49299763886376, -28.395304889453715],
                  [-69.49353408066673, -28.394757482679754],
                  [-69.49370574204369, -28.39404018676544]]]),
            {
              "id": 1,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49662398545189, -28.401590426673007],
                  [-69.49761103836937, -28.401043052365868],
                  [-69.49763249604149, -28.401741425984262],
                  [-69.49716042725487, -28.401571551743967],
                  [-69.49677418915672, -28.40170367617662]]]),
            {
              "id": 1,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4611192841133, -28.272056660382372],
                  [-69.46136604734266, -28.271650353608734],
                  [-69.46219216771925, -28.271599536773778],
                  [-69.46214925237501, -28.27257278110619],
                  [-69.4616235394081, -28.272402700213505],
                  [-69.46113001294935, -28.272213721125375]]]),
            {
              "id": 1,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46014296003187, -28.2723649044227],
                  [-69.4604004520973, -28.272138129396254],
                  [-69.46071158834303, -28.272374353371656],
                  [-69.46025024839247, -28.272771208471134],
                  [-69.4601107735237, -28.272516087505466]]]),
            {
              "id": 1,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46543227620924, -28.270692427254925],
                  [-69.46608673520888, -28.270371157448245],
                  [-69.46646224447096, -28.27070187635222],
                  [-69.46714888997877, -28.270276666144273],
                  [-69.46752439924086, -28.270579038022003],
                  [-69.4676209587654, -28.27108928861978],
                  [-69.46710597463453, -28.27152394460889],
                  [-69.46646224447096, -28.271164881093107],
                  [-69.46601163335646, -28.270758570918403],
                  [-69.46552883573378, -28.27077746910042],
                  [-69.46537863202894, -28.270758570918403]]]),
            {
              "id": 1,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45972453542555, -28.269709716560513],
                  [-69.46035753675307, -28.269482935882284],
                  [-69.46084842441745, -28.270482222859577],
                  [-69.46053728817172, -28.2703877316541],
                  [-69.46039781330295, -28.26996252019238],
                  [-69.4600115752048, -28.26983023183596],
                  [-69.45982918499179, -28.27000031683547]]]),
            {
              "id": 1,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35981981599245, -28.26167664312992],
                  [-69.36022751176272, -28.261459295272456],
                  [-69.36056010568056, -28.261648293434515],
                  [-69.36073176705752, -28.261969589540847],
                  [-69.3612682088605, -28.262158586797995],
                  [-69.36128966653261, -28.26246098171233],
                  [-69.36064593636904, -28.26299017074785],
                  [-69.3602060540906, -28.263009070307675],
                  [-69.35992710435305, -28.262857873735314],
                  [-69.35978762948427, -28.262253085300888]]]),
            {
              "id": 1,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35730926835451, -28.264530473878114],
                  [-69.3576311334363, -28.26419028614518],
                  [-69.3580817445508, -28.264010742181647],
                  [-69.35836069428835, -28.264010742181647],
                  [-69.35825340592775, -28.264322581503702],
                  [-69.35777060830507, -28.264728916220825],
                  [-69.35703031861696, -28.26494625741029],
                  [-69.3570732339612, -28.26518249733086],
                  [-69.35736291253481, -28.26517304774409],
                  [-69.35755603158388, -28.265513232339813],
                  [-69.35754530274782, -28.265806168204808],
                  [-69.3571805223218, -28.265919562517016],
                  [-69.35647241914187, -28.266288093198295],
                  [-69.35590379083071, -28.266146350779408],
                  [-69.35629002892885, -28.265787269141047],
                  [-69.35660116517458, -28.265560480114434],
                  [-69.35647241914187, -28.265447085420142],
                  [-69.3560647233716, -28.265447085420142],
                  [-69.35598962151919, -28.26527699315244],
                  [-69.35644023263369, -28.26516359815648],
                  [-69.35661189401064, -28.265002955038987],
                  [-69.35691230142031, -28.264795063586288],
                  [-69.35657970750246, -28.264728916220825],
                  [-69.35670845353518, -28.264615520641676]]]),
            {
              "id": 1,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34066457815182, -28.226515143549218],
                  [-69.34130830831539, -28.226609673637387],
                  [-69.3421022421838, -28.226373348259983],
                  [-69.34228463239681, -28.22686490445729],
                  [-69.34245629377376, -28.227065383892363],
                  [-69.34231681890499, -28.22754748398145],
                  [-69.34088988370907, -28.227434048862282],
                  [-69.33987064428341, -28.227103195742753],
                  [-69.33928055830013, -28.226810153551856],
                  [-69.3404821879388, -28.22658328162571]]]),
            {
              "id": 1,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34347553319942, -28.22460758488482],
                  [-69.34384031362545, -28.224541412590742],
                  [-69.34348993634046, -28.22517974178939],
                  [-69.34333973263563, -28.225047397869588],
                  [-69.34339337681592, -28.22498122584816],
                  [-69.34339337681592, -28.224763803203214]]]),
            {
              "id": 1,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33784656857313, -28.226370829683756],
                  [-69.33842592572034, -28.226474812916724],
                  [-69.33903746937574, -28.22675840303725],
                  [-69.33898382519544, -28.22703253943754],
                  [-69.33845811222852, -28.227060898335306],
                  [-69.33802895878614, -28.226597702061476]]]),
            {
              "id": 1,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35775668941886, -28.226419336364636],
                  [-69.35795517288597, -28.226532772562216],
                  [-69.35836823307426, -28.226906165861074],
                  [-69.35818047844322, -28.22722284016681],
                  [-69.35782106243522, -28.227572598755838],
                  [-69.35762257896812, -28.227336275510446],
                  [-69.35732217155845, -28.226764371091296],
                  [-69.35770304523857, -28.226490234002252]]]),
            {
              "id": 1,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33178343369086, -28.218485659634755],
                  [-69.33243789269049, -28.219071788915663],
                  [-69.33273830010016, -28.21948774967915],
                  [-69.33221258713324, -28.220395294810853],
                  [-69.33196582390387, -28.220631633422823],
                  [-69.33146156860907, -28.219531319695797],
                  [-69.33101095749457, -28.218576498650716],
                  [-69.33008603848766, -28.218595406081015],
                  [-69.33010749615978, -28.218321248014036],
                  [-69.33061175145458, -28.21817944184112],
                  [-69.33105163373303, -28.218292886794522],
                  [-69.33133058347057, -28.218122719319197]]]),
            {
              "id": 1,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32645120216925, -28.215857492011242],
                  [-69.3267301519068, -28.216131656404038],
                  [-69.32744898392279, -28.215952031536546],
                  [-69.32856478287299, -28.215507695039864],
                  [-69.32924069954474, -28.215904761784362],
                  [-69.32867207123358, -28.216197833910623],
                  [-69.32760991646369, -28.216679983077885],
                  [-69.32693399979193, -28.216916329913754],
                  [-69.32646193100531, -28.216727252486905],
                  [-69.32605423523505, -28.217029776209152],
                  [-69.32547487808783, -28.21703923006167],
                  [-69.32535686089118, -28.216802883497827],
                  [-69.32536758972724, -28.21638691227491]]]),
            {
              "id": 1,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32114341019975, -28.18522672924898],
                  [-69.32118632554399, -28.185084879147173],
                  [-69.3215296482979, -28.185283469237007],
                  [-69.32199098824846, -28.185179445902623],
                  [-69.32245232819902, -28.18486737529223],
                  [-69.322988770002, -28.185472602312988],
                  [-69.32249524354326, -28.185453689020445],
                  [-69.32189442872392, -28.185935976935195],
                  [-69.32159402131425, -28.185869780683547]]]),
            {
              "id": 1,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31998469590532, -28.18467824114569],
                  [-69.32027437447893, -28.18473498142477],
                  [-69.32047822236406, -28.18497139893022],
                  [-69.3200705265938, -28.185103792504957]]]),
            {
              "id": 1,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30266690345212, -28.164681009611307],
                  [-69.30292439551755, -28.164926929905555],
                  [-69.30329990477964, -28.16549443612002],
                  [-69.3041045674841, -28.16558902019649],
                  [-69.30469465346738, -28.166686189374047],
                  [-69.30416894050046, -28.166676731067138],
                  [-69.30265617461606, -28.165541728168698],
                  [-69.30166912169858, -28.165220141825472],
                  [-69.30176859568721, -28.1649740295676],
                  [-69.30263763140803, -28.164756484816508]]]),
            {
              "id": 1,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35610710411287, -28.149549862877105],
                  [-69.35748039512849, -28.150022852870524],
                  [-69.35612856178498, -28.150022852870524],
                  [-69.35454069404817, -28.150022852870524],
                  [-69.35338197975373, -28.14990933546264],
                  [-69.35301719932771, -28.149493103937505],
                  [-69.3523305538199, -28.149398505637972],
                  [-69.35151516227937, -28.149133629954694],
                  [-69.35067831306672, -28.14858495681227],
                  [-69.34973417549348, -28.14720380162966],
                  [-69.34861837654329, -28.146806479716314],
                  [-69.34730945854402, -28.14519825691373],
                  [-69.34715925483918, -28.144763086592267],
                  [-69.34587179451204, -28.14408194688732],
                  [-69.34488474159456, -28.14347648573534],
                  [-69.34406935005403, -28.142454762280536],
                  [-69.34464870720124, -28.142530445833636],
                  [-69.34585033683992, -28.143495406448142],
                  [-69.34711633949495, -28.144384676179868],
                  [-69.34823213844514, -28.145084734391634],
                  [-69.34904752998567, -28.14608751250708],
                  [-69.35014187126374, -28.146541597621827],
                  [-69.35095726280427, -28.14799844103407],
                  [-69.3522232654593, -28.14820655990371],
                  [-69.35273824959016, -28.147847081602123],
                  [-69.35235201149202, -28.1486038766226],
                  [-69.3538969638846, -28.148963352383756],
                  [-69.35537754326081, -28.149587702153465]]]),
            {
              "id": 1,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52628557632687, -28.22221964644094],
                  [-69.52446167419674, -28.223599832955347],
                  [-69.52383940170529, -28.223732178669824],
                  [-69.52310984085324, -28.223675459097997],
                  [-69.52420418213131, -28.222973517418996],
                  [-69.5246333355737, -28.22257647696165],
                  [-69.52371065567257, -28.22242522306568],
                  [-69.52426855514767, -28.221971460091925],
                  [-69.52613537262204, -28.221858019047144]]]),
            {
              "id": 1,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.573404532637, -28.241949865818402],
                  [-69.57366202470243, -28.242479156665148],
                  [-69.57406972047269, -28.242970638671128],
                  [-69.57428429719388, -28.243688954452402],
                  [-69.57428429719388, -28.244067013446863],
                  [-69.5735118209976, -28.243159669608893],
                  [-69.57318995591581, -28.242214511570072],
                  [-69.57308266755521, -28.24168521941014],
                  [-69.57258914109647, -28.241193731481427],
                  [-69.57299683686674, -28.24121263490517]]]),
            {
              "id": 1,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62503124177341, -28.27919711373776],
                  [-69.62496686875706, -28.279461667022332],
                  [-69.62517071664219, -28.279934081967415],
                  [-69.62548185288792, -28.280472632448646],
                  [-69.62579298913364, -28.281360762381023],
                  [-69.62568570077305, -28.281559173375015],
                  [-69.62541747987156, -28.281474140137146],
                  [-69.62539602219944, -28.280878905570894],
                  [-69.62532092034702, -28.280576562929777],
                  [-69.62512780129795, -28.280406494816944],
                  [-69.62514925897007, -28.279971875072494],
                  [-69.62482739388828, -28.27979235770392],
                  [-69.62462354600315, -28.27964118494833],
                  [-69.6250097841013, -28.27911207861387]]]),
            {
              "id": 1,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64445043504124, -28.271675966913882],
                  [-69.64397836625461, -28.272091722563864],
                  [-69.64361358582859, -28.27146808848045],
                  [-69.64436460435276, -28.27144919042093]]]),
            {
              "id": 1,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73778613397245, -28.278303703055688],
                  [-69.73772176095609, -28.28002330208378],
                  [-69.73729260751371, -28.281903491222398],
                  [-69.73609097787504, -28.28152556642297],
                  [-69.73582275697355, -28.280098888217196],
                  [-69.73575838395719, -28.278983987309164],
                  [-69.73659523316984, -28.277831280878726],
                  [-69.73726042100553, -28.277434444630707],
                  [-69.73770030328397, -28.277944662392304]]]),
            {
              "id": 1,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74723399715467, -28.231815938315794],
                  [-69.74759877758069, -28.231929368777614],
                  [-69.74691213207288, -28.233006952151324],
                  [-69.74644006328626, -28.233082571628586],
                  [-69.74611819820447, -28.23295023750821],
                  [-69.74652589397473, -28.232042799118837],
                  [-69.74706233577771, -28.231815938315794]]]),
            {
              "id": 1,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75077991455431, -28.2289377622358],
                  [-69.75087647407885, -28.229287515205005],
                  [-69.75015764206286, -28.229750699805557],
                  [-69.7495890137517, -28.230261145812467],
                  [-69.74887018173571, -28.230960641930718],
                  [-69.74833373993273, -28.23063925239168],
                  [-69.7487950798833, -28.230242240448334],
                  [-69.74923496216174, -28.229750699805557],
                  [-69.75018982857104, -28.229164629157257]]]),
            {
              "id": 1,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74589167697269, -28.234636343777996],
                  [-69.74622427089054, -28.234163728047843],
                  [-69.74649785621006, -28.234366953068363],
                  [-69.7466319666608, -28.234541820799443],
                  [-69.7459667788251, -28.235298002283365],
                  [-69.7456234560712, -28.23536416790824],
                  [-69.74554835421878, -28.235108957414802]]]),
            {
              "id": 1,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34060620149747, -28.730860854092867],
                  [-69.3412070163168, -28.73022110943322],
                  [-69.34275196870938, -28.73063506230718],
                  [-69.34300946077481, -28.731613489855672],
                  [-69.34294660134007, -28.73467644296926],
                  [-69.34204537911107, -28.73411198319851],
                  [-69.3414016489475, -28.73256911093617],
                  [-69.33998544258763, -28.732079902779894],
                  [-69.34067208809545, -28.731515428984913],
                  [-69.3411870722263, -28.731327270375786]]]),
            {
              "id": 1,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3281021447276, -28.746190353984087],
                  [-69.32856348467816, -28.746538397631348],
                  [-69.32928231669415, -28.746566617335706],
                  [-69.32932523203839, -28.746867627041123],
                  [-69.32958272410382, -28.7474602373636],
                  [-69.32904628230084, -28.747450830876808],
                  [-69.32818797541607, -28.746726528849717],
                  [-69.3275442452525, -28.746651276403032],
                  [-69.32713654948223, -28.74630323313189],
                  [-69.32712582064617, -28.74604925487779],
                  [-69.32800558520306, -28.7460774747143]]]),
            {
              "id": 1,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32411701368629, -28.785021850002526],
                  [-69.32499677824318, -28.78677081222763],
                  [-69.32564050840675, -28.787767519513704],
                  [-69.32476074384986, -28.787823936622356],
                  [-69.32358057188331, -28.786375887837536],
                  [-69.32250768827735, -28.78534155496574],
                  [-69.32186395811378, -28.784814981562867],
                  [-69.3213275163108, -28.78443885607583],
                  [-69.32164938139259, -28.78396869730937],
                  [-69.32274372267067, -28.78447646868558]]]),
            {
              "id": 1,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40993955872675, -28.826312092207903],
                  [-69.40946748994013, -28.826650469197638],
                  [-69.40903833649774, -28.826086506937063],
                  [-69.40826586030146, -28.82638728718956],
                  [-69.40710714600702, -28.826725663934877],
                  [-69.40659216187616, -28.826236897171935],
                  [-69.40526178620478, -28.824620190762115],
                  [-69.40594843171259, -28.82446979819189],
                  [-69.40783670685907, -28.82401861917774],
                  [-69.40822294495722, -28.823417044117555],
                  [-69.40886667512079, -28.82401861917774],
                  [-69.40895250580927, -28.824770583115114],
                  [-69.4097678973498, -28.826011311738167]]]),
            {
              "id": 1,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41509542481526, -28.835726319967296],
                  [-69.41540656106099, -28.835951884347004],
                  [-69.41521344201192, -28.83613985428995],
                  [-69.41489157693013, -28.83597068135657],
                  [-69.41416201607808, -28.83521879832538],
                  [-69.41329298035726, -28.834231943603033],
                  [-69.41329298035726, -28.83375261079002],
                  [-69.41311059014424, -28.832953717862498],
                  [-69.41338953988179, -28.832784539749866],
                  [-69.41368994729146, -28.833104098176186],
                  [-69.41393671052083, -28.83438232206982],
                  [-69.41406545655354, -28.83484285477267],
                  [-69.41446242348775, -28.835322182564287]]]),
            {
              "id": 1,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4189426233611, -28.83961098943767],
                  [-69.41936104796743, -28.8398553417047],
                  [-69.41961854003286, -28.840203072787606],
                  [-69.4200584223113, -28.840644783568603],
                  [-69.42047684691762, -28.84086093922487],
                  [-69.42078798316335, -28.84123686103572],
                  [-69.4204553892455, -28.84143421944271],
                  [-69.42001550696706, -28.840907929525503],
                  [-69.41913574241018, -28.840193674665517],
                  [-69.41828816436147, -28.839620387612403],
                  [-69.41781609557485, -28.839141079619004],
                  [-69.41821306250905, -28.838953115097336],
                  [-69.41879241965627, -28.83934784020067]]]),
            {
              "id": 1,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42177703774588, -28.843794846663034],
                  [-69.4215088168444, -28.843230977301374],
                  [-69.42207744515555, -28.84344712758457],
                  [-69.42261388695853, -28.844048586878685]]]),
            {
              "id": 1,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42913783544337, -28.852472725344377],
                  [-69.4290520047549, -28.852764032345505],
                  [-69.42862285131251, -28.852134432319023],
                  [-69.42853702062403, -28.852923780999685],
                  [-69.42840827459132, -28.852886193103124],
                  [-69.42823661321437, -28.85233177005088],
                  [-69.42818296903407, -28.851899505959537],
                  [-69.42746413701808, -28.851157135175413],
                  [-69.42702425473964, -28.85058390853926],
                  [-69.42697061055934, -28.850057664911365],
                  [-69.42716372960841, -28.85009525383023],
                  [-69.42757142537867, -28.850480539465355],
                  [-69.42800057882106, -28.85106316381222],
                  [-69.42821515554225, -28.850959795214663]]]),
            {
              "id": 1,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49638550452896, -28.85343654767864],
                  [-69.49745838813492, -28.853267402871186],
                  [-69.49835961036392, -28.85332378450424],
                  [-69.49919645957657, -28.853737248879252],
                  [-69.4972223537416, -28.854827283442397],
                  [-69.49694340400406, -28.853925186688073]]]),
            {
              "id": 1,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50305884055801, -28.854902457818664],
                  [-69.50380985908218, -28.854827283442397],
                  [-69.50526898078628, -28.854977632140596],
                  [-69.50565521888443, -28.85572937237084],
                  [-69.50559084586807, -28.856067653701356],
                  [-69.50475399665542, -28.855654198592372],
                  [-69.5042819278688, -28.855428676930902]]]),
            {
              "id": 1,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50220053367325, -28.852214940109832],
                  [-69.50220053367325, -28.85253443885975],
                  [-69.50144951514908, -28.85257202688344],
                  [-69.5004624622316, -28.852515644842804],
                  [-69.50026934318252, -28.852365292585016],
                  [-69.50164263419815, -28.851820263828277]]]),
            {
              "id": 1,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34643575012429, -29.0650433929986],
                  [-69.34660741150124, -29.065512278963155],
                  [-69.34630700409157, -29.06575609882188],
                  [-69.34604951202614, -29.065212192191527],
                  [-69.34626408874733, -29.065024637515652]]]),
            {
              "id": 1,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34025594055397, -29.063880546603574],
                  [-69.34165068924172, -29.06343040899375],
                  [-69.3416292315696, -29.063805523805087],
                  [-69.34223004638893, -29.064161881611646],
                  [-69.3416292315696, -29.064143125968332],
                  [-69.34094258606179, -29.064368193462943]]]),
            {
              "id": 1,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55531626894481, -29.191903783435063],
                  [-69.55607801630504, -29.192362725099937],
                  [-69.55618530466563, -29.192643708779023],
                  [-69.55525189592845, -29.192428288027237],
                  [-69.55447941973216, -29.192091106811667],
                  [-69.55431848719127, -29.191828853988632],
                  [-69.55480128481395, -29.191650896333922]]]),
            {
              "id": 1,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55225855066783, -29.189964966390075],
                  [-69.55254822924144, -29.18988066916537],
                  [-69.5530632133723, -29.190217857648463],
                  [-69.55276280596263, -29.190723638294514],
                  [-69.55228000833995, -29.190442649354647],
                  [-69.55157190516002, -29.190358352522573],
                  [-69.55131441309459, -29.190152293308024],
                  [-69.5518937702418, -29.190199124984044],
                  [-69.5521619911433, -29.190086728925667]]]),
            {
              "id": 1,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54784899904735, -29.189712074508115],
                  [-69.54733401491649, -29.189702708130138],
                  [-69.54705506517894, -29.18972144088524],
                  [-69.54670101358897, -29.18961841068988],
                  [-69.54667955591685, -29.18937488436217],
                  [-69.54753786280162, -29.189318685896737]]]),
            {
              "id": 1,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44605991714158, -29.21595562796887],
                  [-69.44655344360032, -29.215534248007035],
                  [-69.44676802032151, -29.215702800199725],
                  [-69.44702551238694, -29.216011811832836],
                  [-69.44676802032151, -29.216442553766292],
                  [-69.44646761291185, -29.216508101293055],
                  [-69.44614574783006, -29.216274002790623]]]),
            {
              "id": 1,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44453642242112, -29.215852624138233],
                  [-69.4451265084044, -29.21634891436959],
                  [-69.44463475186332, -29.217079299394065],
                  [-69.44422705609306, -29.216480009501005],
                  [-69.44384081799491, -29.21666728796918],
                  [-69.44375498730643, -29.216480009501005],
                  [-69.44332583386405, -29.216189727198785],
                  [-69.44257481533988, -29.216161635319438],
                  [-69.44094403225883, -29.215637252157734],
                  [-69.44032175976737, -29.215412515695395],
                  [-69.44036467511161, -29.21523459897975],
                  [-69.44115860898002, -29.215421879724495],
                  [-69.44173796612723, -29.21568407219201],
                  [-69.44245679814323, -29.215824532166458],
                  [-69.4434438510607, -29.215833896157907],
                  [-69.4435511394213, -29.215983719904692],
                  [-69.44399102169974, -29.216021175807164]]]),
            {
              "id": 1,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11397060343867, -30.149241646448385],
                  [-69.11345561930781, -30.151431098005084],
                  [-69.11173900553828, -30.152136165279934],
                  [-69.11058029124385, -30.15399158139346],
                  [-69.10933574626094, -30.155846962602375],
                  [-69.10744747111445, -30.156811747036283],
                  [-69.10517295786983, -30.158852606082974],
                  [-69.10259803721553, -30.15644067721715],
                  [-69.10628875682002, -30.154214228981516],
                  [-69.10980781504756, -30.15295255267005],
                  [-69.11079486796504, -30.15120844413436],
                  [-69.11143859812861, -30.15031782362549],
                  [-69.11246856639033, -30.149724072152104],
                  [-69.11379894206172, -30.148981877784543]]]),
            {
              "id": 1,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11834796855098, -30.15456675330133],
                  [-69.11712488124019, -30.155958284364914],
                  [-69.11603053996211, -30.156756086652436],
                  [-69.1153438944543, -30.156978727999366],
                  [-69.11527952143794, -30.156644765790464],
                  [-69.11555847117549, -30.15575419437093],
                  [-69.1171463389123, -30.154121459214227],
                  [-69.11834796855098, -30.154121459214227]]]),
            {
              "id": 1,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54527165700533, -29.90262566920239],
                  [-69.54587247182467, -29.902969788884114],
                  [-69.54523947049715, -29.903416212646],
                  [-69.54484250356295, -29.90337901074225],
                  [-69.54514291097261, -29.902867483156953]]]),
            {
              "id": 1,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54353358556368, -29.904188149014118],
                  [-69.54398419667818, -29.904160247803805],
                  [-69.54379107762911, -29.904346255725013],
                  [-69.54353358556368, -29.904615966593877],
                  [-69.54345848371126, -29.90420674981667]]]),
            {
              "id": 1,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16974750592291, -30.045528249668518],
                  [-69.17021957470953, -30.046605556572526],
                  [-69.17011228634894, -30.047701425712024],
                  [-69.16910377575934, -30.04980025987643],
                  [-69.1677784365817, -30.04970739204854],
                  [-69.1666626376315, -30.049837406983194],
                  [-69.1657614154025, -30.04920590427322],
                  [-69.16681284133634, -30.0477942954208],
                  [-69.16743511382779, -30.046605556572526],
                  [-69.16694158736905, -30.04584401325073],
                  [-69.16707033340177, -30.04545395220877],
                  [-69.16771406356534, -30.04578829033878],
                  [-69.16840070907315, -30.046122627340328],
                  [-69.16915172759732, -30.045639695753646]]]),
            {
              "id": 1,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.17191473080695, -30.04394941665917],
                  [-69.17200056149542, -30.04472954905586],
                  [-69.17146411969244, -30.04534250591467],
                  [-69.17165723874152, -30.04599260752937],
                  [-69.17236534192145, -30.047088483450253],
                  [-69.17174306943, -30.047348520024556],
                  [-69.17129245831549, -30.046661279024747],
                  [-69.17056289746344, -30.04519391066082],
                  [-69.17174306943, -30.043930842003423]]]),
            {
              "id": 1,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7248501247477, -29.665439408563348],
                  [-69.72478038731332, -29.66557924761352],
                  [-69.72469992104287, -29.665001244947256],
                  [-69.724903768928, -29.664437223014822]]]),
            {
              "id": 1,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74684466002795, -29.602777871615203],
                  [-69.74654425261828, -29.603580111822744],
                  [-69.74609364150378, -29.603430858313867],
                  [-69.74675446691269, -29.60231144995607]]]),
            {
              "id": 1,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73442537662703, -29.610843895303592],
                  [-69.73500473377425, -29.61121700122953],
                  [-69.73453266498763, -29.611478174556076],
                  [-69.73408205387312, -29.611347587977374],
                  [-69.7338245618077, -29.611105069596725],
                  [-69.73320228931624, -29.611384898445685],
                  [-69.73300917026717, -29.611142380154806],
                  [-69.73343832370955, -29.610974482534733],
                  [-69.7342751729222, -29.610993137839667]]]),
            {
              "id": 1,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52449338281106, -28.666857411264026],
                  [-69.52505128228616, -28.66770464408959],
                  [-69.52376382195901, -28.668580110813355],
                  [-69.5225192769761, -28.66905078882445],
                  [-69.52214376771401, -28.669295540554707],
                  [-69.52048079812478, -28.66948381072741],
                  [-69.51931135499429, -28.66926729999961],
                  [-69.51806681001138, -28.669399089191547],
                  [-69.5166291459794, -28.669399089191547],
                  [-69.5165218576188, -28.667958812601572],
                  [-69.51844231927346, -28.66800588077688],
                  [-69.51921810478508, -28.668504802135406],
                  [-69.52007641166985, -28.668260048558228],
                  [-69.5198511061126, -28.6681659124148],
                  [-69.51991547912895, -28.667657575778975],
                  [-69.52034463257134, -28.667968226238315],
                  [-69.5206986841613, -28.667459888643542],
                  [-69.52135314316094, -28.667158650386746],
                  [-69.5218681272918, -28.667375165471334],
                  [-69.52254404396355, -28.66701744465579],
                  [-69.52334870666802, -28.66697978976208],
                  [-69.52436794609368, -28.666838583790117]]]),
            {
              "id": 1,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31112788379713, -28.710053596554214],
                  [-69.31211493671461, -28.710731103789968],
                  [-69.31237242878004, -28.711822633995624],
                  [-69.31269429386182, -28.712462491234483],
                  [-69.31327365100904, -28.713196440306206],
                  [-69.31353114307447, -28.71396802223884],
                  [-69.31299470127149, -28.71396802223884],
                  [-69.31172869861646, -28.713177621163563],
                  [-69.31129003764624, -28.711745214124942],
                  [-69.3105604767942, -28.711858130476266],
                  [-69.30987383128638, -28.711726394721214],
                  [-69.31073213817115, -28.711293547500766],
                  [-69.31073213817115, -28.7106160439078],
                  [-69.31073213817115, -28.71010791333345],
                  [-69.31098963023658, -28.710051454228378]]]),
            {
              "id": 1,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30416982752524, -28.68464414010682],
                  [-69.30429857355796, -28.684926503863316],
                  [-69.30471699816428, -28.684747673572605],
                  [-69.3047921000167, -28.68503944915274],
                  [-69.30413764101706, -28.685237103116084],
                  [-69.3037835894271, -28.685340635995615],
                  [-69.30339735132895, -28.685208866858442],
                  [-69.3028301971086, -28.684743794028044],
                  [-69.30368850399337, -28.684960272770113],
                  [-69.3041069285997, -28.684461429778896]]]),
            {
              "id": 1,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53131984907532, -28.70291320221239],
                  [-69.53189920622253, -28.703044949065223],
                  [-69.53213524061584, -28.703477830413824],
                  [-69.53189920622253, -28.703835426698898],
                  [-69.53202795225525, -28.704381229198887],
                  [-69.5316417141571, -28.704588256988607],
                  [-69.53136276441955, -28.70519051732046],
                  [-69.53086923796081, -28.70537872296325],
                  [-69.5307404919281, -28.704983490722395],
                  [-69.53142713743591, -28.7038918891585],
                  [-69.53134130674744, -28.703308442273304],
                  [-69.53116964537048, -28.702800276206503]]]),
            {
              "id": 1,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49162534033297, -28.67470948571013],
                  [-69.48980143820285, -28.67470948571013],
                  [-69.4890718773508, -28.674615355360984],
                  [-69.48838523184298, -28.674897746154702],
                  [-69.48784879004, -28.67440826829513],
                  [-69.48741963659762, -28.67367404721776],
                  [-69.48613217627047, -28.673109258272213],
                  [-69.48621800695895, -28.67248798691553],
                  [-69.48658278738498, -28.67243150751861],
                  [-69.48711922918795, -28.67307160556759],
                  [-69.48810628210543, -28.673278695275574],
                  [-69.4893079117441, -28.673692873463512],
                  [-69.49050954138278, -28.674389442177933],
                  [-69.49183991705416, -28.67440826829513]]]),
            {
              "id": 1,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37216808381805, -28.582550867326216],
                  [-69.37276889863739, -28.583229198670296],
                  [-69.37476446214447, -28.584020579708273],
                  [-69.37538673463592, -28.585641008012818],
                  [-69.37403490129242, -28.585791744260025],
                  [-69.37163164201507, -28.58554679774858],
                  [-69.37079479280243, -28.58468005935715],
                  [-69.37032272401581, -28.584265529774942],
                  [-69.37120248857269, -28.58334225346891]]]),
            {
              "id": 1,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37061669528445, -28.581414715737417],
                  [-69.36995150744876, -28.58146182273104],
                  [-69.36960818469485, -28.58042546399721],
                  [-69.36966182887515, -28.57989785926442],
                  [-69.3704450339075, -28.579624634344743]]]),
            {
              "id": 1,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.89442932339013, -28.72158673188214],
                  [-69.89476191730797, -28.722075989146965],
                  [-69.89480483265221, -28.722442930593168],
                  [-69.89444005222619, -28.72239588688999],
                  [-69.89302384586632, -28.721511461330493],
                  [-69.89251959057152, -28.72113510775954],
                  [-69.89235865803063, -28.720834023927452],
                  [-69.89270198078454, -28.720645846092136],
                  [-69.89336716862023, -28.721116290045437],
                  [-69.8937748643905, -28.72162436713763],
                  [-69.89418256016076, -28.72144559955337]]]),
            {
              "id": 1,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87341707110993, -28.704714182485837],
                  [-69.87311666370026, -28.704638899791213],
                  [-69.87256949306122, -28.70428130625204],
                  [-69.87235491634003, -28.70394253229815],
                  [-69.8719364917337, -28.7033967275098],
                  [-69.87163608432404, -28.702982666805724],
                  [-69.87176483035675, -28.702681530719108],
                  [-69.87227981448761, -28.70302030875562]]]),
            {
              "id": 1,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87417881847016, -28.704798875452546],
                  [-69.87391059756867, -28.70434717883793],
                  [-69.87352435947052, -28.703951942700563],
                  [-69.87336342692963, -28.70366021983204],
                  [-69.87368529201142, -28.7038013761603],
                  [-69.87450068355194, -28.704168381722603]]]),
            {
              "id": 1,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87268751025788, -28.702841509373027],
                  [-69.87236564517609, -28.70245567808544],
                  [-69.87218325496308, -28.702107487653464],
                  [-69.87172191501251, -28.70164636881179],
                  [-69.87180774570099, -28.701429924573148],
                  [-69.8727626121103, -28.7019004549555]]]),
            {
              "id": 1,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5924571693933, -28.812457379624693],
                  [-69.59091221700072, -28.812269366920916],
                  [-69.5904401482141, -28.811442106992935],
                  [-69.58855187306762, -28.810802856185312],
                  [-69.58743607411742, -28.81005079138948],
                  [-69.58559071431517, -28.809637153437556],
                  [-69.58722149739623, -28.809148306467872],
                  [-69.58928143391967, -28.808283417748534],
                  [-69.59061180959105, -28.809524342801993],
                  [-69.59172760854125, -28.809599549905926]]]),
            {
              "id": 1,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84770738714707, -29.422475622542173],
                  [-69.84603368872177, -29.42217658071335],
                  [-69.8448320590831, -29.421765396761444],
                  [-69.84333002203476, -29.421204688690498],
                  [-69.84268629187119, -29.420606596670574],
                  [-69.84204256170761, -29.419971120041566],
                  [-69.84208547705185, -29.419559927163597],
                  [-69.84350168341172, -29.41989635782389],
                  [-69.84607660406601, -29.421167308042403],
                  [-69.84744989508164, -29.421354211145335]]]),
            {
              "id": 1,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62204469783468, -29.748432570369474],
                  [-69.62174429042501, -29.74869338746505],
                  [-69.62112201793356, -29.748190382458876],
                  [-69.62125076396627, -29.747743264779142],
                  [-69.62167991740866, -29.747389295201845]]]),
            {
              "id": 1,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6234179888503, -29.751972173067152],
                  [-69.62313903911276, -29.752214351841364],
                  [-69.62232364757223, -29.75152507225446],
                  [-69.62223781688375, -29.751059340120666],
                  [-69.62253822429342, -29.75076127041946]]]),
            {
              "id": 1,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64226855380697, -29.736378354377706],
                  [-69.6420754347579, -29.736629886823295],
                  [-69.64148534877462, -29.73657399077879],
                  [-69.64142097575827, -29.73633177422597],
                  [-69.6421827231185, -29.736350406289247]]]),
            {
              "id": 1,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7547619662758, -29.827175984146876],
                  [-69.75473782639466, -29.827583190083992],
                  [-69.75449526200713, -29.827520364133377],
                  [-69.75430482516707, -29.826857198912464],
                  [-69.75447648654402, -29.8267966994101]]]),
            {
              "id": 1,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71054163485675, -29.834197884397625],
                  [-69.7103699734798, -29.83446778497897],
                  [-69.71013393908649, -29.834253725957037],
                  [-69.7099193623653, -29.833806992607787],
                  [-69.7100266507259, -29.833639467086822],
                  [-69.71030560046344, -29.833527783250116],
                  [-69.71056309252887, -29.83400243869387]]]),
            {
              "id": 1,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75552656772867, -29.87049445702411],
                  [-69.756127382548, -29.870159528805168],
                  [-69.75666382435098, -29.870094403743124],
                  [-69.75630977276101, -29.870466546382143],
                  [-69.75661018017068, -29.870903812209082],
                  [-69.75682475689187, -29.871127096147422],
                  [-69.75614884022012, -29.871480628027697],
                  [-69.75499012592569, -29.87131316571428],
                  [-69.75549438122049, -29.870587492440922]]]),
            {
              "id": 1,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75226635012648, -29.89769296007485],
                  [-69.7525774863722, -29.897348822168343],
                  [-69.75287789378187, -29.897758067112655]]]),
            {
              "id": 1,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45227027957183, -28.712260253192152],
                  [-69.45175529544098, -28.712429626839437],
                  [-69.4505536658023, -28.710434764253456],
                  [-69.45014597003204, -28.70898564210524],
                  [-69.45072532717926, -28.70896682220504],
                  [-69.45085407321197, -28.709776074856414],
                  [-69.4511115652774, -28.710754697606934]]]),
            {
              "id": 1,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26453816318347, -28.367959136627853],
                  [-69.26320778751209, -28.368298992553054],
                  [-69.26363694095447, -28.366826275682207],
                  [-69.26593291187122, -28.366826275682207]]]),
            {
              "id": 1,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.2869080697974, -28.411023478357638],
                  [-69.2835392152747, -28.406267313397837],
                  [-69.28832427615727, -28.408211327261178]]]),
            {
              "id": 1,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28740159625615, -28.411098971317752],
                  [-69.28911821002568, -28.411665166803473],
                  [-69.28999797458256, -28.412948532032086],
                  [-69.28933278674687, -28.413137260901156]]]),
            {
              "id": 1,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27955960020203, -28.165822838465125],
                  [-69.27876566633363, -28.16538775197178],
                  [-69.27741383299012, -28.16542558565013],
                  [-69.27734945997376, -28.164763494347998],
                  [-69.2779502747931, -28.16468782650979],
                  [-69.27883003934998, -28.164649992570613],
                  [-69.27979563459535, -28.1653310014292]]]),
            {
              "id": 1,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3368623135962, -28.13300667954838],
                  [-69.33578942999024, -28.13214569944437],
                  [-69.33407281622071, -28.130187180476106],
                  [-69.33459852918763, -28.130054718963766],
                  [-69.33710907682557, -28.132902605397877]]]),
            {
              "id": 1,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23256198057939, -28.092727077847282],
                  [-69.23063079008867, -28.093597839219445],
                  [-69.22985831389238, -28.093597839219445],
                  [-69.22996560225297, -28.09325710734989],
                  [-69.23138180861284, -28.0928595854683]]]),
            {
              "id": 1,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24470702299882, -28.089963310180824],
                  [-69.24442807326128, -28.09037977287567],
                  [-69.24320498595048, -28.09028512240509],
                  [-69.24226084837724, -28.090039030790972],
                  [-69.24290457854082, -28.089887589517268],
                  [-69.24402037749101, -28.089811868800304]]]),
            {
              "id": 1,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.22150743545907, -28.07632614045217],
                  [-69.22200096191781, -28.076856250920542],
                  [-69.22161472381967, -28.07708344032037],
                  [-69.2217649275245, -28.07778393794471],
                  [-69.22217262329477, -28.078465498815774],
                  [-69.22150743545907, -28.079412103961623],
                  [-69.2212070280494, -28.078995598725324],
                  [-69.22140014709848, -28.078408702241706],
                  [-69.22161472381967, -28.078086854421358],
                  [-69.22135723175424, -28.077140237595234]]]),
            {
              "id": 1,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.21564949097055, -28.082062553983206],
                  [-69.21584261001962, -28.082384389889132],
                  [-69.21530616821664, -28.0822518693388],
                  [-69.21487701477426, -28.082043622429293],
                  [-69.2148126417579, -28.081721785502065]]]),
            {
              "id": 1,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.19551608836949, -28.065718297518462],
                  [-69.1955375460416, -28.066456737863106],
                  [-69.19497964656651, -28.066930094389356],
                  [-69.19528005397618, -28.065961446230478],
                  [-69.1951942232877, -28.065431282001956],
                  [-69.19543025768101, -28.06546915096216]]]),
            {
              "id": 1,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39919176507382, -28.089884901840115],
                  [-69.3998354952374, -28.08973346034898],
                  [-69.40026464867978, -28.090136149051414],
                  [-69.39974966454892, -28.090382240442878],
                  [-69.39921322274594, -28.090249729763734]]]),
            {
              "id": 1,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39189615655332, -28.083131772936106],
                  [-69.39189615655332, -28.083472536942867],
                  [-69.39150991845517, -28.083510399543528],
                  [-69.39090910363583, -28.08307497882984],
                  [-69.39125242638974, -28.08282887068894]]]),
            {
              "id": 1,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75564621158577, -28.822047428547048],
                  [-69.75470207401253, -28.822912202978294],
                  [-69.75392959781624, -28.821445842098075],
                  [-69.75341461368538, -28.820017060352264],
                  [-69.75508831211067, -28.819302662127836]]]),
            {
              "id": 1,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75126884647347, -28.817497844783592],
                  [-69.7504105395887, -28.81561779345702],
                  [-69.75088260837532, -28.81520417761078],
                  [-69.75259922214485, -28.81633221695898]]]),
            {
              "id": 1,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30529371497747, -28.896425575364795],
                  [-69.306109106518, -28.895260832014333],
                  [-69.30640951392766, -28.896012280833094],
                  [-69.30550829169866, -28.89672615217251]]]),
            {
              "id": 1,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35539531382547, -28.418408781276504],
                  [-69.35586738261209, -28.41850314088759],
                  [-69.3567686048411, -28.419125912211786],
                  [-69.35492324503885, -28.419692064782435],
                  [-69.35492324503885, -28.419182527605077]]]),
            {
              "id": 1,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35267018946634, -28.415502464076056],
                  [-69.35211228999124, -28.41520050446802],
                  [-69.35258435877786, -28.414539964823717],
                  [-69.35322808894144, -28.41459658266895]]]),
            {
              "id": 1,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42431640249333, -28.40464857156875],
                  [-69.424616809903, -28.404893938258034],
                  [-69.42390870672307, -28.405573412277953],
                  [-69.42356538396916, -28.405063807171558]]]),
            {
              "id": 1,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4432440295316, -28.130711602434786],
                  [-69.44298653746617, -28.130948139284968],
                  [-69.44343714858067, -28.131279289998087],
                  [-69.4427934184171, -28.13163882389947],
                  [-69.44264321471226, -28.13198889522334],
                  [-69.44260029936802, -28.131052215333636],
                  [-69.44260029936802, -28.13064537202317],
                  [-69.44222479010594, -28.130229065641565],
                  [-69.44206385756505, -28.129822219206172],
                  [-69.44237499381077, -28.129509987173385],
                  [-69.44275050307286, -28.129718141962986]]]),
            {
              "id": 1,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32039821572197, -28.240020964109316],
                  [-69.31955063767326, -28.23984137944233],
                  [-69.3195935530175, -28.239642890774448],
                  [-69.3201514524926, -28.239718505548623],
                  [-69.32074153847587, -28.23974686107512]]]),
            {
              "id": 1,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43191757391682, -28.241350084666806],
                  [-69.43128315970053, -28.241509518726662],
                  [-69.43101493879904, -28.2412637746406],
                  [-69.43173377081503, -28.24106528861932]]]),
            {
              "id": 1,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43247547339192, -28.242559895259898],
                  [-69.43186392973652, -28.24282453949806],
                  [-69.4312845725893, -28.242304701979844],
                  [-69.43212142180195, -28.24208731463008]]]),
            {
              "id": 1,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4380527579368, -28.251768448523773],
                  [-69.43783818121561, -28.25170229307423],
                  [-69.4381064021171, -28.251182498828225],
                  [-69.438449724871, -28.2512392037782]]]),
            {
              "id": 1,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44360096655805, -28.25132138608675],
                  [-69.44327910147626, -28.251226877892876],
                  [-69.44315968390116, -28.250889522772955],
                  [-69.44336353178629, -28.250539840620952],
                  [-69.44358883734354, -28.250672152921435],
                  [-69.44358883734354, -28.250880071919063],
                  [-69.44378195639261, -28.250927326180157],
                  [-69.44402871962198, -28.25087062106432]]]),
            {
              "id": 1,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44062907896955, -28.250707081329274],
                  [-69.44022138319929, -28.250858295136396],
                  [-69.43993170462568, -28.250669277843983],
                  [-69.43980295859296, -28.250508612881994],
                  [-69.44007117949445, -28.25020618406151],
                  [-69.44027502737958, -28.250470809326334],
                  [-69.44052179060895, -28.250499161994327],
                  [-69.44067199431379, -28.25023453679987],
                  [-69.44118697844465, -28.250064420256635]]]),
            {
              "id": 1,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43907739126419, -28.29222777544853],
                  [-69.437961592314, -28.293030783320496],
                  [-69.43759681188797, -28.2927284751856],
                  [-69.43832637274002, -28.291821545629368],
                  [-69.43918467962479, -28.29159481203293]]]),
            {
              "id": 1,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44367738553711, -28.353701924955526],
                  [-69.44314094373414, -28.353701924955526],
                  [-69.44305511304566, -28.353380905797774],
                  [-69.44361301252076, -28.35313541990456]]]),
            {
              "id": 1,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43837734052369, -28.352814399033953],
                  [-69.437712152688, -28.353154303454964],
                  [-69.4369396764917, -28.353116536350814],
                  [-69.43629594632813, -28.352908817037832],
                  [-69.43633886167237, -28.35271998094611],
                  [-69.43713279554078, -28.352587795482087],
                  [-69.43779798337647, -28.352833282641456],
                  [-69.4383987981958, -28.352682213687476]]]),
            {
              "id": 1,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.25808128085549, -28.281937135521307],
                  [-69.25782378879006, -28.28184265447704],
                  [-69.25780233111794, -28.2814647294617],
                  [-69.2583173152488, -28.281445833175734]]]),
            {
              "id": 1,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.25808128085549, -28.283108693505913],
                  [-69.25795253482278, -28.28348661268688],
                  [-69.25745900836404, -28.283845634666438],
                  [-69.25715860095437, -28.283883426383348],
                  [-69.25720151629861, -28.282938629436895],
                  [-69.25765212741311, -28.28250402002657]]]),
            {
              "id": 1,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4536501217479, -28.309713184225977],
                  [-69.45328534132187, -28.309939879218636],
                  [-69.45298488230604, -28.309494027100214],
                  [-69.4525986442079, -28.30928622250436],
                  [-69.45274884791273, -28.308965069148602],
                  [-69.45354278178114, -28.309248439806947]]]),
            {
              "id": 1,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50008847279926, -28.58984039723949],
                  [-69.50004555745502, -28.590141857477096],
                  [-69.49964859052082, -28.589972286199814]]]),
            {
              "id": 1,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49993826909443, -28.58979329399928],
                  [-69.499680777029, -28.589680246136673],
                  [-69.49972369237324, -28.5895295154641]]]),
            {
              "id": 1,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50146176381489, -28.590170119330047],
                  [-69.50201966328999, -28.589991127466348],
                  [-69.50205184979816, -28.590160698713248],
                  [-69.50156905217548, -28.590424475664786],
                  [-69.50135447545429, -28.590330269686632]]]),
            {
              "id": 1,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31993263963062, -28.453103338441963],
                  [-69.32051199677784, -28.45221664477765],
                  [-69.32059782746632, -28.453424055595715],
                  [-69.3190055133843, -28.45465031809487],
                  [-69.31838324089284, -28.454329604660852],
                  [-69.31930592079397, -28.453442921280356]]]),
            {
              "id": 1,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3120576739629, -28.45814037197551],
                  [-69.31029814484913, -28.459913652504365],
                  [-69.30971878770191, -28.459649548779034],
                  [-69.3100406527837, -28.458857233643773],
                  [-69.31068438294727, -28.458593127278945]]]),
            {
              "id": 1,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.323898957151, -28.461004106072032],
                  [-69.32353417672498, -28.46119274923995],
                  [-69.32276170052869, -28.4611550206333],
                  [-69.3225471238075, -28.460249530033497],
                  [-69.3223325470863, -28.45930630241013],
                  [-69.32284753121716, -28.4589290090041],
                  [-69.32396333016736, -28.459891104528115]]]),
            {
              "id": 1,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74314658074654, -28.09991387324647],
                  [-69.74269596963204, -28.100538508768725],
                  [-69.74200932412423, -28.098683519916793],
                  [-69.74226681618966, -28.098475304880743],
                  [-69.74280325799263, -28.098872805962607]]]),
            {
              "id": 1,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80591359615055, -28.2221258289224],
                  [-69.805634646413, -28.221577530215374],
                  [-69.8041755247089, -28.222655218105434],
                  [-69.80346742152896, -28.223184604663274],
                  [-69.8016006040546, -28.223808521164756],
                  [-69.8017078924152, -28.223184604663274],
                  [-69.80419698238101, -28.221331740225704],
                  [-69.80567756175724, -28.219875895608016],
                  [-69.80623546123233, -28.219308678045355],
                  [-69.80606379985538, -28.22068890219277],
                  [-69.80645003795352, -28.220896879626995],
                  [-69.80748000621524, -28.2193843072278],
                  [-69.8086601781818, -28.219119604854814],
                  [-69.80885329723087, -28.220254038975675],
                  [-69.80908933162418, -28.221142670617827],
                  [-69.80737271785465, -28.2218044127805]]]),
            {
              "id": 1,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.79857603142375, -28.244350929361385],
                  [-69.7982970816862, -28.245050333106658],
                  [-69.79851165840739, -28.245919855691746],
                  [-69.79952016899699, -28.24745095431597],
                  [-69.79827562401408, -28.24741314967634],
                  [-69.79756752083415, -28.24607107628724],
                  [-69.79685941765422, -28.245390581918997],
                  [-69.7981897933256, -28.243405781878533]]]),
            {
              "id": 1,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90172142176363, -28.509946256222147],
                  [-69.9018072524521, -28.509380586951927],
                  [-69.90245098261568, -28.509710561061546]]]),
            {
              "id": 1,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.83006714189357, -28.548096278331087],
                  [-69.82899425828761, -28.54792663928209],
                  [-69.8296594461233, -28.546852252292997],
                  [-69.83088253343409, -28.54636217739494]]]),
            {
              "id": 1,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82532499635523, -28.55024501596666],
                  [-69.82650516832179, -28.548341312030566],
                  [-69.8275351365835, -28.548624042513836]]]),
            {
              "id": 1,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82284374032673, -28.541359568335004],
                  [-69.82315487657246, -28.54183081662139],
                  [-69.82299394403157, -28.541953340830535],
                  [-69.82256479058918, -28.541368993321395],
                  [-69.82178143279556, -28.54098256818806],
                  [-69.82164195792679, -28.540577291525363],
                  [-69.82251099364761, -28.540454765715758]]]),
            {
              "id": 1,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7873134413863, -28.52646923070338],
                  [-69.78656242286213, -28.525752828047313],
                  [-69.78656242286213, -28.525488888999337],
                  [-69.78709886466511, -28.525451183367103],
                  [-69.78817174827107, -28.52620529344917]]]),
            {
              "id": 1,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50058053702072, -29.060311230751207],
                  [-69.5002157565947, -29.06198053168707],
                  [-69.49970077246384, -29.06136158056019],
                  [-69.49899266928391, -29.05967351314688],
                  [-69.49989389151291, -29.058923252092182],
                  [-69.50043033331589, -29.059448435403663]]]),
            {
              "id": 1,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58937239249484, -28.958843452614904],
                  [-69.58954405387179, -28.95833653256685],
                  [-69.59053110678927, -28.958374082285147],
                  [-69.59102463324801, -28.95871202913705],
                  [-69.5906813104941, -28.959669539227328],
                  [-69.58990883429782, -28.95948179284871]]]),
            {
              "id": 1,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53062300726249, -28.875767768107785],
                  [-69.53054790541007, -28.875936876304678],
                  [-69.52970032736137, -28.875711398647642],
                  [-69.52997927709892, -28.875598659635624],
                  [-69.53026895567253, -28.875673818990553]]]),
            {
              "id": 1,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58879531740466, -29.006512718843705],
                  [-69.58903135179797, -29.006831742396415],
                  [-69.58870948671618, -29.00711323294856],
                  [-69.58858074068347, -29.006775444193988]]]),
            {
              "id": 1,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59098809495522, -29.01024207117849],
                  [-69.59068768754555, -29.010227997095278],
                  [-69.59041410222603, -29.009965280523375],
                  [-69.59051066175057, -29.00987614439186],
                  [-69.59107929006173, -29.010073182053397]]]),
            {
              "id": 1,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61524549844566, -29.007413458887985],
                  [-69.61484853151146, -29.00788260674112],
                  [-69.61437646272483, -29.007694947855477],
                  [-69.61481634500328, -29.007385309949065],
                  [-69.61536351564231, -29.007235182145312]]]),
            {
              "id": 1,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67586245739966, -28.946012522759872],
                  [-69.67498269284278, -28.946294178828804],
                  [-69.67496123517066, -28.946068854034927],
                  [-69.67442479336768, -28.945918637233405],
                  [-69.67448916638403, -28.945561871456793],
                  [-69.67491831982642, -28.94537409950192],
                  [-69.67543330395728, -28.945580648633552],
                  [-69.6760126611045, -28.945242658931008],
                  [-69.67661347592383, -28.94550553990607]]]),
            {
              "id": 1,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34241664836314, -29.656775964020838],
                  [-69.34241664836314, -29.657540480952367],
                  [-69.34190166423228, -29.657540480952367],
                  [-69.34190166423228, -29.656775964020838]]], null, false),
            {
              "id": 1,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34142959544566, -29.657279427043452],
                  [-69.34142959544566, -29.65770830096474],
                  [-69.34065711924937, -29.65770830096474],
                  [-69.34065711924937, -29.657279427043452]]], null, false),
            {
              "id": 1,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34241664836314, -29.655862265434756],
                  [-69.34241664836314, -29.656403026824492],
                  [-69.34177291819957, -29.656403026824492],
                  [-69.34177291819957, -29.655862265434756]]], null, false),
            {
              "id": 1,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33357223232042, -29.670400832126017],
                  [-69.33357223232042, -29.6704567650103],
                  [-69.33346494395983, -29.6704567650103],
                  [-69.33346494395983, -29.670400832126017]]], null, false),
            {
              "id": 1,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44121180633424, -28.726854515486767],
                  [-69.44121180633424, -28.727070907117398],
                  [-69.44096504310487, -28.727070907117398],
                  [-69.44096504310487, -28.726854515486767]]], null, false),
            {
              "id": 1,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42544112233426, -28.847917506321338],
                  [-69.42544112233426, -28.847926903745684],
                  [-69.4253767493179, -28.847926903745684],
                  [-69.4253767493179, -28.847917506321338]]], null, false),
            {
              "id": 1,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4255376818588, -28.848011480526683],
                  [-69.4255376818588, -28.848058467597507],
                  [-69.42547330884244, -28.848058467597507],
                  [-69.42547330884244, -28.848011480526683]]], null, false),
            {
              "id": 1,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30518884676526, -28.89790295191776],
                  [-69.30518884676526, -28.898090809850878],
                  [-69.30504937189649, -28.898090809850878],
                  [-69.30504937189649, -28.89790295191776]]], null, false),
            {
              "id": 1,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3071391412463, -28.90092417949988],
                  [-69.3071391412463, -28.900980535275078],
                  [-69.3069782087054, -28.900980535275078],
                  [-69.3069782087054, -28.90092417949988]]], null, false),
            {
              "id": 1,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30218088218446, -28.88194256032439],
                  [-69.30218088218446, -28.882243179059007],
                  [-69.30189120361085, -28.882243179059007],
                  [-69.30189120361085, -28.88194256032439]]], null, false),
            {
              "id": 1,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30287825652833, -28.88297593357952],
                  [-69.30287825652833, -28.88322018393759],
                  [-69.3025671202826, -28.88322018393759],
                  [-69.3025671202826, -28.88297593357952]]], null, false),
            {
              "id": 1,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30311429092164, -28.883624135192342],
                  [-69.30311429092164, -28.88384020149762],
                  [-69.30293190070863, -28.88384020149762],
                  [-69.30293190070863, -28.883624135192342]]], null, false),
            {
              "id": 1,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30189120361085, -28.880016700915398],
                  [-69.30189120361085, -28.88016701317833],
                  [-69.30156933852906, -28.88016701317833],
                  [-69.30156933852906, -28.880016700915398]]], null, false),
            {
              "id": 1,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39075606290729, -28.159151666909015],
                  [-69.39075606290729, -28.159369223052913],
                  [-69.3904878420058, -28.159369223052913],
                  [-69.3904878420058, -28.159151666909015]]], null, false),
            {
              "id": 1,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38980119649798, -28.15944489465148],
                  [-69.38980119649798, -28.159681368052222],
                  [-69.38952224676044, -28.159681368052222],
                  [-69.38952224676044, -28.15944489465148]]], null, false),
            {
              "id": 1,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39075606290729, -28.158290896960526],
                  [-69.39075606290729, -28.15842332355699],
                  [-69.39062731687457, -28.15842332355699],
                  [-69.39062731687457, -28.158290896960526]]], null, false),
            {
              "id": 1,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52866934866567, -28.46995131808409],
                  [-69.52866934866567, -28.47021539606565],
                  [-69.52851914496084, -28.47021539606565],
                  [-69.52851914496084, -28.46995131808409]]], null, false),
            {
              "id": 1,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52879809469839, -28.47050776734677],
                  [-69.52879809469839, -28.470677530945185],
                  [-69.52866934866567, -28.470677530945185],
                  [-69.52866934866567, -28.47050776734677]]], null, false),
            {
              "id": 1,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52846553358448, -28.464773327689958],
                  [-69.52846553358448, -28.464924236869205],
                  [-69.52825095686329, -28.464924236869205],
                  [-69.52825095686329, -28.464773327689958]]], null, false),
            {
              "id": 1,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49359096671435, -28.514985501723174],
                  [-69.49359096671435, -28.515626559265772],
                  [-69.49339784766528, -28.515626559265772],
                  [-69.49339784766528, -28.514985501723174]]], null, false),
            {
              "id": 1,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46942383407469, -28.321445645024898],
                  [-69.46942383407469, -28.321705371006555],
                  [-69.46887129901762, -28.321705371006555],
                  [-69.46887129901762, -28.321445645024898]]], null, false),
            {
              "id": 1,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4684716498744, -28.321178834946668],
                  [-69.4684716498744, -28.32124022493548],
                  [-69.46836704372282, -28.32124022493548],
                  [-69.46836704372282, -28.321178834946668]]], null, false),
            {
              "id": 1,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46816319583769, -28.3210702218027],
                  [-69.46816319583769, -28.32115522340307],
                  [-69.46800494550581, -28.32115522340307],
                  [-69.46800494550581, -28.3210702218027]]], null, false),
            {
              "id": 1,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46795398353453, -28.321051332548937],
                  [-69.46795398353453, -28.32116466802114],
                  [-69.46781719087477, -28.32116466802114],
                  [-69.46781719087477, -28.321051332548937]]], null, false),
            {
              "id": 1,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43664465588589, -28.327826789662364],
                  [-69.43664465588589, -28.32813844205524],
                  [-69.4363227908041, -28.32813844205524],
                  [-69.4363227908041, -28.327826789662364]]], null, false),
            {
              "id": 1,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4362155024435, -28.327420695779256],
                  [-69.4362155024435, -28.327666241103334],
                  [-69.43599019688625, -28.327666241103334],
                  [-69.43599019688625, -28.327420695779256]]], null, false),
            {
              "id": 1,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43342600506801, -28.326145739785],
                  [-69.43342600506801, -28.326230737327062],
                  [-69.43321142834682, -28.326230737327062],
                  [-69.43321142834682, -28.326145739785]]], null, false),
            {
              "id": 1,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43311486882229, -28.325777416317308],
                  [-69.43311486882229, -28.32602296543758],
                  [-69.43291102093715, -28.32602296543758],
                  [-69.43291102093715, -28.325777416317308]]], null, false),
            {
              "id": 1,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44100056332607, -28.33019721369199],
                  [-69.44100056332607, -28.33048997155747],
                  [-69.44072161358852, -28.33048997155747],
                  [-69.44072161358852, -28.33019721369199]]], null, false),
            {
              "id": 1,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40666996302994, -28.32478400832424],
                  [-69.40666996302994, -28.325029559739324],
                  [-69.40639101329239, -28.325029559739324],
                  [-69.40639101329239, -28.32478400832424]]], null, false),
            {
              "id": 1,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35870946528404, -28.203730834575325],
                  [-69.35870946528404, -28.2039577550569],
                  [-69.35851098181693, -28.2039577550569],
                  [-69.35851098181693, -28.203730834575325]]], null, false),
            {
              "id": 1,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35602189185111, -28.19789219396348],
                  [-69.35602189185111, -28.198062393669666],
                  [-69.35585023047416, -28.198062393669666],
                  [-69.35585023047416, -28.19789219396348]]], null, false),
            {
              "id": 1,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35214878203361, -28.20032224185152],
                  [-69.35214878203361, -28.200539714260277],
                  [-69.35203076483695, -28.200539714260277],
                  [-69.35203076483695, -28.20032224185152]]], null, false),
            {
              "id": 1,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35013176085441, -28.20091792609085],
                  [-69.35013176085441, -28.20104084464753],
                  [-69.3500030148217, -28.20104084464753],
                  [-69.3500030148217, -28.20091792609085]]], null, false),
            {
              "id": 1,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35204149367301, -28.19969818813429],
                  [-69.35204149367301, -28.199802197340258],
                  [-69.35193420531242, -28.199802197340258],
                  [-69.35193420531242, -28.19969818813429]]], null, false),
            {
              "id": 1,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32330893357215, -28.189981901654814],
                  [-69.32330893357215, -28.190331782205735],
                  [-69.32295488198218, -28.190331782205735],
                  [-69.32295488198218, -28.189981901654814]]], null, false),
            {
              "id": 1,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32577656586585, -28.191315224107594],
                  [-69.32577656586585, -28.191419241471976],
                  [-69.32561563332496, -28.191419241471976],
                  [-69.32561563332496, -28.191315224107594]]], null, false),
            {
              "id": 1,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32278322060523, -28.18965093251215],
                  [-69.32278322060523, -28.18996298915999],
                  [-69.322740305261, -28.18996298915999],
                  [-69.322740305261, -28.18965093251215]]], null, false),
            {
              "id": 1,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32346986611304, -28.190388519484472],
                  [-69.32346986611304, -28.190473625346097],
                  [-69.32338403542457, -28.190473625346097],
                  [-69.32338403542457, -28.190388519484472]]], null, false),
            {
              "id": 1,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27244438427188, -28.163180572948143],
                  [-69.27244438427188, -28.16350216542039],
                  [-69.27207960384585, -28.16350216542039],
                  [-69.27207960384585, -28.163180572948143]]], null, false),
            {
              "id": 1,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27192940014102, -28.162934648640835],
                  [-69.27192940014102, -28.163123821235082],
                  [-69.27173628109195, -28.163123821235082],
                  [-69.27173628109195, -28.162934648640835]]], null, false),
            {
              "id": 1,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27624239223697, -28.16448585404247],
                  [-69.27624239223697, -28.165015528786082],
                  [-69.27579178112246, -28.165015528786082],
                  [-69.27579178112246, -28.16448585404247]]], null, false),
            {
              "id": 1,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27716507213809, -28.16448585404247],
                  [-69.27716507213809, -28.164599355993946],
                  [-69.27697195308902, -28.164599355993946],
                  [-69.27697195308902, -28.16448585404247]]], null, false),
            {
              "id": 1,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28823625965408, -28.15734479318419],
                  [-69.28823625965408, -28.15761910766239],
                  [-69.28790366573624, -28.15761910766239],
                  [-69.28790366573624, -28.15734479318419]]], null, false),
            {
              "id": 1,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28694879932694, -28.15688129470993],
                  [-69.28694879932694, -28.15699480472593],
                  [-69.28668057842545, -28.15699480472593],
                  [-69.28668057842545, -28.15688129470993]]], null, false),
            {
              "id": 1,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28806459827713, -28.157694780498204],
                  [-69.28806459827713, -28.15783666692113],
                  [-69.28787147922806, -28.15783666692113],
                  [-69.28787147922806, -28.157694780498204]]], null, false),
            {
              "id": 1,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1727065812197, -28.172775615509387],
                  [-69.1727065812197, -28.172983686207157],
                  [-69.17243836031821, -28.172983686207157],
                  [-69.17243836031821, -28.172775615509387]]], null, false),
            {
              "id": 1,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.17196629153159, -28.172331099481095],
                  [-69.17196629153159, -28.172463508703945],
                  [-69.17179463015464, -28.172463508703945],
                  [-69.17179463015464, -28.172331099481095]]], null, false),
            {
              "id": 1,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16849014864829, -28.171347482980792],
                  [-69.16849014864829, -28.17146097765391],
                  [-69.16798589335349, -28.17146097765391],
                  [-69.16798589335349, -28.171347482980792]]], null, false),
            {
              "id": 1,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16713831530478, -28.17130965139634],
                  [-69.16713831530478, -28.171451519769086],
                  [-69.16697738276389, -28.171451519769086],
                  [-69.16697738276389, -28.17130965139634]]], null, false),
            {
              "id": 1,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16800735102561, -28.168472244435684],
                  [-69.16800735102561, -28.168822195362125],
                  [-69.16773913012412, -28.168822195362125],
                  [-69.16773913012412, -28.168472244435684]]], null, false),
            {
              "id": 1,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.17479270943144, -28.17347453268505],
                  [-69.17479270943144, -28.173578567404814],
                  [-69.17459959038237, -28.173578567404814],
                  [-69.17459959038237, -28.17347453268505]]], null, false),
            {
              "id": 1,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.13035843264095, -28.190710291590403],
                  [-69.13035843264095, -28.190795397195853],
                  [-69.12980053316585, -28.190795397195853],
                  [-69.12980053316585, -28.190710291590403]]], null, false),
            {
              "id": 1,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1321501482629, -28.190436061956362],
                  [-69.1321501482629, -28.190606273536172],
                  [-69.13191411386958, -28.190606273536172],
                  [-69.13191411386958, -28.190436061956362]]], null, false),
            {
              "id": 1,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12592742334834, -28.19023748143738],
                  [-69.12592742334834, -28.19035095606483],
                  [-69.12554118525019, -28.19035095606483],
                  [-69.12554118525019, -28.19023748143738]]], null, false),
            {
              "id": 1,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12453267466059, -28.190114550455057],
                  [-69.12453267466059, -28.19031313120239],
                  [-69.12433955561151, -28.19031313120239],
                  [-69.12433955561151, -28.190114550455057]]], null, false),
            {
              "id": 1,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1230950106286, -28.189793037986774],
                  [-69.1230950106286, -28.190048356790633],
                  [-69.12260148416986, -28.190048356790633],
                  [-69.12260148416986, -28.189793037986774]]], null, false),
            {
              "id": 1,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11176494226324, -28.190456906798808],
                  [-69.11176494226324, -28.19096754062558],
                  [-69.1112714158045, -28.19096754062558],
                  [-69.1112714158045, -28.190456906798808]]], null, false),
            {
              "id": 1,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72743564610145, -28.047009207390577],
                  [-69.72743564610145, -28.047577337741686],
                  [-69.72700649265907, -28.047577337741686],
                  [-69.72700649265907, -28.047009207390577]]], null, false),
            {
              "id": 1,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7222214317765, -28.040267164775972],
                  [-69.7222214317765, -28.040627003568222],
                  [-69.72170644764564, -28.040627003568222],
                  [-69.72170644764564, -28.040267164775972]]], null, false),
            {
              "id": 1,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72108417515419, -28.037861895621628],
                  [-69.72108417515419, -28.038562648879363],
                  [-69.72052627567909, -28.038562648879363],
                  [-69.72052627567909, -28.037861895621628]]], null, false),
            {
              "id": 1,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.83790091337534, -28.04587877367982],
                  [-69.83790091337534, -28.0461060285691],
                  [-69.83745030226083, -28.0461060285691],
                  [-69.83745030226083, -28.04587877367982]]], null, false),
            {
              "id": 1,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84193495573373, -28.04051920668158],
                  [-69.84193495573373, -28.040651778697622],
                  [-69.84146288694711, -28.040651778697622],
                  [-69.84146288694711, -28.04051920668158]]], null, false),
            {
              "id": 1,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80901162553864, -28.181879314855134],
                  [-69.80901162553864, -28.18243727422975],
                  [-69.80849664140779, -28.18243727422975],
                  [-69.80849664140779, -28.181879314855134]]], null, false),
            {
              "id": 1,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59778637352552, -29.08159369811067],
                  [-69.59778637352552, -29.08185623234707],
                  [-69.59748596611585, -29.08185623234707],
                  [-69.59748596611585, -29.08159369811067]]], null, false),
            {
              "id": 1,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55868317202636, -29.07878173628636],
                  [-69.55868317202636, -29.07919430104658],
                  [-69.55812527255127, -29.07919430104658],
                  [-69.55812527255127, -29.07878173628636]]], null, false),
            {
              "id": 1,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55597950533935, -29.075087332759324],
                  [-69.55597950533935, -29.0757062014694],
                  [-69.55550743655273, -29.0757062014694],
                  [-69.55550743655273, -29.075087332759324]]], null, false),
            {
              "id": 1,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51747573189522, -29.088130107586466],
                  [-69.51747573189522, -29.088392625163507],
                  [-69.51715386681343, -29.088392625163507],
                  [-69.51715386681343, -29.088130107586466]]], null, false),
            {
              "id": 1,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5179048853376, -29.083685958490626],
                  [-69.5179048853376, -29.083929735352434],
                  [-69.51775468163277, -29.083929735352434],
                  [-69.51775468163277, -29.083685958490626]]], null, false),
            {
              "id": 1,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51656043214255, -29.105957670290067],
                  [-69.51656043214255, -29.106388874137913],
                  [-69.51621710938865, -29.106388874137913],
                  [-69.51621710938865, -29.105957670290067]]], null, false),
            {
              "id": 1,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51866328401023, -29.103314163735433],
                  [-69.51866328401023, -29.10359539106436],
                  [-69.51844870728904, -29.10359539106436],
                  [-69.51844870728904, -29.103314163735433]]], null, false),
            {
              "id": 1,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5111101834243, -29.099526894191584],
                  [-69.5111101834243, -29.09977063355553],
                  [-69.5110028950637, -29.09977063355553],
                  [-69.5110028950637, -29.099526894191584]]], null, false),
            {
              "id": 1,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51085269135886, -29.100445601089874],
                  [-69.51085269135886, -29.100689338278528],
                  [-69.51072394532615, -29.100689338278528],
                  [-69.51072394532615, -29.100445601089874]]], null, false),
            {
              "id": 1,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55535347347285, -29.052035398310842],
                  [-69.55535347347285, -29.052199529344822],
                  [-69.55528373603846, -29.052199529344822],
                  [-69.55528373603846, -29.052035398310842]]], null, false),
            {
              "id": 1,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5577942836764, -29.05344691666759],
                  [-69.5577942836764, -29.053489121237966],
                  [-69.55771381740595, -29.053489121237966],
                  [-69.55771381740595, -29.05344691666759]]], null, false),
            {
              "id": 1,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63152936142187, -29.032919476832603],
                  [-69.63152936142187, -29.033116470533976],
                  [-69.63144353073339, -29.033116470533976],
                  [-69.63144353073339, -29.032919476832603]]], null, false),
            {
              "id": 1,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63383487313597, -29.027555869857995],
                  [-69.63383487313597, -29.027687205857397],
                  [-69.6336953982672, -29.027687205857397],
                  [-69.6336953982672, -29.027555869857995]]], null, false),
            {
              "id": 1,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65420434284383, -28.922500583622696],
                  [-69.65420434284383, -28.922744740974732],
                  [-69.65398976612263, -28.922744740974732],
                  [-69.65398976612263, -28.922500583622696]]], null, false),
            {
              "id": 1,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66248441412115, -28.919460382128246],
                  [-69.66248441412115, -28.919512032361023],
                  [-69.66244149877691, -28.919512032361023],
                  [-69.66244149877691, -28.919460382128246]]], null, false),
            {
              "id": 1,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66232884599829, -28.91964350556472],
                  [-69.66232884599829, -28.919704546638354],
                  [-69.66223765089178, -28.919704546638354],
                  [-69.66223765089178, -28.91964350556472]]], null, false),
            {
              "id": 1,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66177094652319, -28.920380691512378],
                  [-69.66177094652319, -28.92050277275591],
                  [-69.66163147165442, -28.92050277275591],
                  [-69.66163147165442, -28.920380691512378]]], null, false),
            {
              "id": 1,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61893905529739, -28.891698630983292],
                  [-69.61893905529739, -28.891764385228182],
                  [-69.61886395344497, -28.891764385228182],
                  [-69.61886395344497, -28.891698630983292]]], null, false),
            {
              "id": 1,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61756576428176, -28.89076867363206],
                  [-69.61756576428176, -28.89092836387056],
                  [-69.61741556057693, -28.89092836387056],
                  [-69.61741556057693, -28.89076867363206]]], null, false),
            {
              "id": 1,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.02166503803403, -28.87990044546711],
                  [-70.02166503803403, -28.88012591403228],
                  [-70.02132171528012, -28.88012591403228],
                  [-70.02132171528012, -28.87990044546711]]], null, false),
            {
              "id": 1,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.02057069675595, -28.878359730507395],
                  [-70.02057069675595, -28.878660359610997],
                  [-70.02035612003476, -28.878660359610997],
                  [-70.02035612003476, -28.878359730507395]]], null, false),
            {
              "id": 1,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.0197338475433, -28.877720890773613],
                  [-70.0197338475433, -28.878040311131574],
                  [-70.01949781315, -28.878040311131574],
                  [-70.01949781315, -28.877720890773613]]], null, false),
            {
              "id": 1,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.01810306446225, -28.874132041601438],
                  [-70.01810306446225, -28.874207202017338],
                  [-70.0180386914459, -28.874207202017338],
                  [-70.0180386914459, -28.874132041601438]]], null, false),
            {
              "id": 1,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.00127563084686, -28.878052651742106],
                  [-70.00127563084686, -28.87817478278139],
                  [-70.000760646716, -28.87817478278139],
                  [-70.000760646716, -28.878052651742106]]], null, false),
            {
              "id": 1,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.99842176045502, -28.879217588115928],
                  [-69.99842176045502, -28.87947124188475],
                  [-69.99819645489777, -28.87947124188475],
                  [-69.99819645489777, -28.879217588115928]]], null, false),
            {
              "id": 1,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.01301840200752, -28.81694599615832],
                  [-70.01301840200752, -28.81754760860291],
                  [-70.01252487554878, -28.81754760860291],
                  [-70.01252487554878, -28.81694599615832]]], null, false),
            {
              "id": 1,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.01322224989265, -28.81812101722941],
                  [-70.01322224989265, -28.818365419946677],
                  [-70.01292184248298, -28.818365419946677],
                  [-70.01292184248298, -28.81812101722941]]], null, false),
            {
              "id": 1,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-70.01237467184394, -28.816428982687174],
                  [-70.01237467184394, -28.816739191077847],
                  [-70.01222446813911, -28.816739191077847],
                  [-70.01222446813911, -28.816428982687174]]], null, false),
            {
              "id": 1,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90311173382241, -28.629756601256332],
                  [-69.90311173382241, -28.629926108322785],
                  [-69.90291861477334, -28.629926108322785],
                  [-69.90291861477334, -28.629756601256332]]], null, false),
            {
              "id": 1,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90506438198526, -28.632016672966664],
                  [-69.90506438198526, -28.63206375727642],
                  [-69.90497855129678, -28.63206375727642],
                  [-69.90497855129678, -28.632016672966664]]], null, false),
            {
              "id": 1,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90194229069192, -28.62896556465992],
                  [-69.90194229069192, -28.629069153124874],
                  [-69.90167406979043, -28.629069153124874],
                  [-69.90167406979043, -28.62896556465992]]], null, false),
            {
              "id": 1,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.89836619781151, -28.63487480342644],
                  [-69.89836619781151, -28.635016052445362],
                  [-69.89785121368065, -28.635016052445362],
                  [-69.89785121368065, -28.63487480342644]]], null, false),
            {
              "id": 1,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90802395420603, -28.6356230692332],
                  [-69.90802395420603, -28.635745484187638],
                  [-69.90786302166514, -28.635745484187638],
                  [-69.90786302166514, -28.6356230692332]]], null, false),
            {
              "id": 1,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.9311396672698, -28.66037796184275],
                  [-69.9311396672698, -28.66060390523351],
                  [-69.93077488684378, -28.66060390523351],
                  [-69.93077488684378, -28.66037796184275]]], null, false),
            {
              "id": 1,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.91916628622732, -28.663955341671798],
                  [-69.91916628622732, -28.664143621438523],
                  [-69.9189087941619, -28.664143621438523],
                  [-69.9189087941619, -28.663955341671798]]], null, false),
            {
              "id": 1,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26998572478409, -28.608431301803833],
                  [-69.26998572478409, -28.60880806031022],
                  [-69.26910596022721, -28.60880806031022],
                  [-69.26910596022721, -28.608431301803833]]], null, false),
            {
              "id": 1,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.97927787077754, -28.712804416872746],
                  [-68.97927787077754, -28.71325607697298],
                  [-68.97863414061396, -28.71325607697298],
                  [-68.97863414061396, -28.712804416872746]]], null, false),
            {
              "id": 1,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.97803332579463, -28.713670097018195],
                  [-68.97803332579463, -28.714159391322397],
                  [-68.97794749510615, -28.714159391322397],
                  [-68.97794749510615, -28.713670097018195]]], null, false),
            {
              "id": 1,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99850394499629, -28.714554588897077],
                  [-68.99850394499629, -28.715100335473874],
                  [-68.99790313017695, -28.715100335473874],
                  [-68.99790313017695, -28.714554588897077]]], null, false),
            {
              "id": 1,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99811770689814, -28.715721353976544],
                  [-68.99811770689814, -28.71626709446501],
                  [-68.99779584181636, -28.71626709446501],
                  [-68.99779584181636, -28.715721353976544]]], null, false),
            {
              "id": 1,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99764563811152, -28.71333135346673],
                  [-68.99764563811152, -28.71389592544302],
                  [-68.99725940001338, -28.71389592544302],
                  [-68.99725940001338, -28.71333135346673]]], null, false),
            {
              "id": 1,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.00107886565058, -28.717377385288813],
                  [-69.00107886565058, -28.717791389019496],
                  [-69.00011327040522, -28.717791389019496],
                  [-69.00011327040522, -28.717377385288813]]], null, false),
            {
              "id": 1,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.15514775936012, -28.17404658121166],
                  [-69.15514775936012, -28.17413170008019],
                  [-69.15500828449134, -28.17413170008019],
                  [-69.15500828449134, -28.17404658121166]]], null, false),
            {
              "id": 1,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1459960622013, -28.174585666235064],
                  [-69.1459960622013, -28.174680242274842],
                  [-69.14582440082435, -28.174680242274842],
                  [-69.14582440082435, -28.174585666235064]]], null, false),
            {
              "id": 1,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.18529774111981, -28.049423275788612],
                  [-69.18529774111981, -28.049820958422103],
                  [-69.18465401095624, -28.049820958422103],
                  [-69.18465401095624, -28.049423275788612]]], null, false),
            {
              "id": 1,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33172477420028, -28.040308244230975],
                  [-69.33172477420028, -28.04046922483062],
                  [-69.3312956207579, -28.04046922483062],
                  [-69.3312956207579, -28.040308244230975]]], null, false),
            {
              "id": 1,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33243287738021, -28.039844239978247],
                  [-69.33243287738021, -28.03991999591131],
                  [-69.33231486018356, -28.03991999591131],
                  [-69.33231486018356, -28.039844239978247]]], null, false),
            {
              "id": 1,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32975066836532, -28.04174759162827],
                  [-69.32975066836532, -28.041832815541294],
                  [-69.32945026095565, -28.041832815541294],
                  [-69.32945026095565, -28.04174759162827]]], null, false),
            {
              "id": 1,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3352975634932, -28.03713116786865],
                  [-69.3352975634932, -28.037348971525027],
                  [-69.3351366309523, -28.037348971525027],
                  [-69.3351366309523, -28.03713116786865]]], null, false),
            {
              "id": 1,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62115456188481, -28.309745881221314],
                  [-69.62115456188481, -28.30984033749793],
                  [-69.62100435817997, -28.30984033749793],
                  [-69.62100435817997, -28.309745881221314]]], null, false),
            {
              "id": 1,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62077905262272, -28.309641979220157],
                  [-69.62077905262272, -28.30969865305156],
                  [-69.62069322193425, -28.30969865305156],
                  [-69.62069322193425, -28.309641979220157]]], null, false),
            {
              "id": 1,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61148259636684, -28.311423214722936],
                  [-69.61148259636684, -28.311631015143746],
                  [-69.61122510430141, -28.311631015143746],
                  [-69.61122510430141, -28.311423214722936]]], null, false),
            {
              "id": 1,
              "system:index": "258"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74838576104946, -28.108857992092663],
                  [-69.74838576104946, -28.109037796791878],
                  [-69.74816045549221, -28.109037796791878],
                  [-69.74816045549221, -28.108857992092663]]], null, false),
            {
              "id": 1,
              "system:index": "259"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74906167772122, -28.11058978271953],
                  [-69.74906167772122, -28.110722268282803],
                  [-69.74890074518032, -28.110722268282803],
                  [-69.74890074518032, -28.11058978271953]]], null, false),
            {
              "id": 1,
              "system:index": "260"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74347195413418, -28.109823255891115],
                  [-69.74347195413418, -28.109927352448523],
                  [-69.7432788350851, -28.109927352448523],
                  [-69.7432788350851, -28.109823255891115]]], null, false),
            {
              "id": 1,
              "system:index": "261"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74472722795315, -28.11000305897227],
                  [-69.74472722795315, -28.110088228747614],
                  [-69.74459848192043, -28.110088228747614],
                  [-69.74459848192043, -28.11000305897227]]], null, false),
            {
              "id": 1,
              "system:index": "262"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74420151498623, -28.11019232504786],
                  [-69.74420151498623, -28.11029642124708],
                  [-69.74411568429775, -28.11029642124708],
                  [-69.74411568429775, -28.11019232504786]]], null, false),
            {
              "id": 1,
              "system:index": "263"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74592885759182, -28.11031534781791],
                  [-69.74592885759182, -28.11038159078948],
                  [-69.7458001115591, -28.11038159078948],
                  [-69.7458001115591, -28.11031534781791]]], null, false),
            {
              "id": 1,
              "system:index": "264"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74993485167064, -28.11270921450079],
                  [-69.74993485167064, -28.11289847580102],
                  [-69.74969881727733, -28.11289847580102],
                  [-69.74969881727733, -28.11270921450079]]], null, false),
            {
              "id": 1,
              "system:index": "265"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47087465865695, -30.033504457894267],
                  [-69.47087465865695, -30.033680935552628],
                  [-69.47050987823093, -30.033680935552628],
                  [-69.47050987823093, -30.033504457894267]]], null, false),
            {
              "id": 1,
              "system:index": "266"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1629462377992, -29.969677839256487],
                  [-69.1629462377992, -29.97023549462627],
                  [-69.16230250763563, -29.97023549462627],
                  [-69.16230250763563, -29.969677839256487]]], null, false),
            {
              "id": 1,
              "system:index": "267"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16092921662, -29.98105338942048],
                  [-69.16092921662, -29.98149946288186],
                  [-69.16037131714491, -29.98149946288186],
                  [-69.16037131714491, -29.98105338942048]]], null, false),
            {
              "id": 1,
              "system:index": "268"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.15938426422743, -29.982317259023986],
                  [-69.15938426422743, -29.982800499033477],
                  [-69.15874053406385, -29.982800499033477],
                  [-69.15874053406385, -29.982317259023986]]], null, false),
            {
              "id": 1,
              "system:index": "269"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66311721545767, -29.37991500162557],
                  [-69.66311721545767, -29.380013165614756],
                  [-69.66301529151511, -29.380013165614756],
                  [-69.66301529151511, -29.37991500162557]]], null, false),
            {
              "id": 1,
              "system:index": "270"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66283826572013, -29.38005523586686],
                  [-69.66283826572013, -29.380172097586975],
                  [-69.66270951968741, -29.380172097586975],
                  [-69.66270951968741, -29.38005523586686]]], null, false),
            {
              "id": 1,
              "system:index": "271"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62086523255988, -28.308944413925378],
                  [-69.62086523255988, -28.309114436443984],
                  [-69.62061846933051, -28.309114436443984],
                  [-69.62061846933051, -28.308944413925378]]], null, false),
            {
              "id": 1,
              "system:index": "272"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62017858705207, -28.309605611082258],
                  [-69.62017858705207, -28.309832306304177],
                  [-69.61997473916693, -28.309832306304177],
                  [-69.61997473916693, -28.309605611082258]]], null, false),
            {
              "id": 1,
              "system:index": "273"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63609096983257, -28.311923321369072],
                  [-69.63609096983257, -28.312093339125944],
                  [-69.63602659681621, -28.312093339125944],
                  [-69.63602659681621, -28.311923321369072]]], null, false),
            {
              "id": 1,
              "system:index": "274"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45983360225195, -28.311535216618402],
                  [-69.45983360225195, -28.311686344078275],
                  [-69.45961902553076, -28.311686344078275],
                  [-69.45961902553076, -28.311535216618402]]], null, false),
            {
              "id": 1,
              "system:index": "275"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4580955308103, -28.311610780375187],
                  [-69.4580955308103, -28.311799689532265],
                  [-69.45781658107275, -28.311799689532265],
                  [-69.45781658107275, -28.311610780375187]]], null, false),
            {
              "id": 1,
              "system:index": "276"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46180770808691, -28.31453883460354],
                  [-69.46180770808691, -28.31485997112929],
                  [-69.46165750438207, -28.31485997112929],
                  [-69.46165750438207, -28.31453883460354]]], null, false),
            {
              "id": 1,
              "system:index": "277"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46238706523413, -28.315256667851667],
                  [-69.46238706523413, -28.315672253306925],
                  [-69.46208665782446, -28.315672253306925],
                  [-69.46208665782446, -28.315256667851667]]], null, false),
            {
              "id": 1,
              "system:index": "278"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23729739691102, -28.571866454626786],
                  [-69.23729739691102, -28.57214912192915],
                  [-69.23641763235413, -28.57214912192915],
                  [-69.23641763235413, -28.571866454626786]]], null, false),
            {
              "id": 1,
              "system:index": "279"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24393056412345, -28.561784379600255],
                  [-69.24393056412345, -28.562029381444788],
                  [-69.24347995300894, -28.562029381444788],
                  [-69.24347995300894, -28.561784379600255]]], null, false),
            {
              "id": 1,
              "system:index": "280"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40624518845674, -29.154726109288877],
                  [-69.40624518845674, -29.155325760073485],
                  [-69.40573020432588, -29.155325760073485],
                  [-69.40573020432588, -29.154726109288877]]], null, false),
            {
              "id": 1,
              "system:index": "281"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54159432853807, -29.146092155668033],
                  [-69.54159432853807, -29.146195229558515],
                  [-69.54152995552171, -29.146195229558515],
                  [-69.54152995552171, -29.146092155668033]]], null, false),
            {
              "id": 1,
              "system:index": "282"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53878337349046, -29.144049397235023],
                  [-69.53878337349046, -29.144274290061063],
                  [-69.53864389862169, -29.144274290061063],
                  [-69.53864389862169, -29.144049397235023]]], null, false),
            {
              "id": 1,
              "system:index": "283"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54820330457426, -29.137519130541943],
                  [-69.54820330457426, -29.13771592429632],
                  [-69.54818184690214, -29.13771592429632],
                  [-69.54818184690214, -29.137519130541943]]], null, false),
            {
              "id": 1,
              "system:index": "284"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53613556182188, -29.136564248129698],
                  [-69.53613556182188, -29.136648589139824],
                  [-69.53603900229734, -29.136648589139824],
                  [-69.53603900229734, -29.136564248129698]]], null, false),
            {
              "id": 1,
              "system:index": "285"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53398855766658, -29.133454668268037],
                  [-69.53398855766658, -29.133670212787848],
                  [-69.53382762512568, -29.133670212787848],
                  [-69.53382762512568, -29.133454668268037]]], null, false),
            {
              "id": 1,
              "system:index": "286"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54388074285656, -29.125782683317475],
                  [-69.54388074285656, -29.125970127346775],
                  [-69.54375199682384, -29.125970127346775],
                  [-69.54375199682384, -29.125782683317475]]], null, false),
            {
              "id": 1,
              "system:index": "287"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54099468595653, -29.125782683317475],
                  [-69.54099468595653, -29.125923266371487],
                  [-69.54081229574352, -29.125923266371487],
                  [-69.54081229574352, -29.125782683317475]]], null, false),
            {
              "id": 1,
              "system:index": "288"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45367176510597, -29.28950229038043],
                  [-69.45367176510597, -29.290045009444096],
                  [-69.45319969631934, -29.290045009444096],
                  [-69.45319969631934, -29.28950229038043]]], null, false),
            {
              "id": 1,
              "system:index": "289"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4534786460569, -29.29068129708782],
                  [-69.4534786460569, -29.291074296299325],
                  [-69.45319969631934, -29.291074296299325],
                  [-69.45319969631934, -29.29068129708782]]], null, false),
            {
              "id": 1,
              "system:index": "290"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37687446032265, -29.540254445799924],
                  [-69.37687446032265, -29.540665149303177],
                  [-69.37554408465127, -29.540665149303177],
                  [-69.37554408465127, -29.540254445799924]]], null, false),
            {
              "id": 1,
              "system:index": "291"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37080193911294, -29.540833163891836],
                  [-69.37080193911294, -29.54146788315138],
                  [-69.37032987032632, -29.54146788315138],
                  [-69.37032987032632, -29.540833163891836]]], null, false),
            {
              "id": 1,
              "system:index": "292"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37032987032632, -29.539339691092046],
                  [-69.37032987032632, -29.53958238192318],
                  [-69.37007237826089, -29.53958238192318],
                  [-69.37007237826089, -29.539339691092046]]], null, false),
            {
              "id": 1,
              "system:index": "293"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3373494282792, -29.542494626457913],
                  [-69.3373494282792, -29.542755977634595],
                  [-69.33704902086953, -29.542755977634595],
                  [-69.33704902086953, -29.542494626457913]]], null, false),
            {
              "id": 1,
              "system:index": "294"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33344413195351, -29.542755977634595],
                  [-69.33344413195351, -29.542942656632842],
                  [-69.33282185946206, -29.542942656632842],
                  [-69.33282185946206, -29.542755977634595]]], null, false),
            {
              "id": 1,
              "system:index": "295"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36621870934403, -29.73458409757993],
                  [-69.36621870934403, -29.734695891855598],
                  [-69.36608996331131, -29.734695891855598],
                  [-69.36608996331131, -29.73458409757993]]], null, false),
            {
              "id": 1,
              "system:index": "296"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32310901544788, -29.704080476641423],
                  [-69.32310901544788, -29.704527788918213],
                  [-69.32280860803822, -29.704527788918213],
                  [-69.32280860803822, -29.704080476641423]]], null, false),
            {
              "id": 1,
              "system:index": "297"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32637058160999, -29.706876145685204],
                  [-69.32637058160999, -29.70739799528708],
                  [-69.32568393610218, -29.70739799528708],
                  [-69.32568393610218, -29.706876145685204]]], null, false),
            {
              "id": 1,
              "system:index": "298"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.29469905756214, -29.70035279686008],
                  [-69.29469905756214, -29.701098343883913],
                  [-69.29345451257923, -29.701098343883913],
                  [-69.29345451257923, -29.70035279686008]]], null, false),
            {
              "id": 1,
              "system:index": "299"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6925342595584, -30.184937641486798],
                  [-69.6925342595584, -30.185382796373606],
                  [-69.69193344473906, -30.185382796373606],
                  [-69.69193344473906, -30.184937641486798]]], null, false),
            {
              "id": 1,
              "system:index": "300"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81426961936596, -30.080631468197407],
                  [-69.81426961936596, -30.08083571348118],
                  [-69.8138619235957, -30.08083571348118],
                  [-69.8138619235957, -30.080631468197407]]], null, false),
            {
              "id": 1,
              "system:index": "301"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.83840736710802, -30.085804751288588],
                  [-69.83840736710802, -30.086046119408202],
                  [-69.83823570573107, -30.086046119408202],
                  [-69.83823570573107, -30.085804751288588]]], null, false),
            {
              "id": 1,
              "system:index": "302"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5146493382708, -30.543646807062988],
                  [-69.5146493382708, -30.54370224781039],
                  [-69.51452059223809, -30.54370224781039],
                  [-69.51452059223809, -30.543646807062988]]], null, false),
            {
              "id": 1,
              "system:index": "303"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50606626942314, -30.546437285380108],
                  [-69.50606626942314, -30.546603602747325],
                  [-69.50591606571831, -30.546603602747325],
                  [-69.50591606571831, -30.546437285380108]]], null, false),
            {
              "id": 1,
              "system:index": "304"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47627773197178, -30.457300912029005],
                  [-69.47627773197178, -30.457522871779936],
                  [-69.47602023990635, -30.457522871779936],
                  [-69.47602023990635, -30.457300912029005]]], null, false),
            {
              "id": 1,
              "system:index": "305"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47241535099033, -30.455562209820044],
                  [-69.47241535099033, -30.455932149058572],
                  [-69.47185745151523, -30.455932149058572],
                  [-69.47185745151523, -30.455562209820044]]], null, false),
            {
              "id": 1,
              "system:index": "306"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72296626203664, -30.153844128119513],
                  [-69.72296626203664, -30.154103883978408],
                  [-69.72268731229909, -30.154103883978408],
                  [-69.72268731229909, -30.153844128119513]]], null, false),
            {
              "id": 1,
              "system:index": "307"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7223654472173, -30.153064856438085],
                  [-69.7223654472173, -30.153343168459692],
                  [-69.72212941282399, -30.153343168459692],
                  [-69.72212941282399, -30.153064856438085]]], null, false),
            {
              "id": 1,
              "system:index": "308"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72185046308644, -30.153473047134344],
                  [-69.72185046308644, -30.15351015529569],
                  [-69.72176463239796, -30.15351015529569],
                  [-69.72176463239796, -30.153473047134344]]], null, false),
            {
              "id": 1,
              "system:index": "309"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72200066679127, -30.15451207037443],
                  [-69.72200066679127, -30.154753270632543],
                  [-69.72167880170949, -30.154753270632543],
                  [-69.72167880170949, -30.15451207037443]]], null, false),
            {
              "id": 1,
              "system:index": "310"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7213569366277, -30.155180008105663],
                  [-69.7213569366277, -30.155365545561523],
                  [-69.72118527525075, -30.155365545561523],
                  [-69.72118527525075, -30.155180008105663]]], null, false),
            {
              "id": 1,
              "system:index": "311"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80783913224754, -30.060747748286154],
                  [-69.80783913224754, -30.061082034784548],
                  [-69.80736706346092, -30.061082034784548],
                  [-69.80736706346092, -30.060747748286154]]], null, false),
            {
              "id": 1,
              "system:index": "312"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80470631211814, -30.059299160415872],
                  [-69.80470631211814, -30.05933630395937],
                  [-69.80462048142967, -30.05933630395937],
                  [-69.80462048142967, -30.059299160415872]]], null, false),
            {
              "id": 1,
              "system:index": "313"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.79573700517234, -30.05640192108846],
                  [-69.79573700517234, -30.05695908908185],
                  [-69.79530785172996, -30.05695908908185],
                  [-69.79530785172996, -30.05640192108846]]], null, false),
            {
              "id": 1,
              "system:index": "314"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80386702486189, -30.063573174050024],
                  [-69.80386702486189, -30.063907451007225],
                  [-69.80360953279646, -30.063907451007225],
                  [-69.80360953279646, -30.063573174050024]]], null, false),
            {
              "id": 1,
              "system:index": "315"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80397431322248, -30.06208748502685],
                  [-69.80397431322248, -30.06243105259548],
                  [-69.80368463464887, -30.06243105259548],
                  [-69.80368463464887, -30.06208748502685]]], null, false),
            {
              "id": 1,
              "system:index": "316"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80386702486189, -30.062802475652614],
                  [-69.80386702486189, -30.06296961557366],
                  [-69.80377046533735, -30.06296961557366],
                  [-69.80377046533735, -30.062802475652614]]], null, false),
            {
              "id": 1,
              "system:index": "317"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80371682115705, -30.063201753884698],
                  [-69.80371682115705, -30.06338746414156],
                  [-69.80360953279646, -30.06338746414156],
                  [-69.80360953279646, -30.063201753884698]]], null, false),
            {
              "id": 1,
              "system:index": "318"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81353728919865, -30.078705374094785],
                  [-69.81353728919865, -30.078918907402745],
                  [-69.81335489898564, -30.078918907402745],
                  [-69.81335489898564, -30.078705374094785]]], null, false),
            {
              "id": 1,
              "system:index": "319"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81314032226445, -30.078222601438622],
                  [-69.81314032226445, -30.07845470397123],
                  [-69.81299011855961, -30.07845470397123],
                  [-69.81299011855961, -30.078222601438622]]], null, false),
            {
              "id": 1,
              "system:index": "320"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81300084739567, -30.077962645955612],
                  [-69.81300084739567, -30.07807405553197],
                  [-69.81292574554325, -30.07807405553197],
                  [-69.81292574554325, -30.077962645955612]]], null, false),
            {
              "id": 1,
              "system:index": "321"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82195942550541, -30.080497182776305],
                  [-69.82195942550541, -30.08071999609471],
                  [-69.8216697469318, -30.08071999609471],
                  [-69.8216697469318, -30.080497182776305]]], null, false),
            {
              "id": 1,
              "system:index": "322"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82399142704512, -30.08030765123027],
                  [-69.82399142704512, -30.080344786889352],
                  [-69.82376612148786, -30.080344786889352],
                  [-69.82376612148786, -30.08030765123027]]], null, false),
            {
              "id": 1,
              "system:index": "323"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82388413868452, -30.07971347878907],
                  [-69.82388413868452, -30.07987130619186],
                  [-69.82369101963545, -30.07987130619186],
                  [-69.82369101963545, -30.07971347878907]]], null, false),
            {
              "id": 1,
              "system:index": "324"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81721080265547, -30.079852738275186],
                  [-69.81721080265547, -30.079991997565266],
                  [-69.81712497196699, -30.079991997565266],
                  [-69.81712497196699, -30.079852738275186]]], null, false),
            {
              "id": 1,
              "system:index": "325"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81374538860823, -30.07998271361869],
                  [-69.81374538860823, -30.080177676313735],
                  [-69.81361664257551, -30.080177676313735],
                  [-69.81361664257551, -30.07998271361869]]], null, false),
            {
              "id": 1,
              "system:index": "326"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81357372723127, -30.079110018750455],
                  [-69.81357372723127, -30.07948137920987],
                  [-69.81344498119857, -30.07948137920987],
                  [-69.81344498119857, -30.079110018750455]]], null, false),
            {
              "id": 1,
              "system:index": "327"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80458114679715, -30.05889619946094],
                  [-69.80458114679715, -30.059100489609246],
                  [-69.80432365473172, -30.059100489609246],
                  [-69.80432365473172, -30.05889619946094]]], null, false),
            {
              "id": 1,
              "system:index": "328"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.809237461647, -30.05967621412283],
                  [-69.809237461647, -30.06008479077879],
                  [-69.8087868505325, -30.06008479077879],
                  [-69.8087868505325, -30.05967621412283]]], null, false),
            {
              "id": 1,
              "system:index": "329"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80209355340516, -30.044494865413544],
                  [-69.80209355340516, -30.04531214231865],
                  [-69.8013639925531, -30.04531214231865],
                  [-69.8013639925531, -30.044494865413544]]], null, false),
            {
              "id": 1,
              "system:index": "330"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80110650048768, -30.03947960949929],
                  [-69.80110650048768, -30.04007402346201],
                  [-69.80080609307801, -30.04007402346201],
                  [-69.80080609307801, -30.03947960949929]]], null, false),
            {
              "id": 1,
              "system:index": "331"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75529437051331, -29.978681965422062],
                  [-69.75529437051331, -29.97899794187525],
                  [-69.7551656244806, -29.97899794187525],
                  [-69.7551656244806, -29.978681965422062]]], null, false),
            {
              "id": 1,
              "system:index": "332"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7549510477594, -29.978644791655608],
                  [-69.7549510477594, -29.979053702321448],
                  [-69.75462918267762, -29.979053702321448],
                  [-69.75462918267762, -29.978644791655608]]], null, false),
            {
              "id": 1,
              "system:index": "333"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77158074365174, -29.989536110020694],
                  [-69.77158074365174, -29.99005648440797],
                  [-69.77117304788148, -29.99005648440797],
                  [-69.77117304788148, -29.989536110020694]]], null, false),
            {
              "id": 1,
              "system:index": "334"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77342610345399, -29.989257336905528],
                  [-69.77342610345399, -29.989629034218442],
                  [-69.77284674630677, -29.989629034218442],
                  [-69.77284674630677, -29.989257336905528]]], null, false),
            {
              "id": 1,
              "system:index": "335"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7693277861041, -30.00061203419129],
                  [-69.7693277861041, -30.001095185153545],
                  [-69.76900592102231, -30.001095185153545],
                  [-69.76900592102231, -30.00061203419129]]], null, false),
            {
              "id": 1,
              "system:index": "336"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76825490249814, -29.999682891113885],
                  [-69.76825490249814, -30.000649199733438],
                  [-69.76737513794126, -30.000649199733438],
                  [-69.76737513794126, -29.999682891113885]]], null, false),
            {
              "id": 1,
              "system:index": "337"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76660266174497, -29.999013902711603],
                  [-69.76660266174497, -29.99973863994386],
                  [-69.76559415115537, -29.99973863994386],
                  [-69.76559415115537, -29.999013902711603]]], null, false),
            {
              "id": 1,
              "system:index": "338"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58392868944186, -29.194097493777473],
                  [-69.58392868944186, -29.194472132174084],
                  [-69.58364973970431, -29.194472132174084],
                  [-69.58364973970431, -29.194097493777473]]], null, false),
            {
              "id": 1,
              "system:index": "339"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58911159243759, -29.216638643836887],
                  [-69.58911159243759, -29.216863377609616],
                  [-69.58887555804428, -29.216863377609616],
                  [-69.58887555804428, -29.216638643836887]]], null, false),
            {
              "id": 1,
              "system:index": "340"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5118313087271, -29.200017114901858],
                  [-69.5118313087271, -29.20012013464935],
                  [-69.51174547803862, -29.20012013464935],
                  [-69.51174547803862, -29.200017114901858]]], null, false),
            {
              "id": 1,
              "system:index": "341"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53986413702589, -29.21600619131105],
                  [-69.53986413702589, -29.216062375147292],
                  [-69.53974611982923, -29.216062375147292],
                  [-69.53974611982923, -29.21600619131105]]], null, false),
            {
              "id": 1,
              "system:index": "342"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53402765020948, -29.211431787275373],
                  [-69.53402765020948, -29.211548842125264],
                  [-69.533941819521, -29.211548842125264],
                  [-69.533941819521, -29.211431787275373]]], null, false),
            {
              "id": 1,
              "system:index": "343"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42562597160197, -29.229912405016666],
                  [-69.42562597160197, -29.230062208170803],
                  [-69.4253792083726, -29.230062208170803],
                  [-69.4253792083726, -29.229912405016666]]], null, false),
            {
              "id": 1,
              "system:index": "344"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42248242263652, -29.230193285750893],
                  [-69.42248242263652, -29.230464803061576],
                  [-69.42224638824321, -29.230464803061576],
                  [-69.42224638824321, -29.230193285750893]]], null, false),
            {
              "id": 1,
              "system:index": "345"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42611949806071, -29.229940493124754],
                  [-69.42611949806071, -29.230118384297107],
                  [-69.4259371078477, -29.230118384297107],
                  [-69.4259371078477, -29.229940493124754]]], null, false),
            {
              "id": 1,
              "system:index": "346"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42724602584697, -29.229388092251263],
                  [-69.42724602584697, -29.229537896172467],
                  [-69.42703144912578, -29.229537896172467],
                  [-69.42703144912578, -29.229388092251263]]], null, false),
            {
              "id": 1,
              "system:index": "347"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41840155450997, -29.230147821082035],
                  [-69.41840155450997, -29.230297623891747],
                  [-69.41821916429696, -29.230297623891747],
                  [-69.41821916429696, -29.230147821082035]]], null, false),
            {
              "id": 1,
              "system:index": "348"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41468937723336, -29.229277087911314],
                  [-69.41468937723336, -29.229426891994926],
                  [-69.41415293543038, -29.229426891994926],
                  [-69.41415293543038, -29.229277087911314]]], null, false),
            {
              "id": 1,
              "system:index": "349"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42556065761725, -29.212011119519524],
                  [-69.42556065761725, -29.212123491542652],
                  [-69.42548555576484, -29.212123491542652],
                  [-69.42548555576484, -29.212011119519524]]], null, false),
            {
              "id": 1,
              "system:index": "350"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42521733486335, -29.211720824556],
                  [-69.42521733486335, -29.21184256125373],
                  [-69.42511004650275, -29.21184256125373],
                  [-69.42511004650275, -29.211720824556]]], null, false),
            {
              "id": 1,
              "system:index": "351"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40461847156034, -29.254193479360318],
                  [-69.40461847156034, -29.254577258439717],
                  [-69.40424296229826, -29.254577258439717],
                  [-69.40424296229826, -29.254193479360318]]], null, false),
            {
              "id": 1,
              "system:index": "352"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40586301654325, -29.254193479360318],
                  [-69.40586301654325, -29.254418130703467],
                  [-69.40564843982206, -29.254418130703467],
                  [-69.40564843982206, -29.254193479360318]]], null, false),
            {
              "id": 1,
              "system:index": "353"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5096824208094, -29.103078893935916],
                  [-69.5096824208094, -29.10352885832189],
                  [-69.50921035202278, -29.10352885832189],
                  [-69.50921035202278, -29.103078893935916]]], null, false),
            {
              "id": 1,
              "system:index": "354"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50880265625251, -29.103491361364863],
                  [-69.50880265625251, -29.10367884601342],
                  [-69.50860953720344, -29.10367884601342],
                  [-69.50860953720344, -29.103491361364863]]], null, false),
            {
              "id": 1,
              "system:index": "355"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71981619652763, -29.077857768373168],
                  [-69.71981619652763, -29.078120312129794],
                  [-69.7192153817083, -29.078120312129794],
                  [-69.7192153817083, -29.077857768373168]]], null, false),
            {
              "id": 1,
              "system:index": "356"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71521237056983, -29.062471585861083],
                  [-69.71521237056983, -29.06275292471405],
                  [-69.71493342083228, -29.06275292471405],
                  [-69.71493342083228, -29.062471585861083]]], null, false),
            {
              "id": 1,
              "system:index": "357"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33219751995334, -28.211609779831374],
                  [-69.33219751995334, -28.211798866318986],
                  [-69.33196148556003, -28.211798866318986],
                  [-69.33196148556003, -28.211609779831374]]], null, false),
            {
              "id": 1,
              "system:index": "358"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33123192470798, -28.211931226661136],
                  [-69.33123192470798, -28.212214855413375],
                  [-69.33099589031467, -28.212214855413375],
                  [-69.33099589031467, -28.211931226661136]]], null, false),
            {
              "id": 1,
              "system:index": "359"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60005263690998, -28.21899786788427],
                  [-69.60005263690998, -28.219186941290374],
                  [-69.59983806018879, -28.219186941290374],
                  [-69.59983806018879, -28.21899786788427]]], null, false),
            {
              "id": 1,
              "system:index": "360"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60051397686054, -28.219465823953232],
                  [-69.60051397686054, -28.219664350150747],
                  [-69.60024039154102, -28.219664350150747],
                  [-69.60024039154102, -28.219465823953232]]], null, false),
            {
              "id": 1,
              "system:index": "361"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60079292659809, -28.21876152565579],
                  [-69.60079292659809, -28.219257843731352],
                  [-69.60050324802448, -28.219257843731352],
                  [-69.60050324802448, -28.21876152565579]]], null, false),
            {
              "id": 1,
              "system:index": "362"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59945182209064, -28.21981088115499],
                  [-69.59945182209064, -28.22003776747447],
                  [-69.59923724536945, -28.22003776747447],
                  [-69.59923724536945, -28.21981088115499]]], null, false),
            {
              "id": 1,
              "system:index": "363"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59513409412963, -28.219094563970287],
                  [-69.59513409412963, -28.21936872005162],
                  [-69.59492488182647, -28.21936872005162],
                  [-69.59492488182647, -28.219094563970287]]], null, false),
            {
              "id": 1,
              "system:index": "364"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60819364203128, -28.210445180121507],
                  [-69.60819364203128, -28.210832811287485],
                  [-69.60777521742496, -28.210832811287485],
                  [-69.60777521742496, -28.210445180121507]]], null, false),
            {
              "id": 1,
              "system:index": "365"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66016067744052, -28.265187269916574],
                  [-69.66016067744052, -28.26546130755605],
                  [-69.6596886086539, -28.26546130755605],
                  [-69.6596886086539, -28.265187269916574]]], null, false),
            {
              "id": 1,
              "system:index": "366"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73631003622619, -28.259709043018177],
                  [-69.73631003622619, -28.260049245055047],
                  [-69.73547318701354, -28.260049245055047],
                  [-69.73547318701354, -28.259709043018177]]], null, false),
            {
              "id": 1,
              "system:index": "367"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73246911291686, -28.26312991406161],
                  [-69.73246911291686, -28.263583501977344],
                  [-69.73203995947448, -28.263583501977344],
                  [-69.73203995947448, -28.26312991406161]]], null, false),
            {
              "id": 1,
              "system:index": "368"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4904685994386, -28.462423689098035],
                  [-69.4904685994386, -28.46266892185693],
                  [-69.49023256504529, -28.46266892185693],
                  [-69.49023256504529, -28.462423689098035]]], null, false),
            {
              "id": 1,
              "system:index": "369"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56913159027214, -29.183116639506725],
                  [-69.56913159027214, -29.18338828156147],
                  [-69.56888482704277, -29.18338828156147],
                  [-69.56888482704277, -29.183116639506725]]], null, false),
            {
              "id": 1,
              "system:index": "370"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56827960877592, -29.17933324566233],
                  [-69.56827960877592, -29.179623632333524],
                  [-69.56806503205473, -29.179623632333524],
                  [-69.56806503205473, -29.17933324566233]]], null, false),
            {
              "id": 1,
              "system:index": "371"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56720672516997, -29.18095378012947],
                  [-69.56720672516997, -29.181234795063023],
                  [-69.56704579262907, -29.181234795063023],
                  [-69.56704579262907, -29.18095378012947]]], null, false),
            {
              "id": 1,
              "system:index": "372"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5697709169882, -29.175455099731696],
                  [-69.5697709169882, -29.175773600332327],
                  [-69.56949196725066, -29.175773600332327],
                  [-69.56949196725066, -29.175455099731696]]], null, false),
            {
              "id": 1,
              "system:index": "373"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57004986672575, -29.1700404382843],
                  [-69.57004986672575, -29.170340219398145],
                  [-69.5698782053488, -29.170340219398145],
                  [-69.5698782053488, -29.1700404382843]]], null, false),
            {
              "id": 1,
              "system:index": "374"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58113702430077, -29.187145344819594],
                  [-69.58113702430077, -29.187295210501166],
                  [-69.58085807456322, -29.187295210501166],
                  [-69.58085807456322, -29.187145344819594]]], null, false),
            {
              "id": 1,
              "system:index": "375"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58064349784203, -29.18678941294829],
                  [-69.58064349784203, -29.186939279149904],
                  [-69.58051475180932, -29.186939279149904],
                  [-69.58051475180932, -29.18678941294829]]], null, false),
            {
              "id": 1,
              "system:index": "376"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58410141478299, -29.203994149944716],
                  [-69.58410141478299, -29.20433129201673],
                  [-69.5837795497012, -29.20433129201673],
                  [-69.5837795497012, -29.203994149944716]]], null, false),
            {
              "id": 1,
              "system:index": "377"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58386538038968, -29.20234588385218],
                  [-69.58386538038968, -29.202720492109602],
                  [-69.58358643065213, -29.202720492109602],
                  [-69.58358643065213, -29.20234588385218]]], null, false),
            {
              "id": 1,
              "system:index": "378"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58515284071683, -29.206335391445],
                  [-69.58515284071683, -29.206466499387744],
                  [-69.585002637012, -29.206466499387744],
                  [-69.585002637012, -29.206335391445]]], null, false),
            {
              "id": 1,
              "system:index": "379"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46925148594528, -29.114154935482794],
                  [-69.46925148594528, -29.114445506429636],
                  [-69.4688759766832, -29.114445506429636],
                  [-69.4688759766832, -29.114154935482794]]], null, false),
            {
              "id": 1,
              "system:index": "380"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46433424606968, -29.10457945809787],
                  [-69.46433424606968, -29.105329386714647],
                  [-69.4640123809879, -29.105329386714647],
                  [-69.4640123809879, -29.10457945809787]]], null, false),
            {
              "id": 1,
              "system:index": "381"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46311266039845, -29.101432645950656],
                  [-69.46311266039845, -29.10180762240617],
                  [-69.4628337106609, -29.10180762240617],
                  [-69.4628337106609, -29.101432645950656]]], null, false),
            {
              "id": 1,
              "system:index": "382"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42311650842176, -29.51497011437709],
                  [-69.42311650842176, -29.515548977140934],
                  [-69.42247277825818, -29.515548977140934],
                  [-69.42247277825818, -29.51497011437709]]], null, false),
            {
              "id": 1,
              "system:index": "383"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42433959573255, -29.515100825613153],
                  [-69.42433959573255, -29.51556765007819],
                  [-69.42388898461805, -29.51556765007819],
                  [-69.42388898461805, -29.515100825613153]]], null, false),
            {
              "id": 1,
              "system:index": "384"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66964513203084, -29.53571072357197],
                  [-69.66964513203084, -29.536270798557705],
                  [-69.66932326694905, -29.536270798557705],
                  [-69.66932326694905, -29.53571072357197]]], null, false),
            {
              "id": 1,
              "system:index": "385"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66314071821708, -29.5512885010962],
                  [-69.66314071821708, -29.551605828399147],
                  [-69.66238969969291, -29.551605828399147],
                  [-69.66238969969291, -29.5512885010962]]], null, false),
            {
              "id": 1,
              "system:index": "386"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66700309919852, -29.552203147678068],
                  [-69.66700309919852, -29.552315144649796],
                  [-69.66685289549369, -29.552315144649796],
                  [-69.66685289549369, -29.552203147678068]]], null, false),
            {
              "id": 1,
              "system:index": "387"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6600293557598, -29.551101837511364],
                  [-69.6600293557598, -29.5512885010962],
                  [-69.65975040602225, -29.5512885010962],
                  [-69.65975040602225, -29.551101837511364]]], null, false),
            {
              "id": 1,
              "system:index": "388"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65614537967998, -29.548084831485717],
                  [-69.65614537967998, -29.548364835092254],
                  [-69.65597371830303, -29.548364835092254],
                  [-69.65597371830303, -29.548084831485717]]], null, false),
            {
              "id": 1,
              "system:index": "389"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42331574400347, -29.97509843963227],
                  [-69.42331574400347, -29.97555383357106],
                  [-69.42288659056109, -29.97555383357106],
                  [-69.42288659056109, -29.97509843963227]]], null, false),
            {
              "id": 1,
              "system:index": "390"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4486764943927, -29.96391736432368],
                  [-69.4486764943927, -29.964698126223997],
                  [-69.44798984888489, -29.964698126223997],
                  [-69.44798984888489, -29.96391736432368]]], null, false),
            {
              "id": 1,
              "system:index": "391"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44556019555155, -29.971175705372296],
                  [-69.44556019555155, -29.972030762768835],
                  [-69.44521687279764, -29.972030762768835],
                  [-69.44521687279764, -29.971175705372296]]], null, false),
            {
              "id": 1,
              "system:index": "392"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44500229607645, -29.972439700661482],
                  [-69.44500229607645, -29.972755696971102],
                  [-69.44478771935526, -29.972755696971102],
                  [-69.44478771935526, -29.972439700661482]]], null, false),
            {
              "id": 1,
              "system:index": "393"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42651539779912, -29.84742581802463],
                  [-69.42651539779912, -29.847835267837578],
                  [-69.42606478668462, -29.847835267837578],
                  [-69.42606478668462, -29.84742581802463]]], null, false),
            {
              "id": 1,
              "system:index": "394"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42462712265264, -29.84910082937148],
                  [-69.42462712265264, -29.849566105314402],
                  [-69.42415505386602, -29.849566105314402],
                  [-69.42415505386602, -29.84910082937148]]], null, false),
            {
              "id": 1,
              "system:index": "395"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40338769383213, -29.780535614215168],
                  [-69.40338769383213, -29.782360734704987],
                  [-69.40252938694736, -29.782360734704987],
                  [-69.40252938694736, -29.780535614215168]]], null, false),
            {
              "id": 1,
              "system:index": "396"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39188638157627, -29.78452103840762],
                  [-69.39188638157627, -29.78526595990973],
                  [-69.39115682072422, -29.78526595990973],
                  [-69.39115682072422, -29.78452103840762]]], null, false),
            {
              "id": 1,
              "system:index": "397"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3914195575223, -29.77427913335308],
                  [-69.3914195575223, -29.775284878943953],
                  [-69.39094748873568, -29.775284878943953],
                  [-69.39094748873568, -29.77427913335308]]], null, false),
            {
              "id": 1,
              "system:index": "398"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40270629305697, -29.759042714915182],
                  [-69.40270629305697, -29.76150156026084],
                  [-69.40167632479525, -29.76150156026084],
                  [-69.40167632479525, -29.759042714915182]]], null, false),
            {
              "id": 1,
              "system:index": "399"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3543114131894, -29.724975596991563],
                  [-69.3543114131894, -29.72508740197428],
                  [-69.35377497138641, -29.72508740197428],
                  [-69.35377497138641, -29.724975596991563]]], null, false),
            {
              "id": 1,
              "system:index": "400"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36102766456268, -29.7297644654754],
                  [-69.36102766456268, -29.729894898384472],
                  [-69.36085600318573, -29.729894898384472],
                  [-69.36085600318573, -29.7297644654754]]], null, false),
            {
              "id": 1,
              "system:index": "401"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3053135583645, -29.696096200803755],
                  [-69.3053135583645, -29.69684177941905],
                  [-69.30454108216821, -29.69684177941905],
                  [-69.30454108216821, -29.696096200803755]]], null, false),
            {
              "id": 1,
              "system:index": "402"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.2927608201748, -29.69937670532208],
                  [-69.2927608201748, -29.700290008538428],
                  [-69.29153773286401, -29.700290008538428],
                  [-69.29153773286401, -29.69937670532208]]], null, false),
            {
              "id": 1,
              "system:index": "403"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33770165783484, -29.657593568457862],
                  [-69.33770165783484, -29.657947854635474],
                  [-69.33639273983557, -29.657947854635474],
                  [-69.33639273983557, -29.657593568457862]]], null, false),
            {
              "id": 1,
              "system:index": "404"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52817243648488, -29.718367663543376],
                  [-69.52817243648488, -29.718623899981452],
                  [-69.52797931743581, -29.718623899981452],
                  [-69.52797931743581, -29.718367663543376]]], null, false),
            {
              "id": 1,
              "system:index": "405"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65996216289125, -29.72521767382018],
                  [-69.65996216289125, -29.72540401493931],
                  [-69.65953300944886, -29.72540401493931],
                  [-69.65953300944886, -29.72521767382018]]], null, false),
            {
              "id": 1,
              "system:index": "406"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65454176752836, -29.73072254357575],
                  [-69.65454176752836, -29.73106725546115],
                  [-69.6540804275778, -29.73106725546115],
                  [-69.6540804275778, -29.73072254357575]]], null, false),
            {
              "id": 1,
              "system:index": "407"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6600242027548, -29.72862629715053],
                  [-69.6600242027548, -29.728756731539253],
                  [-69.65939120142728, -29.728756731539253],
                  [-69.65939120142728, -29.72862629715053]]], null, false),
            {
              "id": 1,
              "system:index": "408"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65100606859401, -29.734102257690505],
                  [-69.65100606859401, -29.734512171394492],
                  [-69.65061983049587, -29.734512171394492],
                  [-69.65061983049587, -29.734102257690505]]], null, false),
            {
              "id": 1,
              "system:index": "409"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64536270082668, -29.736505818705172],
                  [-69.64536270082668, -29.736636242849205],
                  [-69.64495500505642, -29.736636242849205],
                  [-69.64495500505642, -29.736505818705172]]], null, false),
            {
              "id": 1,
              "system:index": "410"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65804098612892, -29.6790307537542],
                  [-69.65804098612892, -29.679403607060454],
                  [-69.65716122157204, -29.679403607060454],
                  [-69.65716122157204, -29.6790307537542]]], null, false),
            {
              "id": 1,
              "system:index": "411"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64720486170876, -29.67770711334931],
                  [-69.64720486170876, -29.67804268580515],
                  [-69.64681862361061, -29.67804268580515],
                  [-69.64681862361061, -29.67770711334931]]], null, false),
            {
              "id": 1,
              "system:index": "412"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66413496501076, -29.678788398363615],
                  [-69.66413496501076, -29.678900254770316],
                  [-69.6639633036338, -29.678900254770316],
                  [-69.6639633036338, -29.678788398363615]]], null, false),
            {
              "id": 1,
              "system:index": "413"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66220377452004, -29.67977645898388],
                  [-69.66220377452004, -29.67988831429127],
                  [-69.6616029597007, -29.67988831429127],
                  [-69.6616029597007, -29.67977645898388]]], null, false),
            {
              "id": 1,
              "system:index": "414"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66849013260722, -29.65214529284995],
                  [-69.66849013260722, -29.65272336937208],
                  [-69.66833992890238, -29.65272336937208],
                  [-69.66833992890238, -29.65214529284995]]], null, false),
            {
              "id": 1,
              "system:index": "415"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66479341482413, -29.642132731033364],
                  [-69.66479341482413, -29.64241247371703],
                  [-69.66445009207023, -29.64241247371703],
                  [-69.66445009207023, -29.642132731033364]]], null, false),
            {
              "id": 1,
              "system:index": "416"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66661731695426, -29.643867123143025],
                  [-69.66661731695426, -29.64433335248581],
                  [-69.66638128256095, -29.64433335248581],
                  [-69.66638128256095, -29.643867123143025]]], null, false),
            {
              "id": 1,
              "system:index": "417"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66494361852897, -29.63202417400937],
                  [-69.66494361852897, -29.632359898833663],
                  [-69.66481487249625, -29.632359898833663],
                  [-69.66481487249625, -29.63202417400937]]], null, false),
            {
              "id": 1,
              "system:index": "418"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30885116651685, -28.728648472596426],
                  [-69.30885116651685, -28.728968350228413],
                  [-69.30831472471387, -28.728968350228413],
                  [-69.30831472471387, -28.728648472596426]]], null, false),
            {
              "id": 1,
              "system:index": "419"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30827180936963, -28.729946793379067],
                  [-69.30827180936963, -28.730323115228963],
                  [-69.30799285963208, -28.730323115228963],
                  [-69.30799285963208, -28.729946793379067]]], null, false),
            {
              "id": 1,
              "system:index": "420"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31056778028638, -28.73235522980522],
                  [-69.31056778028638, -28.73299496140204],
                  [-69.30998842313916, -28.73299496140204],
                  [-69.30998842313916, -28.73235522980522]]], null, false),
            {
              "id": 1,
              "system:index": "421"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28373336687874, -28.730527103101732],
                  [-69.28373336687874, -28.73098809462166],
                  [-69.28333639994453, -28.73098809462166],
                  [-69.28333639994453, -28.730527103101732]]], null, false),
            {
              "id": 1,
              "system:index": "422"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31169848918314, -28.72675912694589],
                  [-69.31169848918314, -28.727285993223155],
                  [-69.31139808177348, -28.727285993223155],
                  [-69.31139808177348, -28.72675912694589]]], null, false),
            {
              "id": 1,
              "system:index": "423"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31062560557719, -28.72762469157059],
                  [-69.31062560557719, -28.727925755847025],
                  [-69.31015353679057, -28.727925755847025],
                  [-69.31015353679057, -28.72762469157059]]], null, false),
            {
              "id": 1,
              "system:index": "424"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.29060473591859, -28.722882164346476],
                  [-69.29060473591859, -28.723164424935323],
                  [-69.29023995549257, -28.723164424935323],
                  [-69.29023995549257, -28.722882164346476]]], null, false),
            {
              "id": 1,
              "system:index": "425"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44638084922732, -28.667291830824876],
                  [-69.44638084922732, -28.668459122762936],
                  [-69.44588732276858, -28.668459122762936],
                  [-69.44588732276858, -28.667291830824876]]], null, false),
            {
              "id": 1,
              "system:index": "426"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43919252906741, -28.673711775570347],
                  [-69.43919252906741, -28.67399416879966],
                  [-69.43889212165774, -28.67399416879966],
                  [-69.43889212165774, -28.673711775570347]]], null, false),
            {
              "id": 1,
              "system:index": "427"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45168941047815, -28.679377946063507],
                  [-69.45168941047815, -28.679810925283288],
                  [-69.45138900306848, -28.679810925283288],
                  [-69.45138900306848, -28.679377946063507]]], null, false),
            {
              "id": 1,
              "system:index": "428"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45237605598597, -28.68272878204512],
                  [-69.45237605598597, -28.682917028076975],
                  [-69.45216147926477, -28.682917028076975],
                  [-69.45216147926477, -28.68272878204512]]], null, false),
            {
              "id": 1,
              "system:index": "429"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43751661804346, -28.68197579453402],
                  [-69.43751661804346, -28.682164041919332],
                  [-69.43742005851892, -28.682164041919332],
                  [-69.43742005851892, -28.68197579453402]]], null, false),
            {
              "id": 1,
              "system:index": "430"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4954798820379, -28.674266401104198],
                  [-69.4954798820379, -28.67451584717541],
                  [-69.49515801695611, -28.67451584717541],
                  [-69.49515801695611, -28.674266401104198]]], null, false),
            {
              "id": 1,
              "system:index": "431"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.33364107693141, -28.654543294226723],
                  [-69.33364107693141, -28.654797494654087],
                  [-69.33343722904628, -28.654797494654087],
                  [-69.33343722904628, -28.654543294226723]]], null, false),
            {
              "id": 1,
              "system:index": "432"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34269621456569, -28.652057746464294],
                  [-69.34269621456569, -28.652246047599874],
                  [-69.34233143413967, -28.652246047599874],
                  [-69.34233143413967, -28.652057746464294]]], null, false),
            {
              "id": 1,
              "system:index": "433"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.34361889446681, -28.652773288980615],
                  [-69.34361889446681, -28.6529898337797],
                  [-69.34331848705715, -28.6529898337797],
                  [-69.34331848705715, -28.652773288980615]]], null, false),
            {
              "id": 1,
              "system:index": "434"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27897656821919, -28.673512686306697],
                  [-69.27897656821919, -28.673776253845265],
                  [-69.27862251662923, -28.673776253845265],
                  [-69.27862251662923, -28.673512686306697]]], null, false),
            {
              "id": 1,
              "system:index": "435"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28129051949232, -28.63602145008724],
                  [-69.28129051949232, -28.63608736559944],
                  [-69.28095792557447, -28.63608736559944],
                  [-69.28095792557447, -28.63602145008724]]], null, false),
            {
              "id": 1,
              "system:index": "436"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26132341860404, -28.129836042663957],
                  [-69.26132341860404, -28.1302523505723],
                  [-69.26104446886649, -28.1302523505723],
                  [-69.26104446886649, -28.129836042663957]]], null, false),
            {
              "id": 1,
              "system:index": "437"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28693962936107, -28.087029633532936],
                  [-69.28693962936107, -28.08720947480916],
                  [-69.28670359496776, -28.08720947480916],
                  [-69.28670359496776, -28.087029633532936]]], null, false),
            {
              "id": 1,
              "system:index": "438"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51666578183305, -28.05339907678326],
                  [-69.51666578183305, -28.053896161464788],
                  [-69.51639219651354, -28.053896161464788],
                  [-69.51639219651354, -28.05339907678326]]], null, false),
            {
              "id": 1,
              "system:index": "439"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5167086971773, -28.0519788221725],
                  [-69.5167086971773, -28.052423837302097],
                  [-69.51642974743974, -28.052423837302097],
                  [-69.51642974743974, -28.0519788221725]]], null, false),
            {
              "id": 1,
              "system:index": "440"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51707744672265, -28.054966506338026],
                  [-69.51707744672265, -28.05510379462108],
                  [-69.51693260743585, -28.05510379462108],
                  [-69.51693260743585, -28.054966506338026]]], null, false),
            {
              "id": 1,
              "system:index": "441"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51371250854426, -28.028373046327136],
                  [-69.51371250854426, -28.029073861380795],
                  [-69.51326189742976, -28.029073861380795],
                  [-69.51326189742976, -28.028373046327136]]], null, false),
            {
              "id": 1,
              "system:index": "442"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60366297527341, -28.841129259980956],
                  [-69.60366297527341, -28.842069059537682],
                  [-69.60293341442136, -28.842069059537682],
                  [-69.60293341442136, -28.841129259980956]]], null, false),
            {
              "id": 1,
              "system:index": "443"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62846276588414, -28.85827073243588],
                  [-69.62846276588414, -28.858439869104632],
                  [-69.62826964683507, -28.858439869104632],
                  [-69.62826964683507, -28.85827073243588]]], null, false),
            {
              "id": 1,
              "system:index": "444"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60977311396545, -28.86963989348451],
                  [-69.60977311396545, -28.870955249776284],
                  [-69.60915084147399, -28.870955249776284],
                  [-69.60915084147399, -28.86963989348451]]], null, false),
            {
              "id": 1,
              "system:index": "445"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.18836618087943, -29.6942004383247],
                  [-69.18836618087943, -29.6948155526883],
                  [-69.18742204330619, -29.6948155526883],
                  [-69.18742204330619, -29.6942004383247]]], null, false),
            {
              "id": 1,
              "system:index": "446"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.18624187133963, -29.695728897371737],
                  [-69.18624187133963, -29.69602713057215],
                  [-69.18557668350394, -29.69602713057215],
                  [-69.18557668350394, -29.695728897371737]]], null, false),
            {
              "id": 1,
              "system:index": "447"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.18538356445487, -29.694852832225653],
                  [-69.18538356445487, -29.69511378859992],
                  [-69.1845252575701, -29.69511378859992],
                  [-69.1845252575701, -29.694852832225653]]], null, false),
            {
              "id": 1,
              "system:index": "448"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67641102231731, -29.86826224860686],
                  [-69.67641102231731, -29.868522753384028],
                  [-69.67629300512066, -29.868522753384028],
                  [-69.67629300512066, -29.86826224860686]]], null, false),
            {
              "id": 1,
              "system:index": "449"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67614280141582, -29.867722629404636],
                  [-69.67614280141582, -29.86787149016573],
                  [-69.67604624189129, -29.86787149016573],
                  [-69.67604624189129, -29.867722629404636]]], null, false),
            {
              "id": 1,
              "system:index": "450"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70634447492351, -29.91358913841992],
                  [-69.70634447492351, -29.91381232675493],
                  [-69.70617281354656, -29.91381232675493],
                  [-69.70617281354656, -29.91358913841992]]], null, false),
            {
              "id": 1,
              "system:index": "451"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58644493201474, -29.63129025876372],
                  [-69.58644493201474, -29.63174722060681],
                  [-69.5860586939166, -29.63174722060681],
                  [-69.5860586939166, -29.63129025876372]]], null, false),
            {
              "id": 1,
              "system:index": "452"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58764656165341, -29.633481791590356],
                  [-69.58764656165341, -29.63359369837001],
                  [-69.58748562911252, -29.63359369837001],
                  [-69.58748562911252, -29.633481791590356]]], null, false),
            {
              "id": 1,
              "system:index": "453"
            })]),
    non_vegetated = 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45376654777556, -30.206167438376905],
                  [-69.4152164381428, -30.24834548377071],
                  [-69.3806516489076, -30.202068210814506],
                  [-69.42116373386854, -30.19850751876586]]]),
            {
              "id": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42672542560243, -30.164793018270533],
                  [-69.37934688556336, -30.174884764771136],
                  [-69.36279886570448, -30.142112738114776],
                  [-69.44588297214979, -30.13201763761608]]]),
            {
              "id": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80531684559597, -29.75163466188767],
                  [-69.77029792469753, -29.768921088676258],
                  [-69.7634314696194, -29.725997575804904],
                  [-69.78746406239284, -29.71526382681082],
                  [-69.80531684559597, -29.7307677624164]]]),
            {
              "id": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.29256996373378, -29.184027910909588],
                  [-69.25343116978847, -29.1786324365936],
                  [-69.25068458775722, -29.141455905655757],
                  [-69.26716407994472, -29.131859777766916],
                  [-69.3097361014291, -29.156448061672325]]]),
            {
              "id": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3756540701791, -29.30385406348866],
                  [-69.37222084264003, -29.28588908790188],
                  [-69.38252052525722, -29.27810328379633],
                  [-69.42303261021816, -29.294273136463644]]]),
            {
              "id": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37634071568691, -29.30385406348866],
                  [-69.36809952733073, -29.32136091626567],
                  [-69.3553965854362, -29.316870738993103],
                  [-69.35436661717448, -29.307291033694717],
                  [-69.37633927342448, -29.301902054302715]]]),
            {
              "id": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.29686005589518, -29.322558263494273],
                  [-69.32363923069987, -29.315074612750752],
                  [-69.30235321995768, -29.33303445219957]]]),
            {
              "id": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.374450998278, -29.33946929164191],
                  [-69.38749726292643, -29.34635262368859],
                  [-69.37960083958659, -29.351888879494897],
                  [-69.36947281834635, -29.35084150281895],
                  [-69.3693011569694, -29.343659201294404]]]),
            {
              "id": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.41891129490885, -29.31806813892228],
                  [-69.42234452244791, -29.32151058543783],
                  [-69.42148621556315, -29.32525224337187],
                  [-69.41427643773112, -29.326000558488158],
                  [-69.4132464694694, -29.320163554983107]]]),
            {
              "id": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23831904174416, -29.27484003914033],
                  [-69.22304117919533, -29.269149856227003],
                  [-69.22784769775002, -29.25582160929268],
                  [-69.23797571899026, -29.25447371232717],
                  [-69.24123728515237, -29.263908618061002]]]),
            {
              "id": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16776621581643, -29.246236178290015],
                  [-69.18699229003518, -29.23799798104641],
                  [-69.20055353881448, -29.240993765862243],
                  [-69.1964336657676, -29.257918302600324],
                  [-69.18956721068948, -29.257319251755405],
                  [-69.16999781371682, -29.256121139539538]]]),
            {
              "id": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16999781371682, -29.256121139539538],
                  [-69.16501963378518, -29.270198071616836],
                  [-69.15557825805276, -29.26196180402559],
                  [-69.15609324218362, -29.25806806476331]]]),
            {
              "id": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50618298087458, -29.121474625474065],
                  [-69.49167759452205, -29.118250399635894],
                  [-69.49004681144099, -29.109552009605647],
                  [-69.4944241765533, -29.10430260992329],
                  [-69.50369389090876, -29.107452281864926]]]),
            {
              "id": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60034916289302, -29.194750341422658],
                  [-69.58867618926021, -29.19032953312297],
                  [-69.58713123686763, -29.186732802734404],
                  [-69.58824703581783, -29.17863969824061],
                  [-69.59871837981197, -29.17863969824061]]]),
            {
              "id": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64111873991939, -29.213255723852782],
                  [-69.62257931120845, -29.20943504814956],
                  [-69.62421009428951, -29.19849663994129],
                  [-69.64017460234615, -29.199845273898887]]]),
            {
              "id": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67939922697994, -29.250737296930673],
                  [-69.66077396758052, -29.25635362225245],
                  [-69.66369221098873, -29.239247518924543],
                  [-69.67914173491451, -29.24074540400672]]]),
            {
              "id": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60987636931392, -29.27702485163748],
                  [-69.5975167501733, -29.27380551377051],
                  [-69.5975167501733, -29.267067036520928],
                  [-69.61313793547603, -29.272308112769394]]]),
            {
              "id": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68532154448482, -29.306144019811537],
                  [-69.66815540678951, -29.305994328099008],
                  [-69.66721126921627, -29.29835975968941],
                  [-69.682832454519, -29.298284908153477]]]),
            {
              "id": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.69536373503658, -29.328819777960476],
                  [-69.6817166555688, -29.32567690445419],
                  [-69.68180248625728, -29.317445110104703],
                  [-69.69622204192135, -29.321037247509654]]]),
            {
              "id": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70943996794674, -29.296787865911956],
                  [-69.70454761870357, -29.30846421328399],
                  [-69.69699451811763, -29.304347704772823],
                  [-69.69708034880611, -29.296638160480672]]]),
            {
              "id": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59437906350078, -29.30458212274449],
                  [-69.58768426979961, -29.29432757608543],
                  [-69.59549486245098, -29.28788988927717],
                  [-69.60588037575664, -29.29792052715833]]]),
            {
              "id": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59446489418926, -29.304656969663657],
                  [-69.59970056618633, -29.3253874529661],
                  [-69.58777010048809, -29.3267344144367],
                  [-69.58648264016094, -29.30839924565027]]]),
            {
              "id": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66028726904405, -29.434149876253816],
                  [-69.64157617895616, -29.43317809879479],
                  [-69.64260614721788, -29.42435692425942],
                  [-69.65728319494737, -29.42570257667464]]]),
            {
              "id": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6436361154796, -29.466960592590468],
                  [-69.62981737463487, -29.46845513334027],
                  [-69.62664163916124, -29.458964425438676],
                  [-69.62689913122666, -29.45268661888785],
                  [-69.64492357580674, -29.453135046524064]]]),
            {
              "id": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50817889475778, -29.341705895794234],
                  [-69.51332873606637, -29.359960270211786],
                  [-69.50199908518746, -29.36040910706888],
                  [-69.49890918040231, -29.3562198861504],
                  [-69.50062579417184, -29.344848275225246]]]),
            {
              "id": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51753296299228, -29.37190357188028],
                  [-69.51178230686435, -29.36861242718717],
                  [-69.5050016824747, -29.365769989334428],
                  [-69.51933540745028, -29.3625534508056]]]),
            {
              "id": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5240560953165, -29.37968221819009],
                  [-69.52276863498935, -29.382599057287837],
                  [-69.51530136509189, -29.382374688017848],
                  [-69.51272644443759, -29.373997881288492],
                  [-69.5232836191202, -29.374147473168886]]]),
            {
              "id": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52391996510065, -29.39772353910553],
                  [-69.517139340711, -29.397424424444672],
                  [-69.51482191212213, -29.39405932388812],
                  [-69.51413526661432, -29.390170624578168],
                  [-69.52349081165826, -29.39405932388812]]]),
            {
              "id": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50417890675104, -29.372445247006677],
                  [-69.49533834583795, -29.376708594476536],
                  [-69.49319257862604, -29.369827313585752],
                  [-69.50168981678522, -29.36990211261774]]]),
            {
              "id": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49027433521783, -29.355988547260367],
                  [-69.49336424000299, -29.36107544751237],
                  [-69.4845236790899, -29.361973109419477],
                  [-69.48289289600885, -29.35501602269787],
                  [-69.48460950977838, -29.35449235178009],
                  [-69.48778524525201, -29.35471678250304]]]),
            {
              "id": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4600639560053, -29.4023040748832],
                  [-69.4600639560053, -29.40439775855532],
                  [-69.45671655915471, -29.41008039689063],
                  [-69.44590189240667, -29.413220665994665],
                  [-69.45216753266546, -29.405444584222938],
                  [-69.45474245331975, -29.39968690966385],
                  [-69.45989229462835, -29.399013913433645]]]),
            {
              "id": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.42443729417973, -29.39037056817536],
                  [-69.4204890825098, -29.402634398447102],
                  [-69.40984607713871, -29.403980338527187],
                  [-69.39971805589848, -29.396203549922145],
                  [-69.40246463792973, -29.384537251937598],
                  [-69.41963077562504, -29.384686828326863]]]),
            {
              "id": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.313544044668, -29.400241572088397],
                  [-69.29139972704105, -29.38034902376593],
                  [-69.32573200243168, -29.37855401606586]]]),
            {
              "id": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23698307054691, -29.401032429076174],
                  [-69.25723911302738, -29.37949462569995],
                  [-69.2750918962305, -29.39953689563864],
                  [-69.27663684862308, -29.398938676104763]]]),
            {
              "id": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24573780077152, -29.420322838079116],
                  [-69.28041339891605, -29.41404264176616],
                  [-69.28161502855473, -29.426901675015497],
                  [-69.26204563158207, -29.44454281579104],
                  [-69.23955799120121, -29.433928598362563]]]),
            {
              "id": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3777706738721, -29.022078794376217],
                  [-69.37382246220218, -29.034987132893068],
                  [-69.34137846195804, -29.03933958081779],
                  [-69.341550123335, -29.02072782845943],
                  [-69.36764265263187, -29.01607436614618]]]),
            {
              "id": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44729353153812, -28.957963504895694],
                  [-69.48196912968265, -28.959465488417084],
                  [-69.47973753178226, -28.983794585376668],
                  [-69.44729353153812, -28.983344098528047],
                  [-69.44780851566898, -28.971630751860644]]]),
            {
              "id": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39201856815922, -28.993254355942792],
                  [-69.39047361576664, -28.994005094318993],
                  [-69.38309217655765, -28.986797780892836],
                  [-69.38360716068851, -28.98064113623516],
                  [-69.40145994389164, -28.98064113623516]]]),
            {
              "id": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32884718144047, -28.972982359538644],
                  [-69.3254139539014, -28.962919967827528],
                  [-69.34240843021976, -28.96156822874209]]]),
            {
              "id": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35665632450687, -28.95090389050886],
                  [-69.3606045361768, -28.939487325666907],
                  [-69.37416578495609, -28.949251570838026],
                  [-69.36197782719242, -28.96066705954647]]]),
            {
              "id": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30498625004398, -28.833222988584463],
                  [-69.30361295902836, -28.85307125974279],
                  [-69.29743314945804, -28.827207613435938]]]),
            {
              "id": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30861024674245, -28.81685085575245],
                  [-69.32938127335377, -28.817753273940497],
                  [-69.34156923111745, -28.840611926057107],
                  [-69.33453111466237, -28.844671819451207],
                  [-69.31770829972096, -28.837905242446748]]]),
            {
              "id": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.2644932728655, -28.804817866128325],
                  [-69.27676706131764, -28.804742655572753],
                  [-69.27453546341725, -28.81339151359578],
                  [-69.26389245804616, -28.81000726335716]]]),
            {
              "id": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36349078772217, -28.902950714457624],
                  [-69.3627027147851, -28.907817584681688],
                  [-69.35961280999994, -28.90676567447194],
                  [-69.36021362481928, -28.902557926994767]]]),
            {
              "id": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37634979425287, -28.91480500320473],
                  [-69.38313041864252, -28.913753163841072],
                  [-69.3835595720849, -28.91735942582506],
                  [-69.37832390008784, -28.919688403384985]]]),
            {
              "id": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38845192132807, -28.922242705731517],
                  [-69.39574752984858, -28.92382033163184],
                  [-69.3953183764062, -28.92802721668183],
                  [-69.38682113824702, -28.928703307286217],
                  [-69.38596283136225, -28.928177459419395]]]),
            {
              "id": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39119850335932, -28.91600709227425],
                  [-69.38647781549311, -28.918035585988342],
                  [-69.38647781549311, -28.91225051767705],
                  [-69.38733612237787, -28.912551048651185],
                  [-69.39076934991694, -28.914354216212047]]]),
            {
              "id": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3491414660058, -28.91914008325565],
                  [-69.34725319085932, -28.918163416450426],
                  [-69.34639488397455, -28.91373073612929],
                  [-69.35034309564448, -28.910875689190444],
                  [-69.35489212213373, -28.91530849151617]]]),
            {
              "id": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3294004076562, -28.905616186518795],
                  [-69.33918510614252, -28.904413977046367],
                  [-69.33789764581537, -28.910124347989225],
                  [-69.33077369867182, -28.908546513755503]]]),
            {
              "id": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3154661563238, -28.86480280022129],
                  [-69.3242208865484, -28.86517863549504],
                  [-69.32499336274469, -28.870665675726787],
                  [-69.32104515107477, -28.87126697759052],
                  [-69.31495117219293, -28.86931273381199]]]),
            {
              "id": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30962966950739, -28.849693096958962],
                  [-69.31718277009332, -28.850971117059004],
                  [-69.31744026215875, -28.8533015838697],
                  [-69.31254791291559, -28.85495543185915],
                  [-69.31168960603082, -28.854654734181143]]]),
            {
              "id": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37614845307672, -28.85127182538843],
                  [-69.38267158540094, -28.85217394515989],
                  [-69.38121246369684, -28.855406476745745],
                  [-69.37709259064997, -28.85427886086087]]]),
            {
              "id": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.37709259064997, -28.85427886086087],
                  [-69.38413070710504, -28.84217501378931],
                  [-69.38773559602106, -28.849178744278717],
                  [-69.38601898225153, -28.850156060013052]]]),
            {
              "id": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4445687144948, -28.74811496349459],
                  [-69.44173630177508, -28.743825544523457],
                  [-69.43744476735125, -28.74510486335149],
                  [-69.43199451863299, -28.752479454612963],
                  [-69.42984875142108, -28.7460079025027],
                  [-69.43989094197283, -28.742169932194667],
                  [-69.44546993672381, -28.74743769852561]]]),
            {
              "id": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4586878627492, -28.7296391064282],
                  [-69.46443851887713, -28.731445444268257],
                  [-69.45928867756854, -28.73693952997222],
                  [-69.45079143940936, -28.733552798958844],
                  [-69.4517355769826, -28.73159597101247]]]),
            {
              "id": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36247166096697, -28.709315654995248],
                  [-69.35517605244647, -28.709089816681796],
                  [-69.35045536458026, -28.705099926090316],
                  [-69.35388859211932, -28.699905312242954],
                  [-69.36255749165545, -28.705175208453227]]]),
            {
              "id": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39894970356951, -28.66805443618913],
                  [-69.39929302632342, -28.664439540466145],
                  [-69.40161045491229, -28.659845430574624],
                  [-69.40950687825213, -28.66187891388952],
                  [-69.40976437031756, -28.6666988649052],
                  [-69.40693195759783, -28.672121044827055]]]),
            {
              "id": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44585203278288, -28.642852031739906],
                  [-69.45589422333464, -28.645111821396142],
                  [-69.45598005402312, -28.650987046654624],
                  [-69.44748281586394, -28.648049475166165]]]),
            {
              "id": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49623464691862, -28.63705168213475],
                  [-69.48593496430144, -28.638784287682583],
                  [-69.48301672089323, -28.63155235328344],
                  [-69.48353170502409, -28.62703214119849],
                  [-69.49700712311491, -28.626052736255804]]]),
            {
              "id": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35248052426998, -28.36826299264464],
                  [-69.35625707456295, -28.36871613233871],
                  [-69.35282384702388, -28.37581506821424],
                  [-69.34973394223873, -28.376268175652232]]]),
            {
              "id": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.20948659726803, -28.37294534282734],
                  [-69.22236120053951, -28.37052867176271],
                  [-69.22733938047115, -28.376570246202263],
                  [-69.21686803647701, -28.38381968131522],
                  [-69.20965825864498, -28.379590904387985]]]),
            {
              "id": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38011800595943, -28.38366865647154],
                  [-69.39264928647701, -28.38381968131522],
                  [-69.3813196355981, -28.39076659159237],
                  [-69.37891637632076, -28.388048289606115]]]),
            {
              "id": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46388875791256, -28.473943091159622],
                  [-69.46423208066646, -28.467303450129865],
                  [-69.47504674741451, -28.466699825710265],
                  [-69.47830831357662, -28.478771658906833],
                  [-69.47298681089107, -28.47997876635445],
                  [-69.46612035581295, -28.479526102678335]]]),
            {
              "id": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55838834592525, -28.419504506246398],
                  [-69.5637098486108, -28.420108400054797],
                  [-69.56525480100338, -28.424260076743643],
                  [-69.55864583799068, -28.425920701831078],
                  [-69.55632840940181, -28.422901364113574]]]),
            {
              "id": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53296094337539, -28.39147438607344],
                  [-69.5431747953041, -28.390492791617152],
                  [-69.54223065773085, -28.39427685085872],
                  [-69.53699498573378, -28.39427685085872],
                  [-69.53321843544082, -28.394503365376636]]]),
            {
              "id": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5072975675209, -28.399411061056814],
                  [-69.5142498532875, -28.39805202962203],
                  [-69.51691060463027, -28.400960057185095],
                  [-69.50961499610976, -28.403300536251823],
                  [-69.50746922889785, -28.402847544338204]]]),
            {
              "id": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50867085853652, -28.38132819794205],
                  [-69.51333248819607, -28.38261470123316],
                  [-69.51453411783474, -28.384729050486026],
                  [-69.51135838236111, -28.38691886776677],
                  [-69.50895512308377, -28.38586172024332],
                  [-69.50792515482205, -28.38367188112946]]]),
            {
              "id": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54440319742459, -28.373326167680865],
                  [-69.55015385355252, -28.369927720470958],
                  [-69.55307209696072, -28.37468551608256],
                  [-69.54663479532498, -28.37657347107603]]]),
            {
              "id": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5110150596072, -28.336692724270968],
                  [-69.51934063638943, -28.33412413252616],
                  [-69.52191555704373, -28.340016691998315],
                  [-69.51556408609646, -28.339185709816427]]]),
            {
              "id": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.48672497476834, -28.33027112848684],
                  [-69.49556553568142, -28.329288967859114],
                  [-69.4959946891238, -28.334048584770137],
                  [-69.4930764457156, -28.334426323013112]]]),
            {
              "id": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.25683985987106, -28.04005037371719],
                  [-69.24516688623825, -28.044444121228942],
                  [-69.24585353174606, -28.03474733600011],
                  [-69.25975810327927, -28.035201892332086]]]),
            {
              "id": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46558009424606, -28.046868180959738],
                  [-69.46609507837692, -28.053534063489142],
                  [-69.45905696192185, -28.056260896326904],
                  [-69.45545207300583, -28.044292615681734],
                  [-69.46489344873825, -28.044595626562746]]]),
            {
              "id": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57098017969528, -28.065804266556395],
                  [-69.57630168238083, -28.07792161056987],
                  [-69.56737529077927, -28.08140509400491],
                  [-69.56789027491013, -28.06928814293949]]]),
            {
              "id": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64582454004685, -28.053231077793455],
                  [-69.63655482569138, -28.052776597649043],
                  [-69.63483821192185, -28.044747131683135],
                  [-69.64582454004685, -28.0441411099211]]]),
            {
              "id": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65543757715622, -28.07792161056987],
                  [-69.67037211695114, -28.084131219615237],
                  [-69.66522227564255, -28.09518646392318],
                  [-69.65131770410935, -28.08685727601549]]]),
            {
              "id": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81744698160024, -28.24162239283158],
                  [-69.80886391275259, -28.237992887991428],
                  [-69.80766228311391, -28.232936069824937],
                  [-69.81813362710805, -28.236263278339315]]]),
            {
              "id": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76097038858266, -28.236329323671452],
                  [-69.77813652627798, -28.239807655847308],
                  [-69.77264336221548, -28.251451681605957],
                  [-69.76079872720571, -28.24661276034601]]]),
            {
              "id": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75805214517446, -28.271561094830183],
                  [-69.77556160562368, -28.27443355838821],
                  [-69.77744988077016, -28.28259697927432],
                  [-69.75650719278188, -28.28425982162874]]]),
            {
              "id": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87676831356215, -28.373363833276468],
                  [-69.86543866268325, -28.37366591209716],
                  [-69.86586781612563, -28.370720606903927],
                  [-69.87342091671157, -28.370947171744888]]]),
            {
              "id": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.93873807064223, -28.37751734165785],
                  [-69.9436304198854, -28.37751734165785],
                  [-69.9465486632936, -28.381670687395285],
                  [-69.93839474788832, -28.382501337024138],
                  [-69.93762227169204, -28.380160398673674]]]),
            {
              "id": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.9461202587937, -28.41617294627389],
                  [-69.94028377197729, -28.41821113820169],
                  [-69.93504809998022, -28.41670137017038],
                  [-69.93762302063452, -28.414361187181555],
                  [-69.94234370850073, -28.41390824256537]]]),
            {
              "id": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.95942401550757, -28.443345612311234],
                  [-69.95461749695288, -28.441987144715856],
                  [-69.95736407898413, -28.43670404933831],
                  [-69.96423053406225, -28.437911637255752],
                  [-69.96611880920874, -28.441836202795]]]),
            {
              "id": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90234660767065, -28.436024775077794],
                  [-69.90517902039038, -28.43670404933831],
                  [-69.90535068176733, -28.438364479171316],
                  [-69.90080165527807, -28.438590899402246]]]),
            {
              "id": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.85445308350073, -28.45286638133891],
                  [-69.85745715759741, -28.452715454944645],
                  [-69.85599803589331, -28.45731861304743],
                  [-69.85256480835424, -28.455658480772893]]]),
            {
              "id": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.842895213649, -28.499235736421888],
                  [-69.84461182741853, -28.501574041262312],
                  [-69.84195107607576, -28.50232832209312]]]),
            {
              "id": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84126443056795, -28.50036718071798],
                  [-69.8374020495865, -28.50474198451727],
                  [-69.83525628237459, -28.50225289425269],
                  [-69.83791703371736, -28.49938659636228]]]),
            {
              "id": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.85646007860011, -28.500828780318784],
                  [-69.86341236436671, -28.502865340571443],
                  [-69.86152408922023, -28.505806969318275],
                  [-69.855000956896, -28.504373878379113],
                  [-69.855000956896, -28.503242477045397]]]),
            {
              "id": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60167609274045, -29.00367957330593],
                  [-69.60828505575314, -29.006682191251475],
                  [-69.60262023031369, -29.009834846197688],
                  [-69.59858618795529, -29.006682191251475]]]),
            {
              "id": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56912534958145, -28.76011515988937],
                  [-69.56191557174942, -28.75785785233861],
                  [-69.56191557174942, -28.75123613530461],
                  [-69.56929701095841, -28.75123613530461]]]),
            {
              "id": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57856672531388, -28.74927963854876],
                  [-69.58817976242325, -28.748677632173045],
                  [-69.5880081010463, -28.75289160393053],
                  [-69.58268659836075, -28.753343090819218]]]),
            {
              "id": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61307066208145, -28.734830527906798],
                  [-69.60637586838028, -28.731067410729136],
                  [-69.61410063034317, -28.727454690766034]]]),
            {
              "id": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63246839767716, -28.793216728382184],
                  [-69.63899153000138, -28.797729764718323],
                  [-69.63401335006974, -28.801941755671603]]]),
            {
              "id": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53874128586075, -28.86810781888302],
                  [-69.52689665085099, -28.86089174755206],
                  [-69.53359144455216, -28.853374473918404],
                  [-69.5444061113002, -28.85863662252913]]]),
            {
              "id": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49307935959122, -28.78749993521288],
                  [-69.48192137008927, -28.777720483462296],
                  [-69.4894744706752, -28.773056114312674],
                  [-69.49908750778458, -28.78042873113739]]]),
            {
              "id": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.40570433542929, -28.77400942726853],
                  [-69.41394408152304, -28.79146196624271],
                  [-69.40158446238242, -28.79386898378585],
                  [-69.39454634592734, -28.78198379448903]]]),
            {
              "id": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5115722005486, -28.91625880662828],
                  [-69.49852593590016, -28.91505672047595],
                  [-69.49595101524586, -28.906341179267198],
                  [-69.50848229576344, -28.905890355497053]]]),
            {
              "id": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5112288777947, -28.945855781726618],
                  [-69.49989922691579, -28.940297603575985],
                  [-69.50453408409352, -28.92918035283058],
                  [-69.52084191490407, -28.931133469709515]]]),
            {
              "id": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65782769371266, -28.870870394018173],
                  [-69.64478142906422, -28.86004638686195],
                  [-69.6547377889275, -28.852980107519237],
                  [-69.66297753502126, -28.85914433538787]]]),
            {
              "id": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74949486900563, -28.79703432333531],
                  [-69.73301537681813, -28.79116729885694],
                  [-69.73696358848805, -28.781689100318847],
                  [-69.74897988487477, -28.786202635636982]]]),
            {
              "id": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24938192025947, -29.6710724764768],
                  [-69.24938192025947, -29.68031956229871],
                  [-69.24182881967353, -29.68031956229871],
                  [-69.24182881967353, -29.6710724764768]]], null, false),
            {
              "id": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23667897836494, -29.667492731086195],
                  [-69.23667897836494, -29.67405550030338],
                  [-69.23152913705634, -29.67405550030338],
                  [-69.23152913705634, -29.667492731086195]]], null, false),
            {
              "id": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23599233285712, -29.63974538510672],
                  [-69.23599233285712, -29.65257575399525],
                  [-69.21607961313056, -29.65257575399525],
                  [-69.21607961313056, -29.63974538510672]]], null, false),
            {
              "id": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.23839559213447, -29.6191537021215],
                  [-69.23839559213447, -29.62900242347335],
                  [-69.23221578256415, -29.62900242347335],
                  [-69.23221578256415, -29.6191537021215]]], null, false),
            {
              "id": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.25212850229072, -29.606319075506995],
                  [-69.25212850229072, -29.611094941419026],
                  [-69.24869527475165, -29.611094941419026],
                  [-69.24869527475165, -29.606319075506995]]], null, false),
            {
              "id": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24526204721259, -29.626614943060417],
                  [-69.24526204721259, -29.63467246268467],
                  [-69.23942556039619, -29.63467246268467],
                  [-69.23942556039619, -29.626614943060417]]], null, false),
            {
              "id": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24629201547431, -29.65496261894415],
                  [-69.24629201547431, -29.655857678705107],
                  [-69.24629201547431, -29.655857678705107],
                  [-69.24629201547431, -29.65496261894415]]], null, false),
            {
              "id": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26277150766181, -29.65764777434365],
                  [-69.26277150766181, -29.667492731086195],
                  [-69.2514418567829, -29.667492731086195],
                  [-69.2514418567829, -29.65764777434365]]], null, false),
            {
              "id": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1250990833454, -29.65376919354589],
                  [-69.1250990833454, -29.662719539043692],
                  [-69.11617269174384, -29.662719539043692],
                  [-69.11617269174384, -29.65376919354589]]], null, false),
            {
              "id": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12200917856025, -29.681512672715442],
                  [-69.12200917856025, -29.68509191900106],
                  [-69.11891927377509, -29.68509191900106],
                  [-69.11891927377509, -29.681512672715442]]], null, false),
            {
              "id": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10758962289619, -29.685390183771855],
                  [-69.10758962289619, -29.689267545245617],
                  [-69.10449971811103, -29.689267545245617],
                  [-69.10449971811103, -29.685390183771855]]], null, false),
            {
              "id": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10243978158759, -29.65168066504494],
                  [-69.10243978158759, -29.65555932633601],
                  [-69.09900655404853, -29.65555932633601],
                  [-69.09900655404853, -29.65168066504494]]], null, false),
            {
              "id": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11754598275947, -29.623033616358605],
                  [-69.11754598275947, -29.630792996652218],
                  [-69.11273946420478, -29.630792996652218],
                  [-69.11273946420478, -29.623033616358605]]], null, false),
            {
              "id": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12818898813056, -29.604528067467573],
                  [-69.12818898813056, -29.607513063193583],
                  [-69.12612905160712, -29.607513063193583],
                  [-69.12612905160712, -29.604528067467573]]], null, false),
            {
              "id": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.14020528451728, -29.57855487680411],
                  [-69.14020528451728, -29.581839212668882],
                  [-69.13436879770087, -29.581839212668882],
                  [-69.13436879770087, -29.57855487680411]]], null, false),
            {
              "id": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10930623666572, -29.57019426696876],
                  [-69.10930623666572, -29.574673251194035],
                  [-69.10724630014228, -29.574673251194035],
                  [-69.10724630014228, -29.57019426696876]]], null, false),
            {
              "id": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12338246957587, -29.545705642041522],
                  [-69.12338246957587, -29.549289713989065],
                  [-69.12166585580634, -29.549289713989065],
                  [-69.12166585580634, -29.545705642041522]]], null, false),
            {
              "id": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12338246957587, -29.526887179540736],
                  [-69.12338246957587, -29.531069362736634],
                  [-69.12200917856025, -29.531069362736634],
                  [-69.12200917856025, -29.526887179540736]]], null, false),
            {
              "id": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1086195911579, -29.52419854189276],
                  [-69.1086195911579, -29.52748464486966],
                  [-69.10621633188056, -29.52748464486966],
                  [-69.10621633188056, -29.52419854189276]]], null, false),
            {
              "id": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.95637605118768, -29.543759365483822],
                  [-68.95637605118768, -29.54764217911924],
                  [-68.9525995008947, -29.54764217911924],
                  [-68.9525995008947, -29.543759365483822]]], null, false),
            {
              "id": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1225442640783, -29.510301256379265],
                  [-69.1225442640783, -29.512542100431606],
                  [-69.12099931168572, -29.512542100431606],
                  [-69.12099931168572, -29.510301256379265]]], null, false),
            {
              "id": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10434815812127, -29.508060362720872],
                  [-69.10434815812127, -29.511795157926088],
                  [-69.10125825333611, -29.511795157926088],
                  [-69.10125825333611, -29.508060362720872]]], null, false),
            {
              "id": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09078690934197, -29.51224332409084],
                  [-69.09078690934197, -29.514334739955597],
                  [-69.09010026383416, -29.514334739955597],
                  [-69.09010026383416, -29.51224332409084]]], null, false),
            {
              "id": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08134553360955, -29.510301256379265],
                  [-69.08134553360955, -29.510898819643685],
                  [-69.0811738722326, -29.510898819643685],
                  [-69.0811738722326, -29.510301256379265]]], null, false),
            {
              "id": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07688233780877, -29.513139650467366],
                  [-69.07688233780877, -29.514185354541283],
                  [-69.0756807081701, -29.514185354541283],
                  [-69.0756807081701, -29.513139650467366]]], null, false),
            {
              "id": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07362077164666, -29.51567919876235],
                  [-69.07362077164666, -29.516426112604318],
                  [-69.07207581925408, -29.516426112604318],
                  [-69.07207581925408, -29.51567919876235]]], null, false),
            {
              "id": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07121751236932, -29.52284934408079],
                  [-69.07121751236932, -29.525089910296344],
                  [-69.06950089859978, -29.525089910296344],
                  [-69.06950089859978, -29.52284934408079]]], null, false),
            {
              "id": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1144761793615, -29.579147187237655],
                  [-69.1144761793615, -29.58064007166387],
                  [-69.11327454972283, -29.58064007166387],
                  [-69.11327454972283, -29.579147187237655]]], null, false),
            {
              "id": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1584214918615, -29.534350390866972],
                  [-69.1584214918615, -29.536142644011722],
                  [-69.15704820084588, -29.536142644011722],
                  [-69.15704820084588, -29.534350390866972]]], null, false),
            {
              "id": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.15756318497674, -29.54181790273675],
                  [-69.15756318497674, -29.545999468475884],
                  [-69.15498826432244, -29.545999468475884],
                  [-69.15498826432244, -29.54181790273675]]], null, false),
            {
              "id": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1555032484533, -29.550628857343373],
                  [-69.1555032484533, -29.551972833748778],
                  [-69.15395829606072, -29.551972833748778],
                  [-69.15395829606072, -29.550628857343373]]], null, false),
            {
              "id": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.01307032671102, -29.3810313736916],
                  [-69.01307032671102, -29.383125495283426],
                  [-69.01083872881063, -29.383125495283426],
                  [-69.01083872881063, -29.3810313736916]]], null, false),
            {
              "id": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.02285502519734, -29.37070971628003],
                  [-69.02285502519734, -29.371906483824155],
                  [-69.02182505693563, -29.371906483824155],
                  [-69.02182505693563, -29.37070971628003]]], null, false),
            {
              "id": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.02783320512899, -29.372654456394805],
                  [-69.02783320512899, -29.375646291718354],
                  [-69.02525828447469, -29.375646291718354],
                  [-69.02525828447469, -29.372654456394805]]], null, false),
            {
              "id": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07486842241414, -29.365922505419956],
                  [-69.07486842241414, -29.367418532992936],
                  [-69.07315180864461, -29.367418532992936],
                  [-69.07315180864461, -29.365922505419956]]], null, false),
            {
              "id": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.06937525835164, -29.36517448339086],
                  [-69.06937525835164, -29.367268931224775],
                  [-69.06851695146688, -29.367268931224775],
                  [-69.06851695146688, -29.36517448339086]]], null, false),
            {
              "id": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07785203256238, -29.365670379748682],
                  [-69.07785203256238, -29.36641839813489],
                  [-69.07733704843152, -29.36641839813489],
                  [-69.07733704843152, -29.365670379748682]]], null, false),
            {
              "id": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.06308915414441, -29.373337307694285],
                  [-69.06308915414441, -29.37363649317676],
                  [-69.06283166207898, -29.37363649317676],
                  [-69.06283166207898, -29.373337307694285]]], null, false),
            {
              "id": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.0607288102113, -29.37430965729719],
                  [-69.0607288102113, -29.375506382519216],
                  [-69.05999924935925, -29.375506382519216],
                  [-69.05999924935925, -29.37430965729719]]], null, false),
            {
              "id": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.95623998596669, -29.158353313918617],
                  [-68.95623998596669, -29.167946967439104],
                  [-68.95074682190419, -29.167946967439104],
                  [-68.95074682190419, -29.158353313918617]]], null, false),
            {
              "id": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.92465429260731, -29.149358449697647],
                  [-68.92465429260731, -29.157154044202155],
                  [-68.92259435608388, -29.157154044202155],
                  [-68.92259435608388, -29.149358449697647]]], null, false),
            {
              "id": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.00018529846669, -29.11996973847517],
                  [-69.00018529846669, -29.12656793560598],
                  [-68.99949865295888, -29.12656793560598],
                  [-68.99949865295888, -29.11996973847517]]], null, false),
            {
              "id": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.20205907776356, -29.085172245721708],
                  [-69.20205907776356, -29.091172652658777],
                  [-69.19931249573231, -29.091172652658777],
                  [-69.19931249573231, -29.085172245721708]]], null, false),
            {
              "id": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.21853856995106, -29.13136635851877],
                  [-69.21853856995106, -29.14036279784676],
                  [-69.21304540588856, -29.14036279784676],
                  [-69.21304540588856, -29.13136635851877]]], null, false),
            {
              "id": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.20686559631825, -29.158353313918617],
                  [-69.20686559631825, -29.161951039036435],
                  [-69.20480565979481, -29.161951039036435],
                  [-69.20480565979481, -29.158353313918617]]], null, false),
            {
              "id": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28788976624013, -29.199719540337234],
                  [-69.28788976624013, -29.20211707095282],
                  [-69.28514318420888, -29.20211707095282],
                  [-69.28514318420888, -29.199719540337234]]], null, false),
            {
              "id": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.28582982971669, -29.21710036678524],
                  [-69.28582982971669, -29.225490055445828],
                  [-69.27965002014638, -29.225490055445828],
                  [-69.27965002014638, -29.21710036678524]]], null, false),
            {
              "id": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.29544286682606, -29.253650411800095],
                  [-69.29544286682606, -29.265032186125982],
                  [-69.28857641174794, -29.265032186125982],
                  [-69.28857641174794, -29.253650411800095]]], null, false),
            {
              "id": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.35449438049794, -29.167347390356994],
                  [-69.35449438049794, -29.173942545643808],
                  [-69.34831457092763, -29.173942545643808],
                  [-69.34831457092763, -29.167347390356994]]], null, false),
            {
              "id": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31604223206044, -29.13136635851877],
                  [-69.31604223206044, -29.13496502873744],
                  [-69.31192235901356, -29.13496502873744],
                  [-69.31192235901356, -29.13136635851877]]], null, false),
            {
              "id": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.32840185120106, -29.077971295965614],
                  [-69.32840185120106, -29.086972404510004],
                  [-69.32153539612294, -29.086972404510004],
                  [-69.32153539612294, -29.077971295965614]]], null, false),
            {
              "id": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38745336487294, -29.110371605201454],
                  [-69.38745336487294, -29.120569592070655],
                  [-69.38745336487294, -29.120569592070655],
                  [-69.38745336487294, -29.110371605201454]]], null, false),
            {
              "id": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.39843969299794, -29.14635998658758],
                  [-69.39843969299794, -29.151757157175577],
                  [-69.39363317444325, -29.151757157175577],
                  [-69.39363317444325, -29.14635998658758]]], null, false),
            {
              "id": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38470678284169, -29.132565929255687],
                  [-69.38470678284169, -29.139763059722494],
                  [-69.379900264287, -29.139763059722494],
                  [-69.379900264287, -29.132565929255687]]], null, false),
            {
              "id": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36822729065419, -29.112171323399696],
                  [-69.36822729065419, -29.11936988138131],
                  [-69.36273412659169, -29.11936988138131],
                  [-69.36273412659169, -29.112171323399696]]], null, false),
            {
              "id": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38402013733388, -29.087572450447777],
                  [-69.38402013733388, -29.091172652658777],
                  [-69.38196020081044, -29.091172652658777],
                  [-69.38196020081044, -29.087572450447777]]], null, false),
            {
              "id": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12244140699855, -28.912253981979173],
                  [-69.12244140699855, -28.916160816600023],
                  [-69.12072479322902, -28.916160816600023],
                  [-69.12072479322902, -28.912253981979173]]], null, false),
            {
              "id": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09463226393214, -28.949513180192902],
                  [-69.09463226393214, -28.952517370582314],
                  [-69.09051239088527, -28.952517370582314],
                  [-69.09051239088527, -28.949513180192902]]], null, false),
            {
              "id": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1416674812173, -28.94590803670759],
                  [-69.1416674812173, -28.950414446459195],
                  [-69.1361743171548, -28.950414446459195],
                  [-69.1361743171548, -28.94590803670759]]], null, false),
            {
              "id": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12106811598292, -28.964533260672933],
                  [-69.12106811598292, -28.96543439621357],
                  [-69.1200381477212, -28.96543439621357],
                  [-69.1200381477212, -28.964533260672933]]], null, false),
            {
              "id": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11591827467433, -28.982854807854128],
                  [-69.11591827467433, -28.982854807854128],
                  [-69.11591827467433, -28.982854807854128],
                  [-69.11591827467433, -28.982854807854128]]], null, false),
            {
              "id": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.03283416822902, -29.035998958666028],
                  [-69.03283416822902, -29.03960096231676],
                  [-69.02940094068995, -29.03960096231676],
                  [-69.02940094068995, -29.035998958666028]]], null, false),
            {
              "id": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.0318041999673, -29.04680459244343],
                  [-69.0318041999673, -29.052507109593847],
                  [-69.02699768141261, -29.052507109593847],
                  [-69.02699768141261, -29.04680459244343]]], null, false),
            {
              "id": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.11729156568995, -28.977749128969876],
                  [-69.11729156568995, -28.981953824009025],
                  [-69.1145449836587, -28.981953824009025],
                  [-69.1145449836587, -28.977749128969876]]], null, false),
            {
              "id": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1310244758462, -28.999071174926787],
                  [-69.1310244758462, -29.000572561746473],
                  [-69.12965118483058, -29.000572561746473],
                  [-69.12965118483058, -28.999071174926787]]], null, false),
            {
              "id": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12759124830714, -28.991563913731326],
                  [-69.12759124830714, -28.99606833586585],
                  [-69.12312805250636, -28.99606833586585],
                  [-69.12312805250636, -28.991563913731326]]], null, false),
            {
              "id": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.18629943922511, -28.951315704883157],
                  [-69.18629943922511, -28.952517370582314],
                  [-69.18492614820948, -28.952517370582314],
                  [-69.18492614820948, -28.951315704883157]]], null, false),
            {
              "id": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.17668640211573, -28.950414446459195],
                  [-69.17668640211573, -28.954920660152617],
                  [-69.17222320631495, -28.954920660152617],
                  [-69.17222320631495, -28.950414446459195]]], null, false),
            {
              "id": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.30543243483058, -29.03960096231676],
                  [-69.30543243483058, -29.042302382550517],
                  [-69.30302917555323, -29.042302382550517],
                  [-69.30302917555323, -29.03960096231676]]], null, false),
            {
              "id": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.24706756666652, -28.924274541381003],
                  [-69.24706756666652, -28.931185732114947],
                  [-69.24226104811183, -28.931185732114947],
                  [-69.24226104811183, -28.924274541381003]]], null, false),
            {
              "id": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27727996901027, -28.939298281131613],
                  [-69.27727996901027, -28.94771062413398],
                  [-69.27007019117823, -28.94771062413398],
                  [-69.27007019117823, -28.939298281131613]]], null, false),
            {
              "id": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26663696363917, -28.936894629107332],
                  [-69.26663696363917, -28.944105417915015],
                  [-69.25839721754542, -28.944105417915015],
                  [-69.25839721754542, -28.936894629107332]]], null, false),
            {
              "id": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26938354567042, -28.968438124690554],
                  [-69.26938354567042, -28.97024031993486],
                  [-69.26732360914698, -28.97024031993486],
                  [-69.26732360914698, -28.968438124690554]]], null, false),
            {
              "id": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.26629364088527, -28.9609286400644],
                  [-69.26629364088527, -28.96543439621357],
                  [-69.26045715406886, -28.96543439621357],
                  [-69.26045715406886, -28.9609286400644]]], null, false),
            {
              "id": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.9442568977212, -28.932387631297363],
                  [-68.9442568977212, -28.93899782767757],
                  [-68.94082367018214, -28.93899782767757],
                  [-68.94082367018214, -28.932387631297363]]], null, false),
            {
              "id": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.92640411451808, -28.94921275636143],
                  [-68.92640411451808, -28.95311819820347],
                  [-68.92365753248683, -28.95311819820347],
                  [-68.92365753248683, -28.94921275636143]]], null, false),
            {
              "id": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.92503082350245, -28.96513401857168],
                  [-68.92503082350245, -28.968438124690554],
                  [-68.9222842414712, -28.968438124690554],
                  [-68.9222842414712, -28.96513401857168]]], null, false),
            {
              "id": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.98099243238917, -28.990362701352815],
                  [-68.98099243238917, -28.99726948195742],
                  [-68.97446930006495, -28.99726948195742],
                  [-68.97446930006495, -28.990362701352815]]], null, false),
            {
              "id": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.05103027418605, -28.981353163752434],
                  [-69.05103027418605, -28.983455459390935],
                  [-69.04931366041652, -28.983455459390935],
                  [-69.04931366041652, -28.981353163752434]]], null, false),
            {
              "id": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.05618011549464, -29.001773655500415],
                  [-69.05618011549464, -29.00958042466889],
                  [-69.04965698317042, -29.00958042466889],
                  [-69.04965698317042, -29.001773655500415]]], null, false),
            {
              "id": 2,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99197876051417, -29.062110636362412],
                  [-68.99197876051417, -29.06721214615976],
                  [-68.98923217848292, -29.06721214615976],
                  [-68.98923217848292, -29.062110636362412]]], null, false),
            {
              "id": 2,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99644195631495, -29.048005148567256],
                  [-68.99644195631495, -29.054007719604737],
                  [-68.98545562818995, -29.054007719604737],
                  [-68.98545562818995, -29.048005148567256]]], null, false),
            {
              "id": 2,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.94357025221339, -29.10921497646071],
                  [-68.94357025221339, -29.111614620703506],
                  [-68.94219696119777, -29.111614620703506],
                  [-68.94219696119777, -29.10921497646071]]], null, false),
            {
              "id": 2,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09669434289825, -29.26405058150646],
                  [-69.09669434289825, -29.265548103463015],
                  [-69.09532105188262, -29.265548103463015],
                  [-69.09532105188262, -29.26405058150646]]], null, false),
            {
              "id": 2,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09446274499786, -29.268692828178292],
                  [-69.09446274499786, -29.270939000894433],
                  [-69.09291779260528, -29.270939000894433],
                  [-69.09291779260528, -29.268692828178292]]], null, false),
            {
              "id": 2,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09257446985137, -29.27393382107372],
                  [-69.09257446985137, -29.27558093476982],
                  [-69.0913728402127, -29.27558093476982],
                  [-69.0913728402127, -29.27393382107372]]], null, false),
            {
              "id": 2,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09360443811309, -29.279923198180718],
                  [-69.09360443811309, -29.280522116584976],
                  [-69.09308945398223, -29.280522116584976],
                  [-69.09308945398223, -29.279923198180718]]], null, false),
            {
              "id": 2,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09154450158965, -29.28426527707647],
                  [-69.09154450158965, -29.286061945401823],
                  [-69.0913728402127, -29.286061945401823],
                  [-69.0913728402127, -29.28426527707647]]], null, false),
            {
              "id": 2,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07386337976348, -29.221062356580706],
                  [-69.07386337976348, -29.223908825013048],
                  [-69.07163178186309, -29.223908825013048],
                  [-69.07163178186309, -29.221062356580706]]], null, false),
            {
              "id": 2,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07111679773223, -29.21986381989092],
                  [-69.07111679773223, -29.220612906965435],
                  [-69.06922852258575, -29.220612906965435],
                  [-69.06922852258575, -29.21986381989092]]], null, false),
            {
              "id": 2,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.0752366707791, -29.21986381989092],
                  [-69.0752366707791, -29.221062356580706],
                  [-69.07386337976348, -29.221062356580706],
                  [-69.07386337976348, -29.21986381989092]]], null, false),
            {
              "id": 2,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10768067102325, -29.295194520806135],
                  [-69.10768067102325, -29.29788922308531],
                  [-69.10390412073028, -29.29788922308531],
                  [-69.10390412073028, -29.295194520806135]]], null, false),
            {
              "id": 2,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.14304291467559, -29.25476545586876],
                  [-69.14304291467559, -29.256862170826455],
                  [-69.14166962365996, -29.256862170826455],
                  [-69.14166962365996, -29.25476545586876]]], null, false),
            {
              "id": 2,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.15608917932403, -29.213271617435847],
                  [-69.15608917932403, -29.218515449352424],
                  [-69.15196930627715, -29.218515449352424],
                  [-69.15196930627715, -29.213271617435847]]], null, false),
            {
              "id": 2,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.99043595056426, -29.286810547878396],
                  [-68.99043595056426, -29.289954618374146],
                  [-68.98803269128692, -29.289954618374146],
                  [-68.98803269128692, -29.286810547878396]]], null, false),
            {
              "id": 2,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.98168122033965, -29.268093840452035],
                  [-68.98168122033965, -29.273185124255107],
                  [-68.97738968591582, -29.273185124255107],
                  [-68.97738968591582, -29.268093840452035]]], null, false),
            {
              "id": 2,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.97103821496856, -29.296990996893474],
                  [-68.97103821496856, -29.3001347539959],
                  [-68.96777664880645, -29.3001347539959],
                  [-68.96777664880645, -29.296990996893474]]], null, false),
            {
              "id": 2,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.0871423319155, -29.324560798572932],
                  [-69.0871423319155, -29.32680574266983],
                  [-69.08538280280173, -29.32680574266983],
                  [-69.08538280280173, -29.324560798572932]]], null, false),
            {
              "id": 2,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10611091406882, -29.328003025983378],
                  [-69.10611091406882, -29.330023409701813],
                  [-69.10413680823386, -29.330023409701813],
                  [-69.10413680823386, -29.328003025983378]]], null, false),
            {
              "id": 2,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.05841625595987, -29.10458958359442],
                  [-69.05841625595987, -29.106989335697023],
                  [-69.0549830284208, -29.106989335697023],
                  [-69.0549830284208, -29.10458958359442]]], null, false),
            {
              "id": 2,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44084702590821, -28.725320944573014],
                  [-69.44084702590821, -28.72574432529422],
                  [-69.44013892272828, -28.72574432529422],
                  [-69.44013892272828, -28.725320944573014]]], null, false),
            {
              "id": 2,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43888364890931, -28.725659649287152],
                  [-69.43888364890931, -28.726515814643925],
                  [-69.4376391039264, -28.726515814643925],
                  [-69.4376391039264, -28.725659649287152]]], null, false),
            {
              "id": 2,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44738088706849, -28.725885451820268],
                  [-69.44738088706849, -28.72701445716997],
                  [-69.44617925742982, -28.72701445716997],
                  [-69.44617925742982, -28.725885451820268]]], null, false),
            {
              "id": 2,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45270238975404, -28.72513277481322],
                  [-69.45270238975404, -28.72678865707549],
                  [-69.45081411460755, -28.72678865707549],
                  [-69.45081411460755, -28.72513277481322]]], null, false),
            {
              "id": 2,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4480675325763, -28.720503692079127],
                  [-69.4480675325763, -28.721482214454944],
                  [-69.44635091880677, -28.721482214454944],
                  [-69.44635091880677, -28.720503692079127]]], null, false),
            {
              "id": 2,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44072900871156, -28.720240242182587],
                  [-69.44072900871156, -28.72182093160532],
                  [-69.43896947959779, -28.72182093160532],
                  [-69.43896947959779, -28.720240242182587]]], null, false),
            {
              "id": 2,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47759328941224, -28.719638068498018],
                  [-69.47759328941224, -28.72174566122228],
                  [-69.47501836875794, -28.72174566122228],
                  [-69.47501836875794, -28.719638068498018]]], null, false),
            {
              "id": 2,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54235982229523, -28.7921258910921],
                  [-69.54235982229523, -28.80055015568823],
                  [-69.5354933672171, -28.80055015568823],
                  [-69.5354933672171, -28.7921258910921]]], null, false),
            {
              "id": 2,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.50116109182648, -28.82822508742628],
                  [-69.50116109182648, -28.83724793158175],
                  [-69.49429463674835, -28.83724793158175],
                  [-69.49429463674835, -28.82822508742628]]], null, false),
            {
              "id": 2,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45103596975616, -28.841458324482407],
                  [-69.45103596975616, -28.851682855016477],
                  [-69.44279622366241, -28.851682855016477],
                  [-69.44279622366241, -28.841458324482407]]], null, false),
            {
              "id": 2,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45097575215604, -28.854551876611115],
                  [-69.45097575215604, -28.85688226317651],
                  [-69.44874415425565, -28.85688226317651],
                  [-69.44874415425565, -28.854551876611115]]], null, false),
            {
              "id": 2,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57077450707877, -28.464376428742103],
                  [-69.57077450707877, -28.465734608698284],
                  [-69.56940121606314, -28.465734608698284],
                  [-69.56940121606314, -28.464376428742103]]], null, false),
            {
              "id": 2,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56777043298209, -28.462037300123384],
                  [-69.56777043298209, -28.463018231331],
                  [-69.56596798852408, -28.463018231331],
                  [-69.56596798852408, -28.462037300123384]]], null, false),
            {
              "id": 2,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56227726891959, -28.46399915343432],
                  [-69.56227726891959, -28.465960970327263],
                  [-69.56047482446158, -28.465960970327263],
                  [-69.56047482446158, -28.46399915343432]]], null, false),
            {
              "id": 2,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56356472924674, -28.452076560049807],
                  [-69.56356472924674, -28.45328397246755],
                  [-69.56253476098502, -28.45328397246755],
                  [-69.56253476098502, -28.452076560049807]]], null, false),
            {
              "id": 2,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56425137475455, -28.447171305325153],
                  [-69.56425137475455, -28.448680638705845],
                  [-69.56193394616568, -28.448680638705845],
                  [-69.56193394616568, -28.447171305325153]]], null, false),
            {
              "id": 2,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60234818218069, -28.43190534083053],
                  [-69.60234818218069, -28.43284881285497],
                  [-69.60140404460745, -28.43284881285497],
                  [-69.60140404460745, -28.43190534083053]]], null, false),
            {
              "id": 2,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59539589641409, -28.43288655156099],
                  [-69.59539589641409, -28.43360358441814],
                  [-69.59440884349661, -28.43360358441814],
                  [-69.59440884349661, -28.43288655156099]]], null, false),
            {
              "id": 2,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59299263713675, -28.431037339139024],
                  [-69.59299263713675, -28.43190534083053],
                  [-69.59234890697317, -28.43190534083053],
                  [-69.59234890697317, -28.431037339139024]]], null, false),
            {
              "id": 2,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56123528240042, -28.433792276467766],
                  [-69.56123528240042, -28.434886683720247],
                  [-69.55956158397512, -28.434886683720247],
                  [-69.55956158397512, -28.433792276467766]]], null, false),
            {
              "id": 2,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55844578502493, -28.428584252390788],
                  [-69.55844578502493, -28.430207069989752],
                  [-69.55720124004202, -28.430207069989752],
                  [-69.55720124004202, -28.428584252390788]]], null, false),
            {
              "id": 2,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6049240937645, -28.422909195899358],
                  [-69.6049240937645, -28.423777264249324],
                  [-69.60419453291244, -28.423777264249324],
                  [-69.60419453291244, -28.422909195899358]]], null, false),
            {
              "id": 2,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59307945875473, -28.418493259746864],
                  [-69.59307945875473, -28.419059415700325],
                  [-69.59196365980453, -28.419059415700325],
                  [-69.59196365980453, -28.418493259746864]]], null, false),
            {
              "id": 2,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.58930290846176, -28.417285450261957],
                  [-69.58930290846176, -28.41815356472173],
                  [-69.58780087141342, -28.41815356472173],
                  [-69.58780087141342, -28.417285450261957]]], null, false),
            {
              "id": 2,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53222411179236, -28.425879969981995],
                  [-69.53222411179236, -28.426785754852336],
                  [-69.53110831284216, -28.426785754852336],
                  [-69.53110831284216, -28.425879969981995]]], null, false),
            {
              "id": 2,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53788893723181, -28.42150190051141],
                  [-69.53788893723181, -28.42331353742462],
                  [-69.53600066208533, -28.42331353742462],
                  [-69.53600066208533, -28.42150190051141]]], null, false),
            {
              "id": 2,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51980004524283, -28.43590473582339],
                  [-69.51980004524283, -28.436772697589262],
                  [-69.51900611137442, -28.436772697589262],
                  [-69.51900611137442, -28.43590473582339]]], null, false),
            {
              "id": 2,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52269683097892, -28.434810339100522],
                  [-69.52269683097892, -28.43584812937394],
                  [-69.52173123573355, -28.43584812937394],
                  [-69.52173123573355, -28.434810339100522]]], null, false),
            {
              "id": 2,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51647410606436, -28.435753785224232],
                  [-69.51647410606436, -28.4372444129539],
                  [-69.51445708488517, -28.4372444129539],
                  [-69.51445708488517, -28.435753785224232]]], null, false),
            {
              "id": 2,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57124137015005, -28.476439900196183],
                  [-69.57124137015005, -28.479231376858323],
                  [-69.56892394156118, -28.479231376858323],
                  [-69.56892394156118, -28.476439900196183]]], null, false),
            {
              "id": 2,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55476187796255, -28.47538364654523],
                  [-69.55476187796255, -28.47704346896889],
                  [-69.55141448111196, -28.47704346896889],
                  [-69.55141448111196, -28.47538364654523]]], null, false),
            {
              "id": 2,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61795575340655, -28.425132111776144],
                  [-69.61795575340655, -28.425660490958833],
                  [-69.61735493858721, -28.425660490958833],
                  [-69.61735493858721, -28.425132111776144]]], null, false),
            {
              "id": 2,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6181274147835, -28.426075644180692],
                  [-69.6181274147835, -28.426264349652367],
                  [-69.61795575340655, -28.426264349652367],
                  [-69.61795575340655, -28.426075644180692]]], null, false),
            {
              "id": 2,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61847073753741, -28.429849689693576],
                  [-69.61847073753741, -28.4301138678397],
                  [-69.6181274147835, -28.4301138678397],
                  [-69.6181274147835, -28.429849689693576]]], null, false),
            {
              "id": 2,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59164864738848, -28.42701916817489],
                  [-69.59164864738848, -28.42728335338611],
                  [-69.59134823997881, -28.42728335338611],
                  [-69.59134823997881, -28.42701916817489]]], null, false),
            {
              "id": 2,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59147698601153, -28.429283591445646],
                  [-69.59147698601153, -28.429660990614053],
                  [-69.59104783256915, -28.429660990614053],
                  [-69.59104783256915, -28.429283591445646]]], null, false),
            {
              "id": 2,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61239821632769, -28.446416157150814],
                  [-69.61239821632769, -28.447887767967334],
                  [-69.61066014488604, -28.447887767967334],
                  [-69.61066014488604, -28.446416157150814]]], null, false),
            {
              "id": 2,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61186177452471, -28.444491712109077],
                  [-69.61186177452471, -28.44575581230819],
                  [-69.610831806263, -28.44575581230819],
                  [-69.610831806263, -28.444491712109077]]], null, false),
            {
              "id": 2,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46573784757936, -28.3763111936117],
                  [-69.46573784757936, -28.37683981629531],
                  [-69.46483662535036, -28.37683981629531],
                  [-69.46483662535036, -28.3763111936117]]], null, false),
            {
              "id": 2,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63065916010025, -28.315572450100834],
                  [-69.63065916010025, -28.31642250699849],
                  [-69.62999397226456, -28.31642250699849],
                  [-69.62999397226456, -28.315572450100834]]], null, false),
            {
              "id": 2,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62748342462662, -28.315194644854035],
                  [-69.62748342462662, -28.31585580315507],
                  [-69.62636762567642, -28.31585580315507],
                  [-69.62636762567642, -28.315194644854035]]], null, false),
            {
              "id": 2,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62205463358048, -28.31498685139617],
                  [-69.62205463358048, -28.315912473675326],
                  [-69.62072425790909, -28.315912473675326],
                  [-69.62072425790909, -28.31498685139617]]], null, false),
            {
              "id": 2,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61911493250015, -28.317234777240568],
                  [-69.61911493250015, -28.318387056939475],
                  [-69.61844974466446, -28.318387056939475],
                  [-69.61844974466446, -28.317234777240568]]], null, false),
            {
              "id": 2,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63366323419693, -28.31868929217036],
                  [-69.63366323419693, -28.32061602157126],
                  [-69.63177495905045, -28.32061602157126],
                  [-69.63177495905045, -28.31868929217036]]], null, false),
            {
              "id": 2,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63031583734634, -28.320238234244552],
                  [-69.63031583734634, -28.321787153752986],
                  [-69.62774091669205, -28.321787153752986],
                  [-69.62774091669205, -28.320238234244552]]], null, false),
            {
              "id": 2,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63902765222672, -28.31865151281348],
                  [-69.63902765222672, -28.320011561204165],
                  [-69.63722520776871, -28.320011561204165],
                  [-69.63722520776871, -28.31865151281348]]], null, false),
            {
              "id": 2,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62808423944595, -28.313777863224278],
                  [-69.62808423944595, -28.31434457814119],
                  [-69.62765508600357, -28.31434457814119],
                  [-69.62765508600357, -28.313777863224278]]], null, false),
            {
              "id": 2,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61452299066666, -28.31445792076217],
                  [-69.61452299066666, -28.316649187690206],
                  [-69.6108751864064, -28.316649187690206],
                  [-69.6108751864064, -28.31445792076217]]], null, false),
            {
              "id": 2,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62623887964371, -28.303349769792938],
                  [-69.62623887964371, -28.30501228796627],
                  [-69.62362104364517, -28.30501228796627],
                  [-69.62362104364517, -28.303349769792938]]], null, false),
            {
              "id": 2,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63447535026607, -28.31289264451683],
                  [-69.63447535026607, -28.313421582935916],
                  [-69.63391745079097, -28.313421582935916],
                  [-69.63391745079097, -28.31289264451683]]], null, false),
            {
              "id": 2,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63880980003414, -28.312477048199213],
                  [-69.63880980003414, -28.31279819095089],
                  [-69.63840210426388, -28.31279819095089],
                  [-69.63840210426388, -28.312477048199213]]], null, false),
            {
              "id": 2,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63848793495235, -28.314970601744207],
                  [-69.63848793495235, -28.315820663452897],
                  [-69.637887120133, -28.315820663452897],
                  [-69.637887120133, -28.314970601744207]]], null, false),
            {
              "id": 2,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63657891170416, -28.316559465273574],
                  [-69.63657891170416, -28.317003380603012],
                  [-69.63627850429451, -28.317003380603012],
                  [-69.63627850429451, -28.316559465273574]]], null, false),
            {
              "id": 2,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64303554522935, -28.31946668182311],
                  [-69.64303554522935, -28.320600048000717],
                  [-69.64204849231187, -28.320600048000717],
                  [-69.64204849231187, -28.31946668182311]]], null, false),
            {
              "id": 2,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64747728335801, -28.315443134322464],
                  [-69.64747728335801, -28.316198741708135],
                  [-69.64653314578477, -28.316198741708135],
                  [-69.64653314578477, -28.315443134322464]]], null, false),
            {
              "id": 2,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64556755053941, -28.31723769309669],
                  [-69.64556755053941, -28.318333303564113],
                  [-69.64404405581895, -28.318333303564113],
                  [-69.64404405581895, -28.31723769309669]]], null, false),
            {
              "id": 2,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64393676745836, -28.314744192710613],
                  [-69.64393676745836, -28.31512199955773],
                  [-69.6434217833275, -28.31512199955773],
                  [-69.6434217833275, -28.314744192710613]]], null, false),
            {
              "id": 2,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64385093676988, -28.313497420592004],
                  [-69.64385093676988, -28.31387523186847],
                  [-69.6434217833275, -28.31387523186847],
                  [-69.6434217833275, -28.313497420592004]]], null, false),
            {
              "id": 2,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64852870929185, -28.312685121802676],
                  [-69.64852870929185, -28.313780779175193],
                  [-69.64715541827623, -28.313780779175193],
                  [-69.64715541827623, -28.312685121802676]]], null, false),
            {
              "id": 2,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63874401080552, -28.306866614223804],
                  [-69.63874401080552, -28.307697849078878],
                  [-69.63745655047838, -28.307697849078878],
                  [-69.63745655047838, -28.306866614223804]]], null, false),
            {
              "id": 2,
              "system:index": "258"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6487003706688, -28.32160117807464],
                  [-69.6487003706688, -28.324094517657613],
                  [-69.64552463519517, -28.324094517657613],
                  [-69.64552463519517, -28.32160117807464]]], null, false),
            {
              "id": 2,
              "system:index": "259"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62306211406225, -28.290110726911582],
                  [-69.62306211406225, -28.290866514225133],
                  [-69.62196777278417, -28.290866514225133],
                  [-69.62196777278417, -28.290110726911582]]], null, false),
            {
              "id": 2,
              "system:index": "260"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62016532832617, -28.28999735835174],
                  [-69.62016532832617, -28.290960987262032],
                  [-69.61857746058935, -28.290960987262032],
                  [-69.61857746058935, -28.28999735835174]]], null, false),
            {
              "id": 2,
              "system:index": "261"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62359855586523, -28.291811240821175],
                  [-69.62359855586523, -28.29260480468228],
                  [-69.62256858760351, -28.29260480468228],
                  [-69.62256858760351, -28.291811240821175]]], null, false),
            {
              "id": 2,
              "system:index": "262"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62587306910986, -28.29024299007881],
                  [-69.62587306910986, -28.29118772220852],
                  [-69.62503621989721, -28.29118772220852],
                  [-69.62503621989721, -28.29024299007881]]], null, false),
            {
              "id": 2,
              "system:index": "263"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63743875438207, -28.2912066167656],
                  [-69.63743875438207, -28.292642593290008],
                  [-69.63602254802221, -28.292642593290008],
                  [-69.63602254802221, -28.2912066167656]]], null, false),
            {
              "id": 2,
              "system:index": "264"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63563630992407, -28.289279354669095],
                  [-69.63563630992407, -28.290639778594496],
                  [-69.63400552684301, -28.290639778594496],
                  [-69.63400552684301, -28.289279354669095]]], null, false),
            {
              "id": 2,
              "system:index": "265"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56433248641132, -29.14628000242612],
                  [-69.56433248641132, -29.149765710239404],
                  [-69.55901098372577, -29.149765710239404],
                  [-69.55901098372577, -29.14628000242612]]], null, false),
            {
              "id": 2,
              "system:index": "266"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55657269477919, -29.138861374217697],
                  [-69.55657269477919, -29.141410259437766],
                  [-69.55318238258437, -29.141410259437766],
                  [-69.55318238258437, -29.138861374217697]]], null, false),
            {
              "id": 2,
              "system:index": "267"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4798286674192, -29.2903070107186],
                  [-69.4798286674192, -29.2941995219148],
                  [-69.47485048748756, -29.2941995219148],
                  [-69.47485048748756, -29.2903070107186]]], null, false),
            {
              "id": 2,
              "system:index": "268"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.43777163006568, -29.281173998320128],
                  [-69.43777163006568, -29.285066857541857],
                  [-69.42712862469459, -29.285066857541857],
                  [-69.42712862469459, -29.281173998320128]]], null, false),
            {
              "id": 2,
              "system:index": "269"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.27777018486893, -29.74753277245659],
                  [-69.27777018486893, -29.75125870001326],
                  [-69.27365031182205, -29.75125870001326],
                  [-69.27365031182205, -29.74753277245659]]], null, false),
            {
              "id": 2,
              "system:index": "270"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.2573424810115, -29.73471452422276],
                  [-69.2573424810115, -29.74216719350509],
                  [-69.24687113701737, -29.74216719350509],
                  [-69.24687113701737, -29.73471452422276]]], null, false),
            {
              "id": 2,
              "system:index": "271"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36909403740799, -29.741794573193918],
                  [-69.36909403740799, -29.747979891075083],
                  [-69.36480250298416, -29.747979891075083],
                  [-69.36480250298416, -29.741794573193918]]], null, false),
            {
              "id": 2,
              "system:index": "272"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63013534903594, -30.23166791706245],
                  [-69.63013534903594, -30.236117261997727],
                  [-69.62532883048125, -30.236117261997727],
                  [-69.62532883048125, -30.23166791706245]]], null, false),
            {
              "id": 2,
              "system:index": "273"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6061027562625, -30.211124164220227],
                  [-69.6061027562625, -30.218244506642304],
                  [-69.59906463980742, -30.218244506642304],
                  [-69.59906463980742, -30.211124164220227]]], null, false),
            {
              "id": 2,
              "system:index": "274"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72978477835723, -30.186198908441078],
                  [-69.72978477835723, -30.191169626825534],
                  [-69.72317581534453, -30.191169626825534],
                  [-69.72317581534453, -30.186198908441078]]], null, false),
            {
              "id": 2,
              "system:index": "275"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59575756141281, -29.200662418525706],
                  [-69.59575756141281, -29.201861179816902],
                  [-69.59464176246262, -29.201861179816902],
                  [-69.59464176246262, -29.200662418525706]]], null, false),
            {
              "id": 2,
              "system:index": "276"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54142673560715, -29.21122601981838],
                  [-69.54142673560715, -29.21264940057839],
                  [-69.53996761390304, -29.21264940057839],
                  [-69.53996761390304, -29.21122601981838]]], null, false),
            {
              "id": 2,
              "system:index": "277"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54074009009933, -29.206506247411408],
                  [-69.54074009009933, -29.207480186500693],
                  [-69.53971012183762, -29.207480186500693],
                  [-69.53971012183762, -29.206506247411408]]], null, false),
            {
              "id": 2,
              "system:index": "278"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53833683082199, -29.201861179816902],
                  [-69.53833683082199, -29.20291008444749],
                  [-69.5372210318718, -29.20291008444749],
                  [-69.5372210318718, -29.201861179816902]]], null, false),
            {
              "id": 2,
              "system:index": "279"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.52177150794601, -29.21264940057839],
                  [-69.52177150794601, -29.214072761566054],
                  [-69.52014072486496, -29.214072761566054],
                  [-69.52014072486496, -29.21264940057839]]], null, false),
            {
              "id": 2,
              "system:index": "280"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.51130016395187, -29.21017720029083],
                  [-69.51130016395187, -29.213323626668863],
                  [-69.50872524329758, -29.213323626668863],
                  [-69.50872524329758, -29.21017720029083]]], null, false),
            {
              "id": 2,
              "system:index": "281"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16379950022974, -29.349204418450746],
                  [-69.16379950022974, -29.354067225812848],
                  [-69.1584779975442, -29.354067225812848],
                  [-69.1584779975442, -29.349204418450746]]], null, false),
            {
              "id": 2,
              "system:index": "282"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.15229818797388, -29.34247091742712],
                  [-69.15229818797388, -29.343368743268954],
                  [-69.1515257117776, -29.343368743268954],
                  [-69.1515257117776, -29.34247091742712]]], null, false),
            {
              "id": 2,
              "system:index": "283"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16710398173609, -29.346885151662555],
                  [-69.16710398173609, -29.3471470070079],
                  [-69.16671774363795, -29.3471470070079],
                  [-69.16671774363795, -29.346885151662555]]], null, false),
            {
              "id": 2,
              "system:index": "284"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.16697523570338, -29.35496494948435],
                  [-69.16697523570338, -29.35646113802342],
                  [-69.16564486003199, -29.35646113802342],
                  [-69.16564486003199, -29.35496494948435]]], null, false),
            {
              "id": 2,
              "system:index": "285"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.13817903971949, -29.352496190352305],
                  [-69.13817903971949, -29.353132088576217],
                  [-69.13770697093287, -29.353132088576217],
                  [-69.13770697093287, -29.352496190352305]]], null, false),
            {
              "id": 2,
              "system:index": "286"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12624857402125, -29.35085031769526],
                  [-69.12624857402125, -29.351336601020307],
                  [-69.12564775920191, -29.351336601020307],
                  [-69.12564775920191, -29.35085031769526]]], null, false),
            {
              "id": 2,
              "system:index": "287"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12629148936549, -29.346473663331796],
                  [-69.12629148936549, -29.347072191263607],
                  [-69.12560484385767, -29.347072191263607],
                  [-69.12560484385767, -29.346473663331796]]], null, false),
            {
              "id": 2,
              "system:index": "288"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12363073802271, -29.346174398047634],
                  [-69.12363073802271, -29.346885151662555],
                  [-69.12285826182642, -29.346885151662555],
                  [-69.12285826182642, -29.346174398047634]]], null, false),
            {
              "id": 2,
              "system:index": "289"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.12895224070826, -29.35541380835348],
                  [-69.12895224070826, -29.356909990299908],
                  [-69.12792227244654, -29.356909990299908],
                  [-69.12792227244654, -29.35541380835348]]], null, false),
            {
              "id": 2,
              "system:index": "290"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.10251979924276, -29.346690747321595],
                  [-69.10251979924276, -29.347738166663973],
                  [-69.10093193150594, -29.347738166663973],
                  [-69.10093193150594, -29.346690747321595]]], null, false),
            {
              "id": 2,
              "system:index": "291"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45473387755334, -29.358775084817516],
                  [-69.45473387755334, -29.366853939617894],
                  [-69.44615080870568, -29.366853939617894],
                  [-69.44615080870568, -29.358775084817516]]], null, false),
            {
              "id": 2,
              "system:index": "292"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63651751336111, -29.09060912072574],
                  [-69.63651751336111, -29.093984214460576],
                  [-69.63359926995291, -29.093984214460576],
                  [-69.63359926995291, -29.09060912072574]]], null, false),
            {
              "id": 2,
              "system:index": "293"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66569994744314, -29.08070820764616],
                  [-69.66569994744314, -29.082883489822212],
                  [-69.66312502678885, -29.082883489822212],
                  [-69.66312502678885, -29.08070820764616]]], null, false),
            {
              "id": 2,
              "system:index": "294"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61703394707693, -29.07950803230114],
                  [-69.61703394707693, -29.08205838819697],
                  [-69.61445902642264, -29.08205838819697],
                  [-69.61445902642264, -29.07950803230114]]], null, false),
            {
              "id": 2,
              "system:index": "295"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6109399681951, -29.072156653252712],
                  [-69.6109399681951, -29.07433211597482],
                  [-69.6087942009832, -29.07433211597482],
                  [-69.6087942009832, -29.072156653252712]]], null, false),
            {
              "id": 2,
              "system:index": "296"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68578432854667, -29.07763273033502],
                  [-69.68578432854667, -29.079808077448153],
                  [-69.6831235772039, -29.079808077448153],
                  [-69.6831235772039, -29.07763273033502]]], null, false),
            {
              "id": 2,
              "system:index": "297"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68072031792656, -29.08730892211392],
                  [-69.68072031792656, -29.091434153854287],
                  [-69.67642878350273, -29.091434153854287],
                  [-69.67642878350273, -29.08730892211392]]], null, false),
            {
              "id": 2,
              "system:index": "298"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70440958794609, -29.087908966091124],
                  [-69.70440958794609, -29.090159099869638],
                  [-69.70089052971855, -29.090159099869638],
                  [-69.70089052971855, -29.087908966091124]]], null, false),
            {
              "id": 2,
              "system:index": "299"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71822832879081, -29.088283991801603],
                  [-69.71822832879081, -29.091134142572326],
                  [-69.71470927056328, -29.091134142572326],
                  [-69.71470927056328, -29.088283991801603]]], null, false),
            {
              "id": 2,
              "system:index": "300"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70578287896171, -29.0711064134333],
                  [-69.70578287896171, -29.074182085537334],
                  [-69.70320795830742, -29.074182085537334],
                  [-69.70320795830742, -29.0711064134333]]], null, false),
            {
              "id": 2,
              "system:index": "301"
            })]),
    Water_Bodies = 
    /* color: #0015ff */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68879886415483, -28.362488791587815],
                  [-69.6881980493355, -28.362488791587815],
                  [-69.68802638795854, -28.36209227119322],
                  [-69.68877740648271, -28.362054507268848]]]),
            {
              "id": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5977097549199, -28.285683511245512],
                  [-69.59603605649461, -28.285645720167505],
                  [-69.59616480252733, -28.284625355990926],
                  [-69.59805307767381, -28.284852104430747]]]),
            {
              "id": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62516184929814, -28.13769405062168],
                  [-69.6234452355286, -28.13742914599249],
                  [-69.6216427910706, -28.13776973753829],
                  [-69.62142821434941, -28.136596584322263],
                  [-69.6234452355286, -28.136142457047992],
                  [-69.62533351067509, -28.136975022247118]]]),
            {
              "id": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62095614556279, -28.13765620714332],
                  [-69.62121363762822, -28.138072484670026],
                  [-69.62056990746464, -28.139245621724747],
                  [-69.62005492333378, -28.138677976366896],
                  [-69.61975451592411, -28.137618363651598],
                  [-69.61803790215458, -28.136218145060706],
                  [-69.62001200798954, -28.13655874045627]]]),
            {
              "id": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.90662739809751, -28.73207869111956],
                  [-69.9070565515399, -28.735390209346804],
                  [-69.90405247744322, -28.734863383920608],
                  [-69.90276501711607, -28.732003428122177],
                  [-69.90293667849302, -28.728842333291556],
                  [-69.90533993777036, -28.727412282795257]]]),
            {
              "id": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.91126225527525, -28.73584177188393],
                  [-69.90920231875181, -28.736218072507615],
                  [-69.90825818117857, -28.7344118171557],
                  [-69.91014645632505, -28.73396024843954]]]),
            {
              "id": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84387248752722, -28.80050265775216],
                  [-69.84661906955847, -28.80193170716948],
                  [-69.84391540287146, -28.802119738528713],
                  [-69.8388084769071, -28.801330004540073],
                  [-69.83932346103796, -28.80027701657918],
                  [-69.84318584201941, -28.80027701657918]]]),
            {
              "id": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.31723781923777, -28.53842258962279],
                  [-69.31062885622508, -28.53962901465947],
                  [-69.30693813662059, -28.537366956383327],
                  [-69.31157299379832, -28.533747562124887],
                  [-69.31414791445262, -28.536311312567204]]]),
            {
              "id": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.49716554330105, -28.380549790311605],
                  [-69.49476228402371, -28.379719125396804],
                  [-69.49390397713894, -28.378057776049072],
                  [-69.49287400887722, -28.37616984747479],
                  [-69.49450479195828, -28.37650967709811],
                  [-69.49626432107205, -28.37692502293696],
                  [-69.49836717293972, -28.37930379049962]]]),
            {
              "id": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.48266015694851, -28.379190517063545],
                  [-69.48180185006375, -28.378435357731437],
                  [-69.48351846383328, -28.37862414806853]]]),
            {
              "id": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.36488214321963, -28.1522871961721],
                  [-69.36410966702334, -28.151870973890176],
                  [-69.3641740400397, -28.151530427183324],
                  [-69.36541858502261, -28.152230438683468]]]),
            {
              "id": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.20087370914118, -28.040715565371634],
                  [-69.19894251865045, -28.042401108617725],
                  [-69.19774088901178, -28.042817755685927],
                  [-69.19733319324152, -28.042533678314495],
                  [-69.20087370914118, -28.040185276641598],
                  [-69.20121703189508, -28.0402799712494]]]),
            {
              "id": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.19340643924372, -28.04527972814407],
                  [-69.19321332019464, -28.04562061219662],
                  [-69.19267687839167, -28.04518503793774],
                  [-69.19263396304743, -28.044673709382966],
                  [-69.19297728580133, -28.044882028717243]]]),
            {
              "id": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.19124834170717, -28.032209702552105],
                  [-69.1894888125934, -28.033724918590785],
                  [-69.18923132052797, -28.033516577650595],
                  [-69.19041149249452, -28.03254115788366]]]),
            {
              "id": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.54179481496992, -28.665480724340107],
                  [-69.54127983083906, -28.66674217395852],
                  [-69.54057172765913, -28.66689279379374],
                  [-69.5397563361186, -28.66674217395852],
                  [-69.54080776205244, -28.66538658570005]]]),
            {
              "id": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4554963591354, -28.715165858472204],
                  [-69.45596842792202, -28.715655145778943],
                  [-69.45601134326625, -28.71648316523716],
                  [-69.45553927447963, -28.716050337701766],
                  [-69.4553890707748, -28.715636327078702]]]),
            {
              "id": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84982187620305, -29.060263663298834],
                  [-69.84844858518743, -29.06015112513275],
                  [-69.84827692381047, -29.05880065755917],
                  [-69.84784777036809, -29.05681243699978],
                  [-69.84913523069524, -29.059513406538187]]]),
            {
              "id": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.8459594952216, -29.053886306832993],
                  [-69.84677488676213, -29.054073881770005],
                  [-69.84720404020452, -29.055311867798284],
                  [-69.8467319714179, -29.054936722086303],
                  [-69.84643156400823, -29.05433648610871]]]),
            {
              "id": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53391963535768, -28.625484259051213],
                  [-69.53222447926026, -28.625634938145453],
                  [-69.53151637608033, -28.624639738013933],
                  [-69.5319240718506, -28.62309525240367],
                  [-69.53454190784913, -28.62324593492687]]]),
            {
              "id": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65021800276703, -28.35900839558457],
                  [-69.65056132552094, -28.359216102963174],
                  [-69.65069007155365, -28.359990281429997],
                  [-69.65021800276703, -28.36040569193803],
                  [-69.6495098995871, -28.360235751472164],
                  [-69.64981030699677, -28.35965039889598],
                  [-69.64991759535737, -28.359065043091768]]]),
            {
              "id": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67618141980037, -28.390162546620022],
                  [-69.6749797901617, -28.390219177492916],
                  [-69.67551623196468, -28.389709498547848],
                  [-69.67658911557064, -28.39014366965567]]]),
            {
              "id": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08831131489026, -30.188031710377974],
                  [-69.08831131489026, -30.191444405888614],
                  [-69.08213150531995, -30.191444405888614],
                  [-69.08213150531995, -30.188031710377974]]], null, false),
            {
              "id": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08058655292737, -30.180612399143143],
                  [-69.08058655292737, -30.185657591581943],
                  [-69.07663834125745, -30.185657591581943],
                  [-69.07663834125745, -30.180612399143143]]], null, false),
            {
              "id": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07200348407972, -30.18595435956093],
                  [-69.07200348407972, -30.188328471203807],
                  [-69.07028687031018, -30.188328471203807],
                  [-69.07028687031018, -30.18595435956093]]], null, false),
            {
              "id": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08710968525159, -30.175715347629243],
                  [-69.08710968525159, -30.180315615070807],
                  [-69.08281815082776, -30.180315615070807],
                  [-69.08281815082776, -30.175715347629243]]], null, false),
            {
              "id": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07921326191175, -30.176754136470205],
                  [-69.07921326191175, -30.17987043728599],
                  [-69.07526505024182, -30.17987043728599],
                  [-69.07526505024182, -30.176754136470205]]], null, false),
            {
              "id": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07251846821057, -30.183135027661027],
                  [-69.07251846821057, -30.184322124611864],
                  [-69.07080185444104, -30.184322124611864],
                  [-69.07080185444104, -30.183135027661027]]], null, false),
            {
              "id": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07663834125745, -30.18743818604384],
                  [-69.07663834125745, -30.1893671270526],
                  [-69.07492172748792, -30.1893671270526],
                  [-69.07492172748792, -30.18743818604384]]], null, false),
            {
              "id": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08573639423597, -30.183283415562215],
                  [-69.08573639423597, -30.18580597568321],
                  [-69.08281815082776, -30.18580597568321],
                  [-69.08281815082776, -30.183283415562215]]], null, false),
            {
              "id": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.07028687031018, -30.18877361076599],
                  [-69.07028687031018, -30.190702525619937],
                  [-69.06719696552503, -30.190702525619937],
                  [-69.06719696552503, -30.18877361076599]]], null, false),
            {
              "id": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.06822693378675, -30.184470510724864],
                  [-69.06822693378675, -30.18728980440145],
                  [-69.06565201313245, -30.18728980440145],
                  [-69.06565201313245, -30.184470510724864]]], null, false),
            {
              "id": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09672272236097, -30.17556694832944],
                  [-69.09672272236097, -30.17794131030759],
                  [-69.09243118793714, -30.17794131030759],
                  [-69.09243118793714, -30.17556694832944]]], null, false),
            {
              "id": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.09363281757581, -30.171263271421733],
                  [-69.09363281757581, -30.172895722717648],
                  [-69.08968460590589, -30.172895722717648],
                  [-69.08968460590589, -30.171263271421733]]], null, false),
            {
              "id": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08642303974378, -30.172153702753373],
                  [-69.08642303974378, -30.174082943039835],
                  [-69.08470642597425, -30.174082943039835],
                  [-69.08470642597425, -30.172153702753373]]], null, false),
            {
              "id": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.0900279286598, -30.175715347629243],
                  [-69.0900279286598, -30.178089706031543],
                  [-69.08796799213636, -30.178089706031543],
                  [-69.08796799213636, -30.175715347629243]]], null, false),
            {
              "id": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.08916962177503, -30.18536082270884],
                  [-69.08916962177503, -30.18610274321512],
                  [-69.08728134662854, -30.18610274321512],
                  [-69.08728134662854, -30.18536082270884]]], null, false),
            {
              "id": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.94464527826202, -29.119774059015526],
                  [-68.94464527826202, -29.1212736892978],
                  [-68.94245659570586, -29.1212736892978],
                  [-68.94245659570586, -29.119774059015526]]], null, false),
            {
              "id": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.53071025508049, -28.179429064387172],
                  [-69.53071025508049, -28.179656036463985],
                  [-69.53036693232659, -28.179656036463985],
                  [-69.53036693232659, -28.179429064387172]]], null, false),
            {
              "id": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57715133588073, -28.352515629040525],
                  [-69.57715133588073, -28.35254395453022],
                  [-69.57705477635619, -28.35254395453022],
                  [-69.57705477635619, -28.352515629040525]]], null, false),
            {
              "id": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47886686878964, -28.336536995170597],
                  [-69.47886686878964, -28.336725860036736],
                  [-69.47860937672421, -28.336725860036736],
                  [-69.47860937672421, -28.336536995170597]]], null, false),
            {
              "id": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.1780021325993, -28.048665780989527],
                  [-69.1780021325993, -28.048968779549465],
                  [-69.17716528338666, -28.048968779549465],
                  [-69.17716528338666, -28.048665780989527]]], null, false),
            {
              "id": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.17886043948407, -28.048968779549465],
                  [-69.17886043948407, -28.04919602790915],
                  [-69.17864586276288, -28.04919602790915],
                  [-69.17864586276288, -28.048968779549465]]], null, false),
            {
              "id": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.80196404956354, -29.346356979261873],
                  [-69.80196404956354, -29.34697421184166],
                  [-69.8012559463836, -29.34697421184166],
                  [-69.8012559463836, -29.346356979261873]]], null, false),
            {
              "id": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.78565621875299, -29.34390671608384],
                  [-69.78565621875299, -29.34396282964014],
                  [-69.78557038806451, -29.34396282964014],
                  [-69.78557038806451, -29.34390671608384]]], null, false),
            {
              "id": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.78361773990167, -29.349480511783383],
                  [-69.78361773990167, -29.349592732726922],
                  [-69.78323150180353, -29.349592732726922],
                  [-69.78323150180353, -29.349480511783383]]], null, false),
            {
              "id": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7441487423807, -30.07646548327386],
                  [-69.7441487423807, -30.076771863943524],
                  [-69.7437517754465, -30.076771863943524],
                  [-69.7437517754465, -30.07646548327386]]], null, false),
            {
              "id": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76316196312214, -30.103666908137548],
                  [-69.76316196312214, -30.103745802754784],
                  [-69.76309759010579, -30.103745802754784],
                  [-69.76309759010579, -30.103666908137548]]], null, false),
            {
              "id": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76291519989277, -30.104033535531027],
                  [-69.76291519989277, -30.10419132411715],
                  [-69.76270598758961, -30.10419132411715],
                  [-69.76270598758961, -30.104033535531027]]], null, false),
            {
              "id": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74342827783143, -29.981860271005285],
                  [-69.74342827783143, -29.98217623734693],
                  [-69.74314932809388, -29.98217623734693],
                  [-69.74314932809388, -29.981860271005285]]], null, false),
            {
              "id": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7429562090448, -29.981581476339596],
                  [-69.7429562090448, -29.981860271005285],
                  [-69.74278454766785, -29.981860271005285],
                  [-69.74278454766785, -29.981581476339596]]], null, false),
            {
              "id": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88182823763296, -30.039680219203227],
                  [-69.88182823763296, -30.039865973573555],
                  [-69.88154928789541, -30.039865973573555],
                  [-69.88154928789541, -30.039680219203227]]], null, false),
            {
              "id": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88118450746938, -30.03994027522418],
                  [-69.88118450746938, -30.040256056617686],
                  [-69.88092701540396, -30.040256056617686],
                  [-69.88092701540396, -30.03994027522418]]], null, false),
            {
              "id": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88133471117422, -30.04151917212712],
                  [-69.88133471117422, -30.041574897440466],
                  [-69.88129179582998, -30.041574897440466],
                  [-69.88129179582998, -30.04151917212712]]], null, false),
            {
              "id": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87805168733999, -30.04192782369711],
                  [-69.87805168733999, -30.042076423850098],
                  [-69.87790148363516, -30.042076423850098],
                  [-69.87790148363516, -30.04192782369711]]], null, false),
            {
              "id": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87191479311392, -30.0418349484883],
                  [-69.87191479311392, -30.041909248662325],
                  [-69.87180750475332, -30.041909248662325],
                  [-69.87180750475332, -30.0418349484883]]], null, false),
            {
              "id": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87751524553701, -30.038026989965378],
                  [-69.87751524553701, -30.038175595969],
                  [-69.87740795717642, -30.038175595969],
                  [-69.87740795717642, -30.038026989965378]]], null, false),
            {
              "id": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65829381111547, -29.671069493307634],
                  [-69.65829381111547, -29.67149830844113],
                  [-69.65797194603368, -29.67149830844113],
                  [-69.65797194603368, -29.671069493307634]]], null, false),
            {
              "id": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66898391392893, -29.657680746287763],
                  [-69.66898391392893, -29.65807232533541],
                  [-69.66844747212595, -29.65807232533541],
                  [-69.66844747212595, -29.657680746287763]]], null, false),
            {
              "id": 3,
              "system:index": "57"
            })]),
    Ice = 
    /* color: #f0ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "polygon"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6664965932488, -28.780410229799028],
                  [-69.66469414879079, -28.78199000875054],
                  [-69.66091759849782, -28.778303820643565],
                  [-69.66555245567555, -28.778153361219086]]]),
            {
              "id": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7503002536294, -28.609694338950337],
                  [-69.75922664523097, -28.621599111239046],
                  [-69.74566539645167, -28.614215297481543]]]),
            {
              "id": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71459468722315, -28.575027193903836],
                  [-69.72214778780909, -28.58090634075058],
                  [-69.72386440157862, -28.58844322775932],
                  [-69.7169979465005, -28.582865983339428]]]),
            {
              "id": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71287807345362, -28.565529416440235],
                  [-69.71425136446925, -28.57065530759639],
                  [-69.71322139620753, -28.57382117444781],
                  [-69.70944484591456, -28.570956822829427],
                  [-69.7085865390298, -28.56341868280268]]]),
            {
              "id": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77313121676417, -28.633351866051218],
                  [-69.78652080416651, -28.63741982072103],
                  [-69.79905208468409, -28.644651350719137],
                  [-69.80454524874659, -28.651279815283342],
                  [-69.78737911105128, -28.6435967836418],
                  [-69.7612865817544, -28.62943442732681],
                  [-69.75562175631495, -28.621147055930034],
                  [-69.76334651827784, -28.625818200263797],
                  [-69.76712306857081, -28.62883173146793]]]),
            {
              "id": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76287791236791, -28.635346581010797],
                  [-69.76150462135229, -28.64920684948841],
                  [-69.76579615577612, -28.65975147901714],
                  [-69.76751276954565, -28.66502339607988],
                  [-69.76493784889135, -28.664571527864645],
                  [-69.75875803932104, -28.649357494519283],
                  [-69.75978800758276, -28.63730520830547]]]),
            {
              "id": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-68.9753227851664, -28.0719236623224],
                  [-68.98253256299843, -28.071014858188537],
                  [-68.98939901807655, -28.07889090526378],
                  [-68.98699575879921, -28.085554801701416],
                  [-68.9756661079203, -28.088886594837252],
                  [-68.9698296211039, -28.082525809130686]]]),
            {
              "id": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.01304102257917, -28.316317694400563],
                  [-69.00205469445417, -28.31253960800904],
                  [-69.00411463097761, -28.300297686255536],
                  [-69.01613092736433, -28.300751115885596]]]),
            {
              "id": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.78762284565684, -29.039371098282277],
                  [-69.79277268696544, -29.04987624753345],
                  [-69.79277268696544, -29.056178823621707],
                  [-69.790712750442, -29.066682261162132],
                  [-69.79895249653575, -29.07448412202758],
                  [-69.79448930073497, -29.08318550080515],
                  [-69.78453294087169, -29.091586134673207],
                  [-69.78693620014903, -29.0786848793944],
                  [-69.78418961811778, -29.06428156977653],
                  [-69.78384629536387, -29.050176378937373],
                  [-69.78418961811778, -29.03847060714984]]]),
            {
              "id": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47806056094245, -29.54687213473137],
                  [-69.46913416934089, -29.556429267176906],
                  [-69.46501429629402, -29.583900987202185],
                  [-69.47188075137214, -29.61375307318125],
                  [-69.47119410586433, -29.654337725978525],
                  [-69.4643276507862, -29.6913271216372],
                  [-69.46364100527839, -29.71995472580463],
                  [-69.44716151309089, -29.71935840062693],
                  [-69.44716151309089, -29.61972243000322],
                  [-69.45059474062995, -29.57016606139234]]]),
            {
              "id": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61220201734642, -29.953021980231856],
                  [-69.60808214429954, -29.972058037383096],
                  [-69.59366258863548, -29.971760627031028],
                  [-69.60087236646751, -29.9568889744085],
                  [-69.60087236646751, -29.93904005421775],
                  [-69.58473619703392, -29.932197118853658],
                  [-69.59228929761986, -29.922675730307873],
                  [-69.60396227125267, -29.925353712898385]]]),
            {
              "id": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65408739332298, -30.020524021108553],
                  [-69.65408739332298, -30.041330367573774],
                  [-69.64241441969017, -30.05767514662327],
                  [-69.62662157301048, -30.066292216644737],
                  [-69.62112840894798, -30.06064663481029],
                  [-69.6331447053347, -30.05440640661027],
                  [-69.64516100172142, -30.041330367573774],
                  [-69.64516100172142, -30.01160567861256],
                  [-69.64069780592064, -30.0041731139541],
                  [-69.64344438795189, -29.998523992420935],
                  [-69.65031084303001, -29.99882132262423]]]),
            {
              "id": 0,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76402158693432, -30.40381503012329],
                  [-69.72213621095776, -30.39522749156203],
                  [-69.73724241212963, -30.38575071067887],
                  [-69.75887174562573, -30.37893870664538],
                  [-69.77775449709057, -30.38693535856118]]]),
            {
              "id": 0,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82032651857494, -30.393746805147323],
                  [-69.81311674074291, -30.406479974751043],
                  [-69.78015775636791, -30.430757230400253],
                  [-69.77088804201244, -30.4224681148642],
                  [-69.78977079347729, -30.402038359962724]]]),
            {
              "id": 0,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77638120607494, -30.43993364383142],
                  [-69.76745481447338, -30.466274031728016],
                  [-69.76024503664135, -30.476334772089796],
                  [-69.75887174562573, -30.492311458355523],
                  [-69.74857206300854, -30.484915170367678],
                  [-69.74925870851635, -30.468345445593734],
                  [-69.76196165041088, -30.450589040224568],
                  [-69.77878446535229, -30.438749639006545]]]),
            {
              "id": 0,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60425224320208, -28.3840169435351],
                  [-69.61146202103411, -28.385376154920177],
                  [-69.61249198929583, -28.389755717524267],
                  [-69.60531261559571, -28.392305131952774],
                  [-69.60308101769532, -28.387623636461438]]]),
            {
              "id": 0,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60136440392579, -28.355904837516956],
                  [-69.60548427697266, -28.356358029977635],
                  [-69.60531261559571, -28.360738790685318],
                  [-69.60136440392579, -28.360738790685318]]]),
            {
              "id": 0,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71174266930664, -28.415256568887667],
                  [-69.70985439416016, -28.418427100149565],
                  [-69.70058467980469, -28.41646440151424],
                  [-69.70075634118164, -28.411783973350293]]]),
            {
              "id": 0,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6474554836377, -28.38830322121442],
                  [-69.6474554836377, -28.39139905218598],
                  [-69.64419391747559, -28.39139905218598],
                  [-69.64419391747559, -28.38830322121442]]], null, false),
            {
              "id": 0,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61346653100098, -28.392984686695222],
                  [-69.61346653100098, -28.395551854182187],
                  [-69.61071994896973, -28.395551854182187],
                  [-69.61071994896973, -28.392984686695222]]], null, false),
            {
              "id": 0,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61818721886719, -28.382186801623664],
                  [-69.61818721886719, -28.38430115940846],
                  [-69.61569812890137, -28.38430115940846],
                  [-69.61569812890137, -28.382186801623664]]], null, false),
            {
              "id": 0,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61638477440918, -28.378335541621258],
                  [-69.61638477440918, -28.37984585633005],
                  [-69.6159556209668, -28.37984585633005],
                  [-69.6159556209668, -28.378335541621258]]], null, false),
            {
              "id": 0,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60848835106934, -28.382866421223554],
                  [-69.60848835106934, -28.384603207079017],
                  [-69.60282352562989, -28.384603207079017],
                  [-69.60282352562989, -28.382866421223554]]], null, false),
            {
              "id": 0,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.59939029809082, -28.380223431646684],
                  [-69.59939029809082, -28.380903063829127],
                  [-69.59904697533692, -28.380903063829127],
                  [-69.59904697533692, -28.380223431646684]]], null, false),
            {
              "id": 0,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60084941979493, -28.382639881840877],
                  [-69.60084941979493, -28.384603207079017],
                  [-69.59990528222168, -28.384603207079017],
                  [-69.59990528222168, -28.382639881840877]]], null, false),
            {
              "id": 0,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.60145023461426, -28.385962410948977],
                  [-69.60145023461426, -28.3877746556719],
                  [-69.60042026635254, -28.3877746556719],
                  [-69.60042026635254, -28.385962410948977]]], null, false),
            {
              "id": 0,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62771442528809, -28.38014791669091],
                  [-69.62771442528809, -28.38226231512763],
                  [-69.62393787499512, -28.38226231512763],
                  [-69.62393787499512, -28.38014791669091]]], null, false),
            {
              "id": 0,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.62196376916016, -28.381129606922055],
                  [-69.62196376916016, -28.38279090814976],
                  [-69.62041881676758, -28.38279090814976],
                  [-69.62041881676758, -28.381129606922055]]], null, false),
            {
              "id": 0,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7253535277929, -28.58592260390171],
                  [-69.7253535277929, -28.597377912111316],
                  [-69.71848707271478, -28.597377912111316],
                  [-69.71848707271478, -28.58592260390171]]], null, false),
            {
              "id": 0,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72363691402337, -28.550041329080084],
                  [-69.72363691402337, -28.555771092839205],
                  [-69.71711378169915, -28.555771092839205],
                  [-69.71711378169915, -28.550041329080084]]], null, false),
            {
              "id": 0,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76586561275384, -28.612750179356283],
                  [-69.76586561275384, -28.61606547151623],
                  [-69.76243238521478, -28.61606547151623],
                  [-69.76243238521478, -28.612750179356283]]], null, false),
            {
              "id": 0,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74526624751947, -28.606722107325915],
                  [-69.74526624751947, -28.61244878397061],
                  [-69.74045972896478, -28.61244878397061],
                  [-69.74045972896478, -28.606722107325915]]], null, false),
            {
              "id": 0,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73221998287103, -28.59315768063283],
                  [-69.73221998287103, -28.59677503227455],
                  [-69.72810010982415, -28.59677503227455],
                  [-69.72810010982415, -28.59315768063283]]], null, false),
            {
              "id": 0,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73467650989305, -30.577743640464636],
                  [-69.73467650989305, -30.582177241918295],
                  [-69.7267800865532, -30.582177241918295],
                  [-69.7267800865532, -30.577743640464636]]], null, false),
            {
              "id": 0,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72540679553758, -30.561485367514777],
                  [-69.72540679553758, -30.567397782064194],
                  [-69.72163024524461, -30.567397782064194],
                  [-69.72163024524461, -30.561485367514777]]], null, false),
            {
              "id": 0,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76248565295946, -30.49612920942264],
                  [-69.76248565295946, -30.500862352952804],
                  [-69.7593957481743, -30.500862352952804],
                  [-69.7593957481743, -30.49612920942264]]], null, false),
            {
              "id": 0,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75149932483446, -30.4481931646682],
                  [-69.75149932483446, -30.456480093626944],
                  [-69.74943938831102, -30.456480093626944],
                  [-69.74943938831102, -30.4481931646682]]], null, false),
            {
              "id": 0,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73467650989305, -30.443753448588456],
                  [-69.73467650989305, -30.4470092601519],
                  [-69.73158660510789, -30.4470092601519],
                  [-69.73158660510789, -30.443753448588456]]], null, false),
            {
              "id": 0,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72163024524461, -30.436945491222062],
                  [-69.72163024524461, -30.441977505539658],
                  [-69.71236053088914, -30.441977505539658],
                  [-69.71236053088914, -30.436945491222062]]], null, false),
            {
              "id": 0,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71270385364305, -30.4372414992529],
                  [-69.71270385364305, -30.441977505539658],
                  [-69.70515075305711, -30.441977505539658],
                  [-69.70515075305711, -30.4372414992529]]], null, false),
            {
              "id": 0,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77484527210008, -30.43191321722452],
                  [-69.77484527210008, -30.438129517954064],
                  [-69.76626220325242, -30.438129517954064],
                  [-69.76626220325242, -30.43191321722452]]], null, false),
            {
              "id": 0,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73055663684617, -30.404083015614237],
                  [-69.73055663684617, -30.41296585710997],
                  [-69.71957030872117, -30.41296585710997],
                  [-69.71957030872117, -30.404083015614237]]], null, false),
            {
              "id": 0,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72575011829149, -30.42066366590808],
                  [-69.72575011829149, -30.430137058524554],
                  [-69.71682372668992, -30.430137058524554],
                  [-69.71682372668992, -30.42066366590808]]], null, false),
            {
              "id": 0,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.82291045764696, -30.332102226457515],
                  [-69.82291045764696, -30.338324879778163],
                  [-69.8143273887993, -30.338324879778163],
                  [-69.8143273887993, -30.332102226457515]]], null, false),
            {
              "id": 0,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.81844726184617, -30.312839126760206],
                  [-69.81844726184617, -30.31847027075659],
                  [-69.80986419299852, -30.31847027075659],
                  [-69.80986419299852, -30.312839126760206]]], null, false),
            {
              "id": 0,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.83286681751024, -30.28942195333446],
                  [-69.83286681751024, -30.297722350850346],
                  [-69.82188048938524, -30.297722350850346],
                  [-69.82188048938524, -30.28942195333446]]], null, false),
            {
              "id": 0,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.8967248497368, -30.284085612569623],
                  [-69.8967248497368, -30.290607767416745],
                  [-69.89191833118211, -30.290607767416745],
                  [-69.89191833118211, -30.284085612569623]]], null, false),
            {
              "id": 0,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88779845813524, -30.265109605984733],
                  [-69.88779845813524, -30.26718528538738],
                  [-69.88676848987352, -30.26718528538738],
                  [-69.88676848987352, -30.265109605984733]]], null, false),
            {
              "id": 0,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.8970681724907, -30.250578621603378],
                  [-69.8970681724907, -30.25828920757163],
                  [-69.8912316856743, -30.25828920757163],
                  [-69.8912316856743, -30.250578621603378]]], null, false),
            {
              "id": 0,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87955871204149, -30.226256655879297],
                  [-69.87955871204149, -30.229816343838454],
                  [-69.8750955162407, -30.229816343838454],
                  [-69.8750955162407, -30.226256655879297]]], null, false),
            {
              "id": 0,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.86033263782274, -30.21706019892935],
                  [-69.86033263782274, -30.22002689189411],
                  [-69.85655608752977, -30.22002689189411],
                  [-69.85655608752977, -30.21706019892935]]], null, false),
            {
              "id": 0,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.84556975940477, -30.22002689189411],
                  [-69.84556975940477, -30.225663362024772],
                  [-69.84041991809617, -30.225663362024772],
                  [-69.84041991809617, -30.22002689189411]]], null, false),
            {
              "id": 0,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75699248889696, -30.23485901451813],
                  [-69.75699248889696, -30.238418391035438],
                  [-69.7539025841118, -30.238418391035438],
                  [-69.7539025841118, -30.23485901451813]]], null, false),
            {
              "id": 0,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75458922961961, -30.21795021621313],
                  [-69.75458922961961, -30.224773414531764],
                  [-69.74943938831102, -30.224773414531764],
                  [-69.74943938831102, -30.21795021621313]]], null, false),
            {
              "id": 0,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75767913440477, -30.2040056870785],
                  [-69.75767913440477, -30.208159583249675],
                  [-69.74634948352586, -30.208159583249675],
                  [-69.74634948352586, -30.2040056870785]]], null, false),
            {
              "id": 0,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75596252063524, -30.250875193793625],
                  [-69.75596252063524, -30.254433990243626],
                  [-69.75252929309617, -30.254433990243626],
                  [-69.75252929309617, -30.250875193793625]]], null, false),
            {
              "id": 0,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75870910266649, -30.269260920907396],
                  [-69.75870910266649, -30.274005065874004],
                  [-69.75630584338914, -30.274005065874004],
                  [-69.75630584338914, -30.269260920907396]]], null, false),
            {
              "id": 0,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75252929309617, -30.28171381239156],
                  [-69.75252929309617, -30.283492667900177],
                  [-69.74978271106492, -30.283492667900177],
                  [-69.74978271106492, -30.28171381239156]]], null, false),
            {
              "id": 0,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68661132434617, -30.327064550797026],
                  [-69.68661132434617, -30.330324252873275],
                  [-69.68317809680711, -30.330324252873275],
                  [-69.68317809680711, -30.327064550797026]]], null, false),
            {
              "id": 0,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68386474231492, -30.264813076773642],
                  [-69.68386474231492, -30.270150465553485],
                  [-69.68146148303758, -30.270150465553485],
                  [-69.68146148303758, -30.264813076773642]]], null, false),
            {
              "id": 0,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65777221301805, -30.264220015664876],
                  [-69.65777221301805, -30.268074848840868],
                  [-69.65468230823289, -30.268074848840868],
                  [-69.65468230823289, -30.264220015664876]]], null, false),
            {
              "id": 0,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64712920764696, -30.270743490839482],
                  [-69.64712920764696, -30.274301567321324],
                  [-69.6440393028618, -30.274301567321324],
                  [-69.6440393028618, -30.270743490839482]]], null, false),
            {
              "id": 0,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64060607532274, -30.281120853388725],
                  [-69.64060607532274, -30.285567958565586],
                  [-69.63682952502977, -30.285567958565586],
                  [-69.63682952502977, -30.281120853388725]]], null, false),
            {
              "id": 0,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88505187610399, -30.23960482123321],
                  [-69.88505187610399, -30.2434606204683],
                  [-69.88230529407274, -30.2434606204683],
                  [-69.88230529407274, -30.23960482123321]]], null, false),
            {
              "id": 0,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.87784209827196, -30.249392323889726],
                  [-69.87784209827196, -30.251764904992704],
                  [-69.87543883899461, -30.251764904992704],
                  [-69.87543883899461, -30.249392323889726]]], null, false),
            {
              "id": 0,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88402190784227, -30.269557436685023],
                  [-69.88402190784227, -30.274005065874004],
                  [-69.88230529407274, -30.274005065874004],
                  [-69.88230529407274, -30.269557436685023]]], null, false),
            {
              "id": 0,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88917174915086, -30.28023140816591],
                  [-69.88917174915086, -30.282306767811097],
                  [-69.88642516711961, -30.282306767811097],
                  [-69.88642516711961, -30.28023140816591]]], null, false),
            {
              "id": 0,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88367858508836, -30.27904546866107],
                  [-69.88367858508836, -30.281120853388725],
                  [-69.88127532581102, -30.281120853388725],
                  [-69.88127532581102, -30.27904546866107]]], null, false),
            {
              "id": 0,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.89432159045946, -30.294461564176935],
                  [-69.89432159045946, -30.29712948861081],
                  [-69.89226165393602, -30.29712948861081],
                  [-69.89226165393602, -30.294461564176935]]], null, false),
            {
              "id": 0,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.91045775989305, -30.326175522310564],
                  [-69.91045775989305, -30.327657231971575],
                  [-69.90702453235399, -30.327657231971575],
                  [-69.90702453235399, -30.326175522310564]]], null, false),
            {
              "id": 0,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.89015035099278, -29.62104778628363],
                  [-69.89015035099278, -29.6228385008364],
                  [-69.88706044620763, -29.6228385008364],
                  [-69.88706044620763, -29.62104778628363]]], null, false),
            {
              "id": 0,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.89255361027013, -29.629254966655363],
                  [-69.89255361027013, -29.631045535345326],
                  [-69.89015035099278, -29.631045535345326],
                  [-69.89015035099278, -29.629254966655363]]], null, false),
            {
              "id": 0,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.8853438324381, -29.640147100710827],
                  [-69.8853438324381, -29.64223586850965],
                  [-69.88328389591466, -29.64223586850965],
                  [-69.88328389591466, -29.640147100710827]]], null, false),
            {
              "id": 0,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.88002232975255, -29.645667321537935],
                  [-69.88002232975255, -29.648352724933265],
                  [-69.87710408634435, -29.648352724933265],
                  [-69.87710408634435, -29.645667321537935]]], null, false),
            {
              "id": 0,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73071724927355, -30.5700097956754],
                  [-69.73071724927355, -30.573704772290757],
                  [-69.72556740796496, -30.573704772290757],
                  [-69.72556740796496, -30.5700097956754]]], null, false),
            {
              "id": 0,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73466546094348, -30.586414416755115],
                  [-69.73466546094348, -30.5905520809965],
                  [-69.73157555615832, -30.5905520809965],
                  [-69.73157555615832, -30.586414416755115]]], null, false),
            {
              "id": 0,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73329216992785, -30.59306414810783],
                  [-69.73329216992785, -30.59601943781306],
                  [-69.72985894238879, -30.59601943781306],
                  [-69.72985894238879, -30.59306414810783]]], null, false),
            {
              "id": 0,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72333581006457, -30.572522395089116],
                  [-69.72333581006457, -30.57459154573229],
                  [-69.72161919629504, -30.57459154573229],
                  [-69.72161919629504, -30.572522395089116]]], null, false),
            {
              "id": 0,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73191887891223, -30.536009407651406],
                  [-69.73191887891223, -30.538966435887048],
                  [-69.72917229688098, -30.538966435887048],
                  [-69.72917229688098, -30.536009407651406]]], null, false),
            {
              "id": 0,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72882897412707, -30.540592763040674],
                  [-69.72882897412707, -30.542366907055204],
                  [-69.72642571484973, -30.542366907055204],
                  [-69.72642571484973, -30.540592763040674]]], null, false),
            {
              "id": 0,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70548302686144, -30.533939434319933],
                  [-69.70548302686144, -30.53571369987625],
                  [-69.70256478345324, -30.53571369987625],
                  [-69.70256478345324, -30.533939434319933]]], null, false),
            {
              "id": 0,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.758354730963, -30.50968789080003],
                  [-69.758354730963, -30.51205416143676],
                  [-69.75492150342394, -30.51205416143676],
                  [-69.75492150342394, -30.50968789080003]]], null, false),
            {
              "id": 0,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75612313306262, -30.518708988830916],
                  [-69.75612313306262, -30.521518668049453],
                  [-69.75303322827746, -30.521518668049453],
                  [-69.75303322827746, -30.518708988830916]]], null, false),
            {
              "id": 0,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7525182441466, -30.525067620432818],
                  [-69.7525182441466, -30.52787711581584],
                  [-69.74719674146105, -30.52787711581584],
                  [-69.74719674146105, -30.525067620432818]]], null, false),
            {
              "id": 0,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.69930321729113, -30.531721556800186],
                  [-69.69930321729113, -30.53453085977303],
                  [-69.69638497388293, -30.53453085977303],
                  [-69.69638497388293, -30.531721556800186]]], null, false),
            {
              "id": 0,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67767388379504, -30.52595483827716],
                  [-69.67767388379504, -30.528468578176707],
                  [-69.67458397900988, -30.528468578176707],
                  [-69.67458397900988, -30.52595483827716]]], null, false),
            {
              "id": 0,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6726957038634, -30.52077928665642],
                  [-69.6726957038634, -30.522553792549473],
                  [-69.670464105963, -30.522553792549473],
                  [-69.670464105963, -30.52077928665642]]], null, false),
            {
              "id": 0,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66651589429308, -30.51619499647161],
                  [-69.66651589429308, -30.51930050699529],
                  [-69.66394097363879, -30.51930050699529],
                  [-69.66394097363879, -30.51619499647161]]], null, false),
            {
              "id": 0,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67063576733996, -30.523884650705916],
                  [-69.67063576733996, -30.52595483827716],
                  [-69.66874749219348, -30.52595483827716],
                  [-69.66874749219348, -30.523884650705916]]], null, false),
            {
              "id": 0,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.66548592603137, -30.520631409702805],
                  [-69.66548592603137, -30.524032522709327],
                  [-69.66291100537707, -30.524032522709327],
                  [-69.66291100537707, -30.520631409702805]]], null, false),
            {
              "id": 0,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67406899487902, -30.514124601001537],
                  [-69.67406899487902, -30.51693441273866],
                  [-69.67166573560168, -30.51693441273866],
                  [-69.67166573560168, -30.514124601001537]]], null, false),
            {
              "id": 0,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67698723828723, -30.52077928665642],
                  [-69.67698723828723, -30.522553792549473],
                  [-69.67509896314074, -30.522553792549473],
                  [-69.67509896314074, -30.52077928665642]]], null, false),
            {
              "id": 0,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.68831688916613, -30.530095081103514],
                  [-69.68831688916613, -30.531869416876873],
                  [-69.68711525952746, -30.531869416876873],
                  [-69.68711525952746, -30.530095081103514]]], null, false),
            {
              "id": 0,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70325142896105, -30.5293557649669],
                  [-69.70325142896105, -30.53053866808496],
                  [-69.70187813794543, -30.53053866808496],
                  [-69.70187813794543, -30.5293557649669]]], null, false),
            {
              "id": 0,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.69964654004504, -30.534826571149225],
                  [-69.69964654004504, -30.53571369987625],
                  [-69.69861657178332, -30.53571369987625],
                  [-69.69861657178332, -30.534826571149225]]], null, false),
            {
              "id": 0,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6920934394591, -30.532756572610925],
                  [-69.6920934394591, -30.534235147496606],
                  [-69.69089180982043, -30.534235147496606],
                  [-69.69089180982043, -30.532756572610925]]], null, false),
            {
              "id": 0,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.71355111157824, -30.536157261201378],
                  [-69.71355111157824, -30.53867073711486],
                  [-69.71063286817004, -30.53867073711486],
                  [-69.71063286817004, -30.536157261201378]]], null, false),
            {
              "id": 0,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70616967236926, -30.536452967626104],
                  [-69.70616967236926, -30.53867073711486],
                  [-69.70445305859973, -30.53867073711486],
                  [-69.70445305859973, -30.536452967626104]]], null, false),
            {
              "id": 0,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.72333581006457, -30.538227187268472],
                  [-69.72333581006457, -30.5414798390996],
                  [-69.71835763013293, -30.5414798390996],
                  [-69.71835763013293, -30.538227187268472]]], null, false),
            {
              "id": 0,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.73758370435168, -30.533348005265882],
                  [-69.73758370435168, -30.535861553876362],
                  [-69.73226220166613, -30.535861553876362],
                  [-69.73226220166613, -30.533348005265882]]], null, false),
            {
              "id": 0,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7521749213927, -30.510871033317077],
                  [-69.7521749213927, -30.513385163361633],
                  [-69.75080163037707, -30.513385163361633],
                  [-69.75080163037707, -30.510871033317077]]], null, false),
            {
              "id": 0,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75595147168566, -30.50332825311736],
                  [-69.75595147168566, -30.505990477642353],
                  [-69.75526482617785, -30.505990477642353],
                  [-69.75526482617785, -30.50332825311736]]], null, false),
            {
              "id": 0,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76161629712512, -30.50332825311736],
                  [-69.76161629712512, -30.505990477642353],
                  [-69.7580114082091, -30.505990477642353],
                  [-69.7580114082091, -30.50332825311736]]], null, false),
            {
              "id": 0,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76466017139444, -30.489511412005633],
                  [-69.76466017139444, -30.491878173537774],
                  [-69.76157026660928, -30.491878173537774],
                  [-69.76157026660928, -30.489511412005633]]], null, false),
            {
              "id": 0,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76603346241006, -30.480635543587322],
                  [-69.76603346241006, -30.484481852617066],
                  [-69.76157026660928, -30.484481852617066],
                  [-69.76157026660928, -30.480635543587322]]], null, false),
            {
              "id": 0,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74406080616006, -30.46140171891686],
                  [-69.74406080616006, -30.464952864771764],
                  [-69.74131422412881, -30.464952864771764],
                  [-69.74131422412881, -30.46140171891686]]], null, false),
            {
              "id": 0,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.74646406543741, -30.47264656998857],
                  [-69.74646406543741, -30.476197305852672],
                  [-69.74337416065225, -30.476197305852672],
                  [-69.74337416065225, -30.47264656998857]]], null, false),
            {
              "id": 0,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75872647022229, -30.437323065336344],
                  [-69.75872647022229, -30.440118903028225],
                  [-69.75727141588106, -30.440118903028225],
                  [-69.75727141588106, -30.437323065336344]]], null, false),
            {
              "id": 0,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75967467515841, -30.445298745241086],
                  [-69.75967467515841, -30.447518593367228],
                  [-69.7564131089963, -30.447518593367228],
                  [-69.7564131089963, -30.445298745241086]]], null, false),
            {
              "id": 0,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.75692809312716, -30.452846022606998],
                  [-69.75692809312716, -30.454325812381363],
                  [-69.75555480211153, -30.454325812381363],
                  [-69.75555480211153, -30.452846022606998]]], null, false),
            {
              "id": 0,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7644811937131, -30.44307884656349],
                  [-69.7644811937131, -30.446778649608813],
                  [-69.76242125718966, -30.446778649608813],
                  [-69.76242125718966, -30.44307884656349]]], null, false),
            {
              "id": 0,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.76808608262911, -30.441302891225845],
                  [-69.76808608262911, -30.442190872938546],
                  [-69.76688445299044, -30.442190872938546],
                  [-69.76688445299044, -30.441302891225845]]], null, false),
            {
              "id": 0,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.78044570176974, -30.44825853150857],
                  [-69.78044570176974, -30.450182344387606],
                  [-69.77821410386935, -30.450182344387606],
                  [-69.77821410386935, -30.44825853150857]]], null, false),
            {
              "id": 0,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70851958482638, -30.442486865045502],
                  [-69.70851958482638, -30.445002761671446],
                  [-69.70663130967989, -30.445002761671446],
                  [-69.70663130967989, -30.442486865045502]]], null, false),
            {
              "id": 0,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70199645250216, -30.435974831114862],
                  [-69.70199645250216, -30.439526903537775],
                  [-69.69924987047091, -30.439526903537775],
                  [-69.69924987047091, -30.435974831114862]]], null, false),
            {
              "id": 0,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70748961656466, -30.43242262930368],
                  [-69.70748961656466, -30.436862861351088],
                  [-69.70491469591036, -30.436862861351088],
                  [-69.70491469591036, -30.43242262930368]]], null, false),
            {
              "id": 0,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.7150427171506, -30.433606710949995],
                  [-69.7150427171506, -30.436122836715825],
                  [-69.71366942613497, -30.436122836715825],
                  [-69.71366942613497, -30.433606710949995]]], null, false),
            {
              "id": 0,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.70783293931856, -30.425465859325172],
                  [-69.70783293931856, -30.42813021283128],
                  [-69.70645964830294, -30.42813021283128],
                  [-69.70645964830294, -30.425465859325172]]], null, false),
            {
              "id": 0,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65478957384005, -30.452846022606998],
                  [-69.65478957384005, -30.454029856224167],
                  [-69.65324462144747, -30.454029856224167],
                  [-69.65324462144747, -30.452846022606998]]], null, false),
            {
              "id": 0,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65084136217013, -30.457137351043855],
                  [-69.65084136217013, -30.459504899626342],
                  [-69.64929640977755, -30.459504899626342],
                  [-69.64929640977755, -30.457137351043855]]], null, false),
            {
              "id": 0,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64191497056856, -30.468530650783908],
                  [-69.64191497056856, -30.470749969674053],
                  [-69.63934004991427, -30.470749969674053],
                  [-69.63934004991427, -30.468530650783908]]], null, false),
            {
              "id": 0,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63504851549044, -30.473708982852738],
                  [-69.63504851549044, -30.47474461622221],
                  [-69.63384688585177, -30.47474461622221],
                  [-69.63384688585177, -30.473708982852738]]], null, false),
            {
              "id": 0,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.79675353258028, -30.479034979975435],
                  [-69.79675353258028, -30.48021849532429],
                  [-69.79452193467989, -30.48021849532429],
                  [-69.79452193467989, -30.479034979975435]]], null, false),
            {
              "id": 0,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.8007017442502, -30.479034979975435],
                  [-69.8007017442502, -30.479182920180914],
                  [-69.8007017442502, -30.479182920180914],
                  [-69.8007017442502, -30.479034979975435]]], null, false),
            {
              "id": 0,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.78765547960177, -30.49086948592704],
                  [-69.78765547960177, -30.491017408144817],
                  [-69.78748381822481, -30.491017408144817],
                  [-69.78748381822481, -30.49086948592704]]], null, false),
            {
              "id": 0,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.77340758531466, -30.499152783800863],
                  [-69.77340758531466, -30.499596511997897],
                  [-69.77220595567599, -30.499596511997897],
                  [-69.77220595567599, -30.499152783800863]]], null, false),
            {
              "id": 0,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44198598520087, -29.652277391896302],
                  [-69.44198598520087, -29.6600345189908],
                  [-69.43546285287665, -29.6600345189908],
                  [-69.43546285287665, -29.652277391896302]]], null, false),
            {
              "id": 0,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44164266244697, -29.63168827130631],
                  [-69.44164266244697, -29.638551779291515],
                  [-69.43717946664619, -29.638551779291515],
                  [-69.43717946664619, -29.63168827130631]]], null, false),
            {
              "id": 0,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44610585824775, -29.618855240992808],
                  [-69.44610585824775, -29.622138264793655],
                  [-69.44164266244697, -29.622138264793655],
                  [-69.44164266244697, -29.618855240992808]]], null, false),
            {
              "id": 0,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44438924447822, -29.603931057718732],
                  [-69.44438924447822, -29.60930401821309],
                  [-69.43992604867744, -29.60930401821309],
                  [-69.43992604867744, -29.603931057718732]]], null, false),
            {
              "id": 0,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4491957630329, -29.584526317070186],
                  [-69.4491957630329, -29.58960176351475],
                  [-69.4437025989704, -29.58960176351475],
                  [-69.4437025989704, -29.584526317070186]]], null, false),
            {
              "id": 0,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44610585824775, -29.566610936543267],
                  [-69.44610585824775, -29.571388682188726],
                  [-69.4433592762165, -29.571388682188726],
                  [-69.4433592762165, -29.566610936543267]]], null, false),
            {
              "id": 0,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.45777883188056, -29.55406827888069],
                  [-69.45777883188056, -29.55556153406902],
                  [-69.45606221811103, -29.55556153406902],
                  [-69.45606221811103, -29.55406827888069]]], null, false),
            {
              "id": 0,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44129933969306, -29.672563999450972],
                  [-69.44129933969306, -29.67614356433095],
                  [-69.43683614389228, -29.67614356433095],
                  [-69.43683614389228, -29.672563999450972]]], null, false),
            {
              "id": 0,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.44129933969306, -29.694337715297443],
                  [-69.44129933969306, -29.700898732051222],
                  [-69.43580617563056, -29.700898732051222],
                  [-69.43580617563056, -29.694337715297443]]], null, false),
            {
              "id": 0,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4433592762165, -29.715510365512422],
                  [-69.4433592762165, -29.71938656443608],
                  [-69.44095601693915, -29.71938656443608],
                  [-69.44095601693915, -29.715510365512422]]], null, false),
            {
              "id": 0,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.459838768404, -29.72564780033428],
                  [-69.459838768404, -29.729225474025885],
                  [-69.45503224984931, -29.729225474025885],
                  [-69.45503224984931, -29.72564780033428]]], null, false),
            {
              "id": 0,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.46155538217353, -29.74770808895799],
                  [-69.46155538217353, -29.74949654833998],
                  [-69.45846547738837, -29.74949654833998],
                  [-69.45846547738837, -29.74770808895799]]], null, false),
            {
              "id": 0,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.388758526839, -28.731285750409548],
                  [-69.388758526839, -28.73271574791146],
                  [-69.38704191306947, -28.73271574791146],
                  [-69.38704191306947, -28.731285750409548]]], null, false),
            {
              "id": 0,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38541112998841, -28.726920373856547],
                  [-69.38541112998841, -28.72835043108238],
                  [-69.38395200828431, -28.72835043108238],
                  [-69.38395200828431, -28.726920373856547]]], null, false),
            {
              "id": 0,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.3818062410724, -28.73023205552],
                  [-69.3818062410724, -28.7318125938708],
                  [-69.38051878074525, -28.7318125938708],
                  [-69.38051878074525, -28.73023205552]]], null, false),
            {
              "id": 0,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.38111959556458, -28.724286006702837],
                  [-69.38111959556458, -28.725791367490746],
                  [-69.38008962730287, -28.725791367490746],
                  [-69.38008962730287, -28.724286006702837]]], null, false),
            {
              "id": 0,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61162991479361, -28.46128273146089],
                  [-69.61162991479361, -28.46249003873511],
                  [-69.61042828515494, -28.46249003873511],
                  [-69.61042828515494, -28.46128273146089]]], null, false),
            {
              "id": 0,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61231656030142, -28.46513097531716],
                  [-69.61231656030142, -28.466715505588652],
                  [-69.61034245446646, -28.466715505588652],
                  [-69.61034245446646, -28.46513097531716]]], null, false),
            {
              "id": 0,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6314568038317, -28.450642739895937],
                  [-69.6314568038317, -28.45162377683849],
                  [-69.62939686730826, -28.45162377683849],
                  [-69.62939686730826, -28.450642739895937]]], null, false),
            {
              "id": 0,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6094841475817, -28.45992449429339],
                  [-69.6094841475817, -28.460829987677677],
                  [-69.60871167138541, -28.460829987677677],
                  [-69.60871167138541, -28.45992449429339]]], null, false),
            {
              "id": 0,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.612059068236, -28.4631691430164],
                  [-69.612059068236, -28.464451883642038],
                  [-69.61025662377799, -28.464451883642038],
                  [-69.61025662377799, -28.4631691430164]]], null, false),
            {
              "id": 0,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.63277516124563, -28.43190534083053],
                  [-69.63277516124563, -28.433792276467766],
                  [-69.63011440990286, -28.433792276467766],
                  [-69.63011440990286, -28.43190534083053]]], null, false),
            {
              "id": 0,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64410481212454, -28.430848642177075],
                  [-69.64410481212454, -28.432660119123014],
                  [-69.64221653697805, -28.432660119123014],
                  [-69.64221653697805, -28.430848642177075]]], null, false),
            {
              "id": 0,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64221653697805, -28.426244332049357],
                  [-69.64221653697805, -28.428357810747567],
                  [-69.64015660045462, -28.428357810747567],
                  [-69.64015660045462, -28.426244332049357]]], null, false),
            {
              "id": 0,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.64298901317434, -28.423828876149557],
                  [-69.64298901317434, -28.425263059737468],
                  [-69.64152989147024, -28.425263059737468],
                  [-69.64152989147024, -28.423828876149557]]], null, false),
            {
              "id": 0,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.65208706615286, -28.421186908151213],
                  [-69.65208706615286, -28.422998550454604],
                  [-69.65105709789114, -28.422998550454604],
                  [-69.65105709789114, -28.421186908151213]]], null, false),
            {
              "id": 0,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.67989620921927, -28.42307403487779],
                  [-69.67989620921927, -28.425187576875153],
                  [-69.67672047374563, -28.425187576875153],
                  [-69.67672047374563, -28.42307403487779]]], null, false),
            {
              "id": 0,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.4742716971148, -28.374206712991516],
                  [-69.4742716971148, -28.3746409475755],
                  [-69.4738210860003, -28.3746409475755],
                  [-69.4738210860003, -28.374206712991516]]], null, false),
            {
              "id": 0,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47322027118096, -28.37428223217729],
                  [-69.47322027118096, -28.374716466452135],
                  [-69.4727052870501, -28.374716466452135],
                  [-69.4727052870501, -28.37428223217729]]], null, false),
            {
              "id": 0,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47229759127984, -28.373866875990238],
                  [-69.47229759127984, -28.374338871531325],
                  [-69.47148219973931, -28.374338871531325],
                  [-69.47148219973931, -28.373866875990238]]], null, false),
            {
              "id": 0,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.47407857806573, -28.378020364674523],
                  [-69.47407857806573, -28.378700010974683],
                  [-69.47309152514825, -28.378700010974683],
                  [-69.47309152514825, -28.378020364674523]]], null, false),
            {
              "id": 0,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57172254483459, -28.347256398846884],
                  [-69.57172254483459, -28.348918230432247],
                  [-69.56957677762267, -28.348918230432247],
                  [-69.56957677762267, -28.347256398846884]]], null, false),
            {
              "id": 0,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57601407925841, -28.349975746082666],
                  [-69.57601407925841, -28.3517130703593],
                  [-69.5738683120465, -28.3517130703593],
                  [-69.5738683120465, -28.349975746082666]]], null, false),
            {
              "id": 0,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57777360837218, -28.35078775988043],
                  [-69.57777360837218, -28.351165438600837],
                  [-69.57714060704467, -28.351165438600837],
                  [-69.57714060704467, -28.35078775988043]]], null, false),
            {
              "id": 0,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56430710736231, -28.343820493090398],
                  [-69.56430710736231, -28.34472697923181],
                  [-69.56310547772364, -28.34472697923181],
                  [-69.56310547772364, -28.343820493090398]]], null, false),
            {
              "id": 0,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.55881394329981, -28.343367247118522],
                  [-69.55881394329981, -28.34434927761309],
                  [-69.55744065228419, -28.34434927761309],
                  [-69.55744065228419, -28.343367247118522]]], null, false),
            {
              "id": 0,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57576940898183, -28.313706123104392],
                  [-69.57576940898183, -28.314575085328322],
                  [-69.57465361003163, -28.314575085328322],
                  [-69.57465361003163, -28.313706123104392]]], null, false),
            {
              "id": 0,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.5760698163915, -28.31744638826863],
                  [-69.5760698163915, -28.318164201889513],
                  [-69.57525442485097, -28.318164201889513],
                  [-69.57525442485097, -28.31744638826863]]], null, false),
            {
              "id": 0,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.56971834544423, -28.30773653852213],
                  [-69.56971834544423, -28.30928564012913],
                  [-69.5671005094457, -28.30928564012913],
                  [-69.5671005094457, -28.30773653852213]]], null, false),
            {
              "id": 0,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.57499693278554, -28.3095879012269],
                  [-69.57499693278554, -28.310419114816927],
                  [-69.57413862590077, -28.310419114816927],
                  [-69.57413862590077, -28.3095879012269]]], null, false),
            {
              "id": 0,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.61252912813485, -28.36254151473383],
                  [-69.61252912813485, -28.364391922734633],
                  [-69.61004003816903, -28.364391922734633],
                  [-69.61004003816903, -28.36254151473383]]], null, false),
            {
              "id": 0,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-69.6054051809913, -28.35117401498399],
                  [-69.6054051809913, -28.354195396141524],
                  [-69.60257276827157, -28.354195396141524],
                  [-69.60257276827157, -28.35117401498399]]], null, false),
            {
              "id": 0,
              "system:index": "167"
            })]),
    AOI2 = 
    /* color: #ff0000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-69.79533226909746, -29.042163611195658],
          [-69.79533226909746, -29.947299576163843],
          [-69.08190758648027, -29.947299576163843],
          [-69.08190758648027, -29.042163611195658]]], null, false),
    Vegas = ee.FeatureCollection("users/franciscocorvalan6/JM_ESIA/Vegas_identificadas"),
    Footprint = ee.FeatureCollection("users/franciscocorvalan6/JM_ESIA/Josemaria_Proyect_Footprint");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var start_date = '2020-12-10'
var end_date = '2021-03-01'
Map.setOptions({mapTypeId:'SATELLITE'})
var Mapa_Base = ee.ImageCollection("COPERNICUS/S2_SR")
.filterBounds(AOI)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
.filterDate(start_date, end_date).mosaic();
var Mapa_Base = Mapa_Base.clip(AOI);
var colorizedVis = {bands: ['B4', 'B3', 'B2'], max: 5000};
Map.addLayer(Mapa_Base,colorizedVis,'Sentinel RGB Composite')
var region = ee.FeatureCollection(AOI).style({fillColor: '00000000', width: 3})
Map.addLayer(region,{}, 'Study Area')
Map.centerObject(Footprint, 12)
var styling = {color: 'red'};
  var shown = true; // true or false, 1 or 0 
var opacity = 0.3; // number [0-1]
Map.addLayer(Vegas,styling,'High Andean Wetlands', shown, opacity)
var styling2 = {color: 'black'};
var opacity2 = 0.8; // number [0-1]
Map.addLayer(Footprint,styling2,'Josemaria Footprint', shown, opacity2)
/*****Clases para clasificar****/
var clases = Wetlands.merge(Ice).merge(Water_Bodies).merge(non_vegetated)
//print('clases', clases)
/************
Colección Sentinel
*************/
var Sentinel = ee.ImageCollection("COPERNICUS/S2_SR")
.filterBounds(AOI2)
.filterDate(start_date, end_date)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
//print(Sentinel)