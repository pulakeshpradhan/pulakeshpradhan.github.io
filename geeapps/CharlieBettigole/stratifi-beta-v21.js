var elevation = ui.import && ui.import("elevation", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    soiltaxa = ui.import && ui.import("soiltaxa", "image", {
      "id": "users/CharlieBettigole/TAXOUSDA_250m"
    }) || ee.Image("users/CharlieBettigole/TAXOUSDA_250m"),
    nlcd = ui.import && ui.import("nlcd", "imageCollection", {
      "id": "USGS/NLCD_RELEASES/2016_REL"
    }) || ee.ImageCollection("USGS/NLCD_RELEASES/2016_REL"),
    gssurgoColl = ui.import && ui.import("gssurgoColl", "imageCollection", {
      "id": "users/skidmoregis/stratifi/soc030"
    }) || ee.ImageCollection("users/skidmoregis/stratifi/soc030"),
    om_ocean = ui.import && ui.import("om_ocean", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 10,
        "palette": [
          "fffdcd",
          "e1cd73",
          "aaac20",
          "5f920c",
          "187328",
          "144b2a",
          "172313"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":10,"palette":["fffdcd","e1cd73","aaac20","5f920c","187328","144b2a","172313"]},
    bd_ocean = ui.import && ui.import("bd_ocean", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 0.67,
        "max": 1.6,
        "palette": [
          "fffdcd",
          "e1cd73",
          "aaac20",
          "5f920c",
          "187328",
          "144b2a",
          "172313"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":0.67,"max":1.6,"palette":["fffdcd","e1cd73","aaac20","5f920c","187328","144b2a","172313"]},
    cl_ocean = ui.import && ui.import("cl_ocean", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 3,
        "max": 55,
        "palette": [
          "fffdcd",
          "e1cd73",
          "aaac20",
          "5f920c",
          "187328",
          "144b2a",
          "172313"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":3,"max":55,"palette":["fffdcd","e1cd73","aaac20","5f920c","187328","144b2a","172313"]};
//Stratifi: GEE Application for stratification of agricultural 
//            landscapes for soil carbon sampling
///// Updated September 22nd 2021 /////
//** Corresponding Author: Charlie Bettigole - cbettigo@skidmore.edu
//** Co-authors: Sabrina Szeto | Steve Wood | Kris Covey | Dan Kane
//TABLE OF CONTENTS:
// Section 1 - Map Prep {
    //1.1 Layer Prep
    //1.2 Set Map Options //}
// Section 2 - Stratifi Function {
    // 2.1 Add Loading tab
    // 2.2 Add shapes
    // 2.3 Rename Bands
    // 2.4 Normalization 
    // 2.5 Cluster Variables
    // 2.6 Convert to Vector 
    // 2.7 Points/Acre
    // 2.8 Random List
    // 2.9 Random Sample
    // 2.10 Chart Strata
    // 2.11 Export Functions //}
// Section 3 - App Widgets {
    // 3.1 Main Panel
    // 3.2 Checkboxes
    // 3.3 Labels/Boxes
    // 3.4 Polygon Drawing
    // 3.5 Sub-panels
    // 3.6 Adding widgets to main //}
// Section 4 - Layer Visualization
// shift+click the arrow to the left (or that of any Section header) to close all layers and sub layers{
// Section 1 - Map Prep {
//1.1 Layer Preparation{
var palettes =require('users/gena/packages:palettes')
var elevation2 = ee.Image("USGS/NED")
var elevation = elevation2.rename('elevation')//.divide(4000)
var gssurgo = gssurgoColl.mosaic().select('b1').rename('gssurgo').divide(10000);
//Bring in SoilGrids Taxa
var soiltaxa = soiltaxa.rename('soiltaxa')
// Calculate elevation products
var allProducts = ee.Terrain.products(elevation2);
var slope = allProducts.select('slope').divide(90)
var aspect = allProducts.select('aspect').expression('cos((b(0)*3.141592635)/180)')
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
function ndviImg (image) {return image.expression('(b(4)-b(3))/(b(4)+b(3))').rename('ndvi')}
function ndsiImg (image) {return image.expression('(b(3)-b(5))/(b(3)+b(5))').rename('ndsi')}
function ndwiImg (image) {return image.expression('(b(5)-b(6))/(b(5)+b(6))').rename('ndwi')}
// Map the function over one year of data.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate('2020-01-01', '2020-12-31')
    .map(maskL8sr)
//Map the Index functions over one year of data
var collectionNDVI = collection.map(ndviImg)
var collectionNDWI = collection.map(ndsiImg)
var collectionNDSI = collection.map(ndwiImg)
//Calculate "Greenest Pixel" NDVI values
var ndvi = collectionNDVI.max();
var ndwi = collectionNDWI.max();
var ndsi = collectionNDSI.max();
//}
// 1.2 Set Map Options {
Map.setOptions('HYBRID')
Map.setCenter(-73.781538, 43.103046,16);
var randlist = []
//}
//}
// Section 2 - Stratifi Function {
var runstrat = function () {
// 2.1 Add Loading tab to the application {
Map.add(inspector);
  inspector.clear()
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
//Turn off drawing function
Map.unlisten(drawOnClick())
//}
// 2.2 Add User Definied/JSON shape into function {
if (regselect.getValue() == "User Defined Polygon") {var region = Map.drawingTools().layers().get(0).toGeometry()}
// if (regselect.getValue() == "Fusion Table") {var region = ee.FeatureCollection('ft:'+ftinput.getValue()).geometry()}
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
// 2.3 Function to rename band names to prioritize kmeans clustering {
  //First band name is weighted heavier than others
    var reName = function (layer,noCap) {var reName = layer.rename(noCap)
      lister.push(reName)  
    }
    if (ndvicheck.getValue() === true) {reName(ndvi,'ndvi')}
    if (ndwicheck.getValue() === true) {reName(ndwi,'ndwi')}
    if (ndsicheck.getValue() === true) {reName(ndsi,'ndsi')}
    if (elevcheck.getValue() === true) {reName(elevation,'elevation')}
    if (slopecheck.getValue() === true) {reName(slope,'slope')}
    if (aspectcheck.getValue() === true) {reName(aspect,'aspect')}
    if (taxacheck.getValue() === true) {reName(soiltaxa,'soiltaxa')}
    if (ssurgocheck.getValue() === true) {reName(gssurgo,'gssurgo')}
    if (nlcdcheck.getValue()=== true) {reName(nlcd,'nlcd')}
    if (omcheck.getValue() === true) {reName(om_mean,'om')}
    if (bdcheck.getValue() === true) {reName(bd_mean,'bd')}
    if (clcheck.getValue()=== true) {reName(clay_mean,'clay')}
//OPTION TO ADD IN A BUFFER LAYER FOR NORMALIZATION BEYOND PROPERTY BOUNDS
var normBuff = region//.buffer(100000)
var inputer = ee.Image(lister[0]).addBands(lister.slice(1))
                .mask(slopemask)
                .clip(normBuff); //Automatically add in bands
//}
// 2.4 Calculate min/max and normalize all bands from 0 to 1 for Kmeans clustering {
var maxImg = inputer.reduceRegion({reducer:ee.Reducer.max(), geometry:normBuff,scale:30,maxPixels:1e13})//.get('elevation');
var minImg = inputer.reduceRegion({reducer:ee.Reducer.min(), geometry:normBuff,scale:30,maxPixels:1e13})//.get('elevation');
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
////ATTENTION HERE! I DON"T THINK THAT keysMap is giving us the correct bandnames!!!!///////
////////}
// 2.5 Cluster with each variable as first variable and take a mean image////{
////  Scrapping this and just running K means ////// {
// //Function to map clustering algorithm over different variable orders
// var listerest = ee.List.sequence(0,varList.size().subtract(1)) //Create a list sequence for number of input variables to map
// ///////IDEA - CAN WE GENERATE A RANDOM 'variable' AND RUN THIS LIKE 100 TIMES?////////////
// var clusterMean = listerest.map(function(variable){
//   var varList2 = varList.replace(varList.get(ee.Number(variable)),'AA') //For each input layer, renames to 'AA'
//   var varListSort = varList2.sort() //Sorts so that the following clustering algorithm will preferentially cluster on input 'AA'
//   var keysMap2 = varListSort.map(function(item){return keysMap.rename(varList2).select([item])}) //Generate a new list of images in the proper order
//   var keysMap3 = ee.ImageCollection(keysMap2).toBands().rename(varListSort) //Create an image with each band as an input variable
//   var training = keysMap3.sample({region: region,scale:30,numPixels:5000}) //create training data
//   var clusterers = ee.Clusterer.wekaXMeans(5,10); //Set the desired clusterer (Weka X Means here)
//   var clusterer = clusterers.train(training);  //Train clusterer
//   var result = keysMap3.cluster(clusterer); //Run clusterer on re-ordered input variables
//   return result
// })
// var result = ee.ImageCollection(clusterMean).mode().toInt().clip(region)
//}
///// This is where I am testing out Xmeans and Kmeans /////
//// K means appears to be resilient to order of inputs. X means DOES NOT! Fuck XMEans. Pop in option to select n of Strata
// var stratN = ee.Number.parse(strataBox.getValue())
// print(stratN.add(1))
var stratN = strataBox.getValue()
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
// 2.6 Convert to vector and add to map {
  var resultvect = result.reduceToVectors({scale:10,eightConnected:false,maxPixels:1e13})
  result.evaluate(function(){
    Map.addLayer(result.clip(region),{palette:palette,min:0,max:(stratN-1),opacity:0.5},"Similar Classes",true)})
  Map.centerObject(region,13)
//}
// 2.7 Calculate points by acre vs. total points {
var numstot = ee.Number.parse(numpointstext.getValue()) //change this to total points per property
var areavect = resultvect.geometry().area({maxError:10})
var areaacre = areavect.multiply(0.000247105)
var numsacre = areaacre.divide(numstot).round()
if (numpointsopt.getValue() == 'Acres per Sample') {
var nums = numsacre
}
if (numpointsopt.getValue() == 'Total # Samples')  {var nums = numstot}
if (numpointsopt.getValue() == 'Estimate N from Polaris') {
var p_mean =om_mean.reduceRegion({
  reducer:ee.Reducer.mean(),
  geometry:region,
  scale:30
}).get('constant')
var p_sd = om_mean.reduceRegion({
  reducer:ee.Reducer.stdDev(),
  geometry:region,
  scale:30
}).get('constant')
var rounder = function(i){return ee.Number(i).multiply(100).round().divide(100)}
//95% is .96, 90% is 1.645
var dict = {sd:ee.Number(p_sd),
            mean:ee.Number(p_mean),
            error:0.05,
            z:1.645
}
var nums = ee.Number.expression('((z*sd)/(error*mean))**2',dict).round()
print(nums)
}
//}
// 2.8 Create a random list{
var rando = ee.FeatureCollection(region).randomColumn('random',1)
var rando1 = ee.Number(rando.first().get('random')).multiply(10000).round()
randlist.push(rando1)
var rando2 = ee.Number(randlist[-0]).divide(ee.List(randlist).length()).round()
//}
// 2.9 Randomly sample by strata {
var edgeDist = -10
var numclust = result.reduceRegion(
                  {reducer:ee.Reducer.max(),
                    geometry:region,scale:30}).get('cluster')//.keys()
var clustList = ee.List.sequence({start:0,end:numclust,step:1})
//Generate a set of points for each strata based on area
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
// 2.10 Chart mean estimates of covariates for each strata for INPUTER not keysMap {
var clustMeanVar = clustList.map(function(strata){
    var cluStrArea = resultvect.filterMetadata('label','equals',strata).geometry()
    var cluReducer = inputer.reduceRegion({geometry:cluStrArea,reducer:ee.Reducer.mean(),scale:30,maxPixels:1e13})
    return cluReducer
})
print(varList,'varlist')
    var clustArrayList = clustMeanVar.map(function(item){return ee.Dictionary(item).toArray()})
    var hTitles = clustList.map(function(item){return ee.String(ee.Number(item).toInt())})
// print(hTitles,clustArrayList)
//we've got to be able to do this with a data table somehow? rows as variables, columns as strata...
// var resDis = clustList.map(function(num){
//   var dissolver = ee.Feature(resultvect.filterMetadata('label','equals',num).union(1)).set({'strata':num})
//   return dissolver
// })
// var resDisfc = ee.FeatureCollection(resDis).flatten()
///// Add a function to add a strata property to resDisfc/////
// var resDisProp = resDisfc.map()
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
var titler = 'Covariate Values Across '+stratN+' Strata'
var charter2 = ui.Chart.image.byRegion({
  reducer:ee.Reducer.mean(),
  image:keysMap,
  // image:inputer,
  regions:resultvectDissolve,
  scale:30
  // xProperty:'label'
})
// .setSeriesNames(clustList)
.setChartType('ColumnChart')
.setOptions({
    title:titler,
    hAxis: {'title':'Strata #',},
    vAxis: {'title':'Normalized Covariate Value'}
    })
// //I'm going to deprecate this charter....
//     var charter = ui.Chart.array.values(clustArrayList,0,hTitles)
//                                 .setChartType('ColumnChart')
//                                 // .setSeriesNames({0:"NDVI",1:'other',2:'lsdf',3:'lkjsdf'})
//                                 .setOptions({
//                                 hAxis: {'title':'Strata',},
//                                 vAxis: {'title':'Normalized Covariate Value'}
//                                 })
//}
// TURN THIS INTO AN EVALUATE FUNCTION FOR SAMPOINTFUN SO WE CAN HAVE A LOADING TAB!
  samPointFun.evaluate(function(){
    Map.addLayer(samPointFun,{color:"white"},"Stratified, equal area samples",true)
    Map.remove(inspector)
  });
// 2.11 Export functions {
// var samSize = samPointFun.size()
// var listID = ee.List.sequence(1,samSize,1)
// var coordFun = function(num){
//   var feat = ee.Feature(samPointFun.toList(samSize).get(num-1))
//   var long = feat.geometry().coordinates().get(0);
//   var lat = feat.geometry().coordinates().get(1);
//   var id = num;  //So that the list of IDs starts with 1, not 0
//   var outFeat = ee.Feature(feat.set({'point':id,'longitude':long,'latitude':lat}))
//   return outFeat;
// }
var coordFun2 = function(feat){
  var long = feat.geometry().coordinates().get(0);
  var lat = feat.geometry().coordinates().get(1);
  var id = feat.get('system:index');  //So that the list of IDs starts with 1, not 0
  var outFeat = feat.set({'point':id,'longitude':long,'latitude':lat})
  return outFeat;
}
// Convert lat long points to geometry object:
var samplePoints = ee.FeatureCollection(samPointFun.map(coordFun2));
panel1.clear()
areaFilter.clear()
goFilter.clear()
var sumText = ui.Label({value:'You created '+stratN+' strata across your study area, with '+nums.getInfo()+' samples',
                        style:{fontWeight:'bold',fontSize:'12px'}})
  panel1.add(stratitle)
        .add(sumText)
        // .add(ui.Label({value:"Select Input Layers",style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}))
        // .add(lsFilter)
        // .add(polFilter)
        // .add(soilFilter)
        // .add(physFilter)
        // .add(slopebigFilter)
        // .add(areaFilter2)
        // .add(goFilter2)
        .add(charter2)
 var exportimagefun = function () {
              var urlimgget = result.clip(region).getDownloadURL({
                      // region: JSON.stringify(region.bounds().getInfo()),
                      name: 'Stratifi_Map', 
                      crs: 'EPSG:4326', 
                      scale: 30 })
              var urltableget = samplePoints.getDownloadURL({
                      filename: 'Stratifi_Points',
                      selectors: ['strata','latitude','longitude']
                      })
          var linkText = ui.Label({value:'Download Data: ',style:{fontWeight:'bold',color:'black',fontSize:'14px'}})
          var link1 = ui.Label({value:'Points  ',style:{fontWeight:'bold',color:'blue',fontSize:'14px'}}).setUrl(urltableget)
          var link2 = ui.Label({value:'Strata',style:{fontWeight:'bold',color:'blue',fontSize:'14px'}}).setUrl(urlimgget)
          // var linkPanel = ui.Panel([linkText,link2,link1]).ui.Panel.Layout.Flow('horizontal');
                        var linkPanel = ui.Panel([linkText,link2,link1],ui.Panel.Layout.Flow('horizontal'));
          panel1.add(linkPanel).add(ui.Label({value:'Refresh page to run another analysis'}))
          // var link = ui.Chart(
          //               [
          //                 ['Download Data Here'],
          //                 ['<a target="_blank" href='+urlimgget+'>' +
          //                 'Image Download</a>'],
          //                 ['<a target="_blank" href='+urltableget+'>' +
          //                 'Points Download</a>']
          //               ],
          //               'Table', {allowHtml: true});
          //           var linkPanel = ui.Panel([link], 'flow', {width: '300px', height: '125px'});
          //     panel1.add(linkPanel)//.add(printout).add(printout2)
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
// Section 3 - Add in Panels and Widgets//{
// 3.1 Add main panel {
var panel1 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px',position: 'bottom-left',fontSize:'10px'}
});//}
// 3.2 Build checkboxes for input layers {
var ndvicheck = ui.Checkbox({label:'NDVI - Vegetation Index',value:true});
var ndwicheck = ui.Checkbox('NDWI - Wetness Index');
var ndsicheck = ui.Checkbox('NDSI - Snow Index\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
var nlcdcheck = ui.Checkbox('NLCD - Land Cover');
var taxacheck = ui.Checkbox('Soil Taxa - SoilGrids\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
var ssurgocheck = ui.Checkbox({label:'Soils - GSSURGO',value:false});
var elevcheck = ui.Checkbox({label:'Elevation\xa0\xa0',value:false});
var slopecheck = ui.Checkbox({label:'Slope\xa0\xa0',value:true});
var aspectcheck = ui.Checkbox({label:'Aspect',value:true});
var omcheck = ui.Checkbox({label:'Organic Matter\xa0\xa0',value:true});
var bdcheck = ui.Checkbox({label:'Bulk Density\xa0\xa0',value:false});
var clcheck = ui.Checkbox({label:'Percent Clay',value:false});
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
// 3.3 Create more labels and checkboxes {
var areatextlab = ui.Label({value:"\xa0\xa0\xa03a. Click below to create custom polygons",style:{fontWeight:'bold',fontSize:'12px'}});
var ftlab = ui.Label({value:"\xa0\xa0\xa03a. Or input Fusion Table ID:\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
var slopeText = ui.Label({value:"5. Restrict analysis to slopes below:",style:{fontWeight:'bold',fontSize:'12px'}})
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
var gelab = ui.Label({value:"\xa0\xa0\xa03a. Input GEE Asset:\xa0\xa0\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
 //GeoJSON text parsing                     
var gjinput = ui.Textbox({
        value:'{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-73.78559589385986,43.09853872373528],[-73.77418041229248,43.09853872373528],[-73.77418041229248,43.10618420919573],[-73.78559589385986,43.10618420919573],[-73.78559589385986,43.09853872373528]]]}}]}',
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
 //Gee Asset text parsing                     
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
var poldesc = ui.Label({value:'If you do not know how many samples to take, you can try estimating sample size with mean values and variability from Polaris Organic Matter estimates across your study site at 90% confidence and 5% Error. This will frequently be used for pre-sampling before known carbon magnitudes and variability are assessed.',
                        style:{color:'darkblue',fontSize: '10px'}})
var numdesc = ui.Label({value:"1. Choose either:\xa0\xa0",style:{fontWeight:'bold',fontSize:'12px'}});
var numpointsopt = ui.Select({items:['Total # Samples','Acres per Sample','Estimate N from Polaris'],value:'Total # Samples'});
var numpointstext = ui.Textbox({value:'50',placeholder:'# Samples',style:{width:'65px',fontWeight:'bold',fontSize:'12px'}});
var regselect = ui.Select({items:["Select One","User Defined Polygon","GeoJSON","GEE Asset"],value:"Select One",
    onChange: function(item,widget){
    if (item == 'GEE Asset') {
      panel1.add(geFilter).add(goFilter)}
    else if (item == 'GeoJSON') {
      panel1.add(gjFilter).add(goFilter)}
    else if (item == 'User Defined Polygon') {
      panel1.add(udFilter).add(goFilter)}
    widget.unlisten()
    }
    });
var polygon = []
var geometry = null;
//}
// 3.4 Polygon Drawing function {
var drawOnClick = function() {
    var polygon = []
    Map.onClick(
    function (coords) {
        // remove last polygon from map
        for (var i = 0; i < Map.layers().length(); i++) {
            var layer = Map.layers().get(i);
            if ('polygon' === layer.get('name')) {
                Map.remove(layer);
            }
        }
        // add coordinates to polygon
        polygon.push([coords.lon, coords.lat]);
        // manage the constructor type and build the geometry
        if (polygon.length < 3) {
            if (polygon.length == 1) {
                geometry = ee.Geometry.Point(polygon[0]);
            } else {
                geometry = ee.Geometry.LineString(polygon);
            }
        } else {
            geometry = ee.Geometry.MultiPolygon([polygon]);
        }
        // create layer
        var polygonLayer = ui.Map.Layer({
            'eeObject': ee.FeatureCollection(geometry).style({
                color: 'ff0000',
                fillColor: 'ff000000'
            }),
            'visParams': {},
            'name': 'polygon',
            'shown': true,
            'opacity': 1.0
        });
        // add layer to map
        Map.layers().insert(Map.layers().length(), polygonLayer);
    })}
var drawpoly = function() {
  Map.style().set('cursor', 'crosshair');
  drawOnClick()
  }
var polyreset = function() {
Map.style().set('cursor', 'hand');
  for (var i = 0; i < Map.layers().length(); i++) {
              var layer = Map.layers().get(i);
              if ('polygon' === layer.get('name')) {
                  Map.remove(layer);
              }}
Map.unlisten(drawOnClick())
}
var polyresetbutt = ui.Button({label:'Clear Polygon',
onClick:polyreset})
var polybutt = ui.Button({label:'Add User Defined Polygon',
onClick:drawpoly})
var newpolyText =  ui.Label({value:'Use the drawing tools (Rectangle or Shape) in the upper left to draw single or multiple polygons then click button below',style:{color:'CornflowerBlue',fontWeight:'bold',fontSize:'12px'}})
//}
// 3.5 Build Sub-Panels {
var polyText = ui.Label({value:'\xa0\xa0\xa01a.\xa0',style:{fontWeight:'bold',fontSize:'12px'}})
var udFilter = ui.Panel([newpolyText])
// var udFilter = ui.Panel([polyText,polybutt,polyresetbutt],ui.Panel.Layout.Flow('horizontal'))
var ftFilter = ui.Panel([ftlab,ftinput],ui.Panel.Layout.Flow('horizontal'))
var gjFilter = ui.Panel([gjlab,gjinput],ui.Panel.Layout.Flow('horizontal'))
var geFilter = ui.Panel([gelab,geinput],ui.Panel.Layout.Flow('horizontal'))
var lsFilter = ui.Panel([
ui.Label({value:'1. Landsat Indices - 30 m Resolution',style:{fontSize:'12px',fontWeight:'bold'}}),
ui.Panel([
ndvicheck,
ndwicheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
),
ui.Panel([
ndsicheck,
nlcdcheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
)
],
null,
{stretch:'horizontal'}
  )
var soilFilter = ui.Panel([
ui.Label({value:'3. Soil Indices - 30 m (GSSURGO) & 250 m (SoilGrids)',style:{fontSize:'12px',fontWeight:'bold'}}),
ui.Panel([
ssurgocheck,
taxacheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
)
],
null,
{stretch:'horizontal'}
  )
var physFilter = ui.Panel([
ui.Label({value:'4. Physical Indices - 10 m Resolution',style:{fontSize:'12px',fontWeight:'bold'}}),
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
var polFilter = ui.Panel([
ui.Label({value:'2. Polaris Soil Indices - 30 m',style:{fontSize:'12px',fontWeight:'bold'}}),
ui.Panel([
omcheck,
bdcheck,
clcheck
],ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'}
)
],
null,
{stretch:'horizontal'}
  )
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
var strataBox = ui.Slider({min:3,max:10,step:1,value:5,style:{width:'142px',fontWeight:'bold',fontSize:'12px'}})
var stratLabel =  ui.Label({value:'2. Select Number of Strata:\xa0\xa0\xa0',style:{fontWeight:'bold',fontSize:'12px'}})
var sampleFilter = ui.Panel([poldesc,
ui.Panel([numdesc,numpointsopt,numpointstext],ui.Panel.Layout.Flow('horizontal')),
ui.Panel([stratLabel,strataBox],ui.Panel.Layout.Flow('horizontal'))
],
null,
{width:300,stretch:'horizontal'}
  )
var areaFilter = ui.Panel([
ui.Label({value:'Define Study Area',style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}),
ui.Label({value:"To create a GeoJSON from a .shp or .kml for use in the app, visit ogre.adc4gis.com. To add a GEE Asset, you must have a GEE account. You can upload a shapefile to your assets, make the asset sharing 'Anyone can read', and then copy the asset id (e.g. 'users/yourUserName/study_area'). NOTE: To change study area, refresh application",style:{fontWeight:'italics',color:'darkblue',fontSize: '10px'}}),
sampleFilter,
ui.Panel([ui.Label({value:'3. Select Study Area Type:\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0',style:{fontWeight:'bold',fontSize:'12px'}}),
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
var stratitle = ui.Panel([ui.Label({value:"Stratifi - v3.2",style:{color:'darkblue',fontWeight:'bold',fontSize:'19px'}}),
ui.Label({value:"Stratified random sampling using Weka Kmeans clustering and freely available remote sensing products. Developed and maintained by the Skidmore College GIS Center. For more info contact cbettigo@skidmore.edu or visit the user guide at bit.ly/stratifi-user-guide.",style:{color:'darkblue',fontSize: '10px'}})
          ])
//}
// 3.6 Add widgets to Clustering Panel {
  panel1.add(stratitle)
        .add(ui.Label({value:"Select Input Layers",style:{color:'darkblue',fontWeight:'bold',fontSize:'16px'}}))
        .add(lsFilter)
        .add(polFilter)
        .add(soilFilter)
        .add(physFilter)
        .add(slopebigFilter)
        .add(areaFilter)
//}
//}
// Section 4 - Visualization Panel//{
var title = ui.Panel({
    style: {width: '500px',position: 'top-center',fontSize:'20px'}
   });
var exportimage = ui.Button({
  label:""})
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
ui.root.add(panel1);
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
//Polaris Layers  
var om_mean = ee.ImageCollection('projects/sat-io/open-datasets/polaris/om_mean')
                .filterMetadata('system:index','equals','om_5_15').mean().expression('10**b(0)');
var bd_mean = ee.ImageCollection('projects/sat-io/open-datasets/polaris/bd_mean')
                .filterMetadata('system:index','equals','bd_5_15').mean();
var clay_mean = ee.ImageCollection('projects/sat-io/open-datasets/polaris/clay_mean')
                .filterMetadata('system:index','equals','clay_5_15').mean();
Map.addLayer(bd_mean,bd_ocean,'Bulk Density (Polaris)',false)
Map.addLayer(clay_mean,cl_ocean,'Percent Clay (Polaris)',false)
Map.addLayer(om_mean,om_ocean,'Percent Organic Matter (Polaris)',false)
// Add all layers to map, but turn off Visibility
Map.addLayer(ndvi,vis,"NDVI (Landsat 8)",false);
Map.addLayer(ndwi,vis,"NDWI (Landsat 8)",false);
Map.addLayer(ndsi,vis,"NDSI (Landsat 8)",false);
Map.addLayer(soiltaxa,{opacity:0.5},"Soil Taxa",false);
Map.addLayer(gssurgo.randomVisualizer(),{opacity:0.5},"Soils - GSSURGO",false);
Map.addLayer(elevation2,{min:0,max:4000,
            palette:[ 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401','056201', '004C00', '023B01', '012E01', '011301'],
            opacity:0.5},"Elevation (NED)",false);
Map.addLayer(slope,{min: 0, max: 90, gamma: 2, opacity:0.5},"Slope (NED)",false);
Map.addLayer(aspect,{min: -1, max: 1, gamma: 2, opacity:0.5},"Aspect (i.e. Northness)",false);
Map.addLayer(nlcd,{},"Land Cover",false);  
//}
//}