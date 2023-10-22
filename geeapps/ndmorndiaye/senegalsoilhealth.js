var senegal = ui.import && ui.import("senegal", "table", {
      "id": "users/ndmorndiaye/senegal_dep"
    }) || ee.FeatureCollection("users/ndmorndiaye/senegal_dep");
/**
 * UI Pattern Template
 *
 * This script is a template for organizing code into distinct sections
 * to improve readability/maintainability:
 *   Model, Components, Composition, Styling, Behaviors, Initialization
 *
 * @author Tyler Erickson (tylere@google.com)
 * @author Justin Braaten (braaten@google.com)
 */
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var m = {};
var oc = ee.Image("projects/soilgrids-isric/ocs_mean").clip(senegal)
var ph= ee.Image("projects/soilgrids-isric/phh2o_mean").clip(senegal)
var cec= ee.Image("projects/soilgrids-isric/cec_mean").clip(senegal)
var bulkd= ee.Image("projects/soilgrids-isric/bdod_mean").clip(senegal)
var soc=ee.Image("projects/soilgrids-isric/soc_mean").clip(senegal)
m.ocs_mean=oc
m.pheau_mean=ph
m.cec_mean=cec
m.bulkd_mean=bulkd
m.soc_mean=soc
print("organique carbone", m.soc_mean)
m.imgInfo1 = {
  bands: {
   "Soil Organic Carbon H1": {
      bname: "soc_0-5cm_mean",
      color: 'd4e7b0',
      vis: {
        min: 2,
        max: 75,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    "Soil Organic Carbon H2": {
      bname: "soc_5-15cm_mean",
      color: 'd2cdc0',
      vis: {
        min: 2,
        max: 75,
        palette: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404']
      }
    },
    "Soil Organic Carbon H3": {
      bname: "soc_15-30cm_mean",
      color: 'ca9146',
      vis: {
        min: 2,
        max: 75,
        palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']
      }
    },
    "Soil Organic Carbon H4": {
      bname:"soc_30-60cm_mean" ,
      color: 'fbf65d',
      vis: {
        min: 2,
        max: 75,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    "Soil Organic Carbon H5": {
      bname: "soc_60-100cm_mean",
      color: 'fbf65d',
      vis: {
        min: 2,
        max: 75,
        palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
      }
    }
  }}
  m.imgInfo2 = {
  bands: {
   "Capacité d'Echange Cationique H1" : {
      bname: "cec_0-5cm_mean",
      color: 'd4e7b0',
      vis: {
        min: 21,
        max: 400,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    "Capacité d'Echange Cationique H2": {
      bname: "cec_5-15cm_mean",
      color: 'd2cdc0',
      vis: {
        min: 21,
        max: 400,
        palette: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404']
      }
    },
    "Capacité d'Echange Cationique H3": {
      bname: "cec_15-30cm_mean",
      color: 'ca9146',
      vis: {
        min: 21,
        max: 400,
        palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']
      }
    },
    "Capacité d'Echange Cationique H4": {
      bname:"cec_30-60cm_mean" ,
      color: 'fbf65d',
      vis: {
        min: 21,
        max: 400,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    "Capacité d'Echange Cationique H5": {
      bname: "cec_60-100cm_mean",
      color: 'fbf65d',
      vis: {
        min: 21,
        max: 400,
        palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
      }
    }
  }}
//
 m.imgInfo3 = {
  bands: {
   "Densité Apparante H1" : {
      bname: "bdod_0-5cm_mean",
      color: 'd4e7b0',
      vis: {
        min: 24,
        max: 75,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    "Densité Apparante H2": {
      bname: "bdod_5-15cm_mean",
      color: 'd2cdc0',
      vis: {
        min: 24,
        max: 75,
        palette: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404']
      }
    },
    "Densité Apparante H3": {
      bname: "bdod_15-30cm_mean",
      color: 'ca9146',
      vis: {
        min: 24,
        max: 75,
        palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']
      }
    },
    "Densité Apparante H4": {
      bname:"bdod_30-60cm_mean" ,
      color: 'fbf65d',
      vis: {
        min: 24,
        max: 75,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    "Densité Apparante H5": {
      bname: "bdod_60-100cm_mean",
      color: 'fbf65d',
      vis: {
        min: 24,
        max: 75,
        palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
      }
    }
  }}
  //
m.imgInfo4 = {
  bands: {
   "Potentiel Hydrogène H20 H1" : {
      bname:  "phh2o_0-5cm_mean",
      color: 'd4e7b0',
      vis: {
        min: 40,
        max: 90,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    "Potentiel Hydrogène H20 H2": {
      bname:  "phh2o_5-15cm_mean",
      color: 'd2cdc0',
      vis: {
        min: 40,
        max: 90,
        palette: ['ffffd4', 'fed98e', 'fe9929', 'd95f0e', '993404']
      }
    },
    "Potentiel Hydrogène H20 H3": {
      bname:  "phh2o_15-30cm_mean",
      color: 'ca9146',
      vis: {
        min: 40,
        max: 90,
        palette: ['feebe2', 'fbb4b9', 'f768a1', 'c51b8a', '7a0177']
      }
    },
    "Potentiel Hydrogène H20 H4": {
      bname: "phh2o_30-60cm_mean" ,
      color: 'fbf65d',
      vis: {
        min: 40,
        max: 90,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    "Potentiel Hydrogène H20 H5": {
      bname:  "phh2o_60-100cm_mean",
      color: 'fbf65d',
      vis: {
        min: 40,
        max: 90,
        palette: ['eff3ff', 'bdd7e7', '6baed6', '3182bd', '08519c']
      }
    }
  }}
  //
m.imgInfo5 = {
  bands: {
   "Stock Carbone 0-30 cm" : {
      bname:  "ocs_0-30cm_mean",
      color: 'd4e7b0',
      vis: {
        min: 0,
        max: 75,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    }}}
/* Example
// Selected year.
m.year = null;
*/
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your app.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
/* Example
c.legend = {
  title: ui.Label();
}
*/
c.controlpanel=ui.Panel()
c.map=ui.Map()
c.info={}
c.info.title=ui.Label("Santé des Sols du Senegal")
c.info.description=ui.Label("Cet Application permet de visualiser sur une carte quelques  proprietes physico-chimiques et le stock de carbone moyen des sols du Sénégal.Les données utilisées sont issues de SoilGrids250m 2.0 disponible dans GEE.Pour chaque Propriétés physico-chiques 5 cartes sont générées correspondant aux horizons (H1, H2, H3, H4, H5)")
c.info.paperLabel = ui.Label({
  value: 'Reference',
  targetUrl: 'https://doi.org/10.1111/2041-210X.13564'
});
c.info.auteur = ui.Label({value:"Auteur: Mor Ndiaye",targetUrl: 'https://morandiaye.netlify.app',style:{color:"black"}})
c.info.panel=ui.Panel([c.info.title,c.info.description,c.info.auteur,c.info.paperLabel])
c.selection={}
c.selection.label=ui.Label("Teneur en Carbone")
c.selection.selector=ui.Select(Object.keys(m.imgInfo1.bands),"Carbone")
c.selection.panel=ui.Panel([c.selection.label,c.selection.selector])
c.selection2={}
c.selection2.label=ui.Label("Capacité Echange Cationique")
c.selection2.selector=ui.Select(Object.keys(m.imgInfo2.bands),"CEC")
c.selection2.panel=ui.Panel([c.selection2.label,c.selection2.selector])
c.selection3={}
c.selection3.label=ui.Label("Densité Apparante")
c.selection3.selector=ui.Select(Object.keys(m.imgInfo3.bands),"BD")
c.selection3.panel=ui.Panel([c.selection3.label,c.selection3.selector])
c.selection4={}
c.selection4.label=ui.Label("Potentiel Hydrogene")
c.selection4.selector=ui.Select(Object.keys(m.imgInfo4.bands),"pH H20")
c.selection4.panel=ui.Panel([c.selection4.label,c.selection4.selector])
c.selection5={}
c.selection5.label=ui.Label("Stock de Carbone du Sol")
c.selection5.selector=ui.Select(Object.keys(m.imgInfo5.bands),"ocs_mean")
c.selection5.panel=ui.Panel([c.selection5.label,c.selection5.selector])
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
c.dividers.divider5 = ui.Panel();
// Define a legend widget group.
c.legend = {};
c.legend.title = ui.Label();
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legend.leftLabel = ui.Label('[min]');
c.legend.centerLabel = ui.Label();
c.legend.rightLabel = ui.Label('[max]');
c.legend.labelPanel = ui.Panel({
  widgets: [
    c.legend.leftLabel,
    c.legend.centerLabel,
    c.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
c.legend.panel = ui.Panel([
  c.legend.title,
  c.legend.colorbar,
  c.legend.labelPanel
]);
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
ui.root.clear();
ui.root.add(c.controlpanel);
ui.root.add(c.map);
c.controlpanel.add(c.info.panel)
c.controlpanel.add(c.dividers.divider1)
c.controlpanel.add(c.selection.panel)
c.controlpanel.add(c.dividers.divider2)
c.controlpanel.add(c.selection2.panel)
c.controlpanel.add(c.dividers.divider3)
c.controlpanel.add(c.selection3.panel)
c.controlpanel.add(c.dividers.divider4)
c.controlpanel.add(c.selection4.panel)
c.controlpanel.add(c.dividers.divider5)
c.controlpanel.add(c.selection5.panel)
c.map.add(c.legend.panel)
/*******************************************************************************
 * Styling *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.label = {
  fontWeight: 'bold',
  fontSize: '20px',
  color: 'green'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838',
  position:  'top-center'
};
s.stretchHorizontal = {
  stretch: 'horizontal'}
  s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
c.controlpanel.style().set({width:"275px",padding: '0px'})
c.info.title.style().set(s.label)
c.selection.label.style().set(s.widgetTitle)
c.selection2.label.style().set(s.widgetTitle)
c.selection3.label.style().set(s.widgetTitle)
c.selection4.label.style().set(s.widgetTitle)
c.selection5.label.style().set(s.widgetTitle)
c.selection.selector.style().set(s.stretchHorizontal)
c.selection2.selector.style().set(s.stretchHorizontal)
c.selection3.selector.style().set(s.stretchHorizontal)
c.selection4.selector.style().set(s.stretchHorizontal)
c.selection5.selector.style().set(s.stretchHorizontal)
//c.dividers.divider1.style().set(s.divider)
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
c.map.setCenter(-14.7575739638184,14.692479983281924,7)
//legend
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
});
c.legend.title.style().set(s.opacityWhiteNone);
c.legend.colorbar.style().set({
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
});
c.legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.leftLabel.style().set(s.opacityWhiteNone);
c.legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel.style().set(s.opacityWhiteNone);
c.legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
c.legend.rightLabel.style().set(s.opacityWhiteNone);
c.legend.panel.style().set({
  position: 'bottom-left',
  width: '200px',
  padding: '0px'});
c.legend.panel.style().set(s.opacityWhiteMed);
c.legend.labelPanel.style().set(s.opacityWhiteNone);
/*******************************************************************************
 * Behaviors *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
/* Example
// Handles updating the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.bandSelect.getValue() + ' (%)');
}
*/
function update1(){
  var band = c.selection.selector.getValue();
  print(band)
  var img=m.soc_mean.select(m.imgInfo1.bands[band].bname)
print (img)
var layer = ui.Map.Layer(
    img,m.imgInfo1.bands[band].vis, band );
  c.map.layers().set(0, layer);
}
  c.selection.selector.onChange(update1) 
// Deuxieme widget
function update2(){
  var band = c.selection2.selector.getValue();
  print(band)
  var img=m.cec_mean.select(m.imgInfo2.bands[band].bname)
print (img)
var layer = ui.Map.Layer(
    img,m.imgInfo2.bands[band].vis, band );
  c.map.layers().set(0, layer);
}
  c.selection2.selector.onChange(update2) 
//widget3
function update3(){
  var band = c.selection3.selector.getValue();
  print(band)
  var img=m.bulkd_mean.select(m.imgInfo3.bands[band].bname)
print (img)
var layer = ui.Map.Layer(
    img,m.imgInfo3.bands[band].vis, band );
  c.map.layers().set(0, layer);
}
  c.selection3.selector.onChange(update3) 
//widget 4
function update4(){
  var band = c.selection4.selector.getValue();
  print(band)
  var img=m.pheau_mean.select(m.imgInfo4.bands[band].bname)
print (img)
var layer = ui.Map.Layer(
    img,m.imgInfo4.bands[band].vis, band );
  c.map.layers().set(0, layer);
}
  c.selection4.selector.onChange(update4) 
//widget 5
function update5(){
  var band = c.selection5.selector.getValue();
  print(band)
  var img=m.ocs_mean.select(m.imgInfo5.bands[band].bname)
print (img)
var layer = ui.Map.Layer(
    img,m.imgInfo5.bands[band].vis, band );
  c.map.layers().set(0, layer);
}
  c.selection5.selector.onChange(update5) 
// Handles drawing the legend when band selector changes.
function updateLegend1() {
  c.legend.title.setValue(c.selection.selector.getValue() + ' (dg/kg)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo1.bands[c.selection.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo1.bands[c.selection.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo1.bands[c.selection.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo1.bands[c.selection.selector.getValue()].vis.max);
}
c.selection.selector.onChange(updateLegend1)
// Deuxieme widget Legend
function updateLegend2() {
  c.legend.title.setValue(c.selection2.selector.getValue() + ' (mmol(c)/kg)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo2.bands[c.selection2.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo2.bands[c.selection2.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo2.bands[c.selection2.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo2.bands[c.selection2.selector.getValue()].vis.max);
}
c.selection2.selector.onChange(updateLegend2)
//Widget 3
function updateLegend3() {
  c.legend.title.setValue(c.selection3.selector.getValue() + ' (cg/cm3)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo3.bands[c.selection3.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo3.bands[c.selection3.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo3.bands[c.selection3.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo3.bands[c.selection3.selector.getValue()].vis.max);
}
c.selection3.selector.onChange(updateLegend3)
//widget
function updateLegend4() {
  c.legend.title.setValue(c.selection4.selector.getValue() + ' (pH*10)' );
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo4.bands[c.selection4.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo4.bands[c.selection4.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo4.bands[c.selection4.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo4.bands[c.selection4.selector.getValue()].vis.max);
}
c.selection4.selector.onChange(updateLegend4)
//widget 5
function updateLegend5() {
  c.legend.title.setValue(c.selection5.selector.getValue() + ' (t/ha)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo5.bands[c.selection5.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo5.bands[c.selection5.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo5.bands[c.selection5.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo5.bands[c.selection5.selector.getValue()].vis.max);
}
c.selection5.selector.onChange(updateLegend5)
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
/* Example
// Selected year.
m.year = 2020;
*/