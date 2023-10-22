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
    keurmassar = ui.import && ui.import("keurmassar", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.350670917745553,
                14.756101949269649
              ],
              [
                -17.32457838844868,
                14.7531139326746
              ],
              [
                -17.25110731911274,
                14.73153259488731
              ],
              [
                -17.22295485329243,
                14.768717566760888
              ],
              [
                -17.25934706520649,
                14.782328332790918
              ],
              [
                -17.246987446065866,
                14.803738664482761
              ],
              [
                -17.248286133343704,
                14.855771660204363
              ],
              [
                -17.367075806195267,
                14.80300155877303
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
        [[[-17.350670917745553, 14.756101949269649],
          [-17.32457838844868, 14.7531139326746],
          [-17.25110731911274, 14.73153259488731],
          [-17.22295485329243, 14.768717566760888],
          [-17.25934706520649, 14.782328332790918],
          [-17.246987446065866, 14.803738664482761],
          [-17.248286133343704, 14.855771660204363],
          [-17.367075806195267, 14.80300155877303]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "built"
        ],
        "min": 1,
        "max": 1,
        "palette": [
          "21f5ff"
        ]
      }
    }) || {"opacity":1,"bands":["built"],"min":1,"max":1,"palette":["21f5ff"]},
    sit2017 = ui.import && ui.import("sit2017", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2017"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2017"),
    sit2018 = ui.import && ui.import("sit2018", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2018"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2018"),
    sit2019 = ui.import && ui.import("sit2019", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2019"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2019"),
    sit2020 = ui.import && ui.import("sit2020", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2020"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2020"),
    sit2021 = ui.import && ui.import("sit2021", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2021"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2021"),
    sit2022 = ui.import && ui.import("sit2022", "image", {
      "id": "projects/ee-dimkha2031/assets/Annee_2022"
    }) || ee.Image("projects/ee-dimkha2031/assets/Annee_2022");
/*****************************************************************************************************************************************
*  CHAPITRE 5:  SUIVI DE L'EXPANSION DE L'ORPAILLAGE DUR LE BANDAMA
* 
**************************************************************************************************************************************/ 
var baseMap = require('users/tl2581/packages:baseMap.js');
Map.setOptions('ROADMAP');
Map.centerObject(keurmassar,11.5)
Map.style().set('cursor', 'crosshair');
// *****************************************************************************************************************************************
// *  CREAATION DE LA COUCHE DES CARTES AVEC LEUR COULEURS RESPECTIVE
// * L'UTILISATEUR FERA L4ACTION DE CHOISIR LA COUCHE A VISUALISER
// * 
// **************************************************************************************************************************************/ 
var CAD2017 = ui.Map.Layer(sit2017, {palette:['C0CA19'], min:1, max:1}, 'Extent 2017',false)
var CAD2018 = ui.Map.Layer(sit2018, {palette:['41CA19'], min:1, max:1}, 'Extent 2018',false)
var CAD2019 = ui.Map.Layer(sit2019, {palette:['19C6CA'], min:1, max:1}, 'Extent 2019',false)
var CAD2020 = ui.Map.Layer(sit2020, {palette:['194CCA'], min:1, max:1}, 'Extent 2020',false)
var CAD2021 = ui.Map.Layer(sit2021, {palette:['CA19CA'], min:1, max:1}, 'Extent 2021',false)
var CAD2022 = ui.Map.Layer(sit2022, {palette:['FF0000'], min:1, max:1}, 'Extent 2022',false)
Map.add(CAD2017)
Map.add(CAD2018)
Map.add(CAD2019)
Map.add(CAD2020)
Map.add(CAD2021)
Map.add(CAD2022)
// // *****************************************************************************************************************************************/
// // *  CREATION DES WIDGETS ET PANEL AVEC LES INFORMATIONS
// // * 
// // **************************************************************************************************************************************/ 
var header = ui.Label("Evolution de l'etalement urbain dans le Département de Keur Massar en environs (SENEGAL)", 
{fontSize: '20px', fontWeight: 'bold', color: '#084594'});
// //App summary
var text = ui.Label(
  "Cet outil permet de visualiser l'evolution de keur Massar et les communes environnantes. Cette cartographie a été réalisée" +
  " en utillisant une methode d'apprentissage profond (DEEP LEARNING)." +
  "L'outil est basé sur un modele DYNAMIC WORLD qui propose une mise à jour de la couverture terrestre mondiale (Sentinel-2 sans nuage )tous les 2 à 5 jours en fonction de l'emplacement.."+
  " Pour chaque année, les résultats sont obtenus a l'aide de GEE et de sa plateforme d'Intelligence Artificielle.Les superficies des evolutions annuelles  sont calculéeS en Ha pour chaque année.  " +
  "Cette application pourrait etre d'un grand apport pour l'elargissement de l'assiette fiscale pour la DGID, permettre d'anticiper sur l'etalement urbain (Urbanisme) ,d'anticiper sur les desserts de reseaux electriques ,eaux et d'assainissements etc." +
  "Ce modele est juste un test et peut etre generalisé sur toute l'etendue du territoire.",
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
var extCheck = ui.Checkbox('2017').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('2018').setValue(false);
var extCheck3 = ui.Checkbox('2019').setValue(false);
var extCheck4 = ui.Checkbox('2020').setValue(false);
var extCheck5 = ui.Checkbox('2021').setValue(false);
var extCheck6 = ui.Checkbox('2022').setValue(false);
// //  AJOUTER LES PANELS
panel.add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extCheck4)
      .add(extCheck5)
      .add(extCheck6)
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  CAD2017.setShown(checked)
  })
}
doCheckbox();
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  CAD2018.setShown(checked)
  })
}
doCheckbox2();
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  CAD2019.setShown(checked)
  })
}
doCheckbox3();
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  CAD2020.setShown(checked)
  })
}
doCheckbox4();
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  CAD2021.setShown(checked)
  })
}
doCheckbox5();
var doCheckbox6 = function() {
  extCheck6.onChange(function(checked){
  CAD2022.setShown(checked)
  })
}
doCheckbox6();
// *****************************************************************************************************************************************
// *  ODD 6.6.6 VARATION SPATIAL DE LORPAILLAGE
// * 
// **************************************************************************************************************************************/ 
// ////////////////////////////////////////////////////////
// //  7) Constuction de graphes pour evaluer  la superficie //
// ////////////////////////////////////////////////////////
// //2015
// //Calcul de la superficie en Hectare
var get2017 = sit2017.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
// // //Mettre le contour de la zone d'etude
var feature = ee.Feature(keurmassar)
var feature2017 = feature.set('2017', ee.Number(get2017))
// //Construction du graphique
var chart2017= ui.Chart.feature.byProperty(feature2017, ['2017'], ['Total'])
// //Set up title and labels for chart
chart2017.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
// // //2017
var feature2017 = feature.set('2017', ee.Number(get2017))
var chart2017 = ui.Chart.feature.byProperty(feature2017, ['2017'], ['Total'])
chart2017.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2018 = sit2018.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
var feature2018 = feature.set('2018', ee.Number(get2018))
var chart2018 = ui.Chart.feature.byProperty(feature2018, ['2018'], ['Total'])
chart2018.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Superrficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2019 = sit2019.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
var feature2019 = feature.set('2019', ee.Number(get2019))
var chart2019 = ui.Chart.feature.byProperty(feature2019, ['2019'], ['Total'])
chart2019.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Surficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2020 = sit2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
var feature2019 = feature.set('2020', ee.Number(get2020))
var chart2020 = ui.Chart.feature.byProperty(feature2019, ['2020'], ['Total'])
chart2020.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Surficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2021 = sit2021.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
var feature2021 = feature.set('2021', ee.Number(get2021))
var chart2021 = ui.Chart.feature.byProperty(feature2021, ['2021'], ['Total'])
chart2021.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
  vAxis: {title: 'Superficie en Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Annee',
    logScale: false
  }
});
var get2022 = sit2022.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:keurmassar,
      scale: 10,
      maxPixels:1e13,
      tileScale: 16
      }).get('built');
var feature2022 = feature.set('2022', ee.Number(get2022))
var chart2022 = ui.Chart.feature.byProperty(feature2022, ['2022'], ['Total'])
chart2022.setOptions({
  title: 'SURFACE TOTALE EVOLUEE',
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
var y2017 = '2017'
var y2018 = '2018'
var y2019 = '2019'
var y2020 = '2020'
var y2021 = '2021'
var y2022 = '2022'
// // //Construct Dropdown
var graphSelect = ui.Select({
  items:[y2017, y2018, y2019,y2020,y2021,y2022], 
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
  if (graph == y2017){
    panelGraph.add(chart2017)
  }
  else if (graph == y2018){
    panelGraph.add(chart2018)
  }
  else if (graph == y2019){
    panelGraph.add(chart2019)
  }
  else if (graph == y2020){
    panelGraph.add(chart2020)
  }
  else if (graph == y2021){
    panelGraph.add(chart2021)
  }
  else if (graph == y2022){
    panelGraph.add(chart2022)
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
var graphLabel = ui.Label({value:"Selectionner l'année pour évaluer les superficies evoluées",
style: {fontWeight: 'bold', fontSize: '13px', margin: '10px 5px'}
});
var contact = ui.Label({
            value:'Cheikh Ahmadou Bamba Ngom \n'+
                  "Email:bamba2030@hotmail.fr\n",
                  style: {fontSize: '11px', color:'blue',fontWeight:'bold', }
})
//Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
      .add(contact)