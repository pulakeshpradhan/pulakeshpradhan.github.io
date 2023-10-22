var lsat = ui.import && ui.import("lsat", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    reservoirs = ui.import && ui.import("reservoirs", "table", {
      "id": "users/lsovellfernandez/California_Reservoir_collection"
    }) || ee.FeatureCollection("users/lsovellfernandez/California_Reservoir_collection");
/*
INITIAL SETUP
*/
var oroville_lake = reservoirs.filter(ee.Filter.eq('name', 'Oroville'));
Map.centerObject(oroville_lake, 11);
Map.setOptions('HYBRID');
Map.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true, layerList: true});
/*
*******************************************************
FUNCTIONS
*******************************************************
*/
//Adds NDWI and MNDWI bands to image
var add_indices = function(image){
  var ndwi = image.normalizedDifference(['SR_B3', 'SR_B5']).rename('NDWI');
  return image.addBands(ndwi).copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
};
//Clips image to region
var clip = function(aoi){
  var nest = function(image){
  return image.clip(aoi).copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
  };
   return nest; 
};
var ndwi_image = function(image){
  return image.select('NDWI').gt(0).selfMask().copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
};
var area_calc = function(image){
  var stats = image.reduceRegion({
    reducer: ee.Reducer.sum(),
    scale: 30,
    maxPixels: 1e9
  });
  return image.setMulti({
    Surface_Area: ee.Number(stats.get('NDWI'))
  }).copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
};
var start_image = function(initial_date){
  var nest2 = function(image){
  return image.set(
    'start_date_dist', ee.Number(image.get('system:time_start')).subtract(initial_date.millis()).abs())
    .copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
  };
  return nest2;  
};
var compare_image = function(compare_date){
  var nest3 = function(image){
  return image.set(
    'end_date_dist', ee.Number(image.get('system:time_start')).subtract(compare_date.millis()).abs())
    .copyProperties(image, ['system:time_start', 'CLOUD_COVER', 'SENSING_TIME']);
  };
  return nest3;
};
/*
*******************************************************************
UI APP
*******************************************************************
*/
var input_panel = ui.Panel();
input_panel.style().set({
  height: 'maxHeight',
  position: 'middle-left',
  margin: '20px',
  width: '300px'
});
var output_panel = ui.Panel();
output_panel.style().set({
  position: 'middle-right',
  stretch: 'horizontal',
  padding: '0px',
  width: '400px'
});
//Create reservoir array
var res_array = ee.List(reservoirs.toList(reservoirs.size()).map(function(feat){return ee.String(ee.Feature(feat).get('name'))}));
//Gather user input
var aoi;
var initial_date;
var compare_date;
//var res_list = reservoirs.getInfo()['features'];
///Location input
var location_select = ui.Select({
  items: res_array.getInfo(),
  placeholder: 'Select a reservoir',
  onChange: function(res_name){
    var reservoir_name = res_name;
  //Defining AOI
    aoi = reservoirs.filter(ee.Filter.eq('name', reservoir_name));
    //location_select.setValue(aoi);
    return(aoi);
  }
});
//Start date input
var enter_start = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style: {
    width: '170px'
  },
  onChange: function(start_date){
    initial_date = ee.Date(start_date);
  }
});
//End date input
var enter_end = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style: {
    width: '170px'
  },
  onChange: function(end_date){
    compare_date = ee.Date(end_date);
    return(compare_date);
  }
});
var button = ui.Button({
  label: 'Run',
  onClick: function(){
    output_panel.clear();
    initial_date = (enter_start.getValue());
    compare_date = (enter_end.getValue());
    aoi = (location_select.getValue());
    var aoi_geom = reservoirs.filter(ee.Filter.eq('name', aoi));
    var in_date = ee.Date(initial_date);
    var comp_date = ee.Date(compare_date);
    var lsat_images = lsat.filterDate(initial_date,compare_date).filterBounds(reservoirs.filter(ee.Filter.eq('name', aoi))).filterMetadata('CLOUD_COVER', "less_than", 3);
    print(lsat_images);
    var lsat_for_vis = lsat_images.map(start_image(in_date)).map(compare_image(comp_date));
    print(lsat_for_vis);
    //Start Landsat image for visualization
    var sort_start_vis = lsat_for_vis.sort('start_date_dist');
    var get_start_vis = ee.Image(sort_start_vis.toList(sort_start_vis.size()).get(0));
    print(get_start_vis);
    //Compare Landsat image for visualization
    var sort_compare_vis = lsat_for_vis.sort('end_date_dist');
    var get_compare_vis = ee.Image(sort_compare_vis.toList(sort_compare_vis.size()).get(0));
    print(get_compare_vis);
    var lsat_prep = lsat_images.map(clip(aoi_geom))//Clip to study region
                .map(add_indices)//Add NDWI and MNDWI indices
                .map(ndwi_image)//Select pixels where NDWI band values > 0, self mask
                .map(area_calc);
    var lsat_modified = lsat_prep.map(start_image(in_date)).map(compare_image(comp_date));
    var sort_start_image = lsat_modified.sort('start_date_dist');
    var get_start_image_list = sort_start_image.toList(sort_start_image.size());
    var get_start_image = ee.Image(get_start_image_list.get(0));
    //Getting user input end image
    var sort_compare_image = lsat_modified.sort('end_date_dist');
    var get_compare_image_list = sort_compare_image.toList(sort_compare_image.size());
    var get_compare_image = ee.Image(get_compare_image_list.get(0));
    var actual_start_date = get_start_image.date();
    print(actual_start_date);
    var actual_end_date = get_compare_image.date();
    var start_area = ee.Number(get_start_image.get('Surface_Area')).multiply(900).divide(1000000);
    var compare_area = ee.Number(get_compare_image.get('Surface_Area')).multiply(900).divide(1000000);
    var s_a_string = ee.String(start_area);
    var start_area_label = ui.Label("The surface area of the "+ aoi +" reservoir on "+  initial_date +" was "+ s_a_string.getInfo()+ " sq. km.");
    var c_a_string = ee.String(compare_area);
    var compare_area_label = ui.Label("The surface area of the "+ aoi +" reservoir on "+  compare_date +" was "+ c_a_string.getInfo()+ " sq. km.");
    var pct_change = ((compare_area.subtract(start_area)).divide(start_area).multiply(100)).round();
    var pct_change_string = ee.String(pct_change);
    var pct_change_label = ui.Label("The change in surface area of the "+ aoi+ " reservoir between " + initial_date +" and "+ compare_date +  " was "+ pct_change_string.getInfo() + "%.");
    var lsat_vis = {
    bands: ['SR_B4','SR_B3','SR_B2'],
    min: [7000,7000,7000],
    max: [12000,12000,12000]
    };
    Map.addLayer(get_compare_vis, lsat_vis, "End Date Landsat");
    Map.addLayer(get_start_vis,lsat_vis, "Start Date Landsat");
    Map.addLayer(get_start_image, {palette: ['#7D7D7D']}, "Start Date Surface Area");
    Map.addLayer(get_compare_image, {palette: ['#BDBDBD']}, "End Date Surface Area");
    Map.centerObject(aoi_geom,11.5);
    Map.setOptions('HYBRID');
    //Creating Chart
    var chart_title = (ee.String(aoi).cat(" Reservoir Surface Area")).getInfo();//revert to res name
    var temporal_chart = ui.Chart.image
    .series({
      imageCollection: lsat_modified,
      region: aoi_geom,
      scale: 30,
      reducer: ee.Reducer.sum()
    })
    .setSeriesNames(['Surface Area'])
    .setOptions({
      title: chart_title,
      hAxis: {
        title: 'Date'
      },
      vAxis: {
        title: 'Surface Area'
      },
      colors: ['1d6b99'],
      legend: {position: 'none'}
    })
    .setChartType('AreaChart');
    output_panel.add(temporal_chart);
    output_panel.add(start_area_label);
    output_panel.add(compare_area_label);
    output_panel.add(pct_change_label);
  }
});
/*
var reset = ui.Button({
  label: 'Reset',
  onClick: function(){
    Map.remove(get_compare_vis);
    Map.remove(get_start_vis);
    Map.remove(get_start_image);
    Map.remove(get_compare_image);
  }
});
*/
var app_intro = ui.Label({
    value: 'This app compares the surface area of a California reservoir at two input dates,'+ 
    ' displaying the temporal change in water surface area. ',
    style: {fontWeight: '70'}});
var note1 = ui.Label({
  value: 'Notes:',
  style : {fontWeight: 'bold', fontSize: '11px', padding: '4px', margin: '8px 0px 0px 0px'}
});
var note2 = ui.Label({
  value: '* Compare wet summers (2019 or 2017) with dry summers (2021 or 2014) to display most dramatic differences.',
  style : {fontWeight: '70', fontSize: '11px', margin: '4px'}
});
var note3 = ui.Label({
  value: '* Some reservoirs (Shasta, Trinity and New Melones) may not provide accurate results due to varying Landsat tile footprints.',
  style : {fontWeight: '70', fontSize: '11px', margin: '4px'}
});
var note4 = ui.Label({
  value: 'App created by Leo Sovell-Fernandez, Research Assistant to Asst. Professor of Geography Niwaeli Kimambo, Middlebury College, August 2021.',
  style : {fontWeight: '70', fontSize: '11px', margin: '4px'}
});
input_panel.add(ui.Label({
  value: "California Reservoir Monitor", 
  style: {fontWeight: 'bold', fontSize: '20px'}}));
input_panel.add(app_intro);
input_panel.add(ui.Label({
  value: "1) Select a reservoir", 
  style: {fontWeight: 'bold'}}));
input_panel.add(location_select);
input_panel.add(ui.Label({
    value: "2) Enter start and end dates", 
    style: {fontWeight: 'bold', whiteSpace: 'wrap'}}));
input_panel.add(ui.Label({
  value: "Start date (2014-01-01 earliest)", 
  style: {fontWeight: '50'}}));
input_panel.add(enter_start);
input_panel.add(ui.Label({
  value: "End date", 
  style: {fontWeight: '50'}}));
input_panel.add(enter_end);
input_panel.add(button);
//input_panel.add(reset);
input_panel.add(note1);
input_panel.add(note2);
input_panel.add(note3);
input_panel.add(note4);
Map.add(input_panel);
Map.add(output_panel);