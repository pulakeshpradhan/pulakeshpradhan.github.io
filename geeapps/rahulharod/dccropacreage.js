var panel= ui.Panel({style:{ height: '500px', width: '350px', position: 'top-left'}});
Map.add(panel);
// ui.root.insert(0,panel)
Map.setCenter(80,22,5)
Map.setOptions('HYBRID');
var ProvideInputs1 = ui.Label({value:'1. Select a State & District',
style: {fontSize: '18px', fontWeight: 'bold',color:'green'}});
var instructions1 = ui.Label('It shows the Dehhat Centers located in the selected district');
instructions1.style().set('fontSize', '12px');
var instructions2 = ui.Label("Use the slider to select the radius(Kilometers) to retrieve the crop acreage around the DC's, within the selected search radius.");
instructions2.style().set('fontSize', '12px');
var ESA = ee.ImageCollection("ESA/WorldCover/v200")
var CropColl=ee.ImageCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/Crop_Rasters');
CropColl=CropColl.map(function(img){
  return img.where(img.eq(106),1).updateMask(img.gt(0)).updateMask(img.neq(89));
})
var Years=CropColl.aggregate_array('Year').distinct().sort().getInfo().map(function(y){return String(y)})
var Seasons=CropColl.aggregate_array('Season').distinct().getInfo()
print(Years);
print(CropColl);
// Map.centerObject(selected_fc,4);
var India=ee.FeatureCollection('projects/ee-rahulharod/assets/SOI_India/District_shapefile_corrected_names');
var States=India.aggregate_array('STATE').sort().distinct().getInfo()
var Districts=India.aggregate_array('District').sort().distinct().getInfo();
var DC=ee.FeatureCollection('projects/ee-rahulharod/assets/SOI_India/Dehaat_DC_shapeFile');
var State_name=[]
var selected_fc;
var Map_class_palette=['0052ff','FFCC00','FF6600','c1bcc4','66FFFF','CCFF99','FF00FF',
                        'ffff4c','33CC00','A020F0','AB005E','fa0000','f096ff'];
var Map_class_values=[1,2,3,4,5,6,7,8,9,10,11,53,64];
var Map_class_names=['Paddy','Cotton','Soyabean','Bajra','Green Gram','Ground Nut','Toor',
                      'Wheat','Mustard','Maize','Potato','Gram','Pigeon Pea'];
var HarvestClassVis = {"opacity":1,"bands":["Harvest_class"],"min":1,"max":5,"palette":["d4d6cc","ff0000","fff800","0094ff","03ff00"]};
var Year='2022';
var Season='Kharif';
var Harvest_=false;
var select_Year = ui.Select({
  items: Years,
  placeholder:'Select Year',
  onChange: function(value) {
    Year=value;
    print('Year',value)
  }
});
var select_Season = ui.Select({
  items: Seasons,
  placeholder:'Select Season',
  onChange: function(value) {
    print('Season',value)
    if (value === 'Rabi' & Year ==='2023') {
      HarvestStatus.style().set('shown', true);
      print('Harvest_',Harvest_)
    } else {
      HarvestStatus.style().set('shown', false);
      print('Harvest_',Harvest_)
    }
  }
});
var HarvestStatus = ui.Checkbox('Wheat Harvest Status', false);
HarvestStatus.style().set('shown', false); 
// Create the select widget
var select_State = ui.Select({
  items: States,
  placeholder:'Select State',
  onChange: function(value) {
    // print(value);
    State_name=value;
    Districts=(India.filter(ee.Filter.eq('STATE', value)).aggregate_array('District')
              .sort().distinct().insert(0,'All Districts')).getInfo();
    // print(Districts);
    select_Districts.items().reset(Districts);
  }
});
// Clears the set of selected points and resets the overlay 
function clearResults() {
  var layers = Map.layers();
  var n=Map.layers().length();
  for (var i = n-1; i >= 0; i--) {
    Map.remove(Map.layers().get(i));
  }
  legend_har.clear();
  panel.remove(panel.widgets().get(9));
  panel.remove(panel.widgets().get(9));
  // panel.remove(panel.widgets().get(8));
  // Map.remove(clearButton);
  Map.setCenter(80,22,5);
}
var clearButton = ui.Button('Clear', clearResults)
// Create the select widget
var select_Districts= ui.Select({
  items: Districts,
  placeholder:'Select District',
  onChange: function(value) {
    print(value)
  }
});
var panel_1=ui.Panel({
  widgets: [select_State, select_Districts],
  layout: ui.Panel.Layout.flow('horizontal')
});
var panel_2=ui.Panel({
  widgets: [select_Year, select_Season],
  layout: ui.Panel.Layout.flow('horizontal')
});
var ProvideInputs2 = ui.Label({value:'2. Select the Radius Around DC',
style: {fontSize: '18px', fontWeight: 'bold',color:'green'}});
var slider = ui.Slider({
  min: 1,
  max: 20,
  value: 5,
  step: 0.1,
  style: {padding:'4px',width: '200px','backgroundColor': 'white',border: '1px solid black',fontWeight :'bold'},
  onChange: function(value) {
    print(value)
    // Do something when the value is changed
  }
});
function harvest_rabi(selected_fc,Year,Crop){
  var S2_SR=ee.ImageCollection("COPERNICUS/S2_SR");
  var cloudMask= require('users/rahulharod/Dehaat:S2CloudMask.js');
  var NDVI_time=S2_SR.filterBounds(selected_fc).filterDate(Year+'-03-01',Year+'-04-30')
                             .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                             .map(cloudMask.SR)
                             .map(function(img){
                               return img.normalizedDifference(['B8', 'B4'])
                                          .updateMask(ESA.first().eq(40)).clip(selected_fc).rename('NDVI')
                                          // .addBands(img.metadata('system:time_start'))
                             })
                             .select(['NDVI',
                            // 'system:time_start'
                             ]).mosaic().clip(selected_fc)
    var NDVI=NDVI_time.select('NDVI')
    // var Time=NDVI_time.select('system:time_start')
    var harvest_class=ee.Image(0).toUint8().clip(selected_fc).updateMask(Crop.eq(8)).rename('Harvest_class');
        harvest_class=harvest_class.where(NDVI.lt(0.2),1);//Harvested
        harvest_class=harvest_class.where(NDVI.gte(0.2).and(NDVI.lt(0.25)),2);
        harvest_class=harvest_class.where(NDVI.gte(0.25).and(NDVI.lt(0.3)),3);
        harvest_class=harvest_class.where(NDVI.gte(0.3).and(NDVI.lt(0.4)),4);
        harvest_class=harvest_class.where(NDVI.gte(0.4),5);
  return harvest_class
                  // .addBands(Time);
}
var vis_params_vector = {
    'color': '000000', 
    'pointSize': 3,
    'pointShape': 'star5',
    'width': 2,
    'lineType': 'solid',
    'fillColor': '00000000',
}
var submit= ui.Button({label:'Submit' });
submit.onClick(function(){
    var Dist_val = select_Districts.getValue();
    var radius=slider.getValue();
    Year = select_Year.getValue();
    Season=select_Season.getValue();
    var selected_fc;
      if (Dist_val === 'All Districts') {
    selected_fc = India.filter(ee.Filter.eq('STATE', State_name))
    // print(Districts)
    } else {
    selected_fc = India.filter(ee.Filter.eq('District', Dist_val));
     }
    if (Season==='Kharif'){
      legend.clear()
      CropLegendKharif()
    }
    else{
      legend.clear()
      CropLegendRabi()
    }
    var district_dc=DC.filterBounds(selected_fc.geometry());
    var Crop=CropColl.filter(ee.Filter.eq('Season', Season))
                      .filter(ee.Filter.eq('Year', ee.Number.parse(Year))).mosaic()
                      .set('Map_class_palette',Map_class_palette)
                      .set('Map_class_values',Map_class_values)
                      .set('Map_class_names',Map_class_names)
                      .rename('Map');
    Map.centerObject(selected_fc,8);
    Map.addLayer(Crop.clip(selected_fc),{},'Crop');
    print(Harvest_)
    if(Season==='Rabi' & Year ==='2023'){
      Harvest_=HarvestStatus.getValue();
      if(Harvest_){
      HarvestLegend()
      var Harvest_Time=harvest_rabi(selected_fc,Year,Crop);
      var harvest_class=Harvest_Time.select('Harvest_class');
      // var harvest_time=Harvest_Time.select('system:time_start');
      // var time_har=ee.Date(harvest_time.reduceRegion({reducer: ee.Reducer.mode(),geometry:selected_fc,scale: 10,maxPixels: 1e13})
      //                           .get('system:time_start')).format('dd-MM-YYYY');
      Map.addLayer(harvest_class,HarvestClassVis,'Harvest_class');
    }}
    // else if(HarvestLegend){
    //   legend_har.clear()
    // }
    Map.addLayer(selected_fc.style(vis_params_vector), {}, Dist_val,true,1);
    Map.addLayer(district_dc.style({'color':'black','pointSize': 3,'pointShape': 'star6','fillColor': 'red'}),{},'DC locations',true,0.8);
  print(district_dc)
  print(radius)
  var district_dc_buffer=district_dc.map(function(dc){
            dc=ee.Feature(dc).buffer(radius*1000);
            var areaImage = ee.Image.pixelArea().addBands(Crop.select('Map'));
            var areas = areaImage.reduceRegion({
                  reducer: ee.Reducer.sum().group({
                  groupField: 1,
                  groupName: 'class',
                }),
                geometry: dc.geometry(),
                scale: 10,
                maxPixels: 1e13
                }); 
            var classAreas = ee.List(areas.get('groups'));
            var classAreaLists = classAreas.map(function(item) {
                var areaDict = ee.Dictionary(item);
                var classNumber = ee.Number(areaDict.get('class')).format();
                var area = ee.Number(areaDict.get('sum')).divide(1e4);
                return ee.List([classNumber, area]);
              });
            var result = ee.Dictionary(classAreaLists.flatten());
            if(Season==='Rabi'& Harvest_ & Year ==='2023'){
            var areaImage_har = ee.Image.pixelArea().addBands(harvest_class);
            var areas_har = areaImage_har.reduceRegion({reducer: ee.Reducer.sum().group({groupField: 1,groupName: 'class',}),
                                              geometry: dc.geometry(),scale: 10,maxPixels: 1e13}); 
            var classAreas_har = ee.List(areas_har.get('groups'));
            var classAreaLists_har = classAreas_har.map(function(item) {
                var areaDict = ee.Dictionary(item);
                var classNumber = ee.Number(areaDict.get('class')).format();
                var area = ee.Number(areaDict.get('sum')).divide(1e4);
                return ee.List([classNumber, area]);});
            var result_har = ee.Dictionary(classAreaLists_har.flatten())
                                .rename(['1','2','3','4','5'],['Harvested_area(Ha)','7DaysToHarvest_area(Ha)','10DaysToHarvest_area(Ha)',
                                'Matured_area(Ha)','NearMaturity_area(Ha)'])
                                // .set('HarvestStatusDate',time_har)
            result=result.combine(result_har)
            }
            dc= dc.copyProperties(ee.Feature(dc.geometry(),result));
            var propertyNames = dc.propertyNames();
            if (Season==='Kharif'){
            if (propertyNames.contains('1')) {
               dc=dc.set( 'Paddy (ha)',dc.get('1'));
            }
            if (propertyNames.contains('2')) {
               dc=dc.set( 'Cotton (ha)',dc.get('2'));
            }
            if (propertyNames.contains('3')) {
               dc=dc.set( 'Soyabean (ha)',dc.get('3'));
            }
            if (propertyNames.contains('4')) {
               dc=dc.set( 'Bajra (ha)',dc.get('4'));
            }
            if (propertyNames.contains('5')) {
               dc=dc.set( 'Green Gram (ha)',dc.get('5'));
            }
            if (propertyNames.contains('6')) {
               dc=dc.set( 'Ground Nut (ha)',dc.get('6'));
            }
            if (propertyNames.contains('7')) {
               dc=dc.set( 'Toor (ha)',dc.get('7'));
            }
            if (propertyNames.contains('10')) {
               dc=dc.set( 'Maize (ha)',dc.get('10'));
            }
            }
            if (Season==='Rabi'){
            if (propertyNames.contains('8')) {
               dc=dc.set( 'Wheat (ha)',dc.get('8'));
            }
            if (propertyNames.contains('9')) {
               dc=dc.set( 'Mustard (ha)',dc.get('9'));
            }
            if (propertyNames.contains('10')) {
               dc=dc.set( 'Maize (ha)',dc.get('10'));
            }
            if (propertyNames.contains('11')) {
               dc=dc.set( 'Potato (ha)',dc.get('11'));
            }
            if (propertyNames.contains('53')) {
               dc=dc.set( 'Gram (ha)',dc.get('53'));
            }
            if (propertyNames.contains('64')) {
             dc=dc.set( 'Pigeon Pea (ha)',dc.get('64'));
            }
            }
            // if (propertyNames.contains('89')) {
            //   dc=dc.set( 'Other Crop (ha)',dc.get('89'));
            // }
            return dc
  })
  print(district_dc_buffer)
  Map.addLayer(district_dc_buffer,{color:'red'},'DC_Buffer',false,0.5);
  var classes;
  if (Season==='Kharif'){
  classes = ['Paddy (ha)','Cotton (ha)','Soyabean (ha)','Bajra (ha)' ,'Green Gram (ha)','Ground Nut (ha)','Toor (ha)','Maize (ha)'];
  }
  if (Season==='Rabi'){
    classes=['Wheat (ha)','Mustard (ha)','Maize (ha)','Potato (ha)','Gram (ha)','Pigeon Pea (ha)'];
    if(Harvest_ & Year ==='2023'){
    classes=ee.List(classes).cat(['Harvested_area(Ha)','7DaysToHarvest_area(Ha)','10DaysToHarvest_area(Ha)',
                                  'Matured_area(Ha)','NearMaturity_area(Ha)'])}
  }
  var outputFields = ee.List(
    ['Customer I','Partner Bl','Partner Di','Partner Na','Partner No','Partner St',
    'Sales Rep','latitude','longitude']).cat(classes).getInfo();
// Set download URL for feature collection and output to the panel
  // Set download URL for feature collection and output to the panel
  var download = ui.Label('3. Download '+State_name+' '+Dist_val+' '+Season+' Acreage '+Year).setUrl(district_dc_buffer.getDownloadURL({
    format: 'CSV', filename: State_name+'_'+Dist_val+'_'+Season+'_Crop_Acreage_'+Year, 
    selectors: outputFields
  }));
  // Make it match the other instructions
  download.style().set({fontSize: '14px', fontWeight: 'bold',color:'Blue'});
  panel.add(download).add(clearButton);
  print(panel.widgets());
});
panel.add(ProvideInputs1);
panel.add(instructions1);
panel.add(panel_1);
panel.add(panel_2);
panel.add(HarvestStatus);
panel.add(ProvideInputs2);
panel.add(instructions2);
panel.add(slider);
panel.add(submit);
var legend= ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
var legend_har=ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
// ---------------------Crop Legend------------------------
// set position of panel
function CropLegendRabi(){
  legend = ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
var legendTitle = ui.Label({value: 'Crop Legends',
  style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({style: { backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});};
var Map_class_palette_rabi=['ffff4c','33CC00','A020F0','AB005E','fa0000','f096ff'];
var Map_class_names_rabi=['Wheat','Mustard','Maize','Potato','Gram','Pigeon Pea'];      
// Add color and and names
for (var i = 0; i < Map_class_names_rabi.length; i++) {
  legend.add(makeRow(Map_class_palette_rabi[i], Map_class_names_rabi[i]))
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
}
// ---------------------Crop Legend------------------------
// set position of panel
function CropLegendKharif(){
  legend = ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
var legendTitle = ui.Label({value: 'Crop Legends',
  style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({style: { backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});};
var Map_class_palette_Kharif=['0052ff','FFCC00','FF6600','c1bcc4','66FFFF','CCFF99','FF00FF','A020F0'];
var Map_class_names_Kharif=['Paddy','Cotton','Soyabean','Bajra','Green Gram','Ground Nut','Toor','Maize'];      
// Add color and and names
for (var i = 0; i < Map_class_names_Kharif.length; i++) {
  legend.add(makeRow(Map_class_palette_Kharif[i], Map_class_names_Kharif[i]))
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
}
// ---------------------Crop Harvest Legend------------------------
// set position of panel
function HarvestLegend(){
  legend_har = ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
var legendTitle = ui.Label({value: 'CropHarvestStage',
  style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
legend_har.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({style: { backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});};
  var Harvest_palette=["d4d6cc","ff0000","fff800","0094ff","03ff00"]
  var Harvest_class=['Crop Harvested','7 Days to Harvest','10 Days to Harvest','Matured Crops','Crop Near Maturity']
// Add color and and names
for (var i = 0; i < Harvest_class.length; i++) {
  legend_har.add(makeRow(Harvest_palette[i], Harvest_class[i]))
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend_har);
}