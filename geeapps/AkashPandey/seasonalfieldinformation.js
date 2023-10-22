var Field1_shp = ui.import && ui.import("Field1_shp", "table", {
      "id": "projects/akashpandey/assets/Roorkee_Field_Shp"
    }) || ee.FeatureCollection("projects/akashpandey/assets/Roorkee_Field_Shp");
//BaseMap
Map.setOptions('Hybrid');
var styling = {color: 'red', fillColor: '#ffffff00', width: 1.5};
//Map
Map.addLayer(Field1_shp.style(styling), {}, 'Field 1 Shapefile');
Map.centerObject(Field1_shp, 15);
Map.onClick(map_onclick_function);
var roi = null;
//chart onClick function
function display_data(xaxis, yaxis, series_names){
  print('Date:' + xaxis +'' + series_names + 'values is' + yaxis);
}
//functions
function get_dataset(collection_name, start_date, end_date, roi){
  return ee.ImageCollection(collection_name)
           .filterDate(start_date, end_date)
           .filterBounds(roi);
}
function get_chart(imagecollection, region, series_names, title, vaxis ){
  var chart1 = ui.Chart.image.series({imageCollection: imagecollection,region: region})
                .setSeriesNames(series_names)
                .setOptions({
                  title: title,
                  hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
                  vAxis: {title: vaxis,titleTextStyle: {italic: false, bold: true}},
                  colors: ['e37d05', '1d6b99'],
                });
  return chart1;
}
function map_onclick_function(location){
  var bounds = [location.lon, location.lat];
  var filtered = Field1_shp.filterBounds(ee.Geometry.Point(bounds));
  filtered = filtered.geometry();
  Map.addLayer(filtered, {color:'green'}, 'Highlight');
  roi = filtered;
}
//Widgets - Buttons
var load_button  = ui.Button('Load', load_timeseries,'',{color:'green'});
var reset_button = ui.Button({label: 'Reset',style: {color: 'red'}});
//dataset selector
var dataset_list = ['Landsat8_sr', 'Sentinel2_sr'];
var dataset_selector = ui.Select(dataset_list, 'Select the dataset', null);
print(dataset_selector);
//year selector using slider
var year_selector = ui.Slider(2013, 2022, 2022, 1);
print(year_selector);
//Season selector
var season_list = ['Zaid [Mar to Jun]','Kharif [May to Oct]', 'Rabi [Nov to Apr]'];
var season_selector = ui.Select(season_list, 'Select a season', null);
print(season_selector);
//VI or LST [type selector]
var type_list = ['Vegetative Indices', 'LST'];
var type_selector = ui.Select(type_list, 'Select the property', null);
print(type_selector);
//Load button onClick function
function load_timeseries(){
  //values required
  var dataset_selected = dataset_selector.getValue();
  var year_selected    = year_selector.getValue();
  var season_selected  = season_selector.getValue();
  var type_selected    = type_selector.getValue();
  //start and end dates
  var start_date = null;
  var end_date   = null;
  if (season_selected == 'Kharif [May to Oct]'){
    start_date = ee.Date.fromYMD({day: 1,month: 5,year: year_selected});
    end_date   = ee.Date.fromYMD({day: 31,month: 10,year: year_selected});
  }
  else if (season_selected == 'Rabi [Nov to Apr]'){
    start_date = ee.Date.fromYMD({day: 1,month: 11,year: year_selected});
    end_date   = ee.Date.fromYMD({day: 30,month: 4,year: year_selected}).advance(1, 'year');
  }
  else if (season_selected == 'Zaid [Mar to Jun]'){
    start_date = ee.Date.fromYMD({day: 1,month: 3,year: year_selected});
    end_date   = ee.Date.fromYMD({day: 30,month: 6,year: year_selected});
  }
  //dataset - landsat 8
  if (dataset_selected == 'Landsat8_sr'){
    var get_scalefactor = function(image){
    var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
    var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
    return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
    };
    var dataset = get_dataset('LANDSAT/LC08/C02/T1_L2', start_date, end_date, roi);
    dataset = dataset.map(get_scalefactor);
    dataset = dataset.map(function(image){return image.addBands(image.normalizedDifference(['SR_B5', 'SR_B4']).rename('ndvi'));});
    dataset = dataset.map(function(image){return image.addBands(image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED + 7.5 * BLUE + 1))', {'NIR': image.select('SR_B5'),'RED': image.select('SR_B4'),'BLUE': image.select('SR_B2')}).rename('evi'));});
    var vi_chart  = get_chart(dataset.select('ndvi','evi'), roi, {ndvi: 'NDVI', evi: 'EVI'}, 'Average Vegetation Index Value by Date for Farmland', 'Vegetative indices' );
    var lst_chart = get_chart(dataset.select('ST_B10'), roi, ['LST'], 'Average Land Surface Temperature Value by Date for Farmland', 'LST [Kelvin]');
    if (type_selected == 'LST'){
      print(lst_chart);
    }else if (type_selected == 'Vegetative Indices'){
      print(vi_chart);
    }
  }
  if (dataset_selected == 'Sentinel2_sr'){
    var dataset2 = get_dataset('COPERNICUS/S2_SR', start_date, end_date, roi);
    dataset2 = dataset2.map(function(image){return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('ndvi'));});
    dataset2 = dataset2.map(function(image){return image.addBands(image.expression('2.5 * ((NIR - RED) / (NIR + 6 * RED + 7.5 * BLUE + 1))', {'NIR': image.select('B8'),'RED': image.select('B4'),'BLUE': image.select('B2')}).rename('evi'));});
    var vi_chart2  = get_chart(dataset2.select('ndvi', 'evi'), roi, {ndvi: 'NDVI', evi: 'evi'}, 'Average Vegetation Index Value by Date for Farmland', 'Vegetative indices' );
    if (type_selected == 'LST'){
      print('Error: No LST for Sentinel-2');
    }else if (type_selected == 'Vegetative Indices'){
      print(vi_chart2);
    }  
    }
  }
//Panel
print(load_button);