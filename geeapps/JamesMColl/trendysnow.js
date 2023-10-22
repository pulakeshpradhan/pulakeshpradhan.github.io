var windowSize = 7;         // See validation assessment for details on window size
// http://www.strangeplanet.fr/work/gradient-generator/index.php
var RedToBlue = ["#FF0000", "#F40A00", "#EA1400", "#E01E00", "#D62800", "#CC3300", "#C13D00", "#B74700", "#AD5100", "#A35B00", "#996600", "#8E7000", "#847A00", "#7A8400", "#708E00", "#669900", "#5BA300", "#51AD00", "#47B700", "#3DC100", "#32CC00", "#28D600", "#1EE000", "#14EA00", "#0AF400", "#00FF00", "#00F40A", "#00E915", "#00DF1F", "#00D42A", "#00C935", "#00BF3F", "#00B44A", "#00AA55", "#009F5F", "#00946A", "#008A74", "#007F7F", "#00748A", "#006A94", "#005F9F", "#0055AA", "#004AB4", "#003FBF", "#0035C9", "#002AD4", "#001FDF", "#0015E9", "#000AF4", "#0000FF"];
var BlueToBrown = ["#964B00", "#9A520A", "#9E5914", "#A2601E", "#A66728", "#AB6F33", "#AF763D", "#B37D47", "#B78451", "#BB8B5B", "#C09366", "#C49A70", "#C8A17A", "#CCA884", "#D0AF8E", "#D5B799", "#D9BEA3", "#DDC5AD", "#E1CCB7", "#E5D3C1", "#EADBCC", "#EEE2D6", "#F2E9E0", "#F6F0EA", "#FAF7F4", "#FFFFFF", "#F4F7F9", "#E9EFF3", "#DFE7EE", "#D4DFE8", "#C9D7E2", "#BFCFDD", "#B4C7D7", "#AAC0D2", "#9FB8CC", "#94B0C6", "#8AA8C1", "#7FA0BB", "#7498B5", "#6A90B0", "#5F88AA", "#5581A5", "#4A799F", "#3F7199", "#356994", "#2A618E", "#1F5988", "#155183", "#0A497D", "#004278"];
var WhiteToBlack = ["#000000", "#050505", "#0A0A0A", "#0F0F0F", "#141414", "#1A1A1A", "#1F1F1F", "#242424", "#292929", "#2E2E2E", "#343434", "#393939", "#3E3E3E", "#434343", "#484848", "#4E4E4E", "#535353", "#585858", "#5D5D5D", "#626262", "#686868", "#6D6D6D", "#727272", "#777777", "#7C7C7C", "#828282", "#878787", "#8C8C8C", "#919191", "#969696", "#9C9C9C", "#A1A1A1", "#A6A6A6", "#ABABAB", "#B0B0B0", "#B6B6B6", "#BBBBBB", "#C0C0C0", "#C5C5C5", "#CACACA", "#D0D0D0", "#D5D5D5", "#DADADA", "#DFDFDF", "#E4E4E4", "#EAEAEA", "#EFEFEF", "#F4F4F4", "#F9F9F9", "#FFFFFF"];
var GlobalSnowPack = ["#FFFFFF", "#E7FBFF", "#D0F8FF", "#B9F5FF", "#A1F2FF", "#8AEFFF", "#73ECFF", "#5FC4FF", "#4C9DFF", "#3976FF", "#264EFF", "#1327FF", "#0000FF", "#1B00F0", "#3700E1", "#5301D2", "#6E01C3", "#8A01B4", "#A602A6", "#981098", "#8B1E8B", "#7E2C7E", "#713A71", "#644864", "#575757", "#454545", "#343434", "#222222", "#111111", "#000000"];
var BluetoRed = ["#0000FF", "#0011EE", "#0022DD", "#0033CC", "#0044BB", "#0055AA", "#006699", "#007788", "#008877", "#009966", "#00AA55", "#00BB44", "#00CC32", "#00DD21", "#00EE10", "#00FF00", "#12EC00", "#24DA00", "#36C800", "#48B600", "#5BA300", "#6D9100", "#7F7F00", "#916D00", "#A35B00", "#B64800", "#C83600", "#DA2400", "#EC1200", "#FF0000"];
var GenerateSnowCoverFrequency = function(StartDate, EndDate, TotalSteps) {                
  var SCF_List = ee.List([]);
  for(var i = 1; i <= TotalSteps; i++) {
    var MODISGappedSnowCover = GapFilledSnowData.filterDate(StartDate, EndDate);
    var NumOfSnowDays =  MODISGappedSnowCover.sum();                                                                          // Calculate the number of days with snow cover with .sum()
    var NumOfValidObsDays = MODISGappedSnowCover.count();                                                                     // Count the number of days with a valid observation with .count()
    var SnowCoverFrequency = NumOfSnowDays.toFloat().divide(NumOfValidObsDays);                                               // perform the SCF calculation
    var SCF_Image = ee.Image(ee.Number.parse(EndDate.format('YYYY')))                                                         // Attach a date band (timestamp) used for trend analysis
                      .addBands(SnowCoverFrequency.select(['Snow_Cover_Daily_Tile'], ['Snow Cover Frequency'])).toDouble();
    SCF_List = SCF_List.add(SCF_Image);
    StartDate = ee.Date(StartDate).advance(1, 'year');
    EndDate = ee.Date(EndDate).advance(1, 'year');
  }
  return ee.ImageCollection(SCF_List);
};
var GenerateWinterPrecip = function(StartDate, EndDate, TotalSteps) {                
  var SCF_List = ee.List([]);
  for(var i = 1; i <= TotalSteps; i++) {
    var MODISGappedSnowCover = GapFilledSnowData.filterDate(StartDate, EndDate);
    var NumOfSnowDays =  MODISGappedSnowCover.sum();                                                                          // Calculate the number of days with snow cover with .sum()
    var NumOfValidObsDays = MODISGappedSnowCover.count();                                                                     // Count the number of days with a valid observation with .count()
    var SnowCoverFrequency = NumOfSnowDays.toFloat().divide(NumOfValidObsDays);                                               // perform the SCF calculation
    var SCF_Image = ee.Image(ee.Number.parse(EndDate.format('YYYY')))                                                         // Attach a date band (timestamp) used for trend analysis
                      .addBands(SnowCoverFrequency.select(['Snow_Cover_Daily_Tile'], ['Snow Cover Frequency'])).toDouble();
    SCF_List = SCF_List.add(SCF_Image);
    StartDate = ee.Date(StartDate).advance(1, 'year');
    EndDate = ee.Date(EndDate).advance(1, 'year');
  }
  return ee.ImageCollection(SCF_List);
};
var mrcoFilter = function(collection, wsInDays) {
// collection--image collection, MODIS daily snow cover products
// wsInDays--window size in days
  var aDayInGee = 24*60*60*1000; //a day in GEE's time unit
  var tWindowSize = wsInDays*aDayInGee; //window size in days
  //
  // define a temporal filter for joining the collection with itself within a temporal window
  //
  // A temporal neighborhood that excludes the focus image
  var diffFilter = ee.Filter.maxDifference({
      difference: tWindowSize,
      leftField: 'system:time_start',
      rightField: 'system:time_start'
    });
  var joinFilter = ee.Filter.and(diffFilter,
      ee.Filter.notEquals({
      leftField: 'system:time_start',
      rightField: 'system:time_start'})
    );
  //print(joinFilter);
  var saveAllJoin = ee.Join.saveAll({
    matchesKey: 'matches', 
    ordering: 'system:time_start', 
    ascending: true, 
    measureKey: 'timeDiff'
  });
  // join the collection with itself, i.e., join focus image within the images in the temporal window
  var joinResult = saveAllJoin.apply(collection, collection, joinFilter);
  //
  // Helper function setNull()
  //
  var setNull = function(input,loc){
    return input.updateMask(loc.not());
  };
  //
  // MRCO filter as a map function
  //
  var mrcoMapper = function(img){
    // cretate an image collection for each image using the images in the temporal neighborhood
    var matchCollection = ee.ImageCollection.fromImages(ee.Image(img).get('matches'));
    //print('images in the window',matchCollection);
    //add the "timeDiff" property as a new band to the collection
    var f = function(aImg){
      //add time difference band and mask out valid valid landcover pixels
      var validLcMask = ee.Image(aImg).eq(3)
                    .or(ee.Image(aImg).eq(7));
      var timeDiff = aImg.metadata('timeDiff','timeDiff').multiply(-1).mask(validLcMask);
      return aImg.mask(validLcMask).addBands(timeDiff.copyProperties(aImg)); //SR?
    };
    var icWithTimeDiff = matchCollection.map(f);
    //show('before quality mosaic',icWithTimeDiff.toArray());
    //MRCO
    var mrco = icWithTimeDiff.qualityMosaic('timeDiff');
    //show('MRCO in negative',mrco);
    //get the MRCO landcover
    var mrcoLc = mrco.select('Snow_Cover_Daily_Tile');
    // replace the focus image with MRCO landcover
    // Only replace clouds iff there is valid values in the temporal window
    // This means: 
    // 1) non-valid values (such as 0, 1, 11, 254,255) on the focus image are NOT replaced
    // 2) clouds on the focus image is NOT replaced if there is no valid value within the tmeporal window
    var mrcoFilledImageBare = ee.Image(img).where((ee.Image(img).eq(50)).and(mrcoLc),mrcoLc).toUint8(); //convert to MODIS sc type
    //show('mrcoFilledImage',mrcoFilledImageWithProps); //still cannot show!
    // copy the properties from the focus image
    var mrcoFilledImageWithProps = mrcoFilledImageBare.copyProperties(ee.Image(img),['system:footprint','system:index','system:time_end','system:time_start']);
    //change negative time to days
    var aDayInGee = 24*60*60*1000; //a day in GEE's time unit
    var mrcoTimeDiff = mrco.select('timeDiff').divide(aDayInGee).abs();
    // Prepare the MRCO day band
    //for no-cloud pixels their MRCO days are assigned as 0. 
    var initDays = ee.Image(img).where(ee.Image(img).neq(50),0).select(['Snow_Cover_Daily_Tile'],['MRCO Days']);
    //set all cloud pixels' MRCO days as NULL
    initDays = setNull(initDays,ee.Image(img).eq(50));
    //unmask the cloud pixels with valid MRCO days
    var mrcoDays = initDays.unmask(mrcoTimeDiff.updateMask(ee.Image(img).eq(50))); //should NOT use "mask()"!
    // add the MRCO day diff as a band
    var mrcoFilledImage = ee.Image(mrcoFilledImageWithProps).addBands(mrcoDays);
    //add the filled image
    return mrcoFilledImage;
  };
  var MRCOCollection = ee.ImageCollection(joinResult.map(mrcoMapper));
  var GapFilledDataset = ee.ImageCollection(MRCOCollection).map(function(image) {
    var CodedBits = ee.Image(image).remap([3,7],
                                          [0,1],
                                          null,
                                          'Snow_Cover_Daily_Tile');
                                      return CodedBits;
                                             })
                                             .select(['remapped'], ['Snow_Cover_Daily_Tile']);
  return ee.ImageCollection(GapFilledDataset);
};
// We now create the base daily snow cover dataset, which uses only the fractional band
// It proves faster to remap and gap fill the entire dataset at once, and then run the trend analysis by filtering
// the date off that newly created collection as opposed to calculating it for a particular timeframe each time
// Binary no snow/snow threshold set to 10 as per validation assessment
var inList = ee.List.sequence(0,100,1).cat([225,237,239]);                      // Create a list with values 0-100,225,237,239
var holdOutList = ee.List.repeat(3,10).cat(ee.List.repeat(7,91)).cat([3,3,3]);  // Create a list with values of 3 for no snow and 7 for snow
                                                                                // *note: 3&7's are used because GEE treats 0 as false in the mrco filter and therefore does not act on them
var MOD10A1_Temp = ee.ImageCollection('MOD10A1')
                    .select('Fractional_Snow_Cover')
                    .map(function(image) {
    var CodedBits = ee.Image(image)
                      .unmask()
                      .remap(inList,
                             holdOutList,
                             50,
                             'Fractional_Snow_Cover')
                      .select(['remapped'], ['Snow_Cover_Daily_Tile']);
    return CodedBits;
  });
// Run the dataset through the mrco filter.  This will be the final dataset we use to calculate SCF
var GapFilledSnowData = mrcoFilter(ee.ImageCollection(MOD10A1_Temp), windowSize);
var precipData = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
// Define the join condition
var FilterOnStartTime = ee.Filter.equals({'leftField': 'system:time_start', 
                                          'rightField': 'system:time_start'
                                          });                                            
var WinterPrecip = ee.Join.inner().apply(GapFilledSnowData, precipData, FilterOnStartTime)                          
                               .map(function(element) {
                                  var imageMerge = ee.Image(element.get('primary')).addBands(ee.Image(element.get('secondary')));
                                  var MOD_Reclass = ee.Image(imageMerge).select('Snow_Cover_Daily_Tile');
                                  var MYD_Reclass = ee.Image(imageMerge).select('precipitation');
                                  var PreciponSnow = MYD_Reclass.where(MOD_Reclass.neq(1), 0)
                                                              .set({'system:time_start': MOD_Reclass.get('system:time_start')});  
                                  //print(ReplaceMOD);
                                  return ee.Image(PreciponSnow);//ReplaceMOD.select(['MOD'], ['Snow_Cover_Daily_Tile']);
                                }); 
var WinterPrecipData = ee.ImageCollection(WinterPrecip);//.select(['remapped'], ['Snow Cover']);    // Manual cast to ImageCollection and rename band
// print(WinterPrecipData) GenerateWinterPrecip
var SCFYearCollection = GenerateSnowCoverFrequency(ee.Date('2000-10-01'), ee.Date('2001-10-01'), 16);
var SensSlopeExport = SCFYearCollection.reduce(ee.Reducer.sensSlope()).select('slope');
var image_viz = {min:-0.03, max:0.03, palette:BlueToBrown};
var exportImage = SensSlopeExport.visualize(image_viz);
Map.addLayer(exportImage, {}, 'Image export preview');
//Map.addLayer(image_export_region, {}, 'image export region', false);
// Export an image file to Google Drive.
Export.image.toDrive({
  image: exportImage,
  description: 'SensSlope',
  folder: "GEE",  // UPDATE to the name of one of your Drive folders
  scale: 500,
  //region: geometry,
  maxPixels: 500000000
});