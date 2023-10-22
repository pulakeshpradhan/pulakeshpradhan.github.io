var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Ardo_kola"
    }) || ee.FeatureCollection("users/idakwovicks/Ardo_kola"),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.31827448764382,
            8.909576940747156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.316214551120382,
            8.908050626575244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.313639630466085,
            8.909322555494455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.315356244235616,
            8.907117875888327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.313982953219991,
            8.90508277522033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.318360318332296,
            8.908050626575244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.321278561740499,
            8.910424890310729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.31501292148171,
            8.912544755611462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10756847473183,
            8.827483002428679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.106838913879779,
            8.827991886162422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10555145355263,
            8.827058932114353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.10705349060097,
            8.82710133916772
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.107010575256732,
            8.826592454205647
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.105465622864154,
            8.826295604320316
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.102847786865619,
            8.826634861312625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.102118226013568,
            8.827186153259827
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.101259919128802,
            8.826465232855458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.103663178406146,
            8.825574682175981
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#fb3800",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fb3800 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.31827448764382, 8.909576940747156]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.316214551120382, 8.908050626575244]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.313639630466085, 8.909322555494455]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.315356244235616, 8.907117875888327]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.313982953219991, 8.90508277522033]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.318360318332296, 8.908050626575244]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.321278561740499, 8.910424890310729]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.31501292148171, 8.912544755611462]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10756847473183, 8.827483002428679]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.106838913879779, 8.827991886162422]),
            {
              "landcover": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10555145355263, 8.827058932114353]),
            {
              "landcover": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.10705349060097, 8.82710133916772]),
            {
              "landcover": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.107010575256732, 8.826592454205647]),
            {
              "landcover": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.105465622864154, 8.826295604320316]),
            {
              "landcover": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.102847786865619, 8.826634861312625]),
            {
              "landcover": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.102118226013568, 8.827186153259827]),
            {
              "landcover": 1,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.101259919128802, 8.826465232855458]),
            {
              "landcover": 1,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.103663178406146, 8.825574682175981]),
            {
              "landcover": 1,
              "system:index": "17"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.195097308255173,
            8.833815456571175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.191835742093064,
            8.83551170382573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.185999255276657,
            8.837886436867834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.184110980130173,
            8.843653581963496
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.185655932522751,
            8.846367501348679
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.171923022366501,
            8.824146698237112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172094683743454,
            8.821262984420503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.242555587199513,
            8.780134692694947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.234315841105763,
            8.78081329103365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.230195968058888,
            8.783697320122016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.228994338420216,
            8.775723773239111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.235517470744435,
            8.769955568702109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.174406020549123,
            8.76190683856512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.129285134247459,
            8.736052777582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.132890023163474,
            8.730623302874832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.137868203095115,
            8.729774940313181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.147309578827537,
            8.724345374250905
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.38140861130509,
            8.607298397409814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.380378643043372,
            8.615105805357697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.375572124488684,
            8.622573609967649
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.380550304420325,
            8.591852833509614
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3791770134047,
            8.577934313948278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.394283214576575,
            8.571823583225255
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.395828166969153,
            8.579461981271416
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.405097881324622,
            8.57878301877527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.413680950172278,
            8.580650162718744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.463492883508083,
            8.580200536077022
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.458858026330349,
            8.590724279007862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.454738153283474,
            8.595307108067505
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.449416650597927,
            8.590554543534584
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.443751825158474,
            8.597004438104802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.467956079308864,
            8.58580191944794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.485122217004177,
            8.586650606686923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.482740159354687,
            8.601373508971427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.46917891057539,
            8.608841584653629
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.458535905204297,
            8.623777293799625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.4850316729277,
            8.6101401603545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.499107905837857,
            8.604708865824987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.50528771540817,
            8.599616956445699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.512744927021824,
            8.61047961367469
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.496437096211277,
            8.618286955965571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.504333519551121,
            8.628470203575223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.478069328877293,
            8.63356172441295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.476181053730809,
            8.64102916403181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.470687889668309,
            8.647647907326737
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.460559868428074,
            8.644762828386838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.447856926533543,
            8.633392008158262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.441505455586277,
            8.63169484141353
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.43669893703159,
            8.639671458734588
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.430519127461277,
            8.642386864439793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.424510979267918,
            8.646969067210701
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.441848778340184,
            8.648326746219569
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.449105781709976,
            8.657578953908779
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.45425562301857,
            8.659106299407366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.460778755342789,
            8.659954822005203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.457860511934586,
            8.66759143923811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.449105781709976,
            8.669797544224846
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.473310035860367,
            8.670306643536371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.47845987716896,
            8.6701369438425
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.481034797823257,
            8.674888506294138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.488759559786148,
            8.672852129746122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.468160194551773,
            8.67828244266728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.455628914034195,
            8.681167264458571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.450650734102554,
            8.683712677033967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.434342903292007,
            8.691009430680285
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.502492469942398,
            8.66317919042062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.551244300997086,
            8.655033364301852
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.564462227022476,
            8.641965733413002
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.581628364717789,
            8.62804905701402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.573388618624039,
            8.61684745706512
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.565492195284195,
            8.61803552128444
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.542821747691567,
            8.61256781507806
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.539731842906411,
            8.616132036875335
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.485895597200422,
            8.751830480495581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.463493787508039,
            8.742329250110744
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.45671316311839,
            8.74300791746219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.471836760018522,
            8.732073399793174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.469004347298796,
            8.739114707206038
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.429264738534147,
            8.735721322642203
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.423514082406218,
            8.736315167170515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.412752048878314,
            8.742747647660115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.404426472096088,
            8.745462306598931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.399190800099017,
            8.749534257906694
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.396100895313861,
            8.749703921578122
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.393697636036517,
            8.747752784688672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3886336254164,
            8.747752784688672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.400263683704974,
            8.755302779346874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.398160831837298,
            8.755896592653793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.391723530201556,
            8.75822942146811
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.390607731251361,
            8.760901552856472
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.38889111748183,
            8.765779203480658
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.389577762989642,
            8.770911271097992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.39537133446181,
            8.772353326922033
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.365759746937396,
            8.784610575206594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3536576198622,
            8.786900811979804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.423060694193925,
            8.794364464796189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.425292292094316,
            8.789614423985547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.413576403117265,
            8.79733320936766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.409156122660722,
            8.803447775573797
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.41194562003621,
            8.809936412859699
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.370058246741456,
            8.82029816599136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.369242855200929,
            8.82004371890822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.368384548316163,
            8.821570398776812
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.368577667365235,
            8.82358475838741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.366346069464845,
            8.821697621814245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.368873428567724,
            8.871318247333193
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.368186783059912,
            8.871593859944173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.367435764535742,
            8.871657462825013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.366920780404882,
            8.872675107419596
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.369624447091894,
            8.870406604145723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.352326787967714,
            8.88656596565832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.351597227115663,
            8.88754116880671
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.352455534000429,
            8.883725141696399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.303018536403119,
            8.874510017254181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302932705714642,
            8.876036471222733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302203144862592,
            8.87959817244967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.212424244716107,
            8.91551005802521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.215127911403119,
            8.91563724851968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.094192471339642,
            8.995567457076245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.093076672389447,
            8.996499980971201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.085308995082318,
            8.992430768161858
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.087883915736615,
            8.989633157824631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.088484730555951,
            8.989039722550453
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.094321217372357,
            8.990820025455822
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.09625240786308,
            8.990904801566343
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.097024884059369,
            8.99268509530253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.097539868190228,
            8.99429582971112
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.095308270289838,
            8.997644438830834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.090630497767865,
            8.999848569694718
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.089128460719525,
            9.0001028916226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.087626423671185,
            9.000272439475198
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.07754131777519,
            9.00315474080957
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.076897587611615,
            9.002858034379866
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.000529791466578,
            9.009102444194586
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.982076193444117,
            9.012832385731464
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.981475378624781,
            9.015799357179105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.997096563927515,
            8.998929680737225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.015893484703883,
            8.988332747974145
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.007911230675562,
            8.977142050435289
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.00645210897146,
            8.970953107273829
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.004736906575427,
            8.963987964971873
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.001389509724842,
            8.9588162022057
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.987999922322498,
            8.968311841259782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.98593998579906,
            8.96805749702106
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.9455137315266,
            8.960851002897533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.946028715657459,
            8.958392283960894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.92583759475942,
            8.941160130905955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.924979287874654,
            8.939125220078028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.9233485047936,
            8.937429452370727
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.92257602859731,
            8.933698735633133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.918027002108053,
            8.920179490369422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.918971139681295,
            8.917042150933465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.925150949251607,
            8.899659106463387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.923777658235982,
            8.897115176986722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.923262674105123,
            8.895080020674234
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.925751764070943,
            8.894656028351664
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.928930566846589,
            8.898305376661853
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.929188058912018,
            8.894489461702037
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.930218027173737,
            8.891351901828015
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.932707117139557,
            8.892284692706774
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.936569498121003,
            8.89474385727024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.955709741651276,
            8.895761437775326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.953220651685456,
            8.894998252661685
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.958456323682526,
            8.894065468695532
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.960258768140534,
            8.893217481209557
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.956568048536042,
            8.889231913723101
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.954508112012604,
            8.886772712151592
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.967726038037995,
            8.887959914971082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.967640207349518,
            8.886433510639517
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.941290185987214,
            8.877359753693392
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.927798204675438,
            8.860193529343402
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.92728322054458,
            8.855868373390791
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.924879961267235,
            8.852645675096698
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.92376416231704,
            8.850016610840802
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.922542575901057,
            8.841326569512562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.889326099460627,
            8.829849031736515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.89550590903094,
            8.83748216503999
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.878339771335627,
            8.840959428912262
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.881343845432307,
            8.845878429058388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.875679019992853,
            8.837058106225264
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.872245792453791,
            8.827540960261533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.866409305637385,
            8.82177356313807
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.941124919956232,
            8.808330089292634
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.940652851169611,
            8.81049295248221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.91441929867114,
            8.810335448918856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.913003092311277,
            8.810547493738863
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.926607256434812,
            8.810674720572466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.173252320670333,
            8.666880613655914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.1755697492592,
            8.671547367752327
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.177629685782637,
            8.677571637315904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.171020722769942,
            8.678589814172751
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.170505738639083,
            8.682832188011883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.169733262442794,
            8.677571637315904
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.163467622184005,
            8.669765523028115
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.194967484854903,
            8.646261352463785
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.196684098624434,
            8.648594864621613
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172908997916426,
            8.640321438131553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.163038468741622,
            8.644903666012432
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.161965585135665,
            8.64570979293288
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.160635209464278,
            8.644564243635287
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.160120225333419,
            8.642103422259463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.156655921643903,
            8.63087151507239
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.155454292005231,
            8.629980497532955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.150046958631208,
            8.62641640634722
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.148845328992536,
            8.624931358425515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172577514356306,
            8.614408565959678
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.178371085828473,
            8.616317965377977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.17995895356529,
            8.619372984391427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.263458560136907,
            8.628993459294282
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24491913142597,
            8.628866170569896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.240241358903997,
            8.634000115073741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.151334651267888,
            8.714132287186132
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.15476787880695,
            8.720410387497521
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.157342799461247,
            8.723973586686721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.148931391990544,
            8.704630096988375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.11082256630695,
            8.671031134380955
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.086274989402654,
            8.670012937031412
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.081296809471013,
            8.672049328971047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.070825465476872,
            8.66780683330914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.129705317771794,
            8.632083122843278
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.12807453469074,
            8.635392587520313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.129876979148747,
            8.638023166939941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.127902873313786,
            8.64243571056937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.126357920921208,
            8.643878261707947
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.123268016136052,
            8.645151096362799
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.121122248924138,
            8.64175686106454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.121723063743474,
            8.640823440999446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.121980555808904,
            8.636750308221163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.121980555808904,
            8.63513801434492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.132280238426091,
            8.630131373660248
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.167814143455388,
            8.629876796935879
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.166097529685857,
            8.63123453748199
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.164466746604802,
            8.627670458134013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.170474894798161,
            8.634968298799231
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.229354747093083,
            8.624106345146721
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.229612239158513,
            8.622493997271734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.241456874168279,
            8.607558237438736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.240598567283513,
            8.610613327202673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.255103953636052,
            8.61324407917804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.258108027732732,
            8.603399881193925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.26214207009113,
            8.60009013644498
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.250297435081364,
            8.60229663615776
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.286003001487614,
            8.601532849250173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.284286387718083,
            8.608491739705405
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.282226451194646,
            8.611886273991225
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.361005498283037,
            8.681284433427832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.365468694083818,
            8.680945043885755
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.365983678214677,
            8.68705400866925
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.36315126549495,
            8.687732776392235
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.36392374169124,
            8.69231442637933
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.373536778800615,
            8.691975046819296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.375682546012529,
            8.694605230370295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.376111699454912,
            8.69307802926571
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.382205678336748,
            8.687902468131004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.384952260367998,
            8.686035854781133
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.385982228629716,
            8.684423772138835
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.374356811950118,
            8.850745091799183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.358392303893478,
            8.861218812116462
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.375773018309982,
            8.86821526063017
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#75ff15",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #75ff15 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.195097308255173, 8.833815456571175]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.191835742093064, 8.83551170382573]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.185999255276657, 8.837886436867834]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.184110980130173, 8.843653581963496]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.185655932522751, 8.846367501348679]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.171923022366501, 8.824146698237112]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172094683743454, 8.821262984420503]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.242555587199513, 8.780134692694947]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.234315841105763, 8.78081329103365]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.230195968058888, 8.783697320122016]),
            {
              "landcover": 2,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.228994338420216, 8.775723773239111]),
            {
              "landcover": 2,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.235517470744435, 8.769955568702109]),
            {
              "landcover": 2,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.174406020549123, 8.76190683856512]),
            {
              "landcover": 2,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.129285134247459, 8.736052777582]),
            {
              "landcover": 2,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.132890023163474, 8.730623302874832]),
            {
              "landcover": 2,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.137868203095115, 8.729774940313181]),
            {
              "landcover": 2,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.147309578827537, 8.724345374250905]),
            {
              "landcover": 2,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.38140861130509, 8.607298397409814]),
            {
              "landcover": 2,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.380378643043372, 8.615105805357697]),
            {
              "landcover": 2,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.375572124488684, 8.622573609967649]),
            {
              "landcover": 2,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.380550304420325, 8.591852833509614]),
            {
              "landcover": 2,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3791770134047, 8.577934313948278]),
            {
              "landcover": 2,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.394283214576575, 8.571823583225255]),
            {
              "landcover": 2,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.395828166969153, 8.579461981271416]),
            {
              "landcover": 2,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.405097881324622, 8.57878301877527]),
            {
              "landcover": 2,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.413680950172278, 8.580650162718744]),
            {
              "landcover": 2,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.463492883508083, 8.580200536077022]),
            {
              "landcover": 2,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.458858026330349, 8.590724279007862]),
            {
              "landcover": 2,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.454738153283474, 8.595307108067505]),
            {
              "landcover": 2,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([11.449416650597927, 8.590554543534584]),
            {
              "landcover": 2,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([11.443751825158474, 8.597004438104802]),
            {
              "landcover": 2,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([11.467956079308864, 8.58580191944794]),
            {
              "landcover": 2,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([11.485122217004177, 8.586650606686923]),
            {
              "landcover": 2,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.482740159354687, 8.601373508971427]),
            {
              "landcover": 2,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.46917891057539, 8.608841584653629]),
            {
              "landcover": 2,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.458535905204297, 8.623777293799625]),
            {
              "landcover": 2,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.4850316729277, 8.6101401603545]),
            {
              "landcover": 2,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.499107905837857, 8.604708865824987]),
            {
              "landcover": 2,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.50528771540817, 8.599616956445699]),
            {
              "landcover": 2,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.512744927021824, 8.61047961367469]),
            {
              "landcover": 2,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.496437096211277, 8.618286955965571]),
            {
              "landcover": 2,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.504333519551121, 8.628470203575223]),
            {
              "landcover": 2,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.478069328877293, 8.63356172441295]),
            {
              "landcover": 2,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.476181053730809, 8.64102916403181]),
            {
              "landcover": 2,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.470687889668309, 8.647647907326737]),
            {
              "landcover": 2,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.460559868428074, 8.644762828386838]),
            {
              "landcover": 2,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.447856926533543, 8.633392008158262]),
            {
              "landcover": 2,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.441505455586277, 8.63169484141353]),
            {
              "landcover": 2,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.43669893703159, 8.639671458734588]),
            {
              "landcover": 2,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.430519127461277, 8.642386864439793]),
            {
              "landcover": 2,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.424510979267918, 8.646969067210701]),
            {
              "landcover": 2,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.441848778340184, 8.648326746219569]),
            {
              "landcover": 2,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.449105781709976, 8.657578953908779]),
            {
              "landcover": 2,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.45425562301857, 8.659106299407366]),
            {
              "landcover": 2,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.460778755342789, 8.659954822005203]),
            {
              "landcover": 2,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.457860511934586, 8.66759143923811]),
            {
              "landcover": 2,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.449105781709976, 8.669797544224846]),
            {
              "landcover": 2,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.473310035860367, 8.670306643536371]),
            {
              "landcover": 2,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.47845987716896, 8.6701369438425]),
            {
              "landcover": 2,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.481034797823257, 8.674888506294138]),
            {
              "landcover": 2,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.488759559786148, 8.672852129746122]),
            {
              "landcover": 2,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([11.468160194551773, 8.67828244266728]),
            {
              "landcover": 2,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([11.455628914034195, 8.681167264458571]),
            {
              "landcover": 2,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([11.450650734102554, 8.683712677033967]),
            {
              "landcover": 2,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([11.434342903292007, 8.691009430680285]),
            {
              "landcover": 2,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([11.502492469942398, 8.66317919042062]),
            {
              "landcover": 2,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([11.551244300997086, 8.655033364301852]),
            {
              "landcover": 2,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([11.564462227022476, 8.641965733413002]),
            {
              "landcover": 2,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([11.581628364717789, 8.62804905701402]),
            {
              "landcover": 2,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([11.573388618624039, 8.61684745706512]),
            {
              "landcover": 2,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([11.565492195284195, 8.61803552128444]),
            {
              "landcover": 2,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([11.542821747691567, 8.61256781507806]),
            {
              "landcover": 2,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([11.539731842906411, 8.616132036875335]),
            {
              "landcover": 2,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([11.485895597200422, 8.751830480495581]),
            {
              "landcover": 2,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([11.463493787508039, 8.742329250110744]),
            {
              "landcover": 2,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([11.45671316311839, 8.74300791746219]),
            {
              "landcover": 2,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([11.471836760018522, 8.732073399793174]),
            {
              "landcover": 2,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([11.469004347298796, 8.739114707206038]),
            {
              "landcover": 2,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([11.429264738534147, 8.735721322642203]),
            {
              "landcover": 2,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([11.423514082406218, 8.736315167170515]),
            {
              "landcover": 2,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([11.412752048878314, 8.742747647660115]),
            {
              "landcover": 2,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([11.404426472096088, 8.745462306598931]),
            {
              "landcover": 2,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.399190800099017, 8.749534257906694]),
            {
              "landcover": 2,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.396100895313861, 8.749703921578122]),
            {
              "landcover": 2,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.393697636036517, 8.747752784688672]),
            {
              "landcover": 2,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3886336254164, 8.747752784688672]),
            {
              "landcover": 2,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([11.400263683704974, 8.755302779346874]),
            {
              "landcover": 2,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([11.398160831837298, 8.755896592653793]),
            {
              "landcover": 2,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([11.391723530201556, 8.75822942146811]),
            {
              "landcover": 2,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([11.390607731251361, 8.760901552856472]),
            {
              "landcover": 2,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([11.38889111748183, 8.765779203480658]),
            {
              "landcover": 2,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([11.389577762989642, 8.770911271097992]),
            {
              "landcover": 2,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([11.39537133446181, 8.772353326922033]),
            {
              "landcover": 2,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([11.365759746937396, 8.784610575206594]),
            {
              "landcover": 2,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3536576198622, 8.786900811979804]),
            {
              "landcover": 2,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([11.423060694193925, 8.794364464796189]),
            {
              "landcover": 2,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([11.425292292094316, 8.789614423985547]),
            {
              "landcover": 2,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([11.413576403117265, 8.79733320936766]),
            {
              "landcover": 2,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([11.409156122660722, 8.803447775573797]),
            {
              "landcover": 2,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([11.41194562003621, 8.809936412859699]),
            {
              "landcover": 2,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([11.370058246741456, 8.82029816599136]),
            {
              "landcover": 2,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([11.369242855200929, 8.82004371890822]),
            {
              "landcover": 2,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([11.368384548316163, 8.821570398776812]),
            {
              "landcover": 2,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([11.368577667365235, 8.82358475838741]),
            {
              "landcover": 2,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([11.366346069464845, 8.821697621814245]),
            {
              "landcover": 2,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([11.368873428567724, 8.871318247333193]),
            {
              "landcover": 2,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([11.368186783059912, 8.871593859944173]),
            {
              "landcover": 2,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([11.367435764535742, 8.871657462825013]),
            {
              "landcover": 2,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([11.366920780404882, 8.872675107419596]),
            {
              "landcover": 2,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([11.369624447091894, 8.870406604145723]),
            {
              "landcover": 2,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([11.352326787967714, 8.88656596565832]),
            {
              "landcover": 2,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([11.351597227115663, 8.88754116880671]),
            {
              "landcover": 2,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([11.352455534000429, 8.883725141696399]),
            {
              "landcover": 2,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([11.303018536403119, 8.874510017254181]),
            {
              "landcover": 2,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302932705714642, 8.876036471222733]),
            {
              "landcover": 2,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302203144862592, 8.87959817244967]),
            {
              "landcover": 2,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([11.212424244716107, 8.91551005802521]),
            {
              "landcover": 2,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([11.215127911403119, 8.91563724851968]),
            {
              "landcover": 2,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([11.094192471339642, 8.995567457076245]),
            {
              "landcover": 2,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([11.093076672389447, 8.996499980971201]),
            {
              "landcover": 2,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([11.085308995082318, 8.992430768161858]),
            {
              "landcover": 2,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([11.087883915736615, 8.989633157824631]),
            {
              "landcover": 2,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([11.088484730555951, 8.989039722550453]),
            {
              "landcover": 2,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([11.094321217372357, 8.990820025455822]),
            {
              "landcover": 2,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([11.09625240786308, 8.990904801566343]),
            {
              "landcover": 2,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([11.097024884059369, 8.99268509530253]),
            {
              "landcover": 2,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([11.097539868190228, 8.99429582971112]),
            {
              "landcover": 2,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([11.095308270289838, 8.997644438830834]),
            {
              "landcover": 2,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([11.090630497767865, 8.999848569694718]),
            {
              "landcover": 2,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([11.089128460719525, 9.0001028916226]),
            {
              "landcover": 2,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([11.087626423671185, 9.000272439475198]),
            {
              "landcover": 2,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([11.07754131777519, 9.00315474080957]),
            {
              "landcover": 2,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([11.076897587611615, 9.002858034379866]),
            {
              "landcover": 2,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([11.000529791466578, 9.009102444194586]),
            {
              "landcover": 2,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([10.982076193444117, 9.012832385731464]),
            {
              "landcover": 2,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([10.981475378624781, 9.015799357179105]),
            {
              "landcover": 2,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([10.997096563927515, 8.998929680737225]),
            {
              "landcover": 2,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([11.015893484703883, 8.988332747974145]),
            {
              "landcover": 2,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([11.007911230675562, 8.977142050435289]),
            {
              "landcover": 2,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([11.00645210897146, 8.970953107273829]),
            {
              "landcover": 2,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([11.004736906575427, 8.963987964971873]),
            {
              "landcover": 2,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([11.001389509724842, 8.9588162022057]),
            {
              "landcover": 2,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([10.987999922322498, 8.968311841259782]),
            {
              "landcover": 2,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([10.98593998579906, 8.96805749702106]),
            {
              "landcover": 2,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([10.9455137315266, 8.960851002897533]),
            {
              "landcover": 2,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([10.946028715657459, 8.958392283960894]),
            {
              "landcover": 2,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([10.92583759475942, 8.941160130905955]),
            {
              "landcover": 2,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([10.924979287874654, 8.939125220078028]),
            {
              "landcover": 2,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([10.9233485047936, 8.937429452370727]),
            {
              "landcover": 2,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([10.92257602859731, 8.933698735633133]),
            {
              "landcover": 2,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([10.918027002108053, 8.920179490369422]),
            {
              "landcover": 2,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([10.918971139681295, 8.917042150933465]),
            {
              "landcover": 2,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([10.925150949251607, 8.899659106463387]),
            {
              "landcover": 2,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([10.923777658235982, 8.897115176986722]),
            {
              "landcover": 2,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([10.923262674105123, 8.895080020674234]),
            {
              "landcover": 2,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([10.925751764070943, 8.894656028351664]),
            {
              "landcover": 2,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([10.928930566846589, 8.898305376661853]),
            {
              "landcover": 2,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([10.929188058912018, 8.894489461702037]),
            {
              "landcover": 2,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([10.930218027173737, 8.891351901828015]),
            {
              "landcover": 2,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([10.932707117139557, 8.892284692706774]),
            {
              "landcover": 2,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([10.936569498121003, 8.89474385727024]),
            {
              "landcover": 2,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([10.955709741651276, 8.895761437775326]),
            {
              "landcover": 2,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([10.953220651685456, 8.894998252661685]),
            {
              "landcover": 2,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([10.958456323682526, 8.894065468695532]),
            {
              "landcover": 2,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([10.960258768140534, 8.893217481209557]),
            {
              "landcover": 2,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([10.956568048536042, 8.889231913723101]),
            {
              "landcover": 2,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([10.954508112012604, 8.886772712151592]),
            {
              "landcover": 2,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([10.967726038037995, 8.887959914971082]),
            {
              "landcover": 2,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([10.967640207349518, 8.886433510639517]),
            {
              "landcover": 2,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([10.941290185987214, 8.877359753693392]),
            {
              "landcover": 2,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([10.927798204675438, 8.860193529343402]),
            {
              "landcover": 2,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([10.92728322054458, 8.855868373390791]),
            {
              "landcover": 2,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([10.924879961267235, 8.852645675096698]),
            {
              "landcover": 2,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([10.92376416231704, 8.850016610840802]),
            {
              "landcover": 2,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([10.922542575901057, 8.841326569512562]),
            {
              "landcover": 2,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([10.889326099460627, 8.829849031736515]),
            {
              "landcover": 2,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([10.89550590903094, 8.83748216503999]),
            {
              "landcover": 2,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([10.878339771335627, 8.840959428912262]),
            {
              "landcover": 2,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([10.881343845432307, 8.845878429058388]),
            {
              "landcover": 2,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([10.875679019992853, 8.837058106225264]),
            {
              "landcover": 2,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([10.872245792453791, 8.827540960261533]),
            {
              "landcover": 2,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([10.866409305637385, 8.82177356313807]),
            {
              "landcover": 2,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([10.941124919956232, 8.808330089292634]),
            {
              "landcover": 2,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([10.940652851169611, 8.81049295248221]),
            {
              "landcover": 2,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([10.91441929867114, 8.810335448918856]),
            {
              "landcover": 2,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([10.913003092311277, 8.810547493738863]),
            {
              "landcover": 2,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([10.926607256434812, 8.810674720572466]),
            {
              "landcover": 2,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([11.173252320670333, 8.666880613655914]),
            {
              "landcover": 2,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([11.1755697492592, 8.671547367752327]),
            {
              "landcover": 2,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([11.177629685782637, 8.677571637315904]),
            {
              "landcover": 2,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([11.171020722769942, 8.678589814172751]),
            {
              "landcover": 2,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([11.170505738639083, 8.682832188011883]),
            {
              "landcover": 2,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([11.169733262442794, 8.677571637315904]),
            {
              "landcover": 2,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([11.163467622184005, 8.669765523028115]),
            {
              "landcover": 2,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([11.194967484854903, 8.646261352463785]),
            {
              "landcover": 2,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([11.196684098624434, 8.648594864621613]),
            {
              "landcover": 2,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172908997916426, 8.640321438131553]),
            {
              "landcover": 2,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([11.163038468741622, 8.644903666012432]),
            {
              "landcover": 2,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([11.161965585135665, 8.64570979293288]),
            {
              "landcover": 2,
              "system:index": "198"
            }),
        ee.Feature(
            ee.Geometry.Point([11.160635209464278, 8.644564243635287]),
            {
              "landcover": 2,
              "system:index": "199"
            }),
        ee.Feature(
            ee.Geometry.Point([11.160120225333419, 8.642103422259463]),
            {
              "landcover": 2,
              "system:index": "200"
            }),
        ee.Feature(
            ee.Geometry.Point([11.156655921643903, 8.63087151507239]),
            {
              "landcover": 2,
              "system:index": "201"
            }),
        ee.Feature(
            ee.Geometry.Point([11.155454292005231, 8.629980497532955]),
            {
              "landcover": 2,
              "system:index": "202"
            }),
        ee.Feature(
            ee.Geometry.Point([11.150046958631208, 8.62641640634722]),
            {
              "landcover": 2,
              "system:index": "203"
            }),
        ee.Feature(
            ee.Geometry.Point([11.148845328992536, 8.624931358425515]),
            {
              "landcover": 2,
              "system:index": "204"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172577514356306, 8.614408565959678]),
            {
              "landcover": 2,
              "system:index": "205"
            }),
        ee.Feature(
            ee.Geometry.Point([11.178371085828473, 8.616317965377977]),
            {
              "landcover": 2,
              "system:index": "206"
            }),
        ee.Feature(
            ee.Geometry.Point([11.17995895356529, 8.619372984391427]),
            {
              "landcover": 2,
              "system:index": "207"
            }),
        ee.Feature(
            ee.Geometry.Point([11.263458560136907, 8.628993459294282]),
            {
              "landcover": 2,
              "system:index": "208"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24491913142597, 8.628866170569896]),
            {
              "landcover": 2,
              "system:index": "209"
            }),
        ee.Feature(
            ee.Geometry.Point([11.240241358903997, 8.634000115073741]),
            {
              "landcover": 2,
              "system:index": "210"
            }),
        ee.Feature(
            ee.Geometry.Point([11.151334651267888, 8.714132287186132]),
            {
              "landcover": 2,
              "system:index": "211"
            }),
        ee.Feature(
            ee.Geometry.Point([11.15476787880695, 8.720410387497521]),
            {
              "landcover": 2,
              "system:index": "212"
            }),
        ee.Feature(
            ee.Geometry.Point([11.157342799461247, 8.723973586686721]),
            {
              "landcover": 2,
              "system:index": "213"
            }),
        ee.Feature(
            ee.Geometry.Point([11.148931391990544, 8.704630096988375]),
            {
              "landcover": 2,
              "system:index": "214"
            }),
        ee.Feature(
            ee.Geometry.Point([11.11082256630695, 8.671031134380955]),
            {
              "landcover": 2,
              "system:index": "215"
            }),
        ee.Feature(
            ee.Geometry.Point([11.086274989402654, 8.670012937031412]),
            {
              "landcover": 2,
              "system:index": "216"
            }),
        ee.Feature(
            ee.Geometry.Point([11.081296809471013, 8.672049328971047]),
            {
              "landcover": 2,
              "system:index": "217"
            }),
        ee.Feature(
            ee.Geometry.Point([11.070825465476872, 8.66780683330914]),
            {
              "landcover": 2,
              "system:index": "218"
            }),
        ee.Feature(
            ee.Geometry.Point([11.129705317771794, 8.632083122843278]),
            {
              "landcover": 2,
              "system:index": "219"
            }),
        ee.Feature(
            ee.Geometry.Point([11.12807453469074, 8.635392587520313]),
            {
              "landcover": 2,
              "system:index": "220"
            }),
        ee.Feature(
            ee.Geometry.Point([11.129876979148747, 8.638023166939941]),
            {
              "landcover": 2,
              "system:index": "221"
            }),
        ee.Feature(
            ee.Geometry.Point([11.127902873313786, 8.64243571056937]),
            {
              "landcover": 2,
              "system:index": "222"
            }),
        ee.Feature(
            ee.Geometry.Point([11.126357920921208, 8.643878261707947]),
            {
              "landcover": 2,
              "system:index": "223"
            }),
        ee.Feature(
            ee.Geometry.Point([11.123268016136052, 8.645151096362799]),
            {
              "landcover": 2,
              "system:index": "224"
            }),
        ee.Feature(
            ee.Geometry.Point([11.121122248924138, 8.64175686106454]),
            {
              "landcover": 2,
              "system:index": "225"
            }),
        ee.Feature(
            ee.Geometry.Point([11.121723063743474, 8.640823440999446]),
            {
              "landcover": 2,
              "system:index": "226"
            }),
        ee.Feature(
            ee.Geometry.Point([11.121980555808904, 8.636750308221163]),
            {
              "landcover": 2,
              "system:index": "227"
            }),
        ee.Feature(
            ee.Geometry.Point([11.121980555808904, 8.63513801434492]),
            {
              "landcover": 2,
              "system:index": "228"
            }),
        ee.Feature(
            ee.Geometry.Point([11.132280238426091, 8.630131373660248]),
            {
              "landcover": 2,
              "system:index": "229"
            }),
        ee.Feature(
            ee.Geometry.Point([11.167814143455388, 8.629876796935879]),
            {
              "landcover": 2,
              "system:index": "230"
            }),
        ee.Feature(
            ee.Geometry.Point([11.166097529685857, 8.63123453748199]),
            {
              "landcover": 2,
              "system:index": "231"
            }),
        ee.Feature(
            ee.Geometry.Point([11.164466746604802, 8.627670458134013]),
            {
              "landcover": 2,
              "system:index": "232"
            }),
        ee.Feature(
            ee.Geometry.Point([11.170474894798161, 8.634968298799231]),
            {
              "landcover": 2,
              "system:index": "233"
            }),
        ee.Feature(
            ee.Geometry.Point([11.229354747093083, 8.624106345146721]),
            {
              "landcover": 2,
              "system:index": "234"
            }),
        ee.Feature(
            ee.Geometry.Point([11.229612239158513, 8.622493997271734]),
            {
              "landcover": 2,
              "system:index": "235"
            }),
        ee.Feature(
            ee.Geometry.Point([11.241456874168279, 8.607558237438736]),
            {
              "landcover": 2,
              "system:index": "236"
            }),
        ee.Feature(
            ee.Geometry.Point([11.240598567283513, 8.610613327202673]),
            {
              "landcover": 2,
              "system:index": "237"
            }),
        ee.Feature(
            ee.Geometry.Point([11.255103953636052, 8.61324407917804]),
            {
              "landcover": 2,
              "system:index": "238"
            }),
        ee.Feature(
            ee.Geometry.Point([11.258108027732732, 8.603399881193925]),
            {
              "landcover": 2,
              "system:index": "239"
            }),
        ee.Feature(
            ee.Geometry.Point([11.26214207009113, 8.60009013644498]),
            {
              "landcover": 2,
              "system:index": "240"
            }),
        ee.Feature(
            ee.Geometry.Point([11.250297435081364, 8.60229663615776]),
            {
              "landcover": 2,
              "system:index": "241"
            }),
        ee.Feature(
            ee.Geometry.Point([11.286003001487614, 8.601532849250173]),
            {
              "landcover": 2,
              "system:index": "242"
            }),
        ee.Feature(
            ee.Geometry.Point([11.284286387718083, 8.608491739705405]),
            {
              "landcover": 2,
              "system:index": "243"
            }),
        ee.Feature(
            ee.Geometry.Point([11.282226451194646, 8.611886273991225]),
            {
              "landcover": 2,
              "system:index": "244"
            }),
        ee.Feature(
            ee.Geometry.Point([11.361005498283037, 8.681284433427832]),
            {
              "landcover": 2,
              "system:index": "245"
            }),
        ee.Feature(
            ee.Geometry.Point([11.365468694083818, 8.680945043885755]),
            {
              "landcover": 2,
              "system:index": "246"
            }),
        ee.Feature(
            ee.Geometry.Point([11.365983678214677, 8.68705400866925]),
            {
              "landcover": 2,
              "system:index": "247"
            }),
        ee.Feature(
            ee.Geometry.Point([11.36315126549495, 8.687732776392235]),
            {
              "landcover": 2,
              "system:index": "248"
            }),
        ee.Feature(
            ee.Geometry.Point([11.36392374169124, 8.69231442637933]),
            {
              "landcover": 2,
              "system:index": "249"
            }),
        ee.Feature(
            ee.Geometry.Point([11.373536778800615, 8.691975046819296]),
            {
              "landcover": 2,
              "system:index": "250"
            }),
        ee.Feature(
            ee.Geometry.Point([11.375682546012529, 8.694605230370295]),
            {
              "landcover": 2,
              "system:index": "251"
            }),
        ee.Feature(
            ee.Geometry.Point([11.376111699454912, 8.69307802926571]),
            {
              "landcover": 2,
              "system:index": "252"
            }),
        ee.Feature(
            ee.Geometry.Point([11.382205678336748, 8.687902468131004]),
            {
              "landcover": 2,
              "system:index": "253"
            }),
        ee.Feature(
            ee.Geometry.Point([11.384952260367998, 8.686035854781133]),
            {
              "landcover": 2,
              "system:index": "254"
            }),
        ee.Feature(
            ee.Geometry.Point([11.385982228629716, 8.684423772138835]),
            {
              "landcover": 2,
              "system:index": "255"
            }),
        ee.Feature(
            ee.Geometry.Point([11.374356811950118, 8.850745091799183]),
            {
              "landcover": 2,
              "system:index": "256"
            }),
        ee.Feature(
            ee.Geometry.Point([11.358392303893478, 8.861218812116462]),
            {
              "landcover": 2,
              "system:index": "257"
            }),
        ee.Feature(
            ee.Geometry.Point([11.375773018309982, 8.86821526063017]),
            {
              "landcover": 2,
              "system:index": "258"
            })]),
    baresurface = ui.import && ui.import("baresurface", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.308135400673294,
            8.665098296379455
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.286849389931106,
            8.686819525281988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.268309961220169,
            8.688855826038163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.300582300087356,
            8.728222130448437
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.354741464516067,
            8.684613520318406
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.34993494596138,
            8.688686134730867
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.353539834877395,
            8.6929283943687
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.341781030556106,
            8.6878376770424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.335601220985794,
            8.691995101368065
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.333970437904739,
            8.672565110526296
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.315087686439895,
            8.686480140747541
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.313113580604934,
            8.683001431563387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.309251199623489,
            8.681219641196089
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.290152634713051,
            8.664570483654495
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.274359788033363,
            8.663721971469908
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.272729004952309,
            8.665249292023443
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.269896592232582,
            8.660582459739887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.264231766793129,
            8.657273216307184
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.256764496895668,
            8.65141832971914
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.256163682076332,
            8.64836357013982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.252902115914223,
            8.644884508225358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.251185502144692,
            8.641829695671673
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.248696412178871,
            8.6264509532684
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.25195797834098,
            8.62297168927185
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24921139630973,
            8.623311131072388
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.13107860878742,
            8.65575788457205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.13657177284992,
            8.661358148192114
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.134683497703435,
            8.655248765564611
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.135198481834294,
            8.649818119977533
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.137086756980779,
            8.645745084397154
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.147386439597966,
            8.642520566671527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.146013148582341,
            8.651345496965545
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.143438227928044,
            8.658982288958091
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.118547328269841,
            8.677140260518874
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.118547328269841,
            8.68664314800896
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.112195857322575,
            8.694957977042113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.109277613914372,
            8.700897027668551
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.11683071450031,
            8.710059949519497
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.124898799217107,
            8.715998760458126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.104299433982732,
            8.729572830992826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.093484767234685,
            8.729403158157124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.085760005271794,
            8.745861063783236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.094686396873357,
            8.753835251426398
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.107217677390935,
            8.760621659500217
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.04816616371906,
            8.770970693293805
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.04593456581867,
            8.774194103946158
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.041814692771794,
            8.77826574055049
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.054002650535466,
            8.77843539110619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049539454734685,
            8.76520241493071
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.037866481101872,
            8.765032758328953
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.034261592185857,
            8.759773365263202
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.049711116111638,
            8.75909472848018
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.300165065086247,
            8.609170648998619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.294414408958318,
            8.61689315646458
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302812291495927,
            8.624008112888731
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.306674672477373,
            8.625875033895474
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302039815299638,
            8.63122116572236
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.310451222770341,
            8.63639750692786
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.312940312736162,
            8.637585509643536
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.315086079948076,
            8.63894322245095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.314828587882646,
            8.64378003459705
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326244069450029,
            8.641913202174736
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326759053580888,
            8.638179509598189
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.321695042960771,
            8.639028079339136
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.32023592125667,
            8.647513671700144
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.318690968864091,
            8.652010958171696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.312082005851396,
            8.652010958171696
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3054730428387,
            8.654471714827391
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.30075235497249,
            8.654217154539937
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.297662450187334,
            8.65489598159061
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.286676122062334,
            8.658120393361619
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.31148119103206,
            8.68824185137814
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.41336221825374,
            8.680605654036741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.41284723412288,
            8.683405611110834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.443488789909013,
            8.705125779880369
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.455676747672685,
            8.705719673052467
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.459195805900224,
            8.706568090234573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.458337499015459,
            8.698932266357302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.447866155021318,
            8.71394923852062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.434133244865068,
            8.710470784489734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.43233080040706,
            8.711064669176036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.379401985675752,
            8.728274557225138
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.373565498859346,
            8.727850373515489
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.36472493794626,
            8.734213078525487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.361120049030244,
            8.739557666848194
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.327045265705049,
            8.743300690765663
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.346271339923799,
            8.739992178351446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.322496239215791,
            8.739992178351446
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.317346397907198,
            8.750426617695393
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.350566732323966,
            8.766293611246493
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.350137578881583,
            8.771213604545219
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.350910055077872,
            8.773758403089468
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.378461706078848,
            8.780798921484857
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.35593115035375,
            8.852299248160366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.350566732323966,
            8.852341652308539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.348077642358145,
            8.851875206409836
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.345760213769278,
            8.850984717142902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.346575605309805,
            8.847210714901909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.345760213769278,
            8.844793636959565
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.35146795455297,
            8.844581611821631
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.385499822533927,
            8.853359350398245
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.385456907189688,
            8.8529353098697
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.387302266991934,
            8.852723289422105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.379277097619376,
            8.855437141921815
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.379534589684805,
            8.853232138291016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.376959669030509,
            8.849246136648683
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.375687187621505,
            8.846504634395004
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.370880669066818,
            8.848412846272895
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.350796287963302,
            8.867494420577337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.353199547240646,
            8.873897126797123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.358006065795333,
            8.872667476651023
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3548303303217,
            8.867494420577337
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.354444092223556,
            8.86384779627594
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.352384155700118,
            8.861388424565313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.337220498731524,
            8.865303856023582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.3338301865367,
            8.87073135519016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.328852006605059,
            8.873402672973183
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.325290033033282,
            8.870307334706704
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326405831983477,
            8.868060017968844
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.326234170606524,
            8.863777357431989
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.324302980115801,
            8.86208124044723
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.321770974805743,
            8.858943403388226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.317651101758868,
            8.85898580677028
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.314775773694903,
            8.862208449492654
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.31335956733504,
            8.855551116978537
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.315592015742174,
            8.847063942241766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.29945584630858,
            8.837225907926843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.283662999628893,
            8.840533552233111
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.302803243159167,
            8.828659819318366
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.29670926427733,
            8.823146884800728
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.29690828931678,
            8.813956013962246
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.289956003550179,
            8.811241856109275
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.292445093516,
            8.807425037910376
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.303431421641,
            8.807933949280125
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.298539072397835,
            8.806576850737766
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.2884110511576,
            8.801826966627214
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.281372934702523,
            8.800215384949414
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.270987421396859,
            8.805813480619173
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.274849802378304,
            8.812514120084733
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.27570810926307,
            8.820147611940968
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.266009241465218,
            8.817094234127534
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.268927484873421,
            8.823540224342931
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.257082849863655,
            8.82065650578871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.255108744028695,
            8.826593548843753
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24498072278846,
            8.826763177241942
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24746981275428,
            8.834990060915263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.199919611338265,
            8.819723533198756
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.201979547861702,
            8.813701562510321
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.197258859995491,
            8.8087821333399
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.202752024057991,
            8.804201916306043
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.20953264844764,
            8.800300205212686
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.217858225229866,
            8.8004698456809
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.1967449728927,
            8.794280086486205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.191938454338013,
            8.790972028034759
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.189706856437622,
            8.785458531649553
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.190822655387818,
            8.779011878046669
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.191852623649536,
            8.776212638308047
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.172712380119263,
            8.804628181060103
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.17451482457727,
            8.808529846504841
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.162670189567505,
            8.810904753140843
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.152971321769654,
            8.811752930384651
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.146104866691529,
            8.80361034852302
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.1363201682052,
            8.809208392814734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.135719353385864,
            8.822694242260818
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.130140358634888,
            8.822609427136365
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.124303871818482,
            8.819980148613919
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.153142983146607,
            8.829818643125932
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.15331464452356,
            8.82668053112463
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.152198845573364,
            8.826256459887981
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.151683861442505,
            8.824899428655677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.153486305900513,
            8.822354981646123
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.160009438224732,
            8.819556069679386
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.171939903922974,
            8.82795274191007
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.186960274406372,
            8.803525529018525
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.196573311515747,
            8.80437372318838
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.184299523063599,
            8.797927398734355
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.176832253166138,
            8.791056850415352
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.180437142082154,
            8.784440646425946
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.180437142082154,
            8.78164144765334
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.181467110343872,
            8.778672577384887
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.222665840812622,
            8.792244361704503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.24395185155481,
            8.798181861038767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.245840126701294,
            8.801489855077072
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.237600380607544,
            8.806579018927781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.966479219018805,
            8.997774340809439
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.964011586725103,
            8.999130730135507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.96283141475855,
            8.998749246151514
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.961071885644781,
            8.997880308908652
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.97384992939173,
            9.001546786025573
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974740422784674,
            9.001462012407883
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.972916520654547,
            9.002299151011941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.971757806360113,
            9.002436907811754
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.970609820901739,
            9.001567979426891
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.103838217363474,
            8.970602768190979
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.103645098314402,
            8.970369620783675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.109824907884715,
            8.964519691372153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.109267008409617,
            8.964519691372153
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.109330741775162,
            8.96819322643475
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.108858672988541,
            8.968871477088486
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 3
      },
      "color": "#fffd2f",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #fffd2f */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.308135400673294, 8.665098296379455]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.286849389931106, 8.686819525281988]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.268309961220169, 8.688855826038163]),
            {
              "landcover": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.300582300087356, 8.728222130448437]),
            {
              "landcover": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.354741464516067, 8.684613520318406]),
            {
              "landcover": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.34993494596138, 8.688686134730867]),
            {
              "landcover": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.353539834877395, 8.6929283943687]),
            {
              "landcover": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.341781030556106, 8.6878376770424]),
            {
              "landcover": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.335601220985794, 8.691995101368065]),
            {
              "landcover": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.333970437904739, 8.672565110526296]),
            {
              "landcover": 3,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.315087686439895, 8.686480140747541]),
            {
              "landcover": 3,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.313113580604934, 8.683001431563387]),
            {
              "landcover": 3,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.309251199623489, 8.681219641196089]),
            {
              "landcover": 3,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.290152634713051, 8.664570483654495]),
            {
              "landcover": 3,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.274359788033363, 8.663721971469908]),
            {
              "landcover": 3,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.272729004952309, 8.665249292023443]),
            {
              "landcover": 3,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.269896592232582, 8.660582459739887]),
            {
              "landcover": 3,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.264231766793129, 8.657273216307184]),
            {
              "landcover": 3,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.256764496895668, 8.65141832971914]),
            {
              "landcover": 3,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.256163682076332, 8.64836357013982]),
            {
              "landcover": 3,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.252902115914223, 8.644884508225358]),
            {
              "landcover": 3,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.251185502144692, 8.641829695671673]),
            {
              "landcover": 3,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.248696412178871, 8.6264509532684]),
            {
              "landcover": 3,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.25195797834098, 8.62297168927185]),
            {
              "landcover": 3,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24921139630973, 8.623311131072388]),
            {
              "landcover": 3,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.13107860878742, 8.65575788457205]),
            {
              "landcover": 3,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.13657177284992, 8.661358148192114]),
            {
              "landcover": 3,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.134683497703435, 8.655248765564611]),
            {
              "landcover": 3,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.135198481834294, 8.649818119977533]),
            {
              "landcover": 3,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([11.137086756980779, 8.645745084397154]),
            {
              "landcover": 3,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([11.147386439597966, 8.642520566671527]),
            {
              "landcover": 3,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([11.146013148582341, 8.651345496965545]),
            {
              "landcover": 3,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([11.143438227928044, 8.658982288958091]),
            {
              "landcover": 3,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([11.118547328269841, 8.677140260518874]),
            {
              "landcover": 3,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([11.118547328269841, 8.68664314800896]),
            {
              "landcover": 3,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([11.112195857322575, 8.694957977042113]),
            {
              "landcover": 3,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([11.109277613914372, 8.700897027668551]),
            {
              "landcover": 3,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([11.11683071450031, 8.710059949519497]),
            {
              "landcover": 3,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([11.124898799217107, 8.715998760458126]),
            {
              "landcover": 3,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([11.104299433982732, 8.729572830992826]),
            {
              "landcover": 3,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([11.093484767234685, 8.729403158157124]),
            {
              "landcover": 3,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([11.085760005271794, 8.745861063783236]),
            {
              "landcover": 3,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([11.094686396873357, 8.753835251426398]),
            {
              "landcover": 3,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([11.107217677390935, 8.760621659500217]),
            {
              "landcover": 3,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([11.04816616371906, 8.770970693293805]),
            {
              "landcover": 3,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([11.04593456581867, 8.774194103946158]),
            {
              "landcover": 3,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([11.041814692771794, 8.77826574055049]),
            {
              "landcover": 3,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([11.054002650535466, 8.77843539110619]),
            {
              "landcover": 3,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049539454734685, 8.76520241493071]),
            {
              "landcover": 3,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([11.037866481101872, 8.765032758328953]),
            {
              "landcover": 3,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.034261592185857, 8.759773365263202]),
            {
              "landcover": 3,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.049711116111638, 8.75909472848018]),
            {
              "landcover": 3,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.300165065086247, 8.609170648998619]),
            {
              "landcover": 3,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.294414408958318, 8.61689315646458]),
            {
              "landcover": 3,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302812291495927, 8.624008112888731]),
            {
              "landcover": 3,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.306674672477373, 8.625875033895474]),
            {
              "landcover": 3,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302039815299638, 8.63122116572236]),
            {
              "landcover": 3,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.310451222770341, 8.63639750692786]),
            {
              "landcover": 3,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.312940312736162, 8.637585509643536]),
            {
              "landcover": 3,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.315086079948076, 8.63894322245095]),
            {
              "landcover": 3,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.314828587882646, 8.64378003459705]),
            {
              "landcover": 3,
              "system:index": "60"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326244069450029, 8.641913202174736]),
            {
              "landcover": 3,
              "system:index": "61"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326759053580888, 8.638179509598189]),
            {
              "landcover": 3,
              "system:index": "62"
            }),
        ee.Feature(
            ee.Geometry.Point([11.321695042960771, 8.639028079339136]),
            {
              "landcover": 3,
              "system:index": "63"
            }),
        ee.Feature(
            ee.Geometry.Point([11.32023592125667, 8.647513671700144]),
            {
              "landcover": 3,
              "system:index": "64"
            }),
        ee.Feature(
            ee.Geometry.Point([11.318690968864091, 8.652010958171696]),
            {
              "landcover": 3,
              "system:index": "65"
            }),
        ee.Feature(
            ee.Geometry.Point([11.312082005851396, 8.652010958171696]),
            {
              "landcover": 3,
              "system:index": "66"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3054730428387, 8.654471714827391]),
            {
              "landcover": 3,
              "system:index": "67"
            }),
        ee.Feature(
            ee.Geometry.Point([11.30075235497249, 8.654217154539937]),
            {
              "landcover": 3,
              "system:index": "68"
            }),
        ee.Feature(
            ee.Geometry.Point([11.297662450187334, 8.65489598159061]),
            {
              "landcover": 3,
              "system:index": "69"
            }),
        ee.Feature(
            ee.Geometry.Point([11.286676122062334, 8.658120393361619]),
            {
              "landcover": 3,
              "system:index": "70"
            }),
        ee.Feature(
            ee.Geometry.Point([11.31148119103206, 8.68824185137814]),
            {
              "landcover": 3,
              "system:index": "71"
            }),
        ee.Feature(
            ee.Geometry.Point([11.41336221825374, 8.680605654036741]),
            {
              "landcover": 3,
              "system:index": "72"
            }),
        ee.Feature(
            ee.Geometry.Point([11.41284723412288, 8.683405611110834]),
            {
              "landcover": 3,
              "system:index": "73"
            }),
        ee.Feature(
            ee.Geometry.Point([11.443488789909013, 8.705125779880369]),
            {
              "landcover": 3,
              "system:index": "74"
            }),
        ee.Feature(
            ee.Geometry.Point([11.455676747672685, 8.705719673052467]),
            {
              "landcover": 3,
              "system:index": "75"
            }),
        ee.Feature(
            ee.Geometry.Point([11.459195805900224, 8.706568090234573]),
            {
              "landcover": 3,
              "system:index": "76"
            }),
        ee.Feature(
            ee.Geometry.Point([11.458337499015459, 8.698932266357302]),
            {
              "landcover": 3,
              "system:index": "77"
            }),
        ee.Feature(
            ee.Geometry.Point([11.447866155021318, 8.71394923852062]),
            {
              "landcover": 3,
              "system:index": "78"
            }),
        ee.Feature(
            ee.Geometry.Point([11.434133244865068, 8.710470784489734]),
            {
              "landcover": 3,
              "system:index": "79"
            }),
        ee.Feature(
            ee.Geometry.Point([11.43233080040706, 8.711064669176036]),
            {
              "landcover": 3,
              "system:index": "80"
            }),
        ee.Feature(
            ee.Geometry.Point([11.379401985675752, 8.728274557225138]),
            {
              "landcover": 3,
              "system:index": "81"
            }),
        ee.Feature(
            ee.Geometry.Point([11.373565498859346, 8.727850373515489]),
            {
              "landcover": 3,
              "system:index": "82"
            }),
        ee.Feature(
            ee.Geometry.Point([11.36472493794626, 8.734213078525487]),
            {
              "landcover": 3,
              "system:index": "83"
            }),
        ee.Feature(
            ee.Geometry.Point([11.361120049030244, 8.739557666848194]),
            {
              "landcover": 3,
              "system:index": "84"
            }),
        ee.Feature(
            ee.Geometry.Point([11.327045265705049, 8.743300690765663]),
            {
              "landcover": 3,
              "system:index": "85"
            }),
        ee.Feature(
            ee.Geometry.Point([11.346271339923799, 8.739992178351446]),
            {
              "landcover": 3,
              "system:index": "86"
            }),
        ee.Feature(
            ee.Geometry.Point([11.322496239215791, 8.739992178351446]),
            {
              "landcover": 3,
              "system:index": "87"
            }),
        ee.Feature(
            ee.Geometry.Point([11.317346397907198, 8.750426617695393]),
            {
              "landcover": 3,
              "system:index": "88"
            }),
        ee.Feature(
            ee.Geometry.Point([11.350566732323966, 8.766293611246493]),
            {
              "landcover": 3,
              "system:index": "89"
            }),
        ee.Feature(
            ee.Geometry.Point([11.350137578881583, 8.771213604545219]),
            {
              "landcover": 3,
              "system:index": "90"
            }),
        ee.Feature(
            ee.Geometry.Point([11.350910055077872, 8.773758403089468]),
            {
              "landcover": 3,
              "system:index": "91"
            }),
        ee.Feature(
            ee.Geometry.Point([11.378461706078848, 8.780798921484857]),
            {
              "landcover": 3,
              "system:index": "92"
            }),
        ee.Feature(
            ee.Geometry.Point([11.35593115035375, 8.852299248160366]),
            {
              "landcover": 3,
              "system:index": "93"
            }),
        ee.Feature(
            ee.Geometry.Point([11.350566732323966, 8.852341652308539]),
            {
              "landcover": 3,
              "system:index": "94"
            }),
        ee.Feature(
            ee.Geometry.Point([11.348077642358145, 8.851875206409836]),
            {
              "landcover": 3,
              "system:index": "95"
            }),
        ee.Feature(
            ee.Geometry.Point([11.345760213769278, 8.850984717142902]),
            {
              "landcover": 3,
              "system:index": "96"
            }),
        ee.Feature(
            ee.Geometry.Point([11.346575605309805, 8.847210714901909]),
            {
              "landcover": 3,
              "system:index": "97"
            }),
        ee.Feature(
            ee.Geometry.Point([11.345760213769278, 8.844793636959565]),
            {
              "landcover": 3,
              "system:index": "98"
            }),
        ee.Feature(
            ee.Geometry.Point([11.35146795455297, 8.844581611821631]),
            {
              "landcover": 3,
              "system:index": "99"
            }),
        ee.Feature(
            ee.Geometry.Point([11.385499822533927, 8.853359350398245]),
            {
              "landcover": 3,
              "system:index": "100"
            }),
        ee.Feature(
            ee.Geometry.Point([11.385456907189688, 8.8529353098697]),
            {
              "landcover": 3,
              "system:index": "101"
            }),
        ee.Feature(
            ee.Geometry.Point([11.387302266991934, 8.852723289422105]),
            {
              "landcover": 3,
              "system:index": "102"
            }),
        ee.Feature(
            ee.Geometry.Point([11.379277097619376, 8.855437141921815]),
            {
              "landcover": 3,
              "system:index": "103"
            }),
        ee.Feature(
            ee.Geometry.Point([11.379534589684805, 8.853232138291016]),
            {
              "landcover": 3,
              "system:index": "104"
            }),
        ee.Feature(
            ee.Geometry.Point([11.376959669030509, 8.849246136648683]),
            {
              "landcover": 3,
              "system:index": "105"
            }),
        ee.Feature(
            ee.Geometry.Point([11.375687187621505, 8.846504634395004]),
            {
              "landcover": 3,
              "system:index": "106"
            }),
        ee.Feature(
            ee.Geometry.Point([11.370880669066818, 8.848412846272895]),
            {
              "landcover": 3,
              "system:index": "107"
            }),
        ee.Feature(
            ee.Geometry.Point([11.350796287963302, 8.867494420577337]),
            {
              "landcover": 3,
              "system:index": "108"
            }),
        ee.Feature(
            ee.Geometry.Point([11.353199547240646, 8.873897126797123]),
            {
              "landcover": 3,
              "system:index": "109"
            }),
        ee.Feature(
            ee.Geometry.Point([11.358006065795333, 8.872667476651023]),
            {
              "landcover": 3,
              "system:index": "110"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3548303303217, 8.867494420577337]),
            {
              "landcover": 3,
              "system:index": "111"
            }),
        ee.Feature(
            ee.Geometry.Point([11.354444092223556, 8.86384779627594]),
            {
              "landcover": 3,
              "system:index": "112"
            }),
        ee.Feature(
            ee.Geometry.Point([11.352384155700118, 8.861388424565313]),
            {
              "landcover": 3,
              "system:index": "113"
            }),
        ee.Feature(
            ee.Geometry.Point([11.337220498731524, 8.865303856023582]),
            {
              "landcover": 3,
              "system:index": "114"
            }),
        ee.Feature(
            ee.Geometry.Point([11.3338301865367, 8.87073135519016]),
            {
              "landcover": 3,
              "system:index": "115"
            }),
        ee.Feature(
            ee.Geometry.Point([11.328852006605059, 8.873402672973183]),
            {
              "landcover": 3,
              "system:index": "116"
            }),
        ee.Feature(
            ee.Geometry.Point([11.325290033033282, 8.870307334706704]),
            {
              "landcover": 3,
              "system:index": "117"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326405831983477, 8.868060017968844]),
            {
              "landcover": 3,
              "system:index": "118"
            }),
        ee.Feature(
            ee.Geometry.Point([11.326234170606524, 8.863777357431989]),
            {
              "landcover": 3,
              "system:index": "119"
            }),
        ee.Feature(
            ee.Geometry.Point([11.324302980115801, 8.86208124044723]),
            {
              "landcover": 3,
              "system:index": "120"
            }),
        ee.Feature(
            ee.Geometry.Point([11.321770974805743, 8.858943403388226]),
            {
              "landcover": 3,
              "system:index": "121"
            }),
        ee.Feature(
            ee.Geometry.Point([11.317651101758868, 8.85898580677028]),
            {
              "landcover": 3,
              "system:index": "122"
            }),
        ee.Feature(
            ee.Geometry.Point([11.314775773694903, 8.862208449492654]),
            {
              "landcover": 3,
              "system:index": "123"
            }),
        ee.Feature(
            ee.Geometry.Point([11.31335956733504, 8.855551116978537]),
            {
              "landcover": 3,
              "system:index": "124"
            }),
        ee.Feature(
            ee.Geometry.Point([11.315592015742174, 8.847063942241766]),
            {
              "landcover": 3,
              "system:index": "125"
            }),
        ee.Feature(
            ee.Geometry.Point([11.29945584630858, 8.837225907926843]),
            {
              "landcover": 3,
              "system:index": "126"
            }),
        ee.Feature(
            ee.Geometry.Point([11.283662999628893, 8.840533552233111]),
            {
              "landcover": 3,
              "system:index": "127"
            }),
        ee.Feature(
            ee.Geometry.Point([11.302803243159167, 8.828659819318366]),
            {
              "landcover": 3,
              "system:index": "128"
            }),
        ee.Feature(
            ee.Geometry.Point([11.29670926427733, 8.823146884800728]),
            {
              "landcover": 3,
              "system:index": "129"
            }),
        ee.Feature(
            ee.Geometry.Point([11.29690828931678, 8.813956013962246]),
            {
              "landcover": 3,
              "system:index": "130"
            }),
        ee.Feature(
            ee.Geometry.Point([11.289956003550179, 8.811241856109275]),
            {
              "landcover": 3,
              "system:index": "131"
            }),
        ee.Feature(
            ee.Geometry.Point([11.292445093516, 8.807425037910376]),
            {
              "landcover": 3,
              "system:index": "132"
            }),
        ee.Feature(
            ee.Geometry.Point([11.303431421641, 8.807933949280125]),
            {
              "landcover": 3,
              "system:index": "133"
            }),
        ee.Feature(
            ee.Geometry.Point([11.298539072397835, 8.806576850737766]),
            {
              "landcover": 3,
              "system:index": "134"
            }),
        ee.Feature(
            ee.Geometry.Point([11.2884110511576, 8.801826966627214]),
            {
              "landcover": 3,
              "system:index": "135"
            }),
        ee.Feature(
            ee.Geometry.Point([11.281372934702523, 8.800215384949414]),
            {
              "landcover": 3,
              "system:index": "136"
            }),
        ee.Feature(
            ee.Geometry.Point([11.270987421396859, 8.805813480619173]),
            {
              "landcover": 3,
              "system:index": "137"
            }),
        ee.Feature(
            ee.Geometry.Point([11.274849802378304, 8.812514120084733]),
            {
              "landcover": 3,
              "system:index": "138"
            }),
        ee.Feature(
            ee.Geometry.Point([11.27570810926307, 8.820147611940968]),
            {
              "landcover": 3,
              "system:index": "139"
            }),
        ee.Feature(
            ee.Geometry.Point([11.266009241465218, 8.817094234127534]),
            {
              "landcover": 3,
              "system:index": "140"
            }),
        ee.Feature(
            ee.Geometry.Point([11.268927484873421, 8.823540224342931]),
            {
              "landcover": 3,
              "system:index": "141"
            }),
        ee.Feature(
            ee.Geometry.Point([11.257082849863655, 8.82065650578871]),
            {
              "landcover": 3,
              "system:index": "142"
            }),
        ee.Feature(
            ee.Geometry.Point([11.255108744028695, 8.826593548843753]),
            {
              "landcover": 3,
              "system:index": "143"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24498072278846, 8.826763177241942]),
            {
              "landcover": 3,
              "system:index": "144"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24746981275428, 8.834990060915263]),
            {
              "landcover": 3,
              "system:index": "145"
            }),
        ee.Feature(
            ee.Geometry.Point([11.199919611338265, 8.819723533198756]),
            {
              "landcover": 3,
              "system:index": "146"
            }),
        ee.Feature(
            ee.Geometry.Point([11.201979547861702, 8.813701562510321]),
            {
              "landcover": 3,
              "system:index": "147"
            }),
        ee.Feature(
            ee.Geometry.Point([11.197258859995491, 8.8087821333399]),
            {
              "landcover": 3,
              "system:index": "148"
            }),
        ee.Feature(
            ee.Geometry.Point([11.202752024057991, 8.804201916306043]),
            {
              "landcover": 3,
              "system:index": "149"
            }),
        ee.Feature(
            ee.Geometry.Point([11.20953264844764, 8.800300205212686]),
            {
              "landcover": 3,
              "system:index": "150"
            }),
        ee.Feature(
            ee.Geometry.Point([11.217858225229866, 8.8004698456809]),
            {
              "landcover": 3,
              "system:index": "151"
            }),
        ee.Feature(
            ee.Geometry.Point([11.1967449728927, 8.794280086486205]),
            {
              "landcover": 3,
              "system:index": "152"
            }),
        ee.Feature(
            ee.Geometry.Point([11.191938454338013, 8.790972028034759]),
            {
              "landcover": 3,
              "system:index": "153"
            }),
        ee.Feature(
            ee.Geometry.Point([11.189706856437622, 8.785458531649553]),
            {
              "landcover": 3,
              "system:index": "154"
            }),
        ee.Feature(
            ee.Geometry.Point([11.190822655387818, 8.779011878046669]),
            {
              "landcover": 3,
              "system:index": "155"
            }),
        ee.Feature(
            ee.Geometry.Point([11.191852623649536, 8.776212638308047]),
            {
              "landcover": 3,
              "system:index": "156"
            }),
        ee.Feature(
            ee.Geometry.Point([11.172712380119263, 8.804628181060103]),
            {
              "landcover": 3,
              "system:index": "157"
            }),
        ee.Feature(
            ee.Geometry.Point([11.17451482457727, 8.808529846504841]),
            {
              "landcover": 3,
              "system:index": "158"
            }),
        ee.Feature(
            ee.Geometry.Point([11.162670189567505, 8.810904753140843]),
            {
              "landcover": 3,
              "system:index": "159"
            }),
        ee.Feature(
            ee.Geometry.Point([11.152971321769654, 8.811752930384651]),
            {
              "landcover": 3,
              "system:index": "160"
            }),
        ee.Feature(
            ee.Geometry.Point([11.146104866691529, 8.80361034852302]),
            {
              "landcover": 3,
              "system:index": "161"
            }),
        ee.Feature(
            ee.Geometry.Point([11.1363201682052, 8.809208392814734]),
            {
              "landcover": 3,
              "system:index": "162"
            }),
        ee.Feature(
            ee.Geometry.Point([11.135719353385864, 8.822694242260818]),
            {
              "landcover": 3,
              "system:index": "163"
            }),
        ee.Feature(
            ee.Geometry.Point([11.130140358634888, 8.822609427136365]),
            {
              "landcover": 3,
              "system:index": "164"
            }),
        ee.Feature(
            ee.Geometry.Point([11.124303871818482, 8.819980148613919]),
            {
              "landcover": 3,
              "system:index": "165"
            }),
        ee.Feature(
            ee.Geometry.Point([11.153142983146607, 8.829818643125932]),
            {
              "landcover": 3,
              "system:index": "166"
            }),
        ee.Feature(
            ee.Geometry.Point([11.15331464452356, 8.82668053112463]),
            {
              "landcover": 3,
              "system:index": "167"
            }),
        ee.Feature(
            ee.Geometry.Point([11.152198845573364, 8.826256459887981]),
            {
              "landcover": 3,
              "system:index": "168"
            }),
        ee.Feature(
            ee.Geometry.Point([11.151683861442505, 8.824899428655677]),
            {
              "landcover": 3,
              "system:index": "169"
            }),
        ee.Feature(
            ee.Geometry.Point([11.153486305900513, 8.822354981646123]),
            {
              "landcover": 3,
              "system:index": "170"
            }),
        ee.Feature(
            ee.Geometry.Point([11.160009438224732, 8.819556069679386]),
            {
              "landcover": 3,
              "system:index": "171"
            }),
        ee.Feature(
            ee.Geometry.Point([11.171939903922974, 8.82795274191007]),
            {
              "landcover": 3,
              "system:index": "172"
            }),
        ee.Feature(
            ee.Geometry.Point([11.186960274406372, 8.803525529018525]),
            {
              "landcover": 3,
              "system:index": "173"
            }),
        ee.Feature(
            ee.Geometry.Point([11.196573311515747, 8.80437372318838]),
            {
              "landcover": 3,
              "system:index": "174"
            }),
        ee.Feature(
            ee.Geometry.Point([11.184299523063599, 8.797927398734355]),
            {
              "landcover": 3,
              "system:index": "175"
            }),
        ee.Feature(
            ee.Geometry.Point([11.176832253166138, 8.791056850415352]),
            {
              "landcover": 3,
              "system:index": "176"
            }),
        ee.Feature(
            ee.Geometry.Point([11.180437142082154, 8.784440646425946]),
            {
              "landcover": 3,
              "system:index": "177"
            }),
        ee.Feature(
            ee.Geometry.Point([11.180437142082154, 8.78164144765334]),
            {
              "landcover": 3,
              "system:index": "178"
            }),
        ee.Feature(
            ee.Geometry.Point([11.181467110343872, 8.778672577384887]),
            {
              "landcover": 3,
              "system:index": "179"
            }),
        ee.Feature(
            ee.Geometry.Point([11.222665840812622, 8.792244361704503]),
            {
              "landcover": 3,
              "system:index": "180"
            }),
        ee.Feature(
            ee.Geometry.Point([11.24395185155481, 8.798181861038767]),
            {
              "landcover": 3,
              "system:index": "181"
            }),
        ee.Feature(
            ee.Geometry.Point([11.245840126701294, 8.801489855077072]),
            {
              "landcover": 3,
              "system:index": "182"
            }),
        ee.Feature(
            ee.Geometry.Point([11.237600380607544, 8.806579018927781]),
            {
              "landcover": 3,
              "system:index": "183"
            }),
        ee.Feature(
            ee.Geometry.Point([10.966479219018805, 8.997774340809439]),
            {
              "landcover": 3,
              "system:index": "184"
            }),
        ee.Feature(
            ee.Geometry.Point([10.964011586725103, 8.999130730135507]),
            {
              "landcover": 3,
              "system:index": "185"
            }),
        ee.Feature(
            ee.Geometry.Point([10.96283141475855, 8.998749246151514]),
            {
              "landcover": 3,
              "system:index": "186"
            }),
        ee.Feature(
            ee.Geometry.Point([10.961071885644781, 8.997880308908652]),
            {
              "landcover": 3,
              "system:index": "187"
            }),
        ee.Feature(
            ee.Geometry.Point([10.97384992939173, 9.001546786025573]),
            {
              "landcover": 3,
              "system:index": "188"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974740422784674, 9.001462012407883]),
            {
              "landcover": 3,
              "system:index": "189"
            }),
        ee.Feature(
            ee.Geometry.Point([10.972916520654547, 9.002299151011941]),
            {
              "landcover": 3,
              "system:index": "190"
            }),
        ee.Feature(
            ee.Geometry.Point([10.971757806360113, 9.002436907811754]),
            {
              "landcover": 3,
              "system:index": "191"
            }),
        ee.Feature(
            ee.Geometry.Point([10.970609820901739, 9.001567979426891]),
            {
              "landcover": 3,
              "system:index": "192"
            }),
        ee.Feature(
            ee.Geometry.Point([11.103838217363474, 8.970602768190979]),
            {
              "landcover": 3,
              "system:index": "193"
            }),
        ee.Feature(
            ee.Geometry.Point([11.103645098314402, 8.970369620783675]),
            {
              "landcover": 3,
              "system:index": "194"
            }),
        ee.Feature(
            ee.Geometry.Point([11.109824907884715, 8.964519691372153]),
            {
              "landcover": 3,
              "system:index": "195"
            }),
        ee.Feature(
            ee.Geometry.Point([11.109267008409617, 8.964519691372153]),
            {
              "landcover": 3,
              "system:index": "196"
            }),
        ee.Feature(
            ee.Geometry.Point([11.109330741775162, 8.96819322643475]),
            {
              "landcover": 3,
              "system:index": "197"
            }),
        ee.Feature(
            ee.Geometry.Point([11.108858672988541, 8.968871477088486]),
            {
              "landcover": 3,
              "system:index": "198"
            })]),
    waterbody = ui.import && ui.import("waterbody", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            11.184814507194458,
            8.811837748001997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.080620951124724,
            9.139732205074024
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.081865496107634,
            9.138672941337427
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.083067125746306,
            9.14125753931956
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.083410448500212,
            9.14024065054849
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.082895464369352,
            9.138842423746997
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.082080072828825,
            9.137656045186494
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.080234713026579,
            9.137528932963503
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.078088945814665,
            9.136935741989804
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.076286501356657,
            9.13473245258297
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.0752136177507,
            9.133037605306924
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.071866220900114,
            9.130876663340677
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.069076723524626,
            9.12939365637221
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.066759294935759,
            9.128461477406118
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.056588358351286,
            9.125071715170053
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.054185099073942,
            9.124902226212562
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.051438517042692,
            9.125325948455277
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.059935755201872,
            9.13566461514871
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.056373781630095,
            9.129097054238276
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.047759025295884,
            9.121772208908082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.045656173428208,
            9.117111190143909
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.042433910490814,
            9.106823919723466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.041146450163666,
            9.094196127135762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.033421688200775,
            9.085932733086407
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.015660922740075,
            9.078201925896941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.027574036605428,
            9.06693736768358
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.004099343307088,
            9.064267473635224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.00452849674947,
            9.057020518325793
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.006459687240193,
            9.057317180184095
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.99856326390035,
            9.055494824901313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.990849680443699,
            9.050616978168602
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.985270685692722,
            9.046124560120578
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.975958055993015,
            9.054176967717929
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.975700563927585,
            9.052820785378442
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.979143945111254,
            9.033594415770171
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.974594918621996,
            9.02723690347672
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.970586559913244,
            9.0166745144227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.966043607547391,
            9.005805394556589
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.95531477148782,
            8.997963843169359
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.941318754839218,
            8.97574671112428
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.938952900867726,
            8.963824089848224
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.952603172974174,
            8.962534015825648
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.938569855408256,
            8.951596878824894
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.935104991250189,
            8.924598014639832
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.913261350418896,
            8.89131394559768
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.942443784500927,
            8.865110029286036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.93789475801167,
            8.86129376890223
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.910514768387646,
            8.866297302209357
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.908822982973208,
            8.83686946864581
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            10.89718183336525,
            8.812320383206599
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.102589225881315,
            8.977061469265967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.103619194143034,
            8.976256064651535
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.104692077748991,
            8.975853361673675
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.105249977224089,
            8.975514243029782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117403009020762,
            8.920299638758179
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117746331774669,
            8.920999176753181
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117445924365,
            8.921295950042992
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117424466692881,
            8.918667378223422
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117488839709239,
            8.914582170197582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117424466692881,
            8.913988612463294
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            11.117403009020762,
            8.912547111093481
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 4
      },
      "color": "#101cff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #101cff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([11.184814507194458, 8.811837748001997]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([11.080620951124724, 9.139732205074024]),
            {
              "landcover": 4,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([11.081865496107634, 9.138672941337427]),
            {
              "landcover": 4,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([11.083067125746306, 9.14125753931956]),
            {
              "landcover": 4,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([11.083410448500212, 9.14024065054849]),
            {
              "landcover": 4,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([11.082895464369352, 9.138842423746997]),
            {
              "landcover": 4,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([11.082080072828825, 9.137656045186494]),
            {
              "landcover": 4,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([11.080234713026579, 9.137528932963503]),
            {
              "landcover": 4,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([11.078088945814665, 9.136935741989804]),
            {
              "landcover": 4,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([11.076286501356657, 9.13473245258297]),
            {
              "landcover": 4,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([11.0752136177507, 9.133037605306924]),
            {
              "landcover": 4,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([11.071866220900114, 9.130876663340677]),
            {
              "landcover": 4,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([11.069076723524626, 9.12939365637221]),
            {
              "landcover": 4,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([11.066759294935759, 9.128461477406118]),
            {
              "landcover": 4,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([11.056588358351286, 9.125071715170053]),
            {
              "landcover": 4,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([11.054185099073942, 9.124902226212562]),
            {
              "landcover": 4,
              "system:index": "15"
            }),
        ee.Feature(
            ee.Geometry.Point([11.051438517042692, 9.125325948455277]),
            {
              "landcover": 4,
              "system:index": "16"
            }),
        ee.Feature(
            ee.Geometry.Point([11.059935755201872, 9.13566461514871]),
            {
              "landcover": 4,
              "system:index": "17"
            }),
        ee.Feature(
            ee.Geometry.Point([11.056373781630095, 9.129097054238276]),
            {
              "landcover": 4,
              "system:index": "18"
            }),
        ee.Feature(
            ee.Geometry.Point([11.047759025295884, 9.121772208908082]),
            {
              "landcover": 4,
              "system:index": "19"
            }),
        ee.Feature(
            ee.Geometry.Point([11.045656173428208, 9.117111190143909]),
            {
              "landcover": 4,
              "system:index": "20"
            }),
        ee.Feature(
            ee.Geometry.Point([11.042433910490814, 9.106823919723466]),
            {
              "landcover": 4,
              "system:index": "21"
            }),
        ee.Feature(
            ee.Geometry.Point([11.041146450163666, 9.094196127135762]),
            {
              "landcover": 4,
              "system:index": "22"
            }),
        ee.Feature(
            ee.Geometry.Point([11.033421688200775, 9.085932733086407]),
            {
              "landcover": 4,
              "system:index": "23"
            }),
        ee.Feature(
            ee.Geometry.Point([11.015660922740075, 9.078201925896941]),
            {
              "landcover": 4,
              "system:index": "24"
            }),
        ee.Feature(
            ee.Geometry.Point([11.027574036605428, 9.06693736768358]),
            {
              "landcover": 4,
              "system:index": "25"
            }),
        ee.Feature(
            ee.Geometry.Point([11.004099343307088, 9.064267473635224]),
            {
              "landcover": 4,
              "system:index": "26"
            }),
        ee.Feature(
            ee.Geometry.Point([11.00452849674947, 9.057020518325793]),
            {
              "landcover": 4,
              "system:index": "27"
            }),
        ee.Feature(
            ee.Geometry.Point([11.006459687240193, 9.057317180184095]),
            {
              "landcover": 4,
              "system:index": "28"
            }),
        ee.Feature(
            ee.Geometry.Point([10.99856326390035, 9.055494824901313]),
            {
              "landcover": 4,
              "system:index": "29"
            }),
        ee.Feature(
            ee.Geometry.Point([10.990849680443699, 9.050616978168602]),
            {
              "landcover": 4,
              "system:index": "30"
            }),
        ee.Feature(
            ee.Geometry.Point([10.985270685692722, 9.046124560120578]),
            {
              "landcover": 4,
              "system:index": "31"
            }),
        ee.Feature(
            ee.Geometry.Point([10.975958055993015, 9.054176967717929]),
            {
              "landcover": 4,
              "system:index": "32"
            }),
        ee.Feature(
            ee.Geometry.Point([10.975700563927585, 9.052820785378442]),
            {
              "landcover": 4,
              "system:index": "33"
            }),
        ee.Feature(
            ee.Geometry.Point([10.979143945111254, 9.033594415770171]),
            {
              "landcover": 4,
              "system:index": "34"
            }),
        ee.Feature(
            ee.Geometry.Point([10.974594918621996, 9.02723690347672]),
            {
              "landcover": 4,
              "system:index": "35"
            }),
        ee.Feature(
            ee.Geometry.Point([10.970586559913244, 9.0166745144227]),
            {
              "landcover": 4,
              "system:index": "36"
            }),
        ee.Feature(
            ee.Geometry.Point([10.966043607547391, 9.005805394556589]),
            {
              "landcover": 4,
              "system:index": "37"
            }),
        ee.Feature(
            ee.Geometry.Point([10.95531477148782, 8.997963843169359]),
            {
              "landcover": 4,
              "system:index": "38"
            }),
        ee.Feature(
            ee.Geometry.Point([10.941318754839218, 8.97574671112428]),
            {
              "landcover": 4,
              "system:index": "39"
            }),
        ee.Feature(
            ee.Geometry.Point([10.938952900867726, 8.963824089848224]),
            {
              "landcover": 4,
              "system:index": "40"
            }),
        ee.Feature(
            ee.Geometry.Point([10.952603172974174, 8.962534015825648]),
            {
              "landcover": 4,
              "system:index": "41"
            }),
        ee.Feature(
            ee.Geometry.Point([10.938569855408256, 8.951596878824894]),
            {
              "landcover": 4,
              "system:index": "42"
            }),
        ee.Feature(
            ee.Geometry.Point([10.935104991250189, 8.924598014639832]),
            {
              "landcover": 4,
              "system:index": "43"
            }),
        ee.Feature(
            ee.Geometry.Point([10.913261350418896, 8.89131394559768]),
            {
              "landcover": 4,
              "system:index": "44"
            }),
        ee.Feature(
            ee.Geometry.Point([10.942443784500927, 8.865110029286036]),
            {
              "landcover": 4,
              "system:index": "45"
            }),
        ee.Feature(
            ee.Geometry.Point([10.93789475801167, 8.86129376890223]),
            {
              "landcover": 4,
              "system:index": "46"
            }),
        ee.Feature(
            ee.Geometry.Point([10.910514768387646, 8.866297302209357]),
            {
              "landcover": 4,
              "system:index": "47"
            }),
        ee.Feature(
            ee.Geometry.Point([10.908822982973208, 8.83686946864581]),
            {
              "landcover": 4,
              "system:index": "48"
            }),
        ee.Feature(
            ee.Geometry.Point([10.89718183336525, 8.812320383206599]),
            {
              "landcover": 4,
              "system:index": "49"
            }),
        ee.Feature(
            ee.Geometry.Point([11.102589225881315, 8.977061469265967]),
            {
              "landcover": 4,
              "system:index": "50"
            }),
        ee.Feature(
            ee.Geometry.Point([11.103619194143034, 8.976256064651535]),
            {
              "landcover": 4,
              "system:index": "51"
            }),
        ee.Feature(
            ee.Geometry.Point([11.104692077748991, 8.975853361673675]),
            {
              "landcover": 4,
              "system:index": "52"
            }),
        ee.Feature(
            ee.Geometry.Point([11.105249977224089, 8.975514243029782]),
            {
              "landcover": 4,
              "system:index": "53"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117403009020762, 8.920299638758179]),
            {
              "landcover": 4,
              "system:index": "54"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117746331774669, 8.920999176753181]),
            {
              "landcover": 4,
              "system:index": "55"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117445924365, 8.921295950042992]),
            {
              "landcover": 4,
              "system:index": "56"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117424466692881, 8.918667378223422]),
            {
              "landcover": 4,
              "system:index": "57"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117488839709239, 8.914582170197582]),
            {
              "landcover": 4,
              "system:index": "58"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117424466692881, 8.913988612463294]),
            {
              "landcover": 4,
              "system:index": "59"
            }),
        ee.Feature(
            ee.Geometry.Point([11.117403009020762, 8.912547111093481]),
            {
              "landcover": 4,
              "system:index": "60"
            })]);
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(table)
    .filterDate('2020-11-15', '2020-12-30')
    .sort('CLOUD_COVER')
    .median());
//Map.addLayer(image, {bands: ['B6', 'B5', 'B4'],min:0, max: 3000}, 'False colour image');
//Merge feature
//Clip to the output image to the table boundary.
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
      description:"Ardo_Kola_2020",
      folder: "Ardo_Kola",
      fileNamePrefix:"Ardo_Kola_2020",
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