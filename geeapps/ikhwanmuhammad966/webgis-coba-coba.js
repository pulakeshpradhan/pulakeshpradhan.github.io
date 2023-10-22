var shp = ui.import && ui.import("shp", "table", {
      "id": "users/ikhwanmuhammad966/AOI_Tambang2"
    }) || ee.FeatureCollection("users/ikhwanmuhammad966/AOI_Tambang2"),
    image1 = ui.import && ui.import("image1", "image", {
      "id": "users/ikhwanmuhammad966/Kernel_exp"
    }) || ee.Image("users/ikhwanmuhammad966/Kernel_exp"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "projects/ee-ikhwanmuhammad/assets/Kernel_rec"
    }) || ee.Image("projects/ee-ikhwanmuhammad/assets/Kernel_rec");
Map.setOptions("HYBRID")
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var s2_2017 = ee.ImageCollection("COPERNICUS/S2")
          .filterDate('2017-01-01', '2017-12-31')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
          .filterBounds(shp)
          .map(maskS2clouds)
          .median()
var s2_2018 = ee.ImageCollection("COPERNICUS/S2")
          .filterDate('2018-01-01', '2018-12-31')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
          .filterBounds(shp)
          .map(maskS2clouds)
          .median()
var s2_2019 = ee.ImageCollection("COPERNICUS/S2")
          .filterDate('2019-01-01', '2019-12-31')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
          .filterBounds(shp)
          .map(maskS2clouds)
          .median()
var s2_2020 = ee.ImageCollection("COPERNICUS/S2")
          .filterDate('2020-01-01', '2020-12-31')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
          .filterBounds(shp)
          .map(maskS2clouds)
          .median()
var s2_2021 = ee.ImageCollection("COPERNICUS/S2")
          .filterDate('2021-06-15', '2021-06-20')
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
          .filterBounds(shp)
          .map(maskS2clouds)
          .median()
var rgbVis = {
  min: 0.004,
  max: 0.39,
  bands: ['B11', 'B8', 'B4'],
};
var ndvi = s2_2017.expression('(NIR - Red) / (NIR + Red)', {
          'NIR': s2_2017.select('B8'),
          'Red': s2_2017.select('B4')
          })
var ndvi2 = s2_2018.expression('(NIR - Red) / (NIR + Red)', {
          'NIR': s2_2018.select('B8'),
          'Red': s2_2018.select('B4')
          })
var ndvi3 = s2_2019.expression('(NIR - Red) / (NIR + Red)', {
          'NIR': s2_2019.select('B8'),
          'Red': s2_2019.select('B4')
          })
var ndvi4 = s2_2020.expression('(NIR - Red) / (NIR + Red)', {
          'NIR': s2_2020.select('B8'),
          'Red': s2_2020.select('B4')
          })
var ndvi5 = s2_2021.expression('(NIR - Red) / (NIR + Red)', {
          'NIR': s2_2021.select('B8'),
          'Red': s2_2021.select('B4')
          })
var final_image = s2_2017.addBands(ndvi.rename('NDVI'))
                          .addBands(ndvi2.rename('NDVI2'))
                          .addBands(ndvi3.rename('NDVI3'))
                          .addBands(ndvi4.rename('NDVI4'))
                          .addBands(ndvi5.rename('NDVI5'))
var final_image2= s2_2018.addBands(ndvi2.rename('NDVI2'))
var final_image3= s2_2019.addBands(ndvi3.rename('NDVI3'))
var final_image4= s2_2020.addBands(ndvi4.rename('NDVI3'))
var final_image5= s2_2021.addBands(ndvi5.rename('NDVI3'))
var dNDVI2018 = s2_2017.expression('(NDVI - NDVI2)', {
          'NDVI2': ndvi2,
          'NDVI': ndvi
          })
var dNDVI2019 = s2_2017.expression('(NDVI2 - NDVI3)', {
          'NDVI2': ndvi2,
          'NDVI3': ndvi3
          })
var dNDVI2020 = s2_2017.expression('(NDVI3 - NDVI4)', {
          'NDVI3': ndvi3,
          'NDVI4': ndvi4
          })
var dNDVI2021 = s2_2017.expression('(NDVI4 - NDVI5)', {
          'NDVI4': ndvi4,
          'NDVI5': ndvi5
          })
var bands = ['B2', 'B3', 'B4', 'B5', 'B8', 'B9', 'B11', 'NDVI']
var dNDVI2018_e = dNDVI2018.clip(shp).updateMask(dNDVI2018.gt(0.35))
var dNDVI2018_r = dNDVI2018.clip(shp).updateMask(dNDVI2018.lt(-0.135))
var dNDVI2019_e = dNDVI2019.clip(shp).updateMask(dNDVI2019.gt(0.35))
var dNDVI2019_r = dNDVI2019.clip(shp).updateMask(dNDVI2019.lt(-0.135))
var dNDVI2020_e = dNDVI2020.clip(shp).updateMask(dNDVI2020.gt(0.35))
var dNDVI2020_r = dNDVI2020.clip(shp).updateMask(dNDVI2020.lt(-0.135))
var dNDVI2021_e = dNDVI2021.clip(shp).updateMask(dNDVI2021.gt(0.35))
var dNDVI2021_r = dNDVI2021.clip(shp).updateMask(dNDVI2021.lt(-0.135))
var final_image9 = dNDVI2018_e.addBands(dNDVI2018_r.rename('Reklamasi 2018'))
                              .addBands(dNDVI2019_e.rename('Eksploitasi 2019'))
                              .addBands(dNDVI2019_r.rename('Reklamasi 2019'))
                              .addBands(dNDVI2020_e.rename('Eksploitasi 2020'))
                              .addBands(dNDVI2020_r.rename('Reklamasi 2020'))
                              .addBands(dNDVI2021_e.rename('Eksploitasi 2021'))
                              .addBands(dNDVI2021_r.rename('Reklamasi 2021'))
                              .addBands(image1.rename('DS_Exp'))
                              .addBands(image2.rename('DS_Rec'))
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
m.col = ee.Image(final_image9);
print(m.col)
m.imgInfo = {
  startYear: 2018,
  endYear: 2021,
  bands: {
    'Eksploitasi 2018': {
      bname: 'B8',
      color: 'd4e7b0',
      year: 2018,
      vis: {
        min: 0,
        max: 1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'Reklamasi 2018': {
      bname: 'Reklamasi 2018',
      color: 'd2cdc0',
      year: 2018,
      vis: {
        min: 0,
        max: -1,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    'Eksploitasi 2019': {
      bname: 'Eksploitasi 2019',
      color: 'ca9146',
      year: 2019,
      vis: {
        min: 0,
        max: 1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'Reklamasi 2019': {
      bname: 'Reklamasi 2019',
      color: '85c77e',
      year: 2019,
      vis: {
        min: 0,
        max: -1,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      }
    },
    'Eksploitasi 2020': {
      bname: 'Eksploitasi 2020',
      color: 'fbf65d',
      year: 2020,
      vis: {
        min: 0,
        max: 1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      }
    },
    'Reklamasi 2020': {
      bname: 'Reklamasi 2020',
      color: '38814e',
      year: 2020,
      vis: {
        min: 0,
        max: -1,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      },
    },
    'Reklamasi 2021': {
      bname: 'Reklamasi 2021',
      color: '38814e',
      year: 2021,
      vis: {
        min: 0,
        max: -1,
        palette: ['edf8e9', 'bae4b3', '74c476', '31a354', '006d2c']
      },
    },
    'Eksploitasi 2021': {
      bname: 'Eksploitasi 2021',
      color: 'fbf65d',
      year: 2021,
      vis: {
        min: 0,
        max: 1,
        palette: ['fef0d9', 'fdcc8a', 'fc8d59', 'e34a33', 'b30000']
      },
    },
    'Distribusi Spasial Eksploitasi': {
      bname: 'DS_Exp',
      color: 'fbf65d',
      vis: {
        min:0 ,
        max:1 ,
        palette: ['3dff55', 'adff29' , 'e2ff41' , 'fcff3d', 'ffc33d' , 'ff7f23' , 'ff5514', 'ff0a0a']
      },
    },
    'Distribusi Spasial Reklamasi': {
      bname: 'DS_Rec',
      color: 'fbf65d',
      vis: {
        min:0 ,
        max:1 ,
        palette: ['3dff55', 'adff29' , 'e2ff41' , 'fcff3d', 'ffc33d' , 'ff7f23' , 'ff5514', 'ff0a0a']
      }
    },
  }
};
print(m.imgInfo)
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
c.controlPanel = ui.Panel();
c.map = ui.Map();
c.info = {};
c.info.titleLabel = ui.Label('Spatial Distribution Land Exploitation and Reclamation in Sawahlunto')
c.info.aboutLabel = ui.Label(
  'Distribusi spasial lahan yang mengalami eksploitasi dan reklamasi '+
  'akibat penambangan batubara di Kota Sawahlunto tahun 2018-2021.'
  )
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel
]);
c.selectYear = {};
c.selectYear.label = ui.Label('Pilih Tahun untuk Ditampilkan');
c.selectYear.slider = ui.Slider({
  min:m.imgInfo.startYear,
  max:m.imgInfo.endYear,
  step:1
});
c.selectYear.panel = ui.Panel ([c.selectYear.label, c.selectYear.slider]);
c.selectBand = {};
c.selectBand.label = ui.Label ('Pilih');
c.selectBand.selector = ui.Select (Object.keys(m.imgInfo.bands), null, 'Reklamasi 2020');
c.selectBand.panel = ui.Panel ([c.selectBand.label, c.selectBand.selector]);
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
/* Example
c.legend = {
  title: ui.Label();
}
*/
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
/* Example
*/
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
c.Map.centerObject(shp);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.selectYear.panel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.selectBand.panel);
c.map.add(c.legend.panel);
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
s.aboutText = {
  fontSize: '13px',
  color: '505050'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
c.controlPanel.style().set({
  width: '275px',
});
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold',
});
c.info.aboutLabel.style().set(s.aboutText);
c.selectYear.label.style().set(s.widgetTitle);
c.selectYear.slider.style().set(s.stretchHorizontal);
c.selectBand.label.style().set(s.widgetTitle);
c.selectBand.selector.style().set(s.stretchHorizontal);
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
/* Example
s.legend.title = {
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
};
c.legend.title.style().set(s.legend.title);
*/
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
function updateLegend() {
  c.legend.title.setValue(c.selectBand.selector.getValue() + ' (%)');
  c.legend.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.imgInfo.bands[c.selectBand.selector.getValue()].vis.palette
  });
  c.legend.leftLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.min);
  c.legend.centerLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.max / 2);
  c.legend.rightLabel.setValue(
    m.imgInfo.bands[c.selectBand.selector.getValue()].vis.max);
}
c.selectYear.slider.onChange(updateLegend);
c.selectBand.selector.onChange(updateLegend);
/* Example
// Handles updating the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.bandSelect.getValue() + ' (%)');
}
*/
function updateMap() {
  var year = c.selectYear.slider.getValue();
  var band = c.selectBand.selector.getValue();
  var img = m.col.select(m.imgInfo.bands[band].bname);
  var layer = ui.Map.Layer({
    eeObject: img, 
    visParams: m.imgInfo.bands[band].vis, 
    name: band + ', ' + year
  });
  c.map.layers().set(0, layer);
}
c.selectYear.slider.onChange(updateMap);
c.selectBand.selector.onChange(updateMap);
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
updateMap();
updateLegend();
/* Example
// Selected year.
m.year = 2020;
*/