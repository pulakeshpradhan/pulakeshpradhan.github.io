var chirpsDataset = ui.import && ui.import("chirpsDataset", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    countries = ui.import && ui.import("countries", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0");
// Example from NASA ARSET sobre criação de user interface (ui) no GEE
// Created by Cristiano Almeida & Filipe Carvalho
// On March.25.2021
// Source: https://www.youtube.com/watch?v=1eXQw8_Wy8k&t=1511s
//////////////////////////////////////////////////////////////////
//     0 - Manipulação de nossos dados
//////////////////////////////////////////////////////////////////
var brazil = countries.filter(ee.Filter.eq('ADM0_NAME', 'Brazil'));
var chirps2020 = chirpsDataset.select('precipitation')
                 .filterDate('2020-01-01','2021-01-01')
                 .sum();
// Inserir aqui os seguintes produtos (TODO: Filipe):
// imerg2020
// imergMean
// chirpsMean
var palette = ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'].reverse();
var visualParams = {min: 0, max: 4000, palette: palette};
// Map.addLayer(chirps2020, visualParams, 'CHIRPS (Ano 2020)', false);
Map.addLayer(brazil, {}, 'Brasil');
var extCHIRPS2020 = ui.Map.Layer(chirps2020, {min: 0, max: 4000, palette: palette}, 'CHIRPS (Ano 2020)',false);
Map.add(extCHIRPS2020);
///////////////////////////////////////////////////////////////
//      2) Begin setting up map appearance and app layers   //
///////////////////////////////////////////////////////////////
//2.1) Set up general display
//Set up a satellite background
Map.setOptions('Satellite');
Map.centerObject(brazil, 4);
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
// //2.2) We want to set up a Viridis color pallete to display the Simard data
// ///////////////////////////////////////////////////////////////
// //      3) Set up panels and widgets for display             //
// ///////////////////////////////////////////////////////////////
// //3.1) Set up title and summary widgets
//App title
var header = ui.Label('Climatologia da precipitação no Brasil', {fontSize: '20px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'Este app foi desenvolvido para análise das anomalias da precipitação no Brasil usando produtos de ' +
  'sensoriamento remoto, o CHIRPS e o IMERG.',
  {fontSize: '14px'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Selecione um dos produtos para análise.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro);
// //3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel);
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
// var extLabel = ui.Label({value:'Mangrove Extent',
// style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
// });
//4.2) Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
// in the code
var checkBox_CHIRPS2020 = ui.Checkbox('CHIRPS (Ano 2020)').setValue(false); //false = unchecked
var extIMERG2020 = ui.Checkbox('IMERG (Ano 2020)').setValue(false);
var extCHIRPSMean = ui.Checkbox('CHIRPS (Média hist.)').setValue(false);
var extIMERGMean = ui.Checkbox('IMERG (Média hist.)').setValue(false);
//Now do the same for the Simard Height map
var heightLab = ui.Label({value:'Fonte: xx ver como inserir link para o boletim núm. 2',
  style: {fontSize: '12px', margin: '10px 5px'}
});
heightLab.setUrl('https://www.researchgate.net/publication/350495934_BOLETIM_ANUAL_DE_PRECIPITACAO_NO_BRASIL_ANO_2020');
// var heightCheck = ui.Checkbox('CHIRPS').setValue(false);
//4.3) Create legends
//The following code creates legends we can add to the panel
//Extent Legend
///////////////
// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//Create a palette using the same colors we used for each extent layer
// var paletteMAPa = [
//   '6D63EB',//CHIRPS
//   '34BFDE',//IMERG
// ];
// Name of each legend value
var namesa = ['CHIRPS (Ano 2020)','IMERG (Ano 2020)']; 
// Add color and names to legend
// for (var i = 0; i < 2; i++) {
//   extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
// }  
// This uses function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend2 (visualParams) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((visualParams.max-visualParams.min)/100.0).add(visualParams.min);
  var legendImage = gradient.visualize(visualParams);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label('0 mm'), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label('4.000 mm')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
}
//4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(checkBox_CHIRPS2020)
     .add(extIMERG2020)
     .add(extCHIRPSMean)
     .add(extIMERGMean)
     .add(heightLab)
     .add(makeLegend2(visualParams));
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//Extent CHIRPS
var doCheckbox = function() {
  checkBox_CHIRPS2020.onChange(function(checked){
  extCHIRPS2020.setShown(checked);
  });
};
doCheckbox();
//Extent 2010
var doCheckbox2 = function() {
  extIMERG2020.onChange(function(checked){
  ext2010.setShown(checked);
  });
}
doCheckbox2();
////////////////////////////////////////////////////////
//       6) Add a clicking feature to get rainfall depth //
////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Clique para obter o valor da chuva'));
// Add the panel to the default map.
Map.add(inspector);
//Create a function to be invoked when the map is clicked
Map.onClick(function(coords){
// Clear the panel and show a loading message.
inspector.clear();
inspector.style().set('shown', true);
inspector.add(ui.Label('Loading...', {color: 'gray'}));
//Computer the yearly rainfall value
var point = ee.Geometry.Point(coords.lon, coords.lat);
var reduce = chirps2020.reduce(ee.Reducer.first());
var sampledPoint = reduce.reduceRegion(ee.Reducer.first(), point, 30);
var computedValue = sampledPoint.get('first');  
// Request the value from the server and use the results in a function.
computedValue.evaluate(function(result) {
inspector.clear();
// Add a label with the results from the server.
inspector.add(ui.Label({
      value: 'Rainfall (mm/year): ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
// Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
// TODO: Scripts to charts come here!