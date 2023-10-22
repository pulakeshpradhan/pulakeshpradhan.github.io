var soiltaxa = ui.import && ui.import("soiltaxa", "image", {
      "id": "users/CharlieBettigole/TAXOUSDA_250m"
    }) || ee.Image("users/CharlieBettigole/TAXOUSDA_250m"),
    srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    srtm90 = ui.import && ui.import("srtm90", "image", {
      "id": "CGIAR/SRTM90_V4"
    }) || ee.Image("CGIAR/SRTM90_V4");
//Stratifi: GEE Application for stratification of agricultural 
//            landscapes for soil carbon sampling
//GLOBAL VERSION
/////Updated January 10th 2023/////
//** Corresponding Author: Charlie Bettigole - cbettigo@skidmore.edu
//** Co-authors: Sabrina Szeto | Steve Wood | Kris Covey | Dan Kane
//TABLE OF CONTENTS:
// Section 1 - Stratifi Function {
    // 1.1 Add Loading tab
    // 1.2 Add shapes
    // 1.3 Rename Bands
    // 1.4 Normalization 
    // 1.5 Cluster Variables
    // 1.6 Convert to Vector
    // 1.7 Points/Acre
    // 1.8 Random List
    // 1.9 Random Sample
    // 1.10 Chart Strata
    // 1.11 Export Functions //}
// Section 2 - App Widgets {
    // 2.1 Main Panel
    // 2.2 Checkboxes
    // 2.3 Labels/Boxes
    // 2.4 Polygon Drawing
    // 2.5 Sub-panels
    // 2.6 Adding widgets to main //}
// Section 3 - Layer Visualization
// Section 4 - Map Prep { 
    //4.1 Layer Prep
    //4.2 Set Map Options //}
// shift+click the arrow to the left (or that of any Section header) to close all layers and sub layers{
// Section 1 - Stratifi Function {
var runstrat = function () {
// 1.1 Add Loading tab to the application {
Map.add(inspector);
  inspector.clear()
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
//}
// 1.2 Add User Definied/JSON shape into function {
if (regselect.getValue() == "User Defined Polygon") {var region = Map.drawingTools().layers().get(0).toGeometry()}
if (regselect.getValue() == "Fusion Table") {var region = ee.FeatureCollection('ft:'+ftinput.getValue()).geometry()}
if (regselect.getValue() == "GeoJSON"){
      var textval1 = gjinput.getValue() //Extract value from textbox
      var textval = ee.String(textval1).replace(',0','','g') //Cast to server side
      var split = textval.split('coordinates":','g') //split text at the word 'coordinates:'
      var split1 = split.slice({start:1})//remove the first bit of text before first set of coordinates
      //Function to extract coordinate information as String and parse into geometry    
        var mapGeom = split1.map(function (objGeo) {
          var splitter = ee.String(objGeo) //cast to string
          var closedIndex = splitter.rindex(']]]');//search for end of coordinate list
          var tester1 = splitter.slice(0,closedIndex).cat(']]]')//slice coordinate string text and add on brackets
          var tester = tester1.decodeJSON()//convert from string to JSON
        return tester
        })
      var region = ee.Geometry.MultiPolygon(mapGeom)
  }
if(regselect.getValue()=='GEE Asset'){
          var textval1 = geinput.getValue() //Extract value from textbox
          var assetText = textval1
          var region = ee.FeatureCollection(assetText).geometry()
          }
var slopenum = ee.Number.parse(slopeFilter.getValue())
var slopemask = allProducts.select('slope').lt(slopenum)
Map.layers().reset();
Map.drawingTools().layers().reset()
//}
var lister = [];
// 1.3 Function to rename band names to prioritize kmeans clustering {
  //First band name is weighted heavier than others
    var reName = function (layer,noCap) {var reName = layer.rename(noCap)
      lister.push(reName)  
    }
    if (ndvicheck.getValue() === true) {reName(ndvi,'ndvi')}
    // if (ndwicheck.getValue() === true) {reName(ndwi,'ndwi')}
    // if (ndsicheck.getValue() === true) {reName(ndsi,'ndsi')}
    if (ndviModcheck.getValue() === true) {reName(ndviMod,'ndviMod')}
    if (elevcheck.getValue() === true) {reName(elevation,'elevation')}
    if (slopecheck.getValue() === true) {reName(slope,'slope')}
    if (aspectcheck.getValue() === true) {reName(aspect,'aspect')}
    if (claycheck.getValue() === true) {reName(clay,'clay')}
    if (carbcheck.getValue() === true) {reName(carb,'carb')}
    // if (taxacheck.getValue() === true) {reName(soiltaxa,'soiltaxa')}
    // if (ssurgocheck.getValue() === true) {reName(gssurgo,'gssurgo')}
    // if (nlcdcheck.getValue()=== true) {reName(nlcd,'nlcd')}
//OPTION TO ADD IN A BUFFER LAYER FOR NORMALIZATION BEYOND PROPERTY BOUNDS
var normBuff = region//.buffer(100000)
var inputer = ee.Image(lister[0]).addBands(lister.slice(1))
                .mask(slopemask)
                .clip(normBuff); //Automatically add in bands
//}
//Hmmm....maybe use unitScale instead of all this?
// 1.4 Calculate min/max and normalize all bands from 0 to 1 for Kmeans clustering {
var maxImg = inputer.reduceRegion({reducer:ee.Reducer.max(), geometry:normBuff,scale:90,maxPixels:1e13})//.get('elevation');
var minImg = inputer.reduceRegion({reducer:ee.Reducer.min(), geometry:normBuff,scale:90,maxPixels:1e13})//.get('elevation');
var varList = ee.List(maxImg.keys())
var keysMapImgCol = ee.ImageCollection(varList.map(function(label){
    var max = ee.Image.constant(maxImg.get(label))
    var min = ee.Image.constant(minImg.get(label))
      var minMax =  ee.Image(0).expression(
        '((img - min) / (max - min))', {
          'img': inputer.select([label]),
          'max': max,
          'min': min
        })
    return(minMax.rename([label]))    
    }))
var keysMap = keysMapImgCol
                .toBands()
                .rename(varList)
                .clip(region) //After normalization clip back to region
var stratN = strataBox.getValue()
//define palette based on stratN
  var palette = palettes.colorbrewer.Paired[stratN];
var clusterTestK = function(data){
 var training = data.sample({region: region,scale:30,numPixels:5000}) //create training data
  var clusterers = ee.Clusterer.wekaKMeans({nClusters:stratN}); //Set the desired clusterer (Weka X Means here)
  var clusterer = clusterers.train(training);  //Train clusterer
  var result = data.cluster(clusterer); //Run clusterer on re-ordered input variables
  return result
}
var result = clusterTestK(inputer).clip(region)
////End Clustering Area////}
// 1.6 Convert to vector and add to map {
  // sets scale to 500m if region is larger than a threshold
var regionArea = region.area({maxError:10})
var scaler = ee.Algorithms.If(regionArea.gt(2e7),500,60)
print(scaler,regionArea,'regionarea')
var resultvect = result.reduceToVectors({scale:scaler,eightConnected:false,maxPixels:1e13})  
// This chunk dissolves the output from resultvect
var propVals = ee.List(resultvect.aggregate_array('label')).distinct();
// then make a feature the union of all features having the same propVal
var resultvectDissolve = ee.FeatureCollection(propVals.map(function(propVal){
  var tempFC = resultvect.filter(ee.Filter.eq('label', propVal));
  var unionFC = tempFC.union({maxError:10}); // specifying a max error overcomes issues with features of diff projection
  // cast the featureCollection (output union()) to a single feature
  return ee.Feature(unionFC.first()).set('label', propVal);
  }));  
print(resultvectDissolve)
  // Map.addLayer(resultvect)
  // TURN THIS INTO AN EVALUATE FUNCTION FOR SAMPOINTFUN SO WE CAN HAVE A LOADING TAB!
  Map.centerObject(region,13)
  result.evaluate(function(){
    Map.addLayer(result.clip(region),{palette:palette,min:0,max:(stratN-1),opacity:0.5},"Similar Classes",true)});
//}
// 1.7 Calculate points by acre vs. total points {
var numstot = ee.Number.parse(numpointstext.getValue()) //change this to total points per property
var areavect = resultvect.geometry().area({maxError:10})
var areaacre = areavect.multiply(0.000247105)
var numsacre = areaacre.divide(numstot).round()
if (numpointsopt.getValue() == 'Acres per Sample') {
var nums = numsacre
}
else {var nums = numstot}
//}
// 1.8 Create a random list{
var rando = ee.FeatureCollection(region).randomColumn('random',1)
var rando1 = ee.Number(rando.first().get('random')).multiply(10000).round()
randlist.push(rando1)
var rando2 = ee.Number(randlist[-0]).divide(ee.List(randlist).length()).round()
//}
// 1.9 Randomly sample by strata {
var edgeDist = -10
var numclust = result.reduceRegion(
                  {reducer:ee.Reducer.max(),
                    geometry:region,scale:30,maxPixels:1e13}).get('cluster')//.keys()
var clustList = ee.List.sequence({start:0,end:numclust})
//Generate a set of points for each strata based on area
////// FIX THIS SO IT HAPPENS WITHIN EACH RASTER!!!!///////////////
var samPointFun = ee.FeatureCollection(clustList.map(function(strata){
    var cluStrArea = resultvect.filterMetadata('label','equals',strata).geometry()
    var clustemp = ee.Number(cluStrArea
                                .area({maxError:10})
                                .divide(areavect)
                                .multiply(nums)
                                .round())
    var sampoints = ee.FeatureCollection.randomPoints({region:cluStrArea.buffer(edgeDist),points:clustemp,seed:rando2}) //Buffer here, not above
    var sampointsmap = sampoints.map(function(feat){return feat.set('strata',strata)})
    return sampointsmap
  })).flatten()
//}
// 1.10 Chart mean estimates of covariates for each strata {
var clustMeanVar = clustList.map(function(strata){
    var cluStrArea = resultvect.filterMetadata('label','equals',strata).geometry()
    var cluReducer = keysMap.reduceRegion({geometry:cluStrArea,reducer:ee.Reducer.mean(),scale:90,maxPixels:1e13})
    return cluReducer
})
// Map.addLayer(resultvect.filterMetadata('label','equals',0).geometry())
    var clustArrayList = clustMeanVar.map(function(item){return ee.Dictionary(item).toArray()})
    var hTitles = clustList.map(function(item){return ee.String(ee.Number(item).toInt())})
print(resultvect,'resultvect')
    // var charter = ui.Chart.array.values(clustArrayList,0,hTitles)
    //                             .setChartType('ColumnChart')
    //                             .setOptions({
    //                             hAxis: {'title':'Strata',},
    //                             vAxis: {'title':'Normalized Covariate Value'}
    //                             })
    //                             .setSeriesNames(varList)
    var charter = ui.Chart.image.byRegion({
      image:keysMap,
      regions:resultvectDissolve,
      reducer:ee.Reducer.mean(),
      scale:scaler
      // xProperty:'label'
    })
    .setChartType('ColumnChart')
    .setOptions({
            hAxis: {'title':'Strata',},
            vAxis: {'title':'Normalized Covariate Value'}
            })
//}
// 1.11 Export functions {
// Convert lat long points to geometry object:
var samplePoints = samPointFun.map(function(feat){
  var long = feat.geometry().coordinates().get(0);
  var lat = feat.geometry().coordinates().get(1);
  // var id = ee.Number.parse(point.id()).add(1);  //So that the list of IDs starts with 1, not 0
  return feat.set({'longitude':long,'latitude':lat});
});
  samPointFun.evaluate(function(){
    Map.addLayer(samPointFun,{color:"white"},"Stratified, equal area samples",true)
    Map.remove(inspector)
  });
panel1.clear()
areaFilter.clear()
goFilter.clear()
  panel1.add(stratitle)
        .add(ui.Label({value:"Select Input Layers",style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}))
        .add(lsFilter)
        .add(soilFilter)
        .add(physFilter)
        .add(slopebigFilter)
        .add(areaFilter2)
        .add(goFilter2)
        .add(charter)
 var exportimagefun = function () {
              var urlimgget = result.clip(region).getDownloadURL({
                      // region: JSON.stringify(region.bounds().getInfo()),
                      name: 'Stratifi_Map', 
                      crs: 'EPSG:4326', 
                      scale: 250 })
              var urltableget = samplePoints.getDownloadURL({
                      filename: 'Stratifi_Points',
                      format: 'kml',
                      selectors: ['strata','latitude','longitude']
                      })
          var linkText = ui.Label({value:'Download Data: ',style:{fontWeight:'bold',color:'black',fontSize:'14px'}})
          var link1 = ui.Label({value:'Points  ',style:{fontWeight:'bold',color:'blue',fontSize:'14px'}}).setUrl(urltableget)
          var link2 = ui.Label({value:'Strata',style:{fontWeight:'bold',color:'blue',fontSize:'14px'}}).setUrl(urlimgget)
          var linkPanel = ui.Panel([linkText,link2,link1],ui.Panel.Layout.Flow('horizontal'));
          panel1.add(linkPanel).add(ui.Label({value:'Refresh page to run another analysis',style:{color:'salmon',fontSize:'12px',fontWeight:'bold'}}))
              }
exportimagefun()
//}
///Add a legend{
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Strata',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0',
    }
});
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name){ 
  var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label and description text.
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
var names = ee.List.sequence(0,stratN-1,1).getInfo();
print(names)
for (var i = 0; i < stratN; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
Map.add(legend);
//}
};
//}
// Section 2 - Add in Panels and Widgets//{
// 2.1 Add main panel {
var panel1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px',position: 'bottom-left',fontSize:'10px'}
});//}
// 2.2 Build checkboxes for input layers {
var ndvicheck = ui.Checkbox({label:'Landsat NDVI (30 m)',value:false});
var ndviModcheck = ui.Checkbox({label:'MODIS NDVI (250 m)',value:true});
// var ndwicheck = ui.Checkbox('NDWI - Wetness Index');
// var ndsicheck = ui.Checkbox('NDSI - Snow Index\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
// var nlcdcheck = ui.Checkbox('NLCD - Land Cover');
var claycheck = ui.Checkbox('% Clay (0-30 cm)\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
var carbcheck = ui.Checkbox({label:'Soil Carbon (0-30 cm)',value:true});
var elevcheck = ui.Checkbox({label:'Elevation\xa0\xa0',value:false});
var slopecheck = ui.Checkbox({label:'Slope\xa0\xa0',value:true});
var aspectcheck = ui.Checkbox({label:'Aspect',value:true});
//build buttons to run app
var gobutton = ui.Button({label:'Click Here',
                          onClick: runstrat,
                          style:{fontWeight:'bold',fontSize:'18px'}
                          });
var gobutton2 = ui.Button({label:'Click Here',
                          onClick: runstrat,
                          style:{fontWeight:'bold',fontSize:'18px'}
                          });
//}
// 2.3 Create more labels and checkboxes {
var areatextlab = ui.Label({value:"\xa0\xa0\xa03a. Click below to create custom polygons",style:{fontWeight:'bold',fontSize:'12px'}});
var ftlab = ui.Label({value:"\xa0\xa0\xa03a. Or input Fusion Table ID:\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
var slopeText = ui.Label({value:"4. Restrict analysis to slopes below:",style:{fontWeight:'bold',fontSize:'12px'}})
var slopeFilter = ui.Textbox({value:'20',placeholder:'Degrees',style:{width:'40px',fontWeight:'bold',fontSize:'12px'}})
var slopeDegree = ui.Label({value:"degrees",style:{fontWeight:'bold',fontSize:'12px'}})
var ftinput = ui.Textbox({value:'1mfKbGHzAczwQJ_KCzpmc6-LQ0dRXDyUsOFa3b6Vb',
                          placeholder:'Paste Here',
                          onChange: function (fusion) {
                            var layerz = ee.FeatureCollection('ft:'+fusion);
                            Map.centerObject(layerz,13);
                            Map.addLayer(layerz);
                          }});
var gjlab = ui.Label({value:"\xa0\xa0\xa03a. Input GeoJSON:\xa0\xa0\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
var gelab = ui.Label({value:"\xa0\xa0\xa03a. Input GEE Asset Link:\xa0\xa0\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
 //GeoJSON text parsing                     
var gjinput = ui.Textbox({value:'{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"FID":0},"geometry":{"type":"Polygon","coordinates":[[[-97.24374409881399,36.75215155320763],[-97.2429414825034,36.75234568220978],[-97.24267535082004,36.7527657682165],[-97.24086901459366,36.7528715706912],[-97.23886125710166,36.7527300510838],[-97.23726513421613,36.75218106004052],[-97.23496728641884,36.75044433803184],[-97.23451728282899,36.748824748639784],[-97.2346329553875,36.74741962528453],[-97.23461761274487,36.746013670017156],[-97.23571383759175,36.74407584888322],[-97.23675432431321,36.74336779134962],[-97.23897270031263,36.74278431633284],[-97.24060470118282,36.74261886853716],[-97.24175429661612,36.74266124633857],[-97.2435681469724,36.74325840822294],[-97.24526048166287,36.74438197909342],[-97.24638334575342,36.745689416996065],[-97.24669772063251,36.74630058512547],[-97.24667229212847,36.75044770083261],[-97.24553091491684,36.7510497722288],[-97.24480212237302,36.75113893612629],[-97.24426359900262,36.75112384853365],[-97.24376568738141,36.75142533040786],[-97.2436159128801,36.751857863314086],[-97.24374409881399,36.75215155320763]]]}}]}',
        placeholder:'Input GeoJSON',
        onChange: function (fusion) {
          var textval1 = fusion //Extract value from textbox
          var textval = ee.String(textval1).replace(',0','','g') //Cast to server side
          var split = textval.split('coordinates":','g') //split text at the word 'coordinates:'
          var split1 = split.slice({start:1})//remove the first bit of text before first set of coordinates
        //Function to extract coordinate information as String and parse into geometry    
            var mapGeom = split1.map(function (objGeo) {
              var splitter = ee.String(objGeo) //cast to string
              var closedIndex = splitter.rindex(']]]');//search for end of coordinate list
              var tester1 = splitter.slice(0,closedIndex).cat(']]]')//slice coordinate string text and add on brackets
              var tester = tester1.decodeJSON()//convert from string to JSON
            return tester
            })
          var layerz = ee.Geometry.MultiPolygon(mapGeom)
          Map.centerObject(layerz,13);
          Map.addLayer(layerz);
        }});    
 //GEE Asset text parsing                     
var geinput = ui.Textbox({value:'',
        placeholder:'Input GEE Asset',
        onChange: function (fusion) {
          var textval1 = fusion //Extract value from textbox
          var textval1 = fusion //Extract value from textbox
          var assetText = textval1
          var asset = ee.FeatureCollection(assetText)
          Map.addLayer(asset)
          Map.centerObject(asset,14)
          return asset
        }});    
var ftbutt = ui.Button({label:'Upload Fusion Table',
                          onClick: function () {
                          panel1.add(ftinput);  
                          }
                          });
var numdesc = ui.Label({value:"1. Choose either:\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
var numpointsopt = ui.Select({items:['Total # Samples','Acres per Sample'],value:'Total # Samples'});
var numpointstext = ui.Textbox({value:'50',placeholder:'# Samples',style:{width:'65px',fontWeight:'bold',fontSize:'12px'}});
var regselect = ui.Select({items:["Select One","User Defined Polygon","GeoJSON","GEE Asset"],value:"Select One",
    onChange: function(item,widget){
    if (item == 'GeoJSON') {
      panel1.add(gjFilter).add(goFilter)}
    else if (item == 'GEE Asset') {
      panel1.add(geFilter).add(goFilter)}
    else if (item == 'User Defined Polygon') {
      panel1.add(udFilter).add(goFilter)}
    widget.unlisten()
    }
    });
var polygon = []
var geometry = null;
var newpolyText =  ui.Label({value:'Use the drawing tools (Rectangle or Shape) in the upper left to draw single or multiple polygons then click button below',style:{color:'CornflowerBlue',fontWeight:'bold',fontSize:'12px'}})
//}
// 2.5 Build Sub-Panels {
var polyText = ui.Label({value:'\xa0\xa0\xa01a.\xa0',style:{fontWeight:'bold',fontSize:'12px'}})
var udFilter = ui.Panel([newpolyText])
// var udFilter = ui.Panel([polyText,polybutt,polyresetbutt],ui.Panel.Layout.Flow('horizontal'))
var ftFilter = ui.Panel([ftlab,ftinput],ui.Panel.Layout.Flow('horizontal'))
var gjFilter = ui.Panel([gjlab,gjinput],ui.Panel.Layout.Flow('horizontal'))
var geFilter = ui.Panel([gelab,geinput],ui.Panel.Layout.Flow('horizontal'))
var ndviStartDate = ui.Slider({min:2015,max:2023,value:2022,step:1,style:{width:50}})
var ndviStartMonth = ui.Slider({min:1,max:12,value:5,step:1})
var ndviEndDate = ui.Slider({min:2015,max:2023,value:2022,step:1})
var ndviEndMonth = ui.Slider({min:1,max:12,value:10,step:1})
var lsFilter = ui.Panel([
  ui.Label({value:'1.Vegetation Indices (NDVI)',
            style:{fontSize:'12px',fontWeight:'bold'}}),
  ui.Panel([
    ndvicheck,
    ndviModcheck
    ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
    ),
  ui.Panel([ui.Label('NDVI Start (m/y):'),
              ndviStartMonth,ndviStartDate],ui.Panel.Layout.Flow('horizontal'),
              {stretch: 'horizontal', padding: '0px 0px 0px 0px'}),
  ui.Panel([ui.Label('NDVI End (m/y):'),
              ndviEndMonth,ndviEndDate],ui.Panel.Layout.Flow('horizontal')),  
// ui.Panel([
// ndsicheck,
// nlcdcheck
// ],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
// )
  ],
  null,
  {stretch:'horizontal'}
  )
var soilFilter = ui.Panel([
ui.Label({value:'2. Soil Indices - 250 m Resolution (SoilGrids)',style:{fontSize:'12px',fontWeight:'bold'}}),
ui.Panel([
carbcheck,
claycheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
)
],
null,
{stretch:'horizontal'}
  )
var physFilter = ui.Panel([
ui.Label({value:'3. Physical Indices - SRTM 90 m Resolution',style:{fontSize:'12px',fontWeight:'bold'}}),
ui.Panel([
elevcheck,
slopecheck,
aspectcheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
)
],
null,
{stretch:'horizontal'}
  )
var strataBox = ui.Slider({min:3,max:10,step:1,value:5,style:{width:'142px',fontWeight:'bold',fontSize:'12px'}})
var stratLabel =  ui.Label({value:'2. Select Number of Strata:\xa0\xa0\xa0',style:{fontWeight:'bold',fontSize:'12px'}})
var slopebigFilter = ui.Panel([
ui.Panel([
slopeText,
slopeFilter,
slopeDegree
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
)
],
null,
{stretch:'horizontal'}
  )
var sampleFilter = ui.Panel([
ui.Panel([numdesc,numpointsopt,numpointstext],ui.Panel.Layout.Flow('horizontal')),
ui.Panel([stratLabel,strataBox],ui.Panel.Layout.Flow('horizontal'))
],
null,
{width:300,stretch:'horizontal'}
  )
var areaFilter = ui.Panel([
ui.Label({value:'Define Study Area',style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}),
ui.Label({value:"To create a GeoJSON from a .shp or .kml for use in the app, visit ogre.adc4gis.com. To add a GEE Asset, you must have a GEE account. You can upload a shapefile to your assets, make the asset sharing 'Anyone can read', and then copy the asset id (e.g. 'users/yourUserName/study_area'). Notes: 1) To change study area, refresh application; 2) Google Fusion Tables were deprecated 12/2019.",style:{fontWeight:'italics',color:'darkblue',fontSize: '10px'}}),
sampleFilter,
ui.Panel([ui.Label({value:'2. Select Study Area Type:\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',style:{fontWeight:'bold',fontSize:'12px'}}),
regselect],ui.Panel.Layout.Flow('horizontal'))//,
],
null,
{width:300,stretch:'horizontal'}
  )
var areaFilter2 = ui.Panel([
ui.Label({value:'To change Study Area, re-draw polygons, or refresh Stratifi App',style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}),
sampleFilter],
null,{width:300,stretch:'horizontal'})
var goFilter = ui.Panel([
ui.Panel([
ui.Label({value:'Run Stratification:\xa0\xa0',style:{color:'darkblue',fontWeight:'bold',fontSize:'18px'}}),
gobutton],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
)
],
null,
{stretch:'horizontal'}
  )
var goFilter2 = ui.Panel([
ui.Panel([
ui.Label({value:'Re-Run Stratification:\xa0\xa0',style:{color:'darkblue',fontWeight:'bold',fontSize:'18px'}}),
gobutton2],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
)
],
null,
{stretch:'horizontal'}
  )
var stratitle = ui.Panel([ui.Label({value:"Stratifi Global - Beta v2.1",style:{color:'darkblue',fontWeight:'bold',fontSize:'19px'}}),
ui.Label({value:"Stratified random sampling using Weka Kmeans clustering and freely available remote sensing products. Developed and maintained by the Skidmore College GIS Center. For more info contact cbettigo@skidmore.edu or visit the user guide at bit.ly/stratifi-user-guide.",style:{color:'darkblue',fontSize: '10px'}})
          ])
//}
// 2.6 Add widgets to Clustering Panel {
  panel1.add(stratitle)
        .add(ui.Label({value:"Select Input Layers",style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}))
        .add(lsFilter)
        .add(soilFilter)
        .add(physFilter)
        .add(slopebigFilter)
        .add(areaFilter)
//}
//}
// Section 3 - Visualization Panel//{
var title = ui.Panel({
    style: {width: '500px',position: 'top-center',fontSize:'20px'}
   });
var exportimage = ui.Button({
  label:""})
// var inspector = ui.Panel({
//   layout: ui.Panel.Layout.flow('horizontal')
// });
ui.root.add(panel1);
//}
// Section 4 - Map Prep {
// 4.1 Layer Preparation{
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
var palettes =require('users/gena/packages:palettes')
var startDate = ee.Date.fromYMD({year:ndviStartDate.getValue(),
                                month:ndviStartMonth.getValue(),
                                day:1})//'2022-05-01'
var endDate = ee.Date.fromYMD({year:ndviEndDate.getValue(),
                                month:ndviEndMonth.getValue(),
                                day:1})//'2022-05-01'
print(startDate)
var elevation2 = srtm90
var ndviMod = ee.ImageCollection('MODIS/061/MOD13Q1').filterDate(startDate,endDate).select('NDVI').median()
//Bring in SoilGrids Taxa
var carb = ee.Image('users/charlieyale/soilgrids/carbon30')
var clay = ee.Image('users/charlieyale/soilgrids/clay')
var soiltaxa = soiltaxa.rename('soiltaxa')
// Calculate elevation products
var allProducts = ee.Terrain.products(elevation2);
var slope = allProducts.select('slope').divide(90)
var aspect = allProducts.select('aspect').divide(360)
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
function ndviImg (image) {return image.expression('(b(4)-b(3))/(b(4)+b(3))').rename('ndvi')}
function ndsiImg (image) {return image.expression('(b(3)-b(5))/(b(3)+b(5))').rename('ndsi')}
function ndwiImg (image) {return image.expression('(b(5)-b(6))/(b(5)+b(6))').rename('ndwi')}
// Map the function over one year of data.
var collection = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
    .filterDate(startDate, endDate)
    .map(maskL8sr)
//Map the Index functions over one year of data
var collectionNDVI = collection.map(ndviImg)
var collectionNDWI = collection.map(ndviImg)
var collectionNDSI = collection.map(ndviImg)
//Calculate "Greenest Pixel" NDVI values
var ndvi = collectionNDVI.max();
var ndwi = collectionNDWI.max();
var ndsi = collectionNDSI.max();
//}
// 4.2 Set Map Options {
Map.setOptions('HYBRID')
Map.setCenter(-73.781538, 43.103046,16);
var randlist = []
//}
// Visualization palette for vegetation indices
var vis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'],
  opacity:0.5
};
var elVis = {min:0,max:1,
            palette:[ 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401','056201', '004C00', '023B01', '012E01', '011301'],
            opacity:0.5}
var grayVis = {min: 0, max: 1, gamma: 2, opacity:0.5}
// Add all layers to map, but turn off Visibility
Map.addLayer(ndvi,vis,"NDVI",false);
Map.addLayer(ndwi,vis,"NDWI",false);
Map.addLayer(ndsi,vis,"NDSI",false);
// Map.addLayer(soiltaxa,{opacity:0.5},"Soil Taxa",false);
// Map.addLayer(gssurgo.randomVisualizer(),{opacity:0.5},"Soils - GSSURGO",false);
Map.addLayer(elevation2,{min:0,max:4000,
            palette:[ 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401','056201', '004C00', '023B01', '012E01', '011301'],
            opacity:0.5},"Elevation",false);
Map.addLayer(slope,{min: 0, max: 90, gamma: 2, opacity:0.5},"Slope",false);
Map.addLayer(aspect,{min: 0, max: 360, gamma: 2, opacity:0.5},"Aspect",false);
//}
//}