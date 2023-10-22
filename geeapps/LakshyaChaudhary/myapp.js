var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '8px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontWeight: '350',
  fontSize: '16px',
  padding: '8px',
  color: '#616161',
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '8px',
  maxWidth: '500px',
  backgroundColor: colors.transparent,
};
var BUTTON_STYLE = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SELECT_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '2px',
  backgroundColor: colors.transparent,
  width: '80px'
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '650px',
      backgroundColor: colors.gray
    }
});
var mappingPanel = ui.Map({
    center: {'lat': 25.3932305454494, 'lon': 86.42228272778313, 'zoom': 5}
    // style: (if you'd like to add a map style, do so here!)
  });
ui.root.clear() // This is important to do to remove the "normal" GEE map
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel)); // order matters!
//ui.root.add() is where you are adding panels to the EE window 
infoPanel.add(ui.Label('Real Time Land Usage Monitoring Tool', TITLE_STYLE));
var app_description = 'We will be using the satellite image captured using MODIS satellite. We manually picked the training data from the satellite image according to the categories that we want to classify. We will train our model on this data. After that using the trained model, we will classify the land usage in different classification.';
infoPanel.add(ui.Label(app_description, PARAGRAPH_STYLE));
infoPanel.insert(2, ui.Label('PARAMETERS :', SUBTITLE_STYLE))
var year_list = [
    {label: '2010', value: 2010},
    {label: '2011', value: 2011},
    {label: '2012', value: 2012},
    {label: '2013', value: 2013},
    {label: '2014', value: 2014},
    {label: '2015', value: 2015},
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019}
  ];
var state_list = [
    {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {label: 'Goa', value: 'Goa'},
    {label: 'Manipur', value: 'Manipur'},
    {label: 'Meghalaya', value: 'Meghalaya'},
    {label: 'Mizoram', value: 'Mizoram'},
    {label: 'Nagaland', value: 'Nagaland'},
    {label: 'Orissa', value: 'Orissa'},
    {label: 'Rajasthan', value: 'Rajasthan'},
    {label: 'Sikkim', value: 'Sikkim'},
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Tripura', value: 'Tripura'},
    {label: 'Uttarakhand', value: 'Uttarakhand'},
    {label: 'West Bengal', value: 'West Bengal'},
    {label: 'Assam', value: 'Assam'},
    {label: 'Chhattisgarh', value: 'Chhattisgarh'},
    {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {label: 'Jharkhand', value: 'Jharkhand'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Kerala', value: 'Kerala'},
    {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Punjab', value: 'Punjab'},
    {label: 'Bihar', value: 'Bihar'},
    {label: 'UP', value: 'Uttar Pradesh'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Haryana', value: 'Haryana'},
    {label: 'Aksai Chin(DIS)', value: 'Aksai Chin'},
    {label: 'Arunachal Pradesh(DIS)', value: 'Arunachal Pradesh'},
    {label: 'Jammu and Kashmir(DIS)', value: 'Jammu and Kashmir'}
  ];
var class_list = [
    {label: 'Urban', value: 13},
    {label: 'Croplands', value: 12},
    {label: 'Water Bodies', value: 17},
    {label: 'Permanent Wetlands', value: 11}
  ];
infoPanel.insert(3, ui.Label('Select a year :', SUBTITLE_STYLE))
var selectedYear = '2016';
var year = ui.Select({items: year_list, placeholder: 'Select a year', onChange: function(val){selectedYear=val}, value: 2016, style: SELECT_STYLE})
infoPanel.add(year);
infoPanel.insert(5, ui.Label('Select a state :', SUBTITLE_STYLE));
var selectedState = 'Bihar';
var state = ui.Select({items: state_list, placeholder: 'Select a state', onChange: function(val){selectedState=val}, value: 'Bihar', style: SELECT_STYLE})
infoPanel.add(state);
var runButton = ui.Button({label: 'Display land cover', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
var clearButton = ui.Button({label: 'Clear map', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
infoPanel.add(runButton).add(clearButton);
infoPanel.insert(9, ui.Label('Select a class type :', SUBTITLE_STYLE));
var selectedClass = 12;
var selectedClassName = 'Croplands';
var classType = ui.Select({items: class_list, placeholder: 'Select a class type: ', onChange: function(val)
{
  selectedClass=val;
  if(val==12)
    selectedClassName='Croplands';
  else if(val==13)
        selectedClassName='Urban';
  else if(val==17)
        selectedClassName='Water Bodies';
  else if(val==11)
        selectedClassName='Permanent Wetlands';
  // print(selectedClass);
  // print(selectedClassName);
}
, value: 12, style: SELECT_STYLE});
infoPanel.add(classType);
var classButton = ui.Button({label: 'Show Area', style: {width: '125px', maxWidth: '250px', color: '#616161'}});
infoPanel.add(classButton);
var clearMap = clearButton.onClick(function() {
  var layers = mappingPanel.layers()
  layers.forEach(function(x) {
    mappingPanel.remove(x) 
  })
});
var showLand = runButton.onClick(function() {
   print("Clicked");
  // print(selectedYear);
  var startDate = selectedYear+'-01-01';
var endDate = selectedYear+'-12-31';
  // print(startDate);
  // print(endDate);
  var modisLandcover = ee.ImageCollection("MODIS/006/MCD12Q1")
var filtered = modisLandcover.filter(
  //ee.Filter.date('2018-01-01', '2018-12-31'))
  ee.Filter.date(startDate, endDate))
var landcover = ee.Image(filtered.first())
var classified = landcover.select('LC_Type1')
var landcoverName = 'MODIS Landcover '+selectedYear;
var palette = ['05450a', '086a10', '54a708',
'78d203', '009900', 'c6b044','dcd159', 
'dade48', 'fbff13', 'b6ff05', '27ff87',
'c24f44', 'a5a5a5', 'ff6d4c', '69fff8',
'f9ffa4', '1c0dff']
mappingPanel.addLayer(classified,
{min:1, max:17, palette: palette},
landcoverName)
//infoPanel.add(ui.Label(selectedState, PARAGRAPH_STYLE));
var gaul = ee.FeatureCollection(
  'FAO/GAUL_SIMPLIFIED_500m/2015/level2')
  var reqState;
if( selectedState=='Aksai Chin' || selectedState=='Arunachal Pradesh' || selectedState=='Jammu and Kashmir' ){
  reqState = gaul.filter(
  ee.Filter.eq('ADM0_NAME', selectedState))
}
else{
  reqState = gaul.filter(
  ee.Filter.eq('ADM1_NAME', selectedState))
}
mappingPanel.addLayer(reqState, {color: 'purple'}, selectedState+' Boundaries')
var stateLandcover = classified.clip(reqState)
mappingPanel.addLayer(stateLandcover,
 {min:1, max:17, palette: palette},
 selectedState+' Land Cover '+selectedYear)
})
var areaCalculation = classButton.onClick(function() {
  var startDate = selectedYear+'-01-01';
var endDate = selectedYear+'-12-31';
  var modisLandcover = ee.ImageCollection("MODIS/006/MCD12Q1")
var filtered = modisLandcover.filter(
  //ee.Filter.date('2018-01-01', '2018-12-31'))
  ee.Filter.date(startDate, endDate))
var landcover = ee.Image(filtered.first())
var classified = landcover.select('LC_Type1')
var landcoverName = 'MODIS Landcover '+selectedYear;
var palette = ['05450a', '086a10', '54a708',
'78d203', '009900', 'c6b044','dcd159', 
'dade48', 'fbff13', 'b6ff05', '27ff87',
'c24f44', 'a5a5a5', 'ff6d4c', '69fff8',
'f9ffa4', '1c0dff']
// mappingPanel.addLayer(classified,
// {min:1, max:17, palette: palette},
// landcoverName)
var gaul = ee.FeatureCollection(
  'FAO/GAUL_SIMPLIFIED_500m/2015/level2')
  var reqState;
if( selectedState=='Aksai Chin' || selectedState=='Arunachal Pradesh' || selectedState=='Jammu and Kashmir' ){
  reqState = gaul.filter(
  ee.Filter.eq('ADM0_NAME', selectedState))
}
else{
  reqState = gaul.filter(
  ee.Filter.eq('ADM1_NAME', selectedState))
}  
// mappingPanel.addLayer(reqState, {color: 'purple'}, selectedState+' Boundaries')
var stateLandcover = classified.clip(reqState)
// mappingPanel.addLayer(stateLandcover,
// {min:1, max:17, palette: palette},
// selectedState+' Land Cover '+selectedYear)
 var className = stateLandcover.eq(selectedClass)
mappingPanel.addLayer(className,
 {min:0, max:1, palette: ['grey', 'blue']},
 selectedClassName+' landcover')
var areaImage = className.multiply(ee.Image.pixelArea())
var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: reqState.geometry(),
  scale: 500,
  maxPixels: 1e10
  })
var classNameAreaSqKm=0;
classNameAreaSqKm = ee.Number(
  area.get('LC_Type1')).divide(1e6).round();
print(classNameAreaSqKm)
classNameAreaSqKm.evaluate(function(result) {
  var res = 'The area of total '+selectedClassName+' landcover in '+selectedState+ ' is: '+result+' SqKm.';
  infoPanel.add(ui.Label(res, PARAGRAPH_STYLE));
});
});