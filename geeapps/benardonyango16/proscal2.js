/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var AoI2 = ee.FeatureCollection("users/benardonyango16/proscal_new_AoI"),
    AoI_Use = ee.FeatureCollection("users/benardonyango16/Proscal_AoI_Old_Michele_Map_Request"),
    ch_2011_2013 = ee.FeatureCollection("projects/ndvi-300718/assets/ch_2011_20130"),
    ch_2014_2016 = ee.FeatureCollection("projects/ndvi-300718/assets/ch_2014_20160"),
    ch_2017_2019 = ee.FeatureCollection("projects/ndvi-300718/assets/ch_2017_20190");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dataset_initial = ee.ImageCollection('MODIS/006/MOD13Q1')
              .filterBounds(AoI_Use);
//LTA NDVI ANALYSIS
//Calculating the mean for time period 2000 - 2009 (Mean of January to March)
var year1_initial = ee.Filter.date('2000-01-01','2000-03-31');
var year2_initial = ee.Filter.date('2001-01-01','2001-03-31');
var year3_initial = ee.Filter.date('2002-01-01','2002-03-31');
var year4_initial = ee.Filter.date('2003-01-01','2003-03-31');
var year5_initial = ee.Filter.date('2004-01-01','2004-03-31');
var year6_initial = ee.Filter.date('2005-01-01','2005-03-31');
var year7_initial = ee.Filter.date('2006-01-01','2006-03-31');
var year8_initial = ee.Filter.date('2007-01-01','2007-03-31');
var year9_initial = ee.Filter.date('2008-01-01','2008-03-31');
var year10_initial = ee.Filter.date('2009-01-01','2009-03-31');
var year11_initial = ee.Filter.date('2010-01-01','2010-03-31');
var year12_initial = ee.Filter.date('2011-01-01','2011-03-31');
var year13_initial = ee.Filter.date('2012-01-01','2012-03-31');
var year14_initial = ee.Filter.date('2013-01-01','2013-03-31');
var year15_initial = ee.Filter.date('2014-01-01','2014-03-31');
var combined_years_initial = ee.Filter.or(year1_initial, year2_initial, year3_initial, year4_initial, year5_initial, year6_initial, year7_initial
, year8_initial, year9_initial, year10_initial, year11_initial, year12_initial, year13_initial
,year14_initial, year15_initial); // Create joint Filter
var datasetLTA_initial = dataset_initial.filter(combined_years_initial);
var ndvi_initial = datasetLTA_initial.select('NDVI');
var ndviLTA_initial = ndvi_initial.reduce(ee.Reducer.mean());
var ndviLTA_initial = ndviLTA_initial.clip(AoI_Use).multiply(0.0001);
//Individual Years Calculation
var startdate_initial = '2020-01-01';
var enddate_initial = '2020-03-31';
var filterdate = ee.Filter.date(startdate_initial,enddate_initial);
var datasetIndividual_initial = dataset_initial.filter(filterdate);
var ndvi2_initial = datasetIndividual_initial.select('NDVI');
/*var ndvi3 = ndvi2.qualityMosaic('nd');*/
//print (ndvi2);
var ndviIndividual_initial = ndvi2_initial.reduce(ee.Reducer.mean());
var ndviIndividual_initial = ndviIndividual_initial.clip(AoI_Use).multiply(0.0001);
//print (ndviIndividual);
//Image difference
var Individual_LTA_Difference_initial = ndviIndividual_initial.subtract(ndviLTA_initial);
var DTstring_initial = ['1) root 9999 9999 9999',
'2) NDVI_mean<=-0.2 9999 9999 1 *',
'3) NDVI_mean>-0.2 9999 9999 9999',
'6) NDVI_mean<=-0.1 9999 9999 2 *',
'7) NDVI_mean>-0.1 9999 9999 9999',
'14) NDVI_mean<=-0.001 9999 9999 3 *',
'15) NDVI_mean>-0.001 9999 9999 9999',
'30) NDVI_mean<=0.001 9999 9999 4 *',
'31) NDVI_mean>0.001 9999 9999 9999',
'62) NDVI_mean<=0.1 9999 9999 5 *',
'63) NDVI_mean>0.1 9999 9999 9999',
'126) NDVI_mean<=0.2 9999 9999 6 *',
'127) NDVI_mean>0.2 9999 9999 7 *'].join("\n");
var classifier_initial = ee.Classifier.decisionTree(DTstring_initial);
var reclassifiedImage_initial = Individual_LTA_Difference_initial.select('NDVI_mean').classify(classifier_initial);
Map.centerObject(AoI_Use,7);
Map.addLayer(reclassifiedImage_initial, {min:1,max:7,palette:['#94222f', '#ebb31f', '#fcf5bd', '#d6d6d6', '#7CFC00','#228B22','#006400']}, '2021 - NDVI Change');
Map.addLayer(ch_2011_2013, {color: '#FF0000'}, '2011 - 2013 Charcoal', false);
Map.addLayer(ch_2014_2016, {color: '#0000FF'}, '2014 - 2016 Charcoal', false);
Map.addLayer(ch_2017_2019, {color: '#FFFF00'}, '2017 - 2019 Charcoal', false);
function applyFilter(){
var dataset = ee.ImageCollection('MODIS/006/MOD13Q1')
              //.filterDate('2016-01-01', '2016-03-31')
              .filterBounds(AoI_Use);
//LTA NDVI ANALYSIS
//Calculating the mean for time period 2000 - 2009 (Mean of January to March)
var year1 = ee.Filter.date('2000-01-01','2000-03-31');
var year2 = ee.Filter.date('2001-01-01','2001-03-31');
var year3 = ee.Filter.date('2002-01-01','2002-03-31');
var year4 = ee.Filter.date('2003-01-01','2003-03-31');
var year5 = ee.Filter.date('2004-01-01','2004-03-31');
var year6 = ee.Filter.date('2005-01-01','2005-03-31');
var year7 = ee.Filter.date('2006-01-01','2006-03-31');
var year8 = ee.Filter.date('2007-01-01','2007-03-31');
var year9 = ee.Filter.date('2008-01-01','2008-03-31');
var year10 = ee.Filter.date('2009-01-01','2009-03-31');
var year11 = ee.Filter.date('2010-01-01','2010-03-31');
var year12 = ee.Filter.date('2011-01-01','2011-03-31');
var year13 = ee.Filter.date('2012-01-01','2012-03-31');
var year14 = ee.Filter.date('2013-01-01','2013-03-31');
var year15 = ee.Filter.date('2014-01-01','2014-03-31');
var combined_years = ee.Filter.or(year1, year2, year3, year4, year5, year6, year7, year8, year9, year10, year11, year12, year13
,year14, year15); // Create joint Filter
var datasetLTA = dataset.filter(combined_years);
var ndvi = datasetLTA.select('NDVI');
var ndviLTA = ndvi.reduce(ee.Reducer.mean());
var ndviLTA = ndviLTA.clip(AoI_Use).multiply(0.0001);
Export.image.toDrive({ 
    image: ndviLTA,
    description:'P_NDVI_LTA',
    folder:'PROSCAL_2022_Analysis',
    scale: 250,
    maxPixels:1e13,
    region: AoI_Use
});
//Individual Years Calculation
//var startdate = '2021-01-01';
//var enddate = '2021-03-31';
var start_date_value = startdate.getValue(); 
var end_date_value = enddate.getValue(); 
var filterdate = ee.Filter.date(start_date_value,end_date_value);
var datasetIndividual = dataset.filter(filterdate);
var ndvi2 = datasetIndividual.select('NDVI');
/*var ndvi3 = ndvi2.qualityMosaic('nd');*/
//print (ndvi2);
var ndviIndividual = ndvi2.reduce(ee.Reducer.mean());
var ndviIndividual = ndviIndividual.clip(AoI_Use).multiply(0.0001);
//print (ndviIndividual);
//Image difference
var Individual_LTA_Difference = ndviIndividual.subtract(ndviLTA);
/*Export.image.toDrive({ 
    image: Individual_LTA_Difference,
    description:'P_NDVI_2021_Minus_LTA',
    folder:'PROSCAL_2022_Analysis',
    scale: 250,
    maxPixels:1e13,
    region: AoI_Use
});*/
/*var DTstring = ['1) root 9999 9999 9999',
'2) nd<=0 9999 9999 1 *',
'3) nd>0 9999 9999 9999',
'6) nd<=0.000001 9999 9999 2 *',
'7) nd>0.000001 9999 9999 3 *'].join("\n");*/
/*var DTstring = ['1) root 9999 9999 9999',
'2) NDVI_mean<=-0.2 9999 9999 1 *',
'3) NDVI_mean>-0.2 9999 9999 9999',
'6) NDVI_mean<=-0.1 9999 9999 2 *',
'7) NDVI_mean>-0.1 9999 9999 9999',
'14) NDVI_mean<=-0.01 9999 9999 3 *',
'15) NDVI_mean>-0.01 9999 9999 9999',
'30) NDVI_mean<=0 9999 9999 4 *',
'31) NDVI_mean>0 9999 9999 5 *'].join("\n");*/
var DTstring = ['1) root 9999 9999 9999',
'2) NDVI_mean<=-0.2 9999 9999 1 *',
'3) NDVI_mean>-0.2 9999 9999 9999',
'6) NDVI_mean<=-0.1 9999 9999 2 *',
'7) NDVI_mean>-0.1 9999 9999 9999',
'14) NDVI_mean<=-0.001 9999 9999 3 *',
'15) NDVI_mean>-0.001 9999 9999 9999',
'30) NDVI_mean<=0.001 9999 9999 4 *',
'31) NDVI_mean>0.001 9999 9999 9999',
'62) NDVI_mean<=0.1 9999 9999 5 *',
'63) NDVI_mean>0.1 9999 9999 9999',
'126) NDVI_mean<=0.2 9999 9999 6 *',
'127) NDVI_mean>0.2 9999 9999 7 *'].join("\n");
/*'7) nd>0.000001 9999 9999 3 *'].join("\n");*/
/*var DTstring = ['1) root 9999 9999 9999',
'2) NDVI_mean<=0 9999 9999 1 *',
'3) NDVI_mean>0 9999 9999 2 *'].join("\n")*/
//print (DTstring);
//var ndvi2 = ndvi2.qualityMosaic('data_type');
var classifier = ee.Classifier.decisionTree(DTstring);
var reclassifiedImage = Individual_LTA_Difference.select('NDVI_mean').classify(classifier);
//Visualization Parameters, negative and positive values only should be color coded
/*var ndviVis = {
    min: -1,
    max: 1,
    palette: [
    '#DEB887', '#008000',  
  ],
};*/
//difference from LTA
/*var LTA_2016 = LTA.subtract(ndvi1);*/
//var LTA_2016 = ndvi1.subtract(LTA);
/*Map.setCenter(41.912991, -0.501489, 8);*/ //long, lat, zoom
Map.centerObject(AoI_Use,8);
//Map.addLayer(Individual_LTA_Difference, ndviVis, 'NDVI');
//Map.addLayer(reclassifiedImage, {min:1,max:2,palette:['#DEB887', '#008000']}, 'NDVI');
Map.addLayer(reclassifiedImage, {min:1,max:7,palette:['#94222f', '#ebb31f', '#fcf5bd', '#d6d6d6', '#7CFC00','#228B22','#006400']}, start_date_value.substring(0,4) + ' - NDVI Change' );
//Map.addLayer(reclassifiedImage.clip(roi3),{min:1,max:5/*, palette: ndvi_pal*/}, 'NDVI');
//Map.addLayer(LTA_2016, ndviVis, 'NDVI2');
/*Export.image.toDrive({ 
    image: LTA_2016,
    description:'LTA_2016',
    folder:'GEENDVI',
    scale: 250,
    maxPixels:1e13,
    region: AoI2
});*/
Export.image.toDrive({ 
    image: reclassifiedImage,
    description:'P_NDVI_2021_Minus_LTA_Reclass',
    folder:'PROSCAL_2022_Analysis',
    scale: 250,
    maxPixels:1e13,
    region: AoI_Use
});
//----------------------------- Display legend on the map --------------------------//
// Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// set position of panel
/*var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'', 
  'color': '3333ff'
  };
var legendTitle = ui.Label('Legend',titleTextVis);
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var palette =['#94222f', '#ebb31f', '#fcf5bd', '#d6d6d6', '#7CFC00','#228B22','#006400'];
var names = ['-0.2 and below','-0.2 to -0.1','-0.1 to -0.001', 'No Change', '0.001 to 0.1', '0.1 to 0.2', '0.2 and Above'];
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
*/
// add legend to map (alternatively you can also print the legend to the console)
//Map.add(legend);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// WIDGET PANEL ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Spacer object//
var spacer = ui.Label('           ');
/* Create UI Panels */
var panel = ui.Panel({style: {width:'20%',padding: '6px 12px'}});
ui.root.insert(0,panel);
/* Introduction */ 
var intro = ui.Label('How to Use ', 
  {fontWeight: 'bold', fontSize: '14px', margin: '8px 2px'}
);
var subtitle = ui.Label(' The App Calculates Long term NDVI mean from 2000 to 2015 using MODIS 250m resolution.'+
  ' The user is therefore equired to enter a a date period for which to compare with the Long term NDVI'+
  ' The app then gets the NDVI difference between the user specified period and the LTA NDVI', {});
panel.add(intro).add(subtitle);
// Create a button that will run the function that creates the NDVI binary object
var close_button = ui.Button({label:'Close About Panel' , onClick:''});
panel.add(ui.Panel(close_button));
///selecting year panel
// Define the textbox for the 1st and 2nd year
var startdate = ui.Textbox({placeholder: 'Year',  value: '2020-01-01',
  style: {width: '100px'}});
var enddate = ui.Textbox({placeholder: 'Year',  value: '2020-03-31',
  style: {width: '100px'}});
var year_before_panel = ui.Label({
  value:'Enter Period of Interest',
  style:{fontSize: '12px', fontWeight: 'bold'}});
var year_before_label2 = ui.Label('Start Date(YYYY-MM-DD)           ',
  {margin: '0 0 0 10px',fontSize: '8px',color: 'gray'});
var year_before_label3 = ui.Label('End Date(YYYY-MM-DD)      ',
  {margin: '0 0 0 10px',fontSize: '8px',color: 'gray'});
panel.add(year_before_panel)
  .add(ui.Panel([year_before_label2, year_before_label3],ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel([startdate, enddate],ui.Panel.Layout.flow('horizontal')));
//////////////////////////////////////////////////////////////////////////////////
var titleTextVis = {
  'margin':'0px 0px 12px 0px',
  'fontSize': '12px', 
  'font-weight':'bold', 
  'color': '#000000'
  };
// Create legend title
var legendTitle = ui.Label('Legend',titleTextVis);
// Add the title to the panel
panel.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '12px',
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
//  Palette with the colors
var palette =['#94222f', '#ebb31f', '#fcf5bd', '#d6d6d6', '#7CFC00','#228B22','#006400'];
// name of the legend
var names = ['-0.2 and below','-0.2 to -0.1','-0.1 to -0.001', 'No Change', '0.001 to 0.1', '0.1 to 0.2', '0.2 and Above'];
// Add color and and names
for (var i = 0; i < 7; i++) {
  panel.add(makeRow(palette[i], names[i]));
  }  
function proscal_ndvi (){
    applyFilter(); 
}
// Create a button that will run the function that creates the NDVI binary object
var PROSCALNDVI = ui.Button({label:'Calculate' , onClick:proscal_ndvi});
// Add Button to the map.
//panel.add(PROSCALNDVI);
var resetButton = ui.Button('Reset Map', reset);
//panel.add(resetButton);
panel.add(ui.Panel([PROSCALNDVI, resetButton],ui.Panel.Layout.flow('horizontal')));
/*
Reset Map
*/
function reset(){
  Map.clear();
}