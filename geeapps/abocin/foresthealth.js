/*****************************SAVETREE 2.0*********************************** * 
* Script: SAVETREE 2.0                                                        *
* Authors v1.0: Joshua Verkerke, Anna McGarrigle, John Dilger                 *
* Authors v2.0: Heather Myers, Anna McGarrigle, Peter Norton, Andrea Ferrer   *                                           
* Date: November 18, 2017                                                     *
* Project: Lassen Volcanic NP Disasters II, Fall 2017                         *
* Contact: develop.geoinformatics@gmail.com,                                  *
*          annamcgarrigle@gmail.com,                                          *
*          hmyerscmt@gmail.com                                                *  
* URL:                                                                        *
* Description: A Google Earth Engine Tool developed for Lassen Volcanic       *
*  National Park in order to analyze the history of tree mortality in the     *
*  area to better plan for fire treatments in the future. SAVETREE performs   *
*  the following functions:                                                   *
*    -Computes temporal trend as a linear regression analysis of a specified  *
*      spectral index  over a specified time period for a specified area      *
*      using data from the Landsat series of satellites, you can add a        *
*      coefficient trend analysis layer or a bivariate map layer (California  *
*      water data is added automatically to mask areas of the                 *
*      analysis to rule them out as significant).                             *
*    -Allows the user to provide their own shapefile asset to perform the     *
*      SAVETREE analyses on                                                   *                              *
*    -Adds FRAP historical fire data to mask the analysis in order to         *
*      identify the fires as mortality due to fire and not other sources of   *
*      mortality                                                              *
*    -User can provide future FRAP datasets                                   *
*    -Exports analyses as TIFF files                                          *
*    -On-click, the SAVETREE analysis layers to see a graph of the linear     *
*      analysis of that particular pixel in the widget                        *
*                                                                             *
*  Usage: Requires access to Earth Engine Assets from the Library:            *
*   “users/savetree/”                                                         *
*                                                                             *
*  Parameters:                                                                *    
*    In: Year for Mortality Map, Duration for analysis, Spectral Index (SI)   *
*      for analysis, Area of Interest for analysis, Fire History Data Mask,   *
*      Date Range for Fire History Data, Export Option.                       *
*        Optional: Your own area of interest asset, your own FRAP data set    *  
*    Out:  Display of trend results and bivariate plot. Optionally output to  *
*      Google Drive TIFF images for trends (Coefficients), and Bivariate plot.*
*                                                                             *
********************************** WIDGET *********************************** *
* This section gets input from the user, and sets up other necessary global   *
* variables including locations and color ramps for visualization.            *                                                                         *
**************************************************************************** */
///////////////////////////////////////////////////////////////////////////////
////////////////////////////////// STABLE INPUTS //////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var aoi,            // A variable to set the area of interest
    allyr,          // A series consisting of yr, areaOfInterest, and dur
    SI,             // The Spectral Index selected by the user (NDMI, NDVI, NDWI or NBR)
    dur,            // The duration input by the user (3-5 years or more suggested)
    yr,             // The end year input by the user (1984-2016) 
    coef,           // The coefficient (slope) trend layer to be added to the map
    bivariate,      // The bivariate layer to  be added to the map
    combo,          // Combines all of the constants for the bivariate
    areaOfInterest; // The area of interest of the map, selected by the user in the area of interest dropdown
//AREAS OF INTEREST
var devt2 = ee.FeatureCollection("users/savetree/TERM2AOI"),//Asset for Case Study (The park + Badger Planning Area) 
    lvnp = ee.FeatureCollection("users/savetree/LVNP"),//Asset for Lassen Volcanic National Park
    lnf = ee.FeatureCollection("users/savetree/LNF"),//Asset for Lassen National Forest
    badger = ee.FeatureCollection("users/savetree/BADGER");//Asset for Badger Planning Area
//DEPENDENCIES
var lvnpCenter = ee.FeatureCollection("users/savetree/LVNPCENTER");//Makes 2012 work
//LAKES
var CA_lakes = ee.FeatureCollection("users/savetree/LAKES");//all of CA lakes
//FRAP FIRE HISTORY
var rx = ee.FeatureCollection('users/savetree/RX'),//FRAP prescription fire data 1900-2016
    treatment = ee.FeatureCollection('users/savetree/FRAPTREATMENT'),//FRAP non-fire treatment data 1900-2016
    frap = ee.FeatureCollection('users/savetree/PARKSFRAP');//FRAP wildfire data clipped to California parks and forests 1900-2016
////VIZ PARAMS   
var FCIR = {"opacity":1,"bands":["NIR","RED","GREEN"],"min":0,"max":4000},
    TCC = {"opacity":1,"bands":["RED","GREEN","BLUE"],"min":0,"max":4000},
    COEF = {"opacity":1,"bands":["t"],"min":-90,"max":60,
      "palette":["ff0000","1500cc","00ff00"]},
    LGND = {"opacity":1,"min":-90,"max":60,
      "palette":["ff0000","1500cc","00ff00"]},
    BIV = {"min":1, "max":9, "palette": ['eff5f5', 'b0d5df', '64acbe',
      'e4acac', 'ad9ea5', '627f8c', 'c85a5a', '985356', '574249']};     
// SET OF USER INPUTS FOR AREA OF INTEREST
var LVNP = 'Lassen Volcanic National Park',
    BADG = 'Badger Planning Area',
    LNF = 'Lassen National Forest',
    DEVT2 = 'DEVELOP T2 Study Area',
    OWN = 'Your asset (below)';
///////////////////////////////////////////////////////////////
///////////////// CALCULATING MORTALITY ///////////////////////
///////////////////////////////////////////////////////////////
function setAreaOfInterest(){
  aoi = selectAoi.getValue();
  if (aoi == LVNP){
      areaOfInterest = lvnp;
  }//sets the area of interest to the Lassen Volcanic National Park
  else if (aoi == BADG){
      areaOfInterest = badger;
  }//sets the area of interest to the Badger Planning Area
  else if (aoi == LNF){
      areaOfInterest = lnf;
  }//sets the area of interest to the Lassen National Forest
  else if (aoi == DEVT2){
      areaOfInterest = devt2;
  }//sets the area to the Study Area
  else if (aoi == OWN){
      var userInput = inputTextbox.getValue();
      userInput = ee.String(userInput);
      areaOfInterest = ee.FeatureCollection(userInput);
  }//sets the area of interest to an asset input by the user
}//A function which sets the area of interest 
//Create Image Collection from duration and SI inputs
function applyFilters() {
  // Set area of interest
  setAreaOfInterest();
  // Set filter variables
  yr = selectYr.getValue();
  if (yr) yr = ee.Number.parse(yr);
  dur = selectDur.getValue();
  if (dur) dur = ee.Number.parse(dur).subtract(1);
  SI = selectSI.getValue();
  if (SI) SI = ee.String(SI);
  // Convert input numeric year to Surface Reflectance growing season
  // collection for a single year
  var getICSR = function(year){
    year = ee.Number(year);
    var IC = ee.Algorithms.If(
                year.eq(ee.Number(2012)),ee.ImageCollection('LANDSAT/LE07/C01/T1_SR'),
                ee.Algorithms.If(year.gt(ee.Number(2012)),
                    ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'),
                    ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')));
    var ICfilter = ee.ImageCollection(IC).filter(ee.Filter.dayOfYear(135,258))
                                                //15May->15Sep (Peak Green)
                      .filter(ee.Filter.calendarRange(year,year,'year'))
                      .filterBounds(areaOfInterest);
    return ICfilter;
  };
  // Rename image bands to simplify processing
  var bandRename = function(image){
    var year = ee.Number.parse(ee.String(image.get('system:index')).slice(-8,-4));
    var renameList = ee.Algorithms.If(year.gt(ee.Number(2012)),
        ['AEROSOL','BLUE','GREEN','RED','NIR','SWIR1','SWIR2','cfmask',
        'cfmask_conf','SR_AEROSOL','PIXEL_QA','RADSAT_QA'],
            ['BLUE','GREEN','RED','NIR','SWIR1','THERMAL','SWIR2',
            'sr_atmos_opacity','sr_cloud_qa', 'pixel_qa','radsat_qa']);
    return image.rename(renameList);
  };
  //grab cloud band and add it to SR image to evaluate image quality
  var cloudSR = function(image){
    var time = image.get('system:time_start');
    var year = ee.Number.parse(ee.String(image.get('system:index')).slice(-8,-4));
    var ICTOA = ee.ImageCollection(ee.Algorithms.If(year.eq(ee.Number(2012)),
      ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA'),
      ee.Algorithms.If(year.gt(ee.Number(2012)),
        ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'),
        ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA'))));
    var TOAImg = ee.Image(ICTOA.filter(
      ee.Filter.eq('system:time_start',time)).first());
    var cloudband = ee.Algorithms.Landsat.simpleCloudScore(TOAImg)
                      .select('cloud');
    return image.addBands(image.expression('5*(100-CLOUD)',
                          {'CLOUD':cloudband}).rename('CLEAR'));
  };
  // Remove high value artifacts over snow
  var maskHi = function(image){
    var newBand = image.expression('b("BLUE")+b("GREEN")+b("RED")');
    var hiMask = newBand.lt(24000);
    return image.updateMask(hiMask);
  };
  // Compute desired Spectral Indices
  var indices = function(image) {
    return image.addBands(image.normalizedDifference(['NIR', 'RED'])
      .multiply(ee.Image.constant(1000)).rename('NDVI'))
    .addBands(image.normalizedDifference(['NIR', 'SWIR1'])
      .multiply(ee.Image.constant(1000)).rename('NDMI'))
    .addBands(image.normalizedDifference(['GREEN', 'NIR'])
      .multiply(ee.Image.constant(1000)).rename('NDWI'))
    .addBands(image.normalizedDifference(['NIR', 'SWIR2'])
      .multiply(ee.Image.constant(1000)).rename('NBR'));
  };
  var quality = function(image) {
    return image.addBands(image.expression('b("CLEAR") + b("NDVI")')
            .rename('QUAL'));
  };
  // Input list of year & bounding geometry, add SI bands and time series bands,
  // then filter annual collection  to a single "greenest pixel" composite
  var cleanSR = function(year_geo){
    year_geo = ee.List(year_geo);
    var year = year_geo.get(0);
    var geo = ee.FeatureCollection(year_geo.get(1)).geometry();
    var IC = getICSR(year);
    var collection = IC
      .map(bandRename)
      .map(cloudSR)
      .map(maskHi)
      .map(indices)
      .map(quality)
      .map(function(image){return image.clip(geo);});
    var output = collection.qualityMosaic('QUAL')  
      .copyProperties(collection, ['title'])
      .set({'year':year});
    return ee.Image(output)
      .addBands(ee.Image(ee.Number(year).subtract(1983)).rename('t').float())
      .addBands(ee.Image.constant(1));
  };
  // Function to apply the cleanSR function to the time period to generate an
  // ImageCollection
  var series = function(year,geo, duration){
    var yrlist = ee.List.sequence(year.subtract(duration),year);//.reverse();
    var yrgeo = yrlist.zip(ee.List.repeat(geo,yrlist.length()));
    var IClist = ee.ImageCollection.fromImages(yrgeo.map(cleanSR));
    return IClist;
  };
  // Generate the time series ImageCollection
  allyr = series(yr,areaOfInterest,dur);
  // Display the Classified image, NDVI & NDMI Bivariate plot for the current
  // year, the Coefficients(slope) layer of the time series
  Map.centerObject(areaOfInterest);
}
// A function to specifically add the Coefficient layer to the map
function applyCoefficient(){
  applyFilters();
  // Generate the linear regression series as a new image, pulling from the
  // ImageCollection
  var indep = ee.List(['constant','t']);
  var dep = ee.String(SI);
  var trend = allyr.select(indep.add(dep))
                .reduce(ee.Reducer.linearRegression(indep.length(),1));
  coef = trend.select('coefficients')
          .arrayProject([0])
          .arrayFlatten([indep]);
  coef = coef.addBands(coef.select('t').multiply(dur.add(1)).rename('change'));
   Map.centerObject(areaOfInterest);
   Map.addLayer(coef,COEF,'Coefficients '+yr.subtract(dur).getInfo()+'-'+
                  yr.getInfo()+','+SI.getInfo());
//Adds lakes to mask water error
    var Lakes = (ee.Image().byte()).paint({
      featureCollection: CA_lakes.filterBounds(areaOfInterest),
      color: 'black',
  });
  Map.addLayer(Lakes, {}, 'Lakes mask');
}
// A function to specifically add the Bivariate layer to the map
function applyBivariate(){
  applyFilters();
  // Generate a Bivariate map for the final year in the series
  var finalImg = ee.Image(allyr.filterMetadata('year','equals',yr).first())
                  .select(['NDMI','NDVI']);
  var ndviBand = finalImg.select('NDVI');
  var ndmiBand = finalImg.select('NDMI');
  // Classify NDVI & NDMI combinations
  var ndvi1 = ndviBand.lt(200);
  var ndvi2 = ndviBand.gte(200).and(ndviBand.lt(450));
  var ndvi3 = ndviBand.gte(450);
  var ndmiA = ndmiBand.lt(-200);
  var ndmiB = ndmiBand.gte(-200).and(ndmiBand.lt(50));
  var ndmiC = ndmiBand.gte(50);
  // Create binary layers for each of the 9 classes
  var A1 = ndmiA.and(ndvi1);var A2 = ndmiA.and(ndvi2);var A3 = ndmiA.and(ndvi3);
  var B1 = ndmiB.and(ndvi1);var B2 = ndmiB.and(ndvi2);var B3 = ndmiB.and(ndvi3);
  var C1 = ndmiC.and(ndvi1);var C2 = ndmiC.and(ndvi2);var C3 = ndmiC.and(ndvi3);
  // Create Class layers
  A1 = ee.Image.constant(1).updateMask(A1).unmask();
  A2 = ee.Image.constant(2).updateMask(A2).unmask();
  A3 = ee.Image.constant(3).updateMask(A3).unmask();
  B1 = ee.Image.constant(4).updateMask(B1).unmask();
  B2 = ee.Image.constant(5).updateMask(B2).unmask();
  B3 = ee.Image.constant(6).updateMask(B3).unmask();
  C1 = ee.Image.constant(7).updateMask(C1).unmask();
  C2 = ee.Image.constant(8).updateMask(C2).unmask();
  C3 = ee.Image.constant(9).updateMask(C3).unmask();
  // Combine into a single image
  combo = A1.add(A2).add(A3).add(B1).add(B2).add(B3).add(C1).add(C2)
            .add(C3).clip(areaOfInterest);
  bivariate = combo.select('constant');
  Map.centerObject(areaOfInterest);
  Map.addLayer(bivariate, BIV, 'Bivariate'+yr.subtract(dur).getInfo()+'-'+
                  yr.getInfo()+','+SI.getInfo());
  //Adds lakes to mask water error
    var Lakes = (ee.Image().byte()).paint({
      featureCollection: CA_lakes.filterBounds(areaOfInterest),
      color: 'black',
  });
  Map.addLayer(Lakes, {}, 'Lakes mask');
}
///////////////////////////////////////////////////////////////
/////////////////////// FIRE HISTORY //////////////////////////
///////////////////////////////////////////////////////////////
// Extract fire history dataset input by user
function setFireHistoryData(){
  setAreaOfInterest();//sets area of interest
  var start = selectStartYear.getValue();//a user supplied start year
  var end = selectEndYear.getValue();//a user supplied end year
  var dateFilter = ee.Filter.rangeContains('YEAR_', start, end); //filter based on year inputs
  var dataSelected = select_data.getValue();
  var dataUsed;
  if (dataSelected == RX){
    dataUsed = rx.filter(dateFilter).filterBounds(areaOfInterest);
  }//fire history data set to prescription fire treatments 
  else if (dataSelected == TREATMENT){
    dataUsed = treatment.filter(dateFilter).filterBounds(areaOfInterest);
  }//fire history data set to non-fire treatments 
  else if (dataSelected == FRAP) {
    dataUsed = frap.filter(dateFilter).filterBounds(areaOfInterest);
  }//fire history data set to wildfires
  else if (dataSelected == MYFIREDATA){
    var userInput = ownAssetInput.getValue(); //input data from the user, a "YEAR_" field
    userInput = ee.String(userInput); //ensures the user input is a string
    var userSuppliedFire = ee.FeatureCollection(userInput); //turns the input into a feature collection
    if (userSuppliedFire.filter(dateFilter) === true){ //if input has a year attribute it will be filtered
      dataUsed = userSuppliedFire.filter(dateFilter).filterBounds(areaOfInterest);
    } else{
      dataUsed = userSuppliedFire.filterBounds(areaOfInterest);
    }
  }
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: dataUsed,
  color: 1,
  width: 1
});
Map.centerObject(areaOfInterest,10);
Map.addLayer(outline, {palette: 'white'}, dataSelected);//Add fires as white outlines
}//sets the fire history data to a set selected by the user
///////////////////////////////////////////////////////////////
////////////////////// OTHER METHODS //////////////////////////
///////////////////////////////////////////////////////////////
function reset(){
  Map.clear();
}//resets the map, removing all layers
///////////////////////////////////////////////////////////////
/////////////////////// WIDGET PANEL //////////////////////////
///////////////////////////////////////////////////////////////
//Spacer object//
var spacer = ui.Label('           ');
/* Create UI Panels */
var panel = ui.Panel({style: {width:'300px'}});
ui.root.insert(0,panel);
/* Introduction */
var intro = ui.Label('SAVETREE', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label('Compute temporal trend as a linear regression'+
  ' analysis of a specified spectral index over a specified time period'+
  ' for a specified area of interest using data from the Landsat series of satellites.'+
  ' Defaults to calculate NDMI ending in 2016 at a 5 year interval. Add fire history'+
  ' data to mask those areas of the analysis. Export your layers as TIFF files to analyze outside of Earth'+
  ' Engine. Lastly, click on an area of the new map layer to inspect the changes in the pixel that have occurred'+
  ' in the duration you have specified.');
panel.add(intro).add(subtitle);
//Select buttons for SI and AOI
var selectSI = ui.Select({
  items:['NDMI','NDVI','NDWI','NBR'],
  placeholder:'Select  index',
  value: 'NDMI'}); //defaults to NDMI
var selectAoi = ui.Select({
  items:[LVNP,LNF,BADG,DEVT2,OWN],
  placeholder:'Select area of interest',
  value: 'Lassen Volcanic National Park',//Default
  //onChange: addOwnAOI
  }); 
// Prompt box to input your own asset
function addOwnAOI(aoi) {
  if (areaOfInterest == OWN)
    var ownasset_input = ui.Textbox({
    style: {width:'250px'},
    placeholder: 'users/your_username/asset_name'
      });
    SIAOIpanel.add(ui.Label('Input shapefile'))
              .add(ownasset_input);
}
var selectSIAOI = ui.Label({value:'Select spectral index and area of interest',
style: {fontSize: '18px', fontWeight: 'bold'}});
var SIAOIpanel = ui.Panel();        
SIAOIpanel.add(selectSIAOI)
          .add(ui.Panel([selectSI, selectAoi], ui.Panel.Layout.flow('horizontal')));
panel.add(SIAOIpanel);
var step3 = ui.Label('Or use your own asset as the area of interest (see Readme for how to load assets)');
var inputTextbox = ui.Textbox({
  style: {width:'250px'},
  placeholder: 'users/your_username/asset_name',
  onChange: function(input) {
    var userInput = input;
  }
});
panel.add(step3).add(inputTextbox);
//Select Year and Duration of Time Series //
var durpanel = ui.Panel([ui.Label({
  value:'Select end year and duration of time series',
  style:{fontSize: '18px', fontWeight: 'bold'}})]);
var textboxStyle = ui.Textbox({style: {width:'8px'}});
var selectYr = ui.Textbox({placeholder: 'Year',  value: '2016',
  style: {width: '100px'}}); //defaults to 2016
var selectDur = ui.Textbox({placeholder: 'Duration',  value: '5',
  style: {width: '100px'}}); //defaults to 5 yrs
panel.add(ui.Label());
var datasetRange_label = ui.Label('Since 1984      ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var durRange_label = ui.Label('Recommend 3-5 years',
  {margin: '0 0 0 18px',fontSize: '12px',color: 'gray'});
var durRange_subtext = ui.Panel([
  datasetRange_label, durRange_label],
  ui.Panel.Layout.flow('horizontal'));
var row2 = ui.Panel([selectYr, selectDur],
  ui.Panel.Layout.flow('horizontal'));
durpanel.add(durRange_subtext).add(row2);
panel.add(durpanel);
//Add layers to map//
var addCoef = ui.Button('Add Coefficient Map', applyCoefficient);
var addBiv = ui.Button('Add Bivariate Map', applyBivariate);
panel.add(ui.Panel([addCoef, addBiv], ui.Panel.Layout.flow('horizontal')));
/////////////////////////////////////////////////////////////////////////////////////////
var resetButton = ui.Button('Reset Map', reset);
panel.add(resetButton);
/////////////////////////////////////////////////////////////////////////////////////////
//Create coefficient legend
  function makeLegend(vis) {
    var lon = ee.Image.pixelLonLat().select('longitude');
    var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
    var legendImage = gradient.visualize(vis);
    //Coefficient legend
    var thumb = ui.Thumbnail({
      image: legendImage, 
      params: {bbox:'0,0,100,8', dimensions:'300x15'},  
      style: {position: 'bottom-center'}
    });
    var text = ui.Panel({
      widgets: [
        ui.Label(String('Decline')),
        ui.Label({style: {stretch: 'horizontal'}}),
        ui.Label(String('Stable')),
        ui.Label({style: {stretch: 'horizontal'}}),
        ui.Label(String('Growth')),
      ],
      layout: ui.Panel.Layout.flow('horizontal'),
      style: {
        padding: '0px',
        stretch: 'horizontal',
        fontSize: '12px', 
        color: 'gray',
        textAlign: 'center'
      }
    });
    return ui.Panel({style:{position: 'bottom-left'}})
      .add(text).add(thumb);
  }
  panel.add(makeLegend(LGND));
//Create bivariate Legend
  var viz = ['eff5f5', 'b0d5df', '64acbe', 'e4acac', 
                'ad9ea5', '627f8c', 'c85a5a', '985356', '574249'];
  // Text in legend
  var legendTitle = ui.Label('Bivariate Classification');
  var green = ui.Label('Peak green',
    {margin: '0 0 0 10px',fontSize: '12px',color: 'gray', padding: '10'});
  var healthy = ui.Label('Max health',
    {margin: '0 0 0 30px',fontSize: '12px',color: 'gray', padding: '10'});
  var textTop = ui.Panel([green, healthy], ui.Panel.Layout.flow('horizontal'));
  var wet = ui.Label('Peak moisture',
    {margin: '5px 0 0 60px',fontSize: '12px',color: 'gray'});
  var dry = ui.Label('O',
    {margin: '5px 0 0 20px',fontSize: '12px',color: 'gray'});
  var textBottom = ui.Panel([dry, wet], 
      ui.Panel.Layout.flow('horizontal'));
  panel.add(textTop);
  //Add 9 color boxes
  var makeRow = function(color1, color2, color3) {
    // Create the label that is actually the colored box.
    var colorBox1 = ui.Label({
      style: {
        backgroundColor: '#' + color1,
        padding: '10px',
        margin: '0 0 0 40px'
      }
    });
     var colorBox2 = ui.Label({
      style: {
        backgroundColor: '#' + color2,
        padding: '10px',
        margin: '0 0 0 0'
      }
    });
     var colorBox3 = ui.Label({
      style: {
        backgroundColor: '#' + color3,
        padding: '10px',
        margin: '0 0 0 0'
      }
    });
    return ui.Panel({
      widgets: [colorBox1, colorBox2, colorBox3],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
    for (var i = 2; i > -1; i = i-1) {
      panel.add(makeRow(viz[i], viz[i+3], viz[i+6]));
    }
  panel.add(textBottom);
//FIRE HISTORY//
var firehistoryintro = ui.Panel([
  ui.Label({
    value: 'Fire History',
    style: {fontSize: '18px', fontWeight: 'bold'}
  }),
  ui.Label('Mask known mortality events with fire history layers')
]);
panel.add(spacer).add(firehistoryintro);
//Select start and end year for fire history//
var textboxStyle1 = ui.Textbox({style: {width:'8px'}});
var selectStartYear = ui.Textbox({placeholder: 'Start Year',  value: '1900',
  style: {width: '100px'}}); //defaults to 2016
var selectEndYear = ui.Textbox({placeholder: '  End Year',  value: '2016',
  style: {width: '100px'}}); //defaults to 5 yrs
var startRange_label = ui.Label('Start year',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var endRange_label = ui.Label('End year',
  {margin: '0 0 0 65px',fontSize: '12px',color: 'gray'});
var startRange_subtext = ui.Panel([startRange_label, endRange_label],
  ui.Panel.Layout.flow('horizontal'));
var nextRow = ui.Panel([selectStartYear, selectEndYear],
  ui.Panel.Layout.flow('horizontal'));
panel.add(startRange_subtext).add(nextRow);
//  Select fire history dataset to pull from//
var FRAP = 'FRAP statewide dataset';
var RX = 'Rx fire';
var TREATMENT = 'Other treatment';
var MYFIREDATA = 'Your Asset (below)'
// Point to dataset user has selected
var select_data = ui.Select({
  items: [FRAP,RX,TREATMENT,MYFIREDATA],//option items for first selection
  placeholder: 'Select',
  value: 'FRAP statewide dataset',
});
// Add Widgets to panel
var firepanel = ui.Panel([select_data, (ui.Button('Add Fires to Map',setFireHistoryData))],
  ui.Panel.Layout.flow('horizontal'));
  panel.add(ui.Label('Select fire history dataset')).add(firepanel);
// Option to input own fire history asset or other layer to map
var ownAsset = ui.Label('Or display your own asset on map (see Readme)');
var ownAssetInput = ui.Textbox({
  style: {width:'250px'},
  placeholder: 'users/your_username/asset_name',
  onChange: function(input) {
    var userInput = input;
  }
});
panel.add(ownAsset).add(ownAssetInput);
/* 6. Export image to drive */
//Create mini panel for export items
var exportintro = ui.Panel([
  ui.Label('Export to Drive',{fontSize: '18px', fontWeight: 'bold'}),
  ui.Label('To iniate export, click "Export to Drive" below, drag down code, click "Tasks", and "Run"',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'}),
]);
panel.add(exportintro);
var exportButtonCoef = ui.Button('Export Coefficient Map', exportImages);
var exportButtonBiv = ui.Button('Export Bivariate Map', exportBiv);
panel.add(ui.Panel([exportButtonCoef, exportButtonBiv], ui.Panel.Layout.flow('horizontal')));
// A function to export Coefficient layer to drive
function exportImages(){
  applyCoefficient();
  Export.image.toDrive({
    image: coef,
    description: 'TimeSeriesFor'+ selectAoi.getValue().split(' ').join('') +yr.subtract(dur).getInfo()+
                  '-'+yr.getInfo(),
    fileNamePrefix: yr.subtract(dur).getInfo()+'_'+yr.getInfo()+'_'
                    +SI.getInfo()+'_TREND',
    folder: 'SAVETREE',
    scale: 30,
    region: areaOfInterest,
    skipEmptyTiles: true,
    crs: 'EPSG:3857'
  });
}
//A function to export Bivariate layer to drive
function exportBiv(){ 
  applyBivariate();
  Export.image.toDrive({
    image: bivariate.visualize(BIV),
    description: 'BivariatePlotFor' + selectAoi.getValue().split(' ').join('') + yr.getInfo(),
    fileNamePrefix: yr.getInfo()+'_NDMI_NDVI_Bivariate', 
    folder: 'SAVETREE',
    scale: 30,
    region: areaOfInterest,
    skipEmptyTiles: true,
    crs: 'EPSG:3857'
  });
}
///////////////////////////////////////////////////////////////
/////////////////////MANUAL INSPECTOR TOOL/////////////////////
///////////////////////////////////////////////////////////////
/////MANUAL INSPECTOR TOOL/////
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Change Inspector',
    style: {fontSize: '18px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
// Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
var longitude = ee.Algorithms.String(lon.setValue('lon: ' + coords.lon.toFixed(2)));
// Add a dot for the point clicked on.
var point = ee.Geometry.Point(coords.lon, coords.lat);
var dot = ui.Map.Layer(point, {color: 'FFFFFF'});
Map.layers().set(3, dot);
// Create a chart of the spectral index selected by user.
var indexChart = ui.Chart.image.seriesByRegion(allyr, point,
  ee.Reducer.mean(), SI.getInfo(), 200, 'year');
indexChart.setOptions({
    title: selectAoi.getValue()+ " " + SI.getInfo() + ' over ' + dur.getInfo() + ' years',
    vAxis: {title: SI.getInfo()},//,minValue: -100, maxValue: 1000},
        //this range is +/-1000 because indices are scaled above
    hAxis: {title: 'Date', format: '', gridlines: {count: dur}},
    lineWidth: 1,
    pointSize: 3,
  })
  .setSeriesNames([SI.getInfo()]);
panel.add(indexChart);
});
Map.style().set('cursor', 'crosshair');