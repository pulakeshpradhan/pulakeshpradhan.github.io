///paletele importate sub forma originala de la userul Gennadi Donchyts
///colectia SSM provenita din datele SMAP_2015-2020
///---------------------------------------------------------
var palettes = require('users/gena/packages:palettes');
var paleta_ssm= palettes.misc.jet[7].reverse();
var SSM_init = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2015-04-01', '2020-04-30')).select('ssm');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2015, 2020);
var SSM = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return SSM_init
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('system:time_start', ee.Date.fromYMD(y, m, 1))
        .set('month', m).set('year', y);
  });
}).flatten());
print(SSM)
///mediile pentru anii 2015-2020, luna aprilie folositi pentru vizualizarea dintre cele 2 paneluri
//-----------------------------------------------------------------------------------------------------------------------
var dataset_2015 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2015-04-01', '2015-04-30')).select('ssm').mean();
var dataset_2016 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2016-04-01', '2016-04-30')).select('ssm').mean();
var dataset_2017 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2017-04-01', '2017-04-30')).select('ssm').mean();
var dataset_2018 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2018-04-01', '2018-04-30')).select('ssm').mean();
var dataset_2019 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2019-04-01', '2019-04-30')).select('ssm').mean();
var dataset_2020 = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date('2020-04-01', '2020-04-30')).select('ssm').mean();
///vizualizare individuala pentru datele SSM din panelul stanga 
//-----------------------------------------------------------------------------------------------------------------------
var soilMoistureVis = {
  min: 0.0,
  max: 28.0,
  palette: paleta_ssm,
  opacity:0.8,
};
////functie pentru reprezentarea cu ajutorul paletei definite anterior a mediilor lunii aprilie la nivelul anilor
//----------------------------------------------------------------------------------------------------------------------------------
function stilSSM(img){
  return ee.Image(img
    .visualize(soilMoistureVis).addBands(img)
    .copyProperties(img, img.propertyNames()))}
var images = {
  'Aprilie 2015': stilSSM(ee.Image(dataset_2015)),
  'Aprilie 2016': stilSSM(ee.Image(dataset_2016)),
  'Aprilie 2017': stilSSM(ee.Image(dataset_2017)),
  'Aprilie 2018': stilSSM(ee.Image(dataset_2018)),
  'Aprilie 2019': stilSSM(ee.Image(dataset_2019))
};
////////Elementele panelului stanga destinate informatiilor generale
///----------------------------------------------------------------------------------------------------------
var header = ui.Label('Umiditatea medie a solului la suprafață (primii 5 cm din coloana de sol) obținută cu ajutorul satelitului SMAP al NASA ', {fontSize: '15px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'       Sateliul SMAP al NASA, abrevierea de la Soil Moisture Active Passive, este un satelit de observare a Pământului a cărui misiune principală este măsurarea cantității de apă din sol în orice punct de pe glob.'
+' Fiind un radar în bandă L, cu o rezoluție spațială a datelor de nivel 3 de 25km, SMAP acoperă orice suprafață a Pământului odată la 2-3 zile.'
+' Chiar dacă rezoluția spațială nu permite vizualizări în detaliu a anumitor fenomene, mai ales la nivelul unor unități administrativ teritoriale, acesta este potrivit pentru analize naționale sau regionale. De asemenea rezoluția temporală poate surprinde fenomene în plină desfășurare.',
{fontSize: '11px', textAlign:'justify'});
var text_2 = ui.Label(
'Setul de date reprezentat în această aplicație este unul modelat cu un model Palmer cu 2 nivele care folosește un filtru Kalman pentru asimiliarea datelor, ce a avut la bază datele SMAP de nivel 3.',
{fontSize: '11px', textAlign:'justify'});
var text_3 = ui.Label(
'Surse datelor: '+ 'SMAP, NASA/JPL',
{fontSize: '11px'});
var text_4 = ui.Label('Pentru mai multe informații referitoare la SMAP ',
{fontSize: '11px'}, 'https://smap.jpl.nasa.gov/mission/description/');
var text_5 = ui.Label(
'Paleta de culori folosită a fost dezvoltată de Gennadii Donchyts, Fedor Baart & Justin Braaten ',
{fontSize: '11px'}, 'https://github.com/gee-community/ee-palettes');
var text_6 = ui.Label(
'Autor: Boldeanu George, Laboratorul de Teledetecție și SIG, Administrația Națională de Meteorologie',
{fontSize: '9px', fontWeight:'oblique'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3, text_4, text_5, text_6], 'flow', {width: '300px', position:'top-left'});
//adaugarea hartilor, stanga si dreapta
//---------------------------------------------------------------------------------------------------------------
///harta stanga
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
////harta dreapta 
var rightMap = ui.Map();
var text_2020=ui.Label('Media la nivelul lunii Aprilie 2020', {position:'top-right'});
rightMap.setControlVisibility(false);
rightMap.add(text_2020);
rightMap.addLayer(dataset_2020, {
  min: 0,
  max: 28,
  palette: paleta_ssm,
  opacity:0.8,
});
///definirea unei functii pentru adaugarea variabilei images(cea care contine mediile pentru luna aprilie)
///
///---------------------------------------------------------------------------------------------------------------------------------------
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Media la nivelul lunii:');
  // functie care schimba harta cu imaginea selectata din selector
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  //configurarea selectorului pentru  a permite utilizatorului de a alege intre imagini
  //si setam ca harta sa isi update cu fiecare selectie
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
///Crearea acestui splitPanel ce va lipi ambele harti conectate(linked maps)
///---------------------------------------------------------------------------------------------------------------
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(25, 45, 7);
///crearea functie makeColorBarParams unde se definesc paramterii paletei de culori folosite in legenda
//-------------------------------------------------------------------------------------------------------------------
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
//creearea barei de culori ce va fi folosita ca legenda
//-------------------------------------------------------------------------------------------------------------------------
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(soilMoistureVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// creeare unui panel ce contine 3 valori pentru legenda
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(soilMoistureVis.min, {margin: '4px 8px'}),
    ui.Label(
        (soilMoistureVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(soilMoistureVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: '  Umiditatea medie a solului în mm',
  style: {fontWeight: 'bold', textAlign: 'center'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
toolPanel.add(legendPanel);
///creeare unui panel nou unde se va crea graficul pentru a reprezenta valorile medii lunare ale SSM
//////////////////////////////////////////
var inspectorPanel = ui.Panel({style: {width: '30%', position:'top-left'}});
// creearea unui panel explicativ al graficului
var intro = ui.Panel([
  ui.Label({
    value: 'Valorile medii lunare ale umidității solului',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Pentru a vizualizarea valorilor medii ale umidității solului se face click oriunde in harta stângă')
]);
inspectorPanel.add(intro);
// creeare unor etichete pentru a tine longitutidinea si latitudinea 
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// adaugarea de inlocuitori pentru grafic 
inspectorPanel.add(ui.Label('[Grafic]'));
///Configurarea graficului ce va arata valorile medii lunare
//-----------------------------------------------------------------------------------------------------------------
//generarea unui nou grafic pentru coordonatele date
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // adaugarea unui punct cand facem click
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'da0202'}, 'clicked location');
  //adaugarea punctului ca al doilea strat, pentru aparitia deasupra hartii
  leftMap.layers().set(1, dot);
   // realizarea unui grafic temporal
  var sstChart = ui.Chart.image.series(SSM, point, ee.Reducer.mean(), 500).setChartType('LineChart');
  //customizarea graficului
  sstChart.setOptions({
    title: 'Umiditaea solului pentru perioada 2015-2020 (medii lunare)',
    vAxis: {title: 'SSM (mm)'},
    hAxis: {title: 'Dată', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 1,
        pointsVisible: false,
        pointSize: 0,
      },
    },
    legend: {position: 'right'},
  });
  // adaugarea graficului in pozitie fixa pentru ca cel vechi sa fie inlocuit de cel nou
  inspectorPanel.widgets().set(2, sstChart);
};
ui.root.widgets().add(toolPanel);
// creeare unui onClick pentru generearea graficului de fiecare data cand se face click pe harta
leftMap.onClick(generateChart);
// configurarea cursorului
leftMap.style().set('cursor', 'crosshair');
// Initializarea hartii cu un punct de test in punctul initial
var initialPoint = ee.Geometry.Point(25, 45);
leftMap.centerObject(initialPoint, 7);
leftMap.add(inspectorPanel)
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});