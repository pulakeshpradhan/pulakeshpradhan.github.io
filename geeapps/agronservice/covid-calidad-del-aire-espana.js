var Espana = ui.import && ui.import("Espana", "table", {
      "id": "users/agronservice/espana"
    }) || ee.FeatureCollection("users/agronservice/espana");
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            VIZ                                     //
//                                                                    //
////////////////////////////////////////////////////////////////////////
Map.setControlVisibility(false);
Map.setOptions('SATELLITE');
Map.setCenter(20.0, 50.0 , 4);
Map.centerObject(Espana,5);
var selectRange;
var selectParameter=ui.Select();
var finEnero_confinamiento = 'pre-COVID';
var cinco_dias = 'COVID Confinamiento';
var Fases = 'Desescalada';
var post_alarma = '2 meses post-confinamiento';
var rangoSeleccionado = post_alarma;
var palette = ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'];
var palettePop = ['24126c', '1fff4f', 'd4ff50'];
var updateRange = function(selectedRange){
  rangoSeleccionado=selectedRange;
  // select.style.set(
  //   {shown:true}
  //   );
  selectParameter.setDisabled(false);
  selectParameter.setValue(null)
  selectParameter.style().set("shown", true);
  updateMap(selectParameter.getValue());
};
function updateMap(selection) {
  switch(rangoSeleccionado){
      case finEnero_confinamiento:
        Map.layers().set(0, ui.Map.Layer(Layers1[selection]));
        break;
      case cinco_dias:
        Map.layers().set(0, ui.Map.Layer(Layers5[selection]));
        break;
      case Fases:
        Map.layers().set(0, ui.Map.Layer(Layers10[selection]));
        break;
      case post_alarma:
        Map.layers().set(0, ui.Map.Layer(Layers15[selection]));
        break;
      default:
        Map.layers().set(0, ui.Map.Layer(Layers15[selection]));
        break;
  }
}//end updateMap
//Add text to the map
var label = ui.Label('Developed by AGRON Consulting');
  label.style().set({
    position:('bottom-right'),
    fontFamily:('monospace'),
    color:('#009639'),
    //backgroundColor:('#DBDBDB'),
    backgroundColor:('#C7CFD9'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('15px'),
    //whiteSpace:('pre'),
    border:('1px solid black'),
    //shown: (false)
    });
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '0px 0px',
backgroundColor:('#FFFFFF88')
}
});
var max= "+ vol.";
var min= "- vol.";
// create vizualization parameters of the panel2
var viz = {min:0, max:1, palette:palette};
// create the legend image of panel2
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((1)/100.0).add(0);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(max)/*.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#2A558C'),
    backgroundColor:('#D5E5F2'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('25px'),
    //whiteSpace:('pre'),
    border:('1.5px solid black'),
    //shown: (false)
    })*/
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '0.5px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(min)
],
});
legend.add(panel);
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            TIME/RANGES                             //
//                                                                    //
////////////////////////////////////////////////////////////////////////
var now = ee.Date(Date.now());
var clip = function(image){
  return image.clip(Espana);
};
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            GET IMAGES                              //
//                                                                    //
////////////////////////////////////////////////////////////////////////
// var days;
// var cloudsPersonalizado;
// var fucionProcesado = function(){
//   cloudsPersonalizado = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD').map(clip)
//   .select('cloud_fraction')
//   .filterDate(now.advance(days, 'day'), now);
// };
//- 15 DAYS
var Clouds15 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD').map(clip)
  .select('cloud_fraction')
  .filterDate('2020-01-20', '2020-03-14');
var Population15 = ee.ImageCollection("WorldPop/GP/100m/pop").map(clip)
                .filterDate('2019')
                .select('population');
var AEROSOL15 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI').map(clip)
  .select('absorbing_aerosol_index')
  .filterDate('2020-01-20', '2020-03-14');
var CO15 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO').map(clip)
  .select('CO_column_number_density')
  .filterDate('2020-01-20', '2020-03-14');
var HCHO15 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO').map(clip)
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-01-20', '2020-03-14');
var N0215 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').map(clip)
  .select('NO2_column_number_density')
  .filterDate('2020-01-20', '2020-03-14');
var O315 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3').map(clip)
  .select('O3_column_number_density')
  .filterDate('2020-01-20', '2020-03-14');
var SO215 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2').map(clip)
  .select('SO2_column_number_density')
  .filterDate('2020-01-20', '2020-03-14');
//- 10 DAYS
var Clouds10 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD').map(clip)
  .select('cloud_fraction')
  .filterDate('2020-03-15', '2020-04-30');
var Population10 = ee.ImageCollection("WorldPop/GP/100m/pop").map(clip)
                .filterDate('2019')
                .select('population');
var AEROSOL10 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI').map(clip)
  .select('absorbing_aerosol_index')
  .filterDate('2020-03-15', '2020-04-30');
var CO10 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO').map(clip)
  .select('CO_column_number_density')
  .filterDate('2020-03-15', '2020-04-30');
var HCHO10 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO').map(clip)
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-03-15', '2020-04-30');
var N0210 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').map(clip)
  .select('NO2_column_number_density')
  .filterDate('2020-03-15', '2020-04-30');
var O310 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3').map(clip)
  .select('O3_column_number_density')
  .filterDate('2020-03-15', '2020-04-30');
var SO210 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2').map(clip)
  .select('SO2_column_number_density')
  .filterDate('2020-03-15', '2020-04-30');
//- 5 DAYS
var Clouds5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD').map(clip)
  .select('cloud_fraction')
  .filterDate('2020-05-01', '2020-05-31');
var Population5 = ee.ImageCollection("WorldPop/GP/100m/pop").map(clip)
                .filterDate('2019')
                .select('population');
var AEROSOL5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI').map(clip)
  .select('absorbing_aerosol_index')
  .filterDate('2020-05-01', '2020-05-31');
var CO5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO').map(clip)
  .select('CO_column_number_density')
  .filterDate('2020-05-01', '2020-05-31');
var HCHO5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO').map(clip)
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-05-01', '2020-05-31');
var N025 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').map(clip)
  .select('NO2_column_number_density')
  .filterDate('2020-05-01', '2020-05-31');
var O35 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3').map(clip)
  .select('O3_column_number_density')
  .filterDate('2020-05-01', '2020-05-31');
var SO25 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2').map(clip)
  .select('SO2_column_number_density')
  .filterDate('2020-05-01', '2020-05-31');
//- 1 DAYS
var Clouds1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CLOUD').map(clip)
  .select('cloud_fraction')
  .filterDate('2020-06-01', '2020-07-30');
var Population1 = ee.ImageCollection("WorldPop/GP/100m/pop").map(clip)
                .filterDate('2019')
                .select('population');
var AEROSOL1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_AER_AI').map(clip)
  .select('absorbing_aerosol_index')
  .filterDate('2020-06-01', '2020-07-30');
var CO1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO').map(clip)
  .select('CO_column_number_density')
  .filterDate('2020-06-01', '2020-07-30');
var HCHO1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO').map(clip)
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-06-01', '2020-07-30');
var N021 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').map(clip)
  .select('NO2_column_number_density')
  .filterDate('2020-06-01', '2020-07-30');
var O31 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_O3').map(clip)
  .select('O3_column_number_density')
  .filterDate('2020-06-01', '2020-07-30');
var SO21 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2').map(clip)
  .select('SO2_column_number_density')
  .filterDate('2020-06-01', '2020-07-30');
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            VIZ PARAMETERS                          //
//                                                                    //
////////////////////////////////////////////////////////////////////////
var Ranges = ['pre-COVID','COVID Confinamiento','Desescalada', '2 meses post-confinamiento'];
var Layers15 = {
  'HCHO (Cloraldehído)': HCHO15.mean().visualize({min: 0, max: 0.0003, palette: palette}),
  'SO2 (Dióxido de Azufre)': SO215.mean().visualize({min: 0, max: 0.0005, palette: palette}),
  'O3 (Ozono)': O315.mean().visualize({min: 0.12, max: 0.15, palette: palette}),
  'AOD (Aerosoles)': AEROSOL15.mean().visualize({min: -1,max: 2.0, palette: palette}),
  'CO (Monóxido de Carbono)': CO15.mean().visualize({min: 0, max: 0.05, palette: palette}),
  'N02 (Dióxido de Nitrógeno)': N0215.mean().visualize({min: 0, max: 0.0002, palette: palette}),
  'Nubes': Clouds15.mean().visualize({min: 0, max: 0.95, palette: palette}),
  //'Población': Population.visualize({min: 0.0, max: 50.0, palette: palettePop})
};
var Layers10 = {
  'HCHO (Cloraldehído)': HCHO10.mean().visualize({min: 0, max: 0.0003, palette: palette}),
  'SO2 (Dióxido de Azufre)': SO210.mean().visualize({min: 0, max: 0.0005, palette: palette}),
  'O3 (Ozono)': O310.mean().visualize({min: 0.12, max: 0.15, palette: palette}),
  'AOD (Aerosoles)': AEROSOL10.mean().visualize({min: -1,max: 2.0, palette: palette}),
  'CO (Monóxido de Carbono)': CO10.mean().visualize({min: 0, max: 0.05, palette: palette}),
  'N02 (Dióxido de Nitrógeno)': N0210.mean().visualize({min: 0, max: 0.0002, palette: palette}),
  'Nubes': Clouds10.mean().visualize({min: 0, max: 0.95, palette: palette}),
  //'Población': Population.visualize({min: 0.0, max: 50.0, palette: palettePop})
};
var Layers5 = {
  'HCHO (Cloraldehído)': HCHO5.mean().visualize({min: 0, max: 0.0003, palette: palette}),
  'SO2 (Dióxido de Azufre)': SO25.mean().visualize({min: 0, max: 0.0005, palette: palette}),
  'O3 (Ozono)': O35.mean().visualize({min: 0.12, max: 0.15, palette: palette}),
  'AOD (Aerosoles)': AEROSOL5.mean().visualize({min: -1,max: 2.0, palette: palette}),
  'CO (Monóxido de Carbono)': CO5.mean().visualize({min: 0, max: 0.05, palette: palette}),
  'N02 (Dióxido de Nitrógeno)': N025.mean().visualize({min: 0, max: 0.0002, palette: palette}),
  'Nubes': Clouds5.mean().visualize({min: 0, max: 0.95, palette: palette}),
  //'Población': Population.visualize({min: 0.0, max: 50.0, palette: palettePop})
};
var Layers1 = {
  'HCHO (Cloraldehído)': HCHO1.mean().visualize({min: 0, max: 0.0003, palette: palette}),
  'SO2 (Dióxido de Azufre)': SO21.mean().visualize({min: 0, max: 0.0005, palette: palette}),
  'O3 (Ozono)': O31.mean().visualize({min: 0.12, max: 0.15, palette: palette}),
  'AOD (Aerosoles)': AEROSOL1.mean().visualize({min: -1,max: 2.0, palette: palette}),
  'CO (Monóxido de Carbono)': CO1.mean().visualize({min: 0, max: 0.05, palette: palette}),
  'N02 (Dióxido de Nitrógeno)': N021.mean().visualize({min: 0, max: 0.0002, palette: palette}),
  'Nubes': Clouds1.mean().visualize({min: 0, max: 0.95, palette: palette}),
  //'Población': Population.visualize({min: 0.0, max: 50.0, palette: palettePop})
};
var LayersNames =  [
  'HCHO (Cloraldehído)',
  'SO2 (Dióxido de Azufre)',
  'O3 (Ozono)',
  'AOD (Aerosoles)',
  'CO (Monóxido de Carbono)',
  'N02 (Dióxido de Nitrógeno)',
  'Nubes',
  //'Población': Population.visualize({min: 0.0, max: 50.0, palette: palettePop})
];
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            SELECTOR                                //
//                                                                    //
////////////////////////////////////////////////////////////////////////
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Calidad del Aire');
  label.style().set({
    position:('top-center'),
    fontFamily:('monospace'),
    color:('#000000'),
    backgroundColor:('#FFFFFF'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('500'),
    fontSize :('15px'),
    //whiteSpace:('pre'),
    //border:('0.5px solid black'),
    //shown: (false)
    });
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  selectRange = ui.Select({items : Ranges, onChange : updateRange});
//   geometriasCultivos.selectCultivos = ui.Select({
//     style: {
//         position: ('top-right'),
//         shown: true,
//     },
//     items: Object.keys(geometriasCultivos.geometrias),
//     onChange: function (key) {
//         if (debugSelects) print("Seleccionando cultivo " + key);
//         if (debugSelects) {
//             print(parametros);
//         }
//         hideAllMapsAndGeometries();
//         hideAllSelects();
//         if (parametros.selectParametros.style().get('shown') === false) parametros.selectParametros.style().set('shown', true);
//         seleccionarCultivoActivo(key);
//     }
// });
  selectRange.setValue(Ranges[defaultValue], true);
  selectParameter = ui.Select({items: LayersNames, onChange: updateMap});
  selectParameter.setValue(LayersNames[0], true);
  var controlPanel =
      ui.Panel({widgets: [label, selectRange, selectParameter], style: {position: position, backgroundColor:('#FFFFFF88')}});
  mapToChange.add(controlPanel);
}
  // This function changes the given map to show the selected image.
Map.add(label);
Map.add(legend);
var Selector = addLayerSelector(Map, 0, 'top-right');
//selectRange.setValue(post_alarma, true);
selectRange.setPlaceholder('Selecciona un rango de tiempo...');
selectParameter.setPlaceholder('Selecciona un parámetro...');
selectParameter.setValue(null);
selectRange.setValue(null);
selectParameter.setDisabled(true);
selectParameter.style().set("shown", false);
////////////////////////////////////////////////////////////////////////
//                                                                    //
//                            AOI                                     //
//                                                                    //
////////////////////////////////////////////////////////////////////////
// var empty4 = ee.Image().byte();
// var outline4 = empty4.paint({
//   featureCollection: Espana,
//   color: 1,
//   width: 3
// });
// Map.addLayer(outline1, {palette: '#262626'}, 'Málaga', false);
// Map.addLayer(outline2, {palette: '#262626'}, 'Andalucía', false);
// Map.addLayer(outline3, {palette: '#262626'}, 'España', false);
// Map.addLayer(outline4, {palette: '#262626'}, 'Espana', false);