/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var sa1 = ee.FeatureCollection("users/shinjita00/SA1_modified_new"),
    GCC = ee.FeatureCollection("users/KaigeWang1/GCCSA_2021_AUST_GDA2020"),
    country = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    sa1_21 = ee.FeatureCollection("projects/ee-kaigewang1/assets/SA1_2021");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/* import variables */
var LST8 = require('users/KaigeWang1/layout:LST8');
var LSTModis = require('users/KaigeWang1/layout:LSTModis');
var NDVISentiel2 = require('users/KaigeWang1/layout:NDVISentiel2');
var NDBISentiel2 = require('users/KaigeWang1/layout:NDBISentiel2');
var currentScriptPath = "https://code.earthengine.google.com/4844c07a102f1077fd6aa06177d037e1?hideCode=true";
var restOfNSW = 
          [[[140.2395167883885, -27.566994538421763],
          [140.2395167883885, -37.857750400634515],
          [159.6633449133885, -37.857750400634515],
          [159.6633449133885, -27.566994538421763]]],
    greaterSydney =
          [[[149.6735094987183, -32.904134687573624],
          [149.6735094987183, -34.52159228228916],
          [151.8927477799683, -34.52159228228916],
          [151.8927477799683, -32.904134687573624]]],
    restOfVic = 
          [[[140.6197552340956, -33.90625011494937],
          [140.6197552340956, -39.38466274002748],
          [150.6612591403456, -39.38466274002748],
          [150.6612591403456, -33.90625011494937]]],
    greaterMelbourne = 
          [[[143.95362712881652, -37.05912520734768],
          [143.95362712881652, -38.67221871186693],
          [146.32667400381652, -38.67221871186693],
          [146.32667400381652, -37.05912520734768]]],
    greaterBrisbane = 
          [[[151.79249505140947, -26.33941026162632],
          [151.79249505140947, -28.484825029959122],
          [153.83595208265947, -28.484825029959122],
          [153.83595208265947, -26.33941026162632]]],
    restOfQld = 
          [[[137.39158357961986, -8.64974078961136],
          [137.39158357961986, -29.633888109026813],
          [155.10154451711986, -29.633888109026813],
          [155.10154451711986, -8.64974078961136]]],
    greaterAdelaide =
          [[[138.27775461635213, -34.460366503929215],
          [138.27775461635213, -35.39710550287931],
          [139.17039377650838, -35.39710550287931],
          [139.17039377650838, -34.460366503929215]]],
    restOfSA = 
          [[[128.45197893085856, -25.69693335807368],
          [128.45197893085856, -38.28644839606245],
          [141.37190080585856, -38.28644839606245],
          [141.37190080585856, -25.69693335807368]]],
    restOfWa =
          [[[112.663630075647, -13.404428494832194],
          [112.663630075647, -35.31185880406928],
          [129.494684763147, -35.31185880406928],
          [129.494684763147, -13.404428494832194]]],
    greaterPerth = 
          [[[115.40829447662115, -31.41751047658142],
          [115.40829447662115, -32.83169253885491],
          [116.45199564849615, -32.83169253885491],
          [116.45199564849615, -31.41751047658142]]],
    greaterHobart = 
          [[[147.01304049480714, -42.63989741316347],
          [147.01304049480714, -43.13494351910402],
          [147.96885104168214, -43.13494351910402],
          [147.96885104168214, -42.63989741316347]]],
    restOfTas =
          [[[143.1156017929764, -39.11070970941378],
          [143.1156017929764, -43.89575273052209],
          [149.4876721054764, -43.89575273052209],
          [149.4876721054764, -39.11070970941378]]],
    greaterDarwin =
          [[[130.66241191358677, -11.920924319054352],
          [130.66241191358677, -12.956204463470554],
          [131.55779765577427, -12.956204463470554],
          [131.55779765577427, -11.920924319054352]]],
    restOfNt = 
          [[[128.15212919043645, -9.924198007854905],
          [128.15212919043645, -26.66585482312928],
          [139.00662137793645, -26.66585482312928],
          [139.00662137793645, -9.924198007854905]]],
    act = 
          [[[148.69450084776585, -35.087538049065415],
          [148.69450084776585, -35.95932030699409],
          [149.44706432432835, -35.95932030699409],
          [149.44706432432835, -35.087538049065415]]],
    other = 
          [[[150.1494985121382, -28.5814709739813],
          [150.1494985121382, -35.7526089750194],
          [168.6504750746382, -35.7526089750194],
          [168.6504750746382, -28.5814709739813]]],
    entireAustralia =
          [[[111.19396201199525, -9.751875774758682],
          [111.19396201199525, -44.181844236458964],
          [155.57872763699524, -44.181844236458964],
          [155.57872763699524, -9.751875774758682]]];
var product = 0, studyarea = 0, startdate = 0, enddate = 0, format = 0, satellite = 0;
var areasDict = {'Greater Sydney':greaterSydney, 
      'Greater Melbourne':greaterMelbourne, 'Greater Brisbane':greaterBrisbane, 
      'Greater Adelaide':greaterAdelaide, 'Greater Perth':greaterPerth,
      'Greater Hobart':greaterHobart, 'Greater Darwin':greaterDarwin,
      'Australian Capital Territory':act,'Rest of NSW': restOfNSW,'Rest of Vic.':restOfVic,'Rest of Qld':restOfQld,
      'Rest of SA':restOfSA,'Rest of WA':restOfWa,'Rest of Tas.':restOfTas,'Rest of NT':restOfNt,'Other Territories':other, 
      'Entire Australia':entireAustralia};
var areas = Object.keys(areasDict);
var tooltipsdict = {
  '0':'https://sites.google.com/view/igee-user-manual',
  '1': 'https://sites.google.com/view/1selectparameters',
  '2': 'https://sites.google.com/view/2selectsatellite',
  '3': 'https://sites.google.com/view/3selectdate',
  '4': 'https://sites.google.com/view/4dataformat',
  '5': 'https://sites.google.com/view/5pre-definedstudyarea',
  '6': 'https://sites.google.com/view/6submit',
}
/* End of import variables */
// ---------------create UI----------------
/* Panel side UI  */
var panel = ui.Panel({style: {width: '400px'}});
// status bar
var newStatusbar = ui.Label({value:'Status:',style:{padding:"5px", width:"93%",color:"rgb(120,120,120)",backgroundColor:'rgba(224, 217, 212, 0.1)', border:"1px solid rgb(210, 210, 210)"}});
var usermanual = ui.Label({value:'Click here for User Manual',
targetUrl:'https://github.com/KaigeWang/public-icon-image/raw/79c7445aca1068b067c594dfd2652f0f7e1c2931/iGEE%20web%20tool%20user%20manual.pdf',
style:{
  color: 'blue',
  textDecoration:'underline'
}
});
// Quick Introduction
var introduction = ui.Label({value:'The iGEE web tool is a cloud-based open-source SaaS application to retrieve and attribute land surface temperature and landcover parameters for the finest administrative areas in Australia.', 
style:{color:"rgb(120,120,120)",
fontSize: '12px'}});
// step 1
var chooseProductL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['1']}),
                               ui.Label({value: '1. Select a parameter to compute:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                               ui.Panel.Layout.flow('horizontal'));
var chooseProduct = ui.Select({items:['Land Surface Temperature (LST)', 'Normalized Difference Vegetation Index (NDVI)', 'Normalized Difference Built-up Index (NDBI)'],onChange: changeProduct});
// step 2
var satelliteL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['2']}), 
                           ui.Label({value: '2. Select a satellite to process:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                           ui.Panel.Layout.flow('horizontal'));
var satelliteOptionForLST = ui.Select({items:['Landsat 8','MODIS'],onChange: changeSatellite});
var satelliteOptionForNDVIorNDBI = ui.Select({items:['Sentinel-2'],onChange: changeSatellite});
hideItem(satelliteL);
hideItem(satelliteOptionForLST);
hideItem(satelliteOptionForNDVIorNDBI);
// step 3
var selectDateL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['3']}), 
                            ui.Label({value: '3. Define dd/mm/yy period to process:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                            ui.Panel.Layout.flow('horizontal'));
var selectDateL_ = ui.Label({value:'Note: For computing LST from Landsat 8 satellite, It is recommended to define the period longer than 4 months, to avoid missing values.', style:{color:"rgb(120,120,120)",fontSize: '12px'}});
var selectStartDate = ui.Panel([ui.Label({value:'Start Date:',style:{fontSize: '12px',fontWeight: 'bold',width:'150px'}}), ui.DateSlider('2000-1-1')], ui.Panel.Layout.flow('horizontal'),{stretch:'both'});
var selectEndDate = ui.Panel([ui.Label({value:'End Date:',style:{fontSize: '12px',fontWeight: 'bold',width:'150px'}}), ui.DateSlider('2000-1-1')], ui.Panel.Layout.flow('horizontal'));
hideItem(selectDateL);
hideItem(selectDateL_);
hideItem(selectStartDate);
hideItem(selectEndDate);
// step 4
var defineFormatL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['4']}), 
                              ui.Label({value: '4. Choose a preferred data format:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                              ui.Panel.Layout.flow('horizontal'));
var defineFormat = ui.Select({items: ['Vector-based CSV','Raster'], onChange: changeFormat});
hideItem(defineFormatL);
hideItem(defineFormat)
// step 5
var defineAreaLText = '';
var defineAreaL_Text = '';
var defineAreaL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['5']}), 
                            ui.Label({value: '5. Choose a pre-defined study area for CSV:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                            ui.Panel.Layout.flow('horizontal'));
var defineAreaL_ = ui.Label({value:'Note: For a large study area, iGEE tool will direct to GEE Code Editor for processing.', style:{color:"rgb(120,120,120)",fontSize: '12px'}});
var defineArea = ui.Select({items: areas, onChange: changeArea});
hideItem(defineAreaL);
hideItem(defineAreaL_);
hideItem(defineArea);
// step 6
var exportbuttonL = ui.Panel([ui.Label({value:'i', style:{fontSize: '13px', fontWeight:'bold', width:'17px',textAlign :'center',color:"white",backgroundColor:'#4888ef',border:'1px solid black'}, targetUrl : tooltipsdict['6']}), 
                              ui.Label({value: '6. Submit request and download result:', style:{fontSize: '16px',fontWeight: 'bold' }})],
                              ui.Panel.Layout.flow('horizontal'));
var urlLabel = ui.Label({value:'Download result', style:{color: '#4888ef', textDecoration:'underline', shown: false}});
var exportbutton = ui.Button({label:'Process request', onClick: submitExport});
var exportbuttonLink = ui.Panel([exportbutton, urlLabel]);
hideItem(exportbuttonL);
hideItem(exportbuttonLink);
// ui.root.insert(0,panel);
panel.add(newStatusbar);
panel.add(introduction);
panel.add(usermanual);
panel.add(chooseProductL);
panel.add(chooseProduct);
panel.add(satelliteL);
panel.add(satelliteOptionForLST);
panel.add(satelliteOptionForNDVIorNDBI);
panel.add(selectDateL);
panel.add(selectDateL_);
panel.add(selectStartDate);
panel.add(selectEndDate);
panel.add(defineFormatL);
panel.add(defineFormat);
panel.add(defineAreaL);
panel.add(defineAreaL_);
panel.add(defineArea);
panel.add(exportbuttonL);
panel.add(exportbuttonLink);
// ---------------end UI----------------
/* End of panel side UI  */
function showItem(item){
  item.style().set('shown', true);
}
function hideItem(item){
  item.style().set('shown', false);
}
function hideALL(){
}
function changeProduct(value){
  if(value == 'Land Surface Temperature (LST)'){
    hideItem(satelliteOptionForNDVIorNDBI);
    showItem(satelliteOptionForLST);
    showItem(satelliteL);
  }
  if(value == 'Normalized Difference Vegetation Index (NDVI)'||value == 'Normalized Difference Built-up Index (NDBI)'){
    hideItem(satelliteOptionForLST);
    showItem(satelliteOptionForNDVIorNDBI);
    showItem(satelliteL);
  }
  product = value;
  // leaveAmessage("change " + product);
}
function changeSatellite(value) {
  showItem(selectDateL);
  showItem(selectDateL_);
  showItem(selectStartDate);
  showItem(selectEndDate);
  showItem(defineFormatL);
  showItem(defineFormat);
  satellite = value;
  // leaveAmessage ("change " + satellite);
}
function changeFormat(value) {
  format = value;
  var exportbuttonLText = '';
  if (value == 'Vector-based CSV'){
    defineAreaLText = '5. Choose a pre-defined study area for CSV:';
    defineAreaL_Text = 'Note: For a large study area, iGEE tool will direct to GEE Code Editor for processing.';
    exportbuttonLText = '6. Submit request and download result:';
  } 
  if (value == 'Raster'){
    defineAreaLText = '5. Choose a pre-defined study area for Raster:';
    defineAreaL_Text = 'Note: iGEE tool will direct to GEE Code Editor for processing.';
    exportbuttonLText = '6. Submit request and save to drive:';
  }
  defineAreaL.widgets().get(1).setValue(defineAreaLText);
  defineAreaL_.setValue(defineAreaL_Text);
  exportbuttonL.widgets().get(1).setValue(exportbuttonLText);
  showItem(defineAreaL);
  showItem(defineAreaL_);
  showItem(defineArea);
}
function changeArea(value) {
  showItem(exportbuttonL);
  showItem(exportbuttonLink);
  studyarea = value;
  // leaveAmessage ("change " + studyarea);
  centerMap(value);
}
function submitExport() {
    refreshMap(studyarea);
    hideItem(urlLabel);
    // hideItem(urlLabel_);
    startdate = selectStartDate.widgets().get(1).getValue()[0];
    enddate = selectEndDate.widgets().get(1).getValue()[0];
    // var interval = Math.abs(startdate - enddate);
    // if (interval < 2678400000 * 3 || interval > 2678400000 * 6){
    //   leaveAmessage('Duration must be over 3 months and less than 6 months!','red');
    //   return
    // }
    function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    // if (month <= 9){
    //   month = '0'+ month;
    // }
    var date = a.getDate();
    // if (date <= 9){
    //   date = '0'+ date;
    // }
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = year + '-' + month + '-' + date;
    return time;
    }
    if (startdate > enddate){
      var temp = startdate;
      startdate = enddate;
      enddate = temp;
    }
    startdate = timeConverter(startdate);
    enddate = timeConverter(enddate);
    print(startdate, enddate);
    if (product === 0 || studyarea === 0 || startdate === 0 || enddate === 0 || satellite === 0|| format === 0) {
      leaveAmessage("Form not completed", 'red');
    } else {
      leaveAmessage("Processing...\nPlease wait!");
      // assgin results
      var productResult = exportURL(product, studyarea, startdate, enddate, satellite);
      var newstudyareaList = (studyarea == 'Entire Australia')? sa1_21 :sa1_21.filterMetadata('GCC_NAME21','equals',studyarea);
      var australia = country.filter(ee.Filter.eq('country_na', 'Australia'));
      // var sa1Bounds = (studyarea == 'Entire Australia')? australia: GCC.filterMetadata('GCC_NAME21','contains',studyarea);
      // print(sa1Bounds);
      // map.addLayer({
      //   eeObject: sa1Bounds,
      //   opacity: 0.3,
      //   name: "The study area's boundary"
      // });
      // /////////// Visualisation of sa1 polygon/////
      var empty = ee.Image().byte();
      var outline = empty.paint({
      featureCollection: newstudyareaList,
      color: 1,
      width: 0
      });
      ///// #678786 //////// colour name
      map.addLayer({eeObject :outline,
        visParams: {palette: '#678786'},
        name: 'Statistical Area Level 1 (SA1) polygons'
      });
      var fileName = studyarea + product + satellite + "From" + startdate + "To" + enddate;
      fileName = fileName.replace(/\s/g, '');
      fileName = fileName.replace('(', '');
      fileName = fileName.replace(')', '');
      if (format == 'Vector-based CSV'){
              // ----------------
        if( studyarea == 'Greater Sydney' ||
            studyarea == 'Greater Melbourne' ||
            studyarea == 'Greater Brisbane' ||
            studyarea == 'Greater Adelaide' ||
            studyarea == 'Greater Perth' ||
            studyarea == 'Greater Hobart' ||
            studyarea == 'Greater Darwin' ||
            studyarea == 'Australian Capital Territory'){
            var mean = productResult.reduceRegions({
              collection: newstudyareaList,
              reducer: ee.Reducer.mean(),
              scale: (satellite == 'Landsat 8' && product == 'Land Surface Temperature (LST)')? 30: 20, //metres
            });
            print(mean.first());
            // async function
            mean.evaluate(function(result){
              print('capital city');
              var url = mean.getDownloadURL({
                format: 'csv',
                selectors: ['GCC_NAME21', 'SA1_CODE21', 'SA2_CODE21', 'SA2_NAME21', 'mean'],
                filename: fileName
              });
              urlLabel.setValue('Download result');
              urlLabel.setUrl(url);
              showItem(urlLabel);
              // var url_ = productResult.getDownloadURL({
              //   params:{
              //     name: fileName,
              //     dimensions:10000,
              //     scale:1000
              //   }
              // });
              // urlLabel_.setValue('Download raster');
              // urlLabel_.setUrl(url_);
              // showItem(urlLabel_);
              leaveAmessage('Successful!');
            });
        }
        else{
             if (studyarea == ' '){
             }
            // Exporting mean csv for each SA1
            print('Bigger area.');
            // var url = "https://code.earthengine.google.com/ef35d89fe82da697618adf8947310ccb?hideCode=true";
            urlLabel.setValue('Process in GEE Code Editor');
            urlLabel.setUrl(currentScriptPath);
            showItem(urlLabel);
            leaveAmessage('Please use the tasks bar to save to your drive!');
            Export.table.toDrive({
              collection: productResult.reduceRegions({
                collection: newstudyareaList,
                reducer: ee.Reducer.mean(),
                scale: (satellite == 'Landsat 8' && product == 'Land Surface Temperature (LST)')? 30: 20, //metres
              }),
              description: 'CSV'+fileName,
              folder: 'csvToDriveExample',
              selectors: ['GCC_NAME21', 'SA1_CODE21', 'SA2_CODE21', 'SA2_NAME21', 'mean'],
              fileFormat: 'csv',
            });
        }
        // -------------------
      } 
      if (format == 'Raster'){
            // var url_ = "https://code.earthengine.google.com/ef35d89fe82da697618adf8947310ccb?hideCode=true";
            urlLabel.setValue('Process in GEE Code Editor');
            urlLabel.setUrl(currentScriptPath);
            showItem(urlLabel);
            leaveAmessage('Please use the tasks bar to save to your drive!');
            var geometry = (studyarea == 'Entire Australia')? australia: GCC.filterMetadata('GCC_NAME21','contains',studyarea);
            if (satellite == 'Landsat 8' && product == 'Land Surface Temperature (LST)'){
              Export.image.toDrive({
                description: 'Raster'+fileName,
                image: productResult,
                folder: 'imageToDriveExample', 
                region: geometry, 
                scale: 30, 
                maxPixels: 1e9, 
                fileFormat: 'GeoTIFF'
              });
            }
            if (satellite == 'MODIS' && product == 'Land Surface Temperature (LST)'){
              Export.image.toDrive({
                description: 'Raster'+fileName,
                image: productResult,
                folder: 'imageToDriveExample', 
                region: geometry, 
                scale: 1000, 
                fileFormat: 'GeoTIFF'
              });
            }
            if (product == 'Normalized Difference Vegetation Index (NDVI)'){
              Export.image.toDrive({
                description: 'Raster'+fileName,
                image: productResult,
                folder: 'imageToDriveExample', 
                region: geometry, 
                scale: 1000, 
                fileFormat: 'GeoTIFF'
              });
            }
            if (product == 'Normalized Difference Built-up Index (NDBI)'){
              Export.image.toDrive({
                description: 'Raster'+fileName,
                image: productResult,
                folder: 'imageToDriveExample', 
                region: geometry, 
                maxPixels : 4860014838, 
                scale: 20, 
                fileFormat: 'GeoTIFF'
              });
            }
      }
    }
  }
  // return url;
function exportURL(product_, studyarea_, startdate_, enddate_, satellite_) {
  // var newstudyareaPloygon = makePolygon(areasDict[studyarea_]);
  var australia = country.filter(ee.Filter.eq('country_na', 'Australia'));
  var newstudyareaPloygon = (studyarea == 'Entire Australia')? australia: GCC.filterMetadata('GCC_NAME21','contains',studyarea);
  var result = null;
  if (product_ == 'Land Surface Temperature (LST)') {
    if (satellite_ == 'Landsat 8'){
      result = LST8.exportURL(newstudyareaPloygon, startdate_, enddate_, map);
    }
    if (satellite_ == 'MODIS'){
      result = LSTModis.exportURL(newstudyareaPloygon,  startdate_, enddate_, map);
    }
  } else if (product_ == 'Normalized Difference Vegetation Index (NDVI)'){
    // if (satellite_ == 'Landsat8'){
    //   // NDVISentiel2.exportURL(newstudyareaPloygon,newstudyareaList,'2020-12-01','2021-02-28');
    // }
    if (satellite_ == 'Sentinel-2'){
      result = NDVISentiel2.exportURL(newstudyareaPloygon, startdate_, enddate_, map);
    }
  } else if (product_ == 'Normalized Difference Built-up Index (NDBI)'){
    // if (satellite_ == 'Landsat 8'){
    //   // NDBISentiel2.exportURL(newstudyareaPloygon,newstudyareaList,'2020-12-01','2021-02-28');
    // }
    if (satellite_ == 'Sentinel-2'){
      result = NDBISentiel2.exportURL(newstudyareaPloygon, startdate_, enddate_, map);
    }
  }
  return result;
}
/* Map side UI*/
var map = ui.Map();
// map.onClick(handleClick);
var panelAndMap = ui.Panel([panel, map], ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Create a title.
var title = ui.Label('iGEE: Mapping and Deriving Land Surface Temperature (LST) and Landcover (NDVI & NDBI) in Australia', {
  stretch: 'horizontal',
  height: '60px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px',
  color: 'ivory',
  backgroundColor: 'LightSlateGray',
  padding: 0, margin:0
});
ui.root.widgets().reset([title, panelAndMap]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// function handleClick(coordinate) {
//   leaveAmessage ("click " + coordinate['lat'] +',' +coordinate['lon']);
// }
var backtoAussie = ui.Button({ 
  label: 'Zoom to Australia',
  onClick: function(){
    map.setLocked(false,5,null);
    centerMap('Entire Australia');
  },
  style: {position: 'top-right', padding:'0px'}
});
refreshMap('Entire Australia');
/* End Map side UI*/
/* helper method */
function makePolygon(cordinates){
  return ee.Geometry.Polygon(cordinates, null, false);
}
function refreshMap(center){
  map.clear();
  map.add(backtoAussie);
  map.setGestureHandling('cooperative');
  map.setLocked(false,4,null);
  if (center){
    centerMap(center);
  }
}
function centerMap(center){
  if(areas.indexOf(center) >= 0){
    map.centerObject(makePolygon(areasDict[center]), calculateZoom(center));
  }else{
    map.centerObject(makePolygon(areasDict['Entire Australia']), calculateZoom(center));
  }
  function calculateZoom(center){
    if (areas.indexOf(center) >= 0 && areas.indexOf(center) <= 7){
      return 8
    } else if (areas.indexOf(center) >= 8 &&  areas.indexOf(center) <= 15 ){
      return 6
    } else {
      return 5
    }
  }
}
function leaveAmessage(message, color){
  newStatusbar.setValue('Status: ' + message);
  if (color){
    newStatusbar.style().set('color', color);
  } else {
    newStatusbar.style().set('color', "rgb(120,120,120)");
  }
}