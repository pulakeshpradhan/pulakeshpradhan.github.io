var gsw = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    l82 = ee.ImageCollection("LANDSAT/LC08/C01/T1"),
    lstVisParam = {"opacity":1,"bands":["LST"],"min":21,"max":34,"palette":["0509ff","fdff00","ff0000"]},
    s2Vis = {"min":-0.2,"max":0.5,"palette":["ffffff","2a00ff"]},
    water_body = /* color: #1702d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[49.32872323073127, 37.485672225100416],
                  [49.32906655348518, 37.4810407968905],
                  [49.33524636305549, 37.4818581286126],
                  [49.33215645827033, 37.48648950615838]]]),
            {
              "lulc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.3414261726258, 37.47749892278323],
                  [49.3469193366883, 37.47368440907747],
                  [49.34588936842658, 37.478316293246976]]]),
            {
              "lulc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.35687569655158, 37.470142186308614],
                  [49.36168221510627, 37.465782297074135],
                  [49.36168221510627, 37.46986970068101]]]),
            {
              "lulc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.30709389723518, 37.49221022321364],
                  [49.30984047926643, 37.489758540980056],
                  [49.31258706129768, 37.49030336620854],
                  [49.30778054274299, 37.49520661443697]]]),
            {
              "lulc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.36236886061408, 37.46251221328229],
                  [49.363055506121896, 37.45924198646739],
                  [49.36786202467658, 37.45706175580238],
                  [49.36820534743049, 37.460059556579296]]]),
            {
              "lulc": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.37541512526252, 37.45569907935879],
                  [49.37541512526252, 37.45242855459324],
                  [49.38193825758674, 37.45215600440742],
                  [49.379534998309396, 37.45542654109058]]]),
            {
              "lulc": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.3688919929383, 37.46796227347589],
                  [49.372325220477364, 37.46496478953483],
                  [49.37472847975471, 37.46441977954243],
                  [49.37266854323127, 37.46850725764374]]]),
            {
              "lulc": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.32940987623908, 37.47450182126158],
                  [49.33215645827033, 37.47150459954731],
                  [49.3359330085633, 37.47150459954731],
                  [49.33249978102424, 37.47504675775103]]]),
            {
              "lulc": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.44925144723652, 37.426173164822956],
                  [49.45002392343281, 37.424605437759105],
                  [49.45045307687519, 37.42624132612454]]]),
            {
              "lulc": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.45191219857929, 37.431012463028196],
                  [49.45131138375996, 37.429581153885096],
                  [49.452856336152536, 37.42889956848386],
                  [49.453113828217965, 37.431080619923804]]]),
            {
              "lulc": 0,
              "system:index": "9"
            })]),
    veg = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[49.431947331381025, 37.42859290815156],
                  [49.43233356947917, 37.42811579272391],
                  [49.43302021498698, 37.42838843048347],
                  [49.43276272292155, 37.42924041708256]]]),
            {
              "lulc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.40101701955223, 37.43524360495568],
                  [49.401574919027325, 37.43476653191747],
                  [49.40196115712547, 37.43527768148487]]]),
            {
              "lulc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.39500887135887, 37.437151866698805],
                  [49.395824262899396, 37.436947412410746],
                  [49.396081754964825, 37.43745854708361]]]),
            {
              "lulc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.39129191355869, 37.43860845487225],
                  [49.391103575033185, 37.43803782882602],
                  [49.391833135885236, 37.437799301592776],
                  [49.39174730519676, 37.43844673088569]]]),
            {
              "lulc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.373347564504456, 37.446119985034535],
                  [49.37381963329108, 37.44564298133285],
                  [49.37407712535651, 37.44625627124785]]]),
            {
              "lulc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.36439203675184, 37.44948205668647],
                  [49.36512159760389, 37.44914135537887],
                  [49.365464920357795, 37.44968647672621]]]),
            {
              "lulc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.35700965580702, 37.45278336140523],
                  [49.35676327095291, 37.45222961669314],
                  [49.357149509051055, 37.452025203603235],
                  [49.35749283180496, 37.45250216661074]]]),
            {
              "lulc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.35422015843153, 37.45257894982864],
                  [49.354863888595105, 37.45199978066122],
                  [49.355335957381726, 37.4520338495599],
                  [49.35525012669325, 37.45274929284793]]]),
            {
              "lulc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.34504772478806, 37.45699013805334],
                  [49.34556270891892, 37.45637693613908],
                  [49.345948947017064, 37.45722860410661]]]),
            {
              "lulc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.33951164538132, 37.45981761516856],
                  [49.340412867610326, 37.45937476436806],
                  [49.34088493639695, 37.45981761516856]]]),
            {
              "lulc": 1,
              "system:index": "9"
            })]),
    urban = /* color: #8b773b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[49.42997778012864, 37.481218480126806],
                  [49.430063610817115, 37.48043519736627],
                  [49.431308155800025, 37.48026491741877],
                  [49.431522732521216, 37.48125253571273]]]),
            {
              "lulc": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.43780735354517, 37.48016443405055],
                  [49.43746403079126, 37.47968764749202],
                  [49.438622745085695, 37.47921085789126],
                  [49.438880237151125, 37.479994153486025]]]),
            {
              "lulc": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.445926957362985, 37.479107929658824],
                  [49.44614153408418, 37.47842679544229],
                  [49.4475148250998, 37.478528965970575],
                  [49.44764357113252, 37.479210099255816]]]),
            {
              "lulc": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.440628327486365, 37.474866828136406],
                  [49.441143311617225, 37.4739813021915],
                  [49.441915787813514, 37.473776948560364],
                  [49.44170121109232, 37.47459435973239]]]),
            {
              "lulc": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.42631041275513, 37.48106880107482],
                  [49.4260529206897, 37.480047124232534],
                  [49.426653735509035, 37.4801492925454],
                  [49.427426211705324, 37.48076229948891]]]),
            {
              "lulc": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.41527685208894, 37.4847036005533],
                  [49.41600641294099, 37.4842268429593],
                  [49.41639265103913, 37.4847036005533],
                  [49.41570600553132, 37.48511224749809]]]),
            {
              "lulc": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.39331212852983, 37.49081038667492],
                  [49.39302453680159, 37.49036514580307],
                  [49.39405450506331, 37.489922475973756],
                  [49.39508447332503, 37.49002463078259],
                  [49.39409742040755, 37.490569454070226]]]),
            {
              "lulc": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.42788760822248, 37.47283460778234],
                  [49.42831676166486, 37.47242589369084],
                  [49.42883174579572, 37.47245995328383],
                  [49.42831676166486, 37.47300490466085]]]),
            {
              "lulc": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.45131563386212, 37.47818326397423],
                  [49.4523026867796, 37.477434006723456],
                  [49.4528605862547, 37.47794486475475]]]),
            {
              "lulc": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[49.44698118409406, 37.480158542534944],
                  [49.447753660290346, 37.47988609342395],
                  [49.44805406770001, 37.48036287871626]]]),
            {
              "lulc": 3,
              "system:index": "9"
            })]),
    wetland = /* color: #d60000 */ee.Geometry.Polygon(
        [[[49.45465415230126, 37.47905247146535],
          [49.39388602485985, 37.491856648658064],
          [49.32247489204735, 37.515007565670565],
          [49.26908820381493, 37.53556500657014],
          [49.21629960148289, 37.4963491090028],
          [49.232092448162575, 37.485452731378665],
          [49.317236491131325, 37.43585414635048],
          [49.39894730656101, 37.404224697986876],
          [49.45937211124851, 37.390041643535746],
          [49.509497233318825, 37.47237498012032]]]),
    point = /* color: #00ffff */ee.Geometry.Point([49.341477182591916, 37.476386533101646]);
Map.setCenter(49.36425713576057, 37.46346600249587, 12);
var newfc = water_body.merge(veg).merge(urban);
///////////////////////////////////////////////////////////////
// Legend
//////////////////////////////////////////////////////////////
var toolPanel = ui.Panel([], 'flow',{ 
  width: '400px'
});
ui.root.widgets().add(toolPanel);
// Shared visualization parameters.
var vis = {
  min: 0,
  max: 1,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
var ndwi_vis = {
  max: 0.07290817727814236,
  min: -0.5857357251084095,
  palette: ["ffffff","2a00ff"]
};
var dataset = ee.Image('USGS/SRTMGL1_003');
var elevation = dataset.select('elevation').clip(wetland);
var elevationVis = {
  min: -30.0,
  max: -25.0,
  palette: ['0905ff','ffefc4','ff0000'],
};
Map.addLayer(elevation, elevationVis, 'elevation');
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
/**
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// Returns an array of dates between the two dates
var getDates = function(startDate, endDate, interval) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, interval);
  }
  return dates;
};
var objSize = function(Myobj) {
    var osize = 0, key;
    for (key in Myobj) {
        if (Myobj.hasOwnProperty(key)) osize++;
    }
    return osize;
};
function wekaKMeans(img, date, n_cluster){
  // Make the training dataset.
  var training = img.sample({
    region: wetland,
    scale: 100,
    numPixels: 5000
  });
  // Instantiate the clusterer and train it.
  var clusterer = ee.Clusterer.wekaKMeans(n_cluster).train(training);
  // // Cluster the input using the trained clusterer.
  // return img.cluster(clusterer);
  // Cluster the input using the trained clusterer.
  var result = img.cluster(clusterer);
  // Display the clusters with random colors.
  Map.addLayer(result.randomVisualizer(), {}, date, false);
}
function RF(img, date) {
  var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11', 'nd', 'mnw'];
  // Get the values for all pixels in each polygon in the training.
  var training = img.sampleRegions({
    // Get the sample from the polygons FeatureCollection.
    collection: newfc,
    // Keep this list of properties from the polygons.
    properties: ['lulc'],
    // Set the scale to get Landsat pixels in the polygons.
    scale: 30
  });
  // Make a Random Forest classifier and train it.
  var classifier = ee.Classifier.randomForest(10)
      .train(training, 'lulc', bands);
  // Classify the input imagery.
  var classified = img.classify(classifier);
  // Define a palette for the IGBP classification.
  var igbpPalette = [
    '111149', // wetlands
    '209819', // vegetation
    'FF0202', // urban
  ];
  // Display the clusters with random colors.
  Map.addLayer(classified, {palette: igbpPalette, min: 0, max: 2}, date.slice(0, 15) + ' پوشش اراضی ', false);
}
function getImageCollection(sensor, productURL ,startDate, endDate, timeInterval, roi) {
  var dateList = [];
  // Usage
  var dates = getDates(new Date(startDate), new Date(endDate), timeInterval);                                                                                                           
  dates.forEach(function(date) {
    dateList.push(date);
  });
  print(dateList);
  var elevation = ee.Image('CGIAR/SRTM90_V4').clip(roi);
  var collection;
  var img;
  var ndvi;
  var ndwi;
  var savi;
  var featuresList = [];
  for (var i in dateList) {
    var int_I = parseInt(i);
    var int_II = int_I+=1;
    if (int_I < objSize(dateList)) {
      var date = dateList[i].toLocaleDateString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' }).split('/').reverse().join('-');
      if (sensor === 'L8') {
        collection = ee.ImageCollection(productURL)
                          .filterDate(dateList[i], dateList[int_II.toString()])
                          .filterBounds(point)
                          .map(maskL8sr)
                          .mean();
        img = collection.clip(roi);
        ndvi = img.expression(
          '((NIR - RED) / (NIR + RED))', {
            'NIR': img.select('B5'),
            'RED': img.select('B4'),
        }).rename('nd');
        img = img.addBands(ndvi);
        Map.addLayer(ndvi.mask(ndvi.gt(0.2)), vis,'(' + i + ') پوشش گیاهی  ' + date.toString(), false);
        // savi = img.expression(
        // '(1 + L) * float(nir - red)/ (nir + red + L)',
        // {
        //   'nir': img.select('B4'),
        //   'red': img.select('B3'),
        //   'L': 0.2
        // }).rename('sv');
        // // img = img.addBands(savi);
        // Map.addLayer(savi, vis, '(' + i + ') L8-SAVI ' + date.toString(), false);
        var mndwi = img.expression(
            ' ((Green - SWIR) / (Green + SWIR))', {
              'Green': img.select('B3'),
              'SWIR': img.select('B6'),
        }).rename('mnw');
        img = img.addBands(mndwi);
        Map.addLayer(mndwi.mask(mndwi.gt(0.0)), ndwi_vis, '(' + i + ') پهنه آبی ' + date.toString(), false);
        featuresList.push(RF(img, dateList[i].toString(), 6));
      } else if (sensor === 'S2') {
        collection = ee.ImageCollection(productURL)
          // Filter to get only one year of images.
          .filterDate(dateList[i], dateList[int_II.toString()])
          // Filter to get only images under the region of interest.
          .filterBounds(roi)
          // Pre-filter to get less cloudy granules.
          // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', CPP))
          // .map(maskS2clouds)
          .mean();
        print(collection);
        img = collection.clip(roi);
        ndvi = img.expression(
          '((NIR - RED) / (NIR + RED))', {
            'NIR': img.select('B8'),
            'RED': img.select('B4'),
        }).rename('nd');
        // img = img.addBands(ndvi);
        Map.addLayer(ndvi, vis, '(' + i + ') S2-NDVI ' + date.toString(), false);
        // Default rendering is Normalized Difference Water Index (NDWI) computed as Green(Band03)-NIR(Band08)/ Green(Band03)+NIR(Band08)
        mndwi = img.expression(
            ' ((Green - SWIR) / (Green + SWIR))', {
              'Green': img.select('B3'),
              'SWIR': img.select('B12'),
        }).rename('nw');
        // img = img.addBands(ndwi);
        Map.addLayer(mndwi.mask(mndwi.lt(0.0)), s2Vis, '(' + i + ') S2-MNDWI ' + date.toString(), false);
        // featuresList.push(RF_classification(img));
      }
    }
  }
  return featuresList;
}
// -----------------------------------------------------------------
var startDate_l8 = '2013-01-01';
var endDate_l8 = '2019-02-28';
var timeInterval_l8 = 180; //days
var productURL_l8 = 'LANDSAT/LC08/C01/T1_SR';
var sensor_l8 = 'L8';
var landsat8 = getImageCollection(sensor_l8, productURL_l8, startDate_l8, endDate_l8, timeInterval_l8, wetland);
///////////////////////////////////////////////////////////
// LST L8 2013-2018
//////////////////////////////////////////////////////////
var geet = require('users/elacerda/geet:geet');
var image = ee.Image(
  l82.filterBounds(point)
    .filterDate('2013-04-01', '2013-06-30')
    .sort('CLOUD_COVER')
    .first()
);
var image1 = ee.Image(
  l82.filterBounds(point)
    .filterDate('2018-04-01', '2018-06-30')
    .sort('CLOUD_COVER')
    .first()
);
var new_toa_radiance = geet.toa_radiance(image, 10);
var brightness_temp_img = geet.brightness_temp_l8c(new_toa_radiance, true);
var l8_ndvi = geet.ndvi_l8(brightness_temp_img); 
var img_pv = geet.prop_veg(l8_ndvi);
var lse = geet.surface_emissivity(img_pv);
var surfTemp_img = geet.surface_temperature_oli(lse);
var im = surfTemp_img.select("LST");
Map.addLayer(im.clip(wetland), lstVisParam, ' دماس سطح زمین -2013', false);
var new_toa_radiance1 = geet.toa_radiance(image1, 10);
var brightness_temp_img1 = geet.brightness_temp_l8c(new_toa_radiance1, true);
var l8_ndvi1 = geet.ndvi_l8(brightness_temp_img1); 
var img_pv1 = geet.prop_veg(l8_ndvi1);
var lse1 = geet.surface_emissivity(img_pv1);
var surfTemp_img1 = geet.surface_temperature_oli(lse1);
var im1 = surfTemp_img1.select("LST");
Map.addLayer(im1.clip(wetland), lstVisParam, ' دمای سطح زمین -2018', false);
//////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var occurrence = gsw.select('occurrence').clip(wetland);
var change = gsw.select("change_abs").clip(wetland);
var transition = gsw.select('transition').clip(wetland);
//////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////
var VIS_OCCURRENCE = {
    min: 0,
    max: 100,
    palette: ['red', 'blue']
};
var VIS_CHANGE = {
    min: -50,
    max: 50,
    palette: ['red', 'black', 'limegreen']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
//////////////////////////////////////////////////////////////
// Helper functions
//////////////////////////////////////////////////////////////
// Create a feature for a transition class that includes the area covered.
function createFeature(transition_class_stats) {
  transition_class_stats = ee.Dictionary(transition_class_stats);
  var class_number = transition_class_stats.get('transition_class_value');
  var result = {
      transition_class_number: class_number,
      transition_class_name: lookup_names.get(class_number),
      transition_class_palette: lookup_palette.get(class_number),
      area_m2: transition_class_stats.get('sum')
  };
  return ee.Feature(null, result);   // Creates a feature without a geometry.
}
// Create a JSON dictionary that defines piechart colors based on the
// transition class palette.
// https://developers.google.com/chart/interactive/docs/gallery/piechart
function createPieChartSliceDictionary(fc) {
  return ee.List(fc.aggregate_array("transition_class_palette"))
    .map(function(p) { return {'color': p}; }).getInfo();
}
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a dictionary for looking up names of transition classes.
var lookup_names = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(ee.String),
    gsw.get('transition_class_names')
);
// Create a dictionary for looking up colors of transition classes.
var lookup_palette = ee.Dictionary.fromLists(
    ee.List(gsw.get('transition_class_values')).map(ee.String),
    gsw.get('transition_class_palette')
);
// Create a water mask layer, and set the image mask so that non-water areas
// are transparent.
var water_mask = occurrence.gt(90).mask(1);
// Generate a histogram object and print it to the console tab.
var histogram = ui.Chart.image.histogram({
  image: change,
  region: wetland,
  scale: 30,
  minBucketWidth: 10
});
histogram.setOptions({
  title: 'Histogram of surface water change intensity.'
});
// print(histogram);
toolPanel.add(histogram);
// Summarize transition classes in a region of interest.
var area_image_with_transition_class = ee.Image.pixelArea().addBands(transition);
var reduction_results = area_image_with_transition_class.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'transition_class_value',
  }),
  geometry: wetland,
  scale: 30,
  bestEffort: true,
});
// print('reduction_results', reduction_results);
var roi_stats = ee.List(reduction_results.get('groups'));
var transition_fc = ee.FeatureCollection(roi_stats.map(createFeature));
// print('transition_fc', transition_fc);
// Add a summary chart.
var transition_summary_chart = ui.Chart.feature.byFeature({
    features: transition_fc,
    xProperty: 'transition_class_name',
    yProperties: ['area_m2', 'transition_class_number']
  })
  .setChartType('PieChart')
  .setOptions({
    title: 'Summary of transition class areas',
    slices: createPieChartSliceDictionary(transition_fc),
    sliceVisibilityThreshold: 0  // Don't group small slices.
  });
// print(transition_summary_chart);
toolPanel.add(transition_summary_chart);
//////////////////////////////////////////////////////////////
// Map Layers
//////////////////////////////////////////////////////////////
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE,
  shown: false
});
Map.addLayer({
  eeObject: change,
  visParams: VIS_CHANGE,
  name: 'occurrence change intensity',
  shown: false
});
Map.addLayer({
  eeObject: transition,
  name: 'Transition classes (1984-2015)',
});
///////////////////////////////////////////////////////
// Time Series Analysis
///////////////////////////////////////////////////////
// Filter collection to dates of interest.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
    .filterDate('2013-06-01', '2018-12-31')
    .filterBounds(wetland);
// Create two collections to sample from, one for each plot.
var ndvi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
});
var ndwi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B3', 'B5']));
});
var mndwi = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B3', 'B6']));
});
// Percipitation Over Time
var trmm = ee.ImageCollection('TRMM/3B43V7')
    .filterBounds(wetland)
    .filterDate('2000-01-01','2019-03-01')
    .select('precipitation');
// Create an Percipitation chart.
var trmmChart = ui.Chart.image.series(trmm, wetland, ee.Reducer.mean(), 25000);
trmmChart.setOptions({
  title: 'TRMM Percipitation Over Time (2000-2019)',
  vAxis: {title: 'percipitation mm/h'},
  hAxis: {title: 'date', format: 'yy-MM', gridlines: {count: 30}},
});
toolPanel.add(trmmChart);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
toolPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(0, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time (2013-2018)',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'yy-MM', gridlines: {count: 7}},
  });
  toolPanel.widgets().set(3, ndviChart);
  // Create an NDWI chart.
  var ndwiChart = ui.Chart.image.series(ndwi, point, ee.Reducer.mean(), 500);
  ndwiChart.setOptions({
    title: 'NDWI Over Time (2013-2018)',
    vAxis: {title: 'NDWI'},
    hAxis: {title: 'date', format: 'yy-MM', gridlines: {count: 7}},
  });
  toolPanel.widgets().set(4, ndwiChart);
  // Create an MNDWI chart.
  var mndwiChart = ui.Chart.image.series(mndwi, point, ee.Reducer.mean(), 500);
  mndwiChart.setOptions({
    title: 'MNDWI Over Time (2013-2018)',
    vAxis: {title: 'MNDWI'},
    hAxis: {title: 'date', format: 'yy-MM', gridlines: {count: 7}},
  });
  toolPanel.widgets().set(5, mndwiChart);
});
Map.style().set('cursor', 'crosshair');
////////////////////////////////////////////////////////////
//Real Time Monitoring
////////////////////////////////////////////////////////////
// var startDate = '2019-02-01';
// var endDate = '2019-02-21';
// var timeInterval = 5; //days
// var productURL_s2 = 'COPERNICUS/S2';
// var sensor = 'S2';
// var s2 = getImageCollection(sensor, productURL_s2, startDate, endDate, timeInterval, wetland);
var s2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(point)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .filterDate('2019-01-11','2019-03-01');
var s2_mndwi = s2.map(function(img){
  var id = img.id();
  var index = img.normalizedDifference(['B3','B12']).rename('mnw');
  return index;
});
var colList = s2_mndwi.toList(20);
var n = colList.size().getInfo();
var mndwiVis = {
  "min":0.0,
  "max":1.0,
  "palette":["ffffff", "001bff"]
};
for (var i = 0; i < n; i++) {
      var img = ee.Image(colList.get(i))
          .select('mnw')
          .clip(wetland);
      var id = img.id().getInfo();
      Map.addLayer(img.mask(img.gt(0.7)), mndwiVis, 'پهنه آبی کوتاه مدت ' + id.slice(0,8), false);
      //calculate area-----------------------------
      var masked = img.mask(img.gt(0.7));
      var maskedArea = ee.Image.pixelArea().mask(masked);
      // print(maskedArea);
      var maskedarea_inta = maskedArea.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: wetland,
        scale: 20,
        maxPixels: 1e9,
      }).get('area');
      // print(maskedarea_inta);
      var month_area = Math.round(maskedarea_inta.getInfo() / 10000);
      // Create panels to hold lon/lat values.
      var area = ui.Label(
        'Area of water body for ' + 
        id.slice(0,8) + 
        ' => (' + 
        month_area + 
        ') Hectares');
      toolPanel.add(ui.Panel([area], ui.Panel.Layout.flow('horizontal')));
      // print(Math.round(maskedarea_inta.getInfo() / 10000));
}
/////////////////////////////////////////////////////////////////////
// Legend
////////////////////////////////////////////////////////////////////
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = [
  'Wetland',
  'Vegetation', 
  'Urban',
  'No change',
  'Permanent',
  'New permanent',
  'Lost permanent',
  'Seasonal',
  'New seasonal',
  'Lost seasonal',
  'Seasonal to permanent',
  'Permanent to seasonal',
  'Ephemeral permanent',
  'Ephemeral seasonal',
  'No Data'];
var palette = [
    '111149', // wetlands
    '205F12', // vegetation
    '820712', // urban
    'FFFFFF',
    '0000FF',
    '22B14C',
    'D1102D',
    '99ccff',
    'B5E61D',
    'E6A1AA',
    'FF7F27',
    'FFC90E',
    '7F7F7F',
    'c3c3c3',
    'F3EDC5'
  ];
loading.style().set('shown', false);
for (var i = 0; i < names.length; i++) {
  legend.add(makeRow(palette[i], names[i]));
}
Map.add(legend);