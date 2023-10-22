var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Biase_LGA"
    }) || ee.FeatureCollection("users/idakwovicks/Biase_LGA"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.102179183419622,
            5.620689793996859
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.101878776009954,
            5.620433539871805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.158989304990255,
            5.49833611487199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.156714791745626,
            5.500472005536186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.15461193987795,
            5.501967124439208
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.176727459981898,
            5.420297725367386
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
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
            ee.Geometry.Point([8.102179183419622, 5.620689793996859]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.101878776009954, 5.620433539871805]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.158989304990255, 5.49833611487199]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.156714791745626, 5.500472005536186]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.15461193987795, 5.501967124439208]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.176727459981898, 5.420297725367386]),
            {
              "landcover": 1,
              "system:index": "5"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.081249255472045,
            5.514586306347419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.057559985452514,
            5.499208087377012
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.048849976545593,
            5.4789137776867936
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.051596558576843,
            5.444737376955163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.08489886570575,
            5.436534751176118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.117514527326843,
            5.384924007083224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.135023987776062,
            5.369884288333537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.15081683445575,
            5.33535989566213
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.175536072737,
            5.328523151407849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.186179078108093,
            5.3466403570762635
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.165236390119812,
            5.351425944605094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.179312623029968,
            5.395519949181011
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.169356263166687,
            5.451572812943644
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.223601258283875,
            5.457382872347992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.231154358869812,
            5.4508892728453295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.226691163069031,
            5.478230268793525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.188239014631531,
            5.485748823587927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.146010315901062,
            5.531883330382309
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.161459839826843,
            5.559220601695126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.037177002912781,
            5.559562309565966
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.053656495100281,
            5.601249177812863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.149786866194031,
            5.656257619941442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.029623902326843,
            5.67299828390677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.934469855314514,
            5.693667208757079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.927431738859436,
            5.6935818015044
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9230543737471315,
            5.6904217242335475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.903742468839905,
            5.689311422690629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.908892310148499,
            5.702464087764823
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9409071569502565,
            5.70886949734375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9538675909102174,
            5.722448728800593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.019871390348694,
            5.737564852383755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.018841422086975,
            5.7350882267863135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.000044501310608,
            5.740041467225056
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.046410808671553,
            5.755071726305996
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.041775951493818,
            5.758573036449632
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.033622036088545,
            5.763099088317745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.018395649924472,
            5.7846430227779715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.010327565207675,
            5.791986826221988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.009469258322909,
            5.7942924192435505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.006808506980136,
            5.783191329410043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.991187321677402,
            5.7706382961855045
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.986380803122715,
            5.768588794963841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.947719107105926,
            5.758597370497711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.937591085865692,
            5.757743394439534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923686514332489,
            5.7581703826290624
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9174208740736995,
            5.741944606066451
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.953040609791473,
            5.732208918259662
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.955787191822723,
            5.718202900727071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962567816212371,
            5.714615938620927
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.924201498463348,
            5.686147565434707
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.916734228565887,
            5.691357451995774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.903516302540496,
            5.687087056662533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.893903265431121,
            5.6910158215361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.912099371388153,
            5.670175980083938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.906348715260223,
            5.675215191168753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.903087149098114,
            5.678289942400686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9152751068617855,
            5.676667159072203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.922484884693817,
            5.67307993760961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929351339771942,
            5.674958961159137
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.954156408741668,
            5.687599505776576
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.946603308155731,
            5.689222258292711
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.94162512822409,
            5.6963110708417615
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.906606207325653,
            5.668809406779523
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.909266958668426,
            5.665649193622361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.085287020836466,
            5.72435281209092
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.081038401756876,
            5.725505747021953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.079235957298868,
            5.728836434865909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.077090190086954,
            5.728025115257057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.075845645104044,
            5.729178042777474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.067906306419962,
            5.725975460586277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.065331385765665,
            5.723584187511522
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96711930858113,
            5.747206241699938
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.968320938219802,
            5.751134593741054
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9673768006465595,
            5.752757166016923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962999435534255,
            5.7548067243800896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.966261001696364,
            5.747804036150991
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967720123400466,
            5.745327455053123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.966947647204177,
            5.744644258371905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.970895858874099,
            5.737214441566382
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.972011657824294,
            5.735506424014403
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9734707795283954,
            5.73311519085033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.973041626086013,
            5.731748767400637
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.974329086413161,
            5.730126135305874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.975015731920974,
            5.727137064114082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.975702377428786,
            5.725429016410814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.928752990832106,
            5.751476188289023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.927208038439528,
            5.751476188289023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926864715685622,
            5.748401829974242
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926092239489333,
            5.746950043885904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.924718948473708,
            5.746950043885904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.923129626122263,
            5.733886697276435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9241595943839815,
            5.735423917668094
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.926047869530466,
            5.731068449136812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9269061764152315,
            5.733032684158244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9251895626457,
            5.728933403404856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.925103731957224,
            5.726712947376672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.944243975487497,
            5.7148419015304075
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.947934695091989,
            5.713219221453798
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.948964663353708,
            5.712365177461378
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.948535509911325,
            5.710571680932541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.949222155419138,
            5.709632228129161
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9467330654533175,
            5.7133900300994425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.944587298241403,
            5.714329476739836
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
            ee.Geometry.Point([8.081249255472045, 5.514586306347419]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.057559985452514, 5.499208087377012]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.048849976545593, 5.4789137776867936]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.051596558576843, 5.444737376955163]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.08489886570575, 5.436534751176118]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.117514527326843, 5.384924007083224]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.135023987776062, 5.369884288333537]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.15081683445575, 5.33535989566213]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.175536072737, 5.328523151407849]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.186179078108093, 5.3466403570762635]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.165236390119812, 5.351425944605094]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.179312623029968, 5.395519949181011]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.169356263166687, 5.451572812943644]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.223601258283875, 5.457382872347992]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.231154358869812, 5.4508892728453295]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.226691163069031, 5.478230268793525]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.188239014631531, 5.485748823587927]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.146010315901062, 5.531883330382309]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.161459839826843, 5.559220601695126]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.037177002912781, 5.559562309565966]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.053656495100281, 5.601249177812863]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.149786866194031, 5.656257619941442]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([8.029623902326843, 5.67299828390677]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.934469855314514, 5.693667208757079]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.927431738859436, 5.6935818015044]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9230543737471315, 5.6904217242335475]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([7.903742468839905, 5.689311422690629]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([7.908892310148499, 5.702464087764823]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9409071569502565, 5.70886949734375]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9538675909102174, 5.722448728800593]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.019871390348694, 5.737564852383755]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.018841422086975, 5.7350882267863135]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.000044501310608, 5.740041467225056]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.046410808671553, 5.755071726305996]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.041775951493818, 5.758573036449632]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([8.033622036088545, 5.763099088317745]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([8.018395649924472, 5.7846430227779715]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([8.010327565207675, 5.791986826221988]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([8.009469258322909, 5.7942924192435505]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([8.006808506980136, 5.783191329410043]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([7.991187321677402, 5.7706382961855045]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([7.986380803122715, 5.768588794963841]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([7.947719107105926, 5.758597370497711]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([7.937591085865692, 5.757743394439534]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923686514332489, 5.7581703826290624]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9174208740736995, 5.741944606066451]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([7.953040609791473, 5.732208918259662]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([7.955787191822723, 5.718202900727071]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962567816212371, 5.714615938620927]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([7.924201498463348, 5.686147565434707]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([7.916734228565887, 5.691357451995774]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([7.903516302540496, 5.687087056662533]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([7.893903265431121, 5.6910158215361]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([7.912099371388153, 5.670175980083938]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([7.906348715260223, 5.675215191168753]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([7.903087149098114, 5.678289942400686]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9152751068617855, 5.676667159072203]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([7.922484884693817, 5.67307993760961]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929351339771942, 5.674958961159137]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([7.954156408741668, 5.687599505776576]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([7.946603308155731, 5.689222258292711]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([7.94162512822409, 5.6963110708417615]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([7.906606207325653, 5.668809406779523]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([7.909266958668426, 5.665649193622361]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([8.085287020836466, 5.72435281209092]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([8.081038401756876, 5.725505747021953]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([8.079235957298868, 5.728836434865909]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([8.077090190086954, 5.728025115257057]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([8.075845645104044, 5.729178042777474]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([8.067906306419962, 5.725975460586277]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([8.065331385765665, 5.723584187511522]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96711930858113, 5.747206241699938]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([7.968320938219802, 5.751134593741054]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9673768006465595, 5.752757166016923]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962999435534255, 5.7548067243800896]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([7.966261001696364, 5.747804036150991]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967720123400466, 5.745327455053123]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([7.966947647204177, 5.744644258371905]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([7.970895858874099, 5.737214441566382]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([7.972011657824294, 5.735506424014403]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9734707795283954, 5.73311519085033]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([7.973041626086013, 5.731748767400637]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([7.974329086413161, 5.730126135305874]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([7.975015731920974, 5.727137064114082]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([7.975702377428786, 5.725429016410814]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([7.928752990832106, 5.751476188289023]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([7.927208038439528, 5.751476188289023]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926864715685622, 5.748401829974242]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926092239489333, 5.746950043885904]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([7.924718948473708, 5.746950043885904]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([7.923129626122263, 5.733886697276435]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9241595943839815, 5.735423917668094]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([7.926047869530466, 5.731068449136812]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9269061764152315, 5.733032684158244]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9251895626457, 5.728933403404856]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([7.925103731957224, 5.726712947376672]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([7.944243975487497, 5.7148419015304075]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([7.947934695091989, 5.713219221453798]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([7.948964663353708, 5.712365177461378]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([7.948535509911325, 5.710571680932541]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([7.949222155419138, 5.709632228129161]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9467330654533175, 5.7133900300994425]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([7.944587298241403, 5.714329476739836]),
            {
              "landcover": 2,
              "system:index": "102"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            7.932441244557098,
            5.667955296821216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.937591085865692,
            5.668980228619533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.935445318653778,
            5.665051313511959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.918708334400848,
            5.658218354027319
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.914330969288543,
            5.659157890746059
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.938706884815887,
            5.648822902927278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.929179678394989,
            5.660268250354469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.016812811329558,
            5.644295949343656
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.014409552052214,
            5.6471146227107685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.025825033619597,
            5.635839847042132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027112493946746,
            5.6332773674758805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.02925826115866,
            5.632081539809417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.02951575322409,
            5.625675278269341
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.031146536305144,
            5.608842163748614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.010633001759246,
            5.585692950344507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.00230492930691,
            5.542158046972361
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.998356717636987,
            5.547369221325909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.028795515368254,
            5.441178129905857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027422224352629,
            5.442887006310369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05444508698903,
            5.327459161758205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.05646210816823,
            5.327117321955362
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.056032954725847,
            5.327373701825324
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9612682702573645,
            5.766588116549752
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.962255323174845,
            5.766161134690417
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.957277143243204,
            5.7723523401903325
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.956161344293009,
            5.773120898914489
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#f8ff43",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f8ff43 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.932441244557098, 5.667955296821216]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.937591085865692, 5.668980228619533]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.935445318653778, 5.665051313511959]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.918708334400848, 5.658218354027319]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.914330969288543, 5.659157890746059]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.938706884815887, 5.648822902927278]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.929179678394989, 5.660268250354469]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.016812811329558, 5.644295949343656]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.014409552052214, 5.6471146227107685]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.025825033619597, 5.635839847042132]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027112493946746, 5.6332773674758805]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.02925826115866, 5.632081539809417]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.02951575322409, 5.625675278269341]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.031146536305144, 5.608842163748614]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.010633001759246, 5.585692950344507]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.00230492930691, 5.542158046972361]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([7.998356717636987, 5.547369221325909]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.028795515368254, 5.441178129905857]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027422224352629, 5.442887006310369]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05444508698903, 5.327459161758205]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.05646210816823, 5.327117321955362]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.056032954725847, 5.327373701825324]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9612682702573645, 5.766588116549752]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([7.962255323174845, 5.766161134690417]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([7.957277143243204, 5.7723523401903325]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([7.956161344293009, 5.773120898914489]),
            {
              "landcover": 3,
              "system:index": "25"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            8.048436938795671,
            5.327630081588306
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.046291171583757,
            5.3243398665086445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.043072520765886,
            5.321690589620695
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.043287097487077,
            5.319126762412956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.039295970472917,
            5.315879232616854
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.03749352601491,
            5.31387088325021
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.035047351393327,
            5.312717147673999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.03350239900075,
            5.311905258380858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.030026256117448,
            5.312204375613318
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.038652240309343,
            5.308102183769919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044145404371843,
            5.30904227181167
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.049938975844011,
            5.310495132329508
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.058479129347429,
            5.312802609642626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.060796557936296,
            5.3104524011866765
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.08439999726735,
            5.309170465524495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.082983790907488,
            5.314554577386834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.133727390788245,
            5.289937497938055
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.13209660770719,
            5.288313658386216
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.131066639445471,
            5.286689814574519
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.127890903971839,
            5.285236898080586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.125745136759924,
            5.286604348992783
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.11913617374723,
            5.290963078617503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.122311909220862,
            5.292415981669763
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.123513538859534,
            5.293783416718995
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.136645634196448,
            5.290621218579894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.096011872663492,
            5.330642238002961
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.099788422956461,
            5.340128167422345
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.096097703351969,
            5.36473962342375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.078849937527082,
            5.393465012725699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.061791133908395,
            5.408975698237805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.044882488278512,
            5.421023817047864
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.036728572873239,
            5.429910218733456
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.027888011960153,
            5.438198379155518
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.022394847897653,
            5.448109843804281
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.015270900754098,
            5.468615802901664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            8.007299286306035,
            5.659037043312375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.997857910573614,
            5.667065751023832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.990648132741582,
            5.672190399711641
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9890262322777295,
            5.696116843372074
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.983447237526753,
            5.709098542662585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978984041725972,
            5.7228485745083395
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.978469057595112,
            5.734207047083564
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9664527612083935,
            5.730876390565719
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.963620348488667,
            5.729851569265965
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.967568560158589,
            5.727716518984441
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.9752933221214795,
            5.74539449453033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.976323290383198,
            5.750689240388117
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.969679677728068,
            5.761933996950164
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.96238406920756,
            5.761592408687531
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.949337804559122,
            5.7688084170378335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.950925672295939,
            5.771669176005084
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            7.951741063836466,
            5.7725231311079845
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#121eff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #121eff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([8.048436938795671, 5.327630081588306]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([8.046291171583757, 5.3243398665086445]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([8.043072520765886, 5.321690589620695]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([8.043287097487077, 5.319126762412956]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([8.039295970472917, 5.315879232616854]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([8.03749352601491, 5.31387088325021]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([8.035047351393327, 5.312717147673999]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([8.03350239900075, 5.311905258380858]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([8.030026256117448, 5.312204375613318]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([8.038652240309343, 5.308102183769919]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044145404371843, 5.30904227181167]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([8.049938975844011, 5.310495132329508]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([8.058479129347429, 5.312802609642626]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([8.060796557936296, 5.3104524011866765]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([8.08439999726735, 5.309170465524495]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([8.082983790907488, 5.314554577386834]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([8.133727390788245, 5.289937497938055]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([8.13209660770719, 5.288313658386216]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([8.131066639445471, 5.286689814574519]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([8.127890903971839, 5.285236898080586]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([8.125745136759924, 5.286604348992783]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([8.11913617374723, 5.290963078617503]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([8.122311909220862, 5.292415981669763]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([8.123513538859534, 5.293783416718995]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([8.136645634196448, 5.290621218579894]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([8.096011872663492, 5.330642238002961]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([8.099788422956461, 5.340128167422345]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([8.096097703351969, 5.36473962342375]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([8.078849937527082, 5.393465012725699]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([8.061791133908395, 5.408975698237805]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([8.044882488278512, 5.421023817047864]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([8.036728572873239, 5.429910218733456]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([8.027888011960153, 5.438198379155518]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([8.022394847897653, 5.448109843804281]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([8.015270900754098, 5.468615802901664]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([8.007299286306035, 5.659037043312375]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([7.997857910573614, 5.667065751023832]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([7.990648132741582, 5.672190399711641]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9890262322777295, 5.696116843372074]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([7.983447237526753, 5.709098542662585]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978984041725972, 5.7228485745083395]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([7.978469057595112, 5.734207047083564]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9664527612083935, 5.730876390565719]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([7.963620348488667, 5.729851569265965]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([7.967568560158589, 5.727716518984441]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([7.9752933221214795, 5.74539449453033]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([7.976323290383198, 5.750689240388117]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([7.969679677728068, 5.761933996950164]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([7.96238406920756, 5.761592408687531]),
            {
              "landcover": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([7.949337804559122, 5.7688084170378335]),
            {
              "landcover": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([7.950925672295939, 5.771669176005084]),
            {
              "landcover": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([7.951741063836466, 5.7725231311079845]),
            {
              "landcover": 4,
              "system:index": "51"
            })]);
//Determine Land Cover in 2001//
//load Landsat 7 Tier 1 TOA image collection
var landsat_7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
    .filterBounds(table)
    .filterDate('2000-12-15', '2000-12-31')
    .sort('CLOUD_COVER')
    .median();
    //clip by asset/table
var landsat_2001 = landsat_7.clip(table);
//Display the cliped image collection with visual parameters 
Map.addLayer(landsat_2001, {
 bands: ['B5', 'B4', 'B3'], min: 0, max: 0.3, gamma: 1.4}, 'landsat_2001');
//Merge feature
var classNames = urban.merge(vegetation).merge(baresurface).merge(waterbody);
print(classNames)
var bands = ['B5', 'B4', 'B3'];
var training = landsat_2001.select(bands).sampleRegions({
  collection: classNames,
  properties: ['landcover'],
  scale: 30
});
print(training);
// Train a CART classifier with default parameters.
var classifier = ee.Classifier.smileCart().train(training, 'landcover', bands);
//Run the classification
var classified = landsat_2001.select(bands).classify(classifier);
//Display classification
Map.centerObject(classNames, 10);
Map.addLayer(classified,
{min: 1, max: 4, palette: ['red', 'green', 'yellow','blue']},
'classification');
Export.image.toDrive({
  image:classified,
  description:"2001imageclassification",
  fileNamePrefix:"2001final",
  scale:5,
  folder:"BIU",
  region:table,
  maxPixels:5000000000,
  fileFormat:"GeoTIFF"
})                
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