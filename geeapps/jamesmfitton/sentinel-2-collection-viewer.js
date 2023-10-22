//sea level pressure filter throws an error on large collections - currently disabled - look into this
//extract water from each image then sort images by % of water - low to high tide estimate
//if the ammount of water stays the same then can assume no tide i.e. MHWS = MLWS
//add buffer aroud the aoi when doing the cloudcover estimate to avoid shadows causing a problem
//add east and west culbin aoi
////Areas of Interest////
var aoi
var areaAoi 
var aoiAberdeen = /* color: #999900 */ee.Geometry.Polygon(
        [[[-2.1548967714993523, 57.06957606819615],
          [-2.0587664004056023, 57.05762936568939],
          [-1.9928484316556023, 57.145645944593404],
          [-1.9228105898587273, 57.31067056034264],
          [-1.9379167910306023, 57.327725518085096],
          [-2.0052080507962273, 57.33143207050069],
          [-2.0779924746243523, 57.27430969035585],
          [-2.1645098086087273, 57.18886599963027],
          [-2.1686296816556023, 57.10244400825098]]]);
var aoiMontrose = /* color: #999900 */ee.Geometry.Polygon(
        [[[-2.4570207949368523, 56.76072128223395],
          [-2.5504045839993523, 56.71778994135329],
          [-2.5339066043833327, 56.691405853619415],
          [-2.4735002871243523, 56.68159918207955],
          [-2.4213152285306023, 56.67330056441094],
          [-2.4089556093899773, 56.74189778478981],
          [-2.3553972597806023, 56.769753210781204],
          [-2.3869829531399773, 56.79232352718035]]]);
var aoiSkaraBrae = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-3.344326385039494, 59.06025832788582],
          [-3.3512786708060958, 59.05972877973011],
          [-3.35617102004926, 59.05659545273892],
          [-3.356298808687825, 59.05025692094983],
          [-3.353552226656575, 59.048756076401716],
          [-3.3481448932825515, 59.047343456939345],
          [-3.3394759937464187, 59.046857855586566],
          [-3.3326095386682937, 59.047652472409126],
          [-3.326258067721028, 59.05052176906478],
          [-3.3261722370325515, 59.05577416824442],
          [-3.3273738666712234, 59.05899583085586],
          [-3.33569944345345, 59.06040797126237]]]);
var aoiCulbin = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-3.6400834278115326, 57.65466159608364],
          [-3.6400834278115326, 57.66916980151336],
          [-3.69432842292872, 57.66347739998588],
          [-3.7581864551552826, 57.64804833719441],
          [-3.786338920975595, 57.63739110712972],
          [-3.838523979569345, 57.62011239940939],
          [-3.8680497364052826, 57.600801994684296],
          [-3.8611832813271576, 57.58810671332669],
          [-3.84813701667872, 57.58700256637815],
          [-3.7650529102334076, 57.61827375524125],
          [-3.718704338456064, 57.63279650848723],
          [-3.670639152909189, 57.64565991973646]]]);
var aoiMorrichMore = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-3.968184502292388, 57.86108100893361],
          [-3.996680290866607, 57.84884213350245],
          [-4.033415825534576, 57.83056741554857],
          [-4.037535698581451, 57.8166724291893],
          [-4.017279656100982, 57.807162247017644],
          [-3.971961052585357, 57.802772086289046],
          [-3.926985771823638, 57.804052605025014],
          [-3.8947134329564506, 57.809357127033735],
          [-3.870680840183013, 57.81758673762489],
          [-3.8655309988744193, 57.82947063766181],
          [-3.897803337741607, 57.84317796236635],
          [-3.9400320364720756, 57.859254575234985]]]);
var aoiStAndrews = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-2.854768607179608, 56.378687940606206],
          [-2.8491037817401548, 56.367375414708484],
          [-2.849618765871014, 56.35824689578927],
          [-2.8446405859393735, 56.352635575600466],
          [-2.8408640356464048, 56.3478795730733],
          [-2.8278177709979673, 56.34407434401921],
          [-2.808248374025311, 56.34093474427746],
          [-2.7967470617694516, 56.34169588309248],
          [-2.78773485867805, 56.344811113203725],
          [-2.7873054417910907, 56.3507800231115],
          [-2.789193961183514, 56.359863563622966],
          [-2.790995119412173, 56.37293672865855],
          [-2.8113382788104673, 56.386576201830266]]]);
var aoiTongue = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-4.40918934380079, 58.525275224897655],
          [-4.434251904835946, 58.51577334396058],
          [-4.456224561085946, 58.50483403103418],
          [-4.455537915578134, 58.49209709371497],
          [-4.450044751515634, 58.488867276834405],
          [-4.411592603078134, 58.487611156727574],
          [-4.400606274953134, 58.495685430818845],
          [-4.379320264210946, 58.507883034727506],
          [-4.375543713917978, 58.51469749715899],
          [-4.387560010304696, 58.52061424638984]]]);
var aoiCrossapol = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-6.849625806121139, 56.49480852950426],
          [-6.865418652800827, 56.49452425074086],
          [-6.880267361907272, 56.49035458409367],
          [-6.881211499480514, 56.48670574979782],
          [-6.877692441252975, 56.48409922472998],
          [-6.845420102385788, 56.49082843293114]]]);     
var aoiDornoch = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-4.007288421742942, 57.85283427343],
          [-3.9775910035300512, 57.85630503711492],
          [-3.9526009678723995, 57.87096783251033],
          [-3.96032572983529, 57.87845318512203],
          [-4.002897751319665, 57.88164767847896],
          [-4.023325455177087, 57.881738945549024],
          [-4.039289963233728, 57.87836190971446],
          [-4.056112778175134, 57.87078524347804],
          [-4.0618634343030635, 57.862034331726626],
          [-4.057228577125329, 57.85390620564371],
          [-4.015858185279626, 57.852718797660955]]]);          
/////////GLOBAL VARIABLES/////
//tracks how many times the function to get the collection has run
var getCollectionIteration = 0
var getCollectionAttempts = 0
//centers map on 
Map.setCenter(-3.5, 56.5, 6)
Map.setControlVisibility({fullscreenControl: false})
//maximum number of images to get
var numberImages = 10
//clip the image option
var clipImageOption = 1
//sets the variables for the image colleciton info so they are 
//accessible to other functions without running them repeatedly
var collection
var collectionInfo 
var collectionList
var collectionListLength
//index position for layer order
var index = 0
//area of interest drawing
var aoiSelect = null
var tools = Map.drawingTools();
tools.setLinked(false);
tools.setShape('polygon');
var aoiGeometry = ui.Map.GeometryLayer({color: '#01665e'});
tools.layers().add(aoiGeometry);
// tools.setShown(false);
var oldAoi;
var aoiDrawn = null
//sentinel 2 visualisation
var rgb_vis = {
    min: 0,
    max: 2000,
    gamma: 1.5,
    bands: ['B4', 'B3', 'B2']
    };
//Acceptable level of cloud cover
var cloudCover = 40;
var aoiCloudCover = 99;
//weather
var pressureHours = 24;
var pressureLimit = 995;
//sea level pressure collection
var seaLevelPressureCollection = ee.ImageCollection('NCEP_RE/sea_level_pressure');
//Start and end date of the analysis
var startDate = '2015-6-23';
var endDate = ee.Date(Date.now()).format('YYYY-MM-dd');
/////////FUNCTIONS/////
//gets the date and time from the sentinel image
//https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-with-two-numbers
var getDateTime = function(image) {
    var dateHour = ee.Date(image.get('system:time_start')).format('dd/MM/YYYY H:');
    var minute = ee.String(ee.Date(image.get('system:time_start')).get('minute'));
    var minCorrected = ee.String('0').cat(minute).slice(-2);
    var dateTime = dateHour.cat(minCorrected);
    return dateTime.getInfo();
};
var getDate = function(image) {
    var date = ee.Date(image.get('system:time_start')).format('dd/MM/YYYY');
    return date.getInfo();
};
//clips the image to the area of interest geometry if desired
var clipFeature = function(image) {
    if (clipImageOption === 1){
    var clippedImage = image.clip(aoi);
    return clippedImage;
    } else {
      return image
    }
};
//if layers have already been added to the map, this removes them
var clearMap = function() {
    var layers = Map.layers();
    var layersLength = layers.length();
    if(layersLength > 0) {
        imageCyclePanel.clear()
        Map.remove(imageCyclePanel)
        var i
        for (i = 0; i < layersLength; i++) { 
            Map.remove(layers.get(0));
        }
    }
};
//assign date and time to image
var setImageDate = function(image) {
    var date = ee.Date(image.get('system:time_start'));
    return image.set('date_time', date);
};
//calcultes the area of an image within the aoi
//https://gis.stackexchange.com/questions/270942/how-to-calculate-the-number-of-pixels-in-a-polygon/270962
var getImageArea = function(image){
    var imageB2 = image.select(['B2'])
    var pixelCount = imageB2.reduceRegion({
        reducer: ee.Reducer.count(),
        geometry: aoi
    });
    var imagePixelsArea10m = ee.Number(pixelCount.get('B2')).multiply(100); //100m2 as its 10x10 cell
    return imagePixelsArea10m;
};
//assign image area proportion of Aoi
var setImageAreaProportion = function(image) {
    var areaImage = getImageArea(image)
    var areaProportion = areaImage.divide(areaAoi).multiply(100)
    return image.set('imageAoiArea', areaProportion);
};
var cloudyAoiPercentage = function(image){
  var pixelCountAoi = image.reduceRegion({
        reducer: ee.Reducer.count(),
        geometry: aoi.buffer(2000)
  });
  var imagePixelsArea10mAoi = ee.Number(pixelCountAoi.get('B2')).multiply(100); //100m2 as its 10x10 cell
  var qa = image.select('QA60')
  var qab4 = image.select("B4");
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0)).and(
             qab4.lt(2500))
  // Return the masked and scaled data, without the QA bands.
  var imageCloudMask = image.updateMask(mask)
  var pixelCount = imageCloudMask.reduceRegion({
        reducer: ee.Reducer.count(),
        geometry: aoi.buffer(2000)
    });
  var imagePixelsArea10m = ee.Number(pixelCount.get('B2')).multiply(100); //100m2 as its 10x10 cell
  var cloudFreePercentage = imagePixelsArea10m.divide(imagePixelsArea10mAoi).multiply(100)
  return image.set('imageCloudFreePerc', cloudFreePercentage);             
}
var setAveragePressure = function(image){
    var pressureHourImageCount = ee.Number(pressureHours).divide(6).ceil() //data every 6 hours
    var pressureHourDateAdvance = ee.Number(pressureHours).divide(24).ceil().multiply(-1)
    var pressureDateStart = ee.Date(image.get('system:time_start')).advance(pressureHourDateAdvance, 'day').format('YYYY-MM-dd');
    var pressureDateEnd = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');
    var seaLevelPressureCollectionFiltered = seaLevelPressureCollection
        .filter(ee.Filter.date(pressureDateStart, pressureDateEnd))
        .filterBounds(aoi)
        .limit(pressureHourImageCount,'system:time_start', false);
    var seaLevelPressureAverageImage = seaLevelPressureCollectionFiltered.mean()
    var seaLevelPressureAverage = seaLevelPressureAverageImage.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: aoi,
          scale: 144,
          maxPixels: 1e15 
    });
    var seaLevelPressureAverageAoi = ee.Number(seaLevelPressureAverage.get('slp')).multiply(0.01)
    return image.set('mean_slp', seaLevelPressureAverageAoi);
}
//gets the collection and adds the date and time 
var getCollection = function() {
    getCollectionIteration = getCollectionIteration + 1
    //if statement for which aoi to use
    if(aoiSelect !== null && aoiDrawn === null){
      aoi = aoiSelect
    } else if (aoiSelect === null && aoiDrawn !== null){
      aoi = aoiDrawn
      aoiGeometry.setShown(false) //hide the geometry when the function is run
    } else {
      print("Both an AoI is selected and drawn")
    }
    Map.centerObject(aoi);
    areaAoi = ee.Number(aoi.area())
    collection = ee.ImageCollection("COPERNICUS/S2")
        .filterMetadata('CLOUD_COVERAGE_ASSESSMENT', 'not_greater_than', cloudCover)
        .filterDate(startDate,endDate)
        .filterBounds(aoi)
        .map(cloudyAoiPercentage) //clouds within aoi filter
        .map(clipFeature)
        .filterMetadata('imageCloudFreePerc', 'greater_than', aoiCloudCover) //clouds within aoi filter
        .select(['QA60', 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12'])
        .map(setImageAreaProportion)
        .filterMetadata('imageAoiArea', 'greater_than', 90)
        .sort('system:time_start', false)
        .map(setImageDate)
        .distinct('date_time')
        // .map(setAveragePressure)
        // .filterMetadata('mean_slp', 'greater_than', pressureLimit )
        .limit(numberImages);
      print(collection)
    //get information about the collection
    var youngestImageDate = getDate(collection.first())
    var oldestImageDate = getDate(collection.sort('system:time_start').first())
    collectionInfo = collection.getInfo().features; //allows access to the images in the collection
    collectionList = collection.sort('system:time_start').toList(numberImages); //sorts the images into chronological date order and converts to a list
    collectionListLength = collectionList.length().getInfo() //length of the collection
    var oldestImageDateTime = getDateTime(ee.Image(collectionList.get(0)));
    index = 0;
    // print(collectionList)
    clearMap();  //if layers have already been added to the map, this removes them
    Map.add(imageCyclePanel);
    imageCyclePanel.add(collectionInfoTitle)
    var collectionLengthLabel = ui.Label({
            value: 'Number of Images: ' + collectionListLength,
            style: {
            stretch: 'horizontal'
            }});
    var collectionNoImagesLabel = ui.Label({
            value: 'No images found',
            style: {
            color: 'red',
            stretch: 'horizontal'
            }});
      var collectionOldestImage = ui.Label({
            value: 'From: ' + oldestImageDate,
            style: {
            stretch: 'horizontal'
      }});
      var collectionYoungestImage = ui.Label({
            value: 'To: ' + youngestImageDate,
            style: {
            stretch: 'horizontal'
      }});
      if(collectionListLength === 0){
        imageCyclePanel.add(collectionNoImagesLabel);
      } else{
        imageCyclePanel.add(collectionLengthLabel);
        imageCyclePanel.add(collectionOldestImage);
        imageCyclePanel.add(collectionYoungestImage);
        imageCyclePanel.add(cycleImageTitle);
        imageCyclePanel.add(imageShownLabel);
        imageShownLabel.setValue('1/' + collectionListLength +': ' + oldestImageDateTime + ' UTC');
      }
      loopCol();
};
//adds each of the images in a collection to the map, named with the date and time
var loopCol = function() {
    var i;
    for (i = 0; i < collectionListLength; i++) { 
        var collectionInfoSelect = collectionInfo[i];
        var collectionListSelect = ee.Image(collectionList.get(i));
        print(collectionInfoSelect);
        var date_time = getDateTime(collectionListSelect);
        Map.addLayer(collectionListSelect, rgb_vis, date_time);
        var date = getDate(collectionListSelect);
        // var imageCycleLabel = ui.Label({
        //     value: date,
        //     style: {
        //     margin: '8px 10px 5px 5px',
        //     fontSize: '14px',
        //     color: 'grey',
        //     stretch: 'vertical'
        //     }});
        // imageCyclePanel.add(imageCycleLabel);
    }
    // var firstImageLabel = imageCyclePanel.widgets().get(0);
    // firstImageLabel.style().set('fontWeight', 'bold');
    // firstImageLabel.style().set('color', 'green');
    // var lastImageLabel = imageCyclePanel.widgets().get(collectionListLength-1);
    // lastImageLabel.style().set('fontWeight', 'bold');
    // lastImageLabel.style().set('color', 'green');
    if (getCollectionIteration === 0){
        imageCyclePanel.add(cyclePanel);
        Map.add(extractWaterButton);
    } else {
        imageCyclePanel.remove(cyclePanel);
        imageCyclePanel.add(cyclePanel);
        Map.remove(extractWaterButton);
        Map.add(extractWaterButton);
    }
    imageOpacity();
};
//alters opacity of all images
var imageOpacity = function() {
    var layers = Map.layers();
    // var lastLayer = collectionListLength - 1; //youngest image
    layers.map(function(l) { 
        l.setOpacity(0);
    });
    layers.get(0).setOpacity(1); //oldest image
    // layers.get(lastLayer).setOpacity(1); //youngest image
    errorPanel.clear();
};
//cycles through the images (forward)
var cycleImagesForward = function(){
  // var imageLabel = imageCyclePanel.widgets().get(index);
  // imageLabel.style().set('fontWeight', 'normal');
  // imageLabel.style().set('color', 'grey');
  // if (index === 0){
  //     imageLabel = imageCyclePanel.widgets().get(collectionListLength - 1);
  //     imageLabel.style().set('fontWeight', 'normal');
  //     imageLabel.style().set('color', 'grey');
  // }
  var layers = Map.layers();
  layers.map(function(l) { 
    l.setOpacity(0) ;
    l.setShown(true);
  });
  index = index + 1;
  if(index >= layers.length()) {
      index = 0;
    }
  layers.get(index).setOpacity(1);
  var imageShownDateTime = layers.get(index).getName();
  var imageNumber = index + 1;
  imageShownLabel.setValue(imageNumber + '/' + layers.length() + ': ' + imageShownDateTime + ' UTC');
  // var cycledImageLabel = imageCyclePanel.widgets().get(index);
  // cycledImageLabel.style().set('fontWeight', 'bold');
  // cycledImageLabel.style().set('color', 'green');
};
//cycles through the images (backward)
var cycleImagesBackward = function(){
  // var imageLabel = imageCyclePanel.widgets().get(index);
  // imageLabel.style().set('fontWeight', 'normal');
  // imageLabel.style().set('color', 'grey');
  var layers = Map.layers();
  layers.map(function(l) { 
    l.setOpacity(0);
    l.setShown(true);
  });
  index = index - 1;
  if(index < 0) {
      index = layers.length() - 1;
  }
  layers.get(index).setOpacity(1);
  var imageShownDateTime = layers.get(index).getName();
  var imageNumber = index + 1;
  // var test = ee.Image(collectionList.get(index))
  // var test2 = test.get('system:time_start').getInfo();
  imageShownLabel.setValue(imageNumber + '/' + layers.length() + ': ' + imageShownDateTime + ' UTC');
  // var cycledImageLabel = imageCyclePanel.widgets().get(index);
  // cycledImageLabel.style().set('fontWeight', 'bold');
  // cycledImageLabel.style().set('color', 'green');
};
//toggle button taken from UI examples
var toggleButton = function(labels, func, tools) {
    var index = 0, l = labels.length;
    var button = ui.Button(labels[index]);
    var toggle = function() {
        var i = index;
        this.setLabel(labels[++index % l]);
        func(labels[i % l], i % l);
    }.bind(button);
    button.toggle = toggle;
    button.onClick(toggle);
    return button;
};
//when the user finishes drawing an AoI the geometry is set to aoiDrawn
//sitting there listening waiting for the user to draw
tools.onDraw(function(geometry, layer) {
    aoiDrawn = geometry;
    tools.stop();
    oldAoi = null;
    Map.centerObject(geometry);
    if (drawButton.getLabel() == 'Cancel') {
        drawButton.toggle();
    }
});
tools.onEdit(ui.util.debounce(function(geometry) {
  aoiDrawn = geometry;
}, 100));
var errorCheck = function(){
  if (getCollectionAttempts === 0){
      startUpPanel.add(errorPanel)  ;
  } else {
    errorPanel.clear();
  }
  getCollectionAttempts = getCollectionAttempts + 1;
  if(aoiSelect === null && aoiDrawn === null){
      createErrorLabel('An AoI is required - select or draw an AoI');
  } else if (aoiSelect !== null && aoiDrawn !== null) {
      createErrorLabel('Both an AoI is selected and drawn - select only one');
  } else {
    errorPanel.clear();
    errorPanel.add(getCollectionRunningLabel);
    ui.util.setTimeout(getCollection, 1); //gets the imageCollection
  }
};
var createErrorLabel = function(labelText){
  var label = ui.Label({
      value:labelText,
      style: {
          color: 'red',
          fontWeight: 'bold'
      }
    });
  return errorPanel.add(label);
};
/////User Interface/////
//BUTTONS
//BUTTON: Load image collection - runs the functions using user input data/defaults
var loadButton = ui.Button({
    label: 'Get Collection',
    onClick: function() {
        errorCheck();
    }
});
//BUTTON: cycle through images (forwards)
var cycleButtonForward = ui.Button({
    label: 'Next',
    onClick: cycleImagesForward,
});
//BUTTON: cycle through images (backwards)
var cycleButtonBack = ui.Button({
    label: 'Previous',
    onClick: cycleImagesBackward,
});
//BUTTON: draw //users/lks/ee-103:(D) Fancy controls/utils/widget
var drawButton = toggleButton(['Draw AoI', 'Cancel'], function(label) {
  if (label == 'Cancel') {
    if (oldAoi) {
      aoiGeometry.geometries().reset([oldAoi]);
    }
    tools.stop();
  } else {
    oldAoi = aoiGeometry.geometries().get(0);
    aoiGeometry.geometries().reset();
    tools.draw();
  }
});
//BUTTON: clear drawn geometry
var clearAoi = ui.Button({
    label: 'Clear AoI',
    onClick: function(){
      aoiGeometry.geometries().reset();
      aoiDrawn = null;
      }
});
//BUTTON: draw //users/lks/ee-103:(D) Fancy controls/utils/widget stop/play layers
var autoPlayButton = toggleButton(['Auto ▶', 'Stop'], function(label) {
  if (label == 'Auto ▶') {
   var autoPlay = ui.util.setInterval(cycleImagesForward, 1000);
  } else {
    ui.util.clear();
  }
});
//BUTTON: get Water
var extractWaterButton = ui.Button({
    label: 'Extract Water',
    style: {
      position: 'top-right'
    },
    onClick: function(){
      extractWaterOtsu(); 
    }
});
//LABELS
//LABEL: Start up title
var startUpTitle = ui.Label({
    value: 'Sentinel 2 Collection Viewer',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '16px',
        fontWeight: 'bold'
    }
});
//Collection info title
var collectionInfoTitle = ui.Label({
    value: 'Collection Information',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '16px',
        fontWeight: 'bold',
        stretch: 'horizontal'
    }
});
//LABEL: instruction text
var startUpInstructionsLabel = ui.Label({
    value: 'Some instruction text here telling the user what they need to fill out complete',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
    }
});
//LABEL: AoI title
var aoiTitle = ui.Label({
    value: 'Area of Interest (AoI)',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: AoI select
var aoiSelectLabel = ui.Label({
    value: 'Predefined AoI:',
    style: {
        margin: '15px 5px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: AoI draw
var aoiDrawLabel = ui.Label({
    value: 'OR draw a new AoI:',
    style: {
        margin: '15px 5px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: Date title
var startUpDateTitle = ui.Label({
    value: 'Date Range',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: Start date
var startDateLabel = ui.Label({
    value: 'Start Date (yyyy-mm-dd):',
    style: {
        margin: '4px 34px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: End date
var endDateLabel = ui.Label({
    value: 'End Date (yyyy-mm-dd):',
    style: {
        margin: '4px 40px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: Images title
var startUpImagesTitle = ui.Label({
    value: 'Images',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: Number of images
var numberOfImagesLabel = ui.Label({
    value: 'Maximum number of images:',
    style: {
        margin: '4px 5px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: Clip option
var clipOptionLabel = ui.Label({
    value: 'Clip images to polygon:',
    style: {
        margin: '15px 40px 1px 10px',
        fontSize: '14px',
    }
});
// LABEL: cloud cover title
var cloudCoverTitle = ui.Label({
    value: 'Cloud Cover',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: Cloud cover
var cloudCoverLabel = ui.Label({
    value: 'Image Cloud cover (%) less than:',
    style: {
        margin: '4px 3px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: AoI cloud cover
var aoiCloudCoverLabel = ui.Label({
    value: 'AoI Cloud Free (%) greater than:',
    style: {
        margin: '4px 9px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: Cycle buttons title
var cycleImageTitle = ui.Label({
    value: 'Image Shown:',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: image shown label
var imageShownLabel = ui.Label({
      value:'',
      style: {
          color: 'green',
          stretch: 'horizontal',
          fontWeight: 'bold'
      }
});
//LABEL: getting collection label
var getCollectionRunningLabel = ui.Label({
      value:'Images are being gathered, this can take a few minutes. Click "Wait" if Chrome shows an error message.',
      style: {
          color: 'green',
          stretch: 'horizontal',
          fontWeight: 'bold'
      }
});
//LABEL: sea level pressure title
var seaLevelPressureTitle = ui.Label({
    value: 'Sea Level Pressure',
    style: {
        margin: '8px 10px 5px 5px',
        fontSize: '14px',
        fontWeight: 'bold'
    }
});
//LABEL: sea level pressure
var seaLevelPressureLabel = ui.Label({
    value: 'Average sea level (mb):',
    style: {
        margin: '4px 61px 1px 10px',
        fontSize: '14px',
    }
});
//LABEL: sea level pressure time period
var seaLevelPressureTimeLabel = ui.Label({
    value: 'Period to average pressure (hrs):',
    style: {
        margin: '4px 3px 1px 10px',
        fontSize: '14px',
    }
});
//TEXTBOXES
//TEXTBOX: start date
var startDateTextbox = ui.Textbox({
    placeholder: '2015-06-23',
    onChange: function() {
        startDate = startDateTextbox.getValue();
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
//TEXTBOX: end date
var endDateTextbox = ui.Textbox({
    placeholder: endDate.getInfo(),
    onChange: function() {
        endDate = endDateTextbox.getValue();
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
//TEXTBOX: maximum number of images
var numberOfImagesTextbox = ui.Textbox({
    placeholder: '10',
    onChange: function() {
        numberImages = parseInt(numberOfImagesTextbox.getValue());
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
//TEXTBOX: cloud cover filter
var cloudCoverTextbox = ui.Textbox({
    placeholder: cloudCover,
    onChange: function() {
        cloudCover = parseInt(cloudCoverTextbox.getValue());
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
//TEXTBOX: aoi cloud cover filter
var aoiCloudCoverTextbox = ui.Textbox({
    placeholder: aoiCloudCover,
    onChange: function() {
        aoiCloudCover = parseInt(aoiCloudCoverTextbox.getValue());
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
var seaLevelPressureTextbox = ui.Textbox({
    placeholder: pressureLimit,
    onChange: function() {
        pressureLimit = parseInt(seaLevelPressureTextbox.getValue());
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
var seaLevelPressureTimeTextbox = ui.Textbox({
    placeholder: pressureHours,
    onChange: function() {
        pressureHours = parseInt(seaLevelPressureTimeTextbox.getValue());
    },
    style: {
        width: '90px',
        margin: '1px 5px 1px 5px',
    }
});
//DROPDOWNS
//DROPDOWN: clip to polygon option
var clipDropdownOptions = {'Yes':1,'No':0};
var clipDropdown = ui.Select({
    items: Object.keys(clipDropdownOptions),
    onChange: function(key){
        clipImageOption = clipDropdownOptions[key];
    }
});
clipDropdown.setPlaceholder('Yes');
//DROPDOWN: aoi selection
var aoiSelectionOptions = {'Aberdeen':aoiAberdeen,
                           'Crossapol, Tiree': aoiCrossapol,
                           'Culbin Sands': aoiCulbin,
                           'Dornoch': aoiDornoch,
                           'Morrich More': aoiMorrichMore,
                           'Montrose':aoiMontrose,
                           'Skara Brae' : aoiSkaraBrae,
                           'St. Andrews': aoiStAndrews,
                           'Tongue': aoiTongue,
                           'Use drawn AoI': aoiDrawn};
var aoiDropdown = ui.Select({
    items: Object.keys(aoiSelectionOptions),
    onChange: function(key){
        aoiSelect = aoiSelectionOptions[key];
    }
});
aoiDropdown.setPlaceholder('Select...');
//PANELS
//PANEL: Start up Panel
var startUpPanel = ui.Panel({
    widgets:[
        startUpTitle, //start up title
        startUpInstructionsLabel,
        aoiTitle,
    ],
    style: {
    position: 'top-left',
    border: '2px solid black',
    width: '340px'
    }
});
//PANEL: Start date panel
var startDatePanel = ui.Panel({
    widgets:[
        startDateLabel, //start date label
        startDateTextbox //start date textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: End date panel
var endDatePanel = ui.Panel({
    widgets:[
        endDateLabel, //end date label
        endDateTextbox //end date textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: cloud cover panel
var cloudCoverPanel = ui.Panel({
    widgets:[
        cloudCoverLabel, //cloud cover label
        cloudCoverTextbox //cloud cover textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: aoi cloud cover panel
var aoiCloudCoverPanel = ui.Panel({
    widgets:[
        aoiCloudCoverLabel, //cloud cover label
        aoiCloudCoverTextbox //cloud cover textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: Number of images panel
var numberOfImagesPanel = ui.Panel({
    widgets:[
        numberOfImagesLabel, //number of images label
        numberOfImagesTextbox //number of images textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: Clip option panel
var clipOptionPanel = ui.Panel({
    widgets:[
        clipOptionLabel, //clip option label
        clipDropdown //clip option drowpdown
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: Cycle through collection
var cyclePanel = ui.Panel({
    widgets:[
        cycleButtonBack, //clip option label
        cycleButtonForward, //clip option drowpdown
        autoPlayButton
    ],
    style: {
    // position: 'bottom-right',
    // border: '2px solid black'
    },
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: AoI Panel
var aoiPanel = ui.Panel({
    widgets:[
        aoiTitle,
    ],
    style: {
    position: 'top-center',
    border: '2px solid black'
    }
});
//PANEL: AoI select panel
var aoiSelectPanel = ui.Panel({
    widgets:[
        aoiSelectLabel,
        aoiDropdown, //aoi selector
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: AoI draw panel
var aoiDrawPanel = ui.Panel({
    widgets:[
        aoiDrawLabel,
        drawButton, //clip option label
        clearAoi //clip option drowpdown
    ],
    style: {
    margin: '0px 0px 0px 0px',
    },
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: image date cycle panel
var imageCyclePanel = ui.Panel({
  style: {
      position: 'bottom-right',
      // stretch: 'horizontal',
      border: '2px solid black',
      maxWidth: '1000px'
  },
  // layout: ui.Panel.Layout.flow('horizontal', true)
});
//PANEL: sea level pressure panel
var seaLevelPressurePanel = ui.Panel({
    widgets:[
        seaLevelPressureLabel, //cloud cover label
        seaLevelPressureTextbox //cloud cover textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: sea level pressure panel
var seaLevelPressureTimePanel = ui.Panel({
    widgets:[
        seaLevelPressureTimeLabel, //cloud cover label
        seaLevelPressureTimeTextbox //cloud cover textbox
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
//PANEL: Error Panel
var errorPanel = ui.Panel({
  widgets:[
    ],
    style: {
    position: 'top-center',
    }
});
//UI on Start Up
Map.add(startUpPanel);
startUpPanel.add(aoiSelectPanel);
startUpPanel.add(aoiDrawPanel);
startUpPanel.add(startUpDateTitle);
startUpPanel.add(startDatePanel);
startUpPanel.add(endDatePanel);
startUpPanel.add(startUpImagesTitle);
startUpPanel.add(numberOfImagesPanel);
startUpPanel.add(clipOptionPanel);
startUpPanel.add(cloudCoverTitle);
startUpPanel.add(cloudCoverPanel);
startUpPanel.add(aoiCloudCoverPanel);
// startUpPanel.add(seaLevelPressureTitle);
// startUpPanel.add(seaLevelPressurePanel);
// startUpPanel.add(seaLevelPressureTimePanel);
startUpPanel.add(loadButton);
//WATER EXTRACTION
//https://groups.google.com/forum/#!msg/google-earth-engine-developers/wtDxg_9pFPs/W50cerc6AAAJ;context-place=forum/google-earth-engine-developers
//https://code.earthengine.google.com/12179c0c5593b6be557b1bd43a28eba5
// https://groups.google.com/forum/#!msg/google-earth-engine-developers/XQtq-tuQvZo/7wCC-C-cGAAJ;context-place=msg/google-earth-engine-developers/wtDxg_9pFPs/W50cerc6AAAJ
//https://github.com/Servir-Mekong/SurfaceWaterTool
//rescale 
var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
////////////////////////////////////////////////////// 
//Algorithm to compute liklihood of water
//Builds on logic from Google cloudScore algorithm
function waterScore(img){
      // Compute several indicators of water and take the minimum of them.
      var score = ee.Image(1.0);
      //Set up some params
      var darkBands = ['green','red','nir','swir2','swir1'];//,'nir','swir1','swir2'];
      var brightBand = 'blue';
      var shadowSumBands = ['nir','swir1','swir2'];
      //Water tends to be dark
      var sum = img.select(shadowSumBands).reduce(ee.Reducer.sum());
      var sum = rescale(sum,'img',[0.35,0.2]).clamp(0,1)
      score = score.min(sum);
      //It also tends to be relatively bright in the blue band
      var mean = img.select(darkBands).reduce(ee.Reducer.mean());
      var std = img.select(darkBands).reduce(ee.Reducer.stdDev());
      var z = (img.select([brightBand]).subtract(std)).divide(mean);
      z = rescale(z,'img',[0,1]).clamp(0,1);
      score = score.min(z);
      // // Water is at or above freezing
      // score = score.min(rescale(img, 'img.temp', [273, 275]));
      // // Water is nigh in ndsi (aka mndwi)
      var ndsi = img.normalizedDifference(['green', 'swir1']);
      ndsi = rescale(ndsi, 'img', [0.3, 0.8]);
      score = score.min(ndsi);
      var waterAddBand = img.addBands(score.clamp(0,1));
      waterAddBand = waterAddBand.select(
                        ['constant'],
                        ['waterScore']
      );
      waterAddBand = waterAddBand
                     .where(waterAddBand.lte(0), 0)
                     .where(waterAddBand.gt(0), 1);
      return waterAddBand;
      }
var extractWater = function(){
  var collectionWaterExtractionPrep = ee.ImageCollection(collection).select(['QA60', 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12'],['QA60','cb', 'blue', 'green', 'red', 're1','re2','re3','nir', 'nir2', 'waterVapor', 'cirrus','swir1', 'swir2']);
  print(collectionWaterExtractionPrep);
  var collectionWaterScore = ee.ImageCollection(collectionWaterExtractionPrep)
      .map(function(image){
        return image.divide(10000);
      })
      .map(waterScore);
  print(collectionWaterScore);
  //anything above 0 convert to 1 TO DO
  var waterSum = ee.ImageCollection(collectionWaterScore).reduce(ee.Reducer.sum());
  var waterOccurrence = ee.Image(waterSum).divide(collectionListLength).multiply(100);
  var landMask = waterOccurrence.gt(0);
  var lowestTide = waterOccurrence.gt(90);
  //9-class YlGnBu colorBrewer
  var palette = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
  Map.addLayer(waterOccurrence.updateMask(landMask),{min: 0, max: 100, palette: palette}, 'Tidal Range' );
  Map.addLayer(waterOccurrence.updateMask(lowestTide),{min: 0, max: 100, palette: palette}, 'Permanent Water' );
  // collection = collection.map(rescale10000);
  // print(collection)
  // collectionwaterScore(image);
};
/***
 * Return the DN that maximizes interclass variance in B5 (in the region).
 */
var otsu = function(histogram) {
    histogram = ee.Dictionary(histogram);
    var counts = ee.Array(histogram.get('histogram'));
    var means = ee.Array(histogram.get('bucketMeans'));
    var size = means.length().get([0]);
    var total = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
    var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
    var mean = sum.divide(total);
    var indices = ee.List.sequence(1, size);
    // Compute between sum of squares, where each mean partitions the data.
    var bss = indices.map(function(i) {
        var aCounts = counts.slice(0, 0, i);
        var aCount = aCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
        var aMeans = means.slice(0, 0, i);
        var aMean = aMeans.multiply(aCounts)
            .reduce(ee.Reducer.sum(), [0]).get([0])
            .divide(aCount);
        var bCount = total.subtract(aCount);
        var bMean = sum.subtract(aCount.multiply(aMean)).divide(bCount);
        return aCount.multiply(aMean.subtract(mean).pow(2)).add(
            bCount.multiply(bMean.subtract(mean).pow(2)));
    });
    // Return the mean value corresponding to the maximum BSS.
    return means.sort(bss).get([-1]);
};
var collectionToNDWI = function(image){
    var NDWI = image.normalizedDifference(['B3', 'B8'])
    return NDWI
}
var setWater = function(image){
  var threshold = ee.Number(image.get('threshold'))
  var ndwi = image.select('ndwi')
  return  ndwi
               .where(ndwi.lte(threshold), 0)
               .where(ndwi.gt(threshold), 1);
};
var setThreshold = function(image){
    var NDWI = image
    var scale = 10;
    var cannyThreshold = 0.0;
    var cannySigma = 1.3;
    var minValue = -0.1;
    var bounds = aoi.buffer(4000)
    var mask = NDWI.mask().gt(0).focal_min(ee.Number(scale).multiply(3), 'circle', 'meters');
    // return mask
    // detect sharp changes
    var edge = ee.Algorithms.CannyEdgeDetector(NDWI, cannyThreshold, cannySigma);
    edge = edge.multiply(mask);
    // return edge
    // buffer around NDWI edges
    var edgeBuffer = edge.focal_max(ee.Number(scale).multiply(1), 'square', 'meters');
    var imageEdge = NDWI.mask(edgeBuffer);
    // return imageEdge
    // compute threshold using Otsu thresholding
    var buckets = 100;
    var histogram = ee.Dictionary(ee.Dictionary(imageEdge.reduceRegion(ee.Reducer.histogram(buckets), bounds, scale)).values().get(0));
    var threshold = ee.Algorithms.If(histogram.contains('bucketMeans'), otsu(histogram), 0.3);
    threshold = ee.Number(threshold).toFloat();//.add(0.05)
    var th = minValue !== 'undefined' ? threshold.max(minValue) : threshold;         
    return image.set('threshold', th);
}
var extractWaterOtsu = function(){
      var s2NdwiCollection = ee.ImageCollection(collection).map(collectionToNDWI);
      var waterCollection = ee.ImageCollection(s2NdwiCollection).map(setThreshold);
      var waterCollectionRename = waterCollection.select(
                              ['nd'],
                              ['ndwi']);
      var waterCollection01 = waterCollectionRename.map(setWater)
      var waterSum = ee.ImageCollection(waterCollection01).reduce(ee.Reducer.sum());
      var waterOccurrence = ee.Image(waterSum).divide(collectionListLength).multiply(100);
      var landMask = waterOccurrence.gt(0);
      var lowestTide = waterOccurrence.gt(90);
      //9-class YlGnBu colorBrewer
      var palette = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
      Map.addLayer(waterOccurrence.updateMask(landMask),{min: 0, max: 100, palette: palette}, 'Tidal Range' );
      Map.addLayer(waterOccurrence.updateMask(lowestTide),{min: 0, max: 100, palette: palette}, 'Permanent Water' );
};