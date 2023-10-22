var ASB_depth = ui.import && ui.import("ASB_depth", "image", {
      "id": "users/mjw1280/Automated_Shallow_Water_Bathymetry_Mapping/AutoShalBathy_50m"
    }) || ee.Image("users/mjw1280/Automated_Shallow_Water_Bathymetry_Mapping/AutoShalBathy_50m");
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
// Define image collections for variables
m.col = {}
m.col.SST = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI').select('sst') // Sea Surface Temperature
m.col.Sal = ee.ImageCollection('HYCOM/sea_temp_salinity').select('salinity_2') // Salinity
m.col.Wnd = ee.ImageCollection("NOAA/CDR/ATMOS_NEAR_SURFACE/V2").select('wind_speed') // Wind
m.col.Cur = ee.ImageCollection('HYCOM/sea_water_velocity').select('velocity_u_10','velocity_v_10')// Current - north/south, east/west
m.col.Cld = ee.ImageCollection("NOAA/CDR/PATMOSX/V53").select('cloud_fraction') // Cloud
// Define properties and info about the bands in this collection that the app will present.
m.varInfo = {
    variables: {
      'SST': {
        vname: 'stress_SST'
      },
      'SST Anomaly': {
        vname: 'stress_SSTanom'
      },
      'SST Variability': {
        vname: 'stress_SSTvar'
      },
      'Degree Heating Week': {
        vname: 'stress_DHW'
      },
      'Depth': {
        vname: 'stress_depth'
      },
      'Salinity': {
        vname: 'stress_sal'
      },
      'Wind': {
        vname: 'stress_wind'
      },
      'Current': {
        vname: 'stress_curr'
      },
      'Cloud': {
        vname: 'stress_cloud'
      }
    },
  startDate: '2018-01-01',
  endDate: '2020-12-31', 
  minStep: 1,
  maxStep: 3,
  minROI: 1000,
  maxROI: 50000,
  defaultROI: 5000,
  ROIstep: 1000,
  layerOpacity: 0.8,
  roiOpacity: 0.7,
  palette: ["#440154","#3b528b","#21918c","#5ec962","#fde725"]
};
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
// Define a control panel for user input.
c.controlPanel = ui.Panel();
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
c.dividers.divider5 = ui.Panel();
c.dividers.divider6 = ui.Panel();
// Define the main interactive map.
c.map = ui.Map();
// Define an app info widget group.
c.info = {};
c.info.titleLabel = ui.Label('Reef Environmental Stress Exposure Toolbox');
c.info.aboutLabel = ui.Label(
  'This application provides an open access tool, integrating ' +
  'nine different environmental variables, for monitoring of ' +
  'environmental stress across coral reefs at a global scale.');
c.info.authorLabel = ui.Label(
  'Developed by Henry J. Thompson and Michael J. Williamson.');
c.info.tutorial1 = ui.Label(
  "Enter coordinates and click 'Create Region of Interest'");
c.info.tutorial2 = ui.Label(
  "Use the slider to select ROI radius");
c.info.tutorial3 = ui.Label(
  "Choose timeseries start date, end date and time step");
c.info.tutorial4 = ui.Label(
  "Select a variable to display a timeseries of RESET");
c.info.tutorial5 = ui.Label(
  "Click a point on the timeseries to display a map of RESET. Hover over 'Layers' tab (top right) to adjust opacity.");
c.info.tutorial6 = ui.Label( 
  "Download full RESET dataset containing all variables");
c.info.paperLink = ui.Label({
  value: 'Read the article',
  targetUrl: 'https://doi.org/10.1002/rse2.286'
});
c.info.citation1 = ui.Label(
  'How to cite: ');
c.info.citation2 = ui.Label(
'Williamson, M.J., Tebbs, E.J., Dawson, T.P., Thompson, H.J., Head, C.E.I. and Jacoby, D.M.P. (2022). Monitoring shallow coral reef exposure to environmental stressors using satellite earth observation: the reef environmental stress exposure toolbox (RESET). Remote Sens Ecol Conserv. https://doi.org/10.1002/rse2.286');
c.info.gitLabel = ui.Label('All code for the RESET, written in GEE JavaScript API, can be found as GitHub repository.');
c.info.gitLink = ui.Label({
  value: 'GitHub - Reef Environmental Stress Exposure Toolbox',
  targetUrl: 'https://github.com/mjw-marine/Reef-Environmental-Stress-Exposure-Toolbox'
});
c.info.warningLabel1 = ui.Label('Note: Large ROI radius and short time-step may take longer to generate timeseries.');
c.info.warningLabel2 = ui.Label('Note: Data downloads can take several minutes to load.');
c.info.panel = ui.Panel([
  c.info.titleLabel, c.info.aboutLabel,  c.info.authorLabel, c.info.paperLink, c.info.citation1, c.info.citation2, c.info.gitLabel, c.info.gitLink, c.info.warningLabel1, c.info.warningLabel2
]);
// Define a panel for inputting lat/lon
c.coords = {};
c.coords.label = ui.Label('1. Region of Interest (ROI)');
c.coords.latLabel = ui.Label('Lat:');
c.coords.lonLabel = ui.Label('Lon:');
c.coords.lat = ui.Textbox({placeholder: 'Lat'
                                  ,value: -5.2479
                                  })
c.coords.lon = ui.Textbox({placeholder: 'Lon'
                                  ,value: 71.7620 
                                  })
c.coords.lonlat = ui.Panel([c.coords.latLabel, c.coords.lat, c.coords.lonLabel, c.coords.lon])
c.coords.button = ui.Button({label: 'Create Region of Interest'})
c.coords.panel = ui.Panel([c.coords.label, c.info.tutorial1, c.coords.lonlat, c.coords.button]);
// Define a reduction region radius selector widget group (for charting).
c.selectRadius = {};
c.selectRadius.label = ui.Label('2. ROI Radius (m)');
c.selectRadius.slider = ui.Slider({
  min: m.varInfo.minROI,
  max: m.varInfo.maxROI,
  value: m.varInfo.defaultROI,
  step: m.varInfo.ROIstep
});
c.selectRadius.unitLabel = ui.Label('meters');
c.selectRadius.unitSlider = ui.Panel([c.selectRadius.slider,c.selectRadius.unitLabel])
c.selectRadius.panel = ui.Panel([c.selectRadius.label, c.info.tutorial2, c.selectRadius.unitSlider]);
// Define a date start/end widget group
c.selectDateStep = {};
c.selectDateStep.title = ui.Label('3. Timeseries Parameters');
c.selectDateStep.startLabel = ui.Label('Start date');
c.selectDateStep.endLabel = ui.Label('End date');
c.selectDateStep.stepLabel = ui.Label('Time step (months)');
c.selectDateStep.startBox = ui.Textbox({placeholder: 'YYYY-MM-DD'
                                  ,value: '2018-01-01'
                                  })
c.selectDateStep.endBox = ui.Textbox({placeholder: 'YYYY-MM-DD'
                                  ,value: '2020-12-31'
                                  })
c.selectDateStep.stepSlider = ui.Slider({
  min: m.varInfo.minStep,
  max: m.varInfo.maxStep,
  step: 1
});
c.selectDateStep.startPanel = ui.Panel([c.selectDateStep.startLabel, c.selectDateStep.startBox]);
c.selectDateStep.endPanel = ui.Panel([c.selectDateStep.endLabel, c.selectDateStep.endBox]);
c.selectDateStep.stepPanel = ui.Panel([c.selectDateStep.stepLabel, c.selectDateStep.stepSlider]);
c.selectDateStep.introPanel = ui.Panel([c.selectDateStep.title, c.info.tutorial3])
c.selectDateStep.panel = ui.Panel([c.selectDateStep.startPanel, c.selectDateStep.endPanel, c.selectDateStep.stepPanel]);
// Define a group for selecting and charting variable stress scores.
c.chartVar = {};
c.chartVar.label = ui.Label('4. Generate Timeseries');
c.chartVar.selector = ui.Select({
                      items: Object.keys(m.varInfo.variables),
                      placeholder: 'Select a variable...'
                      });
c.chartVar.panel = ui.Panel([c.chartVar.label, c.info.tutorial4, c.info.tutorial5, c.chartVar.selector]);
// Define a panel for displaying a chart.
c.chart = {};
c.chart.label = ui.Label(); // will hold widget title
c.chart.container = ui.Panel();  // will hold the dynamically generated chart. 
c.chart.chartPanel = ui.Panel({widgets: [c.chart.label, c.chart.container]
                              // ,style: {shown: false}
                              });
// Define a legend widget group
c.legend = {};
c.legend.title = ui.Label('Stress Score');
c.legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0)).setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: m.varInfo.palette
  });
c.legend.leftLabel = ui.Label('0');
c.legend.centerLabel1 = ui.Label('0.2');
c.legend.centerLabel2 = ui.Label('0.4');
c.legend.centerLabel3 = ui.Label('0.6');
c.legend.centerLabel4 = ui.Label('0.8');
c.legend.rightLabel = ui.Label('1');
c.legend.labelPanel = ui.Panel({
  widgets: [
    c.legend.leftLabel,
    c.legend.centerLabel1,
    c.legend.centerLabel2,
    c.legend.centerLabel3,
    c.legend.centerLabel4,
    c.legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
c.legend.panel = ui.Panel([
  c.legend.title,
  c.legend.colorbar,
  c.legend.labelPanel
]);
// Define a panel for downloading data.
c.download = {};
c.download.title = ui.Label('5. Download')
c.download.button = ui.Button('Click to download')
c.download.label = ui.Label() //empty label
c.download.panel = ui.Panel([c.download.title, c.info.tutorial6, c.download.button, c.download.label]);
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
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.coords.panel);
c.controlPanel.add(c.dividers.divider2)
c.controlPanel.add(c.selectRadius.panel);
c.controlPanel.add(c.dividers.divider3)
c.controlPanel.add(c.selectDateStep.introPanel)
c.controlPanel.add(c.selectDateStep.panel);
c.controlPanel.add(c.dividers.divider4);
c.controlPanel.add(c.chartVar.panel)
c.controlPanel.add(c.dividers.divider5);
c.controlPanel.add(c.chart.chartPanel)
c.controlPanel.add(c.dividers.divider6);
c.controlPanel.add(c.download.panel);
// c.map.add(c.legend.panel);
ui.root.clear();
ui.root.add(c.controlPanel);                
ui.root.add(c.map);
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
var s = {};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
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
s.horizontalFlow = {
  layout: ui.Panel.Layout.flow('horizontal')
}
s.dateBox = {
  width: '120px'
}
s.stepSlider = {
  width: '150px'
}
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.aboutText = {
  fontSize: '13px',
  color: '505050'
};
s.aboutTitle = {
  fontSize: '14px',
  color: '505050',
  fontWeight: 'bold'
};
s.dateStepLabels = {
  fontSize: '13px',
  color: '505050'
};
c.info.titleLabel.style().set({
  fontSize: '20px',
  fontWeight: 'bold'
});
c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.aboutText);
c.info.authorLabel.style().set(s.aboutText)
c.info.tutorial1.style().set(s.aboutText);
c.info.tutorial2.style().set(s.aboutText);
c.info.tutorial3.style().set(s.aboutText);
c.info.tutorial4.style().set(s.aboutText);
c.info.tutorial5.style().set(s.aboutText);
c.info.tutorial6.style().set(s.aboutText);
c.info.gitLabel.style().set(s.aboutText);
c.info.warningLabel1.style().set(s.aboutText);
c.info.warningLabel2.style().set(s.aboutText);
c.info.paperLink.style().set(s.aboutText);
c.info.gitLink.style().set(s.aboutText);
c.info.citation1.style().set(s.aboutText);
c.info.citation2.style().set(s.aboutText);
c.coords.lon.style().set(s.stretchHorizontal)
c.coords.lat.style().set(s.stretchHorizontal)
c.coords.lonlat.setLayout(ui.Panel.Layout.flow('horizontal'))
c.coords.button.style().set(s.stretchHorizontal);
c.coords.label.style().set(s.widgetTitle);
c.selectRadius.slider.style().set(s.stretchHorizontal);
c.selectRadius.unitSlider.setLayout(ui.Panel.Layout.flow('horizontal'))
c.selectRadius.label.style().set(s.widgetTitle);
c.selectDateStep.title.style().set(s.widgetTitle)
c.selectDateStep.startLabel.style().set(s.dateStepLabels)
c.selectDateStep.endLabel.style().set(s.dateStepLabels)
c.selectDateStep.stepLabel.style().set(s.dateStepLabels)
c.selectDateStep.startBox.style().set(s.dateBox)
c.selectDateStep.endBox.style().set(s.dateBox)
c.selectDateStep.stepSlider.style().set(s.stretchHorizontal).set(s.stepSlider)
c.selectDateStep.panel.setLayout(ui.Panel.Layout.flow('horizontal'))
c.chartVar.label.style().set(s.widgetTitle);
c.chartVar.selector.style().set(s.stretchHorizontal);
c.chart.label.style().set(s.widgetTitle);
c.legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '14px',
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
c.legend.centerLabel1.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel2.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel3.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel4.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
c.legend.centerLabel1.style().set(s.opacityWhiteNone);
c.legend.centerLabel2.style().set(s.opacityWhiteNone);
c.legend.centerLabel3.style().set(s.opacityWhiteNone);
c.legend.centerLabel4.style().set(s.opacityWhiteNone);
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
c.download.title.style().set(s.widgetTitle)
c.download.button.style().set(s.stretchHorizontal);
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
c.controlPanel.style().set({
  width: '500px',
  padding: '0px'
});
c.map.setOptions('HYBRID');
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
function refreshMap() {
  c.map.clear();
  c.map.setOptions('HYBRID');
  updateCoords();
}
function resetChart() {
   c.chart.container.clear()
   c.chartVar.selector.setValue(null, false)
}
// ======================= ROI ======================= //
function updateCoords() {
  var lat = parseFloat(c.coords.lat.getValue())
  var lon = parseFloat(c.coords.lon.getValue())
  var radius = c.selectRadius.slider.getValue()
  var point = ee.Geometry.Point([lon, lat]);
  var roi = point.buffer(radius)
  c.map.centerObject(roi);
  // Add ROI to map
  var roi_layer = ui.Map.Layer(roi, {palette: ['FF08ED']}, 'ROI', true, m.varInfo.roiOpacity);    // create a map layer, with viz
  c.map.layers().set(0, roi_layer);                                   // set first layer on map to this.
}
// Draw ROI on button press
c.coords.button.onClick(updateCoords)
// Refresh ROI on slider change
c.selectRadius.slider.onChange(updateCoords)
// Reset chart and map when change settings
c.coords.button.onClick(resetChart)
c.selectRadius.slider.onChange(resetChart)
c.selectDateStep.stepSlider.onChange(resetChart) //** EDIT: This should auto refresh the chart with new params
c.selectDateStep.startBox.onChange(resetChart) //** EDIT: This should auto refresh the chart with new params
c.selectDateStep.endBox.onChange(resetChart) //** EDIT: This should auto refresh the chart with new params
// ======================= Create Dateslist ======================= //
function createDateslist(START, END, STEP) {
  var start = ee.Date(START)
  var end = ee.Date(END)
  // get total number of months
  var n_months = ee.Date(end).difference(start, 'month').round();
  // get a sequence of number of months
  var seq_month = ee.List.sequence(0,n_months,STEP);
  // create dateslist by advancing from START by the seq_month
  var dates = seq_month.map(function(n) {
  return start.advance(n,'month');
  });
  return dates;
}
// ======================= Stress Scores ======================= //
  // ------------------------ SST ------------------------ //
function calcStressSST() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_SST = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);
    // Get SST Collection
    var sst_Col = m.col.SST.filterDate(date_range).filterBounds(roi)
    // Get mean SST
    var sst_mean = sst_Col.mean()
    // Calculate stress
    var sstStress_Col = sst_Col.map(function(img) {
      var sst_Score = img.expression(
       "(sst < 18.0) ? 1.0" +
       ":((sst <= 21.0) ? -1.0/3.0*sst + 7.0" +
       ":(sst < 28.0) ? 0.0" +
       ":(sst <= 30.0) ? 1.0/2.0*sst - 14.0" +
       ": 1.0)",
       {"sst" : img});
         return sst_Score;
     });
    // Get mean stress score
    var sstStress_mean = sstStress_Col.mean()
    // select and rename band
    .select('constant').rename('SE_score')
    // add system:time to properties
    .set('system:time_start', start.millis())
    //add the SST mean as band
    .addBands(sst_mean.rename('variable_mean'))
    return sstStress_mean
    // Set properties
    .set('variable', 'SST')
    .set('label', 'stressor')
    .set('reliability', 'high');
  }))
  return Stress_SST
}
  // ------------------------ SST ANOM ------------------------ //
function calcStressSSTanom() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get long-term reference SST Collection (for SST_anom and DHW)
  var referenceSST = m.col.SST.filterBounds(roi).filterDate(ee.Date('2002-01-01'), ee.Date('2012-12-31'));
  // Create mean per month SST reference Collection
  var months = ee.List.sequence(1, 12);
  var referenceMonthSST = ee.ImageCollection.fromImages(
        months.map(function (m) {
          return referenceSST.filter(ee.Filter.calendarRange(m, m, 'month')) //change for which ref dataset
                      .select(0).mean()
                      .set('month', m);
  }));
  // Get Stress Collection
  var Stress_SSTanom = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);
    // Get SST Collection
    var sst_Col = m.col.SST.filterDate(date_range).filterBounds(roi)
    // Get SST reference Collection
    var sst_ref = referenceMonthSST
    // Calculate SST anomaly
    var sst_anom = sst_Col.map(function(img) {
      var m = img.date().get('month'); 
      // match month
      var meanDate = sst_ref.filter(ee.Filter.eq('month', m)).first();
      // subtract SST from baseline average SST
      return img.subtract(meanDate)
      .set('system:time_start', img.get('system:time_start'));
    });
    // get SST anomaly mean
    var sstAnom_mean = sst_anom.mean();
    // Calculate stress
    var sstAnomStress_Col = sst_anom.map(function(img) {
        var sstAnom_score = img.expression(
          "(sst > 2.0) ? 1.0" +
          ":((sst < 1.0) ? 0.0" +
          ": 1.0/2.0*sst -1.0/2.0)",
          {"sst" : img});
          return sstAnom_score;
    });
    // Get mean stress score
    var sstAnomStress_mean = sstAnomStress_Col.mean()
    // select and rename band
    .select('constant').rename('SE_score')
    // add system:time to properties
    .set('system:time_start', start.millis())
    //add the SST_anom mean as band
    .addBands(sstAnom_mean.rename('variable_mean'))
    return sstAnomStress_mean
    .set('variable', 'SST_anom')
    .set('label', 'stressor')
    .set('reliability', 'high');
  }))
  return Stress_SSTanom
}
  // ------------------------ SST VAR ------------------------ //
function calcStressSSTvar() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get long-term reference SST Collection (for SST_anom and DHW)
  var referenceSST = m.col.SST.filterBounds(roi).filterDate(ee.Date('2002-01-01'), ee.Date('2012-12-31'));
  // Create mean per month SST reference Collection
  var months = ee.List.sequence(1, 12);
  var referenceMonthSST = ee.ImageCollection.fromImages(
        months.map(function (m) {
          return referenceSST.filter(ee.Filter.calendarRange(m, m, 'month')) //change for which ref dataset
                      .select(0).mean()
                      .set('month', m);
  }));
  // Get Stress Collection
  var Stress_SSTvar = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);
    // Get SST Collection
    var sst_Col = m.col.SST.filterDate(date_range).filterBounds(roi)
    // Get mean SST
    var sst_minMax = sst_Col.reduce(ee.Reducer.minMax());
    // Get SST variability
    var sstVar = sst_minMax.expression(
      "max-min", {
        "max": sst_minMax.select("sst_max"),
        "min": sst_minMax.select("sst_min")
      });
    // Calculate stress
    var sstVarStress = sstVar.expression(
      "(sst_max < 4.0) ? 0.0" +
      ": ((sst_max  > 10.0) ? 1.0" +
      ": 1.0/6.0*sst_max - 2.0/3.0)",
      {"sst_max" : sstVar.select('sst_max')});
    // Get mean stress score
    sstVarStress = sstVarStress
    // select and rename band
    .select('constant').rename('SE_score')
    // add system:time to properties
    .set('system:time_start', start.millis())
    //add the SST_anom mean as band
    .addBands(sstVar.rename('variable_mean'))
    return sstVarStress
    .set('variable', 'SST_var')
    .set('label', 'reducer')
    .set('reliability', 'high');
  }))
  return Stress_SSTvar
}
//   // ------------------------ DHW ------------------------ //
function calcStressDHW() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get long-term reference SST Collection (for SST_anom and DHW)
  var referenceSST = m.col.SST.filterBounds(roi).filterDate(ee.Date('2002-01-01'), ee.Date('2012-12-31'));
  // Create mean per month SST reference Collection
  var months = ee.List.sequence(1, 12);
  var referenceMonthSST = ee.ImageCollection.fromImages(
        months.map(function (m) {
          return referenceSST.filter(ee.Filter.calendarRange(m, m, 'month')) //change for which ref dataset
                      .select(0).mean()
                      .set('month', m);
  }));
  // Get Stress Collection
  var Stress_DHW = ee.ImageCollection(datesList.map(function(d) {
  // Get DHW date range (3 months ending d + 1)
  var startDHW = ee.Date(d).advance(-2, 'month')
  var endDHW = ee.Date(d).advance(1,'month');
  var date_range = ee.DateRange(startDHW,endDHW);
  // Get SST Collection
  var sst_Col = m.col.SST.filterDate(startDHW, endDHW).filterBounds(roi).sort('system:time_start');
  // Get SST reference Collection
  var sst_ref = referenceMonthSST
  // Calculate daily SST anomaly
  var series_daily = sst_Col.map(function(img) {
    var m = img.date().get('month');
    // match month
    var meanDate = sst_ref.filter(ee.Filter.eq('month', m)).first();
    // subtract SST from baseline average SST
    return img.subtract(meanDate)
    .set('system:time_start', img.get('system:time_start'));
  });
  // Calculate weekly mean of SST anomaly:
  // Get a list of start dates
  // week difference in millis
  var weekDifference = ee.Date(startDHW).advance(1, 'week').millis().subtract(ee.Date(startDHW).millis());
  // list of weeks in millis
  var listMap = ee.List.sequence(ee.Date(startDHW).millis(), ee.Date(endDHW).millis(), weekDifference);
  // Function to calculate weekly mean anomaly
  var SSTA_7d = ee.ImageCollection.fromImages(listMap.map(function(date){ //date is saved as the first image in composite. Mike saved date as the last (end of week)?
    date = ee.Date(date)
    // Filter for the week
    var series_week = series_daily
                      .filterDate(date, date.advance(1, 'week'))
    // Get number of images in composite
    var numbImages = series_week.size()
    // Weekly mean composite
    var composite = series_week.mean()
                        .set('system:time_start', date.millis(), 'dateYMD', date.format('YYYY-MM-dd'), 'numbImages', numbImages);
    return composite;
    }))
    // Filter weeks with no images
    .filter(ee.Filter.gt('numbImages', 0))
    // Calculate number of weeks > 1 degree over mean
    // select pixels with no. anomalies > 1 in the 12 week period
    var DHW_gte1 = SSTA_7d.map(function (image) {
      return image.updateMask(image.select('sst').gte(1));
    });
    // Get anomaly count
    var DHWCount = DHW_gte1.reduce(ee.Reducer.countDistinct()); //countDistinct reduces collection to count number of images in the collection
    // Calculate stress
    // need to code NA values as 0 or code will not run here
    var proxy = 0;
    DHWCount  = DHWCount.unmask(proxy);
    // print('DHWCount', DHWCount)
    var DHW_HS = DHWCount.expression(
      "(sst_count == proxy) ? 0.0" +
      ":((sst_count > 8.0) ? 1.0" +
      ":(sst_count < 4.0) ? 0.0" +
      ": 1.0/4.0*sst_count - 1.0)",
      {"sst_count" : DHWCount.select('sst_count'), "proxy": proxy});
    DHW_HS = DHW_HS.select('constant').rename('SE_score') //renames band to SE_score
                  // adds system:time to properties
                  .set('system:time_start', ee.Date(d).millis())
                  //adds the variable data as a band
                  .addBands(DHWCount.rename('variable_mean')); 
    return DHW_HS
    // Set properties
    .set('variable', 'DHW')
    .set('label', 'stressor')
    .set('reliability', 'low');
  }))
  return Stress_DHW
}
//   // ------------------------ DEPTH ------------------------ //
function calcStressDepth() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_depth = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);  
    var depth = ASB_depth;
    // Calculate stress
    var depthStress = depth.expression(
      "(bedrock < 10.0) ? 1.0" +
      ":((bedrock > 20.0) ? 0.0" +
        ":-1.0/10.0*bedrock + 2.0)",
      {"bedrock" : depth});
    // depth SEI for collection
    depthStress = depthStress.select('constant').rename('SE_score') //renames band to SE_score
    // adds system:time to properties
    .set('system:time_start', start.millis())
    //adds the variable data as a band
    .addBands(depth.rename('variable_mean'));
    return depthStress
    // Set properties
    .set('variable', 'depth')
    .set('label', 'stressor')
    .set('reliability', 'high');
  }))
  return Stress_depth;
}
// ------------------------ SALINITY ------------------------ //
function calcStressSal() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_sal = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);  
    // Get salinity collection
    var sal_Col = m.col.Sal.filterDate(date_range).filterBounds(roi)
    // Scale salinity data
    var sal_Scale = sal_Col.map(function(image) {
      var scaled = image.expression(
      "salinity_0*0.001+20.0",
      {"salinity_0" : image});
      return scaled.set('system:time_start', image.get('system:time_start'))
                  .set('system:time_end', image.get('system:time_end'));
    })
    // get collection mean
    var sal_mean = sal_Scale.mean();
    // Calculate stress 
    var salStress = sal_Scale.map(function(image) {
    var salHS = image.expression(
      "(salinity_2 < 26.0) ? 1.0" +
      ":((salinity_2 <= 32.0) ? -1.0/6.0*salinity_2 + 16.0/3.0" +
      ":(salinity_2 < 38.0) ? 0.0" +
      ":(salinity_2 <= 45.0) ? 1.0/7.0*salinity_2 - 38.0/7.0" +
      ": 1.0)",
      {"salinity_2" : image});
      return salHS;  
    })
    // Get mean stress score
    var salStress_mean = salStress.mean()
    // divide low reliability variables by 2
    var salStress_low = salStress_mean.expression(
      'SE_score/2.0',{
      'SE_score':salStress_mean.select('constant')
      });
    salStress_low = salStress_low.select('constant').rename('SE_score') //renames band to SE_score
                    // adds system:time to properties
                    .set('system:time_start', start.millis())
                    //adds the variable data as a band
                    .addBands(sal_mean.rename('variable_mean'));
    return salStress_low
    // Set properties
    .set('variable', 'salinity')
    .set('label', 'stressor')
    .set('reliability', 'low');
  }))
  return Stress_sal
}
//   // ------------------------ WIND ------------------------ //
function calcStressWind() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_wind = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);  
    // Get wind collection
    var wind_Col = m.col.Wnd.filterDate(date_range).filterBounds(roi) 
    // get collection mean
    var wind_mean = wind_Col.mean();
    // Calculate stress 
    var windStress_Col = wind_Col.map(function(image) {
      var windHS = image.expression(
      "(wind_speed < 5.0) ? 1.0" +
      ":((wind_speed <= 8.0) ? -1.0/3.0*wind_speed + 8.0/3.0" +
      ":(wind_speed < 28.0) ? 0.0" +
      ":(wind_speed <= 33.0) ? 1.0/5.0*wind_speed - 28.0/5.0" +
      ": 1.0) ",
      {"wind_speed" : image});
      return windHS;
    })
    // Get mean stress score
    var windStress_mean = windStress_Col.mean();
    // divide low reliability variables by 2
    var windStress_low = windStress_mean.expression(
      'SE_score/2.0',{
        'SE_score':windStress_mean.select('constant')
      });
    windStress_low = windStress_low.select('constant').rename('SE_score')
                    .set('system:time_start', start.millis())
                    .addBands(wind_mean.rename('variable_mean'));
    return windStress_low
    // Set properties
    .set('variable', 'wind')
    .set('label', 'stressor')
    .set('reliability', 'low');
  }));
  return Stress_wind;
}
//   // ------------------------ CURRENT ------------------------ //
function calcStressCurr() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_curr = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);  
    // Get current collection
    var curr_Col = m.col.Cur.filterDate(date_range).filterBounds(roi) 
    // Scale current speeds
    var curr_Scale = curr_Col.map(function(image) {
      var scaled = image.expression(
    "velocity_u_10*0.001" &&
    "velocity_v_10*0.001",
    {"velocity_u_10" : image,
      "velocity_v_10" : image, 
    });
    return scaled.set('system:time_start', image.get('system:time_start'))
                  .set('system:time_end', image.get('system:time_end'));
    })
    // Calculate current speed by c=sqrt(a2+b2) using northwards and eastwards speeds
    var curr_Speed = curr_Scale.map(function(image) {
      var currentSpeed = image.expression(
      "sqrt(u*u + v*v)",{
      "u":image.select('velocity_u_10'),
      "v":image.select('velocity_v_10')
      });
      return currentSpeed.set('system:time_start', image.get('system:time_start'))
                        .set('system:time_end', image.get('system:time_end'))
                        .rename('current'); // rename band to current
    })
    // get collection mean
    var curr_mean = curr_Speed.mean();
    // Calculate stress 
    var currStress_Col = curr_Speed.map(function(image) {
      var currentHS = image.expression(
      "(current < 0.13) ? 0.0" +
      ":((current > 0.15) ? 1.0" +
      ": 50.0*current - 15.0/2.0)",
      {"current" : image});
      return currentHS;
    })
    // calculate mean collection 
    var currStress_mean = currStress_Col.mean();
    currStress_mean = currStress_mean.select('constant').rename('SE_score')//renames band to SE_score
                        // adds system:time to properties
                        .set('system:time_start', start.millis())
                        //adds the variable data as a band
                        .addBands(curr_mean.rename('variable_mean'));
    return currStress_mean
    // Set properties
    .set('variable', 'current')
    .set('label', 'reducer')
    .set('reliability', 'high');
  }))
  return Stress_curr
}
//   // ------------------------ CLOUD ------------------------ //
function calcStressCloud() {
  // Get ROI
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get Start/End
  var startDate = ee.Date(c.selectDateStep.startBox.getValue());
  var endDate = ee.Date(c.selectDateStep.endBox.getValue()); 
  var time_step = c.selectDateStep.stepSlider.getValue();
  // Create list of dates
  var datesList = createDateslist(startDate, endDate, time_step)
  // Get Stress Collection
  var Stress_cloud = ee.ImageCollection(datesList.map(function(d) {
    // Get date range
    var start = ee.Date(d);
    var end = ee.Date(d).advance(1,'month');
    var date_range = ee.DateRange(start,end);  
    // Get cloud collection
    var cloud_Col = m.col.Cld.filterDate(date_range).filterBounds(roi) 
    // Scale cloud
    var cloud_Scale = cloud_Col.map(function(image) {
      var scaled = image.expression(
      "cloud_fraction*0.00393701+0.5",
      {"cloud_fraction" : image});
      return scaled.set('system:time_start', image.get('system:time_start'))
                  .set('system:time_end', image.get('system:time_end'));
    })
    // get collection mean
    var cloud_mean = cloud_Scale.mean();
    // Calculate stress 
    var cloudStress_Col = cloud_Scale.map(function(image) {
      var cloudHS = image.expression(
    "(cloud_fraction <= 3.0/8.0) ? 0.0" +
    ":((cloud_fraction >= 7.0/8.0) ? 1" +
    ": 2.0*cloud_fraction - 7.0/4.0)",
    {"cloud_fraction" : image});
      return cloudHS;
    })
    // Get mean stress score
    var cloudStress_mean = cloudStress_Col.mean();
    // divide low reliability variables by 2
    var cloudStress_low = cloudStress_mean.expression( 
      'SE_score/2.0',{
        'SE_score':cloudStress_mean.select('constant')
      });
    cloudStress_low = cloudStress_low.select('constant').rename('SE_score')
                    .set('system:time_start', start.millis())
                    .addBands(cloud_mean.rename('variable_mean'));
    return cloudStress_low
    // Set properties
    .set('variable', 'cloud')
    .set('label', 'reducer')
    .set('reliability', 'low');
  }))
  return Stress_cloud
}
// ======================= TIME SERIES ======================= //
// Add download button
function addDownload() {
  //**NOTE: Add a line. Don't add download button twice (if already there). Maybe remove and add again?
  c.controlPanel.add(c.download.panel)
}
var styleChartAxis = {
    fontSize: 12,
    italic: false,
    bold: true
};
// Draw the timeseries and map
function drawChart() {
  refreshMap()
  var roi = c.map.layers().get(0).getEeObject().geometry()
  // Get variable functions
  var stress_SST = calcStressSST()
  var stress_SSTanom = calcStressSSTanom()
  var stress_SSTvar = calcStressSSTvar()
  var stress_DHW = calcStressDHW()
  var stress_depth = calcStressDepth()
  var stress_sal = calcStressSal()
  var stress_wind = calcStressWind()
  var stress_curr = calcStressCurr()
  var stress_cloud = calcStressCloud()
  // get variable from selector widget
  var selected_variable = c.chartVar.selector.getValue()
  // Get selected variable stress score and variable mean
  // eval() string to variable
  var stressScore = eval(m.varInfo.variables[selected_variable].vname).select('SE_score')
  var variableMean = eval(m.varInfo.variables[selected_variable].vname).select('variable_mean')
  // Draw Chart --------------------------------------------------------------------------------
  var chart = ui.Chart.image.series({
                  imageCollection: stressScore,
                  region: roi,
                  scale: 50}) // ftCol
                  .setOptions({
                  title: {
                    title: selected_variable + ' - Stress Exposure Score'
                    },
                  hAxis: {
                  title: 'Date',
                  titleTextStyle: styleChartAxis
                  },
                vAxis: {
                  title: 'Stress Score',
                  titleTextStyle: styleChartAxis
                },
                legend: {position: 'none'}
                })
  // c.chart.label.setValue('Stress Score Plot') // this adds chart panel title
  c.chart.container.widgets().reset([chart]); // this refreshes the chart with "sst_chart"
  // Draw Map --------------------------------------------------------------------------------
  // Add functionality to display a map when clicking the chart
  chart.onClick(function(date){
  refreshMap()
  // Filter collection by selected date
  // var selected_variableMean = variableMean.filter(ee.Filter.eq('system:time_start', date))
  var selected_stressScore = stressScore.filter(ee.Filter.eq('system:time_start', date)).first()
  // Create SLD palette:
  // Define an SLD style of discrete intervals to apply to the image.
  var sld_intervals =
    '<RasterSymbolizer>' +
      '<ColorMap type="ramp" extended="false" >' +
        '<ColorMapEntry color="#440154" quantity="0" label="0"/>' +
        '<ColorMapEntry color="#3b528b" quantity="0.2" label="0.2" />' +
        '<ColorMapEntry color="#21918c" quantity="0.6" label="0.6" />' +
        '<ColorMapEntry color="#5ec962" quantity="0.8" label="0.8" />' +
        '<ColorMapEntry color="#fde725" quantity="1" label="1" />' +
      '</ColorMap>' +
    '</RasterSymbolizer>';
  // Format map layers
  // var variableMean_layer = ui.Map.Layer(selected_variableMean, {palette: ['red', 'yellow', 'green']}, selected_variable + ' Variable Mean - ' + c.selectDateStep.stepSlider.getValue() + ' Month');
  var stressScore_layer = ui.Map.Layer(selected_stressScore.sldStyle(sld_intervals), {},
                                      selected_variable + ' Stress Score Mean - ' + c.selectDateStep.stepSlider.getValue() + ' Month',
                                      true, m.varInfo.layerOpacity);
  // Add to map
  // c.map.layers().set(1, variableMean_layer); 
  c.map.layers().set(1, stressScore_layer); 
  // c.map.layers().set(1, roi_layer); // add ROI layer on top
  // Add legend! stress score. Need to explicitly set the SLD intervals for colour ramp.
  c.map.add(c.legend.panel);
})
}
// Draw chart on button press
c.chartVar.selector.onChange(drawChart);
// ======================= DOWNLOAD DATA ======================= //
// Refresh URLs
function updateLabel(url) {
  c.download.label.setValue(url);
  c.download.label.setUrl(url);
  c.download.button.setLabel('Download full RESET data');
}
// Get download URL
function getDownloads() {
  c.download.button.setLabel('Loading...');
  // Get variables
  var stress_SST = calcStressSST()
  var stress_SSTanom = calcStressSSTanom()
  var stress_SSTvar = calcStressSSTvar()
  var stress_DHW = calcStressDHW()
  var stress_depth = calcStressDepth()
  var stress_sal = calcStressSal()
  var stress_wind = calcStressWind()
  var stress_curr = calcStressCurr()
  var stress_cloud = calcStressCloud()
  // Merge and reduce
  var imcol_merge = ee.FeatureCollection([stress_SST, stress_SSTanom, stress_SSTvar,
                                          stress_DHW, //**NOTE: Slow
                                          stress_depth, stress_sal, stress_wind, stress_curr, stress_cloud
                                          ])
                                          .flatten()
  // Reduce imagecollection
  var reduced_imcol = imcol_merge.map(function(img) {
    var roi = c.map.layers().get(0).getEeObject().geometry()
    // Get image properties
    var variable = img.get('variable')
    var label = img.get('label')
    var reliability = img.get('reliability')
    var date = ee.Date(img.get('system:time_start'))
    var reduced_img = ee.Image(img).reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: roi,
    scale: 30
    })
    return ee.Feature(null, reduced_img)
      // Set properties
      .set('variable', variable)
      .set('label', label)
      .set('reliability', reliability)
      .set('date', date) 
  })
  reduced_imcol.getDownloadURL(
    'csv',                                    //** NOTE: EVALUATE ftC, as running it twice.
    undefined,
    'RESET_.csv' + c.selectDateStep.startBox.getValue() + '_' + c.selectDateStep.endBox.getValue(),
    updateLabel
    );
}
// Download chart data on button click
c.download.button.onClick(getDownloads);
/*******************************************************************************
 * Initialize * 
 *
 * A section to initialize the app state on load.
 * 
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/ 
 // Default ROI (to stop errors)
 var roi = ee.Geometry.Point([71.7620, -5.2479]).buffer(c.selectRadius.slider.getValue())
 // Add default ROI to map
  var roi_layer = ui.Map.Layer(roi, {palette: ['FF08ED']}, 'ROI');
  c.map.layers().set(0, roi_layer);