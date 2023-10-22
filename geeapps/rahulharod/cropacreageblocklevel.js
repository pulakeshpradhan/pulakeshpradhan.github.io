var Season='Rabi';
var State='Bihar';
var Year='2021'
var India=ee.FeatureCollection('projects/ee-rahulharod/assets/SOI_India/India_block_Updated_Bihar_UP');
var CropColl=ee.ImageCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/Crop_Rasters');
CropColl=CropColl.map(function(img){
  return img.where(img.eq(106),1).updateMask(img.gt(0)).updateMask(img.neq(89));
})
var DC=ee.FeatureCollection('projects/ee-rahulharod/assets/SOI_India/DC_Shape_File_with_state_district_block_names');
var Feature_coll=ee.Dictionary({
  'BIHAR':{
    '2021':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Bihar_Kharif_2021')}},
    '2022':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Bihar_Kharif_2022')},
      'Rabi':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Bihar_Rabi_2022_yield')}},  
    '2023':{
      'Rabi':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Bihar_Rabi_2023_yield')}},
  },
  'RAJASTHAN':{
    '2022':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Rajasthan_Kharif_2022')},
      'Rabi':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Rajasthan_Rabi_2022_yield')}},  
    '2023':{
      'Rabi':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Rajasthan_Rabi_2023_yield')}},
  },
  'UTTARPRADESH':{
    '2022':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Uttarpradesh_Kharif_2022')},
      'Rabi':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Uttarpradesh_Rabi_2022_yield')}}, 
  },
  'MAHARASHTRA':{
    '2022':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Maharashtra_Kharif_2022')}}, 
  },
  'HARYANA':{
    '2022':{
      'Kharif':{'data':ee.FeatureCollection('projects/ee-rahulharod/assets/Crop_classification_Rasters/SHPS/Haryana_Kharif_2022')}}, 
  }
})
print(Feature_coll.keys())
// var feature_fc=ee.FeatureCollection(ee.Dictionary(ee.Dictionary(ee.Dictionary(Feature_coll.get(State)).get(Year)).get(Season)).get('data'));
// print(feature_fc)
// Map.addLayer(feature_fc)
// Define the UI panel
var panel= ui.Panel({style:{ height: '500px', width: '350px', position: 'top-left'}});
Map.add(panel);
Map.setCenter(80,22,5);
Map.setOptions('HYBRID');
var State,Districts,Year,Season;
// Add a dropdown menu to the panel
var selectState= ui.Select({
  items: Feature_coll.keys().getInfo(),
  placeholder:'Select State',
  onChange: function(state) {
    State=state;
    print(State)
    Districts=(India.filter(ee.Filter.eq('STATE', State)).aggregate_array('District')
              .sort().distinct().insert(0,'All Districts')).getInfo();
    // print(Districts);
    select_Districts.items().reset(Districts);
    var years_coll=(ee.Dictionary(Feature_coll.get(state))).keys().getInfo()
    print(years_coll)
    select_Year.items().reset(years_coll)
  }
});
var select_Districts= ui.Select({
  items: Districts,
  placeholder:'Select District',
  onChange: function(value) {
    print(value)
  }
});
var select_Year= ui.Select({
  items: ['2021','2022','2023'],
  placeholder:'Select Year',
  onChange: function(year) {
    Year=year
    print(Year)
    var season_coll=ee.Dictionary(ee.Dictionary(Feature_coll.get(State)).get(Year)).keys().getInfo()
    select_season.items().reset(season_coll)
  }
});
var select_season= ui.Select({
  items: ['Kharif','Rabi'],
  placeholder:'Select Season',
  onChange: function(season) {
    Season=season;
    print(State,Year,Season)
  }
});
var vis_params_vector = {
    'color': '000000', 
    'pointSize': 3,
    'pointShape': 'star5',
    'width': 2,
    'lineType': 'solid',
    'fillColor': '00000000',
}
var Map_class_palette=['0052ff','FFCC00','FF6600','c1bcc4','66FFFF','CCFF99','FF00FF',
                        'ffff4c','33CC00','A020F0','AB005E','fa0000','f096ff'];
var Map_class_values=[1,2,3,4,5,6,7,8,9,10,11,53,64];
var Map_class_names=['Paddy','Cotton','Soyabean','Bajra','Green Gram','Ground Nut','Toor',
                      'Wheat','Mustard','Maize','Potato','Gram','Pigeon Pea'];
var submit= ui.Button({label:'Submit' });
submit.onClick(function(){
    var Dist_val = select_Districts.getValue();
    Year = select_Year.getValue();
    Season=select_season.getValue();
    State=selectState.getValue()
    var feature_fc=ee.FeatureCollection(ee.Dictionary(ee.Dictionary(ee.Dictionary(Feature_coll.get(State)).get(Year)).get(Season)).get('data'));
    print(Dist_val,feature_fc)
    var selected_fc,district_dc;
    if (Dist_val === 'All Districts') {
            selected_fc = feature_fc;
            district_dc=DC.filter(ee.Filter.eq('STATE', State))
    } else {
            selected_fc = feature_fc.filter(ee.Filter.eq('District', Dist_val));
            district_dc=DC.filter(ee.Filter.eq('STATE', State))
                          .filter(ee.Filter.eq('District', Dist_val));
     }
    var Crop=CropColl.filter(ee.Filter.eq('Season', Season))
                      .filter(ee.Filter.eq('Year', ee.Number.parse(Year))).mosaic()
                      .set('Map_class_palette',Map_class_palette)
                      .set('Map_class_values',Map_class_values)
                      .set('Map_class_names',Map_class_names)
                      .rename('Map').clip(selected_fc);
    print('selected_fc',selected_fc)
    print('district_dc',district_dc)
    Map.centerObject(selected_fc,8);
    Map.addLayer(Crop,{},'Crop');
    Map.addLayer(selected_fc.style(vis_params_vector), {}, Dist_val,true,1);
    Map.addLayer(district_dc.style({'color':'yellow','pointSize': 3,'pointShape': 'star6','fillColor': 'red'}),{},'DC locations',true,0.8);
    selected_fc = selected_fc.map(function(feat){
        var propertyNames = feat.propertyNames();
        if (propertyNames.contains('TEHSIL')){feat=feat.set( 'Block',feat.get('TEHSIL'))}
        if (propertyNames.contains('Health')){feat=feat.set( 'Crop Health Remark',feat.get('Health'))}
        if (propertyNames.contains('WheatYield')){feat=feat.set( 'WheatYield (kg/Ha)',feat.get('WheatYield'))}
        if (propertyNames.contains('Bajra')){feat=feat.set( 'Bajra (Area Ha)',feat.get('Bajra'))}
        if (propertyNames.contains('Cotton')){feat=feat.set( 'Cotton (Area Ha)',feat.get('Cotton'))}
        if (propertyNames.contains('Gram')){feat=feat.set( 'Gram (Area Ha)',feat.get('Gram'))}
        if (propertyNames.contains('GreenGram')){feat=feat.set( 'GreenGram (Area Ha)',feat.get('GreenGram'))}
        if (propertyNames.contains('GroundNut')){feat=feat.set( 'GroundNut (Area Ha)',feat.get('GroundNut'))}
        if (propertyNames.contains('Maize')){feat=feat.set( 'Maize (Area Ha)',feat.get('Maize'))}
        if (propertyNames.contains('Mustard')){feat=feat.set( 'Mustard (Area Ha)',feat.get('Mustard'))}
        if (propertyNames.contains('Paddy')){feat=feat.set( 'Paddy (Area Ha)',feat.get('Paddy'))}
        if (propertyNames.contains('Potato')){feat=feat.set( 'Potato (Area Ha)',feat.get('Potato'))}
        if (propertyNames.contains('Soyabean')){feat=feat.set( 'Soyabean (Area Ha)',feat.get('Soyabean'))}
        if (propertyNames.contains('Toor')){feat=feat.set( 'Toor (Area Ha)',feat.get('Toor'))}
        if (propertyNames.contains('Wheat')){feat=feat.set( 'Wheat (Area Ha)',feat.get('Wheat'))}
          // 'Cotton (Area Ha)': feat.get('Cotton'),
          // 'Gram (Area Ha)': feat.get('Gram'),
          // 'GreenGram (Area Ha)': feat.get('GreenGram'),
          // 'GroundNut (Area Ha)': feat.get('GroundNut'),
          // 'Maize (Area Ha)': feat.get('Maize'),
          // 'Mustard (Area Ha)': feat.get('Mustard'),
          // 'Paddy (Area Ha)': feat.get('Paddy'),
          // 'Potato (Area Ha)': feat.get('Potato'),
          // 'Soyabean (Area Ha)': feat.get('Soyabean'),
          // 'Toor (Area Ha)': feat.get('Toor'),
          // 'Wheat (Area Ha)': feat.get('Wheat'),
      return feat
      })
    var all_columns=ee.List(['WheatYield (kg/Ha)','Bajra (Area Ha)','Cotton (Area Ha)','Gram (Area Ha)','GreenGram (Area Ha)',
                        'GroundNut (Area Ha)','Maize (Area Ha)','Mustard (Area Ha)','Paddy (Area Ha)','Potato (Area Ha)',
                        'Soyabean (Area Ha)','Toor (Area Ha)','Wheat (Area Ha)']);
    var columnNames = ee.List(selected_fc.first().propertyNames().getInfo());
    var commonFields = columnNames.filter(ee.Filter.inList('item', all_columns));
    var outputFields=ee.List(['STATE','District','Block','Crop Health Remark']).cat(commonFields).getInfo()         
     var download = ui.Label('3. Download '+State+' '+Dist_val+' '+Season+' Acreage '+Year).setUrl(selected_fc.getDownloadURL({
      format: 'CSV', filename: State+'_'+Dist_val+'_'+Season+'_Crop_Acreage_'+Year, 
      selectors: outputFields
      }));
      // Make it match the other instructions
      download.style().set({fontSize: '14px', fontWeight: 'bold',color:'Blue'});
      panel.add(Download_instructions).add(download).add(clearButton);
      print(panel.widgets());
})
// Clears the set of selected points and resets the overlay 
function clearResults() {
  // Map.remove(Map.layers().get(3));
  Map.remove(Map.layers().get(2));
  Map.remove(Map.layers().get(1));
  Map.remove(Map.layers().get(0));
  panel.remove(panel.widgets().get(5));
  panel.remove(panel.widgets().get(5));
  panel.remove(panel.widgets().get(5));
  // Map.remove(clearButton);
  Map.setCenter(80,22,5);
}
var clearButton = ui.Button('Clear', clearResults)
var State_Dist_panel = ui.Label({value:'1. Select a State and District',
style: {fontSize: '16px', fontWeight: 'bold',color:'Blue'}});
var Year_Season_Panel= ui.Label({value:'2. Select Year and Season',
style: {fontSize: '16px', fontWeight: 'bold',color:'Blue'}});
var Download_instructions = ui.Label('CSV contains Crop Acreages in Hectare and Yield in Kg/Ha.');
Download_instructions.style().set('fontSize', '12px');
// Add the dropdown menu to the panel
var panel_1=ui.Panel({
  widgets: [selectState, select_Districts],
  layout: ui.Panel.Layout.flow('horizontal')
});
var panel_2=ui.Panel({
  widgets: [select_Year,select_season],
  layout: ui.Panel.Layout.flow('horizontal')
});
panel.add(State_Dist_panel);
panel.add(panel_1);
panel.add(Year_Season_Panel);
panel.add(panel_2);
panel.add(submit);
CropLegend();
// ---------------------Crop Legend------------------------
// set position of panel
function CropLegend(){
var legend = ui.Panel({style: {position: 'bottom-right',padding: '8px 15px'}});
var legendTitle = ui.Label({value: 'Crop Legends',
  style: {fontWeight: 'bold',fontSize: '18px',margin: '0 0 4px 0',padding: '0'}});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({style: { backgroundColor: color,padding: '8px',margin: '0 0 4px 0'}});
      var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal')});};
// Add color and and names
for (var i = 0; i < Map_class_names.length; i++) {
  legend.add(makeRow(Map_class_palette[i], Map_class_names[i]))
}
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
}