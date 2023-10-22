var ext2015 = ui.import && ui.import("ext2015", "image", {
      "id": "users/maramengom/Orp2015"
    }) || ee.Image("users/maramengom/Orp2015"),
    ext2017 = ui.import && ui.import("ext2017", "image", {
      "id": "users/maramengom/Orp2017"
    }) || ee.Image("users/maramengom/Orp2017"),
    ext2018 = ui.import && ui.import("ext2018", "image", {
      "id": "users/maramengom/Orp2018"
    }) || ee.Image("users/maramengom/Orp2018"),
    ext2019 = ui.import && ui.import("ext2019", "image", {
      "id": "users/maramengom/Orp2019"
    }) || ee.Image("users/maramengom/Orp2019"),
    Bandama = ui.import && ui.import("Bandama", "table", {
      "id": "users/maramengom/Bandama"
    }) || ee.FeatureCollection("users/maramengom/Bandama"),
    ext2021 = ui.import && ui.import("ext2021", "image", {
      "id": "users/maramengom/Orp2021"
    }) || ee.Image("users/maramengom/Orp2021");
/*****************************************************************************************************************************************
*  CHAPITRE 5:  SUIVI DE L'EXPANSION DE L'ORPAILLAGE DUR LE BANDAMA
* 
**************************************************************************************************************************************/ 
var baseMap = require('users/tl2581/packages:baseMap.js');
Map.setOptions('ROADMAP');
Map.centerObject(Bandama,11.5)
Map.style().set('cursor', 'crosshair');
// *****************************************************************************************************************************************
// *  CREAATION DE LA COUCHE DES CARTES AVEC LEUR COULEURS RESPECTIVE
// * L'UTILISATEUR FERA L4ACTION DE CHOISIR LA COUCHE A VISUALISER
// * 
// **************************************************************************************************************************************/ 
var ASGM2015 = ui.Map.Layer(ext2015, {palette:['FF0000'], min:1, max:1}, 'Extent 2015',false)
var ASGM2017 = ui.Map.Layer(ext2017, {palette:['FF0000'], min:1, max:1}, 'Extent 2017',false)
var ASGM2018 = ui.Map.Layer(ext2018, {palette:['FF0000'], min:1, max:1}, 'Extent 2018',false)
var ASGM2019 = ui.Map.Layer(ext2019, {palette:['FF0000'], min:1, max:1}, 'Extent 2019',false)
var ASGM2021 = ui.Map.Layer(ext2021, {palette:['FF0000'], min:1, max:1}, 'Extent 2021',false)
Map.add(ASGM2015)
Map.add(ASGM2017)
Map.add(ASGM2018)
Map.add(ASGM2019)
Map.add(ASGM2021)
// // *****************************************************************************************************************************************/
// // *  CREATION DES WIDGETS ET PANEL AVEC LES INFORMATIONS
// // * 
// // **************************************************************************************************************************************/ 
var header = ui.Label("Expansion l'orpaillage le long du fleuve Bandama (Côte d'Ivoire)", 
{fontSize: '20px', fontWeight: 'bold', color: '#084594'});
// //App summary
var text = ui.Label(
  "Cet outil permet de visualiser l'expansion depuis 2015 de l'orpaillage le long du fleuve Bandama en Côte d'Ivoire. La cartographie a été réalisée" +
  " en appliquant l'algorithme de classification Support Vector Machine (SVM) sur une selection de bandes spectrales et d'indices spectraux derivés de données Sentinel-2 sans nuage."+
  " Pour chaque année, les résultats de la classification appliquée sont précis à plus de 80%. La superficies des terres exploitées est calculée en Ha pour chaque année.  " +
  "Cliquez sur les différentes années pour visualiser cette évolution.",
    {fontSize: '12px'});
var panel = ui.Panel({ 
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-left'}});
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: 'blue'},
  }),
  ui.Label({
    value: "Sélectionner l'année à visualiser.",
    style: {fontSize: '13px', fontWeight: 'bold'}
  })]);
panel.add(intro)
ui.root.insert(0,panel)
// // *****************************************************************************************************************************************/
// // *  
// // * CREATION DE CHECKBOX POUR L'INTERACTION UTILISATEUR
// //  CETTE INTERFACE PERMETTRA A L UTILISATEUR DE VISUALISER LA VARIATION SPATIALE DE L'ORPAILLAGE
// // * 
// // **************************************************************************************************************************************/ 
var extCheck = ui.Checkbox('2015').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('2017').setValue(false);
var extCheck3 = ui.Checkbox('2018').setValue(false);
var extCheck4 = ui.Checkbox('2019').setValue(false);
var extCheck5 = ui.Checkbox('2021').setValue(false);
// //  AJOUTER LES PANELS
panel.add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extCheck4)
      .add(extCheck5)
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  ASGM2015.setShown(checked)
  })
}
doCheckbox();
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  ASGM2017.setShown(checked)
  })
}
doCheckbox2();
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  ASGM2018.setShown(checked)
  })
}
doCheckbox3();
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  ASGM2019.setShown(checked)
  })
}
doCheckbox4();
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  ASGM2021.setShown(checked)
  })
}
doCheckbox5();
// *****************************************************************************************************************************************
// *  ODD 6.6.6 VARATION SPATIAL DE LORPAILLAGE
// * 
// **************************************************************************************************************************************/ 
// ////////////////////////////////////////////////////////
// //  7) Constuction de graphes pour evaluer  la superficie //
// ////////////////////////////////////////////////////////
// //2015
// //Calcul de la superficie en Hectare
var get2015 = ext2015.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Bandama,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
// // //Mettre le contour de la zone d'etude
var feature = ee.Feature(Bandama)
var feature2015 = feature.set('2015', ee.Number(get2015))
// //Construction du graphique
var chart2015= ui.Chart.feature.byProperty(feature2015, ['2015'], ['Total'])
// //Set up title and labels for chart
chart2015.setOptions({
  title: 'SURFACE TOTALE ASGM',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
// // //2017
var get2017 = ext2017.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Bandama,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature2017 = feature.set('2017', ee.Number(get2017))
var chart2017 = ui.Chart.feature.byProperty(feature2017, ['2017'], ['Total'])
chart2017.setOptions({
  title: 'SURFACE TOTALE ASGM',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2018 = ext2018.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Bandama,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature2018 = feature.set('2018', ee.Number(get2018))
var chart2018 = ui.Chart.feature.byProperty(feature2018, ['2018'], ['Total'])
chart2018.setOptions({
  title: 'SURFACE TOTALE ASGM',
  vAxis: {title: 'Superrficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2019 = ext2019.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Bandama,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature2019 = feature.set('2019', ee.Number(get2019))
var chart2019 = ui.Chart.feature.byProperty(feature2019, ['2019'], ['Total'])
chart2019.setOptions({
  title: 'SURFACE TOTALE ASGM',
  vAxis: {title: 'Surficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2021 = ext2021.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:Bandama,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature2021 = feature.set('2021', ee.Number(get2021))
var chart2021 = ui.Chart.feature.byProperty(feature2021, ['2021'], ['Total'])
chart2021.setOptions({
  title: 'SURFACE TOTALE ASGM',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
// // ////////////////////////////////////////////////////////
// // //  8) Create a dropdown menu to display graph results //
// // ////////////////////////////////////////////////////////
// // //Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
var y2015 = '2015'
var y2017 = '2017'
var y2018 = '2018'
var y2019 = '2019'
var y2021 = '2021'
// // //Construct Dropdown
var graphSelect = ui.Select({
  items:[y2015, y2017, y2018,y2019,y2021],
  placeholder:"Choisir l'année ",
  onChange: selectLayer,
  style: {position:'top-right'}
})
var constraints = []
// //Write a function that runs on change of Dropdown
function selectLayer(){
  var graph = graphSelect.getValue() // get value from dropdown selection
  panelGraph.clear() //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  if (graph == y2015){
    panelGraph.add(chart2015)
  }
  else if (graph == y2017){
    panelGraph.add(chart2017)
  }
  else if (graph == y2018){
    panelGraph.add(chart2018)
  }
  else if (graph == y2019){
    panelGraph.add(chart2019)
  }
  else if (graph == y2021){
    panelGraph.add(chart2021)
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
// //Create a new label
var graphLabel = ui.Label({value:"Selectionner l'année pour évaluer les superficies exploitées",
style: {fontWeight: 'bold', fontSize: '13px', margin: '10px 5px'}
});
var contact = ui.Label({
            value:'Ndeye Marame Ngom \n'+
                  "Email:maramengom@gmail.com\n",
                  style: {fontSize: '11px', color:'blue',fontWeight:'bold', }
})
var contact1 = ui.Label({
            value:'Dr. Modou Mbaye \n'+
                  "Email:my.gandhy@gmail.com\n",
                  style: {fontSize: '11px', color:'blue',fontWeight:'bold', }
})
//Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
      .add(contact)
      .add(contact1)