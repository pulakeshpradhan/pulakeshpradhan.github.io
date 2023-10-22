var Fraccion = ui.import && ui.import("Fraccion", "table", {
      "id": "users/lezanacd/amgr_fr22"
    }) || ee.FeatureCollection("users/lezanacd/amgr_fr22"),
    Radio = ui.import && ui.import("Radio", "table", {
      "id": "users/lezanacd/amgr_rd22"
    }) || ee.FeatureCollection("users/lezanacd/amgr_rd22");
Map.centerObject(Fraccion,12);
//var radios = ee.FeatureCollection('users/lezanacd/amgr_rd22')
        //    .filterBounds(table2);
var radio_style =  {color: '#FA1304', fillColor: '00000000' };
var frac_style =  {color: '10760B', fillColor: '00000000'};
Map.addLayer(Radio.style(radio_style));
Map.addLayer(Fraccion.style(frac_style));
Map.add(ui.Label(Fraccion));
// Create the application title bar.
Map.add(ui.Label(
    'Fracciones y Radios - Redimensión 2022', {fontWeight: 'bold', fontSize: '20px'}));
// Styling for the legend title.
var LEGEND_TITLE_STYLE = {
  fontSize: '20px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Styling for the legend footnotes.
var LEGEND_FOOTNOTE_STYLE = {
  fontSize: '10px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px',
};
// Assemble the legend panel.
Map.add(ui.Panel(
    [
      ui.Label(
          'Fuente: Conteo de viviendas: ADRA, MMUVRA 2019-2021 (INDEC)', LEGEND_FOOTNOTE_STYLE),
      ui.Label('Cobertura de Radios del CNPVyH - 2022', LEGEND_FOOTNOTE_STYLE)
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'}));
print(Fraccion)