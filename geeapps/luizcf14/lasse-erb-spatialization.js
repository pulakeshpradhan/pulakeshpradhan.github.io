var srtm = ui.import && ui.import("srtm", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 0.5057471264367817,
        "palette": [
          "000000",
          "ff27c7",
          "ff0000",
          "d8ff00",
          "00ff2b"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":0.5057471264367817,"palette":["000000","ff27c7","ff0000","d8ff00","00ff2b"]},
    table = ui.import && ui.import("table", "table", {
      "id": "users/luizcf14/LASSE/LASSE_ERBsPA"
    }) || ee.FeatureCollection("users/luizcf14/LASSE/LASSE_ERBsPA"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -58.192271641747084,
                -8.740724805669554
              ],
              [
                -48.172740391747084,
                -10.819323868206478
              ],
              [
                -43.953990391747084,
                -1.0403948295939291
              ],
              [
                -49.227427891747084,
                1.1567350299996735
              ],
              [
                -57.489146641747084,
                -0.6009878624515202
              ],
              [
                -58.475872391429675,
                -6.507791410962138
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.192271641747084, -8.740724805669554],
          [-48.172740391747084, -10.819323868206478],
          [-43.953990391747084, -1.0403948295939291],
          [-49.227427891747084, 1.1567350299996735],
          [-57.489146641747084, -0.6009878624515202],
          [-58.475872391429675, -6.507791410962138]]]),
    mapbiomas = ui.import && ui.import("mapbiomas", "image", {
      "id": "projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1"
    }) || ee.Image("projects/mapbiomas-workspace/public/collection4_1/mapbiomas_collection41_integration_v1"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.62,
        "bands": [
          "kernel"
        ],
        "max": 20,
        "palette": [
          "ffffff",
          "ff0000",
          "fff700",
          "00970c"
        ]
      }
    }) || {"opacity":0.62,"bands":["kernel"],"max":20,"palette":["ffffff","ff0000","fff700","00970c"]},
    PA = ui.import && ui.import("PA", "table", {
      "id": "users/luizcf14/Brasil/PA"
    }) || ee.FeatureCollection("users/luizcf14/Brasil/PA"),
    loc_engcomp = ui.import && ui.import("loc_engcomp", "table", {
      "id": "users/luizcf14/LASSE/Loc_engcomp_gmaps"
    }) || ee.FeatureCollection("users/luizcf14/LASSE/Loc_engcomp_gmaps"),
    loc_engtelecom = ui.import && ui.import("loc_engtelecom", "table", {
      "id": "users/luizcf14/LASSE/Loc_engtelecom_gmaps"
    }) || ee.FeatureCollection("users/luizcf14/LASSE/Loc_engtelecom_gmaps"),
    loc_antonio = ui.import && ui.import("loc_antonio", "table", {
      "id": "users/luizcf14/LASSE/latlon_antonio"
    }) || ee.FeatureCollection("users/luizcf14/LASSE/latlon_antonio"),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "min": 20,
        "max": 203.81317784002928,
        "palette": [
          "00ff2b",
          "00ff5a",
          "efff00",
          "e4ff00",
          "ffd715",
          "de0000",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"min":20,"max":203.81317784002928,"palette":["00ff2b","00ff5a","efff00","e4ff00","ffd715","de0000","ffffff"]},
    COST231 = ui.import && ui.import("COST231", "imageVisParam", {
      "params": {
        "opacity": 0.73,
        "bands": [
          "constant"
        ],
        "min": 80,
        "max": 110.81317784002928,
        "palette": [
          "00ff2b",
          "00ff5a",
          "efff00",
          "e4ff00",
          "ffd715",
          "de0000",
          "ffffff"
        ]
      }
    }) || {"opacity":0.73,"bands":["constant"],"min":80,"max":110.81317784002928,"palette":["00ff2b","00ff5a","efff00","e4ff00","ffd715","de0000","ffffff"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 0.73,
        "bands": [
          "constant"
        ],
        "max": 110.81317784002928,
        "palette": [
          "00ff2b",
          "00ff5a",
          "efff00",
          "e4ff00",
          "ffd715",
          "de0000",
          "ffffff"
        ]
      }
    }) || {"opacity":0.73,"bands":["constant"],"max":110.81317784002928,"palette":["00ff2b","00ff5a","efff00","e4ff00","ffd715","de0000","ffffff"]};
Map.centerObject(PA,6)
var legendGenerator = function(initialValue,thresholdlist,finalValue){
  var colorList = []
  for(var i = initialValue;i <= finalValue;i++){
    colorList[i] = '#00FF00'
  }
}
var logo = ee.Image('users/luizcf14/out3');
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'133px',height:'123px'}});
function makeLegend(vis) {
  vis.min = 0
  vis.bands = null
  print(vis)
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // In case you really need it, get the color ramp as an image:
  print(legendImage.getThumbURL({bbox:'0,0,100,8', dimensions:'128x20'}));
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'}, 
    style: {padding: '1px', position: 'bottom-center'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label("-60dBm"), 
      ui.Label({value: "Signal Stregth",style: {stretch: 'horizontal'}}), 
      ui.Label("-130dBm")
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
  return ui.Panel().add(panel).add(thumb);
}
var mapbiomas2018 = mapbiomas.select('classification_2018')
var OI = table.filterMetadata('Operadora','equals','OI')
var TIM = table.filterMetadata('Operadora','equals','TIM')
var VIVO = table.filterMetadata('Operadora','equals','VIVO')
var CLARO = table.filterMetadata('Operadora','equals','CLARO')
var union_Image = ee.Image(0).toByte().paint(OI,255).paint(TIM,255).paint(VIVO,255).paint(CLARO,255).reproject(ee.Projection('EPSG:4326').atScale(30))
var erbPoints =union_Image
var default_Height = 50
var srtm = srtm.lte(50)
// Fonte: https://wiki.teltonika-networks.com/view/Mobile_Signal_Strength_Recommendations
var kernel2G;
var kernel3G;
var kernel4G;
if(false){
  union_Image = union_Image.focal_max(1500, "circle","meters")
  var kernel2G = union_Image.focal_mean(5000, "circle","meters").reproject(ee.Projection('EPSG:4326').atScale(160))
  var kernel3G = union_Image.focal_max(1500, "circle","meters").reproject(ee.Projection('EPSG:4326').atScale(160))
  //var kernelDistance = erbPoints.fastDistanceTransform(256, "pixels", "squared_euclidean")
  var kernelDistance = ee.Image(1).toFloat().cumulativeCost(erbPoints, 30000, true).rename('distance').unmask(4300).divide(1000)
  Map.addLayer(erbPoints)
  var kernel4G = union_Image.focal_mean(7000, "circle","meters").reproject(ee.Projection('EPSG:4326').atScale(160))
  Export.image.toAsset({
      image: kernelDistance.rename('kernel').set({'tecnology':'Distance','state':'PA'}).toFloat(),
      description:'KernelDistance',
      assetId: 'users/luizcf14/LASSE/Kernel_Distance_CC_PA',
      scale: 30,
      maxPixels:1e13,
      region: geometry
    });
  Export.image.toAsset({
      image: kernel2G.rename('kernel').set({'tecnology':'2G','state':'PA'}).toByte(),
      description:'Kernel2G',
      assetId: 'users/luizcf14/LASSE/Kernel_2G_PA',
      scale: 160,
      maxPixels:1e13,
      region: geometry
    });
    Export.image.toAsset({
      image: kernel3G.rename('kernel').set({'tecnology':'3G','state':'PA'}).toByte(),
      description:'Kernel3G',
      assetId: 'users/luizcf14/LASSE/Kernel_3G_PA',
      scale: 160,
      maxPixels:1e13,
      region: geometry
    });
    Export.image.toAsset({
      image: kernel4G.rename('kernel').set({'tecnology':'4G','state':'PA'}).toByte(),
      description:'Kernel4G',
      assetId: 'users/luizcf14/LASSE/Kernel_4G_PA',
      scale: 160,
      maxPixels:1e13,
      region: geometry
    });
}else{
  var kernel2G = ee.Image('users/luizcf14/LASSE/Kernel_2G_PA')
  var kernel3G = ee.Image('users/luizcf14/LASSE/Kernel_3G_PA')
  var kernel4G = ee.Image('users/luizcf14/LASSE/Kernel_4G_PA')
  var kernelDistance = ee.Image('users/luizcf14/LASSE/Kernel_Distance_CC20_2_PA').rename('distance')
}
  var fc = 1500 // Frequency Value in Mhz
  var d = 1//Distance in meters
  var hre = 5 // Antenna height
  var a = 180 //(1.1*log10(1500)-0.7)*(70 - (1.56*log10(1500)-0.8))
  var hte = 60//ERB height
  var C = 0//Coeficient (0 is Dense urban), (-5 is urban), (-10 is suburban) and (-17 in rural)
  var okumuraHataExpression = 	'69.55+26.16*log('+fc+')-13.82*log10('+hte+')-'+a+'+(44.9-6.55*log10('+hte+'))*log10(d)';
  var cost231Expression = '	46.3+33.9*log('+fc+')-13.82*log('+hte+')-'+a+'+(44.9-6.55*log('+hte+'))*log(d)+'+C 
  var cost231Image = kernelDistance.toFloat().expression(cost231Expression,{
    'd':kernelDistance.select('distance')
  })
 /** Mapbiomas Loss Costs**/
 var mapbiomas2018_weights = ee.Image(1).toByte().clip(PA).where(mapbiomas2018.eq(24),5).where(mapbiomas2018.eq(15),2).where(mapbiomas2018.eq(3),7).where(mapbiomas2018.eq(5),15)
/*Parametros Importantes: Distancia da ERB mais proxima e Proximidade de ERBS*/ 
//UIs
//Map Layers
var mapUI = function(){
  var palettes=require("users/mapbiomas/modules:Palettes.js") 
  var mapbiomasColors = palettes.get("classification2")
  Map.addLayer(mapbiomas2018,{palette:mapbiomasColors,min:0,max:34,opacity:0.6},'Mapbiomas (LULC)')
  Map.addLayer(OI,{'color':'#686860'},'OI',false)
  Map.addLayer(TIM,{'color':'#5c5c68'},'TIM',false)
  Map.addLayer(VIVO,{'color':'#5e685f'},'VIVO',false)
  Map.addLayer(CLARO,{'color':'#685a5a'},'CLARO',false)
  Map.addLayer(kernel3G.clip(PA),imageVisParam2,'Kernel 3G',false)
  Map.add(makeLegend(imageVisParam4));
  Map.addLayer(kernelDistance,{},'Pixel to nearest ERB Distance',false);
  Map.addLayer(cost231Image.updateMask(kernelDistance.neq( 4.300000190734863)).add(mapbiomas2018_weights).unmask(190),COST231,'Cost231 Image - With Mapbiomas LULC',false);
  Map.addLayer(cost231Image.updateMask(kernelDistance.neq( 4.300000190734863)).unmask(190),COST231,'Cost231 Image - Without Mapbiomas LULC',true);
  Map.addLayer(loc_engcomp,{color:'purple'},'Students EngComp/UFPA',false)
  Map.addLayer(loc_engtelecom,{color:'blue'},'Students Telecom/UFPA',false)
  Map.addLayer(loc_antonio,{color:'red'},'Students UFPA')
}
mapUI()
// Statistics Extraction Routines
var baseImage = cost231Image.updateMask(kernelDistance.neq( 4.300000190734863)).unmask(190)
var featSamples_loc_antonio = baseImage.reduceRegions(loc_antonio,ee.Reducer.first(),30)
var featSamples_loc_engtelecom = baseImage.reduceRegions(loc_engtelecom,ee.Reducer.first(),30)
var featSamples_loc_engcomp = baseImage.reduceRegions(loc_engcomp,ee.Reducer.first(),30)
Export.table.toDrive(featSamples_loc_antonio,'UFPAStudents_signalReport','LASSE','UFPAStudents_signalReport')
Export.table.toDrive(featSamples_loc_engtelecom,'UFPATelecomStudents_signalReport','LASSE','UFPATelecomStudents_signalReport')
Export.table.toDrive(featSamples_loc_engcomp,'UFPAEngCompStudents_signalReport','LASSE','UFPAEngCompStudents_signalReport')