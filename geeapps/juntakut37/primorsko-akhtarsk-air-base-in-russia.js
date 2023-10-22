var image = ui.import && ui.import("image", "image", {
      "id": "users/juntakut37/ukraine_war/primorsko-akhtarsk_air_base_20-22"
    }) || ee.Image("users/juntakut37/ukraine_war/primorsko-akhtarsk_air_base_20-22");
/////////////////////////////////////////////////////
// **************************************************
// Viewer for Exported Sequential Omnibus Change Maps
// **************************************************
var util = require('users/juntakut37/military:utilities_0000');
var text = require('users/gena/packages:text');
var landmask = ee.Image('UMD/hansen/global_forest_change_2015')
                                         .select('datamask').eq(1);
var image = image.updateMask(landmask);  
var image = image.updateMask(image.gt(0))
var k = image.bandNames().length().subtract(4).getInfo();
var k1 = k+3;
var jet = ['black','blue','cyan', 'yellow','red'];
var rgb = ['black','red','cyan','yellow']
var vis = {min:0, max:k, palette:jet};
var vis1 = {min:0, max:3, palette:rgb};
/////////////////////////////////////////////////////
var panel = ui.Panel({style: {width: '300px', backgroundColor: "white", 
border: '2px solid grey', textAlign: "center", whiteSpace: "nowrap", shown: true}});
////////////////////////////////////////////////////
//###############################################
/*
 * Chart setup
 */
var chartPanel = ui.Panel({style: {backgroundColor: "white", 
textAlign: "center", whiteSpace: "nowrap", shown: true}});
chartPanel.add(ui.Label({value: "Fraction of Changes", style:{fontWeight:"bold", backgroundColor : "white"}}));
chartPanel.add(ui.Label("Primorsko-Akhtarsk Air Base in Russia", {color: "black", fontWeight: "bold", fontSize: "16px", backgroundColor: "white"}, 
                        "https://www.rferl.org/a/russia-ukraine-military-buildup-satellite-images/31214867.html"));  
/////////////////////////////////////////
ui.root.add(panel.add(chartPanel));
// #############################################################################
// ### SETUP UI ELEMENTS ###
// #############################################################################
Map.centerObject(image,15);
Map.add(util.makeLegend(vis));
Map.addLayer(image.select('fmap').multiply(2),vis,'fmap*2', true, 0.4);
Map.addLayer(image.select('smap'),vis,'smap', false, 0.3);
Map.addLayer(image.select('cmap'),vis,'cmap', false, 0.3);
//Map.addLayer(image.select(9),vis1,'Feb 11 - Feb 23');
//Map.addLayer(image.select(10),vis1,'Feb 23 - March 6');
//Map.addLayer(image.select(k1),{min:0,max:1},'S2 band 8');
Map.setOptions('HYBRID');
try{
   geometry.getInfo();
}
catch(err){
 var geometry = image.geometry();
}
var bounds = image.geometry().bounds();
// plot time axis charts
var rcut = util.rcut(image,geometry,k,image.get('system:id').getInfo(),1.0);
//print(rcut[0]);
//print(rcut[1]);
//print(rcut[2]);
//print(rcut[3]);
chartPanel.add(rcut[1]);
chartPanel.add(rcut[2]);
chartPanel.add(rcut[3]);
// export video
var background = image.select('background');
var ones = ee.Image.constant(1);
var backgrounds = background.where(background.gt(ones),ones);
var bmap = image.select(ee.List.sequence(3,k+2));
var first = ee.Dictionary({'bmap':bmap.clip(geometry),'background':background,'framelist':ee.List([])});
var bandlist = ee.List.sequence(0,k-1);
var framelist = ee.List(ee.Dictionary(bandlist.iterate(util.makevideo,first)).get('framelist'));  
var video = ee.ImageCollection.fromImages(framelist);   
// annotate
var annotations = [
  {
    position: 'left', offset: '1%', margin: '1%', property: 'label', scale: 120
  }
];
video = video.map(function(image) {
  return text.annotateImage(image, {}, bounds, annotations);
});
Export.video.toDrive({collection:video,
                      description:'driveExportTask_video', 
                      folder: 'gee',
                      framesPerSecond:1,
                      region: bounds,
                      fileNamePrefix:'video',
                      dimensions: 1000});