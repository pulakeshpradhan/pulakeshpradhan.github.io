var countries = ui.import && ui.import("countries", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    GPM = ui.import && ui.import("GPM", "imageCollection", {
      "id": "NASA/GPM_L3/IMERG_MONTHLY_V06"
    }) || ee.ImageCollection("NASA/GPM_L3/IMERG_MONTHLY_V06"),
    CHIRPS = ui.import && ui.import("CHIRPS", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
/*
    Created by Cristiano Almeida, Filipe Carvalho & Emerson Freitas
    Begin: March.25.2021
    First version: May.11.2021 (version 1.0)
    Example from NASA ARSET sobre criação de user interface (ui) no GEE
    Source: https://www.youtube.com/watch?v=1eXQw8_Wy8k&t=1511s
    Código das cores: https://www.homehost.com.br/blog/tutoriais/tabela-de-cores-html/
*/
//////////////////////////////////////////////////////////////////
//     0 - Manipulação de nossos dados
//////////////////////////////////////////////////////////////////
// ------------------------------------- Region of interest ---------------------------------
var brazil = countries.filter(ee.Filter.eq('ADM0_NAME', 'Brazil'));
// --------------------------------- Selecting years of interest ----------------------------
// ------------ IMERG DATA
var startyear_gpm = 2001;
var endyear_gpm = 2020;
var years_gpm = ee.List.sequence(startyear_gpm, endyear_gpm);
// ------------ CHIRPS DATA
var startyear_chirps = 1981;
var endyear_chirps = 2020;
var years = ee.List.sequence(startyear_chirps, endyear_chirps);
// -------------------------------------- Clipping function ---------------------------------
var clipToCol = function(image){
  return image.clip(brazil);
};
// ------------------------------------ Yearly mean rain function ---------------------------------
var get_yearly_rainfall_chirps = function(year){
  var y = ee.Number(year);
  var data = CHIRPS.filter(ee.Filter.calendarRange(y,y,'year')).map(clipToCol);
  return data.sum().set('system:time_start',y);
};
var get_yearly_rainfall_gpm = function(year){
  var y = ee.Number(year);
  var data = GPM.select('precipitation').filter(ee.Filter.calendarRange(y,y,'year')).map(clipToCol);
  return data.sum().set('system:time_start',y);
};
// -------------------------------------- Presentation data ----------------------------------------
var chirps2020 = CHIRPS.filter(ee.Filter.calendarRange(endyear_chirps, endyear_chirps,'year')).sum().clip(brazil);
var imerg2020 = GPM.select('precipitation').filter(ee.Filter.calendarRange(endyear_gpm,endyear_gpm,'year')).sum().clip(brazil).multiply(30.45*24);
var imergMean = ee.ImageCollection(years_gpm.map(get_yearly_rainfall_gpm)).mean().multiply(30.45*24); 
var chirpsMean = ee.ImageCollection(years.map(get_yearly_rainfall_chirps)).mean();
var chirps_anomalie = ee.Image(((chirps2020.subtract(chirpsMean)).divide(chirpsMean)).multiply(100));
var imerg_anomalie = ee.Image(((imerg2020.subtract(imergMean)).divide(imergMean)).multiply(100));
// var chirps_anomalie = chirps2020.subtract(chirpsMean);
// var imerg_anomalie = imerg2020.subtract(imergMean);
// ------ Min/max visualization
// var minMaxValues = chirps_anomalie.reduceRegion({
//   reducer: ee.Reducer.minMax(),
//   geometry: brazil,
//   crs: 'EPSG:4326',
//   crsTransform: [1,0,0,0,1,0],
//   maxPixels: 5000
// });    
// print('Max precipitation:', minMaxValues.get('precipitation_max'));
// print('Min precipitation:', minMaxValues.get('precipitation_min'));
// ---------- Insert in the visualization parameters - These values will appear in the legend --------------
// ------ Min/Max mean and yearly precipitation
var minn = 400;   // CHIRPS 2020: 566.36   CHIRPS_MEAN:   IMERG 2020: 479.08   IMERG_MEAN: 499.58
var maxx = 3600;  // CHIRPS 2020: 3312.58  CHIRPS_MEAN:: 3516.89  IMERG_MEAN: 3570.87
var minn2 = -60;  // CHIRPS:-45.84       IMERG: -42.95
var maxx2 = 60;   // CHIRPS: 76.32       IMERG: 57.36
// Código de cores para anomalia em mm ['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837']
// var palette = ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'].reverse();
// var palette2 = ['3907ff', '03fff3', '28ff25', 'fbff09', 'ff1105'].reverse();
var palette = [ 
  '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
].reverse();
var palette2 = [ 
  '000096','0064ff', '00b4ff', '33db80', '9beb4a',
  'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
].reverse();
var visualParams = ee.Dictionary({
  min: minn, 
  max: maxx, 
  palette: palette
});
var visualParams_anomaly = ee.Dictionary({
  min: minn2, 
  max: maxx2, 
  palette: palette2
});
// ------------------------------------------ Map layer to add ------------------------------------------
Map.addLayer(brazil, {}, 'Brasil');
var extIMERGAnomaly = ui.Map.Layer(imerg_anomalie, visualParams_anomaly.getInfo(), 'IMERG (Anomalia)',false);
Map.add(extIMERGAnomaly);
var extCHIRPSAnomaly = ui.Map.Layer(chirps_anomalie, visualParams_anomaly.getInfo(), 'CHIRPS (Anomalia)',false);
Map.add(extCHIRPSAnomaly);
var extIMERGMean = ui.Map.Layer(imergMean, visualParams.getInfo(), 'IMERG (Média hist)',false);
Map.add(extIMERGMean);
var extCHIRPSMean = ui.Map.Layer(chirpsMean, visualParams.getInfo(), 'CHIRPS (Média hist)',false);
Map.add(extCHIRPSMean);
var extIMERG2020 = ui.Map.Layer(imerg2020, visualParams.getInfo(), 'IMERG (Ano 2020)',false);
Map.add(extIMERG2020);
var extCHIRPS2020 = ui.Map.Layer(chirps2020, visualParams.getInfo(), 'CHIRPS (Ano 2020)',false);
Map.add(extCHIRPS2020);
// ------------------------------------------- Begin setting up map appearance and app layers ---------------------------------------------------------
// ---- Set up general display
//Map.setOptions('Satellite');            // ---- Set a satellite background
Map.centerObject(brazil, 4);            // ---- set map center
Map.style().set('cursor', 'crosshair'); // ---- Change style of cursor to 'crosshair'
// ---- App title
var header = ui.Label('Climatologia da precipitação no Brasil', 
  {fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#1E90FF'});
// ---- App summary
var text = ui.Label(
  'Este app (versão 1.0) foi desenvolvido para análise das anomalias (ano 2020) da precipitação no Brasil usando produtos de ' +
  'sensoriamento remoto, o CHIRPS e o IMERG.',
  {fontSize: '12px'});
var text1 = ui.Label(
  'O app foi desenvolvido por professores e alunos do Programa de Pós-graduação em Eng. Civil ' +
  'e Ambiental da Universidade Federal da Paraíba.',
  {fontSize: '12px'});
// ---- Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text, text1],//Adds header and text
  style:{width: '300px',
  position:'middle-right'}});
// ---- Create variable for additional text and separators
// ---- This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '#1E90FF'},
  }),
  ui.Label({
    value:'Selecione um dos produtos para visualização e análise.',
    style: {fontSize: '12px', fontWeight: 'bold'}
  })]);
// ---- Add this new panel to the larger panel we created 
panel.add(intro);
// ---- Add our main panel to the root of our GUI
ui.root.insert(1,panel);
// ---- Add checkbox widgets and legends               
// ---- Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Mangrove Extent',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// ---- Add checkboxes to our display
// ---- Create checkboxes that will allow the user to view the extent map for different data
var checkBox_CHIRPS2020 = ui.Checkbox('CHIRPS (Ano 2020)').setValue(false); //false = unchecked
var checkBox_IMERG2020 = ui.Checkbox('IMERG (Ano 2020)').setValue(false);
var checkBox_CHIRPSMean = ui.Checkbox('CHIRPS (Média hist.)').setValue(false);
var checkBox_IMERGMean = ui.Checkbox('IMERG (Média hist.)').setValue(false);
var checkBox_CHIRPSAnomaly = ui.Checkbox('CHIRPS (Anomalia)').setValue(false);
var checkBox_IMERGAnomaly = ui.Checkbox('IMERG (Anomalia)').setValue(false);
// ---- Adding reference source
var source_lab = ui.Label({value:'Clique aqui para acessar o Boletim de dados de chuva',
  style: {fontSize: '12px', margin: '10px 5px'}
});
source_lab.setUrl('https://www.researchgate.net/publication/351491835_BOLETIM_ANUAL_SOBRE_A_CHUVA_NO_BRASIL_ANALISE_A_PARTIR_DE_DADOS_DE_SENSORIAMENTO_REMOTO_Maio_de_2021');
var contact = ui.Label({value:'E-mail para contato: almeida74br@yahoo.com.br',
  style: {fontSize: '12px', margin: '10px 5px'}
});
// ---- Create legends
// ---- Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// ---- This uses function to construct a legend for the given single-band vis parameters
// ---- Function
var legendImage = function makeLegend3 (vis) {
  var visualParams_anomaly = vis;
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((visualParams_anomaly.getInfo().max-visualParams_anomaly.getInfo().min)/100.0).add(visualParams_anomaly.getInfo().min);
  var legendImag = gradient.visualize(visualParams_anomaly.getInfo());
  return ee.ImageCollection(legendImag);
};
// ---- Applying Second function
var legendImage_mean = legendImage(visualParams);
var legendImage_anomaly = legendImage(visualParams_anomaly);
// ---- Legend for mean and yearly rainfall
var intro2 = ui.Panel([
  ui.Label({
    value:'Legenda precipitação anual e média',
    style: {fontSize: '13px', fontWeight: 'bold'}
  })]);
var panel0 = ui.Panel({
    widgets: [
      ui.Label(minn+' mm'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(maxx +' mm')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
var thumb0 = ui.Thumbnail({
  image: legendImage_mean, 
  params: {bbox:'0,0,100,8', dimensions:'256x20'},  
  style: {position: 'bottom-center'}
});
// ---- Legend for anomaly
var intro3 = ui.Panel([
ui.Label({
  value:'Legenda anomalia da precipitação',
  style: {fontSize: '13px', fontWeight: 'bold', shown : true}
})]);
var panel2 = ui.Panel({
  widgets: [
    ui.Label(minn2+' %'), 
    ui.Label({style: {stretch: 'horizontal'}}), 
    ui.Label(maxx2 +' %')
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px', shown : true}
});
var thumb = ui.Thumbnail({
  image: legendImage_anomaly, 
  params: {bbox:'0,0,100,8', dimensions:'256x20'},  
  style: {position: 'bottom-center', shown : true}
});
// Line separator
var lin = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '#1E90FF'},
  })]);
// ---- Add these new widgets to the panel in the order you want them to appear
panel.add(checkBox_CHIRPS2020) 
    .add(checkBox_IMERG2020)
    .add(checkBox_CHIRPSMean)
    .add(checkBox_IMERGMean)
    .add(checkBox_CHIRPSAnomaly)
    .add(checkBox_IMERGAnomaly)
    // .add(source_lab) // Document source
    // .add(contact)    // Contato
    .add(lin)       // Line separator
    .add(intro2)    // Mean/Yearly legend text
    .add(panel0)    // Text with maximum and minimum of legend
    .add(thumb0)    // Mean/Yearly color bar 
    .add(intro3)    // Anomaly legend text
    .add(panel2)    // Text with maximum and minimum of legend
    .add(thumb)    // Anomaly color bar 
    .add(source_lab) // Document source
    .add(contact);    // Contato
// -----------------------------------------
intro2.style().set({shown : false});
panel0.style().set({shown : false});
thumb0.style().set({shown : false});
intro3.style().set({shown : false});
panel2.style().set({shown : false});
thumb.style().set({shown : false});
// ------------------------------------------------------ Add functionality to widgets ----------------------------------------------------------------
// ---- For each checkbox we create function so that clicking the checkbox
// CHIRPS 2020
var doCheckbox = function() {
  checkBox_CHIRPS2020.onChange(function(checked){
  extCHIRPS2020.setShown(checked);
  });
  checkBox_CHIRPS2020.onChange(function(){
    if (checkBox_CHIRPS2020.getValue()===true || checkBox_IMERG2020.getValue()===true || checkBox_CHIRPSMean.getValue()===true || checkBox_IMERGMean.getValue()===true){
      intro2.style().set({shown : true});
      panel0.style().set({shown : true});
      thumb0.style().set({shown : true});
    }
    else{
      intro2.style().set({shown : false});
      panel0.style().set({shown : false});
      thumb0.style().set({shown : false});
    }
  });
};
doCheckbox();
//IMERG 2020
var doCheckbox2 = function() {
  checkBox_IMERG2020.onChange(function(checked){
  extIMERG2020.setShown(checked);
  });
  checkBox_IMERG2020.onChange(function(){
    if (checkBox_CHIRPS2020.getValue()===true || checkBox_IMERG2020.getValue()===true || checkBox_CHIRPSMean.getValue()===true || checkBox_IMERGMean.getValue()===true){
      intro2.style().set({shown : true});
      panel0.style().set({shown : true});
      thumb0.style().set({shown : true});
    }
    else{
      intro2.style().set({shown : false});
      panel0.style().set({shown : false});
      thumb0.style().set({shown : false});
    }
  });
};
doCheckbox2();
// CHIRPS MÉDIA
var doCheckbox3 = function() {
  checkBox_CHIRPSMean.onChange(function(checked){
  extCHIRPSMean.setShown(checked);
  });
  checkBox_CHIRPSMean.onChange(function(){
    if (checkBox_CHIRPS2020.getValue()===true || checkBox_IMERG2020.getValue()===true || checkBox_CHIRPSMean.getValue()===true || checkBox_IMERGMean.getValue()===true){
      intro2.style().set({shown : true});
      panel0.style().set({shown : true});
      thumb0.style().set({shown : true});
    }
    else{
      intro2.style().set({shown : false});
      panel0.style().set({shown : false});
      thumb0.style().set({shown : false});
    }
  });
};
doCheckbox3();
// IMERG MÉDIA
var doCheckbox4 = function() {
  checkBox_IMERGMean.onChange(function(checked){
  extIMERGMean.setShown(checked);
  });
  checkBox_IMERGMean.onChange(function(){
    if (checkBox_CHIRPS2020.getValue()===true || checkBox_IMERG2020.getValue()===true || checkBox_CHIRPSMean.getValue()===true || checkBox_IMERGMean.getValue()===true){
      intro2.style().set({shown : true});
      panel0.style().set({shown : true});
      thumb0.style().set({shown : true});
    }
    else{
      intro2.style().set({shown : false});
      panel0.style().set({shown : false});
      thumb0.style().set({shown : false});
    }
  });
};
doCheckbox4();
// CHIRPS Anomaly
var doCheckbox5 = function() {
  checkBox_CHIRPSAnomaly.onChange(function(checked){
  extCHIRPSAnomaly.setShown(checked);
  });
  checkBox_CHIRPSAnomaly.onChange(function(){
    if (checkBox_IMERGAnomaly.getValue()===true || checkBox_CHIRPSAnomaly.getValue()===true){
      intro3.style().set({shown : true});
      panel2.style().set({shown : true});
      thumb.style().set({shown : true});
    }
    else{
      intro3.style().set({shown : false});
      panel2.style().set({shown : false});
      thumb.style().set({shown : false});
    }
  });
};
doCheckbox5();
// IMERG Anomaly
var doCheckbox6 = function() {
  checkBox_IMERGAnomaly.onChange(function(checked){
  extIMERGAnomaly.setShown(checked);
  });
  checkBox_IMERGAnomaly.onChange(function(){
    if (checkBox_IMERGAnomaly.getValue()===true || checkBox_CHIRPSAnomaly.getValue()===true){
      intro3.style().set({shown : true});
      panel2.style().set({shown : true});
      thumb.style().set({shown : true});
    }
    else{
      intro3.style().set({shown : false});
      panel2.style().set({shown : false});
      thumb.style().set({shown : false});
    }
  });
};
doCheckbox6();
// ------------------------------------------------- Add a clicking feature to get rainfall depth ----------------------------------------------------
// ---- Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
// ---- Add a label to the panel.
inspector.add(ui.Label('Selecione um produto e clique no mapa para obter o valor da chuva e anomalia'));
// ---- Add the panel to the default map.
Map.add(inspector);
// ---- Create a function to be invoked when the map is clicked
Map.onClick(function(coords){
if (checkBox_CHIRPS2020.getValue()===true || checkBox_IMERG2020.getValue()===true || checkBox_CHIRPSMean.getValue()===true || checkBox_IMERGMean.getValue()===true || checkBox_CHIRPSAnomaly.getValue()===true || checkBox_IMERGAnomaly.getValue()===true){
    inspector.style().set('position', 'bottom-left');
    inspector.style().set('padding', '8px 15px');
    // Clear the panel and show a loading message.
    inspector.clear();
    inspector.style().set('shown', true);
    inspector.add(ui.Label('Processando...', {color: 'gray'}));
    // Computer the yearly rainfall value
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var reduce = chirps2020.reduce(ee.Reducer.first());
    var sampledPoint = reduce.reduceRegion(ee.Reducer.first(), point, 30);
    var chir20 = ee.Number(sampledPoint.get('first'));
    // Request the value from the server and use the results in a function.
    chir20.evaluate(function(result) {
      inspector.clear();
      // Function to calculate precipitation and anomaly at one point
      var yearly_precip = function(image){
        var imag_intera = ee.Image(image);
        var reduce = imag_intera.reduce(ee.Reducer.first());
        var sampledPoint = reduce.reduceRegion(ee.Reducer.first(), point, 30);
        var chir20 = sampledPoint.get('first').getInfo().toFixed(2);
        return chir20;
      };
      // Applying function 
      var im20 = yearly_precip(imerg2020);
      var chirmean = yearly_precip(chirpsMean);
      var immean = yearly_precip(imergMean);
      var im_anom = yearly_precip(imerg_anomalie);
      var chir_anom = yearly_precip(chirps_anomalie);
      inspector.style().set('position', 'bottom-left');
      // modificado por Cristiano Almeida (em 10.Mai.2021)
      var yearly_rainfall_label = ui.Label({
        value: 'Precipitação em 2020: ' + result.toFixed(2) + ' (CHIRPS) e ' + im20 +' (IMERG).',
        style: {fontSize: '11px', margin: '0 0 4px 6px'}
      });
      var yearly_rainfall_panel = ui.Panel({
        widgets: [yearly_rainfall_label],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
      inspector.add(yearly_rainfall_panel);
      var mean_rainfall_label = ui.Label({
        value: 'Médias históricas: ' + chirmean + ' (CHIRPS) e ' + immean +' (IMERG).',
        style: {fontSize: '11px', margin: '0 0 4px 6px'}
      });
      var mean_rainfall_panel = ui.Panel({
        widgets: [mean_rainfall_label],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
      inspector.add(mean_rainfall_panel);
      var anomalie_rainfall_label = ui.Label({
        value: 'Anomalias: ' + chir_anom + ' (CHIRPS) e ' + im_anom + ' (IMERG).',
        style: {fontSize: '11px', margin: '0 0 4px 6px'}
      });
      var anomalie_rainfall_panel = ui.Panel({
        widgets: [anomalie_rainfall_label],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
      inspector.add(anomalie_rainfall_panel);
      var observation_label = ui.Label({
        value: '* Valores de precip. em mm/ano e anomalia em porcent.',
        style: {stretch: 'vertical', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 6px'}
      });
      var observation_panel = ui.Panel({
        widgets: [observation_label],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
      inspector.add(observation_panel);
      inspector.add(ui.Button({
        label: 'Fechar',
        style: {width: '100', fontSize: '11px', margin: '0px 0px 0px 110px'},
        onClick: function() {
          inspector.style().set('position', 'bottom-left');
          inspector.style().set('shown', false);}
      }));
    // fim de modificação
    // inspector.add(ui.Label({
    //   // value: 'A precipitação (mm/ano) em 2020 no CHIRPS e IMERG foram, respectivamente: ' +
    //   // result.toFixed(2) + ' e ' + im20 + '. ' + 'As médias históricas (mm/ano): ' + 
    //   // chirmean + ' e ' + immean + '. ' + 'E anomalias: '+ chir_anom +'%'+ ' e ' + 
    //   // im_anom +'%'+ '.',
    //   value: 'Precipitação em 2020: ' + result.toFixed(2) + ' (CHIRPS) e ' + im20 +
    //       ' (IMERG).' + 'Médias históricas: ' + chirmean + ' (CHIRPS) e ' + immean +
    //       '. ' + 'Anomalias: ' + chir_anom + ' (CHIRPS) ' + im_anom + ' (IMERG). ' +
    //       'Todos valores em (mm/ano).',
    //   style: {stretch: 'vertical', fontSize: '11px', position: 'bottom-center'}
    // }));
    // inspect.add(ui.Label({
    //   value: 'lixo',
    //   style: {stretch: 'vertical', fontSize: '11px', position: 'bottom-center'}
    // }));
    // Add a button to hide the Panel.
    // inspector.add(ui.Button({
    //   label: 'Fechar',
    //   style: {width: '100', fontSize: '11px'},
    //   onClick: function() {
    //     inspector.style().set('position', 'bottom-center');
    //     inspector.style().set('shown', false);}
    // }));
  })}
});
// })});