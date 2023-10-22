/*
Script for the Version 3 of the App
Author: Rajat Shinde
functions: 
1. level1: Called on selecting a region
*/
//UI
var region = 'default';
var selectedRegion;
var selectedRegionGeo;
var panelLabelVal;
var geometricDetailsLabelVal;
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '50%', height: '100%', position: 'top-left', backgroundColor: '000000', textAlign: 'center'}
});
var panel1 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '100%', height: '50%', position: 'top-left', backgroundColor: '000000'}
});
var panel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '100%', height: '40%', position: 'top-left', backgroundColor: '000000'}
});
var appTextLabel1 = ui.Label({
  value: 'About the App!',
  style: {color: 'yellow', 
          backgroundColor: '#000000', 
          fontSize: '14px', 
          fontWeight:'bold',
          textAlign: 'center'
          }
}); 
var appTextLabel2 = ui.Label({
  value: 'This web application has been developed with a vision to provide a platform for '+
         'visualization of ecological status in a region. We have tried to provide '+
         'a picture of the ecological status by analyzing certain parameters which '+
         'have significant impact over the ecosystem. These parameters and the properties '+
         'associated with them can be selected one at a time for visualization. '+ 
         'The application is developed as a combination of various apps where an '+
         'individual app is loaded on selecting a parameter for visualization.',
  style: {color: '#ffffff', 
          backgroundColor: '#000000', 
          fontSize: '12px', 
          textAlign: 'justify'
          }
}); 
var appTextLabel3 = ui.Label({
  value: 'DISCLAIMER: Please use the results, charts and outputs of this app with caution. '+
         'The analysis of ecological status and trend performed using this app has its own '+
         'limitations in terms of available dataset for a region and accuracy with which '+
         'the results are generated. The app makes a generalized effort to analyse some parameters '+
         'influencing the ecological status in a region by using remote sensing data archive.',
  style: {color: '#808080', 
          backgroundColor: '#000000', 
          fontSize: '10px', 
          textAlign: 'justify'
          }
}); 
var appTextLabel4 = ui.Label({
  value: 'Google Summer of Earth Engine 2019',
  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '11px', 
          textAlign: 'justify'
          }
}); 
var contactLabel = ui.Label({
  value: 'For Feedback and Comments:',
  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '11px', 
          textAlign: 'justify'
          }
}); 
var contactLabel1 = ui.Label({
  value: 'Rajat Shinde',
  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '11px', 
          textAlign: 'justify'
          }
}); 
var contactLabel2 = ui.Label({
  value: 'rajatshinde@iitb.ac.in',
  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '11px', 
          textAlign: 'justify'
          }
}); 
var regionSelectItems = ['Achankovil', 'Agumbe', 'Aralam', 'Attappadi', 'Balahalli', 
'Bramhagiri', 'Chandoli', 'Chinnar', 'Eravikulam', 'Grass Hills', 'Grizzled Giant Squirrel',
'Kalakad Mundanthurai', 'Kalikavu', 'Karian Shola', 'Kas Plateau', 'Kerti', 'Konni', 
'Koyana', 'Kudremukh', 'Kulathupuzha', 'Mankulam', 'Mannavan', 'Mukurthi', 'New Amarambalam',
'Neyyar', 'Padinalknad', 'Palode', 'Peppara', 'Periyar', 'Pushpagiri', 'Radhanagari',
'Ranni', 'Shendurney', 'Silent Valley', 'Someshwara', 'Talacauvery', 'Tirunelveli North'];
var regionSelect = ui.Select({
  items: regionSelectItems,
  placeholder: 'Choose a Region',
  style: {width: '300px',
          color: '#00008b',
          textAlign: 'center'
          },
  onChange: function(value) {
    print('Selected Value', value);
    if(value == 'Achankovil'){
      print('I am in Achankovil');
      region = 'Achankovil';
      //var updatePanel = level1(region)
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Agumbe'){
      print('I am in Agumbe');
      region = 'Agumbe';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Aralam'){
      print('I am in Aralam');
      region = 'Aralam';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Attappadi'){
      print('I am in Attappadi');
      region = 'Attappadi';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Balahalli'){
      print('I am in Balahalli');
      region = 'Balahalli';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Bramhagiri'){
      print('I am in Bramhagiri');
      region = 'Bramhagiri';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Chandoli'){
      print('I am in Chandoli');
      region = 'Chandoli';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Chinnar'){
      print('I am in Chinnar');
      region = 'Chinnar';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Eravikulam'){
      print('I am in Eravikulam');
      region = 'Eravikulam';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Grass Hills'){
      print('I am in Grass Hills');
      region = 'GrassHills';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Grizzled Giant Squirrel'){
      print('I am in Grizzled Giant Squirrel');
      region = 'GrizzledGiantSquirrel';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kalakad Mundanthurai'){
      print('I am in Kalakad Mundanthurai');
      region = 'KalakadMundanthurai';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kalikavu'){
      print('I am in Kalikavu');
      region = 'Kalikavu';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Karian Shola'){
      print('I am in Karian Shola');
      region = 'KarianShola';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kas Plateau'){
      print('I am in Kas Plateau');
      region = 'KasPlateau';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kerti'){
      print('I am in Kerti');
      region = 'Kerti';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Konni'){
      print('I am in Konni');
      region = 'Konni';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Koyana'){
      print('I am in Koyana');
      region = 'Koyana';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kudremukh'){
      print('I am in Kudremukh');
      region = 'Kudremukh';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Kulathupuzha'){
      print('I am in Kulathupuzha');
      region = 'Kulathupuzha';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Mankulam'){
      print('I am in Mankulam');
      region = 'Mankulam';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Mannavan'){
      print('I am in Mannavan');
      region = 'Mannavan';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Mukurthi'){
      print('I agm in Mukurthi');
      region = 'Mukurthi';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'New Amarambalam'){
      print('I am in New Amarambalam');
      region = 'NewAmarambalam';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Neyyar'){
      print('I am in Neyyar');
      region = 'Neyyar';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Padinalknad'){
      print('I am in Padinalknad');
      region = 'Padinalknad';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Palode'){
      print('I am in Palode');
      region = 'Palode';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Peppara'){
      print('I am in Peppara');
      region = 'Peppara';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Periyar'){
      print('I am in Periyar');
      region = 'Periyar';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Pushpagiri'){
      print('I am in Pushpagiri');
      region = 'Pushpagiri';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Radhanagari'){
      print('I am in Radhanagari');
      region = 'Radhanagari';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Ranni'){
      print('I am in Ranni');
      region = 'Ranni';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Shendurney'){
      print('I am in Shendurney');
      region = 'Shendurney';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Silent Valley'){
      print('I am in Silent Valley');
      region = 'SilentValley';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Someshwara'){
      print('I am in Someshwara');
      region = 'Someshwara';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Talacauvery'){
      print('I am in Talacauvery');
      region = 'Talacauvery';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
    else if(value == 'Tirunelveli North'){
      print('I am in Tirunelveli North');
      region = 'TirunelveliNorth';
      ui.root.remove(panel);
      var updatePanel = level1(region)
    }
  }
});
//var bounds = ee.FeatureCollection("users/rajatshinde2303/soee_ncf/westernGhatsGeometries/export"+selectedRegion);
var paramSelectItems = ['Temperature', 'Precipitation and Evapotranspiration',
'Forest Cover and Vegetation', 'Land Use Land Cover', 'Anthropogenic Activities',
'Forest Fires', 'Burn Scar Analysis', 'Atmosphere', 'Surface Water Analysis'];
var paramSelect = ui.Select({
  items: paramSelectItems,
  placeholder: 'Choose a Parameter for Visualization',
  style: {width: '300px',
          color: '#00008b',
          textAlign: 'center'
          },
  onChange: function(value) {
    print('Selected Value', value);
    if(value == 'Temperature'){
      print('Temperature');
      var studyTemperature = require('users/rajatshinde2303/NCF_SoEE2019:studyTemperature');
      var generateResults = studyTemperature.generateResults(selectedRegion, panel, panel1, panel2);
    } 
    else if(value == 'Precipitation and Evapotranspiration'){
      print('Precipitation');
      var studyPrecipitation = require('users/rajatshinde2303/NCF_SoEE2019:studyPrecipitation');
      var generateResults = studyPrecipitation.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Forest Cover and Vegetation'){
      print('Forest Cover');
      var studyForestCover = require('users/rajatshinde2303/NCF_SoEE2019:studyForestCover');
      var generateResults = studyForestCover.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Land Use Land Cover'){
      print('LULC');
      var studyLULC = require('users/rajatshinde2303/NCF_SoEE2019:studyLULC');
      var generateResults = studyLULC.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Anthropogenic Activities'){
      print('Anthropogenic activities');
      var studyAnthropogenicActivities = require('users/rajatshinde2303/NCF_SoEE2019:studyAnthropogenicActivities');
      var generateResults = studyAnthropogenicActivities.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Forest Fires'){
      print('Forest fires');
      var studyForestFires = require('users/rajatshinde2303/NCF_SoEE2019:studyForestFires');
      var generateResults = studyForestFires.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Burn Scar Analysis'){
      print('Burn Scar');
      var studyBurnScar = require('users/rajatshinde2303/NCF_SoEE2019:studyBurnScar');
      var generateResults = studyBurnScar.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Atmosphere'){
      print('Atmosphere');
      var studyAtmosphere = require('users/rajatshinde2303/NCF_SoEE2019:studyAtmosphere');
      var generateResults = studyAtmosphere.generateResults(selectedRegion, panel, panel1, panel2);
    }
    else if(value == 'Surface Water Analysis'){
      print('Surface Water');
      var studySurfaceWater = require('users/rajatshinde2303/NCF_SoEE2019:studySurfaceWater');
      var generateResults = studySurfaceWater.generateResults(selectedRegion, panel, panel1, panel2);
    }
  }
});
var panelLabel = ui.Label({
  value: 'EcoViz: An App for Visualization of Ecological Status and Trends for World Heritage Site - The Western Ghats of India',  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '20px', 
          fontWeight:'bold',
          textAlign: 'center'
          }
});
var geometryDetailsLabel = ui.Label({
  value: ' ',
  style: {color: 'orange', 
          backgroundColor: '#000000', 
          fontSize: '14px', 
          fontWeight:'bold',
          textAlign: 'left',
          }
});
ui.root.add(panel);
panel.add(panelLabel);
panel.add(panel1);
panel1.add(regionSelect);
panel.add(panel2);
panel2.add(appTextLabel1);
panel2.add(appTextLabel2);
panel2.add(appTextLabel3);
panel2.add(appTextLabel4);
panel2.add(contactLabel);
panel2.add(contactLabel1);
panel2.add(contactLabel2);
var bounds = ee.FeatureCollection("users/rajatshinde2303/soee_ncf/westernGhatsGeometries/exportWHS");
var regionImg = ee.Image().byte().paint(bounds, 0, 1);
Map.centerObject(bounds, 8);
Map.addLayer(regionImg, {palette:'#000000'}, 'World Heritage Sites of Western Ghats');
/*
function for loading options for selecting the individual scripts
params:
  1. region: Selected Region of Interest
*/
var level1 = function(region){
  //Only for updating Panel label
  selectedRegionGeo = region;
  if(selectedRegionGeo == 'Achankovil'){
    panelLabel.setValue('Select the parameter to explore in Achankovil Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Achankovil | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 21,990 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Achankovil&params=9_19_0_N_76_28_0_E_type:river');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Agumbe'){
    panelLabel.setValue('Select the parameter to explore in Agumbe Reserved Forest in Karnataka')
    geometryDetailsLabel.setValue("Region: Agumbe | "+
                                  "State: Karnataka | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 5,709 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Agumbe&params=13.5087_N_75.0959_E_type:city(500)_region:IN-KA');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Aralam'){
    panelLabel.setValue('Select the parameter to explore in Aralam Wildlife Sanctuary in kerala')
    geometryDetailsLabel.setValue("Region: Aralam | "+
                                  "State: kerala | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 5,500 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Aralam_Wildlife_Sanctuary&params=11.87878_N_75.88864_E_region:IN-KL_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Attappadi'){
    panelLabel.setValue('Select the parameter to explore in Attappadi Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Attappadi | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 6,575 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Attappadi&params=11_5_0_N_76_35_0_E_type:city_region:IN-KL');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Balahalli'){
    panelLabel.setValue('Select the parameter to explore in Balahalli Reserved Forest in Karnataka')
    geometryDetailsLabel.setValue("Region: Balahalli | "+
                                  "State: Karnataka | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 2,263 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Someshwara_Wildlife_Sanctuary&params=13_29_N_74_50_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Bramhagiri'){
    panelLabel.setValue('Select the parameter to explore in Bramhagiri Wildlife Sanctuary in Karnataka')
    geometryDetailsLabel.setValue("Region: Bramhagiri | "+
                                  "State: Karnataka | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 18,129 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Brahmagiri_Wildlife_Sanctuary&params=12.387_N_75.491_E_type:landmark_region:IN');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Chandoli'){
    panelLabel.setValue('Select the parameter to explore in Chandoli National Park in Maharashtra')
    geometryDetailsLabel.setValue("Region: Chandoli | "+
                                  "State: Maharashtra | "+
                                  "Type: National Park | "+
                                  "Area: 30,890 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Chandoli_National_Park&params=17_11_30_N_73_46_30_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Chinnar'){
    panelLabel.setValue('Select the parameter to explore in Chinnar Wildlife Sanctuary in kerala')
    geometryDetailsLabel.setValue("Region: Chinnar | "+
                                  "State: kerala | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 9,044 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Chinnar_Wildlife_Sanctuary&params=10.3_N_77.175_E_type:city_region:IN-KL');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Eravikulam'){
    panelLabel.setValue('Select the parameter to explore in Eravikulam National Park in kerala')
    geometryDetailsLabel.setValue("Region: Eravikulam | "+
                                  "State: kerala | "+
                                  "Type: National Park | "+
                                  "Area: 12,700 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Eravikulam_National_Park&params=10.2_N_77.083_E_type:landmark_dim:10km');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'GrassHills'){
    panelLabel.setValue('Select the parameter to explore in Grass Hills National Park in Tamil Nadu')
    geometryDetailsLabel.setValue("Region: Grass Hills | "+
                                  "State: Tamil Nadu | "+
                                  "Type: National Park | "+
                                  "Area: 3,123 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Grass_Hills_National_Park&params=10.3410227_N_76.9856427_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'GrizzledGiantSquirrel'){
    panelLabel.setValue('Select the parameter to explore in Grizzled Giant Squirrel Wildlife Sanctuary in Tamil Nadu')
    geometryDetailsLabel.setValue("Region: Grizzled Giant Squirrel | "+
                                  "State: Tamil Nadu | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 48,000 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Grizzled_Squirrel_Wildlife_Sanctuary&params=9_34_30_N_77_33_30_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'KalakadMundanthurai'){
    panelLabel.setValue('Select the parameter to explore in Kalakad Mundanthurai Tiger Reserve in Tamil Nadu')
    geometryDetailsLabel.setValue("Region: Kalakad Mundanthurai | "+
                                  "State: Tamil Nadu | "+
                                  "Type: Tiger Reserve | "+
                                  "Area: 89,500 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Kalakkad_Mundanthurai_Tiger_Reserve&params=8_41_N_77_19_E_type:city_region:IN-TN');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Kalikavu'){
    panelLabel.setValue('Select the parameter to explore in Kalikavu Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Kalikavu | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 11,705 Ha");
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'KarianShola'){
    panelLabel.setValue('Select the parameter to explore in Karian Shola National Park in Tamil Nadu/kerala')
    geometryDetailsLabel.setValue("Region: Karian Shola | "+
                                  "State: Tamil Nadu/kerala | "+
                                  "Type: National Park | "+
                                  "Area: 503 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Karian_Shola_National_Park&params=10_23_N_77_5_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'KasPlateau'){
    panelLabel.setValue('Select the parameter to explore in Kas Plateau Reserved Forest in Maharashtra')
    geometryDetailsLabel.setValue("Region: Kas Plateau | "+
                                  "State: Maharashtra | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 1,142 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Kaas_plateau&params=17_43_12_N_73_49_22_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Kerti'){
    panelLabel.setValue('Select the parameter to explore in Kerti Reserved Forest in Karnataka')
    geometryDetailsLabel.setValue("Region: Kerti | "+
                                  "State: Karnataka | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 7,904 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?params=12.5464_N_75.7078_E_globe:earth&language=en');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Konni'){
    panelLabel.setValue('Select the parameter to explore in Konni Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Konni | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 26,143 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Elephant_Training_Center,_Konni&params=9.2410383_N_76.8783975_E_type:landmark_region:IN');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Koyana'){
    panelLabel.setValue('Select the parameter to explore in Koyana Wildlife Sanctuary in Maharashtra')
    geometryDetailsLabel.setValue("Region: Koyana | "+
                                  "State: Maharashtra | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 42,355 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Koyna_Wildlife_Sanctuary&params=17_32_56_N_73_45_11_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Kudremukh'){
    panelLabel.setValue('Select the parameter to explore in Kudremukh National Park in Karnataka')
    geometryDetailsLabel.setValue("Region: Kudremukh | "+
                                  "State: Karnataka | "+
                                  "Type: National Park | "+
                                  "Area: 60,032 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Kudremukh&params=13_07_46.24_N_75_16_06.79_E_type:mountain_region:IN_scale:100000');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Kulathupuzha'){
    panelLabel.setValue('Select the parameter to explore in Kulathupuzha Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Kulathupuzha | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 20,000 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Kulathupuzha&params=8.9082295_N_77.055501_E_type:city(33271)_region:IN-KL');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Mankulam'){
    panelLabel.setValue('Select the parameter to explore in Mankulam Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Mankulam | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 5,284 Ha");
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Mannavan'){
    panelLabel.setValue('Select the parameter to explore in Mannavan Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Mannavan | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 1,126 Ha");
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Mukurthi'){
    panelLabel.setValue('Select the parameter to explore in Mukurthi National Park in Tamil Nadu')
    geometryDetailsLabel.setValue("Region: Mukurthi | "+
                                  "State: Tamil Nadu | "+
                                  "Type: National Park | "+
                                  "Area: 7,850 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Mukurthi_National_Park&params=11_16_N_76_28.5_E_type:city_region:IN-TN');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'NewAmarambalam'){
    panelLabel.setValue('Select the parameter to explore in New Amarambalam Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: New Amarambalam | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 24,697 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=New_Amarambalam_Reserved_Forest&params=11_14_0_N_76_11_0_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Neyyar'){
    panelLabel.setValue('Select the parameter to explore in Neyyar Wildlife Sanctuary in kerala')
    geometryDetailsLabel.setValue("Region: Neyyar | "+
                                  "State: kerala | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 128,000 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Neyyar_Wildlife_Sanctuary&params=08.40_N_77.16_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Padilknad'){
    panelLabel.setValue('Select the parameter to explore in Padilknad Reserved Forest in Karnataka')
    geometryDetailsLabel.setValue("Region: Padilknad | "+
                                  "State: Karnataka | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 18,476 Ha");
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Palode'){
    panelLabel.setValue('Select the parameter to explore in Palode Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Palode | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 16,500 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Palode&params=8.7033_N_77.0264_E_type:city(14795)_region:IN-KL');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Peppara'){
    panelLabel.setValue('Select the parameter to explore in Peppara Wildlife Sanctuary in kerala')
    geometryDetailsLabel.setValue("Region: Peppara | "+
                                  "State: kerala | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 5,300 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Peppara_Wildlife_Sanctuary&params=8_38_50_N_77_10_0_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Periyar'){
    panelLabel.setValue('Select the parameter to explore in Periyar Tiger Reserve in kerala')
    geometryDetailsLabel.setValue("Region: Periyar | "+
                                  "State: kerala | "+
                                  "Type: Tiger Reserve | "+
                                  "Area: 77,700 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Periyar_National_Park&params=9_28_N_77_10_E_type:landmark_dim:17km');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Pushpagiri'){
    panelLabel.setValue('Select the parameter to explore in Pushpagiri Wildlife Sanctuary in Karnataka')
    geometryDetailsLabel.setValue("Region: Pushpagiri | "+
                                  "State: Karnataka | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 10,259 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Pushpagiri_Wildlife_Sanctuary&params=12_35_0_N_75_40_0_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Radhanagari'){
    panelLabel.setValue('Select the parameter to explore in Radhanagari Wildlife Sanctuary in Maharashtra')
    geometryDetailsLabel.setValue("Region: Radhanagari | "+
                                  "State: Maharashtra | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 28,235 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Radhanagari_Wildlife_Sanctuary&params=16_23.09_0_N_73_57.32_0_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Ranni'){
    panelLabel.setValue('Select the parameter to explore in Ranni Reserved Forest in kerala')
    geometryDetailsLabel.setValue("Region: Ranni | "+
                                  "State: kerala | "+
                                  "Type: Reserved Forest | "+
                                  "Area: 82,853 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Ranni_Forest_Division&params=9.3866_N_76.7856_E_type:forest');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Shendurney'){
    panelLabel.setValue('Select the parameter to explore in Shendurney Wildlife Sanctuary in kerala')
    geometryDetailsLabel.setValue("Region: Shendurney | "+
                                  "State: kerala | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 17,100 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Shendurney_Wildlife_Sanctuary&params=8.858694_N_77.210649_E_region:IN-KL_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Silent Valley'){
    panelLabel.setValue('Select the parameter to explore in Silent Valley National Park in kerala')
    geometryDetailsLabel.setValue("Region: Silent Valley | "+
                                  "State: kerala | "+
                                  "Type: National Park | "+
                                  "Area: 8,952 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Silent_Valley_National_Park&params=11_08_N_76_28_E_type:landmark_dim:9km');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Someshwara'){
    panelLabel.setValue('Select the parameter to explore in Someshwara Wildlife Sanctuary in Karnataka')
    geometryDetailsLabel.setValue("Region: Someshwara | "+
                                  "State: Karnataka | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 8,840 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Someshwara_Wildlife_Sanctuary&params=13_29_N_74_50_E_type:landmark');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'Talacauvery'){
    panelLabel.setValue('Select the parameter to explore in Talacauvery Wildlife Sanctuary in Karnataka')
    geometryDetailsLabel.setValue("Region: Talacauvery | "+
                                  "State: Karnataka | "+
                                  "Type: Wildlife Sanctuary | "+
                                  "Area: 10,500 Ha");
    geometryDetailsLabel.setUrl('https://tools.wmflabs.org/geohack/geohack.php?pagename=Talakaveri_Wildlife_Sanctuary&params=12_20_N_75_30_E_');
    panel1.add(geometryDetailsLabel);
  }
  else if(selectedRegionGeo == 'TirunelveliNorth'){
    panelLabel.setValue('Select the parameter to explore in Tirunelveli North Reserved Forest in Tamil Nadu')
    geometryDetailsLabel.setValue("Region: Tirunelveli North | "+
                                  "State: Tamil Nadu | "+
                                  "Type: Reserved Forest");
    panel1.add(geometryDetailsLabel);
  }
  // else if(selectedRegionGeo == 'Tirunelveli North Part 2'){
  //   panelLabel.setValue('Select the parameter to explore in Tirunelveli North Part 2 Reserved Forest in Tamil Nadu')
  //   geometryDetailsLabel.setValue("Region: Tirunelveli North Part 2 | "+
  //                                 "State: Tamil Nadu | "+
  //                                 "Type: Reserved Forest");
  //   panel1.add(geometryDetailsLabel);
  // }
  panelLabelVal = panelLabel.getValue();
  geometricDetailsLabelVal = geometryDetailsLabel.getValue();
  var updatePanel = require('users/rajatshinde2303/NCF_SoEE2019:EcoVizLevelTwo');
  var generateResults = updatePanel.generateResults(region, panel, panel1, panel2, panelLabelVal, geometricDetailsLabelVal);
}