/**
 * @file    users/satropcool/Deforestation:main
 * @desc    Script principal, on y importe les images, les traites et les affiches
 * @author  Pauline Perbet
 * @author  Gena
 * @author  Alexis St-Amand
 * @author  Anouk Ville
 * @version 0.2
 */
// Imports
/**
 * @var     assets
 * @type    Object
 * @desc    Obtention des modules pour limiter la duplication des imageries de date de Gena
 * @warning assets ralentit le script, il existe peut-être quelque chose de plus rapide
 */
var assets = require('users/gena/packages:assets');
/**
 * @var     zone
 * @type    Polygone
 * @desc    Récupère, affiche et centre la zone géographique à étudier.
 */
var zone = require("users/satropcool/Deforestation:Donnees/Geographie").studyArea;
/**
 * @var     dates
 * @type    Object [de Date]
 * @desc    Récupère à l'indice 'start' la date de début et à l'indice 'stop' 
 *          la date de fin
 */
var dates = require('users/satropcool/Deforestation:Donnees/Dates').dates(-3, 'month');
/**
 * @function  filtre
 * @param     String    collection  La collection d'image à filtrer
 * @param     Polygone  zone        La zone dans laquelle les images sont filtrées
 * @param     List      dates       La liste de dates pour filtrer 
 *                                  (éventuellement un dictionnaire)
 * @return    ImageCollection
 * @desc      Filtre les collections d'images de lansat 8 et sentinel 2 
 *            en fonction des dates de dates et de la zone
 * @warning   filtre est importée dans le script principal, même si elle n'y est
 *            pas utilisée, pour limiter l'exécution de son script
 */
var filtre = require("users/satropcool/Deforestation:TraitementImg/Filtre").filtre;
/**
 * @function  CVA
 * @param     Image time2 Image à transformer en CVA
 * @param     Image timeM Image de référence
 * @param     Int   band1 Numéro de la première bande à considérer
 * @param     Int   band2 Numéro de la deuxième bande à considérer
 * @param     Int   band3 Numéro de la troisième bande à considérer
 * @return    Image Image changée en change vector analysis
 * @desc      Transforme time2 en change vector analysis (CVA)
 * @warning   La nomenclature des variable peut être amméliorée
 */
var CVA = require('users/satropcool/Deforestation:TraitementImg/CVA').CVA;
/**
 * @function  alertFn
 * @param     Image     img             Image à traiter
 * @param     Image     timeM           Image de référence
 * @param     Function  CVA             Fonction pour changer l'image en CVA
 * @param     String    id              Identifiant du module traité
 * @param     Function  arbreDeDecision Fonction déterminant le niveau d'alerte
 * @return    Image
 * @desc      Détermine le niveau d'alerte d'une image
 * @warning   La nomenclature des variable peut être amméliorée
 */
var alertFn = require('users/satropcool/Deforestation:TraitementImg/Alert').alert;
/**
 * @var     L8
 * @type    Dictionary
 * @desc    Récupère les images de lansat 8 formatées de diverses façons
 *          ImageCollection alertL8       Images filtrées
 *          ImageCollection changeL8Mask  Images sans nuages
 *          ImageCollection collectionL8  Images avec niveau d'alerte
 *          ImageCollection lansat8       Images combinées
 * @note  var.element accède à cet élément de var (ex: L8.alertL8)
 */
var L8 = require('users/satropcool/Deforestation:Modules/L8').L8(zone, 
                                                                dates, 
                                                                assets,
                                                                ee.Reducer.median(),
                                                                filtre,
                                                                CVA,
                                                                alertFn);
/**
* @var     S2
* @type    Dictionary
* @desc    Récupère les images de sentinel 2 formatées de diverses façons
*          ImageCollection S2            Images filtrées de sentinel 2
*          ImageCollection tMeanS2       Image de référence de sentinel 2
*          ImageCollection collectionS2  Images combinées de sentinel 2
* @note  var.element accède à cet élément de var (ex: S2.S2)
*/
var S2 = require('users/satropcool/Deforestation:Modules/S2').S2(zone,
                                                                dates,
                                                                assets,
                                                                ee.Reducer.median(),
                                                                filtre,
                                                                CVA,
                                                                alertFn);
/**
* @var     S1
* @type    Dictionary
* @desc    Récupère les images de sentinel 1 formatées de diverses façons
*          ImageCollection toutS1        Images filtrées de sentinel 1
*          ImageCollection selectionS1   Image formatées sentinel 1
*          ImageCollection collectionS1  Images combinées de sentinel 1
* @note    var.element accède à cet élément de var (ex: S1.toutS1)
*/
var S1 = require('users/satropcool/Deforestation:Modules/S1').S1(zone, dates);
// Traitement des images
/**
* @var   mergedSensors
* @type  ImageCollection
* @desc  Une collection contenant les images des trois sensors réunies
*/
var mergedSensors = L8.collectionL8.merge(S2.collectionS2).merge(S1.collectionS1);
/**
* @var   scoreTotal
* @type  Image
* @desc  Fusion des Images triées par dates
*/
var scoreTotal = require('users/satropcool/Deforestation:TraitementImg/TriDates')
                    .scoreTotal(mergedSensors.sort('system:time_start'));
/**
* @var   maskScoreTotal
* @type  Image
* @desc  Crée un mask de scoreTotal avec les images plus grandes que 1
*/
var maskScoreTotal = scoreTotal.updateMask(scoreTotal.gt(1));
// Cette partie n'est pas nécessaire, mais elle le sera peut-être plus tard?
// Elle change les images en vectoriel
// /**
// * @var   resultatScoreFinal
// * @type  Dictionary
// * @desc  Permet d'accéder à une collection de feature et une image du score final
// *        FeatureCollection featureCol  Collection de features du score final
// *        Image             process     Collection changée en image pour de futures opérations
// * @note  var.element accède à cet élément de var (ex: resultatScoreFinal.process)
// */
// var resultatScoreFinal = require('users/satropcool/Deforestation:TraitementImg/Vectoriser')
//                         .resultatScoreFinal(scoreTotal, maskScoreTotal, zone, dates);
// /**
// * @var   contoursResultatScoreFinal
// * @type  Image
// * @desc  Une image comprenant les contours de resultatScoreFinale.featureCol et ses données
// *        On y ignore les zones de moins de 9 pixels
// */
// var contoursResultatScoreFinal = require('users/satropcool/Deforestation:TraitementImg/Contours')
//                                 .contours(resultatScoreFinal.featureCol);
// Affichage (pourrait éventuellement ce faire dans un autre script)
Map.addLayer(maskScoreTotal.clip(zone), 
            {bands    : ['deforestation'], 
            min      : 1, 
            max      : 10, 
            palette  : ['blue', 'yellow', 'red']}, 
            'TotalScore_mask');
// Map.addLayer(contoursResultatScoreFinal, 
//             {palette : ['blue', 'yellow', 'red']}, 
//             'Contours de différente couleur');
// Exports
// /**
// * @var   names
// * @type  String
// * @desc  Nom du fichier à exporter (format: Alert_SCORE_dateDébut_to_dateFin)
// */
// var names = 'Alert_SCORE_'
//           + dates.start.format("dd_MM-YYYY").getInfo() 
//           + '_to_' 
//           + dates.stop.format("dd_MM-YYYY").getInfo();
// Export.table.toDrive({
//   collection  : resultatScoreFinal.featureCol,
//   description : names,
//   folder      : 'test',
//   fileFormat  : 'GeoJSON'
// });
Export.image.toDrive({
  image: maskScoreTotal.clip(zone),
  description: 'Result_TotalScore_mask_newlenght',
  folder: 'test',
  scale: 30,
  region: zone,
  maxPixels: 160000000
});
print('main loaded');