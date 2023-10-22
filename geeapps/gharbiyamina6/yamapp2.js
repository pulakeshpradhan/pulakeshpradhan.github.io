/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var faomatifou = ee.FeatureCollection("users/gharbiyamina6/bv_matifou");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var GPM = ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06");
var dsm = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2");
var ETIa = ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D");
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
var elevPalette = ['yellow', 'green', 'Brown'];
var elev = {min: 0, max: 1000, palette: elevPalette};
Map.centerObject(faomatifou,10,5);
//sélectionner la première bande 'DSM' et mosaïque puis clip le DSM à la limite de la zone d'étude faomatifou
var dsm_faomatifou = dsm.select('DSM').filterBounds(faomatifou).mosaic().clip(faomatifou);
print(dsm_faomatifou);
//  ajouter le DSM découpé à la vue de la carte
Map.addLayer(dsm_faomatifou, elev, 'Elevation (ALOS)');
// retourner le nombre de jours dans le mois
function getDaysInMonth(y,m) {
  var dt = ee.Date.fromYMD(y,m,1);
  var n = dt.advance(1,"month").difference(dt,'day');
  return n;
}
//convertir les mm/hr en mm/mois pour
var monthly = function(image) {
  var dt = ee.Date(image.get("system:time_end"));
  var y = dt.get('year');
  var m = dt.get('month');
  var days = getDaysInMonth(y,m);
  return image.multiply(days).multiply(24).copyProperties(image, ["system:time_start", "system:time_end"]);
};
// selectionner la bande avec l'information sur la précipitation
// Filtrer à deux ans d'octobre 2018 à septembre 2020 (2 ans)
var pcp = GPM.filterDate('2018-10-01', '2020-09-30')
              .filterBounds(faomatifou)
              .select('precipitation');
// Appliquer la fonction monthly à la collection d'images 'pcp' pour
// convertir mm/hr à mm/mois
var pcp_monthly = pcp.map(monthly);
// Filtrer ETIa à la zone d'étude faomatifou
// Filtrer à deux ans d'octobre 2018 à septembre 2020 (2 ans)
var ETIa_filt = ETIa.filterDate('2018-10-01', '2020-09-30')
                    .filterBounds(faomatifou);
 // Pour l'application web, afficher la légende de l'élévation
// La fonction ce dessous créune légend en tant que vignette insérée à l'IU au panneau (interface utilisateur)
function makeLegend(elev) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((elev.max-elev.min)/100.0).add(elev.min);
  var legendImage = gradient.visualize(elev);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
          position: 'bottom-right',
          padding: '5x 5px',
          color: '000000'
    },
    widgets: [
      ui.Label(String(elev.min)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(250)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(500)),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(String(750)), 
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label(elev.max)
    ]
  });
  // Créer le titre de la légende //
  var legendTitle = ui.Label({
    value: 'Elevation (m)',
    style: {
      stretch: 'horizontal',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  });
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,10,100,8', dimensions:'356x15'}, 
    style: {padding: '0.5px'}
  });
  return ui.Panel({style:{position: 'bottom-right'}}).add(legendTitle).add(thumb).add(panel);
}
Map.add(makeLegend(elev));                   
//  pour l'application web, créer un panneau  qui affichera des séries temporelles en cliquant sur la carte à l'intérieur de faomatifou
// Création de deux graphiques : i) les précipitations mensuelles et ii) l'ETIa décadaire de deux années
// Affiche également la valeur d'élévation lors d'un clic sur un pixel
var panel = ui.Panel({
    style: {fontSize: '20px', color: '114982'}
});
// Créer un panneau pour afficher des labels comme du texte
var text = ui.Panel([
  ui.Label({
    value: 'My first App',
    style: {fontSize: '30px', fontWeight: 'bold', color: '#2F4F4F'}
  }),
  ui.Label({
    value:'Click a point on the map to explore the variable over time',
    style: {fontSize: '14px', fontWeight: 'bold', maxWidth: '400px', color: '#2F4F4F'}
  }),
]);
// Ajoutez le nouveau panneau de texte au panneau de base.
panel.add(text);
// Créer un panneau pour afficher la valeur de l'élévation au clic
var inspector = ui.Panel([ui.Label('Click to get Elevation')]);
panel.add(inspector);
// définir les panneaux pour afficher des objets dynamiques -
// Valeurs d'élévation, carte des précipitations, carte ETIa
Map.onClick(function(coords) {
   // Ajouter un graphe pour mettre le tableau des précipitations mensuelles
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  var sample = dsm_faomatifou.sample(point, 30);
  var computedValue = sample.first().get('DSM');
  // Demander la valeur au serveur.
  computedValue.evaluate(function(result) {
  // Lorsque le serveur renvoie la valeur, l'afficher.
  inspector.widgets().set(0, ui.Label({
  value: 'Elevation: ' + result,
    }));
  });
    var chart1 = ui.Chart.image.series({
    imageCollection: pcp_monthly.select(['precipitation']),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30
  });
  chart1.setOptions({
    title: 'Monthly Precipitation 2019',
    vAxis: {title: 'P (mm)', gridlines: {count: 10}},
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    label: 'ETa',
    width: 250,
    height: 250,
    //interpolateNulls: true,
    //curveType: 'function'
  });
  chart1.setChartType('ColumnChart');
  panel.widgets().set(2, chart1);
       //////second graph
    var chart2 = ui.Chart.image.series({
    imageCollection: ETIa_filt.select('L1_AETI_D'),
    region: point, 
    reducer: ee.Reducer.mean(), 
    scale: 250
  });
  chart2.setOptions({
    title: 'Dekadal ETIa',
    vAxis: {title: 'ETIa', gridlines: {count: 10}, maxValue: 0.5, minValue: 0 },
    hAxis: {title: 'month', format: 'MM-yy', gridlines: {count: 10}},
    width: 250,
    height: 250,
    colors: ['#09F310'],
    interpolateNulls: true,
    curveType: 'function'
  });
  panel.widgets().set(3, chart2);
});
// Ajouter le panneau défini ci-dessus à la racine
ui.root.insert(0, panel);