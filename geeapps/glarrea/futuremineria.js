var def_min_tot = ee.FeatureCollection("users/glarrea/Def_Min_SPA_1984_2017"),
    predicted_2017_s4_vintage = ee.Image("users/glarrea/mining/predicted_2017_010719_g_prob_s4_100"),
    def_min_2017 = ee.FeatureCollection("users/glarrea/DEF_MIN_2017"),
    predicted_2017_c0 = ee.Image("users/glarrea/mining/predicted_2017_010719_g_plus_prob_s4_100"),
    predicted_2018_c0 = ee.Image("users/glarrea/mining/predicted_2018_010719_g_plus_prob_s4_100"),
    predicted_2019_c0 = ee.Image("users/glarrea/mining/predicted_2019_010719_g_plus_prob_s4_100"),
    predicted_2020_c0 = ee.Image("users/glarrea/mining/predicted_2020_010719_g_plus_prob_s4_100"),
    predicted_2021_c0 = ee.Image("users/glarrea/mining/predicted_2021_010719_g_plus_prob_s4_100"),
    vis = {"opacity":1,"bands":["classification"],"palette":["000000","0042ff","00fff3","4aff00","ff0000"]},
    predicted_2017_c1 = ee.Image("users/glarrea/mining/predicted_2017_010719_g_plus_prob_s4_C1_100"),
    predicted_2018_c1 = ee.Image("users/glarrea/mining/predicted_2018_010719_g_plus_prob_s4_C1_100"),
    predicted_2019_c1 = ee.Image("users/glarrea/mining/predicted_2019_010719_g_plus_prob_s4_C1_100"),
    predicted_2020_c1 = ee.Image("users/glarrea/mining/predicted_2020_010719_g_plus_prob_s4_C1_100"),
    predicted_2021_c1 = ee.Image("users/glarrea/mining/predicted_2021_010719_g_plus_prob_s4_C1_100");
var nac_road = /* color: #d63000 */ee.Geometry.LineString(
        [[-70.41221085476411, -12.608846968659908],
         [-70.34491959499849, -12.624928520975175],
         [-70.29960099148286, -12.630288813821563],
         [-70.26526871609224, -12.636989021853621],
         [-70.21995011257661, -12.619568115803055],
         [-70.17875138210786, -12.607506793705694],
         [-70.06202164577974, -12.620908227624188],
         [-69.98923722195161, -12.651728861058698],
         [-69.88074723171724, -12.689244608892842],
         [-69.78461686062349, -12.705321094524272],
         [-69.73792496609224, -12.712019330133641],
         [-69.68711319851411, -12.716038186717892],
         [-69.63080826687349, -12.7267548265811],
         [-69.60471573757661, -12.783009750713239]]),
    dep_road = /* color: #0b4a8b */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.22132340359224,
              -12.66780771488341
            ],
            [
              -70.25840226101411,
              -12.670487425289835
            ]
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.39847794460786,
              -12.753544444958763
            ],
            [
              -70.46164933132661,
              -12.799080287254869
            ],
            [
              -70.49872818874849,
              -12.772295491420314
            ]
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.39710465359224,
              -12.756223250971676
            ],
            [
              -70.37513199734224,
              -12.776313391900526
            ],
            [
              -70.34766617702974,
              -12.979802985267282
            ]
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.22269669460786,
              -12.636989021853621
            ],
            [
              -70.18561783718599,
              -12.915560980228124
            ]
          ]
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.41572707085254,
              -12.67128135153502
            ],
            [
              -70.4685987749541,
              -12.659892423248465
            ],
            [
              -70.4740919390166,
              -12.702095898540678
            ],
            [
              -70.49812453179004,
              -12.770410471851761
            ]
          ],
          "geodesic": true
        },
        {
          "type": "LineString",
          "coordinates": [
            [
              -70.37382932291308,
              -12.615453612722385
            ],
            [
              -70.39832635291077,
              -12.439519713218317
            ],
            [
              -70.10444207556702,
              -12.19801894888319
            ],
            [
              -69.81554860869085,
              -12.057893252628624
            ]
          ],
          "geodesic": true
        }
      ],
      "coordinates": []
    }),
    protected_park = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[-70.25685941039387, -12.953841503573411],
           [-70.15042474690864, -12.964554764058137],
           [-70.131889927972, -12.917034379321043],
           [-70.16347562133137, -12.910341591783682],
           [-70.25411282836262, -12.904987232720128]]],
         [[[-70.13062861386021, -12.663149028894841],
           [-70.13818171444615, -12.745538721848867],
           [-69.98505976620396, -12.7522358955024],
           [-69.97338679257115, -12.682576646010052]]]]),
    protected_buffer = /* color: #e053ff */ee.Geometry.MultiPolygon(
        [[[[-69.9706402105399, -12.681236857912186],
           [-69.96858027401646, -12.663818971379323],
           [-70.12582209530552, -12.628979630279185],
           [-70.1738872808524, -12.647739866153465],
           [-70.16496088925084, -12.752905603125333],
           [-69.98643305721959, -12.783710237169478],
           [-69.98231318417271, -12.750226762004287],
           [-70.14367487850865, -12.743529535219396],
           [-70.13131525936802, -12.663818971379323]]],
         [[[-69.97613378969504, -12.790407395379638],
           [-69.94317428062834, -12.788398533478112],
           [-69.93287443703434, -12.679896306877458],
           [-69.96446062861713, -12.669177523125924]]],
         [[[-70.2613463396691, -12.903557136626674],
           [-70.27267511683942, -12.886658986342464],
           [-70.28228803926822, -12.97968055962368],
           [-70.14496023299199, -13.000421645923504],
           [-70.11200155318585, -12.907407785601904],
           [-70.12848088993258, -12.890005657389239],
           [-70.27027186083745, -12.881973497526248],
           [-70.25688244773517, -12.903222052057851],
           [-70.1363771353972, -12.915520346731117],
           [-70.15062062100935, -12.962832545924378],
           [-70.25962895224336, -12.950573211747729]]]]),
    village_new = /* color: #73ff00 */ee.Geometry.MultiPoint(
        [[-70.45203629421724, -12.841930042165936],
         [-70.39710465359224, -12.752205031321287],
         [-70.22681656765474, -12.635648994297672],
         [-70.3919775545665, -12.440071946143942],
         [-70.1036215549662, -12.195918790476291],
         [-69.8136770503379, -12.054850367617753],
         [-70.38329826479497, -12.615777780750488],
         [-70.21113851791375, -12.69242557993455],
         [-70.21457174545282, -12.721228201696789]]),
    roi = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-70.55936403177157, -13.183800338798054],
          [-70.18306566222236, -13.234607099530427],
          [-69.74359335855388, -13.056737519724827],
          [-69.66393970771475, -12.703296022401346],
          [-69.33387992847827, -12.3054475926963],
          [-69.44047621441183, -12.140187047378507],
          [-69.68213340740436, -12.012316888904707],
          [-69.89766174354781, -11.901298030576022],
          [-70.9548736584527, -12.207127805507525],
          [-71.38473895810381, -12.719093766998535],
          [-70.9301684581419, -12.963070273882716]]]),
    vec_road = /* color: #ffe500 */ee.Geometry.MultiLineString(
        [[[-70.37494715919394, -12.776815728787332],
          [-70.32001551856894, -12.764092183460697]],
         [[-70.37014064063925, -12.809626124271029],
          [-70.31383570899862, -12.795565048650872]],
         [[-70.36327418556112, -12.834398490952342],
          [-70.42507228126425, -12.846449030637896]],
         [[-70.35984095802206, -12.86586257313575],
          [-70.30216273536581, -12.853143525206304]],
         [[-70.36121424903769, -12.90870093402391],
          [-70.43262538185019, -12.902677232489285],
          [-70.44086512794394, -12.87121776884891],
          [-70.49030360450644, -12.888621364825465],
          [-70.52188929786581, -12.928109651333594]],
         [[-70.21852265003048, -12.668980195515642],
          [-70.18281708362423, -12.657591164442685]],
         [[-70.21508942249142, -12.705153740219632],
          [-70.29062042835079, -12.705153740219632]],
         [[-70.20547638538204, -12.726587486402927],
          [-70.17320404651485, -12.709842526777647]],
         [[-70.46539607601039, -12.665011381633402],
          [-70.49148860530727, -12.611410678398276]],
         [[-70.47775569515102, -12.699845800192861],
          [-70.55191340999477, -12.67439034768505]],
         [[-70.13263500021338, -12.225666526617635],
          [-70.11890209005713, -12.104845852976393],
          [-70.06946361349463, -12.07127483118252],
          [-69.98019969747901, -12.025611492080957]],
         [[-70.22254902846225, -12.293185471791839],
          [-70.12916523939975, -12.371669189096918]],
         [[-69.97535664564975, -12.137490471590098],
          [-69.8297877979935, -12.181792328685981]],
         [[-69.81475901798831, -12.057644753857334],
          [-69.89578318791018, -11.978396465602708]],
         [[-69.82368540958987, -12.066374068680096],
          [-69.68978953556643, -12.006606157339183]]]);
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-04-01', '2017-12-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var collection18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-04-01', '2018-12-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var composite = collection.median()
var composite18 = collection18.median()
var images_c0 ={
  0: predicted_2017_c0,
  1: predicted_2018_c0,
  2: predicted_2019_c0,
  3: predicted_2020_c0,
  4: predicted_2021_c0
};
var images_c1 ={
  0: predicted_2017_c1,
  1: predicted_2018_c1,
  2: predicted_2019_c1,
  3: predicted_2020_c1,
  4: predicted_2021_c1
};
var images_names_c0 ={
  0: "2017_C0",
  1: "2018_C0",
  2: "2019_C0",
  3: "2020_C0",
  4: "2021_C0"
};
var images_names_c1 ={
  0: "2017_C1",
  1: "2018_C1",
  2: "2019_C1",
  3: "2020_C1",
  4: "2021_C1"
};
var map1=ui.Map()
map1.setOptions({
  mapTypeId:'SATELLITE'});
var map2=ui.Map()
map2.setOptions({
  mapTypeId:'SATELLITE'});
map1.addLayer(images_c0[0],vis,'2017');
map2.addLayer(images_c1[0],vis,'2017');
var updateMap = function(value){
    map1.layers().set(0, ui.Map.Layer(images_c0[value],vis,images_names_c0[value]));
    map2.layers().set(0, ui.Map.Layer(images_c1[value],vis,images_names_c1[value]));
    map2.layers().set(1, ui.Map.Layer(protected_park,{},'parks'));
    map2.layers().set(2, ui.Map.Layer(nac_road,{},'nac'));
    map2.layers().set(3, ui.Map.Layer(village_new,{},'vill'));
    map2.layers().set(3, ui.Map.Layer(dep_road,{},'dep'));
};
var slider = ui.Slider({
  min:0,
  max:4,
  value:0,
  step:1,
  onChange: updateMap,
  direction: 'horizontal',
  style:{position:'top-left',width: '200px'}
});
var maps = [map1,map2]
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0]], null, {stretch: 'both'}),
      ui.Panel([maps[1]], null, {stretch: 'both'}),
      // ui.Panel([maps[6], maps[7], maps[8]], null, {stretch: 'both'}),
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// /*
// * Add a title and initialize
// */
// Create a title.
var title = ui.Label('Comparación de escenarios', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
var linker = ui.Map.Linker([map1, map2]);
ui.root.widgets().reset([title, mapGrid]);
// ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
map1.add(slider)
map1.setCenter(-70.5168, -13.0038, 12)