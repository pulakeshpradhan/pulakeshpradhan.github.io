// Our application will all be contained within this "app" object.
var app = {};
// Tool for measuring lengths in the ui.Map().
Map.setControlVisibility({zoomControl:false});
Map.remove(Map.drawingTools());
var tool = ui.Map.DrawingTools({
                                shape:'line',
                                shown:false
                              });
tool.setDrawModes(['line']);
var measuringTitle = ui.Label('Measure Length Tool',{fontWeight:'bold',
                                              backgroundColor:'F0F8FF'});
var len = ui.Label('Slick length:',{backgroundColor:'F0F8FF'});
// Functions for interacting with the map.
var edit = function(){
  tool.draw();
  var layers = tool.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  tool.getSelected().setColor('red');
};
var stop = function(){
  tool.stop();
};
tool.onDraw(function(){
  var slick = tool.getSelected().toGeometry();
  var derived = slick.length().divide(1000);
  derived.evaluate(
    function(val){
      len.setValue('Slick length: ' + val.toFixed(2) + 'km');
    });
});
var lenPanel = ui.Panel({style:{backgroundColor:'F0F8FF',
                                position:'bottom-right',
                                stretch:'horizontal',
                                border:'2px solid black'}});
var button1 = ui.Button({label:'Click to measure',
                         onClick:edit,
                         style:{stretch:'horizontal',
                         backgroundColor:'F0F8FF'}});
var button2 = ui.Button({label:'Click to stop measuring',
                         onClick:stop,
                         style:{stretch:'horizontal',
                         backgroundColor:'F0F8FF'}});
lenPanel.add(measuringTitle);
lenPanel.add(button1);
lenPanel.add(button2);
lenPanel.add(len);
Map.add(lenPanel);
Map.add(tool.setShown(false));
// Visualization parameters for our datasets / widgets.
var s1Span = {'min':-30,'max':0};
var s2VisParams = {"opacity":1,"bands":["B4","B3","B2"],"min":0,"max":3500,"gamma":1.0};
var red = {color:'800000'};
var blue = {color:'8000ff'};
var darkGreen = {color:'096605'};
var limeGreen = {color:'2fdd27'};
var w = 'ffffff';
var labelParams= {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'071732',padding:'30px 0px 0px 0px'};
// Bring in our image collections. S1A and S1B are loaded in as well, in case there are several
// overlapping scenes that cover one another.
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
                  .select('VV');
// var s1a = ee.ImageCollection('COPERNICUS/S1_GRD')
//                   .filterMetadata('platform_number','equals','A')
//                   .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
//                   .select('VV');
// var s1b = ee.ImageCollection('COPERNICUS/S1_GRD')
//                   .filterMetadata('platform_number','equals','B')
//                   .filter(ee.Filter.listContains('transmitterReceiverPolarisation','VV'))
//                   .select('VV');
var s2 = ee.ImageCollection('COPERNICUS/S2_SR');
// All of these variables are defined now and will be used later.
var start;
var finish;
var verify;
var s1Cov;
var s1Info;
var s1Des;
var s1aCov;
var s1aInfo;
var s1aDes;
var s1bCov;
var s1bInfo;
var s1bDes;
var s2Cov;
var s2Info;
var s2Des;
var ls8Cov;
var insp;
var getOff;
var inspectTitle;
var forJona;
var s1ID;
var s1Time;
var s1Date;
var s2ID;
var s2Time;
var s2Date;
// For warping to a new location on the map. This is most useful for Incident Response.
var long;
var lat;
var zoom;
//For creating date values.
var now = Date.now();
var oneDayAgo = ee.Date(now).advance(-1,'day').format('YYYY-MM-dd');
var today = ee.Date(now).format('YYYY-MM-dd');
// Begin creating ui elements.
// This button will put the inspector back on the map, should you close it out.
var putOn = ui.Button({label:'Add inspector to map',onClick:expand,
style:{fontSize:'8px', width:'172px', padding:'0px 0px 0px 46px',
       stretch:'both', whiteSpace:'pre', textAlign:'center',
       position:'top-center', backgroundColor:'071732'}});
// Bring in the logo for the panel
// var skytruthLogo = ee.Image('users/skytruth-data/skytruth_logo_instagram_modified');
// var logo = ui.Thumbnail
// ({
  // image:skytruthLogo,
  // params:{bands:['b1','b2','b3'],min:0,max:255},
  // style:{width:'107px',height:'90px',padding:'0px 0px 0px 14px',backgroundColor:'071732'}
// });
// Make all of the widgets for the side panel.
var begin = ui.Textbox({value:oneDayAgo.evaluate(function(val){begin.setValue(val)}),
            style:{textAlign:'center',padding: '0px 0px 0px 60px',width:'150px',backgroundColor:'071732'}});
var end = ui.Textbox({value:today.evaluate(function(val){end.setValue(val)}),
            style:{textAlign:'center',padding: '0px 0px 0px 60px',width:'150px',backgroundColor:'071732'}});
var apply = ui.Button({label:'Apply Parameters',onClick:addScenes,
            style:{padding: '0px 0px 0px 54px',width:'157px',backgroundColor:'071732'}});
var check = ui.Checkbox({label:'Filter coverage by map bounds?',value:false,
            style:{stretch:'horizontal',color:w,textAlign:'center',backgroundColor:'071732',padding:'30px 0px 0px 0px'}});
// Here, we begin by creating three panels which will eventually be added to "app".
// We need three panels, because we want to be able to adaptively change some of the widgets on the full side panel.
// app.logoPanel = function(){
//   app.logo = {panel:ui.Panel({
//     widgets:[logo],
//     style:{padding:'0px 0px 0px 54px',width:'240px',backgroundColor:'071732'}
//   })};};
app.panel1 = function(){
  app.content1 = {panel:ui.Panel({
    widgets:
    [
    ui.Label('SkyTruth Rapid Response Image Coverage',
      {stretch:'horizontal',color:w,fontSize:'16px',textAlign:'center',backgroundColor:'071732',
       padding:'10px 0px 0px 0px'
      }),
    ui.Label('*Note: Try to avoid using large date ranges with the map bounds filter unchecked!',
      {stretch:'horizontal',color:w,fontSize:'10px',textAlign:'center',backgroundColor:'071732'}),
    ui.Label('*Note: Sentinel-2 Imagery / Image Coverage will take significantly longer to load on to the map than other image collections.',
      {stretch:'horizontal',color:w,fontSize:'10px',textAlign:'center',backgroundColor:'071732'}),
    ui.Label('Enter the beginning date here...',
      {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'071732',padding:'30px 0px 0px 0px'}),
    begin,
    ui.Label('Enter the end date here...',
      {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'071732'}),
    end,
    check,
    apply,
    ui.Label('If you\'d like to zoom to a location, enter the coordinates below...',
      {stretch:'horizontal',color:w,fontSize:'12px',textAlign:'center',backgroundColor:'071732',padding:'10px 0px 0px 0px'}),
    // For traveling to a Lat and Long
    ui.Label('Longitude',{stretch:'horizontal',color:w,fontSize:'14px',textAlign:'center',backgroundColor:'071732',padding:'0px 0px 0px 0px'}),
    long = ui.Textbox({placeholder:'Enter long here',style:{backgroundColor:'071732',padding:'0px 0px 0px 50px',width:'160px'}}),
    ui.Label('Latitude',{stretch:'horizontal',color:w,fontSize:'14px',textAlign:'center',backgroundColor:'071732',padding:'0px 0px 0px 0px'}),
    lat = ui.Textbox({placeholder:'Enter lat here',style:{backgroundColor:'071732',padding:'0px 0px 0px 50px',width:'160px'}}),
    zoom = ui.Button({label:'Go to location',onClick:changeZoom,disabled:false,
      style:{padding:'0px 0px 0px 63px',backgroundColor:'071732'}})
    ],
    style:{width:'240px',backgroundColor:'#071732'}})}};
app.panel2 = function(){
  app.content2 = {panel:ui.Panel({
    widgets:
    [],
    style:{width:'240px',backgroundColor:'#071732'}})}};
// Callback functions for changing location.
function changeZoom(){
  return Map.setCenter(Number(long.getValue()),Number(lat.getValue()),12);
}
Map.onClick(function(coords){
  long.setValue(coords.lon);
  lat.setValue(coords.lat);
});
// For adding and removing the inspector from the map.
function minimize(but){
  Map.remove(insp);
  app.content2.panel.add(putOn);
}
function expand(but){
  Map.add(insp);
  app.content2.panel.remove(putOn);
}
// Here is where we add imagery to the map below.
function addScenes(){
  // Check if "Filter coverage by map bounds?" is checked.
  verify = check.getValue();
  // If YES...
  if(verify !== null && verify === true){
    app.content2.panel.clear();
    Map.clear();
    var poly = Map.getBounds();
    var bounds = ee.Geometry.Rectangle(poly);
    // Add the map bounds, in case user wants to visualize their filter.
    Map.addLayer(bounds,{color:'grey'},'Map Bounds',false);
    // Get our dates.
    start = begin.getValue();
    finish = end.getValue();
    s1Info = s1.filterDate(start,finish).filterBounds(bounds);
    // s1Cov = ((s1Info).geometry()).dissolve();
    // Shows how many S1 images are loaded on the map given the defined filters.
    s1Des = ui.Label((s1Info.size()).evaluate(function(val){s1Des.setValue('Sentinel-1 Images: '+val)}),labelParams); 
    Map.addLayer(s1Info.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1 Images (Ascending)',false);
    Map.addLayer(s1Info.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1 Images (Descending)',false);
    app.content2.panel.add(s1Des);
    // Split by senssor, in case there is scene overlap.
    // s1aInfo = s1a.filterDate(start,finish).filterBounds(bounds);
    // Map.addLayer(s1aInfo.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1A Images (Ascending)',false);
    // Map.addLayer(s1aInfo.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1A Images (Descending)',false);
    // s1bInfo = s1b.filterDate(start,finish).filterBounds(bounds);
    // Map.addLayer(s1bInfo.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1B Images (Ascending)',false);
    // Map.addLayer(s1bInfo.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1B Images (Descending)',false);
    s2Info = s2.filterDate(start,finish).filterBounds(bounds);
    // s2Cov = ((s2Info).geometry()).dissolve();
    // Shows how many S2 images are loaded on the map given the defined filters.
    s2Des = ui.Label((s2Info.size()).evaluate(function(val){s2Des.setValue('Sentinel-2 Images: '+val)}),labelParams);
    // Split by sensor, in case of image overlap.
    Map.addLayer(s2Info.filterMetadata('SPACECRAFT_NAME','equals','Sentinel-2A'),s2VisParams,'S2A Images',false);
    Map.addLayer(s2Info.filterMetadata('SPACECRAFT_NAME','equals','Sentinel-2B'),s2VisParams,'S2B Images',false);
    app.content2.panel.add(s2Des);
    // Map.addLayer(s1Cov,red,'Sentinel-1',false);
    // Map.addLayer(s2Cov,blue,'Sentinel-2',false);
    // Create the inspector which will live on the map itself.
    insp = ui.Panel({style:{width:'250px',position:'bottom-left',backgroundColor:'F0F8FF',border:'2px solid black'}});
    // All of the widgets for "insp".
    getOff = ui.Button({label:'x',onClick:minimize});
    inspectTitle = ui.Label('Scene Inspector',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'14px',fontWeight:'bold'});
    s1ID = ui.Textbox({placeholder:'Nothing yet...',style:{backgroundColor:'F0F8FF',textAlign:'center',width:'200px',border:'2px solid black'}});
    s1Time = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s1Date = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s2ID = ui.Textbox({placeholder:'Nothing yet...',style:{backgroundColor:'F0F8FF',textAlign:'center',width:'200px',border:'2px solid black'}});
    s2Time = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s2Date = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    insp.add(getOff);
    insp.add(inspectTitle);
    insp.add(ui.Label('Click anywhere on the map to get the ID of the top-most image...',{backgroundColor:'F0F8FF',textAlign:'center'}));
    Map.add(insp);
    Map.remove(Map.drawingTools());
    Map.add(lenPanel);
    Map.add(tool.setShown(false));
    // When the map is clicked, this will be triggered.
    Map.onClick(function(coords)
    {
      insp.clear();
      long.setValue(coords.lon);
      lat.setValue(coords.lat);
      // Create a point at derived lat and long.
      var pt = ee.Geometry.Point(coords.lon,coords.lat);
      // This layer list will be used for the S1/S2 image IDs.
      var layers = Map.layers();
      layers.forEach(
        function(ds){
          var coll = ee.ImageCollection(ds.get('eeObject'));
          var identifier = coll.geometry();
          // Is it currently being shown on the map?
          var shown = ds.get('shown');
          if(shown === true){
            // Filter the image collection to our derived point.
            var imList = ee.List(coll.filterBounds(pt).toList(coll.size()));
            var listLength = ee.Number(imList.length());
            // If the list has nothing in it, pass to the end.
            // Otherwise, grab the name of the most recent image in the stack.
            var nameTest = ee.Algorithms.If({
              condition:listLength.gt(0),
              trueCase:ee.Image(imList.get(-1)).get('system:id'),
              falseCase:null
            });
            // Evaluate called on the name, in order to draw information from it.
            // This info will be added to our inspector.
            nameTest = nameTest.evaluate(function(val){
                if (val !== null){
                  // Have to cast it back to an image, because .get() makes it a computedValue.
                  val = ee.Image(val);
                  var index = ee.String(val.get('system:index'));
                  var s2Check = ee.Algorithms.If({
                    // If first two elements of string are not equal to 'S1', it must be 'S2'.
                    condition:ee.Number(index.slice(0,2).compareTo('S1')).neq(0),
                    // This will be an S2 image ID.
                    trueCase:ee.Image(val).get('PRODUCT_ID'),
                    // This will be an S1 image ID.
                    falseCase:ee.Image(val).get('system:index'),
                  });
                  // Cast s2Check to a string so we can evaluate.
                  s2Check = ee.String(s2Check).evaluate(
                    function(productId){
                      if(productId.slice(0,2) === 'S2')
                      {
                        s2ID.setValue(productId);
                        s2Date.setValue('S2 acquisition date: '+productId.slice(11,19));
                        s2Time.setValue('S2 acquisition time: '+productId.slice(54,60)+' UTC');
                      }
                      else if(productId.slice(0,2) === 'S1')
                      {
                        s1ID.setValue(productId);
                        s1Date.setValue('S1 acquisition date: '+productId.slice(17,25));
                        s1Time.setValue('S1 acquisition time: '+productId.slice(26,32)+' UTC');
                      }
                    });
                }
            });
          }
          // If there's no images shown where the derived point is created, reset all of that
          // constellation's entries on the inspector tool.
          else{
            var nameCond = ee.Number(ee.String(coll.get('system:id')).compareTo('S2')).neq(0);
            var imgId = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2ID.setValue('No visible imagery...'),
              falseCase: s1ID.setValue('No visible imagery...')
            });
            var dateLabel = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2Date.setValue('S2 acquisition date: '),
              falseCase: s1Date.setValue('S1 acquisition date: ')
            });
            var timeLabel = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2Time.setValue('S2 acquisition time: '),
              falseCase: s1Time.setValue('S1 acquisition time: ')
            });
          }
        });
      // Add of our widgets to the inspector.
      insp.add(getOff);
      insp.add(inspectTitle);
      insp.add(ui.Label('Longitude: '+coords.lon.toFixed(4)),{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
      insp.add(ui.Label('Latitude: '+coords.lat.toFixed(4)),{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
      insp.add(ui.Label('============================',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px',fontWeight:'bold'}));
      insp.add(ui.Label('Selected Sentinel-1 image:',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'}));
      insp.add(s1ID);
      insp.add(s1Date);
      insp.add(s1Time);
      insp.add(ui.Label('============================',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px',fontWeight:'bold'}));
      insp.add(ui.Label('Selected Sentinel-2 image:',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'}));
      insp.add(s2ID);
      insp.add(s2Date);
      insp.add(s2Time);
      insp.add(ui.Label('Download imagery from Copernicus using ID',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'},
                        'https://scihub.copernicus.eu/dhus/#/home'));
    });
  }
  // No boundary filter set, so loads in all imagery across the world. Be careful with this!
  else{
    app.content2.panel.clear();
    Map.clear();
    Map.setCenter(-2.31,2.38,5);
    start = begin.getValue();
    finish = end.getValue();
    s1Info = s1.filterDate(start,finish);
    // s1Cov = ((s1Info).geometry()).dissolve();
    s1Des = ui.Label((s1Info.size()).evaluate(function(val){s1Des.setValue('Sentinel-1 Images: '+val)}),labelParams);
    Map.addLayer(s1Info.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1 Images (Ascending)',false);
    Map.addLayer(s1Info.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1 Images (Descending)',false);
    app.content2.panel.add(s1Des);
    // s1aInfo = s1a.filterDate(start,finish);
    // Map.addLayer(s1aInfo.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1A Images (Ascending)',false);
    // Map.addLayer(s1aInfo.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1A Images (Descending)',false);
    // s1bInfo = s1b.filterDate(start,finish);
    // Map.addLayer(s1bInfo.filterMetadata('orbitProperties_pass','equals','ASCENDING'),s1Span,'S1B Images (Ascending)',false);
    // Map.addLayer(s1bInfo.filterMetadata('orbitProperties_pass','equals','DESCENDING'),s1Span,'S1B Images (Descending)',false);
    s2Info = s2.filterDate(start,finish);
    // s2Cov = ((s2Info).geometry()).dissolve();
    s2Des = ui.Label((s2Info.size()).evaluate(function(val){s2Des.setValue('Sentinel-2 Images: '+val)}),labelParams);
    Map.addLayer(s2Info.filterMetadata('SPACECRAFT_NAME','equals','Sentinel-2A'),s2VisParams,'S2A Images',false);
    Map.addLayer(s2Info.filterMetadata('SPACECRAFT_NAME','equals','Sentinel-2B'),s2VisParams,'S2B Images',false);
    app.content2.panel.add(s2Des);
    // Map.addLayer(s1Cov,red,'Sentinel-1',false);
    // Map.addLayer(s2Cov,blue,'Sentinel-2',false);
    insp = ui.Panel({style:{width:'250px',position:'bottom-left',backgroundColor:'F0F8FF',border:'2px solid black'}});
    getOff = ui.Button({label:'x',onClick:minimize});
    inspectTitle = ui.Label('Scene Inspector',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'14px',fontWeight:'bold'});
    s1ID = ui.Textbox({placeholder:'Nothing yet...',style:{backgroundColor:'F0F8FF',textAlign:'center',width:'200px',border:'2px solid black'}});
    s1Time = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s1Date = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s2ID = ui.Textbox({placeholder:'Nothing yet...',style:{backgroundColor:'F0F8FF',textAlign:'center',width:'200px',border:'2px solid black'}});
    s2Time = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    s2Date = ui.Label('',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
    insp.add(getOff);
    insp.add(inspectTitle);
    insp.add(ui.Label('Click anywhere on the map to get the ID of the top-most image...',{backgroundColor:'F0F8FF',textAlign:'center'}));
    Map.add(insp);
    Map.remove(Map.drawingTools());
    Map.add(lenPanel);
    Map.add(tool.setShown(false));
    Map.onClick(function(coords)
    {
      insp.clear();
      long.setValue(coords.lon);
      lat.setValue(coords.lat);
      // Create a point at derived lat and long.
      var pt = ee.Geometry.Point(coords.lon,coords.lat);
      // This layer list will be used for the S1/S2 image IDs.
      var layers = Map.layers();
      layers.forEach(
        function(ds){
          var coll = ee.ImageCollection(ds.get('eeObject'));
          var identifier = coll.geometry();
          // Is it currently being shown on the map?
          var shown = ds.get('shown');
          if(shown === true){
            // Filter the image collection to our derived point.
            var imList = ee.List(coll.filterBounds(pt).toList(coll.size()));
            var listLength = ee.Number(imList.length());
            // If the list has nothing in it, pass to the end.
            // Otherwise, grab the name of the most recent image in the stack.
            var nameTest = ee.Algorithms.If({
              condition:listLength.gt(0),
              trueCase:ee.Image(imList.get(-1)).get('system:id'),
              falseCase:null
            });
            // Evaluate called on the name, in order to draw information from it.
            // This info will be added to our inspector.
            nameTest = nameTest.evaluate(function(val){
                if (val !== null){
                  // Have to cast it back to an image, because .get() makes it a computedValue.
                  val = ee.Image(val);
                  var index = ee.String(val.get('system:index'));
                  var s2Check = ee.Algorithms.If({
                    // If first two elements of string are not equal to 'S1', it must be 'S2'.
                    condition:ee.Number(index.slice(0,2).compareTo('S1')).neq(0),
                    // This will be an S2 image ID.
                    trueCase:ee.Image(val).get('PRODUCT_ID'),
                    // This will be an S1 image ID.
                    falseCase:ee.Image(val).get('system:index'),
                  });
                  // Cast s2Check to a string so we can evaluate.
                  s2Check = ee.String(s2Check).evaluate(
                    function(productId){
                      if(productId.slice(0,2) === 'S2')
                      {
                        s2ID.setValue(productId);
                        s2Date.setValue('S2 acquisition date: '+productId.slice(11,19));
                        s2Time.setValue('S2 acquisition time: '+productId.slice(54,60)+' UTC');
                      }
                      else if(productId.slice(0,2) === 'S1')
                      {
                        s1ID.setValue(productId);
                        s1Date.setValue('S1 acquisition date: '+productId.slice(17,25));
                        s1Time.setValue('S1 acquisition time: '+productId.slice(26,32)+' UTC');
                      }
                    });
                }
            });
          }
          // If there's no images shown where the derived point is created, reset all of that
          // constellation's entries on the inspector tool.
          else{
            var nameCond = ee.Number(ee.String(coll.get('system:id')).compareTo('S2')).neq(0);
            var imgId = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2ID.setValue('No visible imagery...'),
              falseCase: s1ID.setValue('No visible imagery...')
            });
            var dateLabel = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2Date.setValue('S2 acquisition date: '),
              falseCase: s1Date.setValue('S1 acquisition date: ')
            });
            var timeLabel = ee.Algorithms.If({
              condition:nameCond,
              trueCase: s2Time.setValue('S2 acquisition time: '),
              falseCase: s1Time.setValue('S1 acquisition time: ')
            });
          }
        });
      // Add of our widgets to the inspector.
      insp.add(getOff);
      insp.add(inspectTitle);
      insp.add(ui.Label('Longitude: '+coords.lon.toFixed(4)),{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
      insp.add(ui.Label('Latitude: '+coords.lat.toFixed(4)),{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'});
      insp.add(ui.Label('============================',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px',fontWeight:'bold'}));
      insp.add(ui.Label('Selected Sentinel-1 image:',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'}));
      insp.add(s1ID);
      insp.add(s1Date);
      insp.add(s1Time);
      insp.add(ui.Label('============================',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px',fontWeight:'bold'}));
      insp.add(ui.Label('Selected Sentinel-2 image:',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'}));
      insp.add(s2ID);
      insp.add(s2Date);
      insp.add(s2Time);
      insp.add(ui.Label('Download imagery from Copernicus using ID',{backgroundColor:'F0F8FF',textAlign:'center',fontSize:'12px'},      
                        'https://scihub.copernicus.eu/dhus/#/home'));
    });
}
}
// This is the final creation step of our application.
// We write a function that initializes our panel and all of its products.
app.boot = function(){
  // app.logoPanel();
  app.panel2();
  app.panel1();
  var main = ui.Panel({
    widgets:[app.content1.panel,app.content2.panel],
    style:{width:'240px',backgroundColor:'071732'}
  });
  ui.root.insert(0,main);
};
// Make it!
app.boot();