// V. LONJOU CNES DNO/OT/LOT, 04/02/2021
var style = require('users/vincentlonjou/formationGEE:CSSStyle');
//==================================================================================================
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '30%');
// Create an intro panel with labels.
var filtreDate = ui.Panel([
  ui.Label({
    value: 'EducSCO : Analyse des Températures depuis l\'Espace',
    style: {fontSize: '30px', fontWeight: 'bold',backgroundColor: '#E9967A'}
  })
]);
panel.add(filtreDate);
var panelSpatial = ui.Panel([
  ui.Label({
    value: 'Analyse de la distribution spatiale des Températures',
    style: {fontSize: '20px', fontWeight: 'bold',backgroundColor: '#FAEBD7'}
  }),
  ui.Label('Choisissez une date ci-contre et les cartes de température issues de MODIS s\'affichent. Il s\'agit des synthèses temporelles sur 2 semaines.')
]);
panel.add(panelSpatial);
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Analyse temporelle sur différentes échelles de temps',
    style: {fontSize: '20px', fontWeight: 'bold',backgroundColor: '#FAEBD7'}
  }),
  ui.Label('Cliquez sur la carte : un point rouge illustre la localisation choisie. Les graphiques de tendances ci-dessous vous donnent l\'évolution des températures sur différentes échelles de temps à cet endroit. ')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
var alt = ui.Label();
panel.add(ui.Panel([lon, lat,alt], ui.Panel.Layout.flow('horizontal')));
/*
var degDayLabel = ui.Label();
var degNightLabel = ui.Label();
panel.add(ui.Panel([degDayLabel], ui.Panel.Layout.flow('horizontal')));
panel.add(ui.Panel([degNightLabel], ui.Panel.Layout.flow('horizontal'))); 
*/
var degLabel = ui.Label();
panel.add(ui.Panel([degLabel], ui.Panel.Layout.flow('horizontal')));
// 
var tendanceAnnuelle = ui.Panel([
  ui.Label({
    value: 'Tendance annuelle (MODIS, 1km, 2000-2020)',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
]);
panel.add(tendanceAnnuelle);
panel.add(ui.Label('[Cliquez sur une position pour obtenir l\'évolution annuelle]'));
panel.add(ui.Label('[Légende]'));
// 
var tendanceLongTerme = ui.Panel([
  ui.Label({
    value: 'Tendance Long Terme (ERA-5-Land, 0.1 arc deg, 1981-2020)',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
]);
panel.add(tendanceLongTerme);
panel.add( ui.Label('[Cliquez sur une position pour obtenir l\'évolution temporelle toute la période ERA-5]'));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude (deg) = ' + coords.lon.toFixed(2));
  lat.setValue(', Latitude (deg) = ' + coords.lat.toFixed(2));
  // --- get date from dateSlider or Image ---
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'},'Point',1,1);
  Map.layers().set(5, dot);
  var altitudeImage = Map.layers().get(1).getEeObject()
  var landSurfaceTemperatureDegDay = Map.layers().get(2).getEeObject()
  var landSurfaceTemperatureDegNight = Map.layers().get(4).getEeObject()
  var degNight = ee.Number(10*landSurfaceTemperatureDegNight.reduceRegion(ee.Reducer.first(),point,10).get('LST_Night_1km').getInfo()).round().getInfo()/10;
  var degDay   = ee.Number(10*landSurfaceTemperatureDegDay.reduceRegion(ee.Reducer.first(),point,10).get('LST_Day_1km').getInfo()).round().getInfo()/10;
  var altitudePoint   = altitudeImage.reduceRegion(ee.Reducer.first(),point,10).get('elevation').getInfo();
  alt.setValue(', Altitude (m) = ' + altitudePoint);
  //print('degNight='+degNight);
  //degDayLabel.setValue('Temp (°C), jour = ' + degDay);
  //degNightLabel.setValue('Temp (°C), nuit ='+ degNight);
  degLabel.setValue('Température (°C), jour = ' + degDay + '  ,nuit = '+ degNight) ;
  // Jeux de données pour les charts
  var lstNight1Year= ee.ImageCollection('MODIS/006/MOD11A2')
                    .filter(ee.Filter.date(dateMinYear, dateMaxYear)).select(['LST_Night_1km']);
  //var rangeModis = landSurfaceTemperatureDegDay.reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
  //print('Date range Modis: ', ee.Date(rangeModis.get('min')), ee.Date(rangeModis.get('max')))
  //print(landSurfaceTemperatureDegDay.date())
  //  ------------- MODIS LST ---------------
  var lstChart = ui.Chart.image.series(lstNight1Year, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  lstChart.setOptions({
    title: 'Moyenne hebdomadaire de la temperature de surface',
    vAxis: {title: 'Temp (C)'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 12}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  panel.widgets().set(7, lstChart);
    // --------- ERA5 Chart --------------
  var EAR5chart = ui.Chart.image.series(temp2mERA5, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  EAR5chart.setOptions({
    title: 'Température à 2M (deg)',
    vAxis: {title: 'Temp (K)'},
    hAxis: {title: 'Date', format: 'yyyy', gridlines: {count: 20}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  panel.widgets().set(10, EAR5chart);
});
// Register a callback on the default map to be invoked when the map is clicked.
//mapPanel.onClick(generateChart);
Map.style().set('cursor', 'crosshair');
//==================================================================================================
// Add the panel to the ui.root.
ui.root.insert(0, panel);
// ---- update_maps(), fonction de mise à jour des cartes en fonction de la date ----
var update_maps = function(range){
  print('execution de update_maps')
  print(range.start(), range.end())
  //var dateMin=range.start(); // canicule 2003
  var dateMax=range.start().advance(8,"day");
  var dateMin=range.start().advance(-8,"day");
  print(dateMin,dateMax);
  // Synthèse temporelle des données MODIS sur la période temporelle
  var dataset = ee.ImageCollection('MODIS/006/MOD11A2')
                    .filter(ee.Filter.date(dateMin,dateMax));
  var median = dataset.median();
  // Calibration des images MODIS en degres Celcius
  var landSurfaceTemperatureDegNight=median.expression(
    'LST * 0.02-273.15',
    {LST:median.select('LST_Night_1km')
    });
  var landSurfaceTemperatureDegDay=median.expression(
    'LST * 0.02-273.15',
    {LST:median.select('LST_Day_1km')
    });  
  // Correction de la temperature en fonction de l'altitude
  var temperatureElevationCorrectionFactor=elevation.expression(
    'alt * -DegAlt + AltitudeRef * DegAlt',
    {alt:elevation.select('elevation'),
     AltitudeRef:AltitudeRef,
     DegAlt:DegAlt
    });
  var landSurfaceTemperatureDegNightCustomLevel=landSurfaceTemperatureDegNight.add(temperatureElevationCorrectionFactor);
  var layer2 =  ui.Map.Layer(landSurfaceTemperatureDegDay, landSurfaceTemperatureDegVis,
      'Température moyenne de jour',0,1);
  Map.layers().set(2, layer2);
  var layer3 = ui.Map.Layer(landSurfaceTemperatureDegNightCustomLevel, landSurfaceTemperatureDegVis,
      'Température moyenne de nuit corrigée de l\'altitide',0,1);
  Map.layers().set(3, layer3);
  var layer4 = ui.Map.Layer(landSurfaceTemperatureDegNight, landSurfaceTemperatureDegVis,
      'Température moyenne de nuit',1,1);
  Map.layers().set(4, layer4);
}
// ----- variables globales ----------
Map.setCenter(2.394,46.42,  6); // France
var AltitudeRef=50; // m, altitude de reference pour la correction en altitude de la temperature
var DegAlt=0.0065; // deg/km, coef de decroissance de la temperature en fonction de l'altitude
var dateMin='2003-07-20'; // canicule 2003
var dateMax='2003-08-15';
var dateMinYear='2003-01-01';
var dateMaxYear='2003-12-31';
var dateInit='2019-09-15' // date par défaut de l'affichage
var tmin=8; // palette de couleur
var tmax=30;
var palette_temp= [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ];
var landSurfaceTemperatureDegVis = {
  min: tmin,
  max: tmax,
  palette : palette_temp,
};
// Climatologie ERA-5
var temp2mERA5=ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
                  .filter(ee.Filter.date('1981-01-01', '2020-11-01')).select('temperature_2m');
var temp2mERA5Daily=ee.ImageCollection("ECMWF/ERA5/DAILY")
                  .filter(ee.Filter.date('dateMinYear', 'dateMaxYear')).select('mean_2m_air_temperature');
// CORINNE LAND COVER pour analyse 
var datasetClc = ee.Image('COPERNICUS/CORINE/V20/100m/2012');
var landCover = datasetClc.select('landcover');
// MNT
var datasetSrtm = ee.Image('CGIAR/SRTM90_V4');
var elevation = datasetSrtm.select('elevation');
// ---- Affichage des layers permanents----
var layer0 = ui.Map.Layer(landCover, {}, 'Occupation du sol',0,1);
Map.layers().set(0, layer0);
var layer1 = ui.Map.Layer(elevation, {min: 0, max: 3000}, 'Altitude',0,1);
Map.layers().set(1, layer1);
// ---- Gestion de la date d'analyse ----
var start = ee.Image(ee.ImageCollection('MODIS/006/MOD11A2').first()).date().get('year').format();
var end = ee.Date('2020-12-31').format();
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 1,
    onChange: update_maps
  });
  Map.add(dateSlider.setValue(dateInit));
});
/*
https://code.earthengine.google.com/?accept_repo=users/vincentlonjou/formationGEE 
https://code.earthengine.google.com/?accept_repo=users/olivierqueyrut/eolab 
https://developers.google.com/earth-engine/apidocs 
https://developers.google.com/earth-engine/guides/ui_widgets 
*/