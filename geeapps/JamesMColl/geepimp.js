/* 
 .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. |
| |   ______     | || | ____    ____ | || |   ______     | |
| |  |_   __ \   | || ||_   \  /   _|| || |  |_   __ \   | |
| |    | |__) |  | || |  |   \/   |  | || |    | |__) |  | |
| |    |  ___/   | || |  | |\  /| |  | || |    |  ___/   | |
| |   _| |_      | || | _| |_\/_| |_ | || |   _| |_      | |
| |  |_____|     | || ||_____||_____|| || |  |_____|     | |
| |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------' 
       .------..                                     _------__--___.__.
     -          -                                  /            `  `    \
   /              \                               |                      \
 /                   \                            |                       |
/    .--._    .---.   |       Hey Butthead,        \                      |
|  /      -__-     \   |     Why are we here?        ~/ --`-`-`-\         |
| |                 |  |                             |            |       |
 ||     ._   _.      ||                              |            |       |
 ||      o   o       ||                               |   _--    |       |
 ||      _  |_      ||                                _| =-.    |.-.    |
 C|     (o\_/o)     |O                                o|/o/       _.   |
  \      _____      /                                 /  ~          \ |
    \ ( /#####\ ) /                                 (____@)  ___~    |
     \  `====='  /        Uhhh, this computer          |_===~~~.`    |
      \  -___-  /          is like, busted or       _______.--~     |
       |       |         something. So go away.     \________       |
       /-_____-\                                             \      |
     /           \                                         __/-___-- -__
   /               \                                      /            __\
  /__|  AC / DC  |__\                                    /-| Metallica|| |
  | ||           |\ \                                   / /|          || | 
About:
add exports (on google)
Feel free to modify this code to suit your needs, or email me at jcoll@ku.edu and I can try and answer your questions or add additional features.  For those
of you interested in how this works, feel free to read through the code, and remember to use the arrows next to the numbers to collapse functions 
for an easier read.  Stay tuned for more...
----- Acknowledgments -----
Thanks to Google for creating such a fantastic platform on which I can do this kind of stuff on.
\*****************************************************************************************************************************************************************/  
var app = {};
/** Creates the app constants. */
app.createConstants = function() {
  // Constants 
  app.QualityFlagMask = true;
  app.printStatements = false;
  app.currentIndex = 1;
  // Random Data and Structure Containers
  app.PMP = null;
  app.AJ_PMP = null;
  app.frequency_factor = null;
  app.AJ_frequency_factor = null;
  app.selectedPoint = null;
  app.DDF_Data = ee.ImageCollection('users/JamesMColl/DDF_Curves/DDF');
  app.DDF_Series = ee.List([]);
  app.Precip_timeslice = ee.List([]);
  app.ANIMATEDimages = ee.List([]);
  app.chartData = null;
  app.selectedPoints = [];
  app.CECEco1String = "CEC Ecoregion Level 1";
  app.CECEco1Shape = ee.FeatureCollection("users/JamesMColl/CEC_Eco_RSimp");
  app.CECEco1Table = ee.FeatureCollection("users/JamesMColl/CEC_Eco1_LC01");
  app.CECEco1Image = ee.Image("users/JCollGEE/CECEco_l1_250");
  app.CECEco3String = "CEC Ecoregion Level 3";
  app.CECEco3Shape = ee.FeatureCollection("EPA/Ecoregions/2013/L3");
  app.CECEco4String = "CEC Ecoregion Level 4";
  app.CECEco4Shape = ee.FeatureCollection("EPA/Ecoregions/2013/L4");
  app.HUC2String = "HUC 2";
  app.HUC2Shape = ee.FeatureCollection("users/JamesMColl/HUC2_rsimp");  
  app.HUC4String = "HUC 4";
  app.HUC4Shape = ee.FeatureCollection("USGS/WBD/2017/HUC04");
  app.HUC6String = "HUC 6";
  app.HUC6Shape = ee.FeatureCollection("USGS/WBD/2017/HUC06");
  app.HUC8String = "HUC 8";
  app.HUC8Shape = ee.FeatureCollection("USGS/WBD/2017/HUC08");
  app.HUC10String = "HUC 10";
  app.HUC10Shape = ee.FeatureCollection("USGS/WBD/2017/HUC10");
  app.BrazilString = "Custom Shapefile";
  app.AzB = ee.FeatureCollection("users/JamesMColl/MergedData");    //https://code.earthengine.google.com/?asset=users/JamesMColl/MergedSAData
  app.CountriesString = "Countries";
  app.CountriesShape = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
  app.StatesString = "States";
  app.StatesShape = ee.FeatureCollection("TIGER/2016/States");  
  app.CountiesString = "Counties";
  app.CountiesShape = ee.FeatureCollection("TIGER/2018/Counties");
  app.MODISTileString = "MODIS Tiles";
  app.MODISTileShape = ee.FeatureCollection("users/JamesMColl/modis_grid");
  app.MapPointString = "Point (mouse click)";
  app.MapBoxString = "Map Bounding Box (on click)";
  // Select Vars
  app.timeSlice_year = 'year (standard)';
  app.timeSlice_winter = 'Winter (djf)';
  app.timeSlice_spring = 'Spring (mam)';
  app.timeSlice_summer = 'Summer (jja)';
  app.timeSlice_fall = 'Fall (son)';
  app.timeSlice_jan = 'jan';
  app.timeSlice_feb = 'feb';
  app.timeSlice_mar = 'mar';
  app.timeSlice_apr = 'apr';
  app.timeSlice_may = 'may';
  app.timeSlice_jun = 'jun';
  app.timeSlice_jly = 'jly';
  app.timeSlice_aug = 'aug';
  app.timeSlice_sep = 'sep';
  app.timeSlice_oct = 'oct';
  app.timeSlice_nov = 'nov';
  app.timeSlice_dec = 'dec';
  app.bandview_IMERG_30min = 'IMERG 30 min';
  app.bandview_IMERG_1hour = 'IMERG 1 hour';
  app.bandview_IMERG_2hour = 'IMERG 2 hour';
  app.bandview_IMERG_3hour = 'IMERG 3 hour';
  app.bandview_IMERG_6hour = 'IMERG 6 hour';
  app.bandview_IMERG_12hour = 'IMERG 12 hour';
  app.bandview_IMERG_24hour = 'IMERG 24 hour';
  app.bandview_IMERG_uncal_30min = 'Uncalibrated IMERG 30 min';
  app.bandview_IMERG_uncal_1hour = 'Uncalibrated IMERG 1 hour';
  app.bandview_IMERG_uncal_2hour = 'Uncalibrated IMERG 2 hour';
  app.bandview_IMERG_uncal_3hour = 'Uncalibrated IMERG 3 hour';
  app.bandview_IMERG_uncal_6hour = 'Uncalibrated IMERG 6 hour';
  app.bandview_IMERG_uncal_12hour = 'Uncalibrated IMERG 12 hour';
  app.bandview_IMERG_uncal_24hour = 'Uncalibrated IMERG 24 hour';
  app.bandview_TRMM_3hour = 'TRMM 3 hour';
  app.bandview_TRMM_6hour = 'TRMM 6 hour';
  app.bandview_TRMM_12hour = 'TRMM 12 hour';
  app.bandview_TRMM_24hour = 'TRMM 24 hour';
  app.bandview_CHIRPS_24hour = 'CHIRPS 24 hour';
  app.bandview_IMERG_month = 'IMERG month';
  app.bandview_TRMM_month = 'TRMM month';
  app.bandview_CHIRPS_month = 'CHIRPS month';
  // Vis I should probably be able to pull but haven't figured out
  app.GenFCColors = ["FF0000"];
  app.GenFCNames = ["(Outlined)"];
  app.Feature_STYLE = {width: 1, color: "FF0000", fillColor: "00000000"};
  app.HIGHLIGHT_STYLE = {color: "F2F2F2", fillColor: "F2F2F240"};
  app.WhiteToBlue = ["#F9F9FB","#ECECFA","#E0E0FA","#D4D4F9","#C8C8F9","#BBBBF8","#AFAFF8","#A3A3F8","#9797F7","#8B8BF7","#7E7EF6","#7272F6","#6666F5","#5A5AF5","#4E4EF5","#4141F4","#3535F4","#2929F3","#1D1DF3","#1111F3"];
  app.WhiteToPink = ["#FFFFFF","#E5EFFC","#CCE0FA","#B2D0F8","#99C1F6","#7FB1F3","#66A2F1","#4C92EF","#3383ED","#1A74EB","#2B6AEA","#3C61E9","#4D57E8","#5E4EE7","#6F45E7","#803BE6","#9132E5","#A228E4","#B31FE3","#C516E3"];
  app.RGB = ["#2813ED","#252BED","#2343ED","#215BED","#1E73ED","#1C8CED","#1AA4ED","#17BCED","#15D4ED","#13EDED","#13E7DC","#14E1CB","#14DBBA","#15D6A9","#15D099","#16CA88","#16C577","#17BF66","#17B955","#18B445","#2DB940","#42BF3B","#57C536","#6DCA31","#82D02C","#97D627","#ADDB22","#C2E11D","#D7E718","#EDED13","#EDD913","#EDC513","#EDB113","#ED9D13","#ED8913","#ED7613","#ED6213","#ED4E13","#ED3A13","#ED2613","#ED1313"];
  // Animation
  app.timeout = null;
  app.play = false;
  app.utils = require('users/gena/packages:utils');
  app.text = require('users/gena/packages:text');
  app.textPlay = '▶';
  app.textPause = '⏸';
  app.palettes = require('users/gena/packages:palettes');
  app.precippalette = ['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'];
  if(app.printStatements) {print("Base DDF dataset", app.GoldenDataset)}
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  app.WipeMap = function() {
    app.MainMap.clear(); 
    app.MainMap.style().set({cursor: "crosshair"});
    app.MainMap.onClick(app.MapClickEvent);
  };
  app.add_base_data = function() {
    app.filters.unit_select_label.setValue("Selected: null");
    var AGUnitSelectValue = app.filters.unit_select.getValue();
    app.filters.points_panel.style().set('shown', false);
    app.WipeMap();
    var finalImage = 200;
    if(AGUnitSelectValue == "CEC Ecoregion Level 1") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CECEco1Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 1"));
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 3") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CECEco3Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 3"));
    } else if(AGUnitSelectValue == "CEC Ecoregion Level 4") {
      app.MainMap.layers().insert(finalImage, ui.Map.Layer(app.CECEco4Shape.style(app.Feature_STYLE)).setName("CEC Ecoregion Level 4"));
    } else if(AGUnitSelectValue == "States") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.StatesShape.style(app.Feature_STYLE)).setName("States"));
    } else if(AGUnitSelectValue == "MODIS Tiles") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(ee.FeatureCollection(app.MODISTileShape).style(app.Feature_STYLE)).setName("MODIS tiles"));
    } else if(AGUnitSelectValue == "Custom Shapefile") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.AzB.style(app.Feature_STYLE)).setName("Custom Shapefile"));
    } else if(AGUnitSelectValue == "HUC 2") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC2Shape.style(app.Feature_STYLE)).setName("2 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 6") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC6Shape.style(app.Feature_STYLE)).setName("6 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 4") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC4Shape.style(app.Feature_STYLE)).setName("4 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 8") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC8Shape.style(app.Feature_STYLE)).setName("8 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "HUC 10") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.HUC10Shape.style(app.Feature_STYLE)).setName("10 digit Hydrologic Unit Code"));
    } else if(AGUnitSelectValue == "Countries") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CountriesShape.style(app.Feature_STYLE)).setName("Countries"));
    } else if(AGUnitSelectValue == "Counties") {
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
    } else if(AGUnitSelectValue == "Point (mouse click)") {
      app.filters.points_panel.style().set('shown', true);
      app.MainMap.layers().set(finalImage, ui.Map.Layer(app.CountiesShape.style(app.Feature_STYLE)).setName("Counties"));
    }
  };
  // Get the AG feature
  app.getSelectedFeatures = function() {
    app.myPointPoly;
    var myPointPolyArea;
    var catString;
    var point = ee.Geometry.Point(app.selectedPoints[0][0], app.selectedPoints[0][1]);
    var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
    // Add the dot as the second layer, so it shows up on top of the composite.
    app.MainMap.layers().set(1, dot);
    app.myPointPoly = ee.Feature(ee.Geometry.MultiPoint(app.selectedPoints).buffer(15));
    // app.MainMap.layers().add(ui.Map.Layer(ee.FeatureCollection(ee.Feature(app.myPointPoly)).style(app.Feature_STYLE)).setName("Selected feature")); 
    // app.MainMap.layers().set(1, ui.Map.Layer(ee.FeatureCollection(app.myPointPoly).style(app.HIGHLIGHT_STYLE)).setName("Selected feature")); 
    // app.MainMap.centerObject(ee.FeatureCollection(app.myPointPoly));
    return app.myPointPoly;
  };
  // legend helper function
  app.makeRow = function(color, name) {
    return ui.Panel({
      widgets: [
        ui.Label({style: {backgroundColor: "#" + color, padding: "8px", margin: "0 0 4px 0"}}), 
        ui.Label({value: name, style: {margin: "0 0 4px 6px"}})],
      layout: ui.Panel.Layout.Flow("horizontal")
    });
  };
  // legend helper function
  app.makeColorBarParams = function(myPalette) {
    return {bbox: [0, 0, 1, 0.1], dimensions: '100x10', format: 'png', min: 0, max: 1, palette: myPalette};
  };
  app.addColorLegend = function() {
    // var VarSelectValue = app.USLegend.VarSelect.getValue();
    // if(VarSelectValue == "K") {
    if(true) {
      app.LegendColorBlock.imerg30minvalues.style().set({shown: true});
      app.LegendColorBlock.imerg30min.style().set({shown: true});
    }
  };
  // Takes results from Select features and makes the dataset, returns raw chart data
  app.makeChartData = function(AOI) {
    app.chartSeries.clear();
    var rawSeries,ffSeries,seriesChart,pmpchart,PMPPoint,IMERGLIST,UNCALIMERGLIST,TRMMLIST,CHIRPSLIST,AJ_IMERGLIST,AJ_UNCALIMERGLIST,AJ_TRMMLIST,AJ_CHIRPSLIST,XLIST;
    rawSeries = ui.Chart.image.series({
        imageCollection: app.DDF_Data.filterDate('2001-01-01','2020-12-31'),
        region: AOI.geometry(),
        reducer: ee.Reducer.first(),
        scale: 10
      });
    rawSeries.setOptions({
      title: 'Aggregate precipitation data',
      vAxis: {
        title: 'mm per duration by month'
      }
    });
    // ffSeries = ui.Chart.image.byRegion({
    //   image: app.frequency_factor,
    //   regions: AOI.geometry(),
    //   reducer: ee.Reducer.first(),
    //   scale: 10
    // });
    // ffSeries.setOptions({
    //   title: 'Frequency factor',
    //   vAxis: {
    //     title: 'frequency'
    //   }
    // });
    seriesChart = ui.Chart.image.series({
      imageCollection: app.DDF_Series,
      region: AOI.geometry(),
      reducer: ee.Reducer.first(),
      scale: 10
    });
    seriesChart.setOptions({
      title: 'Depth, Duration, Frequency curve data',
      vAxis: {
        title: 'mm per duration'
      }
    });
    PMPPoint = ee.Feature(ee.Image(app.PMP).reduceRegions(AOI.geometry(), ee.Reducer.first(),10).first());
    // PMPPoint = ee.Feature(PMPPoint.first());
    IMERGLIST = ee.List([PMPPoint.getNumber('IMERG_30min'),PMPPoint.getNumber('IMERG_1hour'),PMPPoint.getNumber('IMERG_2hour'),PMPPoint.getNumber('IMERG_3hour'),
      PMPPoint.getNumber('IMERG_6hour'),PMPPoint.getNumber('IMERG_12hour'),PMPPoint.getNumber('IMERG_24hour')
      //,ee.Feature(test.first()).getNumber('IMERG_month')
      ]);
    UNCALIMERGLIST = ee.List([PMPPoint.getNumber('IMERG_uncal_30min'),PMPPoint.getNumber('IMERG_uncal_1hour'),PMPPoint.getNumber('IMERG_uncal_2hour'),PMPPoint.getNumber('IMERG_uncal_3hour'),
      PMPPoint.getNumber('IMERG_uncal_6hour'),PMPPoint.getNumber('IMERG_uncal_12hour'),PMPPoint.getNumber('IMERG_uncal_24hour')
      //,ee.Feature(test.first()).getNumber('IMERG_month')
      ]);
    TRMMLIST = ee.List([0,0,0,PMPPoint.getNumber('TRMM_3hour'),PMPPoint.getNumber('TRMM_6hour'),PMPPoint.getNumber('TRMM_12hour'),
      PMPPoint.getNumber('TRMM_24hour')
      //,ee.Feature(test.first()).getNumber('TRMM_month')
      ]);
    CHIRPSLIST = ee.List([0,0,0,0,0,0,PMPPoint.getNumber('CHIRPS_24hour')
      //,ee.Feature(test.first()).getNumber('CHIRPS_month')
      ]);
    AJ_IMERGLIST = ee.List([PMPPoint.getNumber('AJ_IMERG_30min'),PMPPoint.getNumber('AJ_IMERG_1hour'),PMPPoint.getNumber('AJ_IMERG_2hour'),PMPPoint.getNumber('AJ_IMERG_3hour'),
      PMPPoint.getNumber('AJ_IMERG_6hour'),PMPPoint.getNumber('AJ_IMERG_12hour'),PMPPoint.getNumber('AJ_IMERG_24hour')
      //,ee.Feature(test.first()).getNumber('AJ_IMERG_month')
      ]);
    AJ_UNCALIMERGLIST = ee.List([PMPPoint.getNumber('AJ_IMERG_uncal_30min'),PMPPoint.getNumber('AJ_IMERG_uncal_1hour'),PMPPoint.getNumber('AJ_IMERG_uncal_2hour'),PMPPoint.getNumber('AJ_IMERG_uncal_3hour'),
      PMPPoint.getNumber('AJ_IMERG_uncal_6hour'),PMPPoint.getNumber('AJ_IMERG_uncal_12hour'),PMPPoint.getNumber('AJ_IMERG_uncal_24hour')
      //,ee.Feature(test.first()).getNumber('AJ_IMERG_month')
      ]);
    AJ_TRMMLIST = ee.List([0,0,0,PMPPoint.getNumber('AJ_TRMM_3hour'),PMPPoint.getNumber('AJ_TRMM_6hour'),PMPPoint.getNumber('AJ_TRMM_12hour'),
      PMPPoint.getNumber('AJ_TRMM_24hour')
      //,ee.Feature(test.first()).getNumber('AJ_TRMM_month')
      ]);
    AJ_CHIRPSLIST = ee.List([0,0,0,0,0,0,PMPPoint.getNumber('AJ_CHIRPS_24hour')
      //,ee.Feature(test.first()).getNumber('AJ_CHIRPS_month')
      ]);
    XLIST = ee.List([0.5,1,2,3,6,12,24
      //,720
      ]);
    if(app.printStatements) {print("PMP", ee.Array([IMERGLIST,UNCALIMERGLIST,TRMMLIST,CHIRPSLIST,AJ_IMERGLIST,AJ_UNCALIMERGLIST,AJ_TRMMLIST,AJ_CHIRPSLIST]))}
    // GEE TODO: Chart axis names
    pmpchart = ui.Chart.array.values(ee.Array([IMERGLIST,UNCALIMERGLIST,TRMMLIST,CHIRPSLIST,AJ_IMERGLIST,AJ_UNCALIMERGLIST,AJ_TRMMLIST,AJ_CHIRPSLIST]), 1, XLIST)
      .setChartType('LineChart')
      .setSeriesNames(['IMERG','IMERG (polar-orbiting microwave, uncalibrated)', 'TRMM', 'CHIRPS','Adjusted IMERG','Adjusted IMERG (polar-orbiting microwave, uncalibrated)', 'Adjusted TRMM', 'Adjusted CHIRPS'])
      .setOptions({
        title: 'Probable Maximum Precipitation',
        vAxes: {
          0: {
            title: 'Precipitation (mm)'
          }
        },
        hAxis: {
          title: 'Duration (hour)'
        },
        interpolateNulls: true,
        pointSize: 0,
        lineWidth: 1
    });
    // app.chartSeries.add(ui.Panel([rawSeries,ffSeries,seriesChart,pmpchart], ui.Panel.Layout.Flow("vertical")));
    app.chartSeries.add(ui.Panel([rawSeries,seriesChart,pmpchart], ui.Panel.Layout.Flow("vertical")));
  };
  app.MapClickEvent = function(coords) {
    app.selectedPoints = null;
    app.selectedPoints = [];
    // app.selectedPoint = ee.Geometry.Point(coords.lon, coords.lat);
    app.selectedPoints.push([coords.lon, coords.lat]);
    app.filters.userLon.setValue(coords.lon,false);
    app.filters.userLat.setValue(coords.lat,false);
    // print(app.selectedPoints)
    // app.selectedPoints.push([coords.lon, coords.lat]);
    // app.makeChartData(app.getSelectedFeatures());
    // app.makeCharts();
    app.sliceDataset();
  };
  app.sliceDataset = function() {
    var TimeSelectValue = app.filters.timeslice.getValue();
    var StartDate;
    var EndDate;
    var imageSlice;    
    app.DDF_Series = ee.List([]);
    if(TimeSelectValue == "year (standard)") {
      StartDate = ee.Date('2001-01-01');
      EndDate = ee.Date(StartDate).advance(0.99, "year");
    } else if(TimeSelectValue == "Winter (djf)") {
      StartDate = ee.Date('2000-12-01');
      EndDate = ee.Date(StartDate).advance(1.99, "month");
    } else if(TimeSelectValue == "Spring (mam)") {
      StartDate = ee.Date('2001-03-01');
      EndDate = ee.Date(StartDate).advance(1.99, "month");
    } else if(TimeSelectValue == "Summer (jja)") {
      StartDate = ee.Date('2001-06-01');
      EndDate = ee.Date(StartDate).advance(1.99, "month");
    } else if(TimeSelectValue == "Fall (son)") {
      StartDate = ee.Date('2001-09-01');
      EndDate = ee.Date(StartDate).advance(1.99, "month");
    } else if(TimeSelectValue == "jan") {
      StartDate = ee.Date('2001-01-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "feb") {
      StartDate = ee.Date('2001-02-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "mar") {
      StartDate = ee.Date('2001-03-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "apr") {
      StartDate = ee.Date('2001-04-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "may") {
      StartDate = ee.Date('2001-05-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "jun") {
      StartDate = ee.Date('2001-06-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "jly") {
      StartDate = ee.Date('2001-07-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "aug") {
      StartDate = ee.Date('2001-08-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "sep") {
      StartDate = ee.Date('2001-09-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "oct") {
      StartDate = ee.Date('2001-10-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "nov") {
      StartDate = ee.Date('2001-11-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    } else if(TimeSelectValue == "dec") {
      StartDate = ee.Date('2001-12-01');
      EndDate = ee.Date(StartDate).advance(5, "day");
    }
    for(var i = 0; i <= 19; i++) {
      imageSlice = app.DDF_Data.filterDate(StartDate, EndDate);
      app.DDF_Series = app.DDF_Series.add(ee.Image(imageSlice.max()).copyProperties(imageSlice.first(), ["system:time_start"]));
      StartDate = ee.Date(StartDate).advance(1, "year");
      EndDate = ee.Date(EndDate).advance(1, "year");
    }
    app.DDF_Series = ee.ImageCollection.fromImages(app.DDF_Series);
    if(app.printStatements) {print("Sliced dataset", app.DDF_Series.mean())}
    // print(app.DDF_Series.reduce(ee.Reducer.sampleStdDev()))
    // TAG KENS FLOWCHART FIG x
    // I rename bands here to subtract by image
    var max_precip = app.DDF_Series.max()
      .select(['IMERG_30min_max','IMERG_1hour_max','IMERG_2hour_max','IMERG_3hour_max','IMERG_6hour_max','IMERG_12hour_max','IMERG_24hour_max','IMERG_month_max','IMERG_uncal_30min_max','IMERG_uncal_1hour_max','IMERG_uncal_2hour_max','IMERG_uncal_3hour_max','IMERG_uncal_6hour_max','IMERG_uncal_12hour_max','IMERG_uncal_24hour_max','IMERG_uncal_month_max','TRMM_3hour_max','TRMM_6hour_max','TRMM_12hour_max','TRMM_24hour_max','TRMM_month_max','CHIRPS_24hour_max','CHIRPS_month_max'],
              ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month']);
    // print('app.DDF_Series',app.DDF_Series)
    // print('max_precip image',max_precip)
    // Edge case: ties with max, that would end up masking out more than one value but would also be accounted for in the shorter length of the series
    // More ideal? mask out just one (IC -> array -> sort -> slice(0))
    var precip_timeslice_n1 = app.DDF_Series.map(function(image) {
      var IMERG30min = image.select("IMERG_30min_max").updateMask(image.select("IMERG_30min_max").neq(max_precip.select("IMERG_30min")));
      var IMERG1h = image.select("IMERG_1hour_max").updateMask(image.select("IMERG_1hour_max").neq(max_precip.select("IMERG_1hour")));
      var IMERG2h = image.select("IMERG_2hour_max").updateMask(image.select("IMERG_2hour_max").neq(max_precip.select("IMERG_2hour")));
      var IMERG3h = image.select("IMERG_3hour_max").updateMask(image.select("IMERG_3hour_max").neq(max_precip.select("IMERG_3hour")));
      var IMERG6h = image.select("IMERG_6hour_max").updateMask(image.select("IMERG_6hour_max").neq(max_precip.select("IMERG_6hour")));
      var IMERG12h = image.select("IMERG_12hour_max").updateMask(image.select("IMERG_12hour_max").neq(max_precip.select("IMERG_12hour")));
      var IMERG24h = image.select("IMERG_24hour_max").updateMask(image.select("IMERG_24hour_max").neq(max_precip.select("IMERG_24hour")));
      var UNCALIMERG30min = image.select("IMERG_uncal_30min_max").updateMask(image.select("IMERG_uncal_30min_max").neq(max_precip.select("IMERG_uncal_30min")));
      var UNCALIMERG1h = image.select("IMERG_uncal_1hour_max").updateMask(image.select("IMERG_uncal_1hour_max").neq(max_precip.select("IMERG_uncal_1hour")));
      var UNCALIMERG2h = image.select("IMERG_uncal_2hour_max").updateMask(image.select("IMERG_uncal_2hour_max").neq(max_precip.select("IMERG_uncal_2hour")));
      var UNCALIMERG3h = image.select("IMERG_uncal_3hour_max").updateMask(image.select("IMERG_uncal_3hour_max").neq(max_precip.select("IMERG_uncal_3hour")));
      var UNCALIMERG6h = image.select("IMERG_uncal_6hour_max").updateMask(image.select("IMERG_uncal_6hour_max").neq(max_precip.select("IMERG_uncal_6hour")));
      var UNCALIMERG12h = image.select("IMERG_uncal_12hour_max").updateMask(image.select("IMERG_uncal_12hour_max").neq(max_precip.select("IMERG_uncal_12hour")));
      var UNCALIMERG24h = image.select("IMERG_uncal_24hour_max").updateMask(image.select("IMERG_uncal_24hour_max").neq(max_precip.select("IMERG_uncal_24hour")));
      var trmm3h = image.select("TRMM_3hour_max").updateMask(image.select("TRMM_3hour_max").neq(max_precip.select("TRMM_3hour")));
      var trmm6h = image.select("TRMM_6hour_max").updateMask(image.select("TRMM_6hour_max").neq(max_precip.select("TRMM_6hour")));
      var trmm12h = image.select("TRMM_12hour_max").updateMask(image.select("TRMM_12hour_max").neq(max_precip.select("TRMM_12hour")));
      var trmm24h = image.select("TRMM_24hour_max").updateMask(image.select("TRMM_24hour_max").neq(max_precip.select("TRMM_24hour")));
      var chirps24h = image.select("CHIRPS_24hour_max").updateMask(image.select("CHIRPS_24hour_max").neq(max_precip.select("CHIRPS_24hour")));
      var IMERGE1m = image.select("IMERG_month_max").updateMask(image.select("IMERG_month_max").neq(max_precip.select("IMERG_month")));
      var UNCALIMERGE1m = image.select("IMERG_uncal_month_max").updateMask(image.select("IMERG_uncal_month_max").neq(max_precip.select("IMERG_uncal_month")));
      var trmm1m = image.select("TRMM_month_max").updateMask(image.select("TRMM_month_max").neq(max_precip.select("TRMM_month")));
      var chirps1m = image.select("CHIRPS_month_max").updateMask(image.select("CHIRPS_month_max").neq(max_precip.select("CHIRPS_month")));
      return ee.Image(IMERG30min).addBands(
        [IMERG1h,IMERG2h,IMERG3h,IMERG6h,IMERG12h,IMERG24h,IMERGE1m,
        UNCALIMERG30min,UNCALIMERG1h,UNCALIMERG2h,UNCALIMERG3h,UNCALIMERG6h,UNCALIMERG12h,UNCALIMERG24h,UNCALIMERGE1m,
        trmm3h,trmm6h,trmm12h,trmm24h,trmm1m,
        chirps24h,chirps1m]);
    });
    precip_timeslice_n1 = ee.ImageCollection(precip_timeslice_n1);
    // print('precip_timeslice_n1',precip_timeslice_n1)
    var estimate_mean = app.DDF_Series.mean()
      .select(['IMERG_30min_max','IMERG_1hour_max','IMERG_2hour_max','IMERG_3hour_max','IMERG_6hour_max','IMERG_12hour_max','IMERG_24hour_max','IMERG_month_max','IMERG_uncal_30min_max','IMERG_uncal_1hour_max','IMERG_uncal_2hour_max','IMERG_uncal_3hour_max','IMERG_uncal_6hour_max','IMERG_uncal_12hour_max','IMERG_uncal_24hour_max','IMERG_uncal_month_max','TRMM_3hour_max','TRMM_6hour_max','TRMM_12hour_max','TRMM_24hour_max','TRMM_month_max','CHIRPS_24hour_max','CHIRPS_month_max'],
              ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month']);
    // print('estimate_mean',estimate_mean)
    var estimate_mean_n1 = precip_timeslice_n1.mean()
         .select(['IMERG_30min_max','IMERG_1hour_max','IMERG_2hour_max','IMERG_3hour_max','IMERG_6hour_max','IMERG_12hour_max','IMERG_24hour_max','IMERG_month_max','IMERG_uncal_30min_max','IMERG_uncal_1hour_max','IMERG_uncal_2hour_max','IMERG_uncal_3hour_max','IMERG_uncal_6hour_max','IMERG_uncal_12hour_max','IMERG_uncal_24hour_max','IMERG_uncal_month_max','TRMM_3hour_max','TRMM_6hour_max','TRMM_12hour_max','TRMM_24hour_max','TRMM_month_max','CHIRPS_24hour_max','CHIRPS_month_max'],
              ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month']);
    // print('estimate_mean_n1',estimate_mean_n1)
    var mean_ratio = estimate_mean_n1.divide(estimate_mean);
    // print('mean_ratio',mean_ratio)
    // Take 10 years off because we only know valuse from 4.2 from 10-50
    var RL = app.DDF_Series.count().subtract(10);
    // B intercept from WMO_PMP_Guide_paper_graph_extract.xls
    var b = ee.Image(3.6671);
    // Adjust y intercept based on trend of intercepts
    var b_offset = b.subtract(ee.Image(4.6).multiply(RL.divide(40)));
    // print('estimate_mean',estimate_mean)
    // lower curve of 4.4
    // var AJFactor_mean = ee.Image(1.0382).multiply(mean_ratio).add(ee.Image(b_offset));
    // var AJFactor_mean = ee.Image(103.82).multiply(mean_ratio).add(ee.Image(b));
    var AJFactor_mean = ee.Image(103.82).multiply(mean_ratio).add(ee.Image(b_offset));
    AJFactor_mean = AJFactor_mean.divide(ee.Image(100));
    var AJFactor_mean_RL = ee.Image(-3.679).multiply(ee.Image(RL).log()).add(113.15);
    // hidden conversion again
    AJFactor_mean_RL = AJFactor_mean_RL.divide(ee.Image(100));
    // print('AJFactor_mean',AJFactor_mean)
    // print('AJFactor_mean_RL',AJFactor_mean_RL)
    var AJ_mean = estimate_mean.multiply(AJFactor_mean).multiply(AJFactor_mean_RL);
    var estimate_sd = app.DDF_Series.reduce(ee.Reducer.sampleStdDev())
      .select(['IMERG_30min_max_stdDev','IMERG_1hour_max_stdDev','IMERG_2hour_max_stdDev','IMERG_3hour_max_stdDev','IMERG_6hour_max_stdDev','IMERG_12hour_max_stdDev','IMERG_24hour_max_stdDev','IMERG_month_max_stdDev','IMERG_uncal_30min_max_stdDev','IMERG_uncal_1hour_max_stdDev','IMERG_uncal_2hour_max_stdDev','IMERG_uncal_3hour_max_stdDev','IMERG_uncal_6hour_max_stdDev','IMERG_uncal_12hour_max_stdDev','IMERG_uncal_24hour_max_stdDev','IMERG_uncal_month_max_stdDev','TRMM_3hour_max_stdDev','TRMM_6hour_max_stdDev','TRMM_12hour_max_stdDev','TRMM_24hour_max_stdDev','TRMM_month_max_stdDev','CHIRPS_24hour_max_stdDev','CHIRPS_month_max_stdDev'],
              ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month']);
    var estimate_sd_n1 = precip_timeslice_n1.reduce(ee.Reducer.sampleStdDev())
      .select(['IMERG_30min_max_stdDev','IMERG_1hour_max_stdDev','IMERG_2hour_max_stdDev','IMERG_3hour_max_stdDev','IMERG_6hour_max_stdDev','IMERG_12hour_max_stdDev','IMERG_24hour_max_stdDev','IMERG_month_max_stdDev','IMERG_uncal_30min_max_stdDev','IMERG_uncal_1hour_max_stdDev','IMERG_uncal_2hour_max_stdDev','IMERG_uncal_3hour_max_stdDev','IMERG_uncal_6hour_max_stdDev','IMERG_uncal_12hour_max_stdDev','IMERG_uncal_24hour_max_stdDev','IMERG_uncal_month_max_stdDev','TRMM_3hour_max_stdDev','TRMM_6hour_max_stdDev','TRMM_12hour_max_stdDev','TRMM_24hour_max_stdDev','TRMM_month_max_stdDev','CHIRPS_24hour_max_stdDev','CHIRPS_month_max_stdDev'],
              ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month']);
    var sd_ratio = estimate_sd_n1.divide(estimate_sd);
    var AJFactor_SD_slope = ee.Image(122.5).subtract(ee.Image(16.28).multiply(RL.divide(40)));
    var AJFactor_SD_offset = ee.Image(4.4167).add(ee.Image(0.83).multiply(RL.divide(40)));
    // y = (mx+b)*100 per the hidden conversion done in 4.4
    var AJFactor_SD = ee.Image(AJFactor_SD_slope).multiply(estimate_sd).add(ee.Image(AJFactor_SD_offset));
    AJFactor_SD = AJFactor_SD.divide(ee.Image(10000));
    var AJFactor_SD_RL = ee.Image(-16.69).multiply(ee.Image(RL).log()).add(160.29);
    AJFactor_SD_RL = AJFactor_SD_RL.divide(ee.Image(100));
    var AJ_sd = estimate_sd.multiply(AJFactor_SD).multiply(AJFactor_SD_RL);
    // From Figure 4.1 in the spreadsheet
    var estimate_KM_exp_image = ee.Image.constant(-0.0245).select(['constant'],['IMERG_30min']).addBands(ee.Image(-0.014).select(['constant'],['IMERG_1hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.01175).select(['constant'],['IMERG_2hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0095).select(['constant'],['IMERG_3hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.005).select(['constant'],['IMERG_6hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0035).select(['constant'],['IMERG_12hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.002).select(['constant'],['IMERG_24hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0001).select(['constant'],['IMERG_month']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0245).select(['constant'],['IMERG_uncal_30min']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.014).select(['constant'],['IMERG_uncal_1hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.01175).select(['constant'],['IMERG_uncal_2hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0095).select(['constant'],['IMERG_uncal_3hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.005).select(['constant'],['IMERG_uncal_6hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0035).select(['constant'],['IMERG_uncal_12hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.002).select(['constant'],['IMERG_uncal_24hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0001).select(['constant'],['IMERG_uncal_month']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0095).select(['constant'],['TRMM_3hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.005).select(['constant'],['TRMM_6hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0035).select(['constant'],['TRMM_12hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.002).select(['constant'],['TRMM_24hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0001).select(['constant'],['TRMM_month']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.002).select(['constant'],['CHIRPS_24hour']) );
    estimate_KM_exp_image = estimate_KM_exp_image.addBands(ee.Image(-0.0001).select(['constant'],['CHIRPS_month']) );  
    var estimate_KM = ee.Image(19.5).multiply(ee.Image(ee.Image(estimate_mean).multiply(ee.Image(estimate_KM_exp_image)).exp()));
    app.AJ_PMP = AJ_mean.add(estimate_KM.multiply(AJ_sd));
    // print(app.AJ_PMP)
    // old PMP from https://code.earthengine.google.com/c0fe76e6ce42aa172ad720765e4a2651
    app.frequency_factor = (max_precip.subtract(estimate_mean_n1)).divide(estimate_sd_n1);
    app.PMP = (estimate_mean).add(app.frequency_factor.multiply(estimate_sd));
    app.PMP = app.PMP.addBands(app.AJ_PMP.select(
      ['IMERG_30min','IMERG_1hour','IMERG_2hour','IMERG_3hour','IMERG_6hour','IMERG_12hour','IMERG_24hour','IMERG_month','IMERG_uncal_30min','IMERG_uncal_1hour','IMERG_uncal_2hour','IMERG_uncal_3hour','IMERG_uncal_6hour','IMERG_uncal_12hour','IMERG_uncal_24hour','IMERG_uncal_month','TRMM_3hour','TRMM_6hour','TRMM_12hour','TRMM_24hour','TRMM_month','CHIRPS_24hour','CHIRPS_month'],
      ['AJ_IMERG_30min','AJ_IMERG_1hour','AJ_IMERG_2hour','AJ_IMERG_3hour','AJ_IMERG_6hour','AJ_IMERG_12hour','AJ_IMERG_24hour','AJ_IMERG_month','AJ_IMERG_uncal_30min','AJ_IMERG_uncal_1hour','AJ_IMERG_uncal_2hour','AJ_IMERG_uncal_3hour','AJ_IMERG_uncal_6hour','AJ_IMERG_uncal_12hour','AJ_IMERG_uncal_24hour','AJ_IMERG_uncal_month','AJ_TRMM_3hour','AJ_TRMM_6hour','AJ_TRMM_12hour','AJ_TRMM_24hour','AJ_TRMM_month','AJ_CHIRPS_24hour','AJ_CHIRPS_month'])
    );
    var BandSelectValue = app.filters.bandview.getValue();
    var selectString;
    if(BandSelectValue=='IMERG 30 min'){
      selectString='IMERG_30min';
    } else if(BandSelectValue=='IMERG 1 hour'){
      selectString='IMERG_1hour';
    } else if(BandSelectValue=='IMERG 2 hour'){
      selectString='IMERG_2hour';
    } else if(BandSelectValue=='IMERG 3 hour'){
      selectString='IMERG_3hour';
    } else if(BandSelectValue=='IMERG 6 hour'){
      selectString='IMERG_6hour';
    } else if(BandSelectValue=='IMERG 12 hour'){
      selectString='IMERG_12hour';
    } else if(BandSelectValue=='IMERG 24 hour'){
      selectString='IMERG_24hour';
    } else if(BandSelectValue=='IMERG month'){
      selectString='IMERG_month';
    } else if(BandSelectValue=='TRMM 3 hour'){
      selectString='TRMM_3hour';
    } else if(BandSelectValue=='TRMM 6 hour'){
      selectString='TRMM_6hour';
    } else if(BandSelectValue=='TRMM 12 hour'){
      selectString='TRMM_12hour';
    } else if(BandSelectValue=='TRMM 24 hour'){
      selectString='TRMM_24hour';
    } else if(BandSelectValue=='TRMM month'){
      selectString='TRMM_month';
    } else if(BandSelectValue=='CHIRPS 24 hour'){
      selectString='CHIRPS_24hour';
    } else if(BandSelectValue=='CHIRPS month'){
      selectString='CHIRPS_month';
    } else if(BandSelectValue=='Uncalibrated IMERG 30 min'){
      selectString='IMERG_uncal_30min';
    } else if(BandSelectValue=='Uncalibrated IMERG 1 hour'){
      selectString='IMERG_uncal_1hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 2 hour'){
      selectString='IMERG_uncal_2hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 3 hour'){
      selectString='IMERG_uncal_3hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 6 hour'){
      selectString='IMERG_uncal_6hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 12 hour'){
      selectString='IMERG_uncal_12hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 24 hour'){
      selectString='IMERG_uncal_24hour';
    } else if(BandSelectValue=='Uncalibrated IMERG month'){
      selectString='IMERG_uncal_month';
    }
    // TODO; add image bands to drop down here
    if(app.printStatements) {
      app.MainMap.layers().remove(app.MainMap.layers().get(0));
      // app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(app.PMP), {min:0, max:100, bands:selectString, palette:app.WhiteToBlue}, "PMP", true));
      // app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(app.DDF_Series), {}, "app.DDF_Series", false));    
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(max_precip), {}, "max_precip", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(RL), {}, "RL", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(estimate_mean), {}, "estimate_mean", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(estimate_mean_n1), {}, "estimate_mean_n1", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(mean_ratio), {}, "mean_ratio", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJFactor_mean), {}, "AJFactor_mean", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJFactor_mean_RL), {}, "AJFactor_mean_RL", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJ_mean), {}, "AJ_mean", false));
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(estimate_sd), {}, "estimate_sd", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(estimate_sd_n1), {}, "estimate_sd_n1", false));  
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(sd_ratio), {}, "sd_ratio", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJFactor_SD), {}, "AJFactor_SD", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJFactor_SD_RL), {}, "AJFactor_SD_RL", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(AJ_sd), {}, "AJ_sd", false)); 
      app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(estimate_KM), {}, "estimate_KM", false)); 
    }
    app.MainMap.layers().set(0, ui.Map.Layer(ee.Image(app.PMP), {opacity:0}, "PMP", true));
    app.updateMapLayer();
    app.makeChartData(app.getSelectedFeatures());
  };
  app.updateMapLayer = function() {
    var BandSelectValue = app.filters.bandview.getValue();
    var selectString,minval,maxval,colorramp;
    if(BandSelectValue=='IMERG 30 min') {
      minval = 10.0;
      maxval = 90.0;
      colorramp = ['1621a2', 'ffffff', '03ffff', '13ff03', 'efff00', 'ffb103', 'ff2300'];
      selectString = 'IMERG_30min';
    } else if(BandSelectValue=='IMERG 1 hour'){
      selectString='IMERG_1hour';
    } else if(BandSelectValue=='IMERG 2 hour'){
      selectString='IMERG_2hour';
    } else if(BandSelectValue=='IMERG 3 hour'){
      selectString='IMERG_3hour';
    } else if(BandSelectValue=='IMERG 6 hour'){
      selectString='IMERG_6hour';
    } else if(BandSelectValue=='IMERG 12 hour'){
      selectString='IMERG_12hour';
    } else if(BandSelectValue=='IMERG 24 hour'){
      selectString='IMERG_24hour';
    } else if(BandSelectValue=='IMERG month'){
      selectString='IMERG_month';
    } else if(BandSelectValue=='TRMM 3 hour'){
      selectString='TRMM_3hour';
    } else if(BandSelectValue=='TRMM 6 hour'){
      selectString='TRMM_6hour';
    } else if(BandSelectValue=='TRMM 12 hour'){
      selectString='TRMM_12hour';
    } else if(BandSelectValue=='TRMM 24 hour'){
      selectString='TRMM_24hour';
    } else if(BandSelectValue=='TRMM month'){
      selectString='TRMM_month';
    } else if(BandSelectValue=='CHIRPS 24 hour'){
      selectString='CHIRPS_24hour';
    } else if(BandSelectValue=='CHIRPS month'){
      selectString='CHIRPS_month';
    } else if(BandSelectValue=='Uncalibrated IMERG 30 min'){
      selectString='IMERG_uncal_30min';
    } else if(BandSelectValue=='Uncalibrated IMERG 1 hour'){
      selectString='IMERG_uncal_1hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 2 hour'){
      selectString='IMERG_uncal_2hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 3 hour'){
      selectString='IMERG_uncal_3hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 6 hour'){
      selectString='IMERG_uncal_6hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 12 hour'){
      selectString='IMERG_uncal_12hour';
    } else if(BandSelectValue=='Uncalibrated IMERG 24 hour'){
      selectString='IMERG_uncal_24hour';
    } else if(BandSelectValue=='Uncalibrated IMERG month'){
      selectString='IMERG_uncal_month';
    }
    app.MainMap.layers().get(0).setVisParams({min:minval,max:maxval,palette:colorramp, bands:selectString, opacity:1});
    app.addColorLegend();
  };
  app.updatePoint = function() {
    var userlat = parseFloat(app.filters.userLat.getValue());
    var userlon = parseFloat(app.filters.userLon.getValue());
    app.MapClickEvent({lon: userlon,lat: userlat});
    // app.MainMap.layers().remove(app.MainMap.layers().get(1));
    // app.MainMap.layers().insert(1, ui.Map.Layer(app.selectedPoint));
    // app.makecharts();
  };
  app.makecharts = function() {
    app.chartSeries.clear();
    var rawSeries = ui.Chart.image.series({
      imageCollection: app.DDF_Data.filterDate('2001-01-01','2020-12-31'),
      region: app.selectedPoint,
      reducer: ee.Reducer.first(),
      scale: 100
    });
    rawSeries.setOptions({
      title: 'Aggregate precipitation data',
      vAxis: {
        title: 'mm per duration by month'
      }
    });
    var ffSeries = ui.Chart.image.byRegion({
      image: app.frequency_factor,
      regions: app.selectedPoint,
      reducer: ee.Reducer.first(),
      scale: 100
    });
    ffSeries.setOptions({
      title: 'Frequency factor',
      vAxis: {
        title: 'frequency'
      }
    });
    var seriesChart = ui.Chart.image.series({
      imageCollection: app.DDF_Series,
      region: app.selectedPoint,
      reducer: ee.Reducer.first(),
      scale: 100
    });
    seriesChart.setOptions({
      title: 'Depth, Duration, Frequency curve data',
      vAxis: {
        title: 'mm per duration'
      }
    });
    seriesChart.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var image = ee.Image(app.DDF_Series.filter(equalDate).first());
      var mapLayer = ui.Map.Layer(image, {
        min: 0,
        max: 60,
        palette: ['000096','0064ff', '00b4ff', '33db80', '9beb4a', 'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'],
        bands: seriesName
      });
      // Map.layers().reset([mapLayer, point]);
      // Show a label with the date on the map.
      // label.setValue((new Date(xValue)).toUTCString());
    });
    var PMPPoint = app.PMP.reduceRegions(app.selectedPoint, ee.Reducer.first(),30).getInfo();
    PMPPoint = ee.Feature(PMPPoint.first());
    var IMERGLIST = ee.List([PMPPoint.getNumber('IMERG_30min'),PMPPoint.getNumber('IMERG_1hour'),PMPPoint.getNumber('IMERG_2hour'),PMPPoint.getNumber('IMERG_3hour'),
      PMPPoint.getNumber('IMERG_6hour'),PMPPoint.getNumber('IMERG_12hour'),PMPPoint.getNumber('IMERG_24hour')
      //,ee.Feature(test.first()).getNumber('IMERG_month')
      ]);
    var UNCALIMERGLIST = ee.List([PMPPoint.getNumber('IMERG_uncal_30min'),PMPPoint.getNumber('IMERG_uncal_1hour'),PMPPoint.getNumber('IMERG_uncal_2hour'),PMPPoint.getNumber('IMERG_uncal_3hour'),
      PMPPoint.getNumber('IMERG_uncal_6hour'),PMPPoint.getNumber('IMERG_uncal_12hour'),PMPPoint.getNumber('IMERG_uncal_24hour')
      //,ee.Feature(test.first()).getNumber('IMERG_month')
      ]);
    var TRMMLIST = ee.List([0,0,0,PMPPoint.getNumber('TRMM_3hour'),PMPPoint.getNumber('TRMM_6hour'),PMPPoint.getNumber('TRMM_12hour'),
      PMPPoint.getNumber('TRMM_24hour')
      //,ee.Feature(test.first()).getNumber('TRMM_month')
      ]);
    var CHIRPSLIST = ee.List([0,0,0,0,0,0,PMPPoint.getNumber('CHIRPS_24hour')
      //,ee.Feature(test.first()).getNumber('CHIRPS_month')
      ]);
    var XLIST = ee.List([0.5,1,2,3,6,12,24
      //,720
      ]);
    if(app.printStatements) {print("PMP", ee.Array([IMERGLIST,UNCALIMERGLIST,TRMMLIST,CHIRPSLIST]))}
    // GEE TODO: fix axis here
    var pmpchart = ui.Chart.array.values(ee.Array([IMERGLIST,UNCALIMERGLIST,TRMMLIST,CHIRPSLIST]), 1, XLIST)
      .setChartType('LineChart')
      .setSeriesNames(['IMERG','IMERG (polar-orbiting microwave, uncalibrated)', 'TRMM', 'CHIRPS'])
      .setOptions({
        title: 'Probable Maximum Precipitation',
        vAxes: {
          0: {
            title: 'Precipitation (mm)'
          }
        },
        hAxis: {
          title: 'Duration (hour)'
        },
        interpolateNulls: true,
        pointSize: 0,
        lineWidth: 1
    });
    app.chartSeries.add(ui.Panel([rawSeries,ffSeries,seriesChart,pmpchart], ui.Panel.Layout.Flow("vertical")));
  };
};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    legendPrimePanel: ui.Panel([
      ui.Label({
        value: "GEEPiMP", 
        style: {fontWeight: "bold", fontSize: "18px", margin: "0 0 4px 0", padding: "0"}
      }),
      ui.Label({
        value: "Google Earth Engine Probable (interative) Maximal Precipitation calculator", 
        style: {fontWeight: "notmal", fontSize: "14px", margin: "0 0 4px 0", padding: "0"}
      }),
      ui.Label({
        value: "This PMP Application computes the probable maximum precipitation (PMP) using the WMO Hershfield approach as well as the underlying IMERG, CHIRPS, & TRMM aggregate precipitation and Depth Duration Frequency Data for the period (10/2000-10/2020).  Thanks to the" +
        " Google Earth Engine team for the fantastic platform.",
       style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0", whiteSpace:'pre-wrap', textAlign:'justify'}
      }),
      ui.Panel({
        widgets: [
          ui.Label({
            value: "By: ", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }),
          ui.Label({
            value: " Kenneth Ekpetere ", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }).setUrl("https://geog.ku.edu/ekpetere-kenneth"),
          ui.Label({
            value: " & ", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }),
          ui.Label({
            value: " Xingong Li ", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }).setUrl("https://geog.ku.edu/people/xingong-li"),
          ui.Label({
            value: " & ", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }),
          ui.Label({
            value: " Jim Coll", 
            style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
          }).setUrl("https://jimcoll.github.io/")
          ],
        layout: ui.Panel.Layout.flow("horizontal")}),
      ui.Label({
        value: "See the paper published in xxx.", 
        style: {fontWeight: "normal", fontSize: "12px", maxWidth: "500px", margin: "0 0 4px 0", padding: "0"}
      }).setUrl("https://www.youtube.com/watch?v=khhdmoNryWI")
    ])
  }; 
  app.filters = {
    userLat: ui.Textbox('DD.dddd', '38.9633114', app.updatePoint),
    userLon: ui.Textbox('DD.dddd', '-95.2579977', app.updatePoint),
    timeslice: ui.Select({items: [app.timeSlice_year, app.timeSlice_winter, app.timeSlice_spring, app.timeSlice_summer, app.timeSlice_fall,
                                  app.timeSlice_jan, app.timeSlice_feb, app.timeSlice_mar, app.timeSlice_apr, app.timeSlice_may,
                                  app.timeSlice_jun, app.timeSlice_jly, app.timeSlice_aug, app.timeSlice_sep, app.timeSlice_oct, 
                                  app.timeSlice_nov, app.timeSlice_dec], 
                         value: app.timeSlice_year,
                         onChange: app.sliceDataset}),
    bandview: ui.Select({items: [app.bandview_IMERG_30min, app.bandview_IMERG_1hour, app.bandview_IMERG_2hour, app.bandview_IMERG_3hour, 
                                 app.bandview_IMERG_6hour, app.bandview_IMERG_12hour,
                                 app.bandview_IMERG_24hour, app.bandview_TRMM_3hour, app.bandview_TRMM_6hour, app.bandview_TRMM_12hour,
                                 app.bandview_TRMM_24hour, app.bandview_CHIRPS_24hour, app.bandview_IMERG_month, app.bandview_TRMM_month,
                                 app.bandview_CHIRPS_month], 
                         value: app.bandview_IMERG_30min,
                         onChange:app.updateMapLayer})
  };
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Panel({widgets: [ui.Label('PMP time aggragate window:'), app.filters.timeslice],layout: ui.Panel.Layout.flow("vertical")}),
      ui.Panel({widgets: [ui.Label('Band to visualize:'), app.filters.bandview],layout: ui.Panel.Layout.flow("vertical")})
    ],
    layout: ui.Panel.Layout.flow("horizontal")
  });
  app.filters.points_panel = ui.Panel([
    ui.Label('Click on the map or enter a point:'),
    ui.Panel({widgets: [ui.Label('Latitude:'), app.filters.userLat,ui.Label('Longitude:'), app.filters.userLon],layout: ui.Panel.Layout.flow("horizontal")})
  ]);
  app.chartSeries = ui.Panel();
  app.LegendColorBlock = {
    imerg30min: ui.Thumbnail({image: ee.Image.pixelLonLat().select(0), params: app.makeColorBarParams(app.precippalette), style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px', shown: false},}),
    imerg30minvalues: ui.Panel({widgets: [ui.Label("10", {margin: '4px 8px'}), ui.Label(("50"), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}), ui.Label("100+ mm of water", {margin: '4px 8px'})], layout: ui.Panel.Layout.flow('horizontal'), style:{shown: false}})
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  // var userlat = app.filters.userLat.getValue();
  // var userlon = app.filters.userLon.getValue();
  // app.selectedPoint = ee.Geometry.Point([parseFloat(userlon), parseFloat(userlat)]);
  app.MainMap = ui.Map();
  app.MainMap.style().set({cursor: "crosshair"});
  app.MainMap.layers().insert(0, ui.Map.Layer(ee.Image(0),{},"blank",false,0));
  // app.MainMap.layers().insert(1, ui.Map.Layer(app.selectedPoint));
  app.MainMap.onClick(app.MapClickEvent);
  var Legend = ui.Panel({
    widgets: [
      app.intro.legendPrimePanel,
      app.filters.panel,
      app.filters.points_panel,
      app.LegendColorBlock.imerg30min,
      app.LegendColorBlock.imerg30minvalues,
      // app.filters.AOI_select_label,
      app.chartSeries
      // ui.Panel({
      //   widgets: [app.LCLegend.panel, app.USLegend.panel],
      //   layout: ui.Panel.Layout.flow("horizontal"),
      //   style: {padding: "4px 4px"}
      // }),
      // app.animation.panel1,
      // app.animation.panel2,
      // app.animation.panel3,
      // app.ChartTitle,
      // app.TimeseriesResults
    ],
    layout: ui.Panel.Layout.flow("vertical"), 
    style: {position: "top-left", padding: "8px 15px"}
  });
  ui.root.insert(0, Legend);                            //Add the legend to the UI
  ui.root.insert(1, app.MainMap);
  // app.sliceDataset();
  // app.addBaseData();
  // app.CreateBaseDataset();
};
ui.root.widgets().reset();
app.boot();
// var userlat = app.filters.userLat.getValue();
// var userlon = app.filters.userLon.getValue();
// app.MapClickEvent()