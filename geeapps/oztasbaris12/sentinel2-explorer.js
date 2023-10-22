var danish_samples = ui.import && ui.import("danish_samples", "table", {
      "id": "users/oztasbaris12/Danish_lakes/Mask_shapefile/danish_samples"
    }) || ee.FeatureCollection("users/oztasbaris12/Danish_lakes/Mask_shapefile/danish_samples"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            33.40611437231097,
            38.74281971103227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            33.14518907934222,
            39.092808320561254
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            30.227267396009037,
            37.75022534923131
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            29.96222222999341,
            37.570844379398935
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            29.67383111671216,
            37.545805350989156
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            29.779574524915287,
            37.6796118638182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            29.975124888135163,
            37.3909243372876
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            29.875337411373035,
            37.82274748493295
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            32.83170372531819,
            39.016254261285916
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            32.92452611205626,
            39.240342168050105
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            32.73911780317075,
            39.100797488846226
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            32.926614297909296,
            38.5261066145585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            34.45619400667103,
            38.341204061387764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            33.665766683105964,
            37.71360049861419
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            33.77669153442381,
            37.52528625913734
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            34.37139560152425,
            38.40161802786936
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[33.40611437231097, 38.74281971103227],
         [33.14518907934222, 39.092808320561254],
         [30.227267396009037, 37.75022534923131],
         [29.96222222999341, 37.570844379398935],
         [29.67383111671216, 37.545805350989156],
         [29.779574524915287, 37.6796118638182],
         [29.975124888135163, 37.3909243372876],
         [29.875337411373035, 37.82274748493295],
         [32.83170372531819, 39.016254261285916],
         [32.92452611205626, 39.240342168050105],
         [32.73911780317075, 39.100797488846226],
         [32.926614297909296, 38.5261066145585],
         [34.45619400667103, 38.341204061387764],
         [33.665766683105964, 37.71360049861419],
         [33.77669153442381, 37.52528625913734],
         [34.37139560152425, 38.40161802786936]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/burdur_2020_wet"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/burdur_2020_wet"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/duden_big_2020_wet"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/duden_big_2020_wet"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/duden_small_2020_wet"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/duden_small_2020_wet"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/kozanli_2020_wet"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/kozanli_2020_wet"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/uyuz_2020_wet"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/uyuz_2020_wet"),
    brazilian = ui.import && ui.import("brazilian", "table", {
      "id": "users/oztasbaris12/sentinel2_explorer/Brazilian_data"
    }) || ee.FeatureCollection("users/oztasbaris12/sentinel2_explorer/Brazilian_data"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -35.11724792959124,
            -7.969070923247826
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.19827209951311,
            -8.043185783504539
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.17904602529436,
            -7.876578527311959
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.34521423818499,
            -7.895622776162244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.37705201724026,
            -8.249019032861577
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.37746451840524,
            -8.346094255915155
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.73530173156121,
            -8.373410484088817
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.85889792296746,
            -8.367975839116438
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.74890589236848,
            -8.493548624810174
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.87692747325357,
            -8.579738627804227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.90770160406606,
            -8.61240292876019
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.94472395668666,
            -8.493678249702263
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.98821196237636,
            -8.557978163060152
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.1674214821477,
            -8.627989860778445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.16653098875476,
            -8.636199914656338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.021918711498124,
            -9.130767205053653
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.160391529691026,
            -9.089794025462066
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.4249197244081,
            -8.927225340952585
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.70446507650671,
            -8.507683068909431
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.220435913685115,
            -8.064985505195526
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.47139924530269,
            -7.773523397167109
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.62073839458777,
            -7.746474162165367
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.240618806888925,
            -7.9990158834486
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.28586463414705,
            -7.943111135673724
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.323801798453694,
            -7.972352573013108
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.523513228304225,
            -8.194568960965714
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.052606745460054,
            -8.059831306707682
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.0790817574881,
            -7.986299502854126
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.568297348565274,
            -7.993265506224788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.89163105996415,
            -8.366963202055794
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -40.32431334701042,
            -7.9793749267510465
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -40.4839259949843,
            -7.813828770498856
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -40.38388781564898,
            -7.7707163160054415
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.771384385641454,
            -7.991720953430889
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.934771409403595,
            -7.871304940068492
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -40.55769442512204,
            -7.700291978037546
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -40.47209075334893,
            -7.5759282648320205
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.17169699494532,
            -6.476240993359142
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.17710559348312,
            -6.330305770270013
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.25052570213629,
            -6.3043949730712
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.188641052681874,
            -6.147489708630313
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.25813625418991,
            -6.220721925847607
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.31806082209563,
            -6.1237392792404135
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.43044961616472,
            -6.214706648867738
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.21600319538456,
            -6.112339152087982
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.79418171801353,
            -6.347199798046466
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.82676083669689,
            -6.254978153917507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.030651637172966,
            -6.223408903046339
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.018822182391155,
            -6.19424616503788
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.77222751397296,
            -5.890996444453036
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -35.65793583285855,
            -5.635061558479124
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.47346989534009,
            -5.574328513067182
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.59456779725364,
            -5.663092020881923
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.888356068127976,
            -5.673744655162317
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.93263592250403,
            -5.645205212601062
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.82662859458083,
            -5.615393392588582
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.07322267782145,
            -5.773048603220987
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.34472261205667,
            -5.877837074793491
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.50823983580591,
            -5.904094834205227
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.72207096487626,
            -5.958175698352593
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.818104678395464,
            -6.12367409326016
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.039412385939876,
            -6.270432278579169
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.93895926654196,
            -5.937220226573326
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -38.0117412322943,
            -5.852362153458741
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.91691644061649,
            -5.783244235603556
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.689800541966584,
            -5.672256248294625
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.70380302395573,
            -5.977345538282527
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.60244795351084,
            -6.4235429275997715
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.792796406466536,
            -6.408471544443781
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.749280809501116,
            -6.594162568559304
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.68946876561955,
            -6.705938451780703
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.625954056146895,
            -6.694686182282292
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.95447261723589,
            -6.733552237122845
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.19921007649701,
            -6.64785642734616
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.14625254170697,
            -6.629952845886146
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.25646616450896,
            -6.58006453826454
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.329058958564694,
            -6.578560010930387
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.06417377213825,
            -6.491484764457253
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.94127929234159,
            -6.5144245590512515
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.780387204602164,
            -6.057690526950082
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -37.29658177140936,
            -7.476486571140121
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.49263658048201,
            -8.943617153311113
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -36.48097346426018,
            -8.9688206570967
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.53771787272806,
            -7.62896363515918
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -39.266098799574266,
            -7.725241935589066
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[-35.11724792959124, -7.969070923247826],
         [-35.19827209951311, -8.043185783504539],
         [-35.17904602529436, -7.876578527311959],
         [-35.34521423818499, -7.895622776162244],
         [-36.37705201724026, -8.249019032861577],
         [-36.37746451840524, -8.346094255915155],
         [-36.73530173156121, -8.373410484088817],
         [-36.85889792296746, -8.367975839116438],
         [-36.74890589236848, -8.493548624810174],
         [-36.87692747325357, -8.579738627804227],
         [-36.90770160406606, -8.61240292876019],
         [-36.94472395668666, -8.493678249702263],
         [-36.98821196237636, -8.557978163060152],
         [-37.1674214821477, -8.627989860778445],
         [-37.16653098875476, -8.636199914656338],
         [-37.021918711498124, -9.130767205053653],
         [-37.160391529691026, -9.089794025462066],
         [-37.4249197244081, -8.927225340952585],
         [-37.70446507650671, -8.507683068909431],
         [-37.220435913685115, -8.064985505195526],
         [-37.47139924530269, -7.773523397167109],
         [-37.62073839458777, -7.746474162165367],
         [-38.240618806888925, -7.9990158834486],
         [-38.28586463414705, -7.943111135673724],
         [-38.323801798453694, -7.972352573013108],
         [-38.523513228304225, -8.194568960965714],
         [-39.052606745460054, -8.059831306707682],
         [-39.0790817574881, -7.986299502854126],
         [-39.568297348565274, -7.993265506224788],
         [-39.89163105996415, -8.366963202055794],
         [-40.32431334701042, -7.9793749267510465],
         [-40.4839259949843, -7.813828770498856],
         [-40.38388781564898, -7.7707163160054415],
         [-39.771384385641454, -7.991720953430889],
         [-39.934771409403595, -7.871304940068492],
         [-40.55769442512204, -7.700291978037546],
         [-40.47209075334893, -7.5759282648320205],
         [-38.17169699494532, -6.476240993359142],
         [-38.17710559348312, -6.330305770270013],
         [-38.25052570213629, -6.3043949730712],
         [-38.188641052681874, -6.147489708630313],
         [-38.25813625418991, -6.220721925847607],
         [-38.31806082209563, -6.1237392792404135],
         [-38.43044961616472, -6.214706648867738],
         [-38.21600319538456, -6.112339152087982],
         [-35.79418171801353, -6.347199798046466],
         [-35.82676083669689, -6.254978153917507],
         [-36.030651637172966, -6.223408903046339],
         [-36.018822182391155, -6.19424616503788],
         [-35.77222751397296, -5.890996444453036],
         [-35.65793583285855, -5.635061558479124],
         [-36.47346989534009, -5.574328513067182],
         [-36.59456779725364, -5.663092020881923],
         [-36.888356068127976, -5.673744655162317],
         [-36.93263592250403, -5.645205212601062],
         [-36.82662859458083, -5.615393392588582],
         [-37.07322267782145, -5.773048603220987],
         [-37.34472261205667, -5.877837074793491],
         [-37.50823983580591, -5.904094834205227],
         [-37.72207096487626, -5.958175698352593],
         [-37.818104678395464, -6.12367409326016],
         [-38.039412385939876, -6.270432278579169],
         [-37.93895926654196, -5.937220226573326],
         [-38.0117412322943, -5.852362153458741],
         [-37.91691644061649, -5.783244235603556],
         [-37.689800541966584, -5.672256248294625],
         [-36.70380302395573, -5.977345538282527],
         [-36.60244795351084, -6.4235429275997715],
         [-36.792796406466536, -6.408471544443781],
         [-36.749280809501116, -6.594162568559304],
         [-36.68946876561955, -6.705938451780703],
         [-36.625954056146895, -6.694686182282292],
         [-36.95447261723589, -6.733552237122845],
         [-37.19921007649701, -6.64785642734616],
         [-37.14625254170697, -6.629952845886146],
         [-37.25646616450896, -6.58006453826454],
         [-37.329058958564694, -6.578560010930387],
         [-37.06417377213825, -6.491484764457253],
         [-36.94127929234159, -6.5144245590512515],
         [-37.780387204602164, -6.057690526950082],
         [-37.29658177140936, -7.476486571140121],
         [-36.49263658048201, -8.943617153311113],
         [-36.48097346426018, -8.9688206570967],
         [-39.53771787272806, -7.62896363515918],
         [-39.266098799574266, -7.725241935589066]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "algdeneme"
        ],
        "min": -0.20698069372778977,
        "max": 0.4,
        "gamma": 1.066
      }
    }) || {"opacity":1,"bands":["algdeneme"],"min":-0.20698069372778977,"max":0.4,"gamma":1.066},
    tuz = ui.import && ui.import("tuz", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            33.33516931937272,
            38.645185454112834
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
    ee.Geometry.Point([33.33516931937272, 38.645185454112834]);
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Sentinel 2 Explorer for TUBİTAK Saline Lakes Project',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
     ui.Label({
       value:"Developed for TUBİTAK 2232 project, Saline Lakes",
       style:{fontWeight:'bold'}
     }),
      ui.Label('This app allows you to filter and export images ' +
               'from the Sentinel2 collection.'+
               ' The lake polygons shown on map are from 2020 Wet Season(May)')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2022-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2022-12-31'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Center on map', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select an image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
        app.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export the current image to Drive',
      // React to the button's click event.
      onClick: function() {
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
        Export.image.toDrive({
          image: ee.Image(imageId).select(visOption.visParams.bands),
          description: 'L8_Export-' + imageIdTrailer,
          scale: 20,
          maxPixels: 767644762,
          folder:"Sentinel 2 Exported Images"
        });
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) Start an export', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.picker.select,
      app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var filtered = (ee.ImageCollection(app.COLLECTION_ID));
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(Map.getCenter());
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(Date.now());
    if (start) filtered = filtered.filterDate(start, end);
    // Get the list of computed ids.
    var computedIds = filtered
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      var wi = image.normalizedDifference(["B3","B8"]).rename("waterindex").gte(0.02);
      var vi = image.normalizedDifference(["B8","B4"]).rename("vegindex");
      var alg = image.expression(
    'band8 / band2', {
      'band8': image.select('B8'),
      'band2': image.select('B2')});
      var image = image.addBands(alg.rename("alg"))
      var algdeneme = image.normalizedDifference(["B8","B2"]).rename("algdeneme");
      var image = image.addBands(algdeneme)
      var image = image.addBands(wi);
      var image = image.addBands(vi);
      print(image)
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  Map.addLayer({
    eeObject:table,
    opacity:0.5,
    name:"Lake Burdur Polygon 2020 Wet Season "
  })
  Map.addLayer({
    eeObject:table2,
    opacity:0.5
  })
  Map.addLayer({
    eeObject:table3,
    opacity:0.5
  })
  Map.addLayer({
    eeObject:table4,
    opacity:0.5
  })
  Map.addLayer({
    eeObject:table5,
    opacity:0.5
  })
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S2_SR';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 100;
  app.VIS_OPTIONS = {
    'True Color': {
      description: 'RGB SENTINEL2 Surface Reflectance. ',
      visParams: {"opacity":1,"bands":["B4","B3","B2"],"min":-1000,"max":8256}
      },
      'Water Index':{
        description: 'NDWI ((Green - NIR)/(Green + NIR)): Water appears white.',
        visParams:{"bands":["waterindex"]}
    },
      'Vegetation Index':{
        description: 'Vegetation appears green.',
        visParams:{"bands":["vegindex"],"max":0.5,"min":-1,palette:"red,green"}
    },
    'Algal Bloom Index':{
        description: 'Algs appear white ',
        visParams:{"opacity":1,"bands":["algdeneme"],"min":0.0069737642147330026,"max":0.25156908248784984,"gamma":1}
    }
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.centerObject(tuz,10);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();