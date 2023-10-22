var mask = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-107.6529790400902, 38.4731754288289],
          [-107.56371512407458, 38.45704639213005],
          [-107.4936772822777, 38.67394779658297],
          [-107.58019461626208, 38.688956300092535]]]);
//Initialization
var mask = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-107.6529790400902, 38.4731754288289],
          [-107.56371512407458, 38.45704639213005],
          [-107.4936772822777, 38.67394779658297],
          [-107.58019461626208, 38.688956300092535]]]);
var decoy = 0
var label3 = ui.Label('Student: Raul DEATCU ', {position:'bottom-right'});
Map.add(label3);
var label2 = ui.Label('Coordinator: Doç.Dr. BEKİR TANER SAN ', {position:'bottom-right'});
Map.add(label2);
var label1 = ui.Label('Interactive application for bands analysis of Hyperion dataset in GEE using Javascript ', {position:'bottom-right'});
Map.add(label1);
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  height: '400px',
  position: 'bottom-left'
});
Map.add(panel);
//Visualisation parameters
var rgbVis1 = {  min: 1.0,  max: 4000.0,  gamma: 2.5,};
var rgbVis2 = {  min: 1.0,  max: 3000.0,  gamma: 2.5,};
var rgbVis3 = {  min: 1.0,  max: 2000.0,  gamma: 2.5,};
var rgbVis4 = {  min: 1.0,  max: 1000.0,  gamma: 2.5,};
Map.setCenter(-107.5744120541666,38.57562200974752,12)
//The head of structure
var button = ui.Button({
  label: 'START',
  style: {position:'top-center'},
  onClick: function() {
var que1 = prompt("How many layers do you want to insert?")
for (decoy = 0; decoy<que1; decoy++){
 var que2 = prompt(" Bands intervals are [008:057],[077:224] \n Choose one band: ")
 var img = ee.Image("EO1/HYPERION/EO1H0350332013182110KF_PF1_01").select(['B'+que2]).clip(mask)
 var histoVis = {title: 'Histogram of cluster '+que2};
//First body of the structure
 if (que2<057){
  Map.addLayer(img, rgbVis1, "Image"+que2)
  var training = img.sample({
  region: mask,
  scale: 1,
  numPixels: 10000
});
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);
var result = img.cluster(clusterer);
Map.addLayer(result, { min:0, max:9, palette:['000000','ffffff','ff0000','ffff00','00ff00','00ffff','0000ff','a901db','f5a9e1','ff8000',]}, 'clusters'+que2);
var edge= ee.Algorithms.CannyEdgeDetector(result,1)
Map.addLayer(edge,{opacity:0.3},'edge'+que2)
var histo = ui.Chart.image.histogram(result, mask , 100).setOptions(histoVis)
panel.add(histo)
//Second body of the structure
 }else if (que2<100){
   Map.addLayer(img, rgbVis2, "Image"+que2)
   var training = img.sample({
  region: mask,
  scale: 1,
  numPixels: 10000
});
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);
var result = img.cluster(clusterer);
Map.addLayer(result, {min:0, max:9, palette:['000000','ffffff','ff0000','ffff00','00ff00','00ffff','0000ff','a901db','f5a9e1','ff8000',]}, 'clusters'+que2);
var edge= ee.Algorithms.CannyEdgeDetector(result,1)
Map.addLayer(edge,{opacity:0.3},'edge'+que2)
var histo = ui.Chart.image.histogram(result, mask , 100).setOptions(histoVis)
panel.add(histo)
//Third body of the structure
 }else if (que2<=150){
   Map.addLayer(img, rgbVis3, "Image"+que2)
   var training = img.sample({
  region: mask,
  scale: 1,
  numPixels: 10000
});
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);
var result = img.cluster(clusterer);
Map.addLayer(result, {min:0, max:9, palette:['000000','ffffff','ff0000','ffff00','00ff00','00ffff','0000ff','a901db','f5a9e1','ff8000',]}, 'clusters'+que2);
var edge= ee.Algorithms.CannyEdgeDetector(result,1)
Map.addLayer(edge,{opacity:0.3},'edge'+que2)
var histo = ui.Chart.image.histogram(result, mask , 100).setOptions(histoVis)
panel.add(histo)
//Fourth body of the structure
 }else{
   Map.addLayer(img, rgbVis4, "Image"+que2)
   var training = img.sample({
  region: mask,
  scale: 1,
  numPixels: 10000
});
var clusterer = ee.Clusterer.wekaKMeans(10).train(training);
var result = img.cluster(clusterer);
Map.addLayer(result, {min:0, max:9, palette:['000000','ffffff','ff0000','ffff00','00ff00','00ffff','0000ff','a901db','f5a9e1','ff8000',]}, 'clusters'+que2);
var edge= ee.Algorithms.CannyEdgeDetector(result,1)
Map.addLayer(edge,{opacity:0.3},'edge'+que2)
var histo = ui.Chart.image.histogram(result, mask , 100).setOptions(histoVis)
panel.add(histo)
 }
} 
  }
});
Map.add(button);
//'000000','ffffff','ff0000','ffff00','00ff00','00ffff','0000ff','a901db','f5a9e1','ff8000'
//black     white     red     yellow  green   light blue  blue    purple     pink   orange