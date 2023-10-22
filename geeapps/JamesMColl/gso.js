/*    \__    __/
      /_/ /\ \_\        ╔═╗┬  ┌─┐┌┐ ┌─┐┬                         __    __
     __ \ \/ / __       ║ ╦│  │ │├┴┐├─┤│                        /_/ /\ \_\
     \_\_\/\/_/_/       ╚═╝┴─┘└─┘└─┘┴ ┴┴─┘                     __ \ \/ / __
 __/\___\_\/_/___/\__   ╔═╗┌┐┌┌─┐┬ ┬                           \_\_\/\/_/_/
   \/ __/_/\_\__ \/     ╚═╗││││ ││││                         /\___\_\/_/___/\
     /_/ /\/\ \_\       ╚═╝┘└┘└─┘└┴┘                         \/ __/_/\_\__ \/
      __/ /\ \__        ╔═╗┌┐ ┌─┐┌─┐┬─┐┬  ┬┌─┐┌┬┐┌─┐┬─┐┬ ┬     /_/ /\/\ \_\
      \_\ \/ /_/        ║ ║├┴┐└─┐├┤ ├┬┘└┐┌┘├─┤ │ │ │├┬┘└┬┘      __/ /\ \__
      /        \        ╚═╝└─┘└─┘└─┘┴└─ └┘ ┴ ┴ ┴ └─┘┴└─ ┴       \_\ \/ /_/
     _______..__   __.   ______   ____    __    ____     _______ ___   ___ .______    __        ______   .______       _______ .______         ____    ____      ___        ____   
    /       ||  \ |  |  /  __  \  \   \  /  \  /   /    |   ____|\  \ /  / |   _  \  |  |      /  __  \  |   _  \     |   ____||   _  \        \   \  /   /     / _ \      |___ \  
   |   (----`|   \|  | |  |  |  |  \   \/    \/   /     |  |__    \  V  /  |  |_)  | |  |     |  |  |  | |  |_)  |    |  |__   |  |_)  |        \   \/   /     | | | |       __) | 
    \   \    |  . `  | |  |  |  |   \            /      |   __|    >   <   |   ___/  |  |     |  |  |  | |      /     |   __|  |      /          \      /      | | | |      |__ <  
.----)   |   |  |\   | |  `--'  |    \    /\    /       |  |____  /  .  \  |  |      |  `----.|  `--'  | |  |\  \----.|  |____ |  |\  \----.      \    /       | |_| |  __  ___) | 
|_______/    |__| \__|  \______/      \__/  \__/        |_______|/__/ \__\ | _|      |_______| \______/  | _| `._____||_______|| _| `._____|       \__/         \___/  (__)|____/  
About GSO:SE
This app is designed to be a self contained portal, able to be run by anyone without the neet to look at any code.  If you are this user, simply
click the run button in the blue panel above, and then grab the panel anchor below and drag this out of the way of the map.  From that point on
you may use the UI to enter in desired parameters, and explor the world of water.  See some of the helpful tips below.  THERE IS NO ERROR CHECKING!
1) Dates must always be in yyyy-mm-dd 
2) Use the cloud filter, but make sure to check the lables if no image shows up.  
3) The timestep filter is only relevent when in splitscreen mode, in which case it is how far from the start date (in months) to look forward in time
4) If you want to share a link with someone else, you must first save the spot that you are looking at.  In the console, a print statement labled "MapCenter:"
   will print out the center of your current map.  Copy and paste the printout into the app.CENTER_DEFAULT defined just after this introduction.  Then, click
   the "Get Link" Button above, and you can now share your findings with the URL that it generates
Modes: 
1) Image viewer - View images of Sens slope, the maximum gap, and other snow cover properties
2) Sensor View Angle - See how the sensor view angle (and the respective snow cover) looked on a given day, and examine the effects of limiting the sensor
 view angle on the potential numbr of observations
3) Compaire - See how the fractional threshold changes the snow cover for MODIS Aqua, Terra, and a combination of the two
  *  ----- Data Documentation -----
  *  MOD10: http://nsidc.org/data/docs/daac/modis_v5/mod10a1_modis_terra_snow_daily_global_500m_grid.gd.html
Feel free to modify this code to suit your needs, or email me at jcoll@ku.edu and I can try and answer your questions or add additional features.  For those
of you interested in how this works, feel free to read through the code, and remember to use the arrows next to the numbers to collapse functions 
for an easier read.  Stay tuned for more...
----- Acknowledgments -----
Thanks to Google for creating such a fantastic platform on which I can do this kind of stuff on, and to my advisor, Dr. Xingong Li for providing the opportunity to explore this approch.
Credit and helpful links
http://patorjk.com/software/taag/#p=display&h=0&f=Ivrit&t=Global%0ASnow%0AObservatory   ASCII Art generator
http://www.strangeplanet.fr/work/gradient-generator/index.php
\*****************************************************************************************************************************************************************/
// The namespace for our application.  All the state is kept in here.
var app = {};
// Set desired visuals here, follow the template, no error checking exists.
app.CENTER_DEFAULT = {lat: 44.39757883402266, lon: -68.27041778564453, zoom: 11};
app.MODE_STATE = app.DATAVIEW;                                                         //  Chose from [app.DATAVIEW / app.SENSORANGLE / app.COMPARE]
var DATAVIEW_STATE = app.F_MOD;                                                         //  Chose from [app.DATAVIEW / app.SENSORANGLE / app.COMPARE]
//  _______       ___      .__   __.   _______  _______ .______          ________    ______   .__   __.  _______ 
// |       \     /   \     |  \ |  |  /  _____||   ____||   _  \        |       /   /  __  \  |  \ |  | |   ____|
// |  .--.  |   /  ^  \    |   \|  | |  |  __  |  |__   |  |_)  |       `---/  /   |  |  |  | |   \|  | |  |__   
// |  |  |  |  /  /_\  \   |  . `  | |  | |_ | |   __|  |      /           /  /    |  |  |  | |  . `  | |   __|  
// |  '--'  | /  _____  \  |  |\   | |  |__| | |  |____ |  |\  \----.     /  /----.|  `--'  | |  |\   | |  |____ 
// |_______/ /__/     \__\ |__| \__|  \______| |_______|| _| `._____|    /________| \______/  |__| \__| |_______|
// Edit below this line at your own risk, well, as risky as coding can be...
/** Creates the UI panels. */
app.createPanels = function() {
  /* MODE SELECTION FILTERS */
  app.masterFilters = {
    modeSelect: ui.Select({items: [app.DATAVIEW, app.COMPARE, app.SENSORANGLE, ], value: app.MODE_STATE, onChange: app.modeFilter}),
    loadingLabel: ui.Label({value: 'Awaiting user input...', style: {stretch: 'vertical', color: 'gray', shown: true}}),
  };
  /* INTRODUCTION PANEL */
  app.intro = {
    panel: ui.Panel([
      ui.Label({value: 'Global Snow Observatory', 
                style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}}),
      ui.Label('Go forth and find the snow'),
      ui.Panel([ui.Label('App Mode:', app.HELP_TEXT_STYLE), app.masterFilters.modeSelect], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.masterFilters.loadingLabel], ui.Panel.Layout.flow('horizontal')), 
    ])
  };
  /* init Label */
  app.init = {
    initLable: ui.Label('Welcome to the Global Snow Observatory    additional documentation coming soon     NOTE: Use of MRVO will take time to load, please be patient', {
      stretch: 'horizontal',
      textAlign: 'center',
      backgroundColor: '#d3d3d3'
    })
  }; 
  /* init PANEL */
  app.init.panel = ui.Panel({
    widgets: [app.init.initLable],
    style: {
      position: 'top-center',
      height: '700px',
      width: '300px',
    }
  });
  /* FILTERS for SENSORANGLE */
  app.SENSORANGLE_Filters = {
    //Controls
    viewDate: ui.Textbox({placeholder:'YYYY-MM-DD', value: app.FIRST_DATE, onChange: app.applyEXPLOREFilters}),
    fractSlider: ui.Slider({min: 0, max: 100, value: app.FRACT_THRESH, step: 1, onChange: app.applyEXPLOREFilters, style: {stretch: 'horizontal'}}),
    sensorSlider: ui.Slider({min: 0, max: 66, value: app.SENSOR_THRESH, step: 1, onChange: app.applyEXPLOREFilters, style: {stretch: 'horizontal'}}),
    //Labels
    loadingLabel: ui.Label({value: 'Loading...', style: {stretch: 'vertical', color: 'gray', shown: false}}),
    lon: ui.Label({value: app.LON_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    lat: ui.Label({value: app.LAT_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    outputValue: ui.Label({value: 'Number of Scenes: ', style: {stretch: 'vertical', color: 'gray', shown: true}})
  };
  /* SENSORANGLE FILTERS PANEL */
  app.SENSORANGLE_Filters.panel = ui.Panel({
    widgets: [
      ui.Label('Sensor View Angle Explorer', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Date:', app.HELP_TEXT_STYLE), app.SENSORANGLE_Filters.viewDate], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('sensorSlider filter:', app.HELP_TEXT_STYLE), app.SENSORANGLE_Filters.sensorSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('fractSlider filter:', app.HELP_TEXT_STYLE), app.SENSORANGLE_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.SENSORANGLE_Filters.lon, app.SENSORANGLE_Filters.lat], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.SENSORANGLE_Filters.outputValue], ui.Panel.Layout.flow('horizontal'))//,
      //ui.Panel([ui.Label('Image to view:', app.HELP_TEXT_STYLE), app.EXPLORE_Filters.collectionSlider], ui.Panel.Layout.flow('horizontal')) 
    ],
    style: app.SECTION_STYLE
  });
  /* FILTERS for DATAVIEW */
  app.DATAVIEW_Filters = {
    //Controls
    yearSlider: ui.Slider({min: 2000, max: 2016, value: app.YEAR_START, step: 1, onChange: app.modeFilter, style: {stretch: 'horizontal'}}),    
    monthSlider: ui.Slider({min: 1, max: 12, value: app.MONTH_START, step: 1, onChange: app.modeFilter, style: {stretch: 'horizontal'}}), 
    fractSlider: ui.Slider({min: 1, max: 100, value: app.FRACT_START, step: 1, onChange: app.modeFilter, style: {stretch: 'horizontal', shown: app.FRACT_USE}}), 
    mrcoSlider: ui.Slider({min: 0, max: 20, value: app.MRCO_START, step: 1, onChange: app.modeFilter, style: {stretch: 'horizontal'}}),  
    selectCollection: ui.Select({items: [app.F_MOD, app.MOD_S, app.F_MYD, app.MYD_S, app.MOD_C, app.MYD_C], value: app.COLLECTION_START, onChange: app.modeFilter}),
    T_DATE: ui.Textbox({placeholder:'YYYY-MM-DD', value: app.D_DATE, onChange: app.modeFilter}),
    selectDisplay: ui.Select({items: [app.YEAR_SCF, app.MONTH_SCF, app.SENS_Y, app.SENS_M, app.SIG_Y, app.SIG_M, app.MAX_GAP, app.POLAR, app.MEAN_SCF], value: app.DISPLAY_SELECT, onChange: app.modeFilter}),
    noiseFilter: ui.Checkbox({label: 'Mask out low snow areas', value: app.NSUPPRESS_STATE, onChange: app.modeFilter}),
    waterFilter: ui.Checkbox({label: 'Mask out water', value: app.WSUPPRESS_STATE, onChange: app.modeFilter}),
    //Labels
    loadingLabel: ui.Label({value: 'Loading...', style: {stretch: 'vertical', color: 'gray', shown: false}}),
    lon: ui.Label({value: app.LON_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    lat: ui.Label({value: app.LAT_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    outputValue: ui.Label({value: 'Number of Scenes: ', style: {stretch: 'vertical', color: 'gray', shown: true}})
  };
  /* DATAVIEW FILTERS PANEL */
  app.DATAVIEW_Filters.stockPanel = ui.Panel({
    widgets: [
      ui.Label('Set Filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Pick a collection:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectCollection], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Pick a property to view', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectDisplay], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fractional Threshold:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('MRVO Window Size:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.mrcoSlider], ui.Panel.Layout.flow('horizontal')),
      app.DATAVIEW_Filters.noiseFilter, app.DATAVIEW_Filters.waterFilter,
    ],
    style: app.SECTION_STYLE
  });
  /* DATAVIEW FILTERS YEAR PANEL */
  app.DATAVIEW_Filters.yearPanel = ui.Panel({
    widgets: [
      ui.Label('Set Filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Pick a collection:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectCollection], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Pick a property to view', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectDisplay], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Year to view:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.yearSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fractional Threshold:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('MRVO Window Size:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.mrcoSlider], ui.Panel.Layout.flow('horizontal')),
      app.DATAVIEW_Filters.noiseFilter, app.DATAVIEW_Filters.waterFilter,
    ],
    style: app.SECTION_STYLE
  });
  /* DATAVIEW FILTERS YEAR PANEL */
  app.DATAVIEW_Filters.M_Y_Panel = ui.Panel({
    widgets: [
      ui.Label('Set Filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Pick a collection:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectCollection], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Pick a property to view', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectDisplay], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Year to view:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.yearSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Month to view:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.monthSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fractional Threshold:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('MRVO Window Size:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.mrcoSlider], ui.Panel.Layout.flow('horizontal')),
      app.DATAVIEW_Filters.noiseFilter, app.DATAVIEW_Filters.waterFilter,
    ],
    style: app.SECTION_STYLE
  });
  /* DATAVIEW FILTERS YEAR PANEL */
  app.DATAVIEW_Filters.monthPanel = ui.Panel({
    widgets: [
      ui.Label('Set Filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Pick a collection:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectCollection], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Pick a property to view', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.selectDisplay], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Month to view:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.monthSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fractional Threshold:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('MRVO Window Size:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.mrcoSlider], ui.Panel.Layout.flow('horizontal')),
      app.DATAVIEW_Filters.noiseFilter, app.DATAVIEW_Filters.waterFilter,
    ],
    style: app.SECTION_STYLE
  });
  /* FILTERS for COMPARE */
  app.COMPARE_Filters = {
    //Controls
    windowCount: ui.Slider({min: 1, max: 4, value: app.WINDOW_COUNT, step: 1, onChange: app.applyEXPLOREFilters, style: {stretch: 'horizontal'}}),
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: app.MAPCENTER_STATE, onChange: app.applyEXPLOREFilters}),
    startDate: ui.Textbox({placeholder:'YYYY-MM-DD', value: app.FIRST_DATE, onChange: app.applyEXPLOREFilters}),
    stopDate: ui.Textbox({placeholder:'YYYY-MM-DD', value: app.SECOND_DATE, onChange: app.applyEXPLOREFilters}),
    cloudSlider: ui.Slider({min: 0, max: 100, value: app.CLOUD_SCORE, step: 1, onChange: app.applyEXPLOREFilters, style: {stretch: 'horizontal'}}),
    collectionSlider: ui.Textbox({placeholder:'#', value: 1, onChange: app.applyEXPLOREFilters}),
    //Labels
    loadingLabel: ui.Label({value: 'Loading...', style: {stretch: 'vertical', color: 'gray', shown: false}}),
    lon: ui.Label({value: app.LON_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    lat: ui.Label({value: app.LAT_VALUE, style: {stretch: 'vertical', color: 'gray', shown: true}}),
    outputValue: ui.Label({value: 'Number of Scenes: ', style: {stretch: 'vertical', color: 'gray', shown: true}})
  };
  /* COMPARE FILTERS PANEL */
  app.COMPARE_Filters.panel = ui.Panel({
    widgets: [
      ui.Label('Set Filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Start Date:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.T_DATE], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Stop Date:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.yearSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Cloud filter:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.fractSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Number of map windows:', app.HELP_TEXT_STYLE), app.DATAVIEW_Filters.monthSlider], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.DATAVIEW_Filters.lon, app.DATAVIEW_Filters.lat], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([app.DATAVIEW_Filters.outputValue], ui.Panel.Layout.flow('horizontal'))//,
      //ui.Panel([ui.Label('Image to view:', app.HELP_TEXT_STYLE), app.EXPLORE_Filters.collectionSlider], ui.Panel.Layout.flow('horizontal')) 
    ],
    style: app.SECTION_STYLE
  });
};
/** Creates the app helper functions. 
                          .sS$$$$$$$$$$$$$Ss.
                        .sS$$$$$$$$$$$$$$$$$Ss.
                       .$$.$$$$$$$$$$$$$$$$$$$$s.
                      .$$$:$$$$$$$$$$$$$$$$$$$$$$Ss.
                    .$$$.'$$$$$$$$;~' `~~~~~~C$$$$$$s.
                  .$'$$:$$$$$$$$"'            `"$$$$$S.
               .S$$:$$:$$$$$$$'             _    `$$$$$s.
             .S$$:$$:$$$$$£$$'        __--~~  _    $$$$$$.
            .$$$$:$$:$$$$$$$'     _.-~    _.-~     `$$$$$$$.
          .$$$$$:$$:$$$$$$$'    -~    _.-~           `$$$$$$.
         .$$$$:$$:$$$$$$$$'    _.--~         ..s$$$$S.$$$$$$$s.
        .$$$$$:$$$:$$$$$$$     _..._        .$$$SSSSSS$$$$$$$$$.
       .$$$$$:$$$$:$$$$$$$    ~.sggg.        "  .~(g )$$$$$$$$$$.
       $$$$$:$$$$$:$$$$$$$ .sS$$$$$$$$s.     : '"--"' `$$$$$$$$$$.
       `$$$:$$$$$$:$$$$$$$.$$" .. g"-. `.    `.-.._    `$$$$$$$$$$
        $$$:$$$$$$:$$$$$$$`$' ' `._.'   :      `---      $$$$$$$$$.
        $$$:.$$$$$:$$$$$$$    `---'  _.'                 $$$$$$$$$$$.
        $$$$$:$$$$:$$$$$$s      ----"           .        $$$$$$$$$$$$.
        $$$$$`.$$$:$$$$$$$.                      `-._   .$$$$$$$$$$$$$$Sss.
        $$$$$$`;$$:$$$$$$$$.         _.:         .'   ;  $$$$$$$$$$$$$$$$$$$.
       .s$$$$$$'$$`.$$$$$$$$.      .'  `.       ' _ .`.  $$$$$$$$$$$$$$$$$$$$Ss.
     .s$$$$$$$$$$$$:$$$$$$$$$     :  _   ~~-...'.'.'  :  $$$$$$$$$$$$$$$$$$$$$$$
   .s$$$$$$$$$$$$$$`.$$$$$$$$s      : .~-,-.-.~:'.'   :  $$$$$$$$$$$$$$$$$$$$$$
 .s$$$$$$$$$$$$$$$$$`$$$$$$$$$$.    `  ~-.`"""'.'      `.$$$$$$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$S.   .      `""'        $$$$$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$S. `.                 $$$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Ss.`.              .$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Ss.          .s$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Ss......sS$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'
 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'**/
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.setValue('Updating UI State');
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.filters.yearSlider
      // app.vis.visSelect,
      // app.filters.firstDate,
      // app.filters.secondDate,
      // app.filters.applyButton,
      // app.filters.mapCenter,
      // app.picker.select,
      // app.picker.centerButton,
      // app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
    app.filters.loadingLabel.setValue('UI State Updated');
  };
  /** Prepare the collection  **/
  app.modeFilter = function() {
    ui.root.clear();
    app.YEAR_START = app.DATAVIEW_Filters.yearSlider.getValue();
    app.MONTH_START = app.DATAVIEW_Filters.monthSlider.getValue();
    app.FRACT_START = app.DATAVIEW_Filters.fractSlider.getValue();
    app.MRCO_START = app.DATAVIEW_Filters.mrcoSlider.getValue(); 
    app.D_DATE = app.DATAVIEW_Filters.T_DATE.getValue();
    app.COLLECTION_START = app.DATAVIEW_Filters.selectCollection.getValue();
    app.DISPLAY_VIEW = app.DATAVIEW_Filters.selectDisplay.getValue();
    app.NSUPPRESS_STATE = app.DATAVIEW_Filters.noiseFilter.getValue();
    app.WSUPPRESS_STATE = app.DATAVIEW_Filters.waterFilter.getValue();
    app.MODE_STATE = app.masterFilters.modeSelect.getValue();
    app.DISPLAY_SELECT = app.DATAVIEW_Filters.selectDisplay.getValue(); 
    app.FRACT_DATA =  app.DATAVIEW_Filters.selectCollection.getValue();
    if(app.COLLECTION_START == app.F_MOD || app.COLLECTION_START == app.F_MYD) {app.FRACT_USE = true;} else {app.FRACT_USE = false;}
    app.createPanels();
    var mapWindow;
    var main = ui.Panel({widgets: [app.intro.panel], style: {width: '330px', padding: '8px'}});
    ui.root.insert(0, main);
    ui.root.insert(1,app.init.panel);
    if(app.MODE_STATE == app.DATAVIEW) {
      if(app.DISPLAY_VIEW == app.YEAR_SCF) {main.add(app.DATAVIEW_Filters.yearPanel);}      
        else if(app.DISPLAY_VIEW == app.MONTH_SCF) {main.add(app.DATAVIEW_Filters.M_Y_Panel);}  
        else if(app.DISPLAY_VIEW == app.SIG_M || app.DISPLAY_VIEW == app.SENS_M) {main.add(app.DATAVIEW_Filters.monthPanel);}  
        else {main.add(app.DATAVIEW_Filters.stockPanel);} 
      app.applyDATAVIEWFilters();
      app.masterFilters.loadingLabel.setValue('Loaded App');
    } else if (app.MODE_STATE == app.SENSORANGLE) {
      main.add(app.VIEW_Filters.panel);
      app.applySENSORANGLEFilters();
      app.masterFilters.loadingLabel.setValue('Loaded');
    } else if (app.MODE_STATE == app.COMPARE) {
      main.add(app.ANALYSE_Filters.panel);
      app.applyANALYSEFilters();
      app.masterFilters.loadingLabel.setValue('Loaded');
    }
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applySENSORANGLEFilters = function() {
    print('applyANALYSEFilters hit');
    app.masterFilters.loadingLabel.style().set('shown', true);
    app.setLoadingMode(true);
    var firstDateValue = app.ANALYSE_Filters.startDate.getValue();
    var secondDateValue = app.ANALYSE_Filters.stopDate.getValue();
    var cloudSliderState = app.ANALYSE_Filters.cloudSlider.getValue();
    var mapCenterState = app.ANALYSE_Filters.mapCenter.getValue();
    var segmentationState = app.ANALYSE_Filters.segmentationT.getValue();
    var collectionElementSelect = app.ANALYSE_Filters.collectionSlider.getValue();
    var collectionID = app.masterFilters.collectionSelect.getValue();
    var maps = [];
    var maps2 = [];
    var countList = [];
    var collectionList = [];
    var i, count1, count2, collection1, collection2, collection, filteredCollection, timePeriod1, timePeriod2, filterCenter, mapCenter, mapGrid, mapGrid2;
    if (existingMap) {
      var geoJson = existingMap.getCenter().toGeoJSON();
      app.CENTER_DEFAULT = [geoJson.coordinates[0], geoJson.coordinates[1], 13];
      filterCenter = ee.List([geoJson.coordinates[0], geoJson.coordinates[1]]);
      mapCenter = {lon: geoJson.coordinates[0], lat: geoJson.coordinates[1], zoom: existingMap.getZoom()};
      print('Map view value, copy this output into the app.CENTER_DEFAULT variable (line 36)', mapCenter);
      app.EXPLORE_Filters.lon.setValue('Lat: ' + geoJson.coordinates[0].toFixed(2));
      app.EXPLORE_Filters.lat.setValue('Lat: ' + geoJson.coordinates[1].toFixed(2));
    } else {
      filterCenter = [app.CENTER_DEFAULT.lon, app.CENTER_DEFAULT.lat];
      mapCenter = {lon: app.CENTER_DEFAULT.lon, lat: app.CENTER_DEFAULT.lat, zoom: app.CENTER_DEFAULT.zoom};
      app.EXPLORE_Filters.lon.setValue('Lat: ' + app.CENTER_DEFAULT.lon.toFixed(2));
      app.EXPLORE_Filters.lat.setValue('Lat: ' + app.CENTER_DEFAULT.lat.toFixed(2));
    }
    if (mapCenterState) {
      filteredCollection = ee.ImageCollection(collectionID).filterBounds(ee.Geometry.Point(filterCenter));
    } else {
      filteredCollection = ee.ImageCollection(collectionID).filterBounds(existingMap.getBounds(true));
    }
    print('Collection preprocessing, an empty collection means no images were found within the bounds: ', filteredCollection);
    // Set filter variables.
    //app.filters.loadingLabel.setValue('Parse Request');
    //app.filters.loadingLabel.setValue('Exploring Landsat');
    timePeriod1 = ee.ImageCollection(filteredCollection)
                    .filterDate(firstDateValue, secondDateValue)
                    .filterMetadata('CLOUD_COVER', 'less_than', cloudSliderState)
                    .limit(app.IMAGE_COUNT_LIMIT, 'CLOUD_COVER')
                    .sort('CLOUD_COVER')
                    .limit(app.IMAGE_COUNT_LIMIT, 'CLOUD_COVER')
                    .sort('CLOUD_COVER')   //CLOUDY_PIXEL_PERCENTAGE
                    .map(app.dataPrep);
    //https://groups.google.com/forum/#!searchin/google-earth-engine-developers/sort%7Csort:relevance/google-earth-engine-developers/q6aeA0590ig/CG_jDXlVBwAJ
    //app.filters.loadingLabel.setValue('Data gathered, collecting Label Info');
    //app.LIST_LENGTH_MAX = timePeriod1.size().getInfo();
    //app.ANALYSE_Filters.outputValue.setValue('Number of Scenes: ' + app.LIST_LENGTH_MAX);
    //app.filters.loadingLabel.setValue('Pushing data');
    // collectionList.push(timePeriod1);
    //app.filters.loadingLabel.setValue('Data collected'); 
    // print('Post filter collections: ', collectionList);
    // print('Post filter collections: ', countList);
    //app.filters.loadingLabel.setValue('Creating Maps'); 
    // Create a map for each visualization option.
    ui.root.widgets().set(1, ui.Map());
    var main = ui.root.widgets().get(0);
    var selectedImage =  ee.Image(timePeriod1.toList(1, ee.Number(collectionElementSelect-1)).get(0)).select('MNDWI');
    // Create a map for each visualization option.
    for (i = 0; i < 1; i++) {
      var map = ui.Map();
      map.add(ui.Label(app.vis.visSelect.items().get(3)));
      //print('Vis parames', app.VIS_OPTIONS[app.vis.visSelect.items().get(i)]);
      var visOption = app.VIS_OPTIONS[app.vis.visSelect.items().get(3)];
      //map.addLayer(ee.Image(timePeriod1.toList(1, ee.Number(collectionElementSelect-1)).get(0)), visOption.visParams, app.vis.visSelect.items().get(i));
      map.addLayer(selectedImage, visOption.visParams, app.vis.visSelect.items().get(3));
      map.addLayer(selectedImage.mask(selectedImage.gt(ee.Image.constant(segmentationState))), {palette: ['FF0000']}, 'Classified Water');
      map.addLayer(geometry);
      maps.push(map);
    }
    maps[0].setCenter(mapCenter);
    existingMap = maps[0];
    //app.filters.loadingLabel.setValue('Linking maps'); 
    var linker = ui.Map.Linker(maps);
    //app.filters.loadingLabel.setValue('Calculating edge length'); 
    var edgeLength = Math.ceil(Math.sqrt(1));
    var grid = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal'), style: {stretch: 'both'}});
    //app.filters.loadingLabel.setValue('Creating map panels'); 
    var index = 0;
    for (var c = 0; c < edgeLength; c++) {
      if (c * edgeLength < 1) {
        var col = ui.Panel({style: {stretch: 'both'}});
        for (var r = 0; r < edgeLength; r++) {
          var map = maps[c * edgeLength + r];
          if (map) col.add(map);
        }
        grid.add(col);
      }
      //app.filters.loadingLabel.setValue('Setting ui'); 
      ui.root.widgets().set(1, grid);
    }    
    //enable to see geometry
    // var grid2 = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal'), style: {stretch: 'both'}});
    // grid2.add(Map.addLayer(selectedImage.geometry()));
    // ui.root.widgets().set(2, grid2)
    var mndwiChart = ui.Chart.image.series({imageCollection: ee.ImageCollection(timePeriod1).map(app.maskWater).select('area'), 
                                            region: geometry, 
                                            reducer: ee.Reducer.sum() /*.multiply(ee.Image.pixelArea())*/, 
                                            scale: 500});   //Ideally pixel area, but how?
    mndwiChart.setOptions({
      title: 'Water Surface Area Over Time',
      vAxis: {title: 'Water Surface Area in SqMeters'},
      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    });
    main.add(mndwiChart);
    app.setLoadingMode(false);
    app.masterFilters.loadingLabel.style().set('shown', false);
    print('applyANALYSEFilters complete');
  };  // End of app.applySENSORANGLEFilters
  /** Applies the selection filters currently selected in the UI. */
  app.applyDATAVIEWFilters = function() {
    // app.masterFilters.loadingLabel.style().set('shown', true);
    // app.setLoadingMode(true);
    var yearSliderState = app.DATAVIEW_Filters.yearSlider.getValue();
    var monthSliderState = app.DATAVIEW_Filters.monthSlider.getValue();
    var fractSliderState = app.DATAVIEW_Filters.fractSlider.getValue();
    var mrcoSliderState = app.DATAVIEW_Filters.mrcoSlider.getValue();
    var selectCollectionState = app.DATAVIEW_Filters.selectCollection.getValue();
    var T_DATEState = app.DATAVIEW_Filters.T_DATE.getValue();
    var selectDisplayState = app.DATAVIEW_Filters.selectDisplay.getValue();
    var noiseFilterState = app.DATAVIEW_Filters.noiseFilter.getValue();
    var waterFilterState = app.DATAVIEW_Filters.waterFilter.getValue();
    var maps = [];
    var maps2 = [];
    var countList = [];
    var collectionList = [];
    var i, count1, count2, collection1, collection2, collection, filteredCollection, timePeriod1, timePeriod2, filterCenter, mapCenter, mapGrid, mapGrid2;
    if (existingMap) {
      var geoJson = existingMap.getCenter().toGeoJSON();
      app.CENTER_DEFAULT = [geoJson.coordinates[0], geoJson.coordinates[1], 13];
      filterCenter = ee.List([geoJson.coordinates[0], geoJson.coordinates[1]]);
      mapCenter = {lon: geoJson.coordinates[0], lat: geoJson.coordinates[1], zoom: existingMap.getZoom()};
      print('Map view value, copy this output into the app.CENTER_DEFAULT variable (line 36)', mapCenter);
      app.DATAVIEW_Filters.lon.setValue('Lat: ' + geoJson.coordinates[0].toFixed(2));
      app.DATAVIEW_Filters.lat.setValue('Lat: ' + geoJson.coordinates[1].toFixed(2));
    } else {
      filterCenter = [app.CENTER_DEFAULT.lon, app.CENTER_DEFAULT.lat];
      mapCenter = {lon: app.CENTER_DEFAULT.lon, lat: app.CENTER_DEFAULT.lat, zoom: app.CENTER_DEFAULT.zoom};
      app.DATAVIEW_Filters.lon.setValue('Lat: ' + app.CENTER_DEFAULT.lon.toFixed(2));
      app.DATAVIEW_Filters.lat.setValue('Lat: ' + app.CENTER_DEFAULT.lat.toFixed(2));
    }
    // Set filter variables.
    //app.filters.loadingLabel.setValue('Parse Request');
    var holdImage, displayImage, holdCollection, finalCollection, imgVis;
    if(selectCollectionState == app.F_MOD) {
      holdCollection = app.GenerateSnowCoverDataset('MODIS/MOD10A1', fractSliderState);
    } else if(selectCollectionState == app.MOD_S) {
      holdCollection = app.GenerateMODISGappedDataset('MODIS/MOD10A1', [100, 200], [25, 37, 39]);
    } else if(selectCollectionState == app.MOD_C) {
      holdCollection = app.GenerateMODISGappedDataset('MODIS/MOD10A1', [50], [100, 200, 25, 37, 39]);
    } else if(selectCollectionState == app.F_MYD) {
      holdCollection = app.GenerateSnowCoverDataset('MODIS/MYD10A1', fractSliderState);
    } else if(selectCollectionState == app.MYD_S) {
      holdCollection = app.GenerateMODISGappedDataset('MODIS/MYD10A1', [100, 200], [25, 37, 39]);
    } else if(selectCollectionState == app.MYD_C) {
      holdCollection = app.GenerateMODISGappedDataset('MODIS/MYD10A1', [50], [100, 200, 25, 37, 39]);
    }
    if(mrcoSliderState > 0) {
      finalCollection = app.mrcoFilter(holdCollection, mrcoSliderState);
    } else {
      finalCollection = ee.ImageCollection(holdCollection).map(function(image) {
        var CodedBits = ee.Image(image).remap([3,7],
                                              [0,1],
                                              null,
                                              'Snow_Cover_Daily_Tile');
                                          return CodedBits;
                                                 })
                                        .select(['remapped'], ['Snow_Cover_Daily_Tile']);
    }
    var sensVis = {min:-0.03, max:0.03, palette:app.BlueToBrown};
    var scfVis = {min:0, max:1, palette:app.BlueToRed};
    var kendallVis = {min:-42, max:42, palette:app.BlueToBrown};
    if(selectDisplayState == app.SENS_Y) {
      holdImage = app.GenerateMODISFrequency(finalCollection.select('Snow_Cover_Daily_Tile'), '2000-10-01', '2001-10-01', 16);
      displayImage = holdImage.reduce(ee.Reducer.sensSlope()).select('slope');
      imgVis = sensVis;
    } else if(selectDisplayState == app.SIG_Y) {
      holdImage = app.GenerateMODISFrequency(finalCollection.select('Snow_Cover_Daily_Tile'), '2000-10-01', '2001-10-01', 16);
      displayImage = holdImage.reduce(ee.Reducer.kendallsCorrelation(2)).select('slope');
      imgVis = kendallVis;
    } else if(selectDisplayState == app.SIG_M) {
      holdImage = app.GenerateMODISFrequency(finalCollection.select('Snow_Cover_Daily_Tile'), ee.Date.fromYMD(2001, monthSliderState, 1), ee.Date.fromYMD(2001, monthSliderState, 1).advance(1, 'month'), 15);
      displayImage = holdImage.reduce(ee.Reducer.kendallsCorrelation(2)).select('slope');
      imgVis = kendallVis;
    } else if(selectDisplayState == app.SENS_M) {
      holdImage = app.GenerateMODISFrequency(finalCollection.select('Snow_Cover_Daily_Tile'), ee.Date.fromYMD(2001, monthSliderState, 1), ee.Date.fromYMD(2001, monthSliderState, 1).advance(1, 'month'), 15);
      displayImage = holdImage.reduce(ee.Reducer.sensSlope()).select('slope');
      imgVis = sensVis;
    } else if(selectDisplayState == app.POLAR) {
      holdCollection = app.GenerateMODISGappedDataset('MODIS/MOD10A1', [11], [25, 37, 39, 100, 200]);
      var tempCollection = app.GenerateMODISFrequency(holdCollection, '2000-10-01', '2001-10-01', 16);
      displayImage = tempCollection.select('Snow_Cover_Daily_Tile').mean();
      imgVis = {min:0, max:60, palette:app.RedToBlue};
    } else if(selectDisplayState == app.MAX_GAP) {
      holdImage = app.mrcoFilter(holdCollection, 40);
      displayImage = finalCollection.select('MRVO_Days').max();
      imgVis = {min:0, max:14, palette:['0000FF', '0071FF', '00E2FF', '00FFA9', '38FF00', 'AAFF00', 'FFE200', 'FF7100', 'FF0000']};
    } else if(selectDisplayState == app.YEAR_SCF) {
      holdImage = finalCollection.filterDate(ee.Date.fromYMD(yearSliderState, 10, 1), ee.Date.fromYMD(yearSliderState, 10, 1).advance(1, 'year'));
      displayImage = holdImage.sum().toFloat().divide(holdImage.count());   
      imgVis = scfVis;
    } else if(selectDisplayState == app.MONTH_SCF) {
      holdImage = finalCollection.filterDate(ee.Date.fromYMD(yearSliderState, monthSliderState, 1), ee.Date.fromYMD(yearSliderState, monthSliderState, 1).advance(1, 'month'));
      displayImage = holdImage.sum().toFloat().divide(holdImage.count());
      imgVis = scfVis;
    } else if(selectDisplayState == app.MEAN_SCF) {
      holdImage = app.GenerateMODISFrequency(finalCollection.select('Snow_Cover_Daily_Tile'), '2000-10-01', '2001-10-01', 16);
      displayImage = holdImage.select('Snow Cover Frequency').mean();
      imgVis = {min:0, max:60, palette:app.RedToBlue};
    }
    var map = ui.Map();
    map.setCenter(mapCenter);
    existingMap = map;
    if(noiseFilterState) {displayImage = displayImage.updateMask(displayImage.neq(0));}
    if(waterFilterState) {displayImage = displayImage.updateMask(displayImage.mask(ee.Image('MODIS/051/MCD12Q1/2013_01_01').select('Land_Cover_Type_1').neq(0)));}
    // map.addLayer(holdImage, {}, 'Data', false);
    map.addLayer(displayImage, imgVis, selectDisplayState);
    ui.root.widgets().set(1, map);
  };  // End of app.applyDATAVIEWFilter
  /** MODIS Landcover frequency helper, pick land cover state, create dataset */
  app.GenerateMODISGappedDataset = function(satSystem, landcoverVals, otherLandcoverVals) {               
    //prepare the lists for remap()
    var inVals = landcoverVals.concat(otherLandcoverVals);
    //print(inVals);
    var numOfLvs = landcoverVals.length;
    var numOfOlvs = otherLandcoverVals.length;
    var outLvs=[];
    var outOlvs=[];
    for(var i=0; i<numOfLvs; i++) {outLvs.push(7)}
    for(var j=0; j<numOfOlvs; j++) {outOlvs.push(3)}
    var outVals = outLvs.concat(outOlvs);
    //print(outVals);
    var MOD10A1 = ee.ImageCollection(satSystem)
                    .select('Snow_Cover_Daily_Tile')
                    .map(function(image) {
      var CodedBits = ee.Image(image).unmask()
                                     .remap(inVals,
                                            outVals, 
                                            null,
                                            'Snow_Cover_Daily_Tile');
      return CodedBits;
    })
                    .select(['remapped'], ['Snow_Cover_Daily_Tile']);
    return ee.ImageCollection(MOD10A1);
  }; 
  /** MODIS Landcover helper, pick land cover state.  Can be used for MOD and MYD */
  app.GenerateMODISFrequency = function(binaryCollection, StartDate, EndDate, TotalSteps) {                
    var SCF_List = ee.List([]);
    for(var i = 1; i <= TotalSteps; i++) {
      var binaryCollectionDerp = binaryCollection.filterDate(StartDate, EndDate);
      var NumOfSnowDays =  binaryCollectionDerp.sum();                                                                          // Calculate the number of days with snow cover with .sum()
      var NumOfValidObsDays = binaryCollectionDerp.count();                                                                     // Count the number of days with a valid observation with .count()
      var SnowCoverFrequency = NumOfSnowDays.toFloat().divide(NumOfValidObsDays);
      var SCF_Image = ee.Image(i)                                                         // Attach a date band (timestamp) used for trend analysis
                        .addBands(SnowCoverFrequency.select(['Snow_Cover_Daily_Tile'], ['Snow Cover Frequency'])).toDouble();
      SCF_List = SCF_List.add(SCF_Image);
      StartDate = ee.Date(StartDate).advance(1, 'year');
      EndDate = ee.Date(EndDate).advance(1, 'year');
    }
    return ee.ImageCollection(SCF_List);
  };
  /** Snow cover helpers, creates F-MXD. */
  app.GenerateSnowCoverDataset = function(satSystem, fractSliderNumber) {                
    var inList = ee.List.sequence(0,100,1).cat([225,237,239]);                      // Create a list with values 0-100,225,237,239
    var holdOutList = ee.List.repeat(3,fractSliderNumber).cat(ee.List.repeat(7,(101-fractSliderNumber))).cat([3,3,3]);  // Create a list with values of 3 for no snow and 7 for snow
                                                                                    // *note: 3&7's are used because GEE treats 0 as false in the mrco filter and therefore does not act on them
    var MOD10A1_Temp = ee.ImageCollection(satSystem)
                        .select('Fractional_Snow_Cover')
                        .map(function(image) {
        var CodedBits = ee.Image(image)
                          .unmask()
                          .remap(inList,
                                 holdOutList,
                                 50,
                                 'Fractional_Snow_Cover')
                          .select(['remapped'], ['Snow_Cover_Daily_Tile']);
        return CodedBits;
      });
    return ee.ImageCollection(MOD10A1_Temp);
  };
  /** MostRecentClearObs */
  app.mrcoFilter = function(collection, wsInDays) {
  // collection--image collection, MODIS daily snow cover products
  // wsInDays--window size in days
    var aDayInGee = 24*60*60*1000; //a day unix
    var tWindowSize = wsInDays*aDayInGee; //window size in days
    //
    // define a temporal filter for joining the collection with itself within a temporal window
    //
    // A temporal neighborhood that excludes the focus image
    var diffFilter = ee.Filter.maxDifference({
        difference: tWindowSize,
        leftField: 'system:time_start',
        rightField: 'system:time_start'
      });
    var joinFilter = ee.Filter.and(diffFilter,
        ee.Filter.notEquals({
        leftField: 'system:time_start',
        rightField: 'system:time_start'})
      );
    var saveAllJoin = ee.Join.saveAll({
      matchesKey: 'matches', 
      ordering: 'system:time_start', 
      ascending: true, 
      measureKey: 'timeDiff'
    });
    // join the collection with itself, i.e., join focus image within the images in the temporal window
    var joinResult = saveAllJoin.apply(collection, collection, joinFilter);
    // Helper function setNull()
    var setNull = function(input,loc){
      return input.updateMask(loc.not());
    };
    // MRCO filter as a map function
    var mrcoMapper = function(img){
      // cretate an image collection for each image using the images in the temporal neighborhood
      var matchCollection = ee.ImageCollection.fromImages(ee.Image(img).get('matches'));
      //print('images in the window',matchCollection);
      //add the "timeDiff" property as a new band to the collection
      var f = function(aImg){
        //add time difference band and mask out valid valid landcover pixels
        var validLcMask = ee.Image(aImg).eq(3)
                      .or(ee.Image(aImg).eq(7));
        var timeDiff = aImg.metadata('timeDiff','timeDiff').multiply(-1).mask(validLcMask);
        return aImg.mask(validLcMask).addBands(timeDiff.copyProperties(aImg)); //SR?
      };
      var icWithTimeDiff = matchCollection.map(f);
      //show('before quality mosaic',icWithTimeDiff.toArray());
      //MRCO
      var mrco = icWithTimeDiff.qualityMosaic('timeDiff');
      //show('MRCO in negative',mrco);
      //get the MRCO landcover
      var mrcoLc = mrco.select('Snow_Cover_Daily_Tile');
      // replace the focus image with MRCO landcover
      // Only replace clouds iff there is valid values in the temporal window
      // This means: 
      // 1) non-valid values (such as 0, 1, 11, 254,255) on the focus image are NOT replaced
      // 2) clouds on the focus image is NOT replaced if there is no valid value within the tmeporal window
      var mrcoFilledImageBare = ee.Image(img).where((ee.Image(img).eq(50)).and(mrcoLc),mrcoLc).toUint8(); //convert to MODIS sc type
      //show('mrcoFilledImage',mrcoFilledImageWithProps); //still cannot show!
      // copy the properties from the focus image
      var mrcoFilledImageWithProps = mrcoFilledImageBare.copyProperties(ee.Image(img),['system:footprint','system:index','system:time_end','system:time_start']);
      //change negative time to days
      var aDayInGee = 24*60*60*1000; //a day in GEE's time unit
      var mrcoTimeDiff = mrco.select('timeDiff').divide(aDayInGee).abs();
      // Prepare the MRCO day band
      //for no-cloud pixels their MRCO days are assigned as 0. 
      var initDays = ee.Image(img).where(ee.Image(img).neq(50),0).select(['Snow_Cover_Daily_Tile'],['MRVO Days']);
      //set all cloud pixels' MRCO days as NULL
      initDays = setNull(initDays,ee.Image(img).eq(50));
      //unmask the cloud pixels with valid MRCO days
      var mrcoDays = initDays.unmask(mrcoTimeDiff.updateMask(ee.Image(img).eq(50))); //should NOT use "mask()"!
      // add the MRCO day diff as a band
      var mrcoFilledImage = ee.Image(mrcoFilledImageWithProps).addBands(mrcoDays);
      //add the filled image
      return mrcoFilledImage;
    };
    var MRCOCollection = ee.ImageCollection(joinResult.map(mrcoMapper));
    var GapFilledDataset = ee.ImageCollection(MRCOCollection).map(function(image) {
      var CodedBits = ee.Image(image).remap([3,7],
                                            [0,1],
                                            null,
                                            'Snow_Cover_Daily_Tile');
                                        return CodedBits.addBands(image.select('MRVO_Days'));
                                               })
                                               .select(['remapped', 'MRVO_Days'], ['Snow_Cover_Daily_Tile', 'MRVO_Days']);
    return ee.ImageCollection(GapFilledDataset);
    };
};
/** Creates the app constants.  */
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {margin: '8px 0 -3px 8px', fontSize: '12px', color: 'gray'};
  app.FRACT_START = 10;
  app.MRCO_START = 0;
  app.DISPLAY_VIEW = app.F_MOD;
  app.SENSORANGLE = 'Sensor Angle Explorer';
  app.DATAVIEW = 'View Snow Cover Data';
  app.COMPARE = 'Compare Snow Products';
  app.RedToBlue = ["#FF0000", "#F40A00", "#EA1400", "#E01E00", "#D62800", "#CC3300", "#C13D00", "#B74700", "#AD5100", "#A35B00", "#996600", "#8E7000", "#847A00", "#7A8400", "#708E00", "#669900", "#5BA300", "#51AD00", "#47B700", "#3DC100", "#32CC00", "#28D600", "#1EE000", "#14EA00", "#0AF400", "#00FF00", "#00F40A", "#00E915", "#00DF1F", "#00D42A", "#00C935", "#00BF3F", "#00B44A", "#00AA55", "#009F5F", "#00946A", "#008A74", "#007F7F", "#00748A", "#006A94", "#005F9F", "#0055AA", "#004AB4", "#003FBF", "#0035C9", "#002AD4", "#001FDF", "#0015E9", "#000AF4", "#0000FF"];
  app.BlueToBrown = ["#964B00", "#9A520A", "#9E5914", "#A2601E", "#A66728", "#AB6F33", "#AF763D", "#B37D47", "#B78451", "#BB8B5B", "#C09366", "#C49A70", "#C8A17A", "#CCA884", "#D0AF8E", "#D5B799", "#D9BEA3", "#DDC5AD", "#E1CCB7", "#E5D3C1", "#EADBCC", "#EEE2D6", "#F2E9E0", "#F6F0EA", "#FAF7F4", "#FFFFFF", "#F4F7F9", "#E9EFF3", "#DFE7EE", "#D4DFE8", "#C9D7E2", "#BFCFDD", "#B4C7D7", "#AAC0D2", "#9FB8CC", "#94B0C6", "#8AA8C1", "#7FA0BB", "#7498B5", "#6A90B0", "#5F88AA", "#5581A5", "#4A799F", "#3F7199", "#356994", "#2A618E", "#1F5988", "#155183", "#0A497D", "#004278"];
  app.WhiteToBlack = ["#000000", "#050505", "#0A0A0A", "#0F0F0F", "#141414", "#1A1A1A", "#1F1F1F", "#242424", "#292929", "#2E2E2E", "#343434", "#393939", "#3E3E3E", "#434343", "#484848", "#4E4E4E", "#535353", "#585858", "#5D5D5D", "#626262", "#686868", "#6D6D6D", "#727272", "#777777", "#7C7C7C", "#828282", "#878787", "#8C8C8C", "#919191", "#969696", "#9C9C9C", "#A1A1A1", "#A6A6A6", "#ABABAB", "#B0B0B0", "#B6B6B6", "#BBBBBB", "#C0C0C0", "#C5C5C5", "#CACACA", "#D0D0D0", "#D5D5D5", "#DADADA", "#DFDFDF", "#E4E4E4", "#EAEAEA", "#EFEFEF", "#F4F4F4", "#F9F9F9", "#FFFFFF"];
  app.GlobalSnowPack = ["#FFFFFF", "#E7FBFF", "#D0F8FF", "#B9F5FF", "#A1F2FF", "#8AEFFF", "#73ECFF", "#5FC4FF", "#4C9DFF", "#3976FF", "#264EFF", "#1327FF", "#0000FF", "#1B00F0", "#3700E1", "#5301D2", "#6E01C3", "#8A01B4", "#A602A6", "#981098", "#8B1E8B", "#7E2C7E", "#713A71", "#644864", "#575757", "#454545", "#343434", "#222222", "#111111", "#000000"];
  app.BlueToRed = ["#0000FF", "#0011EE", "#0022DD", "#0033CC", "#0044BB", "#0055AA", "#006699", "#007788", "#008877", "#009966", "#00AA55", "#00BB44", "#00CC32", "#00DD21", "#00EE10", "#00FF00", "#12EC00", "#24DA00", "#36C800", "#48B600", "#5BA300", "#6D9100", "#7F7F00", "#916D00", "#A35B00", "#B64800", "#C83600", "#DA2400", "#EC1200", "#FF0000"];
  app.SUPPRESS_STATE = false;
  app.GREATER_THAN = 'Greater than';
  app.LESS_THAN = 'Less than';
  app.F_MOD = 'F-MOD';
  app.MOD_S = 'MOD';
  app.FRACT_USE = true;
  app.WSUPPRESS_STATE = false;
  app.NSUPPRESS_STATE = false;
  app.MOD_C = 'MOD Cloud Cover';
  app.F_MYD = 'F-MYD';
  app.MYD_S = 'MYD';
  app.MEAN_SCF = 'Mean Snow Cover:';
  app.MYD_C = 'MYD Cloud Cover';
  app.YEAR_SCF = 'SCF for year';
  app.MAX_GAP = 'Maximum data gap for entire record';
  app.POLAR = 'Mean Polar Night';
  app.MONTH_SCF = 'SCF for Month';
  app.SENS_Y = 'Sens Slope';
  app.SENS_M = 'Sens Slope by Month';
  app.SIG_Y = 'Significants of Trend';
  app.SIG_M = 'Significants of Trend by Month';
  app.D_DATE = '2014-07-01';
  app.DEFAULT_MAPS = 1;
  app.IMAGE_COUNT_LIMIT = 50;
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  app.modeFilter();
};
var existingMap;
app.boot();
/*\
                           ___________ _
  \/                    __/   .::::.-'-(/-/)
                     _/:  .::::.-' .-'\/\_`*******          __ (_))
        \/          /:  .::::./   -._-.  d\|               (_))_(__))
                     /: (""""/    '.  (__/||           (_))__(_))--(__))
                      \::).-'  -._  \/ \\/\|
              __ _ .-'`)/  '-'. . '. |  (i_O
          .-'      \       -'      '\|
     _ _./      .-'|       '.  (    \\                         % % %
  .-'   :      '_  \         '-'\  /|/      @ @ @             % % % %
 /      )\_      '- )_________.-|_/^\      @ @ @@@           % %\/% %
 (   .-'   )-._-:  /        \(/\'-._ `.     @|@@@@@            ..|........
  (   )  _//_/|:  /          `\()   `\_\     |/_@@             )'-._.-._.-
   ( (   \()^_/)_/             )/      \\    /                /   /
    )  _.-\\.\(_)__._.-'-.-'-.//_.-'-.-.)\-'/._              /
.-.-.-'   _o\ \\\     '::'   (o_ '-.-' |__\'-.-;~ ~ ~ ~ ~ ~~/   /\
          \ /  \\\__          )_\    .:::::::.-'\          '- - -|
     :::''':::::^)__\:::::::::::::::::'''''''-.  \                '- - - 
    :::::::  '''''''''''   ''''''''''''':::. -'\  \    
_____':::::_____________________________________\__\______________________*/