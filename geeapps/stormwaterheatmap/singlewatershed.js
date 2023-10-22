/**** Start of imports. If edited, may not auto-convert in the playground. ****/
//var image = ee.Image("projects/ee-stormwaterheatmap/assets/pasu_painted");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
/**
 * @ Author: Christian Nilsen
 * @ Create Time: 2022-03-04 22:01:53
 * @ Modified by: Your name
 * @ Modified time: 2022-03-05 21:21:08
 * @ Description:
 */
// ========================================================================== //
// Load Modules
// ========================================================================== //
var data = require("users/stormwaterheatmap/apps:data/data_dictionary.js");
var Style = require("users/stormwaterheatmap/apps:Modules/Style");
var charts = require("users/stormwaterheatmap/apps:Modules/chart.js");
var helpers = require("users/stormwaterheatmap/apps:Modules/helpers");
var fonts = Style.fonts;
var layerProperties = data.rasters;
print(data)
// ========================================================================== //
// Style defaults  
// ========================================================================== //
var colors = Style.colors;
var fonts = Style.fonts;
var featureStyle = {
    color: "white",
    fillColor: "00000000",
    width: 0.5,
};
// ========================================================================== //
// /*Global Variables-------------------------------------------------------------------------------------
// ========================================================================== //
var clicked_basin; // user clicked basin 
var clicked_basin_geom; // geometry of user clicked basin 
var clicked_basin_fc = ee.FeatureCollection([]); // feature collection of clicked basin 
var WS = data.vector_dict["Puget Sound Assessment Units"]; //Watershed data set  
/*
 * //Notes on layers - static layer order for this page: 
    0. Raster Imagery 
    1. Watershed outlines [off when a user selects a ]
    2. Opacity mask 
    3. Selected watershed outline 
 * @returns 
 */
// ========================================================================== //
//  Funcitons
// ========================================================================== //
// ========================================================================== //
// Events 
// map click to select watershed 
function handle_map_click(location) {
    var clicked_point = ee.Geometry.Point(location.lon, location.lat); // point that is clicked 
    clicked_basin_fc = WS.filterBounds(clicked_point); //use for display
    clicked_basin = ee.Feature(clicked_basin_fc.first());
    clicked_basin_geom = clicked_basin_fc.first().geometry();
    //Show the accept_button button 
    accept_button.style().set({
        shown: true,
    });
    mapPanel.style().set({
        cursor: "hand",
    });
    //make an opacity mask to display watershed
    var con = ee.Image(1).byte().clip(clicked_basin_geom); //check
    var shade = ee.Image(1).byte();
    var opacityMask = shade.where(shade.eq(con), 0).selfMask();
    var empty = ee.Image().byte();
    var outline = empty.paint(clicked_basin_fc, 1, 2);
    mapPanel.layers().set(2,{
      eeObject:
        opacityMask, 
        opacity: 0.6,
        visParams:{
            palette: "000000",
        },
        name: "Selected Basin Mask"}
    );
    mapPanel.layers().set(3,{
      eeObject: outline, 
      visParams: {
            palette: "whitesmoke",
        },
        name: "Selected Basin Outline"}
    );
    //Zoom to the selected basin
    mapPanel.centerObject(clicked_basin);
    return clicked_basin;
}
// ========================================================================== //
// UI Functions 
/**
 *  makes a horizontal line 
 */
function hline() {
    var line = ui.Label({
        value: "null",
        style: {
            height: "0px",
            border: "1px solid whitesmoke",
            stretch: "horizontal",
        },
    });
    return line;
}
// ========================================================================== //
var cards = function (title, widgetItems) {
    var cardTitle = ui.Label({
        value: title,
        style: fonts.H2,
    });
    var wholeCard = ui.Panel({
        widgets: widgetItems,
        style: {
            border: "24px solid whitesmoke",
            padding: "24px",
        },
    });
    wholeCard.insert(0, cardTitle);
    return wholeCard;
};
var vectors_dict = data.vector_dict;
//Get watershed values from the data list
var watershedSelect = ui.Select({
    items: [
        "Puget Sound Assessment Units",
        "NHDPlus High Resolution Watershed Dataset",
        "HUC12: USGS Watershed Boundary Dataset",
    ],
    //placeholder: 'Select a value',
    value: "Puget Sound Assessment Units",
    onChange: function (selected) {
        WS = vectors_dict[selected];
      mapPanel.layers().set(1,{
      eeObject:WS.style(featureStyle),
      name: selected})
    }
       //oct
    });
// Widgets 
// Buttons 
// Reset button 
var reset_button = ui.Button({
    label: "Reset",
    style: {
        shown: false
    },
    onClick:
        /**
         * Onclick function clears the analyze Panel 
         * Clears map layer and resets to tss ? maybe not needed here  
         * hides the reset_button 
         */
        function () {
            print("Reset");
            analyzePanel.clear();
            clicked_basin = null; // user clicked basin 
            clicked_basin_geom = null; // geometry of user clicked basin 
            clicked_basin_fc = ee.FeatureCollection([]); 
            mapPanel.layers().set(2,{shown:false})
            mapPanel.layers().set(3,{shown:false})
            //mapPanel.layers().set(0, data.cocs["Total Suspended Solids Concentration"])  
            reset_button.style().set({
                shown: false
            });
        },
});
var accept_button = ui.Button({
    label: "Analyze Selected Watershed ",
    style: {
        shown: false,
    },
    /**
     * stop listening for clicks 
     * Show the reset button 
     * resize the main panel 
     * Make those reports 
     */
    onClick: function () {
        mapPanel.unlisten();
        reset_button.style().set({
            shown: true
        });
        mainPanel.style().set({
            shown: true,
            //     height: '85%',
            maxWidth: "32.8%",
        });
        makeReports();
    },
});
var inspect_button = ui.Button({
    label: "Activate inspector",
    onClick:
        /**
         * Function to handle user click on Analyze button 
         */
        function handle_inspect_click() {
            mapPanel.style().set({
                cursor: "crosshair",
            });
            var WSname = watershedSelect.getValue();
            WS = vectors_dict[WSname];
            //listen to mapPanel for user click. Then fire handle map click
            mapPanel.onClick(function (location) {
                handle_map_click(location);
            });
        }
        ,
});
//Panel to hold inspect and accept buttons 
var buttonPanel = ui.Panel({
    widgets: [
        inspect_button,
        accept_button,
    ],
    layout: ui.Panel.Layout.flow("horizontal", true),
    style: {
        stretch: "horizontal",
        margin: "0px",
        padding: "0px",
    },
});
//Labels 
var watershedSelectLabel = ui.Label({
    value: "Select a watershed dataset to aggregate data:",
    style: Style.fonts.Caption2,
});
var inspect_helper_text = ui.Label({
    value: 'Click "Activate Inspector" to enable watershed selection:',
    style: Style.fonts.Caption2,
});
//analyze panel holds reports 
var analyzePanel = ui.Panel({
    style: {
        shown: true
}});
//Panels 
var legendPanel = ui
    .Panel({
        style: {
            position: "bottom-right",
            padding: "12 px",
            backgroundColor: colors.transparent,
            stretch: "both",
            shown: true
        },
    })
    .setLayout(ui.Panel.Layout.flow("vertical"));
// Widget Functions 
// main map panel 
function makeMapPanel() {
    var map = ui.Map();
    map.setOptions("Dark", Style.mapStyles);
    map.setControlVisibility({
        all: false,
        zoomControl: true,
        mapTypeControl: true,
        layerList: true,
        fullscreenControl: true,
    });
    return map;
}
// layer drop down
function make_layer_dropdown() {
    var layers_list = data.cocs;
    layers_list["Land Cover"] = data.rasters["Land Cover"];
    layers_list["Flow Duration Index"] = data.rasters["Flow Duration Index"];
    layers_list["Imperviousness"] = data.rasters["Imperviousness"];
    layers_list["Population Density"] = data.rasters["Population Density"];
    layers_list["Precipitation (mm)"] = data.rasters["Precipitation (mm)"];
    layers_list["Runoff (mm)"] = data.rasters["Runoff (mm)"];
    var select_layer = ui.Select({
        items: Object.keys(layers_list),
        onChange: function (value) {
          var layerImg = layers_list[value].layer 
           mapPanel.layers().set(0,layerImg)
           //mapPanel.add(
             legendPanel.clear().add(
             helpers.makeLegend(layers_list[value]))
        },
    });
    var layer_panel = ui.Panel({
        widgets: [ui.Label({
          value: "Select Layer to Display:",
          style: fonts.H4
        }
          ), select_layer],
        layout: ui.Panel.Layout.flow('vertical',true),
        style: {
            position: "bottom-right"
        },
    });
    mapPanel.add(layer_panel);
}
/**
 * Makes the intro text 
 * @returns ui.Panel with text 
 */
function make_intro_text_panel() {
    var psau = ui.Label({
        style: {
            //border: '1px solid red',
            margin: "0px 8px",
            //padding: '0px, 0px, 0px, 0px'},
        },
        value: "Puget Sound Watershed Characterization Project ↗",
        targetUrl: "https://apps.ecology.wa.gov/coastalatlas/wc/landingpage.html",
    });
    var description = ui.Label({
        value: "Explore watershed data by selecting a watershed from the map." +
            "\nBy default, watersheds shown are Assessment Units from the",
        style: {
            //border: '1px solid blue',
            whiteSpace: "pre", //margin: '0px',
            margin: "8px 8px 0px 8px",
        },
    });
    var description2 = ui.Label({
        value: "To select a different watershed data set, select one below:",
    });
    var panel = ui.Panel({
        widgets: [description, psau, description2],
        style: {
            padding: "0px",
        },
    });
    return panel;
}
// ========================================================================== //
// Report functions 
/**
 * 
 * @param {geometry} region 
 * @param {integer} scale 
 * @returns ui.chart with landcover summary 
 */
function make_landcover_chart(region, scale){
  var landcover_object = data.rasters["Land Cover"]
  var chart = charts.pieChart(landcover_object,region,scale)
  return(chart)
}
/**
 * 
 * @param {geometry} region 
 * @param {integer} scale 
 * @returns ui.Panel with concentrations 
 */
function make_concentration_panel(region, scale) {
    var pan = ui.Panel({
        layout: ui.Panel.Layout.flow("horizontal", true),
    });
    var concentration_objects = [
        'Total Copper Concentration',
        'Total Kjeldahl Nitrogen Concentration',
        'Total Phosphorus Concentration',
        'Total Suspended Solids Concentration',
        'Total Zinc Concentration'
    ]
    pan.add(
        //charts.coc_mean_conc(data.cocs["Total Copper Concentration"]),region,scale).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[1]], region, scale)).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[2]], region, scale)).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[3]], region, scale)).add(
       // charts.coc_mean_conc(data.cocs["Total Copper Concentration"]), region, scale).add(
        charts.coc_mean_conc(data.cocs[concentration_objects[4]], region, scale))
    return (pan) 
}
/**
 * Reporting on loads
 * @param {geometry} region 
 * @param {*integer} scale 
 * @returns ui.Panel with loads calculated 
 */
function make_load_panel(region, scale) {
    var pan = ui.Panel({
        layout: ui.Panel.Layout.flow("horizontal", true),
        style: {
            stretch: "horizontal",
        },
    });
    var Load_objects = [
        "Total Copper Load",
        "Total Kjeldahl Nitrogen Load",
        "Total Phosphorus Load",
        "Total Suspended Solids Load",
        "Total Zinc Load",
    ];
    pan
        .add(charts.coc_load(data.cocs[Load_objects[0]], region, scale))
        .add(charts.coc_load(data.cocs[Load_objects[1]], region, scale))
        .add(charts.coc_load(data.cocs[Load_objects[2]], region, scale))
        .add(charts.coc_load(data.cocs[Load_objects[3]], region, scale))
        .add(charts.coc_load(data.cocs[Load_objects[4]], region, scale));
    return pan;
}
/**
 * Main Reporting function. 
 * Adds reports to analyzePanel 
 */
function makeReports() {
    //get the scale for analysis 
    var report_scale = mapPanel.getScale();
    // ========================================================================== //
    // Watershed info
    //Precipitation 
    var pchart = charts.littleNum(
        layerProperties["Precipitation (mm)"],
        clicked_basin_geom,
        report_scale,
        "mean"
    );
        // Runoff 
        var runoff_num = charts.littleNum(
        layerProperties["Runoff (mm)"],
        clicked_basin_geom,
        report_scale,
        "mean"
    );
    // Imperviousness 
    var impNum = charts.littleNum(
        layerProperties.Imperviousness,
        clicked_basin_geom,
        report_scale,
        "percent"
    );
    // Land cover 
    //panel to hold watershed info 
    var watershed_info_panel = ui.Panel({
        widgets: [pchart, runoff_num, impNum],
        layout: ui.Panel.Layout.flow("horizontal", false),
        style: {
            margin: 0,
            padding: 0,
            stretch: "both"
        }, //',border:'1px solid green'}
    });
       //flow duration index 
    var fdr = layerProperties["Flow Duration Index"].layer.eeObject.
    reduceRegion({
      reducer: ee.Reducer.mean(), 
      geometry: clicked_basin_geom, 
      scale: report_scale, 
      bestEffort: true, 
    })
    var fdr_value = ee.Number(fdr.get("flow_duration_index")).format('%.2f')
    //make the fdr panel 
    var fdr_chart = charts.simpleBar(fdr.get("flow_duration_index"))
    fdr_chart.style().set({height: '120px'})
    var fdr_panel = ui.Panel({
      widgets: [
        ui.Label({
          value: 'Flow Duration Index', 
          style: fonts.H3}), 
        fdr_chart, 
        ui.Label({value: 'Degree to which the hydrology has changed due to urbanization. '+ 
          '1 = Forested hydrology; 10 = Most severe urbanized change', 
          style: fonts.Caption2}), 
        ui.Label({
         value: "more info ↗",
        targetUrl: "https://www.stormwaterheatmap.org/docs/Data%20Layers/flow_duration_index",
        style: fonts.Caption3
        }),
        ] 
     // layout: 
      //style: 
    })
    fdr_value.evaluate(function(result) {
      // Display the bands of the selected image.
      fdr_panel.insert(1,ui.Label({value:result, 
      style: fonts.Body2}))})
    var watershed_info_card = cards("Hydrology Info", [
        hline(),
        //landcover_chart, 
        watershed_info_panel,
        hline(), 
        fdr_panel
    ]);
    // add it to the analyzePanel
    analyzePanel.add(watershed_info_card);
    // Landcover 
     var landcover_chart = make_landcover_chart(clicked_basin_geom,report_scale)
    var landcover_card = cards("Land Cover", 
    [hline(), landcover_chart
    ]);
    analyzePanel.add(landcover_card)
    // ========================================================================== //
    //   Pollutant Concentrations 
    var concentration_label = ui.Label({
        value: "more info ↗",
        targetUrl: "https://www.stormwaterheatmap.org/docs/Data%20Layers/pollutant_concentration",
        style: fonts.Caption3,
    });
    var concentration_card = cards("Predicted Stormwater Concentrations", [
        concentration_label,
        hline(),
        make_concentration_panel(clicked_basin_geom, report_scale),
    ]);
    // add it to the panel 
    analyzePanel.add(concentration_card);
    // ========================================================================== //
    //   Pollutant Loads 
    var load_label = ui.Label({
        value: "more info ↗",
        targetUrl: "https://www.stormwaterheatmap.org/docs/Data%20Layers/pollutant_load",
        style: fonts.Caption3,
    });
    var load_card = cards("Predicted Stormwater Loads", [
        load_label,
        hline(),
        make_load_panel(clicked_basin_geom, report_scale),
    ]);
    //add it to the analyzePanel 
    //need to check on units here
    //analyzePanel.add(load_card);
}
/* 
Set up User Interface
----------------------------------------------------------------------------------------------------
*/
// Clear the default UI
var mapPanel = makeMapPanel();
var mainPanel = helpers.makeMainPanel("Analyze a Watershed");
mainPanel.style().set({
    height: "75%"
});
//---------------- set the initial view
var intro_text_panel = make_intro_text_panel();
function mapInit() {
    ui.root.clear();
    ui.root.setLayout(ui.Panel.Layout.flow("vertical"));
    mapPanel = makeMapPanel();
    ui.root.add(mapPanel);
    mapPanel.add(mainPanel);
    mainPanel.add(intro_text_panel);
    mainPanel.add(watershedSelectLabel);
    mainPanel.add(watershedSelect);
    mainPanel.add(inspect_helper_text);
    mapPanel.add(legendPanel);
    buttonPanel.add(reset_button);
    mainPanel.add(buttonPanel);
    mainPanel.add(analyzePanel);
    mapPanel
        .layers()
        .set(0, data.cocs["Total Suspended Solids Concentration"].layer);
  // 0. Raster Imagery 
  //   1. Watershed outlines [off when a user selects a ]
  //   2. Opacity mask 
  //   3. Selected watershed outline 
    WS = vectors_dict["Puget Sound Assessment Units"];
   //to do -> update this to a 
    mapPanel.layers().set(1,{
      eeObject:WS.style(featureStyle),
      name: "Puget Sound Assessment Units"})
    watershedSelect.setValue("Puget Sound Assessment Units");
    legendPanel.clear().add(
             helpers.makeLegend(data.cocs["Total Suspended Solids Concentration"]))
    helpers.make_tnc_map(mapPanel);
    make_layer_dropdown();
}
mapInit();