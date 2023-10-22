var ROIs = require('users/victormyroniuk/amber_ukraine:utilities/ROIs.js');
var FUNs = require('users/victormyroniuk/amber_ukraine:utilities/FUNs.js');
var ftv_2019 = ee.Image('users/victormyroniuk/LandTrendr/Amb/ltAmber2019_loss_1st'); // the last loss segment
var ftv_2021 = ee.Image('users/victormyroniuk/LandTrendr/Amb/ltAmber2021_loss_1st'); // the last loss segment
var ftv_2022 = ee.Image('users/victormyroniuk/LandTrendr/Amb/ltAmber2022_loss_1st'); // the last loss segment
var current_year = 2022;
var FMU = ROIs.FMU;
var subFMU = ROIs.subFMU;
var LS = ROIs.LS;
// User interface
var visLabels = {
  fontWeight: 'bold', 
  fontSize: '12px', 
  padding: '4px 4px 4px 4px',
  border: '1px solid black',
  color: 'white',
  backgroundColor: 'black',
  textAlign: 'left',
  stretch: 'horizontal'
  };
var legend = ee.Image('users/victormyroniuk/FT/Amber/Levels_geotiff').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });  
// Massage panel ---
// version & license
var version_label = ui.Label({
  value: 'Author: Viktor Myroniuk      Version: v.22.1\
         \nThis application was developed with the support of',
  style: {fontSize: '12px', whiteSpace: 'pre', margin: '4px 4px 0px 4px'}
});
var url1 = ui.Label({
  value: 'FSC Ukraine',
  style: {fontSize: '12px', color: 'blue', margin: '1px 1px 1px 4px'},
  targetUrl: 'https://ua.fsc.org/ua-en'
});
var text2 = ui.Label({
  value: 'to monitor',
  style: {fontSize: '12px', margin: '1px'}
});
var url2 = ui.Label({
  value: 'illegal amber mining areas in Ukraine.',
  style: {fontSize: '12px', color: 'blue', margin: '1px'},
  targetUrl: 'https://zakon.rada.gov.ua/rada/show/v0138820-17#Text'
});
var version_panel = ui.Panel({
  widgets: [
    url1,
    text2,
    url2
  ],
  layout: ui.Panel.Layout.flow("horizontal"),
  style: {
    width: "375px",
  }
});
var share_label = ui.Label({
  value: 'Share and cite:',
  style: {fontSize: '12px', fontWeight: 'bold', padding: '0px', margin: '4px 4px 0px 4px'}
});
var ref_label = ui.Label({
  value: 'Myroniuk, V., Bilous, A., Khan, Y., Terentiev, A., Kravets, P., Kovalevskyi, S., & See, L. (2020).\
  \nTracking Rates of Forest Disturbance and Associated Carbon Loss in Areas of\
  \nIllegal Amber Mining in Ukraine Using Landsat Time Series. Remote Sensing, 12(14), 2235.',
  style: {fontSize: '12px', color: 'blue', padding: '0px', margin: '0px 4px 4px 4px'}
}).setUrl('https://doi.org/10.3390/rs12142235');
var license_label1 = ui.Label({
  value: 'License:',
  style: {fontSize: '12px', fontWeight: 'bold', padding: '0px', margin: '4px 4px 0px 4px'}
});
var license_label2 = ui.Label({
  value: 'Creative Commons Attribution 4.0 International License:',
  style: {fontSize: '12px', padding: '0px', margin: '0px 4px 4px 4px'}
});
// instructions
var getstarted_label1 = ui.Label({
  value: 'To get started:',
  style: {fontSize: '12px', fontWeight: 'bold', padding: '0px', margin: '4px 4px 0px 4px'}
});
var getstarted_label2 = ui.Label({
  value: 'Select an area of interest (AOI) using dropdown menus',
  style: {fontSize: '12px', padding: '0px', margin: '0px 4px 4px 4px'}
});
var instructions_1 = ui.Label({
  value: 'Use [Oblast/Region] to get lists of\
         \nthe forest management units (FMU) and associated list\
         \nof the forest management sub-units (sub-FMU)',
  style: {fontSize: '12px', color: 'grey'}
});
var instructions_2 = ui.Label({
  value: 'Use [Show AOI] to focus on the area\
         \nand get tools for the analysis',
  style: {fontSize: '12px', color: 'grey'}
});
var instructions_3 = ui.Label({
  value: 'Use [Plot disturbance] to display a chart\
         \nof forest loss and gain dynamics.\
         \nSelect a year of disturbance [YOD] to map disturbance/recovery.',
  style: {fontSize: '12px', color: 'grey'}
});
var massage_panel = ui.Panel({
  widgets: [
    version_label,
    version_panel,
    share_label,
    ref_label,
    license_label1,
    license_label2,
    getstarted_label1,
    getstarted_label2,
    instructions_1
    ]
});
// End massage panel
// Dropdown menu
var selector_reg = ui.Select({
  placeholder: "Oblast/Region",
  items: Object.keys(FMU),
  onChange: function(value){
      ee.List(FMU[value]).evaluate(function(fmu){
        selector_fmu.items().reset(fmu);
        selector_fmu.setValue(fmu[0]);
      });
    }
});
var selector_fmu = ui.Select({
   placeholder: "FMU",
   onChange: function(value){
    ee.String(value).evaluate(function(subfmu){
      var subfmu_list = subFMU[subfmu];
      selector_subfmu.items().reset(subfmu_list);
      selector_subfmu.setValue(subfmu_list[0]);
    });
  }
});
var selector_subfmu = ui.Select({
  placeholder: "sub-FMU",
  onChange: function(){
    massage_panel.clear();
    massage_panel.add(instructions_2),
    title_change.style().set('shown', false);
    make_plot.style().set('shown', false);
    map_clear.style().set('shown', false);
    map_dnbr_panel.style().set('shown', false);
    // title_export.style().set('shown', false);
    // export_panel.style().set('shown', false);
    output_panel.style().set('shown', false);
    chart_panel.clear();
    plot_dist_panel.style().set('shown', true);
    var vars = get_var(selector_subfmu.getValue());
    var years = vars.years;
    years = ee.List(years).map(function(yr){
      return ee.Number(yr).format("%04d");
    });
    ee.List(years).evaluate(function(years){
      selector_year.items().reset(years);
    });
  }
});
var dropdown_selectors = ui.Panel({
  layout: ui.Panel.Layout.Flow('horizontal'),
  widgets: [
    selector_reg,
    selector_fmu,
    selector_subfmu
    ]
});
// End dropdown menu
// Output panel
var output_cumulative = ui.Label({
  style: {'fontSize': '12px',
          'color': '#3467cc',
          'shown': false}
});
var output_yearly = ui.Label({
  style: {'fontSize': '12px', 
          'color': '#dd401b',
          'shown': false}
});
var output_gain = ui.Label({
  style: {'fontSize': '12px',
          'color': 'blue',
          'shown': false}
});
var output_panel = ui.Panel({
  widgets:[
    output_cumulative,
    output_yearly,
    output_gain
    ]
});
// End output panel
// Plot disturbance panel
var show_aoi = ui.Button({
  label: "Show AOI",
  onClick: function(){
    Map.setOptions('SATELLITE');
    massage_panel.clear();
    massage_panel.add(instructions_3),
    make_plot.style().set('shown', true),
    map_clear.style().set('shown', true),
    title_change.style().set('shown', true);
    map_dnbr_panel.style().set('shown', true);
    // title_export.style().set('shown', true);
    // export_panel.style().set('shown', true);
    var key = selector_subfmu.getValue();
    var feature = ee.FeatureCollection(LS[key]);
    Map.centerObject(feature);
    var name = selector_fmu.getValue() + ': ' + selector_subfmu.getValue();
    Map.addLayer(feature, {}, name);
    print(feature);
    }
});
var make_plot = ui.Button({
  label: 'Plot disturbance',
  style: {'shown': false}, 
  onClick: function(){
      chart_panel.style().set('shown', true);
      var vars = get_var(selector_subfmu.getValue());
      // loss
      var dnbr_v2 = FUNs.dnbr_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, false);
      var first = ee.List([ee.Image(0).select([0])]);
      var cumulative_col = ee.ImageCollection(ee.List(dnbr_v2.iterate(FUNs.accumulate_fn, first)).slice(1)); // converts yearly ic into cumulative ic
      var cum_stack = FUNs.accumm_stack_fn(cumulative_col, ee.Image().select()); // converts ic into stacked image
      var cumulative_area = FUNs.cumul_area_calc_fn(cumulative_col, vars.aoi)
      .select(['year', 'DisturbArea_sqm_v2'], ['year', 'Cumulative disturbance']);
      var dnbr_area = FUNs.cumul_area_calc_fn(dnbr_v2, vars.aoi)
      .select(['year', 'DisturbArea_sqm_v2'], ['year', 'Yearly disturbance']);
      var innerJoin = ee.Join.inner();
      var joinFlt = ee.Filter.equals({
        leftField: 'year',
        rightField: 'year'
        });
        var joined = innerJoin.apply(cumulative_area, dnbr_area, joinFlt)
        .map(function(ft){
          return ee.Feature(ft.get('primary')).set(ee.Feature(ft.get('secondary')).toDictionary());
          });
      // Gain
      var aoi_name = ee.String(ee.FeatureCollection(LS[selector_subfmu.getValue()]).get('name')).getInfo();
      var gain = FUNs.gain_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, cum_stack, false); // each pixel is coded as yod
      var yearly_recovery_col = ee.ImageCollection(vars.years.map(function(yr){ // converts one-band raster into ic
        var yearly_gain = gain.eq(yr).select(['yod_last'], [aoi_name +'_dNBR_'+ yr]); // use common band mask for loss and gain
        return yearly_gain.set('year', yr);
      }));
      var cumulative_recovery_col = ee.ImageCollection(ee.List(yearly_recovery_col.iterate(FUNs.accumulate_fn, first)).slice(1)); // remove "constant"
      var cumulative_yearly_recovery = FUNs.cumul_area_calc_fn(cumulative_recovery_col, vars.aoi)
      .select(['year', 'DisturbArea_sqm_v2'], ['year', 'Regrowth']);
      // Joining Disturbances and Recovery 
      var joined_2 = innerJoin.apply(cumulative_yearly_recovery, joined, joinFlt)
      .map(function(ft){
        return ee.Feature(ft.get('primary')).set(ee.Feature(ft.get('secondary')).toDictionary());
      });    
      var chart = ui.Chart.feature.byFeature({
        features: joined_2,
        xProperty: 'year',
        yProperties : ['Cumulative disturbance', 'Yearly disturbance', 'Regrowth']
        }).setOptions({
          title: 'Disturbed and Regrowth Area',
          vAxis: {title: 'Area (sqm)'},
          hAxis: {title: 'Year'}
          });
      var rgbCol = FUNs.exp_animation_rgb_fn(vars.years, ftv_2022, vars.aoi);
      var thumbnail = ui.Thumbnail({
        image: ee.ImageCollection(rgbCol),
        params: {dimensions: 300, region: vars.aoi.geometry()}
      });
      chart_panel.clear().add(chart).add(thumbnail);
    }
});
var map_clear = ui.Button({
  label: 'Clear Map',
  style: {'shown': false}, 
  onClick: function(){
    Map.clear();
    legend_panel.style().set('shown', false);
    Map.add(legend_panel);
    output_yearly.style().set('shown', false);
    output_cumulative.style().set('shown', false);
    output_gain.style().set('shown', false);
  }
});
var plot_dist_panel = ui.Panel({
  layout: ui.Panel.Layout.Flow('horizontal'),
  widgets: [
    show_aoi,
    make_plot,
    map_clear
    ],
  style: {'shown': false}
});
// End plot disturbance panel
// Map dNBR panel
var selector_year = ui.Select({
  placeholder: 'YOD'
});
var map_dnbr = ui.Button({
  label: "Map disturbance",
  onClick: function(){
    output_panel.style().set('shown', true);
    legend_panel.style().set('shown', true);
    var areas = map_selected_dnbr();
    var area1 = areas['yearly']
    var area2 = areas['cumulative']
    output_yearly.style().set('shown', true);
    ee.String(area1).evaluate(function(area1){
      output_yearly.setValue('Yearly disturbed area in ' + selector_year.getValue() + ': ' + area1 + ' sqm');
    });
    output_cumulative.style().set('shown', true);
    ee.String(area2).evaluate(function(area2){
      output_cumulative.setValue('Cumulative disturbed area in  ' + selector_year.getValue() + ': ' + area2 + ' sqm');
  });
  }
});
var map_gain = ui.Button({
  label: "Map total gain",
  onClick: function(){
    var area = map_total_gain();
    output_gain.style().set('shown', true);
    legend_panel.style().set('shown', true);
    ee.String(area).evaluate(function(area){
      output_gain.setValue('Total gain area: ' + area + ' ha');
    });
  }
});
var map_dnbr_panel = ui.Panel({
  layout: ui.Panel.Layout.Flow('horizontal'),
  widgets: [
    selector_year,
    map_dnbr,
    map_gain
    ],
  style: {'shown': false}
});
// End map dNBR panel
var chart_panel = ui.Panel({
  layout: ui.Panel.Layout.Flow('vertical')
});
var title = ui.Label({
  value: 'ILLEGAL AMBER MINING IN UKRAINE 1996-2022',
  style: visLabels
});
var title_change = ui.Label({
  value: "Map disturbance and recovery",
  style: {fontSize: '12px',
          fontWeight: 'bold', 
          padding: '4px 4px 4px 4px',
          border: '1px solid black',
          color: 'white',
          backgroundColor: 'black',
          textAlign: 'left',
          stretch: 'horizontal',
          shown: false}
});
// Legend
var thumb = ui.Thumbnail({
    image: legend,
    params: {
        format: 'png'
        },
    style: {height: '130px', width: '115px', padding :'0'}
    });
var legend_panel = ui.Panel(thumb, 'flow', {width: '150px', position: 'bottom-left', shown: false});
var main_panel = ui.Panel({
  style: {width: '375px'},
  widgets: [
    title, massage_panel,
    dropdown_selectors, plot_dist_panel,
    chart_panel,
    // title_export, export_panel,
    title_change, map_dnbr_panel,
    output_panel
    ]
});
/*
var title_export = ui.Label({
  value: 'Exporting RGB and dNBR animations',
  style: {'fontSize': '12px',
          'shown': false
  }
});
var export_rgb = ui.Button({
  label: 'Export RGB video',
  onClick: function(){
    var vars = get_var(selector_subfmu.getValue());
    FUNs.exp_animation_rgb_fn(vars.years, ftv_2022, vars.aoi);
  }
});
var export_dnbr = ui.Button({
  label: 'Export dNBR video',
  onClick: function(){
    var vars = get_var(selector_subfmu.getValue());
    var dnbr_v2 = FUNs.dnbr_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years);
    var first = ee.List([ee.Image(0).select([0])]);
    var cumulative_col = ee.ImageCollection(ee.List(dnbr_v2.iterate(FUNs.accumulate_fn, first)).slice(1)); // converts yearly ic into cumulative ic
    var cum_stack = FUNs.accumm_stack_fn(cumulative_col, ee.Image().select()); // converts ic into stacked image
    var gain = FUNs.gain_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, cum_stack);
    var palette = ['#ffffb2', '#feb751', '#f55629', '#bd0026'];
    FUNs.exp_animation_dnbr_fn(vars.years, dnbr_v2, ftv_2022, gain, vars.aoi, palette, vars.start_year, current_year);
  }
});
var export_panel = ui.Panel({
  layout: ui.Panel.Layout.Flow('horizontal'),
  widgets: [export_rgb, export_dnbr]
  style: {'shown': false}
});
*/
ui.root.add(main_panel);
Map.add(legend_panel);
Map.setCenter(30.512, 50.461, 7);
// ---------------------------------
function get_var(subfmu){
  var aoi = ee.FeatureCollection(LS[subfmu]);
  var start_year = aoi.get('start_year').getInfo();
  var years = [];
  for (var i = start_year; i <= current_year; ++i) years.push(i);
  return {
    aoi: aoi,
    start_year: start_year,
    years: years
  };
}
function cumulative_yearly_ic(){
  var vars = get_var(selector_subfmu.getValue());
  // ------------ 2.1. Mapping accumulated disturbed area: pixel-based approach
  var dnbr_v2 = FUNs.dnbr_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, false);
  var first = ee.List([ee.Image(0).select([0])]); // ic-like empty initial state
  var cumulative_v2 = ee.ImageCollection(ee.List(dnbr_v2.iterate(FUNs.accumulate_fn, first)));
  // Convert into stack: just for visualization of final footprint and gain masking
  var cum_stack_v2 = FUNs.accumm_stack_fn(cumulative_v2, ee.Image().select());
  return cum_stack_v2;
}
function map_selected_dnbr(){
  var palette = ['#ffffb2', '#feb751', '#f55629', '#bd0026'];
  var vars = get_var(selector_subfmu.getValue());
  var dnbr_v2 = FUNs.dnbr_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, false);
  var aoi_name = ee.String(ee.FeatureCollection(LS[selector_subfmu.getValue()]).get('name')).getInfo();
  var selected_year = ee.String(selector_year.getValue()).getInfo();
  var image_name = aoi_name + '_dNBR_' + selected_year;
  var image_list = dnbr_v2.toList(dnbr_v2.size());
  var image_names = ee.List(image_list.map(function(im){
    return ee.Image(im).bandNames().get(0);
  }));
  var index = image_names.indexOf(image_name);
  var dnbr_selected = ee.Image(image_list.get(index));
  // Cumulative binary disturbance
  var first = ee.List([ee.Image(0).select([0])]); // ic-like empty initial state
  var cumulative_v2 = ee.ImageCollection(ee.List(dnbr_v2.iterate(FUNs.accumulate_fn, first)));
  // Convert into stack: just for visualization of final footprint and gain masking
  var cum_stack_v2 = FUNs.accumm_stack_fn(cumulative_v2, ee.Image().select());
  var cumulative_selected = cum_stack_v2.select(image_name);
  Map.addLayer(dnbr_selected.clip(vars.aoi), {min: 1, max: 4, palette: palette}, image_name + ': yearly', true);
  Map.addLayer(cumulative_selected.clip(vars.aoi), {palette: 'purple'}, image_name + ': cumulative', false);
  return {yearly: ee.Number(area_calc(dnbr_selected, vars.aoi)).format("%.1f"),
          cumulative: ee.Number(area_calc(cumulative_selected, vars.aoi)).format("%.1f")};
}
function map_total_gain(){
  var vars = get_var(selector_subfmu.getValue());
  var dnbr_v2 = FUNs.dnbr_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, false);
  var first = ee.List([ee.Image(0).select([0])]);
  var cumulative_col = ee.ImageCollection(ee.List(dnbr_v2.iterate(FUNs.accumulate_fn, first)).slice(1)); // converts yearly ic into cumulative ic
  var cum_stack = FUNs.accumm_stack_fn(cumulative_col, ee.Image().select()); // converts ic into stacked image
  var gain = FUNs.gain_yearly_ic(vars.aoi, vars.start_year, current_year, vars.years, cum_stack, false);
  Map.addLayer(gain.clip(vars.aoi), {min: vars.start_year, max: current_year, palette: ['cyan', 'blue']}, 'Total gain');
  return ee.Number(area_calc(gain, vars.aoi)).format("%.1f");
}
function area_calc(img, aoi){
    var disturbArea = img.gt(0).multiply(ee.Image.pixelArea()).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: aoi.union(),
      maxPixels: 1e13,
      scale: 30
      });
  return disturbArea.values().get(0);
}