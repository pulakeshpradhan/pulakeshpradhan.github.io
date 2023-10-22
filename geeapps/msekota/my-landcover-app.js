// ****************************************************************************************************************** //
// ********************************* 5. Land Cover Statistics Dashboard - Lesotho *********************************** //
// ****************************************************************************************************************** //
// 2017 final land cover classification
var classification_baseline = ee.Image('users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2017_harmonized_postproc1')
                              .rename('constant');
// 2021 final land cover classification
var classification_postproc = ee.Image('users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2021_harmonized_postproc1')
                              .rename('constant');
// Allowed years for Sentinel-2 data extraction. No data available before 2016,
// and the L2A surface reflectance information starts in 2019 globally.
var years = {//'2015': 'users/ocsgeospatial/Lesotho/LCDB_Lesotho_v2_2',
             //'2016': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_2016_postproc',
             '2017': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2017_harmonized_postproc1',
             '2018': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2018_harmonized_postproc1',
             '2019': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2019_harmonized_postproc1',
             '2020': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2020_harmonized_postproc1',
             '2021': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2021_harmonized_postproc1',
             //'2022': 'users/ocsgeospatial/Lesotho/rf_lesotho_s2_60_10bands_kfold_2021_harmonized_postproc1',
                          };
// ****************************************************************************************************************** //
// Import local app dependencies
var composites = require('users/ocsgeospatial/functions:composites.js');
var drawingTools = require('users/ocsgeospatial/functions:drawing_tools.js');
var legends = require('users/ocsgeospatial/functions:legends.js');
var S2Masks = require('users/ocsgeospatial/functions:s2_masks.js');
var S2FCover = require('users/ocsgeospatial/functions:s2_fcover.js');
var RUSLEFactors = require('users/ocsgeospatial/functions:RUSLE_factors.js');
var palettes = require('users/gena/packages:palettes');
var bioDivMap = require('users/ocsgeospatial/functions:bioDivMap.js');
var charts = require('users/soilwatch/soilErosionApp:charts.js');
// Compute the low-resolution factors (based on 30-250m covariates) of the RUSLE equation
var R = RUSLEFactors.factorR();
// Import SRTM 30m DEM
var dem = ee.Image("USGS/SRTMGL1_003");
var slope_deg = ee.Terrain.slope(dem);
var slope_rad = slope_deg.multiply(ee.Image(Math.PI).divide(180));
var slope_aspect = ee.Terrain.aspect(dem);
var LS = RUSLEFactors.factorLS(slope_deg, slope_rad, slope_aspect);
// Import Lesoth boundaries
var country = ee.FeatureCollection("users/ocsgeospatial/Lesotho/lesotho_boundaries");
var counties = ee.FeatureCollection("users/ocsgeospatial/Lesotho/lesotho_catchments");
var aez = ee.FeatureCollection("users/ocsgeospatial/Lesotho/lesotho_aez");
// Class list
var classification_names = ['Built-Up',
                            'Cropland',
                            //'Degraded Cropland',
                            'Trees',
                            //'broadleaf',
                            'Water Body',
                            'Wetland',
                            //'River Bank',
                            'Shrubland',
                            'Grassland',
                            //'Degraded Grassland',
                            'Bare Surfaces',
                            //'Mines',
                            'Irrigated Cropland',
                            'Gullies'
                            ];
var classes = ee.Dictionary({
               'Built-Up': 1,
               'Cropland': 2, 
               'Trees': 4,
               'Water Body': 6,
               'Wetland': 7,
               'Shrubland': 9,
               'Grassland': 10,
               'Bare Surfaces': 12,
               'Irrigated Cropland': 14,
               'Gullies': 15
              });
// Corresponding color palette for the mapped land cover/crop classes
var classification_palette = [
  '#ea3f42', // 1.urban
  '#fbd278', // 2.croplands
  '#fbd278', // 3. degraded crop
  '#527300', // 4. needleleaf
  '#527300', // 5. broadleaf
  '#164fab', // 6. water
  '#7db4ff', // 7. wetlands
  '#164fab',  // 8. river banks
  '#a4e400', // 9. shrub
  '#d8febc',  // 10. grass
  '#d8febc', //11. degraded grass
  '#fffebb', // 12. barren
  '#fffebb',  // 13. mines
  '#95dfa5', // 14. Irrigated Cropland
  '#a4651d' // 15. Gullies
];
// Corresponding color palette for the mapped land cover/crop classes
var classification_palette_red = [
  '#ea3f42', // 1.urban
  '#fbd278', // 2.croplands
  '#527300', // 4. needleleaf
  '#164fab', // 6. water
  '#7db4ff', // 7. wetlands
  '#a4e400', // 9. shrub
  '#d8febc',  // 10. grass
  '#fffebb', // 12. barren
  '#95dfa5', // 14. Irrigated Cropland
  '#a4651d' // 15. Gullies
];
Map.centerObject(country);
Map.setOptions("TERRAIN");
// Center map on the country and plot it on the map
Map.addLayer(country.geometry(), {}, 'Lesotho Boundaries');
// Plot all land cover years
Object.keys(years).forEach(function(key) {
  var class_year = ee.Image(years[key]);
  Map.addLayer(class_year.clip(country.geometry()),
               {palette: classification_palette, min: 1, max: 15},
               'RF classification LCDB'+key);    
});
// **Initialize the Button Widgets for the Soil Erosion App GUI **/
// Load states in drop-down menu.
var statesDD = ui.Select([], 'Select Country');
var countiesDD = ui.Select([], 'Select Catchment');
// Load full administrative units list
var states = ee.FeatureCollection("FAO/GAUL/2015/level0")
             .distinct('ADM0_NAME').sort('ADM0_NAME')
             .filterMetadata('ADM0_NAME', 'equals', 'Lesotho')
             .map(function(feat){return feat.setGeometry(country.geometry())});
var statesNames = states.aggregate_array('ADM0_NAME');
// Automatically update drop-down menus based on administrative unit selection
statesNames.evaluate(function(states){
  statesDD.items().reset(states)
  statesDD.setPlaceholder('Select Country')
  statesDD.onChange(function(state){
    // once you select a state (onChange) get all counties and fill the dropdown
    countiesDD.setPlaceholder('Loading...')
    var counties = _getCounties(state);
    counties.evaluate(function(countiesNames){
      countiesDD.items().reset(countiesNames)
      countiesDD.setPlaceholder('Select Catchment')
      //countiesDD.onChange(function(substate){
        // once you select a country (onChange) get all sub-counties and fill the dropdown
        //subcountiesDD.setPlaceholder('Loading...')
        //classes.keys().add('All').evaluate(function(classesNames){
        //classesDD.items().reset(classesNames)
        //classesDD.setPlaceholder('Select a land cover')
        });
      });
    });
  //});
//});
// Filter the counties list to retrieve the ones matching the selected state
function _getCounties(state){
  var filteredCountiesNames = counties.aggregate_array('Catch_ID');
  return filteredCountiesNames.add(state).reverse()
}
/*
// Filter the sub-counties list to retrieve the ones matching the selected country
function _getSubcounties(state){
  // Given a state get all counties
  var feat = ee.Algorithms.If(
             ee.Number(counties.filterMetadata('ADM1_NAME', 'equals', state).size()).gt(0),
             ee.Feature(counties.filterMetadata('ADM1_NAME', 'equals', state).first()),
             ee.Feature(states.filterMetadata('ADM0_NAME', 'equals', state).first()).set({'ADM1_NAME': state})
             );
  var statefp = ee.String(ee.Feature(feat).get('ADM1_NAME'))
  var filteredCounties = subcounties.filterMetadata('ADM1_NAME', 'equals', statefp)
                         .filterMetadata('ADM0_NAME', 'equals', statesDD.getValue())
                         .distinct('ADM2_NAME').sort('ADM2_NAME', false);
  var filteredCountiesNames = filteredCounties.aggregate_array('ADM2_NAME');
  return filteredCountiesNames.add(state).reverse()
}
*/
// Load years in the drop-down menu.
var yearsBaselineDD = ui.Select(['2017'], 'Select Baseline Year');
var yearsDD = ui.Select(['2021'], 'Select Endline Year');
// Generate list of checkboxes to mask land cover types from analysis according to user needs
var lc_checkboxes = ui.Label('Enable/Disable land cover classes for analysis:', {fontWeight: 'bold'})
var checkbox1 = ui.Checkbox({label:'Built-Up', value: false, style: {'color': '#ea3f42', 'fontWeight': 'bold'}});
var checkbox2 = ui.Checkbox({label:'Cropland', value: true, style: {'color': '#fbd278', 'fontWeight': 'bold'}});
var checkbox3 = ui.Checkbox({label:'Trees', value: true, style: {'color': '#527300', 'fontWeight': 'bold'}});
var checkbox4 = ui.Checkbox({label:'Water Body', value: false, style: {'color': '#164fab', 'fontWeight': 'bold'}});
var checkbox5 = ui.Checkbox({label:'Wetland', value: true, style: {'color': '#7db4ff', 'fontWeight': 'bold'}});
var checkbox6 = ui.Checkbox({label:'Shrubland', value: true, style: {'color': '#a4e400', 'fontWeight': 'bold'}});
var checkbox7 = ui.Checkbox({label:'Grassland', value: true, style: {'color': '#d8febc', 'fontWeight': 'bold'}});
var checkbox8 = ui.Checkbox({label:'Bare Surfaces', value: true, style: {'color': '#ffef00', 'fontWeight': 'bold'}});
var checkbox9 = ui.Checkbox({label:'Irrigated Cropland', value: true, style: {'color': '#95dfa5', 'fontWeight': 'bold'}});
var checkbox10 = ui.Checkbox({label:'Gullies', value: true, style: {'color': '#a4651d', 'fontWeight': 'bold'}});
// Add Button Widget to finalize drop-down menu selections.
var add = ui.Button({label:'⚙️ Generate Statistics', style: {width: '350px', height: '50px', fontSize: 30, fontWeight: 'bold'}});
// Add title to the side-panel
var title_label = ui.Label({value:'Select Options️', style: {fontWeight: 'bold', fontSize: 20}});
// Load list of drop-down options for the baseline and endline year menus
ee.Dictionary(years).keys().evaluate(function(yearNames){
  yearsDD.items().reset(yearNames)
  yearsDD.setPlaceholder('Select Endline Year')
  yearsBaselineDD.items().reset(yearNames)
  yearsBaselineDD.setPlaceholder('Select Baseline Year')
});
// Combine all widgets into the side-panel
var panel = ui.Panel([
                      title_label,
                      statesDD, 
                      countiesDD,
                      yearsBaselineDD,
                      yearsDD,
                      lc_checkboxes,
                      checkbox1,
                      checkbox2,
                      checkbox3,
                      checkbox4,
                      checkbox5,
                      checkbox6,
                      checkbox7,
                      checkbox8,
                      checkbox9,
                      checkbox10],
                     ui.Panel.Layout.flow('vertical'));
panel.style().set({width: '400px'});
// Check starting date of the landsat archive
var start = ee.Image(ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').first()).date().format();
var now = Date.now();
var end = ee.Date(now).format();
var date_range = ee.DateRange(start, end);
// Asynchronously compute the date range and show the slider.
  var dateSlider = ui.DateSlider({
    start: date_range.start(),
    end: date_range.end(),
    value: date_range.start(),
    period: 365,
    style: {width: '350px'}
  });
//var slider_label = ui.Label('Choose baseline and end endline years:', {fontWeight: 'bold'});
//panel.add(slider_label);
//panel.add(dateSlider);
// Add "generate statistics" button to the side panel
panel.add(add);
var catchment_stats = function(classification_col, class_dict, class_names){
  var wrap = function(feat, fc){
    var landcover_dict = ee.Dictionary(classification_col.reduceRegion({
      reducer: ee.Reducer.frequencyHistogram(),
      geometry: feat.geometry(),
      scale: 100,
      tileScale: 4,
      maxPixels:1e13
    }).get('constant'));
    var vals = class_dict.map(function(key, val){
      val = ee.Algorithms.If(landcover_dict.contains(ee.String(ee.Number(val).toInt())),
                             landcover_dict.get(ee.String(ee.Number(val).toInt())),
                             0);
      return ee.Feature(null, {'lc_type': key, 'area': val, 'catchment': feat.get('Catch_ID')})
    });
    var lc_fc = ee.FeatureCollection(vals.values(class_names));
    return ee.FeatureCollection(fc).merge(lc_fc);
  }
  return wrap
};
var landcover_fc = country.iterate(catchment_stats(classification_postproc, classes, classification_names), ee.FeatureCollection([]));
// Add a summary chart for the whole country (pie chart).
var landcover_summary_chart = ui.Chart.feature.byFeature({
    features: landcover_fc,
    xProperty: 'lc_type',
    yProperties: ['area']
  })
  .setChartType('PieChart')
  .setOptions({title: 'LCDB2021 class distribution (in hectares)',
                  colors: classification_palette_red,
                  sliceVisibilityThreshold: 0 // Don't group small slices.
                });
panel.add(landcover_summary_chart);
var catchments_fc = counties.iterate(catchment_stats(classification_postproc, classes, classification_names), ee.FeatureCollection([]));
// Add a summary chart for all catchments (bar chart).
var catchments_summary_chart = ui.Chart.feature.groups({
    features: catchments_fc,
    xProperty: 'catchment',
    yProperty: 'area',
    seriesProperty: 'lc_type'
  })
  .setChartType('ColumnChart')
  .setSeriesNames(classification_names)
  .setOptions({
    title: 'LCDB2021 class distribution per catchment',
    width: 200,
    height: 400,
    textPosition: "in",
    //orientation: "vertical",
    hAxis: {title: 'catchment ID', textStyle: {fontSize: 13}},
    vAxis: {title: 'Area (hectares)'},
    colors: classification_palette_red,
    sliceVisibilityThreshold: 0, // Don't group small slices.
    isStacked: 'absolute'
  });
panel.add(catchments_summary_chart);
// Add side-panel to interface
ui.root.add(panel);
// App Title
var title_label = ui.Label({
  value: "Lesotho Land Cover Statistics Tool",
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '2'
    }
});
Map.add(title_label);
// Create widget to display while outputs are being processed.
var proc_label_mean = ui.Label('⚙️ Processing mean outputs, please wait...');
// Create widget to display while outputs are being processed.
var proc_label = ui.Label('⚙️  Fetching layers list, please wait...');
// Triggers the retrieval of area-based information based on the selection in the button widgets
add.onClick(function(){
  // Clean-up the map and panel displays when new information is requested
  Map.clear();
  panel.widgets().reset(button_widgets);
  Map.add(title_label);
  // Evaluation of the date range provided through the drop-down menu options
  ee.Dictionary({
    start: dateSlider.getValue()[0],
    end: dateSlider.getEnd()
    }).evaluate(renderDateRange);
});
// Render data corresponding to the area and date range specified in the drop-down menu options.
function renderDateRange(date_range){
  date_range = ee.Dictionary(date_range);
  // Assign the widget values to variables
  var adm1_name = countiesDD.getValue();
  var adm0_name = statesDD.getValue();
  var year = yearsDD.getValue();
  var baseline_year = yearsBaselineDD.getValue();
    // Ensure that the retrieved country geometry is unique
  var country = ee.FeatureCollection(
      ee.Algorithms.If(ee.String(adm1_name).compareTo(ee.String(adm0_name)).eq(0),
                       ee.FeatureCollection("users/ocsgeospatial/Lesotho/lesotho_boundaries").map(function(feat){return feat.set({'Catch_ID': 'Lesotho'})}),
                       counties.filter(ee.Filter.equals('Catch_ID', adm1_name))));
  // Load baseline year
  classification_baseline = ee.Image(years[baseline_year]).rename('constant').clip(country.geometry());
                            //.where(classification_postproc.neq(15).and(ee.Image(years[baseline_year]).eq(15)), classification_postproc);
  //classification_baseline = classification_baseline
  //                          //.remap(old_classes, new_classes)
  //                          .rename('constant').clip(country.geometry());
  // Load endline year
  classification_postproc = ee.Image(years[year]).rename('constant').clip(country.geometry());
                            //.where(classification_postproc.neq(15).and(ee.Image(years[year]).eq(15)), classification_postproc);
  //classification_postproc = classification_postproc
  //                          //.remap(old_classes, new_classes)
  //                          .rename('constant').clip(country.geometry());
  // Mask the land cover data according to the enabled/disabled boxes           
  function lc_checkboxes(lc){
    var class_checkbox1 = ee.Image(ee.Algorithms.If(checkbox1.getValue(), 
                                       lc.selfMask(),
                                       lc.neq(ee.Image(ee.Number(classes.get('Built-Up')))).selfMask()));
    var class_checkbox2 = ee.Image(ee.Algorithms.If(checkbox2.getValue(), 
                                       class_checkbox1,
                                       class_checkbox1.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Cropland')))))));
    var class_checkbox3 = ee.Image(ee.Algorithms.If(checkbox3.getValue(), 
                                       class_checkbox2,
                                       class_checkbox2.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Trees')))))));
    var class_checkbox4 = ee.Image(ee.Algorithms.If(checkbox4.getValue(), 
                                       class_checkbox3,
                                       class_checkbox3.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Water Body')))))));
    var class_checkbox5 = ee.Image(ee.Algorithms.If(checkbox5.getValue(), 
                                       class_checkbox4,
                                       class_checkbox4.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Wetland')))))));
    var class_checkbox6 = ee.Image(ee.Algorithms.If(checkbox6.getValue(), 
                                       class_checkbox5,
                                       class_checkbox5.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Shrubland')))))));
    var class_checkbox7 = ee.Image(ee.Algorithms.If(checkbox7.getValue(), 
                                       class_checkbox6,
                                       class_checkbox6.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Grassland')))))));
    var class_checkbox8 = ee.Image(ee.Algorithms.If(checkbox8.getValue(), 
                                       class_checkbox7,
                                       class_checkbox7.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Bare Surfaces')))))));
    var class_checkbox9 = ee.Image(ee.Algorithms.If(checkbox9.getValue(), 
                                       class_checkbox8,
                                       class_checkbox8.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Irrigated Cropland')))))));
    var lc_mask = ee.Image(ee.Algorithms.If(checkbox10.getValue(), 
                                       class_checkbox9,
                                       class_checkbox9.updateMask(lc.neq(ee.Image(ee.Number(classes.get('Gullies')))))));
    return lc_mask  
  }
  // Apply the checkbox mask
  var lc_mask_baseline = lc_checkboxes(classification_baseline);
  var lc_mask = lc_checkboxes(classification_postproc);
  // Generate a set of visualization palettes for the indicators to visualize
  var other_palette = palettes.colorbrewer.RdYlGn[11];
  var S_palette = other_palette.slice(1, -2).reverse();
  var viz_S = {min: 0, max:1, palette: S_palette};
  var lcci_palette = palettes.colorbrewer.YlOrRd[9].slice(0).reverse();
  var changeSlope_palette = palettes.kovesi.rainbow_bgyr_35_85_c73[7].reverse();
  var viz_changeSlope = {min: -1, max: 1, palette: changeSlope_palette};
  var A_palette = palettes.colorbrewer.YlOrBr[9].reverse().slice(0,-1);
  var viz_A = {min: 0, max: 150, palette: A_palette};
  var freq_palette = palettes.matplotlib.plasma[7];
  var viz_freq = {min: 0, max: 100, palette: freq_palette};
  // set position of panel
  var legend_continuous = ui.Panel({
    style: {
    position: 'bottom-left',
    padding: '8px 15px'
    }
    });
  /*
  // Populate the continuous legend panel
  legend_continuous = legends.populateLegend(legend_continuous, 
                                             "Short-term Environmental indicators (S, dimensionless)", 
                                             viz_S, " (positive)"," (negative)");
  legend_continuous = legends.populateLegend(legend_continuous, 
                                             "Long-term Slopes of Change (RGB color composite)", 
                                             viz_changeSlope, " (decrease)"," (increase)");
  Map.add(legend_continuous);
  */
  // Center map on the country and plot it on the map
  Map.centerObject(country.geometry());
  Map.setOptions("TERRAIN");
  var aoi_layer = ui.Map.Layer(country.geometry(), {}, adm1_name + ' Boundaries');
  Map.addLayer(country.geometry(), {}, adm1_name + ' Boundaries');
  var landCoverBaseline_layer = ui.Map.Layer(classification_baseline.updateMask(lc_mask_baseline).clip(country.geometry()),
                                     {palette: classification_palette, min: 1, max: 15},
                                     'Land Cover Baseline - '+baseline_year);
  var landCoverEndline_layer = ui.Map.Layer(classification_postproc.updateMask(lc_mask).clip(country.geometry()),
                                     {palette: classification_palette, min: 1, max: 15},
                                     'Land Cover Endline - '+year);
  Map.add(landCoverBaseline_layer);  
  Map.add(landCoverEndline_layer);    
  var landCover_legend = makeLegend('Land Cover Legend', classification_palette, classification_names, 9);
  // Prepare feature collection for the pie chart
  var catchments_fc_endline = country.iterate(catchment_stats(classification_postproc, classes, classification_names), ee.FeatureCollection([]));
  // Add a summary chart.
  var landCoverEndline_pieChart = ui.Chart.feature.byFeature({
      features: catchments_fc_endline,
      xProperty: 'lc_type',
      yProperties: ['area']
    })
    .setChartType('PieChart')
    .setOptions({title: 'Land Cover Endline class distribution (in hectares)',
                    colors: classification_palette_red,
                    sliceVisibilityThreshold: 0 // Don't group small slices.
                  });
  panel.add(landCoverEndline_pieChart);
  // Prepare feature collection for the pie chart
  var catchments_fc_baseline = country.iterate(catchment_stats(classification_baseline, classes, classification_names), ee.FeatureCollection([]));
  // Add a summary chart.
  var landCoverBaseline_pieChart = ui.Chart.feature.byFeature({
      features: catchments_fc_baseline,
      xProperty: 'lc_type',
      yProperties: ['area']
    })
    .setChartType('PieChart')
    .setOptions({title: 'Land Cover Baseline class distribution (in hectares)',
                    colors: classification_palette_red,
                    sliceVisibilityThreshold: 0 // Don't group small slices.
                  });
  // Generate a bar chart summary if the entire country is selected
  if (adm0_name === adm1_name) {
    var landCoverEndline_barChart = ui.Chart.feature.groups({
            features: counties.iterate(catchment_stats(classification_postproc, classes, classification_names), ee.FeatureCollection([])),
            xProperty: 'catchment',
            yProperty: 'area',
            seriesProperty: 'lc_type'
          })
          .setChartType('ColumnChart')
          .setSeriesNames(classification_names)
          .setOptions({
            title: 'Land Cover Endline class distribution per catchment',
            width: 200,
            height: 400,
            textPosition: "in",
            //orientation: "vertical",
            hAxis: {title: 'catchment ID', textStyle: {fontSize: 13}},
            vAxis: {title: 'Area (hectares)'},
            colors: classification_palette_red,
            sliceVisibilityThreshold: 0, // Don't group small slices.
            isStacked: 'absolute'
          });
    panel.add(landCoverEndline_barChart);
    var landCoverBaseline_barChart = ui.Chart.feature.groups({
        features: counties.iterate(catchment_stats(classification_baseline, classes, classification_names), ee.FeatureCollection([])),
        xProperty: 'catchment',
        yProperty: 'area',
        seriesProperty: 'lc_type'
      })
      .setChartType('ColumnChart')
      .setSeriesNames(classification_names)
      .setOptions({
        title: 'Land Cover Baseline class distribution per catchment',
        width: 200,
        height: 400,
        textPosition: "in",
        //orientation: "vertical",
        hAxis: {title: 'catchment ID', textStyle: {fontSize: 13}},
        vAxis: {title: 'Area (hectares)'},
        colors: classification_palette_red,
        sliceVisibilityThreshold: 0, // Don't group small slices.
        isStacked: 'absolute'
      });
  }
  // Define temporal interval for the linear regression charts
  var START_YEAR = ee.Date(date_range.get('start'));
  // Define a more recent start year for evapotranspiration and NPP from FAO WaPOR, as that data starts from 2009
  var START_YEAR_SHORT = ee.Date(ee.Algorithms.If(START_YEAR.difference(ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D").first().date(), 'day').gt(0),
                                          START_YEAR,
                                          ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D").first().date())
                                          );
  var END_YEAR = ee.Date(date_range.get('end'));
  // Load climatic data collections
  var precipitation = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD").filterDate(START_YEAR, END_YEAR).select('precipitation');
  var temperature = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY").filterDate(START_YEAR, END_YEAR).select('temperature_2m');
  var evapotranspiration = ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D").filterDate(START_YEAR_SHORT, END_YEAR);
  var npp = ee.ImageCollection("FAO/WAPOR/2/L1_NPP_D").filterDate(START_YEAR_SHORT, END_YEAR)
            .map(function(img){return img.divide(1000).copyProperties(img, ['system:time_start'])});
  // Generate a list of time intervals for which to generate a harmonized time series
  END_YEAR = ee.Date(ee.Algorithms.If(ee.Number(END_YEAR.get('day')).lte(15),
                              END_YEAR.update({day: 1}),
                              END_YEAR.update({day: 28})));
  // Generate a list of time intervals for which to generate a harmonized time series
  var time_intervals = composites.extractTimeRanges(START_YEAR, END_YEAR, 364/12).slice(0,-4);
  var time_intervals_short = composites.extractTimeRanges(START_YEAR_SHORT, END_YEAR, 364/12).slice(0,-2);
  // This function adds a time band to the image.
  var createTimeBand = function(image) {
    // Scale milliseconds by a large constant to avoid very small slopes
    // in the linear regression output.
    return image.addBands(image.metadata('system:time_start').divide(3.154e10).add(1970));
  };
  var harmonize_ts = function(collection){
    collection = collection.map(function(img) {
      return img.set('year', ee.String(img.date().get('year'))
                    //.cat(ee.String(img.date().get('month')))
                    );
    });
    var distinctYearCol = collection.distinct('year');
    var filter = ee.Filter.equals({leftField: 'year', rightField: 'year'});
    var join = ee.Join.saveAll('year_matches');
    var joinCol = ee.ImageCollection(join.apply(distinctYearCol, collection, filter));
    return joinCol
  }
  // Run a harmonic regression on the time series to fill missing data gaps and smoothen the NDVI profile.
  var prec_ts_smooth = harmonize_ts(precipitation).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      return yearCol.reduce(ee.Reducer.sum(), 4)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis())
                    .rename('precipitation');
      }).map(createTimeBand);
  var temp_ts_smooth = harmonize_ts(temperature).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      return yearCol.reduce(ee.Reducer.mean(), 4).subtract(273.15)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis())
                    .rename('temperature_2m');
      }).map(createTimeBand);
  // Run a harmonic regression on the time series to fill missing data gaps and smoothen the NDVI profile.
  var et_ts_smooth = harmonize_ts(evapotranspiration).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      return yearCol.reduce(ee.Reducer.sum(), 4)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis())
                    .rename('L1_AETI_D');
      }).map(createTimeBand);
  // Run a harmonic regression on the time series to fill missing data gaps and smoothen the NDVI profile.
  var npp_ts_smooth = harmonize_ts(npp).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      return yearCol.reduce(ee.Reducer.sum(), 4)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis())
                    .rename('L1_NPP_D');
      }).map(createTimeBand);
  var rue_ts_smooth = ee.ImageCollection(ee.Join.saveFirst('precipitation').apply({
      primary: npp_ts_smooth,
      secondary: prec_ts_smooth,
      condition: ee.Filter.equals({
          leftField: 'system:time_start',
          rightField: 'system:time_start'})
  }))
  .map(function(img){return img.select('L1_NPP_D')
                               .divide(ee.Image(img.get('precipitation')).select('precipitation'))
                               .rename('rain_use_efficiency')
                               .addBands(img.select('system:time_start'))
                               .copyProperties(img, ['system:time_start']);});
  var wue_ts_smooth = ee.ImageCollection(ee.Join.saveFirst('evapotranspiration').apply({
      primary: npp_ts_smooth,
      secondary: et_ts_smooth,
      condition: ee.Filter.equals({
          leftField: 'system:time_start',
          rightField: 'system:time_start'})
  }))
  .map(function(img){return img.select('L1_NPP_D')
                               .divide(ee.Image(img.get('evapotranspiration')).select('L1_AETI_D'))
                               .rename('water_use_efficiency')
                               .addBands(img.select('system:time_start'))
                               .copyProperties(img, ['system:time_start']);});
  // Convert image collection to single image with multiple bands.
  function _stack (i1, i2)
  {
    return ee.Image(i1).addBands(ee.Image(i2))
  }
  // Define function to plot time series data
  var plotSeries = function(collections, aoi, scale, seriesNames, options){
    var doy_series = collections[0].select('system:time_start').toList(collections[0].size()).reverse();
    var doy_plot = ee.Image(doy_series.slice(1).iterate(_stack, doy_series.get(0)));            
    var x = doy_plot.reduceRegion({reducer:ee.Reducer.mean(), 
                                 geometry: aoi, 
                                 scale: 5566, 
                                 maxPixels: 1e13, 
                                 tileScale: 4}).values();
    // Get the crop signature from the reference data points using reduceRegion on the original NDVI time series
    var y = ee.List(collections).map(function(collection){
        collection = ee.ImageCollection(collection);
        var series = collection.select('[^system].*').toList(collection.size()).reverse();
        var plot = ee.Image(series.slice(1).iterate(_stack, series.get(0)));
        return ee.Array(plot.reduceRegion({reducer: ee.Reducer.mean(), 
                                  geometry: aoi, 
                                  scale: scale,
                                  maxPixels: 1e13, 
                                  tileScale: 4}).values())
    });
    // Plot chart
    var chart = ui.Chart.array.values(ee.Array.cat(y, 1), 0, x)
    .setSeriesNames(seriesNames)
    .setOptions(options);
    return chart
  }
  // Compute annual precipitation, evapotrasnpiration and net primary production
  var prec_annual = precipitation.sum().divide(END_YEAR.difference(START_YEAR_SHORT, 'year')).clip(country.geometry());
  var evapo_annual = evapotranspiration.sum().divide(END_YEAR.difference(START_YEAR_SHORT, 'year')).clip(country.geometry());
  var npp_annual = npp.sum().divide(END_YEAR.difference(START_YEAR_SHORT, 'year')).clip(country.geometry());
  var prec_palette = palettes.colorbrewer.Purples[9];
  var evapo_palette = palettes.colorbrewer.YlGnBu[9];
  var npp_palette = palettes.colorbrewer.YlGn[9];
  //Map.addLayer(prec_annual, {min: 2000, max: 13000, palette: prec_palette}, 'acc precipitation annual (mm) Lesotho');
  //Map.addLayer(evapo_annual, {min: 2000, max: 23000, palette: evapo_palette}, 'acc evapotranspiration annual (mm) Lesotho');
  //Map.addLayer(npp_annual, {min: 0, max: 6000, palette: npp_palette}, 'mean net primary production annual (kg/m²) Lesotho');
  // Compute the mean Annual Soil Loss Rate for the selected area and add it to the panel.
  var prec_mean = ee.Number(prec_annual.updateMask(lc_mask).reduceRegion({
                             reducer: ee.Reducer.mean(),
                             geometry: country.geometry(),
                             scale: 250,
                             maxPixels: 1e13,
                             tileScale: 4
                         }).get('precipitation')).multiply(10).round().divide(10); // Dirty trick to round the data to three numbers after decimal
  // Compute the mean Annual Soil Loss Rate for the selected area and add it to the panel.
  var evapo_mean = ee.Number(evapo_annual.updateMask(lc_mask).reduceRegion({
                             reducer: ee.Reducer.mean(),
                             geometry: country.geometry(),
                             scale: 250,
                             maxPixels: 1e13,
                             tileScale: 4
                         }).get('L1_AETI_D')).multiply(10).round().divide(10); // Dirty trick to round the data to three numbers after decimal
  // Compute the mean Annual Soil Loss Rate for the selected area and add it to the panel.
  var npp_mean = ee.Number(npp_annual.updateMask(lc_mask).reduceRegion({
                             reducer: ee.Reducer.mean(),
                             geometry: country.geometry(),
                             scale: 250,
                             maxPixels: 1e13,
                             tileScale: 4
                         }).get('L1_NPP_D')).multiply(10).round().divide(10); // Dirty trick to round the data to three numbers after decimal
  // Initiate text labels
  var prec_label = ui.Label();
  var evapo_label = ui.Label();
  var npp_label = ui.Label();
  // Populate labels with the mean precipitation, evapotranspiration and net primary production values
  ee.List([prec_mean, evapo_mean, npp_mean]).evaluate(function(result){
    result = ee.List(result);
    panel.remove(proc_label_mean);
    prec_label.setValue("Mean annual precipitation: " + result.get(0).getInfo() + " mm");
    evapo_label.setValue("Mean annual evapotranspiration: " + result.get(1).getInfo() + " mm");
    npp_label.setValue("Mean annual net primary production: " + result.get(2).getInfo() + " kg/m²");
  })
  panel.add(proc_label_mean);
  panel.add(prec_label);
  panel.add(evapo_label);
  panel.add(npp_label);
  // Landsat harmonization and time series mapping
  var coefficients = {
    itcps: ee.Image.constant([0.0003, 0.0088, 0.0061, 0.0412, 0.0254, 0.0172])
               .multiply(10000),
    slopes: ee.Image.constant([0.8474, 0.8483, 0.9047, 0.8462, 0.8937, 0.9071])
  };
  // Function to get and rename bands of interest from OLI.
  function renameOli(img) {
    return img.select(
        ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'pixel_qa'],
        ['B2', 'B3', 'B4', 'B8', 'B11', 'B12', 'pixel_qa']);
  }
  // Function to get and rename bands of interest from ETM+.
  function renameEtm(img) {
    return img.select(
        ['B1', 'B2', 'B3', 'B4', 'B5', 'B7', 'pixel_qa'],
        ['B2', 'B3', 'B4', 'B8', 'B11', 'B12', 'pixel_qa']);
  }
  function etmToOli(img) {
    return img.select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12'])
        .multiply(coefficients.slopes)
        .add(coefficients.itcps)
        .round()
        .toShort()
        .addBands(img.select('pixel_qa'));
  }
  function fmask(img) {
    var cloudShadowBitMask = 1 << 3;
    var cloudsBitMask = 1 << 5;
    var qa = img.select('pixel_qa');
    var mask = qa.bitwiseAnd(cloudShadowBitMask)
                   .eq(0)
                   .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return img.updateMask(mask);
  }
 function calcNDVI(img) {
    return img.normalizedDifference(['B8', 'B4']).rename('NDVI');
  }
  function calcNDMI(img) {
    return img.normalizedDifference(['B8', 'B11']).rename('NDMI');
  }
  // Define function to prepare OLI images.
  function prepOli(img) {
    var orig = img;
    img = renameOli(img);
    img = fmask(img);
    var img_ndvi = calcNDVI(img);
    var img_ndmi = calcNDMI(img);
    return ee.Image(img.addBands(img_ndvi).addBands(img_ndmi).copyProperties(orig, orig.propertyNames()));
  }
  // Define function to prepare ETM+ images.
  function prepEtm(img) {
    var orig = img;
    img = renameEtm(img);
    img = fmask(img);
    img = etmToOli(img);
    var img_ndvi = calcNDVI(img);
    var img_ndmi = calcNDMI(img);
    return ee.Image(img.addBands(img_ndvi).addBands(img_ndmi).copyProperties(orig, orig.propertyNames()));
  }
  // Compute the residual trend time series (climate-detrended) for landsat data
  function residual_ts(geom){
    var oliCol = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR').filterDate(START_YEAR, END_YEAR);
    var etmCol = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR').filterDate(START_YEAR, END_YEAR);
    var tmCol = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR').filterDate(START_YEAR, END_YEAR);
    var colFilter = ee.Filter.and(
        ee.Filter.bounds(geom), //ee.Filter.calendarRange(1, 365, 'day_of_year'),
        ee.Filter.lt('CLOUD_COVER', 50), ee.Filter.lt('GEOMETRIC_RMSE_MODEL', 10),
        ee.Filter.or(
            ee.Filter.eq('IMAGE_QUALITY', 9),
            ee.Filter.eq('IMAGE_QUALITY_OLI', 9))
        );
    // Filter collections and prepare them for merging.
    oliCol = oliCol.filter(colFilter).map(prepOli);
    etmCol = etmCol.filter(colFilter).map(prepEtm);
    tmCol = tmCol.filter(colFilter).map(prepEtm);
    // Merge the collections.
    var col = oliCol.merge(etmCol).merge(tmCol);
    var precipitation_log = precipitation.map(function(img){return img.log().unmask(0)});
    var medianComp = harmonize_ts(col).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      var mean_col = yearCol.reduce(ee.Reducer.mean(), 4)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis())
      var max_col = yearCol.reduce(ee.Reducer.percentile([95]))
                          .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                               month: 6,
                                                                               day: 1, hour:0, minute:0, second:0})).millis())
      var bs_col = yearCol.map(function(img){var geos3 = S2Masks.addGEOS3Mask(img);
                                            return img.updateMask(geos3)});
      var bsfreq_col = bs_col.select('B8').reduce(ee.Reducer.count(), 4)
                       .divide(yearCol.select('B8').reduce(ee.Reducer.count(), 4))
                       .unmask(0)
                       .rename('bare_soil_frequency')
                       .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                     month: 6,
                                                     day: 1, hour:0, minute:0, second:0})).millis());
      return mean_col.addBands(max_col).addBands(bsfreq_col)
    })
    .map(createTimeBand);
    var precipitationComp = harmonize_ts(precipitation_log).map(function(img) {
      var yearCol = ee.ImageCollection.fromImages(img.get('year_matches'));
      return yearCol.reduce(ee.Reducer.sum(), 4)
                    .set('system:time_start', ee.Date(img.date().update({year: img.date().get('year'),
                                                                         month: 6,
                                                                         day: 1, hour:0, minute:0, second:0})).millis());
      });
    medianComp = ee.ImageCollection(ee.Join.saveFirst('precipitation').apply({
        primary: medianComp,
        secondary: precipitationComp,
        condition: ee.Filter.equals({
            leftField: 'system:time_start',
            rightField: 'system:time_start'})
    }))
    .map(function(img){return img.addBands(ee.Image(img.get('precipitation')));})
    .sort('system:time_start');
    // Compute robust linear regression coefficients.
    var vpd_ols = medianComp.select(['precipitation_sum','NDVI_mean'])
                  .reduce(ee.Reducer.linearFit(), 4);
    var mpd_ols = medianComp.select(['precipitation_sum','NDMI_mean'])
                  .reduce(ee.Reducer.linearFit(), 4);
    return medianComp.map(function(img){
      var pred_ndvi = img.select('precipitation_sum')
                      .multiply(vpd_ols.select('scale'))
                      .add(vpd_ols.select('offset'));
      var obs_ndvi = img.select('NDVI_mean');
      var pred_ndmi = img.select('precipitation_sum')
                         .multiply(mpd_ols.select('scale'))
                         .add(mpd_ols.select('offset'));
      var obs_ndmi = img.select('NDMI_mean');
      return img.select('system:time_start', 'NDVI_mean', 'NDMI_mean', 'NDVI_p95', 'bare_soil_frequency')
                .addBands(obs_ndvi.subtract(pred_ndvi).rename('NDVI_residual'))
                .addBands(obs_ndmi.subtract(pred_ndmi).rename('NDMI_residual'))
    });
  }
  var water = ee.Image("JRC/GSW1_2/GlobalSurfaceWater").select('max_extent').neq(0).clip(country.geometry()); // JRC Global Surface Water mask
  var s2_date_range = ee.Dictionary({'start': ee.Number.parse(year).subtract(2).getInfo()+'-01-01', 'end': year+'-12-31'});
  // Load the Sentinel-2 collection for the time period and area requested
  var s2_cl = S2Masks.loadImageCollection("COPERNICUS/S2_SR", s2_date_range, country.geometry());
  // Perform cloud masking using the S2 cloud probabilities assets from s2cloudless,
  // courtesy of Sentinelhub/EU/Copernicus/ESA
  var masked_collection = s2_cl.filter(ee.Filter.notNull(['MEAN_INCIDENCE_AZIMUTH_ANGLE_B3',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B4',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B5',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B6',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B7',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B8A',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B11',
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B12',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B3',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B4',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B5',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B6',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B7',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B8A',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B11',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B12',
                                                        'MEAN_SOLAR_AZIMUTH_ANGLE',
                                                        'MEAN_SOLAR_ZENITH_ANGLE']))
                          .map(S2Masks.addCloudShadowMask(water.not(), 1e4))
                          .map(S2Masks.applyCloudShadowMask)
                          .map(S2FCover.fcover(1e4))
                          .map(function(img){return img.addBands(img.normalizedDifference(['B8', 'B4']).rename('NDVI')).copyProperties(img, ['system:time_start'])})
                          .select(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12', 'fcover', 'NDVI']);
  var ndvi_hist = ee.ImageCollection.fromImages([//masked_collection.filterDate(ee.String(END_YEAR.get('year').subtract(3)).cat('-01-01'),
                                                //                       ee.String(END_YEAR.get('year').subtract(3)).cat('-12-31'))
                                                //                       .reduce(ee.Reducer.percentile([95])),
                                                masked_collection.select(['NDVI']).filterDate(s2_date_range.get('start'),
                                                                             ee.String(ee.Date(s2_date_range.get('start')).get('year')).cat('-12-31'))
                                                                      .reduce(ee.Reducer.mean(), 4).rename('NDVI').toFloat(),
                                                masked_collection.select(['NDVI']).filterDate(ee.String(ee.Date(s2_date_range.get('start')).get('year').add(1)).cat('-01-01'),
                                                                             ee.String(ee.Date(s2_date_range.get('start')).get('year').add(1)).cat('-12-31'))
                                                                      .reduce(ee.Reducer.mean(), 4).rename('NDVI').toFloat()
                                                ]);
  // compute min and max of annual ndvi for the baseline period
  var bl_ndvi_range = ndvi_hist.reduce(ee.Reducer.percentile([0, 100]), 4);
  //add two bands to the time series: one 5% lower than min and one 5% higher than max
  var bl_ndvi_ext = ndvi_hist.merge(
                    ee.ImageCollection.fromImages([
                      bl_ndvi_range.select('NDVI_p0').subtract((bl_ndvi_range.select('NDVI_p100')
                      .subtract(bl_ndvi_range.select('NDVI_p0'))).multiply(0.05)).rename('NDVI').toFloat(),
                      bl_ndvi_range.select('NDVI_p100').add((bl_ndvi_range.select('NDVI_p100')
                      .subtract(bl_ndvi_range.select('NDVI_p0'))).multiply(0.05)).rename('NDVI').toFloat()
                      ]));
  // compute percentiles of annual ndvi for the extended baseline period
  var percentiles = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var bl_ndvi_perc = bl_ndvi_ext.reduce(ee.Reducer.percentile(percentiles), 4);
  //compute mean ndvi for the baseline and target period period
  var bl_ndvi_mean = ndvi_hist.reduce(ee.Reducer.mean(), 4).rename('NDVI');
  var tg_ndvi_mean = masked_collection.select(['NDVI']).filterDate(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01'), s2_date_range.get('end'))
                 .reduce(ee.Reducer.mean(), 4).rename('NDVI');
  // reclassify mean ndvi for baseline period based on the percentiles
  var bl_classes = ee.Image(-32768)
      .where(bl_ndvi_mean.lte(bl_ndvi_perc.select('NDVI_p10')), 1)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p10')), 2)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p20')), 3)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p30')), 4)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p40')), 5)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p50')), 6)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p60')), 7)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p70')), 8)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p80')), 9)
      .where(bl_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p90')), 10);
  // reclassify mean ndvi for target period based on the percentiles
  var tg_classes = ee.Image(-32768)
      .where(tg_ndvi_mean.lte(bl_ndvi_perc.select('NDVI_p10')), 1)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p10')), 2)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p20')), 3)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p30')), 4)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p40')), 5)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p50')), 6)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p60')), 7)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p70')), 8)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p80')), 9)
      .where(tg_ndvi_mean.gt(bl_ndvi_perc.select('NDVI_p90')), 10);
  // difference between start and end clusters >= 2 means improvement (<= -2 is degradation)
  var vci = tg_classes.subtract(bl_classes).where(bl_ndvi_mean.subtract(tg_ndvi_mean).abs().lte(0.01), 0).rename('productivity_state');
  var ndvi_mean = masked_collection.filterDate(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01'),
                                               s2_date_range.get('end'))
                                      .select('NDVI')
                                      .mean();
  var median_image = masked_collection.filterDate(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01'),
                                                 s2_date_range.get('end'))
                                    .median();
  var ndvi_median = median_image.select('NDVI');
  var ndvi_max = masked_collection.filterDate(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01'),
                                               s2_date_range.get('end'))
                                  .select('NDVI')
                                  .reduce(ee.Reducer.percentile([95]), 4)
                                  .rename('NDVI');
  // Generate a list of time intervals for which to generate a harmonized time series
  var time_intervals_rusle = composites.extractTimeRanges(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01'),
                                                          s2_date_range.get('end'), 364/6);
  // Generate harmonized monthly time series of FCover as input to the vegetation factor V
  var fcover_ts = composites.harmonizedTS(masked_collection, ['fcover'], time_intervals_rusle, {agg_type: 'geomedian'});
  var fcover_ts_smooth = fcover_ts.map(function(image){
    var currentDate = ee.Date(image.get('system:time_start'));
    var meanImage = fcover_ts.filterDate(currentDate.advance(-364/6-1, 'day'),
                                         currentDate.advance(364/6+1, 'day')).mean();
    // replace all masked values
    var ddiff = currentDate.difference(ee.Date(ee.String(ee.Date(s2_date_range.get('end')).get('year')).cat('-01-01')), 'day');
    return meanImage.where(image, image).unmask(0)
    .addBands(ee.Image(ddiff).rename('doy').toInt16())
    .copyProperties(image, ['system:time_start']);
  });
  // Apply bare soil filter using the GEOS3 algorithm
  var bs_collection = masked_collection.map(function(img){var geos3 = S2Masks.addGEOS3Mask(img);
                                                          return img.updateMask(geos3)});
  // Calculate the bare soil frequency,
  // i.e. the number of bare soil observations divided by the number of cloud-free observations
  var bs_freq = bs_collection.select('B2').reduce(ee.Reducer.count(), 4)
                .divide(masked_collection.select('B2').reduce(ee.Reducer.count(), 4))
                .unmask(0)
                .rename('bare_soil_frequency')
                .clip(country.geometry())
                // Masking out the following: water, built-up, too steep slopes
                //.updateMask(water.not().and(classification_postproc.neq(1)).and(slope_deg.lte(26.6)));
  var S = RUSLEFactors.factorS(median_image.toInt16(), bs_freq, fcover_ts_smooth.select('fcover'), 1e4);
  var K = RUSLEFactors.factorK(adm0_name);
  // Compute the Annual Soil Loss Rate A, according to the RUSLE equation, originally coined by:
  // Wischmeier & Smith 1978, revised by: Renard, 1997
  // C and P factors refactored into S = 1 / (V * L) as done in Karydas & Panagos, 2018.
  var A = R
         .multiply(K)
         .multiply(LS)
         .multiply(S)
         .rename('soil_erosion_hazard');
  var soil_properties = ee.Image("ISDASOIL/Africa/v1/texture_class").select(0).rename('texture')
                    .addBands(ee.Image("ISDASOIL/Africa/v1/sand_content").select(0).rename('sand'))
                    .addBands(ee.Image("ISDASOIL/Africa/v1/silt_content").select(0).rename('silt'))
                    .addBands(ee.Image("ISDASOIL/Africa/v1/clay_content").select(0).rename('clay'))
                    .addBands(ee.Image("ISDASOIL/Africa/v1/bulk_density").select(0).rename('bulk_density'))
                    .addBands(ee.Image("ISDASOIL/Africa/v1/carbon_organic").select(0).rename('soil_carbon'))
                    .addBands(ee.Image("ISDASOIL/Africa/v1/bedrock_depth").select(0).rename('depth'))
                    .clip(states.filterMetadata('ADM0_NAME', 'equals', adm0_name).geometry());
  var units = soil_properties.select('texture').multiply(100).add(classification_postproc).rename('units');
  var ndvi_list =
    ee.Dictionary(units.reduceRegion({reducer: ee.Reducer.frequencyHistogram(), scale:100, maxPixels:1e13, tileScale: 4, geometry: country.geometry()}).get('units'))
      //ee.List(new_classes).distinct()
      .map(function(key, val){
        var ndvi_max = ee.Number(ee.Algorithms.If(ee.Number(val).gte(50),
          ndvi_mean.updateMask(units.eq(ee.Number.parse(key)))
          .reduceRegion({reducer: ee.Reducer.percentile([95]), geometry: country.geometry(), scale: 100, tileScale: 4, maxPixels:1e13})
          .get('NDVI'),
          0));
      return ndvi_mean.divide(ndvi_max).toFloat();
    }).values();
  var lcci = ee.ImageCollection.fromImages(ndvi_list).mosaic().rename('productivity_performance');
  // Apply the above residual_ts function to get the residual trend time series of NDVI
  var residualComp = residual_ts(country.geometry());
  var rao = residualComp.select(['NDVI_p95', 'system:time_start']).map(bioDivMap.raoQ(country.geometry(), {window_size: 3}));
  var rao_latest = ee.ImageCollection([ndvi_max.set('system:time_start', ee.Date(year+'06-01').millis())])
                   .map(createTimeBand)
                   .select(['NDVI', 'system:time_start'])
                   .map(bioDivMap.raoQ(country.geometry(), {window_size: 9}))
                   .first().select('rao');
  function get_kendall_coef(n, level){
    // The minus 4 is because the indexing below for a sample size of 4
    n = n.subtract(4);
    var coefs = {90: ee.List([4, 6, 7, 9, 10, 12, 15, 17, 18, 22, 23, 27, 28, 32, 35, 37, 40, 42,
                  45, 49, 52, 56, 59, 61, 66, 68, 73, 75, 80, 84, 87, 91, 94, 98, 103,
                  107, 110, 114, 119, 123, 128, 132, 135, 141, 144, 150, 153, 159,
                  162, 168, 173, 177, 182, 186, 191, 197, 202]),
               95: ee.List([4, 6, 9, 11, 14, 16, 19, 21, 24, 26, 31, 33, 36, 40, 43, 47, 50, 54,
                    59, 63, 66, 70, 75, 79, 84, 88, 93, 97, 102, 106, 111, 115, 120,
                    126, 131, 137, 142, 146, 151, 157, 162, 168, 173, 179, 186, 190,
                    197, 203, 208, 214, 221, 227, 232, 240, 245, 251, 258]),
               99: ee.List([6, 8, 11, 18, 22, 25, 29, 34, 38, 41, 47, 50, 56, 61, 65, 70, 76, 81,
                    87, 92, 98, 105, 111, 116, 124, 129, 135, 142, 150, 155, 163, 170,
                    176, 183, 191, 198, 206, 213, 221, 228, 236, 245, 253, 260, 268,
                    277, 285, 294, 302, 311, 319, 328, 336, 345, 355, 364])}
    return coefs[level].get(n);
  }
  function mann_kendall(imageCollection){
    //Calculate Mann Kendall's S statistic.
    //This function returns the Mann Kendall's S statistic, assuming that n is
    //less than 40. The significance of a calculated S statistic is found in
    //table A.30 of Nonparametric Statistical Methods, second edition by
    //Hollander & Wolfe.
    //Args:
    //    imageCollection: A Google Earth Engine image collection.
    //Returns:
    //    A Google Earth Engine image collection with Mann Kendall statistic for
    //        each pixel.
    //
    var afterFilter = ee.Filter.lessThan({
      leftField: 'system:time_start',
      rightField: 'system:time_start'
    });
    var joined = ee.ImageCollection(ee.Join.saveAll('after').apply({
      primary: imageCollection,
      secondary: imageCollection,
      condition: afterFilter
    }));
    var sign = function(i, j) { // i and j are images
      //return ee.Image(j).neq(i) // Zero case
      //    .multiply(ee.Image(j).subtract(i).clamp(-1, 1)).int();
        var concordant = ee.Image(i).lt(j).rename('concordant');
        var discordant = ee.Image(i).gt(j).rename('discordant');
        return concordant.addBands(discordant);
    };
    var mk = ee.ImageCollection(joined.map(function(current) {
      var afterCollection = ee.ImageCollection.fromImages(current.get('after'));
      return afterCollection.map(function(image) {
        // The unmask is to prevent accumulation of masked pixels that
        // result from the undefined case of when either current or image
        // is masked.  It won't affect the sum, since it's unmasked to zero.
        return ee.Image(sign(current, image)).unmask(0);
      });
      // Set parallelScale to avoid User memory limit exceeded.
    }).flatten()).reduce('sum', 4);
    var mk_stat = mk.select('concordant_sum').subtract(mk.select('discordant_sum'));
    return mk_stat.toFloat()
  }
  // Compute the Mann-Kendall statistic for all generated indicators
  var mk_trend_ndvi = mann_kendall(residualComp.select('NDVI_residual')).rename('mannkendall');
  var mk_trend_ndmi = mann_kendall(residualComp.select('NDMI_residual')).rename('mannkendall');
  var mk_trend_rao = mann_kendall(rao.select('rao')).rename('mannkendall');
  var mk_trend_bs = mann_kendall(residualComp.select('bare_soil_frequency')).rename('mannkendall');
  var mk_trend_prec = mann_kendall(prec_ts_smooth.select('precipitation')).rename('mannkendall');
  var mk_trend_temp = mann_kendall(temp_ts_smooth.select('temperature_2m')).rename('mannkendall');
  var mk_trend_npp = mann_kendall(npp_ts_smooth.select('L1_NPP_D')).rename('mannkendall');
  var mk_trend_et = mann_kendall(et_ts_smooth.select('L1_AETI_D')).rename('mannkendall');
  var mk_trend_rue = mann_kendall(rue_ts_smooth.select('rain_use_efficiency')).rename('mannkendall');
  var mk_trend_wue = mann_kendall(wue_ts_smooth.select('water_use_efficiency')).rename('mannkendall');
  function signif_mask(img, mk_trend, start_year, end_year){
    // Define Kendall parameter values for a significance of 0.05
    var period = end_year.get('year').subtract(start_year.get('year')).add(1);
    var kendall90 = ee.Number(get_kendall_coef(period, 90));
    var kendall95 = ee.Number(get_kendall_coef(period, 95));
    var kendall99 = ee.Number(get_kendall_coef(period, 99));
    // Create final productivity trajectory output layer. Positive values are
    // significant increase, negative values are significant decrease.
    return ee.Image(-32768)
          .where(img.gt(0).and(mk_trend.abs().gte(kendall90)), 1)
          .where(img.gt(0).and(mk_trend.abs().gte(kendall95)), 2)
          .where(img.gt(0).and(mk_trend.abs().gte(kendall99)), 3)
          .where(img.lt(0).and(mk_trend.abs().gte(kendall90)), -1)
          .where(img.lt(0).and(mk_trend.abs().gte(kendall95)), -2)
          .where(img.lt(0).and(mk_trend.abs().gte(kendall99)), -3)
          .where(mk_trend.abs().lte(kendall90), 0)
          .where(img.abs().lte(0.001), 0).toFloat();
  }
  var rao_ols = rao.select(['system:time_start','rao']).reduce(ee.Reducer.linearFit(), 4).select('scale').addBands(mk_trend_rao);
  var rao_mean = rao.select('rao').reduce(ee.Reducer.mean(), 4);
  var rao_std = rao.select('rao').reduce(ee.Reducer.stdDev(), 4);
  var rao_cv = rao_std.divide(rao_mean).rename('rao_cv');
  var wsf2019 = ee.ImageCollection("projects/sat-io/open-datasets/WSF/WSF_2019").mosaic();
  var rao_mask = //classification_postproc.neq(1).and(classification_postproc.neq(5))
                 //.and(ee.ImageCollection("ESA/WorldCover/v100").mosaic().neq(60))
                 wsf2019.unmask(0).neq(255).and(classification_postproc.neq(6))
                 .and(ndvi_max.gte(0.2))
                 .focal_min({kernel: ee.Kernel.square({radius: 2})});
  //var ndvi_ols = residualComp.select(['system:time_start','NDVI_mean']).reduce(ee.Reducer.linearFit(), 4);
  var ndvi_restrend_ols = residualComp.select(['system:time_start','NDVI_residual'])
                                      .reduce(ee.Reducer.linearFit(), 4).select('scale').addBands(mk_trend_ndvi);
  //var ndmi_ols = residualComp.select(['system:time_start','NDMI_mean']).reduce(ee.Reducer.linearFit(), 4);
  var ndmi_restrend_ols = residualComp.select(['system:time_start','NDMI_residual'])
                                      .reduce(ee.Reducer.linearFit(), 4).select('scale').addBands(mk_trend_ndmi);
  var bs_ols = residualComp.select(['system:time_start', 'bare_soil_frequency']).reduce(ee.Reducer.linearFit(), 4).select('scale').addBands(mk_trend_bs);
  // Compute robust linear regression coefficients.
  var prec_ols = prec_ts_smooth.select(['system:time_start','precipitation'])
                 .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_prec);
  var temp_ols = temp_ts_smooth.select(['system:time_start','temperature_2m'])
                 .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_temp);
  // Compute robust linear regression coefficients.
  var et_ols = et_ts_smooth.select(['system:time_start','L1_AETI_D'])
               .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_et);
  // Compute robust linear regression coefficients.
  var npp_ols = npp_ts_smooth.select(['system:time_start','L1_NPP_D'])
                .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_npp);
  // Compute robust linear regression coefficients.
  var rue_ols = rue_ts_smooth.select(['system:time_start','rain_use_efficiency'])
                .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_rue);
  // Compute robust linear regression coefficients.
  var wue_ols = wue_ts_smooth.select(['system:time_start','water_use_efficiency'])
                .reduce(ee.Reducer.linearFit()).select('scale').addBands(mk_trend_wue);
  var signif_ndvi = signif_mask(ndvi_restrend_ols.select('scale'), mk_trend_ndvi, START_YEAR, END_YEAR).rename('significance');
  var signif_ndmi = signif_mask(ndmi_restrend_ols.select('scale'), mk_trend_ndmi, START_YEAR, END_YEAR).rename('significance');
  var signif_rao = signif_mask(rao_ols.select('scale'), mk_trend_rao, START_YEAR, END_YEAR).rename('significance');
  var signif_bs = signif_mask(bs_ols.select('scale'), mk_trend_bs, START_YEAR, END_YEAR).rename('significance');
  var signif_prec = signif_mask(prec_ols.select('scale'), mk_trend_prec, START_YEAR, END_YEAR).rename('significance');
  var signif_temp = signif_mask(temp_ols.select('scale'), mk_trend_temp, START_YEAR, END_YEAR).rename('significance');
  var signif_npp = signif_mask(npp_ols.select('scale'), mk_trend_npp, START_YEAR_SHORT, END_YEAR).rename('significance');
  var signif_et = signif_mask(et_ols.select('scale'), mk_trend_et, START_YEAR_SHORT, END_YEAR).rename('significance');
  var signif_rue = signif_mask(rue_ols.select('scale'), mk_trend_rue, START_YEAR_SHORT, END_YEAR).rename('significance');
  var signif_wue = signif_mask(wue_ols.select('scale'), mk_trend_wue, START_YEAR_SHORT, END_YEAR).rename('significance');
  ndvi_restrend_ols = ndvi_restrend_ols.addBands(signif_ndvi);
  ndmi_restrend_ols = ndmi_restrend_ols.addBands(signif_ndmi);
  rao_ols = rao_ols.addBands(signif_rao);
  bs_ols = bs_ols.addBands(signif_bs);
  prec_ols = prec_ols.addBands(signif_prec);
  temp_ols = temp_ols.addBands(signif_temp);
  npp_ols = npp_ols.addBands(signif_npp);
  et_ols = et_ols.addBands(signif_et);
  rue_ols = rue_ols.addBands(signif_rue);
  wue_ols = wue_ols.addBands(signif_wue);
  vci = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/vci_lesotho_2021');
  lcci = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/lcci_lesotho_2021');
  //et_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/et_lesotho_2009_2021');
  //prec_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/prec_lesotho_2009_2021');
  //temp_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/temp_lesotho_2009_2021');
  //npp_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/npp_lesotho_2009_2021');
  //wue_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/wue_lesotho_2009_2021');
  //rue_ols = ee.Image('projects/earthengine-legacy/assets/users/ocsgeospatial/Lesotho/temp_indicators/rue_lesotho_2009_2021');
  ndvi_restrend_ols = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/ndvi_restrend_lesotho_1984_2021');
  ndmi_restrend_ols = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/ndmi_restrend_lesotho_1984_2021');
  bs_ols = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/bs_trend_lesotho_1984_2021');
  rao_cv = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/rao_cv_lesotho_1984_2021');
  rao_latest = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/rao_lesotho_2021');
  rao_ols = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/rao_trend_lesotho_1984_2021');
  bs_freq = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/bs_frequency_lesotho_2021');
  A = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/soil_erosion_lesotho_2021');
  S = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/sustainability_factor_lesotho_2021');
  median_image = ee.Image('projects/earthengine-legacy/assets/users/wb-nbs/lesotho/median_rgb_lesotho_2021');
  signif_ndvi = ndvi_restrend_ols.select('significance');
  signif_ndmi = ndmi_restrend_ols.select('significance');
  signif_rao = rao_ols.select('significance');
  signif_bs = bs_ols.select('significance');
  //var lc_change = ee.ImageCollection([classification_postproc.neq(classification_baseline).multiply(2).updateMask(lc_mask),
  //                                    classification_baseline.eq(classification_postproc).updateMask(lc_mask_baseline)])
  //                                    .mosaic();
  var lc_change = classification_baseline.neq(4).and(classification_postproc.eq(4)).multiply(7) // forest gain
                 .add(classification_baseline.neq(7).and(classification_postproc.eq(7)).multiply(8)) // wetland gain
                 .add(classification_baseline.eq(4)
                 .and(classification_postproc.eq(9).or(classification_postproc.eq(10))).multiply(1)) // forest --> short vegetation
                 .add(classification_baseline.eq(9).or(classification_baseline.eq(10))
                 .and(classification_postproc.eq(2).or(classification_postproc.eq(14))).multiply(4)) // short vegetation --> cropland
                 .add(classification_baseline.eq(7)
                 .and(classification_postproc.eq(9).or(classification_postproc.eq(10))).multiply(2)) // wetland --> short vegetation
                 .add(classification_baseline.neq(1).and(classification_postproc.eq(1)).multiply(6)) // built-up gain
                 .add(classification_baseline.eq(2).or(classification_baseline.eq(14))
                 .and(classification_postproc.eq(9).or(classification_postproc.eq(10))).multiply(5)) // cropland --> short vegetation
                 .add(classification_baseline.eq(7)
                 .and(classification_postproc.eq(2).or(classification_postproc.eq(14))).multiply(3)) // wetland --> cropland
                 .add(classification_baseline.eq(6).and(classification_postproc.neq(6)).multiply(9)) // water loss
                 .add(classification_baseline.neq(6).and(classification_postproc.eq(6)).multiply(10)) // water gain
                 .add(classification_baseline.neq(12).and(classification_postproc.eq(12)).multiply(12)) // Bare Surface gain
                 .add(classification_baseline.neq(15).and(classification_postproc.eq(15)).multiply(13)) // Gully gain
                 .add(classification_baseline.eq(10).and(classification_postproc.eq(9)).multiply(11)) // Grassland to Shrubland
                 //.add(change.eq(211).multiply(11)) // Ephemeral water
                 .selfMask()
                 .rename('constant');
  var change_classes = ee.Dictionary({'tree --> short vegetation': 1,
                                      'wetland --> short vegetation': 2,
                                      'wetland --> cropland': 3,
                                      'short vegetation --> cropland': 4,
                                      'cropland --> short vegetation': 5,
                                      'built-up gain': 6,
                                      'tree gain': 7,
                                      'wetland gain': 8,
                                      'water loss': 9,
                                      'water gain': 10,
                                      'grassland --> shrubland': 11,
                                      'bare surface gain': 12,
                                      'gully gain': 13
                                    });
  var change_palette = ['red', '#FFCC33', '#D07E0A', '#FAF909', '#DFF3BB', '#39F8FF', '#FF40FC', 
                        '#CC03A8', '#1C1E6B', '#161BDB', '#39FF14', '#e0c779', '#a52a2a']; 
  var change_names =  ['tree --> short vegetation', 'wetland --> short vegetation', 'wetland --> cropland', 'short vegetation --> cropland',
                      'cropland --> short vegetation', 'built-up gain', 'tree gain', 'wetland gain', 'water loss', 'water gain', 
                      'grassland --> shrubland', 'bare surface gain', 'gully gain'];
  var lc_change_func = function(feat){var catchment = feat.get('Catch_ID');
                                      var lc_type = feat.get('lc_type');
                                      var feat_endline = ee.FeatureCollection(catchments_fc_endline)
                                                         .filter(ee.Filter.and(ee.Filter.eq('Catch_ID', catchment), 
                                                                               ee.Filter.eq('lc_type', lc_type)))
                                                                               .first();
                                      return feat.set({'perc': ee.Number(feat_endline.get('area')).subtract(feat.get('area'))
                                                               .divide(feat.get('area')).multiply(1000).toInt16().divide(10),
                                                       'area': ee.Number(feat_endline.get('area')).subtract(feat.get('area'))
                                      });
  };
  var catchments_fc_change = ee.FeatureCollection(country.iterate(
                              catchment_stats(classification_baseline, classes, classification_names),
                             ee.FeatureCollection([])))
                             .map(lc_change_func);
  // Add a summary chart.
  var landCoverChangePerc_barChart = ui.Chart.feature.groups({
      features: catchments_fc_change,
      xProperty: 'catchment',
      yProperty: 'perc',
      seriesProperty: 'lc_type'
    })
    .setChartType('ColumnChart')
    .setSeriesNames(classification_names)
    .setOptions({
      title: 'Land Cover Change distribution '+baseline_year+'-'+year + ' (in %)',
      width: 200,
      height: 400,
      textPosition: "in",
      //orientation: "vertical",
      hAxis: {title: 'catchment ID', textStyle: {fontSize: 13}},
      vAxis: {title: '% Area'},
      colors: classification_palette_red,
      sliceVisibilityThreshold: 0, // Don't group small slices.
      //isStacked: 'absolute'
    });
  panel.add(landCoverChangePerc_barChart);
    // Add a summary chart.
  var landCoverChangeAbs_barChart = ui.Chart.feature.groups({
      features: catchments_fc_change,
      xProperty: 'catchment',
      yProperty: 'area',
      seriesProperty: 'lc_type'
    })
    .setChartType('ColumnChart')
    .setSeriesNames(classification_names)
    .setOptions({
      title: 'Land Cover Change distribution '+baseline_year+'-'+year + ' (in hectares)',
      width: 200,
      height: 400,
      textPosition: "in",
      //orientation: "vertical",
      hAxis: {title: 'catchment ID', textStyle: {fontSize: 13}},
      vAxis: {title: 'Area (hectares)'},
      colors: classification_palette_red,
      sliceVisibilityThreshold: 0, // Don't group small slices.
      //isStacked: 'absolute'
    });
  panel.add(landCoverChangeAbs_barChart);
  var catchments_lc_change = country.iterate(catchment_stats(lc_change.updateMask(lc_mask.or(lc_mask_baseline).and(lc_change.connectedPixelCount().gt(25))).reproject({scale:10, crs: 'EPSG:4326'}), 
                                             change_classes, change_names), ee.FeatureCollection([]));
    // Add a summary chart.
  var landCoverChange_pieChart = ui.Chart.feature.byFeature({
      features: catchments_lc_change,
      xProperty: 'lc_type',
      yProperties: ['area']
    })
    .setChartType('PieChart')
    .setOptions({title: 'Land Cover Change Type distribution '+baseline_year+'-'+year + ' (in hectares)',
                  colors: change_palette,
                  sliceVisibilityThreshold: 0 // Don't group small slices.
                  });
  panel.add(landCoverChange_pieChart);
  var landcoverChange_layer = ui.Map.Layer(lc_change.updateMask(lc_mask.or(lc_mask_baseline).and(lc_change.connectedPixelCount().gt(25))).reproject({scale:10, crs: 'EPSG:4326'}), 
                              {min: 1, max:13, palette: change_palette}, 
                              'LC Change '+baseline_year+'-'+year);
  var landCoverChange_legend = makeLegend('LC Change '+baseline_year+'-'+year, 
                                          change_palette, change_names, 12);
  if(adm1_name === 'Lesotho') {
    Map.addLayer(lc_change, {min: 1, max:13, palette: change_palette}, 'LC Change '+baseline_year+'-'+year);
  } else {
    Map.add(landcoverChange_layer);
  }
  Map.add(landCover_legend);
  Map.add(landCoverChange_legend);
  var freq_layer = ui.Map.Layer(bs_freq.multiply(100).updateMask(lc_mask).clip(country.geometry()), viz_freq,'Bare Soil Frequency (BSf, %)');
  var S_layer = ui.Map.Layer(S.updateMask(lc_mask).clip(country.geometry()), viz_S,'Sustainability Factor (S, dimensionless)');
  var A_layer = ui.Map.Layer(A.updateMask(lc_mask).clip(country.geometry()), viz_A, 'Soil Erosion Hazard (A, t.ha-1.yr-1)');//.setShown(false);
  var median_layer = ui.Map.Layer(median_image.clip(country.geometry()), {bands:['B4', 'B3', 'B2'], min: 0, max:2000}, 'Sentinel-2 Median Image');
  var vci_layer = ui.Map.Layer(vci.updateMask(lc_mask).clip(country.geometry()),
                               {min: -2, max: 2, palette: other_palette},
                               "Productivity State");
  var lcci_layer = ui.Map.Layer(lcci.updateMask(lc_mask.and(lcci.lte(0.5))).clip(country.geometry()),
                               {min: 0, max: 0.5, palette: lcci_palette},
                               "Productivity Performance");
  var prec_layer = ui.Map.Layer(prec_ols.select('scale')
                                .updateMask(lc_mask.and(signif_prec.neq(0)).and(signif_prec.abs().lte(3))).clip(country.geometry()),
                                {min: -10, max: 10, palette: other_palette},
                                'Precipitation Slope of Change');
  var temp_layer = ui.Map.Layer(temp_ols.select('scale')
                              .updateMask(lc_mask.and(signif_temp.neq(0)).and(signif_temp.abs().lte(3))).clip(country.geometry()),
                              {min: -0.1, max: 0.1, palette: other_palette},
                              'Temperature Slope of Change');
  var npp_layer = ui.Map.Layer(npp_ols.select('scale')
                            .updateMask(lc_mask.and(signif_npp.neq(0)).and(signif_npp.abs().lte(3))).clip(country.geometry()),
                            {min: -5, max: 5, palette: other_palette},
                            'Net Primary Productivity Slope of Change');
  var et_layer = ui.Map.Layer(et_ols.select('scale')
                            .updateMask(lc_mask.and(signif_et.neq(0)).and(signif_et.abs().lte(3))).clip(country.geometry()),
                            {min: -50, max: 50, palette: other_palette},
                            'Evapotranspiration Slope of Change');
  var rue_layer = ui.Map.Layer(rue_ols.select('scale')
                            .updateMask(lc_mask.and(signif_rue.neq(0)).and(signif_rue.abs().lte(3))).clip(country.geometry()),
                            {min: -0.01, max: 0.01, palette: other_palette},
                            'Rain Use Efficiency Slope of Change');
  var wue_layer = ui.Map.Layer(wue_ols.select('scale')
                            .updateMask(lc_mask.and(signif_wue.neq(0)).and(signif_wue.abs().lte(3))).clip(country.geometry()),
                            {min: -0.01, max: 0.01, palette: other_palette},
                            'Water Use Efficiency Slope of Change');
  var ndviKendall_layer = ui.Map.Layer(ndvi_restrend_ols.select('scale')
                                       .updateMask(lc_mask.and(signif_ndvi.neq(0)).and(signif_ndvi.abs().lte(3))).clip(country.geometry()),
                                       //ndvi_kendall.updateMask(lc_mask).clip(country.geometry()),
                                       //.where(p.gt(0.05), ee.Image(0).rename('scale').addBands(ee.Image(9).rename('offset'))),
                                       {palette: other_palette, min: -0.01, max: 0.01},
                                       //{palette: palettes.colorbrewer.RdYlGn[11], min: -1, max: 1},
                                       'Slope of NDVI 1984-2021 (blue: increasing, green: stable, red: decreasing)');
  var ndmiKendall_layer = ui.Map.Layer(ndmi_restrend_ols.select('scale')
                                       .updateMask(lc_mask.and(signif_ndmi.neq(0)).and(signif_ndmi.abs().lte(3))).clip(country.geometry()),
                                     //ndmi_kendall.updateMask(lc_mask).clip(country.geometry()),
                                     //.where(p.gt(0.05), ee.Image(0).rename('scale').addBands(ee.Image(9).rename('offset'))),
                                     {palette: other_palette, min: -0.01, max: 0.01},
                                     //{palette: palettes.colorbrewer.RdYlGn[11], min: -1, max: 1},
                                     'Slope of NDMI 1984-2021 (blue: increasing, green: stable, red: decreasing)');
  var raoMask_layer = ui.Map.Layer(wsf2019.unmask(0).eq(255).add(classification_postproc.eq(4).multiply(2))
                                   .selfMask().clip(country.geometry()),
                                   {palette: ['#c4281b', '#397e48'], min: 1, max: 2},
                                   'Forest/Built-up Mask');
  var raoKendall_layer = ui.Map.Layer(rao_ols.select('scale')
                                      .updateMask(rao_mask.and(classification_postproc.neq(4)).and(signif_rao.neq(0)).and(signif_rao.abs().lte(3)))
                                      .reproject({crs:'EPSG:4326', scale:30}).clip(country.geometry()),
                                      //rao_kendall.updateMask(rao_mask.and(classification_postproc.neq(4)))
                                      //.reproject({crs:'EPSG:4326', scale:30}).clip(country.geometry()),
                                      {palette: other_palette, min: -0.01, max: 0.01},
                                      //{palette: palettes.colorbrewer.RdYlGn[11], min: -1, max: 1},
                                      "Rao's Q Beta Diversity slope of change");
  var raoCV_layer = ui.Map.Layer(rao_cv.updateMask(rao_mask.and(classification_postproc.neq(4)))
                                       .reproject({crs:'EPSG:4326', scale:30}).clip(country.geometry()),
                                           {min: 0, max: 2, palette: palettes.matplotlib.viridis[7]},
                                           "Rao's Q Beta Diversity CV");
  var raoLatest_layer = ui.Map.Layer(rao_latest.updateMask(rao_mask.and(classification_postproc.neq(4)))
                                     .reproject({crs:'EPSG:4326', scale:10}).clip(country.geometry()),
                                     {min: 0, max: 0.7, palette: palettes.matplotlib.viridis[7]},
                                     "Rao's Q Alpha Diversity");
  var bsKendall_layer = ui.Map.Layer(bs_ols.select('scale')
                                      .updateMask(lc_mask.and(signif_bs.neq(0)).and(signif_bs.abs().lte(3))).clip(country.geometry()),
                                    {palette: S_palette, min: -0.01, max: 0.01},
                                    //{palette: palettes.colorbrewer.RdYlGn[11], min: -1, max: 1},
                                    "Bare Soil Frequency slope of change");
  var A_legend = populateLegend("Soil Erosion Hazard (A, t.ha-1.year-1)", viz_A, "", "+", {});
  var S_legend = populateLegend("Sustainability Factor (S, dimensionless)", viz_S," (positive)"," (negative)", {});
  var freq_legend = populateLegend("Bare Soil Frequency (BSf, %)", viz_freq, "", "", {});
  var ndviKendall_legend = populateLegend('Slope of NDVI Trend 1984-2021',
                                          {min:-0.01, max:0.01, palette: other_palette},
                                          " (decreasing)", " (increasing)", {});
  var ndmiKendall_legend = populateLegend('Slope of NDMI Trend 1984-2021',
                                        {min:-0.01, max:0.01, palette: other_palette},
                                        " (decreasing)", " (increasing)", {});
  var raoKendall_legend = populateLegend('Alpha Diversity Trend 1984-2021',
                                         {min:-0.01, max:0.01, palette: other_palette},
                                         " (decreasing)", " (increasing)", {});
  var raoMask_legend = makeLegend('Non-Natural Cover', ['#c4281b', '#397e48'], ['Builtup', 'Forest'], 1);
  var bsKendall_legend = populateLegend('Bare Soil Frequency Trend 1984-2021',
                                         {min:-0.01, max:0.01, palette: S_palette},
                                         " (decreasing)", " (increasing)", {});
  var prec_legend = populateLegend('Precipitation Trend 1984-2021',
                                  {min:-10, max:10, palette: other_palette},
                                  " (decreasing)", " (increasing)", {});
  var temp_legend = populateLegend('Temperature Trend 1984-2021',
                                   {min:-0.1, max:0.1, palette: other_palette},
                                    " (decreasing)", " (increasing)", {});
  var npp_legend = populateLegend('NPP Trend 2009-2021',
                                   {min:-5, max:5, palette: other_palette},
                                   " (decreasing)", " (increasing)", {});
  var et_legend = populateLegend('ET Trend 2009-2021',
                                {min:-50, max:50, palette: other_palette},
                                " (decreasing)", " (increasing)", {});
  var rue_legend = populateLegend('RUE Trend 2009-2021',
                                  {min:-0.01, max:0.01, palette: other_palette},
                                  " (decreasing)", " (increasing)", {});
  var wue_legend = populateLegend('WUE Trend 2009-2021',
                                  {min:-0.01, max:0.01, palette: other_palette},
                                  " (decreasing)", " (increasing)", {});
  var raoCV_legend = populateLegend('Beta diversity (Species Turnover) 1984-2021',
                                    {min:0, max:2, palette: palettes.matplotlib.viridis[7]},
                                    " (low)", "+ (high)", {});
  var raoLatest_legend = populateLegend('Alpha diversity 2021',
                                    {min:0, max: 1, palette: palettes.matplotlib.viridis[7]},
                                    " (low)", " (high)", {});
  var vci_legend = populateLegend('Productivity State',
                                    {min: -2, max: 2, palette: other_palette},
                                    "- (low)", "+ (high)", {});
  var lcci_legend = populateLegend('Productivity Performance',
                                   {min:0, max: 0.5, palette: lcci_palette},
                                   " (low)", "+ (high)", {});
  // Generate and plot global charts for the select area
  var ndviKendall_options = {title: 'Distribution of Slope of NDVI Trend 1984-2021',
                hAxis: {title: 'Trajectory Slope (-0.01: decreasing, +0.01: increasing)'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#ff0b0b', '#ff5100', '#ff7700', '#ff9800', '#fcb600', '#f4d200', '#eaed0d',
                         '#e8eb25', '#fcff14', '#9ad100', '#7fc700', '#62bc00', '#41b200', '#03a702'
                         , '#03a702']
  };
  var ndviKendall_histogram = charts.customHistogram(ndvi_restrend_ols.select('scale')
                                                     .updateMask(lc_mask.and(signif_ndvi.neq(0)).and(signif_ndvi.abs().lte(3))), 'scale', country.geometry(),
                                                     'x', ndviKendall_options, 20, 0.001).setChartType('ScatterChart');
  // Generate and plot global charts for the select area
  var ndmiKendall_options = {title: 'Distribution of Slope of NDMI Trend 1984-2021',
                hAxis: {title: 'Trajectory Slope (-0.01: decreasing, +0.01: increasing)'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#ff0b0b', '#ff5100', '#ff7700', '#ff9800', '#fcb600', '#f4d200', '#eaed0d',
                         '#e8eb25', '#fcff14', '#9ad100', '#7fc700', '#62bc00', '#41b200', '#03a702'
                         , '#03a702']
  };
  var ndmiKendall_histogram = charts.customHistogram(ndmi_restrend_ols.select('scale')
                                                     .updateMask(lc_mask.and(signif_ndmi.neq(0)).and(signif_ndmi.abs().lte(3))), 'scale', country.geometry(),
                                                     'x', ndviKendall_options, 20, 0.001).setChartType('ScatterChart');
  // Generate and plot global charts for the select area
  var raoKendall_options = {title: "Distribution of Slope of Rao's Q alpha diversity Trend 1984-2021",
                hAxis: {title: 'Trajectory Slope (-0.01: decreasing, +0.01: increasing)'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#ff0b0b', '#ff5100', '#ff7700', '#ff9800', '#fcb600', '#f4d200', '#eaed0d',
                         '#e8eb25', '#fcff14', '#9ad100', '#7fc700', '#62bc00', '#41b200', '#03a702'
                         , '#03a702']
  };
  var raoKendall_histogram = charts.customHistogram(rao_ols.select('scale')
                                                    .updateMask(rao_mask.and(classification_postproc.neq(4)).and(signif_rao.neq(0)).and(signif_rao.abs().lte(3))), 'scale',
                                                    country.geometry(),'x', raoKendall_options, 20, 0.001).setChartType('ScatterChart');
  // Generate and plot global charts for the select area
  var bsKendall_options = {title: "Distribution of Slope of Bare Soil Frequency Trend 1984-2021",
                hAxis: {title: 'Trajectory Slope (-0.01: decreasing, +0.01: increasing)'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#03a702', '#03a702', '#41b200', '#62bc00', '#7fc700', '#9ad100', '#fcff14',
                         '#e8eb25', '#eaed0d', '#f4d200', '#fcb600', '#ff9800', '#ff7700', '#ff5100','#ff0b0b']
  };
  var bsKendall_histogram = charts.customHistogram(bs_ols.select('scale')
                                                     .updateMask(lc_mask.and(signif_bs.neq(0)).and(signif_bs.abs().lte(3))), 'scale', country.geometry(),
                                                     'x', bsKendall_options, 20, 0.001).setChartType('ScatterChart');
  // Generate and plot global charts for the select area
  var raoCV_options = {title: "Distribution of Rao's Q Coefficient of Variation beta diversity Trend 1984-2021",
                hAxis: {title: 'Coefficient of Variation'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#2a4858', '#275061', '#23596a', '#1d6272', '#146b79', '#077480', '#007d85',
                         '#008689', '#008f8c', '#00988e', '#0ea18f', '#23aa8f', '#35b28e', '#47bb8c'
                         , '#58c389','#6acb86','#7dd382','#90db7e','#a4e27a', '#b8e976', '#cdef72', '#e3f570', '#fafa6e']
  };
  // Generate and plot global charts for the select area
  var raoLatest_options = {title: "Distribution of Rao's Q Coefficient of Variation beta diversity 2021",
                hAxis: {title: 'Rao Q'},
                vAxis: {title: 'Area (hectares)'},
                legend: {position: 'none'},
                pointSize: 10,
                colors: ['#2a4858', '#275061', '#23596a', '#1d6272', '#146b79', '#077480', '#007d85',
                         '#008689', '#008f8c', '#00988e', '#0ea18f', '#23aa8f', '#35b28e', '#47bb8c'
                         , '#58c389','#6acb86','#7dd382','#90db7e','#a4e27a', '#b8e976', '#cdef72', '#e3f570', '#fafa6e']
  };
  var raoCV_histogram = charts.customHistogram(rao_cv.updateMask(rao_mask.and(classification_postproc.neq(4))), 'rao_cv',
                                               country.geometry(), 'x', raoCV_options, 20, 0.1).setChartType('ScatterChart');
  var raoLatest_histogram = charts.customHistogram(rao_latest.updateMask(rao_mask.and(classification_postproc.neq(4))), 'rao',
                                                   country.geometry(), 'x', raoLatest_options, 20, 0.1).setChartType('ScatterChart');
  var ndviKendall_source = ui.Label('Gonzalez-Roglich, M., Zvoleff, A., Noon, M., Liniger, H., Fleiner, R., Harari, N., & Garcia, C. (2019). ' +
                                    'Synergizing global tools to monitor progress towards land degradation neutrality: Trends. Earth and the World ' +
                                    'Overview of Conservation Approaches and Technologies sustainable land management database. ' +
                                    'Environmental Science & Policy, 93, 34-42.');
  var ndviKendall_caption = ui.Label('The kendall correlation of the full Landsat NDVI time series (1984-2021). ' +
                                     'The trend determines whether there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  var ndmiKendall_caption = ui.Label('The kendall correlation of the full Landsat NDMI time series (1984-2021). ' +
                                     'The trend determines whether there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  var rao_source = ui.Label('Rocchini, D., Marcantonio, M., Da Re, D., Chirici, G., Galluzzi, M., Lenoir, J., ... & Ziv, G. (2019). ' +
                            'Time-lapsing biodiversity: An open source method for measuring diversity changes by remote sensing. ' +
                            'Remote Sensing of Environment, 231, 111192.');
  var raoKendall_caption = ui.Label('The kendall correlation of the Rao Quadratic Entropy calculated from the full Landsat NDVI time series (1984-2021). ' +
                                     'The trend determines whether there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  var bsKendall_caption = ui.Label('The kendall correlation of the full Landsat time series-derived bare soil frequency (1984-2021). ' +
                                     'The trend determines whether there was an increasing or decreasing trend in bare soil occurence in the monitoring period.');
  var prec_caption = ui.Label('The kendall correlation of the CHIRPS precipitation dataset (1984-2021). ' +
                                   'The trend determines whether there was an increasing or decreasing trend in precipitation in the monitoring period.');
  var temp_caption = ui.Label('The kendall correlation of the ERA5-LAND temperature record (1984-2021). ' +
                                   'The trend determines whether there was an increasing or decreasing trend in temperature in the monitoring period.');
  var npp_caption = ui.Label('The kendall correlation of the FAO WaPOR Net Primary Productivity (2009-2021). ' +
                                   'The trend determines whether there was an increasing or decreasing trend in NPP in the monitoring period.');
  var et_caption = ui.Label('The kendall correlation of the FAO WaPOR Actual Evapotranspiration and Interception (2009-2021). ' +
                                   'The trend determines whether there was an increasing or decreasing trend in aET in the monitoring period.');
  var rue_caption = ui.Label('The kendall correlation of the Rain Use Efficiency (2009-2021), based on CHIRPS precipitation and FAO WaPOR NPP. ' +
                                   'The trend determines whether there was an increasing or decreasing trend in RUE the monitoring period.');
  var wue_caption = ui.Label('The kendall correlation of the Water Use Efficiency (2009-2021), based on FAO WaPOR aET and NPP. ' +
                                   'The trend determines whether there was an increasing or decreasing trend in WUE in the monitoring period.');
  var raoCV_caption = ui.Label('The Coefficient of Variation calculated from the full Landsat NDVI time series (1984-2021). ' +
                               'The trend determines whether there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  var raoLatest_caption = ui.Label('The Beta Diversity calculated using the Rao Q on the NDVI median of the latest year to date.')
  var vci_caption = ui.Label('The productivity state of vegetation cover, which measures the state of vegetation productivity of the current year ' +
                             'with respect to a baseline period (i.e. previous 3 years). It is a short-term temporal indicator of drought stress.');
  var lcci_caption = ui.Label('The productivity performance of vegetation cover, which measures the performance vegetation productivity of the current year. ' +
                             'It is a short-term spatial indicator of relative performance against other pixels of similar land cover and soil conditions.');
  var chartNDVI = ui.Chart.image
                  .series({
                    imageCollection: residualComp.map(function(image){return image.updateMask(lc_mask)}).select(['NDVI_residual', 'NDMI_residual']),
                    region: country.geometry(),
                    reducer: ee.Reducer.mean(),
                    scale: 100,
                    xProperty: 'system:time_start',
                  })
                  .setSeriesNames(['NDVI_detrended', 'NDMI_detrended'])
                  .setOptions({
                    title: 'Annual NDVI/NDMI Median for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
                    trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true},
                                 1:{type: 'linear', color: '#316896', visibleInLegend: true},
                    },
                    colors: ['darkgreen', '#8A865D'],
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDVI/NDMI'},
                    lineWidth: 2,
                  });
  var chartRao = ui.Chart.image
                .series({
                  imageCollection: rao.map(function(image){return image.updateMask(lc_mask)}).select(['rao']),
                  region: country.geometry(),
                  reducer: ee.Reducer.mean(),
                  scale: 100,
                  xProperty: 'system:time_start',
                })
                .setSeriesNames(['AlphaDiversity'])
                .setOptions({
                  title: 'Beta Diversity for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
                  trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
                  },
                  colors: ['turquoise'],
                  hAxis: {title: 'Date'},
                  vAxis: {title: 'Rao Q'},
                  lineWidth: 2,
                });
  var chartBS = ui.Chart.image
              .series({
                imageCollection: residualComp.map(function(image){return image.updateMask(lc_mask)}).select(['bare_soil_frequency']),
                region: country.geometry(),
                reducer: ee.Reducer.mean(),
                scale: 100,
                xProperty: 'system:time_start',
              })
              .setSeriesNames(['BareSoilFrequency'])
              .setOptions({
                title: 'Bare Soil Frequency for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
                trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
                },
                colors: ['brown'],
                hAxis: {title: 'Date'},
                vAxis: {title: 'Bare Soil Frequency (%)'},
                lineWidth: 2,
              });
  var chartPrec = ui.Chart.image
          .series({
            imageCollection: prec_ts_smooth,
            region: country.geometry(),
            reducer: ee.Reducer.mean(),
            scale: 5566,
            xProperty: 'system:time_start',
          })
          .setSeriesNames(['precipitation'])
          .setOptions({
            title: 'Annual Precipitation for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
            trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
            },
            colors: ['blue'],
            hAxis: {title: 'Date'},
            vAxis: {title: 'precipitation (mm)'},
            lineWidth: 2,
          });
  var chartTemp = ui.Chart.image
      .series({
        imageCollection: temp_ts_smooth,
        region: country.geometry(),
        reducer: ee.Reducer.mean(),
        scale: 11132,
        xProperty: 'system:time_start',
      })
      .setSeriesNames(['temperature'])
      .setOptions({
        title: 'Annual mean temperature for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
        trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
        },
        colors: ['red'],
        hAxis: {title: 'Date'},
        vAxis: {title: 'temperature (°C)'},
        lineWidth: 2,
      });
  var chartNPP = ui.Chart.image
        .series({
          imageCollection: npp_ts_smooth,
          region: country.geometry(),
          reducer: ee.Reducer.mean(),
          scale: 248,
          xProperty: 'system:time_start',
        })
        .setSeriesNames(['NPP'])
        .setOptions({
          title: 'Annual NPP for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
          trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
          },
          colors: ['green'],
          hAxis: {title: 'Date'},
          vAxis: {title: 'NPP (kg/m²)'},
          lineWidth: 2,
        });
  var chartET = ui.Chart.image
        .series({
          imageCollection: et_ts_smooth,
          region: country.geometry(),
          reducer: ee.Reducer.mean(),
          scale: 248,
          xProperty: 'system:time_start',
        })
        .setSeriesNames(['aET'])
        .setOptions({
          title: 'Annual actual evapotranspiration for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
          trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
          },
          colors: ['purple'],
          hAxis: {title: 'Date'},
          vAxis: {title: 'evapotranspiration (mm)'},
          lineWidth: 2,
        });
  var chartRUE = ui.Chart.image
        .series({
          imageCollection: rue_ts_smooth,
          region: country.geometry(),
          reducer: ee.Reducer.mean(),
          scale: 248,
          xProperty: 'system:time_start',
        })
        .setSeriesNames(['rainUseEfficiency'])
        .setOptions({
          title: 'Annual Rain Use Efficiency for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
          trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
          },
          colors: ['turquoise'],
          hAxis: {title: 'Date'},
          vAxis: {title: 'Rain Use Efficiency (dimensionless)'},
          lineWidth: 2,
        });
  var chartWUE = ui.Chart.image
        .series({
          imageCollection: wue_ts_smooth,
          region: country.geometry(),
          reducer: ee.Reducer.mean(),
          scale: 248,
          xProperty: 'system:time_start',
        })
        .setSeriesNames(['waterUseEfficiency'])
        .setOptions({
          title: 'Annual Water Use Efficiency for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
          trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true}
          },
          colors: ['lightblue'],
          hAxis: {title: 'Date'},
          vAxis: {title: 'Water Use Efficiency (dimensionless)'},
          lineWidth: 2,
        });
  var plotsDD = ui.Select([], 'Select Plot');
  var plots = {};
  plots['Land Cover Baseline - '+baseline_year] = {'layers': [aoi_layer, landCoverBaseline_layer],
                                                'legends': [landCover_legend],
                                                'plots': [landCoverBaseline_pieChart, landCoverBaseline_barChart],
                                                'sources': [],
                                                'captions': []
                                                };
  plots['Land Cover Endline - '+year] = {'layers': [aoi_layer, landCoverEndline_layer],
                                                'legends': [landCover_legend],
                                                'plots': [landCoverEndline_pieChart, landCoverEndline_barChart],
                                                'sources': [],
                                                'captions': []
                                                };
  plots['Land Cover Change'] = {'layers': [aoi_layer, landCoverBaseline_layer, landCoverEndline_layer, landcoverChange_layer],
                                                          'legends': [landCover_legend, landCoverChange_legend],
                                                          'plots': [landCoverChangePerc_barChart, landCoverChangeAbs_barChart, landCoverChange_pieChart],
                                                          'sources': [],
                                                          'captions': []
                                                          }
  plots['Precipitation'] = {'layers': [aoi_layer, prec_layer],
                                                'legends': [prec_legend],
                                                'plots': [chartPrec],
                                                'sources': [ndviKendall_source],
                                                'captions': [prec_caption]
                                                }
  plots['Temperature'] = {'layers': [aoi_layer, temp_layer],
                                                      'legends': [temp_legend],
                                                      'plots': [chartTemp],
                                                      'sources': [ndviKendall_source],
                                                      'captions': [temp_caption]
                                                      }
  plots['Net Primary Productivity'] = {'layers': [aoi_layer, npp_layer],
                                                      'legends': [npp_legend],
                                                      'plots': [chartNPP],
                                                      'sources': [ndviKendall_source],
                                                      'captions': [npp_caption]
                                                      }
  plots['Evapotranspiration'] = {'layers': [aoi_layer, et_layer],
                                                      'legends': [et_legend],
                                                      'plots': [chartET],
                                                      'sources': [ndviKendall_source],
                                                      'captions': [et_caption]
                                                      }
  plots['Water Use Efficiency'] = {'layers': [aoi_layer, wue_layer],
                                                      'legends': [wue_legend],
                                                      'plots': [chartWUE],
                                                      'sources': [ndviKendall_source],
                                                      'captions': [wue_caption]
                                                      }
  plots['Rain Use Efficiency'] = {'layers': [aoi_layer, rue_layer],
                                                      'legends': [rue_legend],
                                                      'plots': [chartRUE],
                                                      'sources': [ndviKendall_source],
                                                      'captions': [rue_caption]
                                                      }
  plots['Landsat - Productivity Trajectory'] = {'layers': [aoi_layer, ndviKendall_layer],
                                                'legends': [ndviKendall_legend],
                                                'plots': [ndviKendall_histogram, chartNDVI],
                                                'sources': [ndviKendall_source],
                                                'captions': [ndviKendall_caption]
                                                }
  plots['Landsat - Moisture Trajectory'] = {'layers': [aoi_layer, ndmiKendall_layer],
                                              'legends': [ndmiKendall_legend],
                                              'plots': [ndmiKendall_histogram, chartNDVI],
                                              'sources': [ndviKendall_source],
                                              'captions': [ndmiKendall_caption]
                                              }
  plots['Landsat - Bare Soil Frequency Trajectory'] = {'layers': [aoi_layer, bsKendall_layer],
                                                  'legends': [bsKendall_legend],
                                                  'plots': [bsKendall_histogram, chartBS],
                                                  'sources': [ndviKendall_source],
                                                  'captions': [bsKendall_caption]
                                                  }
  plots['Landsat - Beta Diversity Trajectory'] = {'layers': [aoi_layer, raoMask_layer, raoKendall_layer],
                                                                  'legends': [raoKendall_legend, raoMask_legend],
                                                                  'plots': [raoKendall_histogram, chartRao],
                                                                  'sources': [rao_source],
                                                                  'captions': [raoKendall_caption]
                                                                  }
  plots['Landsat - Beta Diversity Species Turnover'] = {'layers': [aoi_layer, raoMask_layer, raoCV_layer],
                                                                    'legends': [raoCV_legend, raoMask_legend],
                                                                    'plots': [raoCV_histogram],
                                                                    'sources': [rao_source],
                                                                    'captions': [raoCV_caption]
                                                                    }
  plots['Sentinel-2 - Beta Diversity'] = {'layers': [aoi_layer, raoMask_layer, raoLatest_layer],
                                          'legends': [raoLatest_legend, raoMask_legend],
                                          'plots': [raoLatest_histogram],
                                          'sources': [rao_source],
                                          'captions': [raoLatest_caption]
                                          }
  plots['Sentinel-2 - Productivity State'] = {'layers': [aoi_layer, vci_layer],
                                              'legends': [vci_legend],
                                              'plots': [],
                                              'sources': [ndviKendall_source],
                                              'captions': [vci_caption]
                                              }
  plots['Sentinel-2 - Productivity Performance'] = {'layers': [aoi_layer, lcci_layer],
                                                    'legends': [lcci_legend],
                                                    'plots': [],
                                                    'sources': [ndviKendall_source],
                                                    'captions': [lcci_caption]
                                                    }
  // Generate and plot global charts for the select area
  var bs_options = {title: 'Bare Soil Frequency (BSf) Distribution - Kenya Jan-Dec 2020',
                    hAxis: {title: '% of bare soil occurence'},
                    vAxis: {title: 'surface area (hectares)'},
                    legend: {position: 'none'},
                    pointSize: 10,
                    colors: ["#420a68", "#530e6c", "#63136e", "#731a6e", "#83206b", "#932567", "#a42b61",
                             "#b43359", "#c33b4f", "#d04545", "#dd5039", "#e85e2d", "#f06e21", "#f77f13",
                             "#fa9207", "#fca40b", "#fcb91d", "#f9cc35", "#f5e155"]
      };
  var freq_hist = charts.customHistogram(bs_freq.multiply(100).selfMask(), 'bare_soil_frequency',
                                            country.geometry(), 'x', bs_options, 20, 5).setChartType('ScatterChart');
  var A_options =  {title: 'Soil Erosion Hazard (Log A) Distribution - Kenya Jan-Dec 2020',
          hAxis: {title: 'log ton/hectare/year'},
          vAxis: {title: 'surface area (hectares)'},
          legend: {position: 'none'},
          series: {0: {color: "#993404"}}
  };
  var A_hist = charts.customHistogram(A.log(), 'soil_erosion_hazard', country.geometry(), 'label', A_options, null, 0.1).setChartType('ColumnChart');
  var S_options =  {title: 'Soil Erosion Hazard (Log A) Distribution - Kenya Jan-Dec 2020',
          hAxis: {title: 'log ton/hectare/year'},
          vAxis: {title: 'surface area (hectares)'},
          legend: {position: 'none'},
          series: {0: {color: "green"}}
  };
  var S_hist = charts.customHistogram(S.log(), 'sustainability_factor', country.geometry(), 'label', S_options, null, 0.1).setChartType('ColumnChart');
  ui.Label('The kendall correlation of the Rao Quadratic Entropy calculated from the full Landsat NDVI time series (1984-2021). ' +
                                     'The trend determines Whereas there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  ui.Label('The Coefficient of Variation calculated from the full Landsat NDVI time series (1984-2021). ' +
                               'The trend determines Whereas there was an increasing or decreasing trend in vegetation vigor in the monitoring period.');
  ui.Label('The Beta Diversity calculated using the Rao Q on the NDVI median of the latest year to date.')
  ui.Label('The productivity state of vegetation cover, which measures the state of vegetation productivity of the current year ' +
                             'with respect to a baseline period (i.e. previous 3 years). It is a short-term temporal indicator of drought stress.');
  ui.Label('The productivity performance of vegetation cover, which measures the performance vegetation productivity of the current year. ' +
                             'It is a short-term spatial indicator of relative performance against other pixels of similar land cover and soil conditions.');
  var freq_caption = ui.Label('Observed annual bare soil frequency based on the GEOS3 algorithm.');
  var freq_source =  ui.Label('Demattê, J. A., Safanelli, J. L., Poppiel, R. R., Rizzo, R., Silvero, N. E. Q., de Sousa Mendes, W., ' +
                              '... & da Silva Lisboa, C. J. (2020). ' +
                              'Bare earth’s surface spectra as a proxy for soil resource monitoring. Scientific reports, 10(1), 1-11.');
  var A_caption = ui.Label('Soil Erosion Rate calculated using the RUSLE equation, expressed in t/ha/year.');
  var median_caption = ui.Label('A sentinel-2 RGB median image corresponding to the endline year of analysis.')
  var A_source = ui.Label('Renard, K. G., Foster, G. R., Weesies, G. A., & Porter, J. P. (1991). ' +
                          'RUSLE: Revised universal soil loss equation. Journal of soil and Water Conservation, 46(1), 30-33.');
  var S_caption = ui.Label('Sustainability factor calculated for a given year. It expresses the sustainability of the landscape management ' +
                           'through assessment of the vegetation cover (calculated as an annual integral), ' +
                           'and the presence of linear features in the landscape that could prevent soil erosion (using a Sobel filter)');
  var S_source = ui.Label('Karydas, C. G., & Panagos, P. (2018). The G2 erosion model: An algorithm for month-time step assessments. Environmental research, 161, 256-267.');
  plots['Sentinel-2 - RUSLE Soil Erosion Rate'] = {'layers': [aoi_layer, A_layer],
                                                  'legends': [A_legend],
                                                  'plots': [A_hist],
                                                  'sources': [A_source],
                                                  'captions': [A_caption]
                                                  }
  plots['Sentinel-2 - RUSLE Sustainability Factor'] = {'layers': [aoi_layer, S_layer],
                                                      'legends': [S_legend],
                                                      'plots': [S_hist],
                                                      'sources': [S_source],
                                                      'captions': [S_caption]
                                                      }
  plots['Sentinel-2 - Bare Soil Frequency'] = {'layers': [aoi_layer, freq_layer],
                                                  'legends': [freq_legend],
                                                  'plots': [freq_hist],
                                                  'sources': [freq_source],
                                                  'captions': [freq_caption]
                                                  }
  plots['Sentinel-2 - Median RGB'] = {'layers': [aoi_layer, median_layer],
                                                'legends': [],
                                                'plots': [],
                                                'sources': [],
                                                'captions': [median_caption]
                                                }
  /*
  Export.image.toAsset({
    image: lcci.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/lcci',
    maxPixels: 1e13,
    description: 'lcci_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: vci.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/vci',
    maxPixels: 1e13,
    description: 'vci_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: prec_ols.toFloat().clip(country.geometry()),
    scale: 5500,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/prec',
    maxPixels: 1e13,
    description: 'precipitation_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: temp_ols.toFloat().clip(country.geometry()),
    scale: 11132,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/temp',
    maxPixels: 1e13,
    description: 'temperature_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: et_ols.toFloat().clip(country.geometry()),
    scale: 250,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/et',
    maxPixels: 1e13,
    description: 'evapotranspiration_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: npp_ols.toFloat().clip(country.geometry()),
    scale: 250,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/npp',
    maxPixels: 1e13,
    description: 'npp_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: ndvi_restrend_ols.toFloat().clip(country.geometry()),
    scale: 30,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/ndvi_restrend',
    maxPixels: 1e13,
    description: 'ndviResidual_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: ndmi_restrend_ols.toFloat().clip(country.geometry()),
    scale: 30,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/ndmi_restrend',
    maxPixels: 1e13,
    description: 'ndmiResidual_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: rao_ols.toFloat().clip(country.geometry()),
    scale: 30,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/rao_trend',
    maxPixels: 1e13,
    description: 'raoTrend_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: wue_ols.toFloat().clip(country.geometry()),
    scale: 250,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/wue',
    maxPixels: 1e13,
    description: 'wue_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: rue_ols.toFloat().clip(country.geometry()),
    scale: 250,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/rue',
    maxPixels: 1e13,
    description: 'rue_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: rao_cv.toFloat().clip(country.geometry()),
    scale: 30,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/rao_cv',
    maxPixels: 1e13,
    description: 'raoCV_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: rao_latest.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/rao',
    maxPixels: 1e13,
    description: 'raoLatest_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: A.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/soil_erosion',
    maxPixels: 1e13,
    description: 'soilErosionRate_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: S.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/S',
    maxPixels: 1e13,
    description: 'SustainabilityFactor_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: median_image.toInt16().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/median',
    maxPixels: 1e13,
    description: 'medianImage_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: bs_freq.toFloat().clip(country.geometry()),
    scale: 10,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/bs_frequency',
    maxPixels: 1e13,
    description: 'bs_frequency_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  Export.image.toAsset({
    image: bs_ols.toFloat().clip(country.geometry()),
    scale: 30,
    crs: 'EPSG:4326',
    assetId: 'users/wb-nbs/rwanda/bs_trend',
    maxPixels: 1e13,
    description: 'bs_trend_'+adm0_name,
    pyramidingPolicy: 'MEAN',
    region: country.geometry()
  });
  */
  // Initiate drawing tools functionalities
  var drawing_elements =  drawingTools.initializeDrawingTools();
  var drawing_tools = drawing_elements[0];
  var control_panel = drawing_elements[1];
  //panel.add(ui.Label({value: '🌎 LCDB' + year + ' download link single band raster️', style: {fontWeight: 'bold'}})
  //.setUrl('https://s3.waw2-1.cloudferro.com/swift/v1/AUTH_3b25838791bc4272a2d905ab2107fd13/fao-croplc/pred_mosaic_32735_raw_D'+year+'-10-11T14-21-00_B1.tif'));
  //panel.add(ui.Label({value: '🌎 LCDB' + year + ' download link three band raster️', style: {fontWeight: 'bold'}})
  //.setUrl('https://s3.waw2-1.cloudferro.com/swift/v1/AUTH_3b25838791bc4272a2d905ab2107fd13/fao-croplc/pred_mosaic_32735_raw_D'+year+'-10-11T14-21-00_B1_color.tif'));
  ee.List(Object.keys(plots)).evaluate(function(plotNames)
  {
    plots_panel.remove(proc_label);
    plotsDD.items().reset(plotNames);
    plotsDD.setPlaceholder('Select a Plot');
    plotsDD.onChange(function(plot){
      var plot_elems = plots[plot];
      var elems = panel.widgets();
      panel.widgets().reset(button_widgets);
      Map.clear();
      Map.setOptions("SATELLITE");
      Map.add(plots_panel);
      Map.add(control_panel);
      Map.layers().reset(plot_elems['layers']);
      plot_elems['legends'].forEach(function(legend){Map.add(legend)});
      plot_elems['plots'].forEach(function(plot){var table = plot.getDataTable();
                                                 var type = plot.getChartType();
                                                 var options = plot.getOptions();
                                                 var view = plot.getView();
                                                 var download = plot.getDownloadable();
                                                 var new_plot = ui.Chart(table, type, options, view, download);
                                                 panel.add(new_plot)});
      plot_elems['captions'].forEach(function(caption){panel.add(ui.Label('Caption:', {fontWeight: 'bold'}));
                                                       panel.add(caption)});
      plot_elems['sources'].forEach(function(source){panel.add(ui.Label('Source:', {fontWeight: 'bold'}));
                                                     panel.add(source)});
    })
  })
  var plots_panel = ui.Panel({widgets:[ui.Label('Choose your ICM indicator:', {fontWeight: 'bold'}),
                             plotsDD],
                    style: {position: 'top-right',
                    fontSize: '10px',
                    width: '275px'
            },
                    layout: null
  })
  plots_panel.add(proc_label);
  Map.add(plots_panel);
  Map.add(control_panel);
  // Define event when the button is clicked.
  // The time series are generated and plotted in the console.
  drawing_tools.onDraw(ui.util.debounce(chartCustomTimeSeries, 500));
  drawing_tools.onEdit(ui.util.debounce(chartCustomTimeSeries, 500));
  function chartCustomTimeSeries(){
    // Get the drawn geometry; it will define the reduction region.
    var aoi = drawing_tools.layers().get(0).getEeObject();
    var short_date_range = ee.Dictionary({'start': year+'-01-01', 'end': year+'-12-31'});
      // Set the drawing mode back to null; turns drawing off.
    drawing_tools.setShape(null);
    // Reduction scale is based on map scale to avoid memory/timeout errors.
    var map_scale = Map.getScale();
    var scale = map_scale > 250 ? 250 : 100;
    residualComp = residual_ts(aoi);
      // Generate plot title
    var pt_title =  ' - centroid coordinates (lon/lat): '
                    + ee.Number(aoi.centroid(0.001).coordinates().get(0)).multiply(1e6).round().divide(1e6).getInfo() + ', '
                    + ee.Number(aoi.centroid(0.001).coordinates().get(1)).multiply(1e6).round().divide(1e6).getInfo();
    /*    
      var optionsPrecET = {
        title: 'Decadal evapotranspiration and precipitation for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo() + pt_title,
        hAxis: {title: 'Date'},
        vAxis: {title: 'evapotranspiration (x0.1 mm) /precipitation (mm)'},
        trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true},
                    1:{type: 'linear', color: 'red', visibleInLegend: true}},
        legend: null,
        series: {
          0: {lineWidth: 2, pointSize: 0, color: 'blue' },
          1: {lineWidth: 2, pointSize: 0, color: 'orange' }
        }
      };
    // Plot chart
    var chartPrecET = plotSeries([prec_ts_smooth, et_ts_smooth], 
                                 aoi, 
                                 scale, 
                                 ['precipitation', 'evapotranspiration'], 
                                 optionsPrecET);
    panel.add(chartPrecET);
    var optionsNPP = {
        title: 'Decadal net primary productivity for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo() + pt_title,
        hAxis: {title: 'Date'},
        vAxis: {title: 'net primary productivity (kg/m²)'},
        trendlines: {0:{type: 'linear', color: 'darkgreen', visibleInLegend: true}},
        legend: null,
        series: {
          0: {lineWidth: 2, pointSize: 0, color: 'lightgreen' }
        }
      };
    // Plot chart
    var chartNPP = plotSeries([npp_ts_smooth], 
                              aoi, 
                              scale, 
                              ['net_primary_productivity'], 
                              optionsNPP);
    panel.add(chartNPP);
    var optionsWUE = {
    title: 'Decadal water use efficiency for ' + START_YEAR_SHORT.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo() + pt_title,
    hAxis: {title: 'Date'},
    vAxis: {title: 'Water/Rain Use Efficiency (kg/m²/mm)'},
    trendlines: {0:{type: 'linear', color: '#2E5090', visibleInLegend: true},
                 1:{type: 'linear', color: '#0492C2', visibleInLegend: true},
    },
    legend: null,
    series: {
      0: {lineWidth: 2, pointSize: 0, color: '#797EF6'},
      1: {lineWidth: 2, pointSize: 0, color: '#82EEFD' }
    }
  };
  // Plot chart
  var chartWUE = plotSeries([rue_ts_smooth,
                             wue_ts_smooth], 
                            aoi, 
                            scale, 
                            ['rain_use_efficiency', 'water_use_efficiency'], 
                            optionsWUE);
  panel.add(chartWUE);
  */
  var chartNDVI = ui.Chart.image
                          .series({
                            imageCollection: residualComp.select(['NDVI_residual', 'NDMI_residual']),
                            region: aoi,
                            reducer: ee.Reducer.mean(),
                            scale: scale,
                            xProperty: 'system:time_start',
                          })
                          .setSeriesNames(['NDVI_detrended', 'NDMI_detrended'])
                          .setOptions({
                            title: 'Monthly NDVI Median for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
                            trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true},
                                         1:{type: 'linear', color: '#316896', visibleInLegend: true},
                            },
                            colors: ['darkgreen', '#8A865D'],
                            hAxis: {title: 'Date'},
                            vAxis: {title: 'NDVI/NDMI'},
                            lineWidth: 2,
                          });
  panel.add(chartNDVI);
  var chartBS = ui.Chart.image
                          .series({
                            imageCollection: residualComp.select(['bare_soil_frequency']),
                            region: aoi,
                            reducer: ee.Reducer.mean(),
                            scale: scale,
                            xProperty: 'system:time_start',
                          })
                          .setSeriesNames(['bare_soil_frequency'])
                          .setOptions({
                            title: 'Lesotho Annual Bare Soil Frequency for ' + START_YEAR.get('year').getInfo() + '-' + END_YEAR.get('year').getInfo(),
                            trendlines: {0:{type: 'linear', color: 'black', visibleInLegend: true},
                            },
                            colors: ['brown'],
                            hAxis: {title: 'Date'},
                            vAxis: {title: 'Bare Soil Frequency (%)'},
                            lineWidth: 2,
                          });
  panel.add(chartBS);
  // Load the Sentinel-2 collection for the time period and area requested
  var s2_cl = S2Masks.loadImageCollection('COPERNICUS/S2_SR', short_date_range, aoi);
  // Perform cloud masking using the S2 cloud probabilities assets from s2cloudless,
  // courtesy of Sentinelhub/EU/Copernicus/ESA
  var masked_collection = s2_cl.filter(ee.Filter.notNull(['MEAN_INCIDENCE_AZIMUTH_ANGLE_B3', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B4', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B5', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B6', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B7', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B8A', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B11', 
                                                        'MEAN_INCIDENCE_AZIMUTH_ANGLE_B12',
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B3', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B4', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B5', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B6', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B7', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B8A', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B11', 
                                                        'MEAN_INCIDENCE_ZENITH_ANGLE_B12',
                                                        'MEAN_SOLAR_AZIMUTH_ANGLE',
                                                        'MEAN_SOLAR_ZENITH_ANGLE']))
                          .map(S2Masks.addCloudShadowMask(water.not(), 1e4))
                          .map(S2Masks.applyCloudShadowMask)
                          .map(S2FCover.fcover(1e4))
                          .select(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12', 'fcover']);
  // Apply bare soil filter using the GEOS3 algorithm
  var bs_collection = masked_collection.map(function(img){var geos3 = S2Masks.addGEOS3Mask(img);
                                                          return img.updateMask(geos3)});
  // Set base date to generate a Day of Year layer
  var from_date =  ee.Date.parse('YYYY-MM-dd', short_date_range.get('start'));
  // Specify band list required for the plots to generate
  var band_list = ['fcover'];
  // Generate the series to be used as input for the drawing tool plot.
  var plot_series = drawingTools.preparePlotSeries(masked_collection, bs_collection, aoi,
                                                   from_date, short_date_range, band_list);
  drawing_tools.setShape(null);
    // The input images required to generate the charts from drawn geometries
  var input_image = slope_rad.tan().multiply(100)
                    .addBands(bs_freq.multiply(100))
                    .addBands(A)
                    .updateMask(bs_freq.gt(0));
  var red_outputs = drawingTools.drawPlot(input_image, plot_series, aoi, year);
  var slope_label = ui.Label(); // Mean Slope Steepness in %
  var bs_freq_label = ui.Label(); // Mean Bare Soil Frequency in %
  var A_label = ui.Label(); // Mean Annual Soil Loss Rate in t.ha-1.year-1
  red_outputs[1].evaluate(function(result){
      result = ee.List(result);
      panel.remove(proc_label);
      slope_label.setValue("Mean Slope Steepness: " + result.get(1).getInfo() + " %");
      bs_freq_label.setValue("Mean Bare Soil Frequency: " + result.get(0).getInfo() + " %");
      A_label.setValue("Mean Annual Soil Loss Rate: " + result.get(2).getInfo() + " t.ha-1.yr-1");
  });
  panel.add(red_outputs[0]);
  panel.add(proc_label);
  panel.add(slope_label);
  panel.add(bs_freq_label);
  panel.add(A_label);
  }
}
var makeLegend = function(title, palette, class_names, class_length){
  // Create a legend for the different crop types
  // set position of panel
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '12px 15px'
    }
  });
  // Create legend title
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
  // Add the title to the panel
  legend.add(legendTitle);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
        // Create the label that is actually the colored box.
        var colorBox = ui.Label({
          style: {
            backgroundColor: color,
            // Use padding to give the box height and width.
            padding: '8px',
            fontSize: '12px',
            margin: '0 0 4px 0'
          }
        });
        // Create the label filled with the description text.
        var description = ui.Label({
          value: name,
          style: {margin: '0 0 4px 6px'}
        });
        // return the panel
        return ui.Panel({
          widgets: [colorBox, description],
          layout: ui.Panel.Layout.Flow('horizontal')
        });
  };
  // Add color and and names
  for (var i = 0; i <= class_length; i++) {
    legend.add(makeRow(palette[i], class_names[i]));
    }
  return legend
}
// Function to populate the color palette legends for the app layers
var populateLegend = function(legend_name, viz_params, add_char_min, add_char_max, options){
    // Create a legend for the different crop types
    // set position of panel
    var legend = ui.Panel({
      style: {
        position: 'bottom-left',
        padding: '12px 15px'
      }
    });
    // Create legend title
    var legend_title = ui.Label({
      value: legend_name,
      style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 0 0',
      padding: '0',
      //width: '115px'
      }
      });
    // Add the title to the panel
    legend.add(legend_title);
    // create the legend image
    var lon = ee.Image.pixelLonLat().select('latitude');
    var gradient = lon.multiply(ee.Number(viz_params.max).subtract(viz_params.min).divide(100)).add(viz_params.min);
    var legend_image = options.legend_image || gradient.visualize(viz_params);
    // create text on top of legend
    var legend_panel_max = ui.Panel({
      widgets: [
      ui.Label(viz_params['max'] + add_char_max)
      ],
      });
    legend.add(legend_panel_max);
    // create thumbnail from the image
    var thumbnail = ui.Thumbnail({
      image: legend_image ,
      params: {bbox: '0,0,10,100', dimensions:'10x25'},
      style: {padding: '1px', position: 'bottom-center', fontSize: '18px'}
      });
    // add the thumbnail to the legend
    legend.add(thumbnail);
    // create text on top of legend
    var legend_panel_min = ui.Panel({
      widgets: [
      ui.Label(viz_params['min'] + add_char_min)
      ],
      });
    legend.add(legend_panel_min);
    return legend
};
var landCover_legend = makeLegend('Land Cover Legend', classification_palette_red, classification_names, 9);
// Stashing GUI Buttons to carry over when onClick event occurs
var elems = panel.widgets();
var button_widgets = [elems.get(0), elems.get(1), elems.get(2), elems.get(3), elems.get(4), elems.get(5), elems.get(6), elems.get(7),
                      elems.get(8), elems.get(9), elems.get(10), elems.get(11), elems.get(12), elems.get(13), elems.get(14), elems.get(15), 
                      elems.get(16)//, elems.get(17)
                      ];