var point = /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[47.71606310829577, 31.259446320362528],
         [47.727508637950564, 31.685785409535256]]),
    wetland = /* color: #d63000 */ee.Geometry.Polygon(
        [[[47.415553222656285, 31.047623206701974],
          [47.964869628906285, 31.042916882936005],
          [47.953883300781285, 31.736910831003197],
          [47.393580566406285, 31.732238928692684]]]),
    gsw = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    l82 = ee.ImageCollection("LANDSAT/LC08/C01/T1"),
    lstVisParam = {"opacity":1,"bands":["LST"],"min":21,"max":34,"palette":["0509ff","fdff00","ff0000"]},
    s2Vis = {"min":-0.2,"max":0.5,"palette":["ffffff","2a00ff"]},
    water_body = /* color: #1702d6 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[47.61080546507492, 31.62164720605019],
                  [47.62144847044601, 31.618431308752978],
                  [47.624881697985074, 31.623693628284776],
                  [47.61698527464523, 31.62866332347526]]]),
            {
              "lulc": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.60923260961613, 31.572094512211695],
                  [47.61163586889347, 31.567414317647312],
                  [47.61541241918644, 31.568876903683574],
                  [47.612322514401285, 31.572972022539386]]]),
            {
              "lulc": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.625025456295816, 31.609235222031998],
                  [47.62639874731144, 31.604556892716403],
                  [47.63395184789738, 31.606603690716423],
                  [47.63360852514347, 31.61215905847962]]]),
            {
              "lulc": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.73738694265239, 31.324984791609705],
                  [47.73395371511333, 31.31031978203583],
                  [47.74699997976177, 31.31031978203583],
                  [47.746313334253955, 31.32439823507706]]]),
            {
              "lulc": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.71021632636359, 31.22564029771539],
                  [47.713649553902655, 31.21565783320357],
                  [47.72600917304328, 31.21565783320357],
                  [47.72257594550422, 31.233860359245828]]]),
            {
              "lulc": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.710902971871405, 31.183434535933472],
                  [47.71227626288703, 31.17403511189132],
                  [47.72600917304328, 31.17403511189132],
                  [47.72669581855109, 31.186371664584147]]]),
            {
              "lulc": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.73312544186115, 31.111579079871447],
                  [47.729692214322085, 31.100408697937645],
                  [47.75097822506427, 31.10217252981078],
                  [47.75097822506427, 31.11451843565485]]]),
            {
              "lulc": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.595742027154756, 31.598984987702906],
                  [47.59917525469382, 31.594891011801582],
                  [47.6036384504946, 31.59723044863623],
                  [47.59986190020163, 31.602786375626067]]]),
            {
              "lulc": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.76060552782337, 31.68990336274955],
                  [47.761978818839, 31.686105535250363],
                  [47.76644201463978, 31.687566256525557],
                  [47.76472540087025, 31.69180221822156]]]),
            {
              "lulc": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.76884527391712, 31.69117146594799],
                  [47.77193517870228, 31.690879334880222],
                  [47.77159185594837, 31.692924233042753]]]),
            {
              "lulc": 0,
              "system:index": "9"
            })]),
    veg = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[47.56926190783895, 31.525459609063176],
                  [47.56994855334676, 31.521069740467382],
                  [47.5775016539327, 31.521655068199493],
                  [47.57647168567098, 31.527215498736627]]]),
            {
              "lulc": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.833656239767606, 31.64992903634457],
                  [47.83674614455276, 31.646421845871302],
                  [47.84326927687698, 31.647298655894765],
                  [47.84155266310745, 31.65139032665423]]]),
            {
              "lulc": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.84617012907597, 31.68892280531095],
                  [47.8475434200916, 31.684832787588117],
                  [47.85269326140019, 31.684832787588117],
                  [47.851319970384566, 31.690091348699518]]]),
            {
              "lulc": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.83930367399785, 31.706449411107705],
                  [47.84067696501347, 31.70031547570283],
                  [47.845826806322066, 31.700899677502935],
                  [47.84548348356816, 31.7067414931519]]]),
            {
              "lulc": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.654763489345555, 31.648098747517853],
                  [47.653733521083836, 31.6437146524341],
                  [47.66334655819321, 31.644591487990347],
                  [47.663003235439305, 31.64926780462249]]]),
            {
              "lulc": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.79815039276809, 31.46731798192723],
                  [47.80227026581497, 31.462339687811326],
                  [47.80364355683059, 31.466732314005608]]]),
            {
              "lulc": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.836516994598014, 31.529402947756825],
                  [47.836516994598014, 31.526183866866916],
                  [47.84166683590661, 31.526769162553997],
                  [47.8413235131527, 31.53028085965226]]]),
            {
              "lulc": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.67637609747749, 31.377175814870252],
                  [47.67774938849311, 31.373804936006312],
                  [47.681697600163034, 31.37365837331233],
                  [47.67980932501655, 31.378787931574895]]]),
            {
              "lulc": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.70645391622861, 31.353918835899876],
                  [47.706625577605564, 31.350840320135877],
                  [47.709372159636814, 31.35157330922047],
                  [47.70954382101377, 31.354212022621347]]]),
            {
              "lulc": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.68234185507163, 31.605404997748057],
                  [47.68182687094077, 31.603796782403872],
                  [47.684401791595064, 31.603211969937725],
                  [47.68474511434897, 31.60577049736169]]]),
            {
              "lulc": 1,
              "system:index": "9"
            })]),
    soil = /* color: #8b773b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[47.91330112877438, 31.55737902480208],
                  [47.913644451528285, 31.5544534691683],
                  [47.91707767906735, 31.555184866677447],
                  [47.91707767906735, 31.557817850234393]]]),
            {
              "lulc": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.937333721547816, 31.585605921607645],
                  [47.937333721547816, 31.58209630646086],
                  [47.940080303579066, 31.581511357753133],
                  [47.94025196495602, 31.58502099492857]]]),
            {
              "lulc": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.84100101478316, 31.629719973828188],
                  [47.84168766029097, 31.62825834293061],
                  [47.844090919568316, 31.62825834293061],
                  [47.84203098304488, 31.63147390059122]]]),
            {
              "lulc": 3,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.574964357525914, 31.66700601622702],
                  [47.57633764854154, 31.664522226475935],
                  [47.58114416709623, 31.665983287313612],
                  [47.580457521588414, 31.66934364003094]]]),
            {
              "lulc": 3,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.516702027783026, 31.667626618670067],
                  [47.51962027119123, 31.664704525708938],
                  [47.52133688496076, 31.664996739141394],
                  [47.520993562206854, 31.66777272090519]]]),
            {
              "lulc": 3,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.50660268545175, 31.50377783550866],
                  [47.50866262197519, 31.50070423610594],
                  [47.51209584951425, 31.502167867471524],
                  [47.51123754262949, 31.505534132654958]]]),
            {
              "lulc": 3,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.445614614616716, 31.45947757032752],
                  [47.445614614616716, 31.45537747464549],
                  [47.452137746940934, 31.454791732038213],
                  [47.451107778679216, 31.458598993506566]]]),
            {
              "lulc": 3,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.475749059093005, 31.37498167677093],
                  [47.475749059093005, 31.372050416166037],
                  [47.47952560938597, 31.371317586727024],
                  [47.47986893213988, 31.37571447763398]]]),
            {
              "lulc": 3,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.83282766545199, 31.329209481166817],
                  [47.83282766545199, 31.325103692953185],
                  [47.83866415226839, 31.32539696947866],
                  [47.83866415226839, 31.329796007721285]]]),
            {
              "lulc": 3,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[47.91270431071575, 31.696934440341636],
                  [47.911674342454035, 31.695254778463223],
                  [47.91382010966595, 31.695108719471577],
                  [47.914163432419855, 31.69744563574745]]]),
            {
              "lulc": 3,
              "system:index": "9"
            })]);
Map.setCenter(48.061, 31.481, 9);
var newfc = water_body.merge(veg).merge(soil);
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
  min: -5.0,
  max: 22.0,
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
    'f7e084', // soil
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
        Map.addLayer(ndvi.mask(ndvi.gt(0.2)), vis,'(' + i + ') پهنه گیاهی ' + date.toString(), false);
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
        Map.addLayer(mndwi.mask(mndwi.gt(0.0)), ndwi_vis, '(' + i + ') پهنه آبی  ' + date.toString(), false);
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
Map.addLayer(im.clip(wetland), lstVisParam, ' دمای سطح زمین -2013', false);
var new_toa_radiance1 = geet.toa_radiance(image1, 10);
var brightness_temp_img1 = geet.brightness_temp_l8c(new_toa_radiance1, true);
var l8_ndvi1 = geet.ndvi_l8(brightness_temp_img1); 
var img_pv1 = geet.prop_veg(l8_ndvi1);
var lse1 = geet.surface_emissivity(img_pv1);
var surfTemp_img1 = geet.surface_temperature_oli(lse1);
var im1 = surfTemp_img1.select("LST");
Map.addLayer(im1.clip(wetland), lstVisParam, 'دمای سطح زمین -2018', false);
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
// for (var i = 0; i < n; i++) {
//       var img = ee.Image(colList.get(i)).clip(wetland);
//       var id = img.id().getInfo();
//       Map.addLayer(img.mask(img.gt(0.1)), mndwiVis, 'پهنه آبی کوتاه مدت ' + id.slice(0,8), false);
// }
var horalazim = ee.FeatureCollection("users/omidtorabi2/basin");
Map.addLayer(horalazim,null,'Horalazim Wetland');
for (var i = 0; i < n; i++) {
      var img = ee.Image(colList.get(i))
          .select('mnw')
          .clip(wetland);
      var id = img.id().getInfo();
      Map.addLayer(img.mask(img.gt(0.1)), mndwiVis, ' پهنه آبی کوتاه مدت ' + id.slice(0,8), false);
      //calculate area-----------------------------
      var masked = img.mask(img.gt(0.7));
      var maskedArea = ee.Image.pixelArea().mask(masked);
      // print(maskedArea);
      var maskedarea_inta = maskedArea.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: horalazim,
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
  value: 'راهنمای نقشه',
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
  'Bare Soil',
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
    '6A6005', // soil
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
// lookup_names lookup_palette
Map.add(legend);