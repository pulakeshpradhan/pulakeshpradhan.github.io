var cc = ui.import && ui.import("cc", "imageCollection", {
      "id": "projects/servir-mekong/yearly_primitives_smoothed/tree_canopy"
    }) || ee.ImageCollection("projects/servir-mekong/yearly_primitives_smoothed/tree_canopy"),
    simard2 = ui.import && ui.import("simard2", "imageCollection", {
      "id": "projects/mangrovescience/DAAC_Hba_Simard"
    }) || ee.ImageCollection("projects/mangrovescience/DAAC_Hba_Simard"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/baldassarre/MangrGee/communes"
    }) || ee.FeatureCollection("users/baldassarre/MangrGee/communes"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/baldassarre/MangrGee/CaMau2020"
    }) || ee.Image("users/baldassarre/MangrGee/CaMau2020"),
    simard = ui.import && ui.import("simard", "image", {
      "id": "users/baldassarre/MangrGee/Mangrove_agb_Vietnam"
    }) || ee.Image("users/baldassarre/MangrGee/Mangrove_agb_Vietnam"),
    communes = ui.import && ui.import("communes", "table", {
      "id": "users/baldassarre/MangrGee/communes"
    }) || ee.FeatureCollection("users/baldassarre/MangrGee/communes");
//Map.layers().set(11, dot);
var Dark = [
  {
    featureType: 'administrative',
    elementType: 'all',
    //stylers: [{visibility: 'off'}]
    stylers: [{color: 'white'},{visibility: 'on'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    //stylers: [{color: '#444444'}]
    stylers: [{color: 'cyan'},{visibility: 'on'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    //stylers: [{color: '#000000'}, {visibility: 'on'}]
    //stylers: [{color: '#DCDCDC'}, {visibility: 'on'}] // #696969
    //stylers: [{color: '#778899'}, {visibility: 'on'}] //LightSlateGrey
    stylers: [{color: '#696969'}, {visibility: 'on'}] //DimGrey
  },
  {featureType: 'poi', elementType: 'all', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'all',
    stylers: [{saturation: -100}, {lightness: 45}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#B8B8B8'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#C0C0C0'}]
  },
  {featureType: 'road', elementType: 'labels', stylers: [{visibility: 'off'}]},
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#C0C0C0'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [{visibility: 'simplified'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {featureType: 'transit', elementType: 'all', stylers: [{visibility: 'off'}]},
  {
    featureType: 'water',
    elementType: 'all',
    //stylers: [{color: '#434343'}, {visibility: 'on'}]
    stylers: [{color: '#000000'}, {visibility: 'on'}] 
    //stylers: [{color: '#4169E1'}, {visibility: 'on'}] // RoyalBlue 
    //stylers: [{color: '#191970'}, {visibility: 'on'}]   // MidnightBlue
  }
];
/*
var Color = [
  {elementType: 'labels', stylers: [{visibility: 'off'}]}, {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{color: '#0F0919'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#E4F7F7'}]
  },
  {elementType: 'geometry.stroke', stylers: [{visibility: 'off'}]}, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#002FA7'}]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [{color: '#E60003'}]
  },
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{color: '#FBFCF4'}]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [{color: '#FFED00'}]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [{color: '#D41C1D'}]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry.fill',
    stylers: [{color: '#BF0000'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry.fill',
    stylers: [{saturation: -100}]
  }
];
*/
//var medianImage = ee.Image('users/baldassarre/SRD/Cloud_Free_Composite_Province_CaMau_2020')
//var trueColour = {
//  stylers: [{color: '#000000'}, {visibility: 'off'}],
//    bands: ["swir2", "nir", "red"],
//    min: 0,
//    max: 0.6
//    };
//var S2_2020 = Map.addLayer(ee.Image(medianImage),
//            trueColour,
//            'composite',false
//            );
Map.setOptions('Dark', {Dark: Dark}); //, Color: Color // , S2_2020: S2_2020
//Map.setOptions('snazzyBlack', {snazzyBlack: snazzyBlack, snazzyColor: snazzyColor});
//=====================================================================================================================
// App Tutorial for Vietnam
//                                                  
// Code: App Tutorial for Vietnam
// Written by: Giuseppe Baldassarre University of Lisbon
// Objective: This code works through a tutorial for creating a
// 1) Canopy cover extent (2000-2019) for Cà Mau province 
// 2) Mangrove extent (2000-2020) for Cà Mau province and its communes
//=====================================================================================================================
// Select the Province
var province = 'Cà Mau'; //var commune = 'Dat Mui'; //var commune = 'Tam Giang Dong';
// Select the Years
var year1 = 2000; 
var year2 = 2010; 
var year3 = 2019;
///////////////////////////////////////////////////////////////
//                    1) Import Layers of Interest           //
///////////////////////////////////////////////////////////////
// import shapefile data
var vietnam = ee.FeatureCollection("users/servirmekong/countries/VNM_adm1");
var roi = vietnam.filter(ee.Filter.eq("NAME_1",province)).geometry();
// Create a collection for the Canopy Cover
var prefix = 'projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_';
// fix dates 2017 - 2018 - 2019
c2017 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2017')
var may_date = 1483228800000;
var c2017 = c2017.set({'system:time_start': may_date});
c2018 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2018')
var may_date = 1514764800000;
var c2018 = c2018.set({'system:time_start': may_date});
c2019 = ee.Image('projects/servir-mekong/yearly_primitives_smoothed/tree_canopy/tcc_2019')
var may_date = 1546300800000;
var c2019 = c2019.set({'system:time_start': may_date});
var ccc = ee.ImageCollection([prefix+(2000),prefix+(2001),prefix+(2002),prefix+(2003),prefix+(2004),prefix+(2005),
                                                prefix+(2006),prefix+(2007),prefix+(2008),prefix+(2009),prefix+(2010),prefix+(2011),
                                                prefix+(2012),prefix+(2013),prefix+(2014),prefix+(2015),prefix+(2016),
                                                c2017,c2018,c2019]);
// S2 Cloud Free Composite 2020
var L5comp1 = ee.Image('users/baldassarre/SRD/Cloud_Free_Composite_Province_CaMau_2000')
var L5comp2 = ee.Image('users/baldassarre/SRD/Cloud_Free_Composite_Province_CaMau_2010')
var medianImage2 = ee.Image('users/baldassarre/SRD/Cloud_Free_Composite_Province_CaMau_2016')
var medianImage3 = ee.Image('users/baldassarre/SRD/Cloud_Free_Composite_Province_CaMau_2021')
// Canopy Cover maps
var extent2000 = ee.Image(prefix+(year1)).clip(roi)
var extent2010 = ee.Image(prefix+(year2)).clip(roi)
var extent2020 = ee.Image(prefix+(year3)).clip(roi)
// Loss & Gain
var LossGain = ee.Image('users/baldassarre/SRD/LossGain_CaMau_2000_2019')
//Get the Simard data 
//var simard = ee.ImageCollection('projects/mangrovescience/DAAC_Hba_Simard')
var simard = ee.Image('users/baldassarre/MangrGee/Mangrove_agb_Vietnam')
//Mosaic the Simard data to an Image so we can clip it later
//var hba = simard.mosaic().clip(roi)
var hba = simard.clip(roi)
// Mangrove Extent 2020
var MangExtent = ee.FeatureCollection('users/baldassarre/MangrGee/VectorizedCaMau'+(year3));
var MangExtentImg = ee.Image('users/baldassarre/MangrGee/CaMau'+(year3));
var MangExtentImgBiomass = hba.clip(MangExtent);
///////////////////////////////////////////////////////////////
//      2) Begin setting up map appearance and app layers   //
///////////////////////////////////////////////////////////////
//2.1) Set up general display
//Set up a satellite background
Map.setOptions('Dark') //Satellite
//Center the map to ROI
Map.centerObject(roi,9)
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
//2.2) We want to set up a Viridis color pallete to display the Simard data
var viridis = {min: 50 , max : 140,palette : ['#481567FF','#482677FF','#453781FF','#404788FF','#39568CFF',
                                              '#33638DFF','#2D708EFF','#287D8EFF','#238A8DFF','#1F968BFF',
                                              '#20A387FF','#29AF7FFF','#3CBB75FF','#55C667FF',
                                              '#73D055FF','#95D840FF','#B8DE29FF','#DCE319FF','#FDE725FF' 
]};
//Other color pallette for Canopy Cover
var palettes = require('users/gena/packages:palettes');
var palette1 = {min: 0 , max : 100,palette : palettes.colorbrewer.Greens[9].slice(2,9)};
var palette2 = {min: 0 , max : 100,palette : palettes.colorbrewer.Blues[9].slice(2,9)};
var palette3 = {min: 0 , max : 100,palette : palettes.colorbrewer.Blues[9].slice(2,9)};
var palette4 = {min: -1 , max : 1,palette : ['red','cyan']};
var trueColourL5 = {
  stylers: [{color: '#000000'}, {visibility: 'off'}],
    bands: ["B5", "B4", "B3"],
    min: 0,
    max: 128
    };
var trueColourS2 = {
  stylers: [{color: '#000000'}, {visibility: 'off'}],
    bands: ["swir2", "nir", "red"],
    min: 0,
    max: 0.6
    };
var LGcolours = {min:-1,max:1,palette:'red, green'};
//2.3) Create variables for GUI layers for each layer
//We set each layer to "false" so the user can turn them on later
//var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false)
var L5_Comp1 = ui.Map.Layer(L5comp1, trueColourL5, 'L5_Composite_2000',false)
var L5_Comp2 = ui.Map.Layer(L5comp2, trueColourL5, 'L5_Composite_2010',false)
var S2_Comp2 = ui.Map.Layer(medianImage2, trueColourS2, 'S2_Composite_2016',false)
var S2_Comp3 = ui.Map.Layer(medianImage3, trueColourS2, 'S2_Composite_2021',false)
var ext2000 = ui.Map.Layer(extent2000.updateMask(extent2000), palette1, 'Extent'+(year1),false)
//var ext2010 = ui.Map.Layer(extent2010.updateMask(extent2010), palette2, 'Extent'+(year2),false)
var ext2020 = ui.Map.Layer(extent2020.updateMask(extent2020), palette3, 'Extent'+(year3),false)
LossGain = LossGain.updateMask(LossGain.neq(0))
var LossGain = ui.Map.Layer(LossGain,{palette:['red','cyan'], min:1, max:1}, "loss and gain", false)
var simHBA = ui.Map.Layer(hba,viridis,'Biomass (AGB), Simard',false)
var simHBAMangr = ui.Map.Layer(MangExtentImgBiomass,viridis,'Mangroves extent 2020 (Biomass (AGB), Simard)',false)
var Mangr2020 = ui.Map.Layer(MangExtentImg,{palette:['white'], min:1, max:1},'Mangrove extent 2020 (Biomass (AGB), Simard)',false)
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({featureCollection: communes,color: 1,width: 2});
var Communes = ui.Map.Layer(outline, {palette: 'white'}, 'edges',false);
//Add these layers to our map. They will be added but not displayed
Map.add(L5_Comp1)
Map.add(L5_Comp2)
Map.add(S2_Comp2)
Map.add(S2_Comp3)
Map.add(ext2000)
//Map.add(ext2010)
Map.add(ext2020)
Map.add(LossGain)
Map.add(simHBA)
Map.add(Mangr2020)
Map.add(simHBAMangr)
Map.add(Communes)
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header1 = ui.Label('SRD: Cà Mau Canopy Cover & Mangrove Extent/Loss Explorer (2000-2020)', 
                        {fontSize: '18px', fontWeight: 'bold', color: '4A997E'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header1],//Adds header and text
  style:{width: '230px',position:'middle-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
 // ui.Label({
 //   value: '__________________________',
 //   style: {fontWeight: 'bold',  color: 'black'},
 // }),
  ui.Label({
    value:'Select layers to display',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#A9A9A9'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(0,panel)
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//4.1) Create a new label for this series of checkboxes
//Canopy Cover map
var S2_Composite = ui.Label({value:'Cloud Free Composite',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px',color: '4A997E'}// color: '4A997E'
});
var LossGainLabel = ui.Label({value:'Loss and Gain (Servir-Mekong dataset)',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px',color: '4A997E'}// color: '4A997E'
});
//Canopy Cover map
var heightCan = ui.Label({value:'Canopy Cover (Servir-Mekong dataset) [%]',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px',color: '4A997E'}// color: '4A997E'
});
// Add checkboxes to our display
var CheckCommunes = ui.Checkbox('Cà Mau Communes').setValue(false);
var heightCheck1 = ui.Checkbox().setValue(false);
var heightCheck2 = ui.Checkbox().setValue(false);
var heightCheck3 = ui.Checkbox().setValue(false);
var separator =  ui.Label({
 value: '__________________________',
style: {fontWeight: 'bold',  color: 'black'},
});
//Simard map
var heightLab = ui.Label({value:'Mangrove Biomass (2000) (Simard et al. 2019) [ton/ha]',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px',color: '4A997E'}
});
// Add checkboxes to our display
var heightCheck = ui.Checkbox().setValue(false);
var heightCheck4 = ui.Checkbox('2020 (gain in white)').setValue(false);
// S2 Cloud free Composite
var LabelCompS2 = ui.Label({value:'Sentinel2 (10m)',style: {color: '#A9A9A9', fontSize: '10px'}});
var heightCheck5 = ui.Checkbox('2021').setValue(false);
var heightCheck6 = ui.Checkbox('2016').setValue(false);
  var panelS2 = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
panelS2.add(LabelCompS2).add(heightCheck6).add(heightCheck5)
// L5 Cloud free Composite
var LabelCompL5 = ui.Label({value:'Landsat5 (30m)',style: {color: '#A9A9A9', fontSize: '10px'}});
var heightCheck7 = ui.Checkbox('2000').setValue(false);
var heightCheck8 = ui.Checkbox('2010').setValue(false);
  var panelL5 = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
panelL5.add(LabelCompL5).add(heightCheck7).add(heightCheck8)
// Loss and gain
var heightCheck9 = ui.Checkbox('2000-2019 Loss and Gain').setValue(false);
var lon = ee.Image.pixelLonLat().select('longitude');
//var gradient = lon.multiply((palette1.max-palette1.min)/100.0).add(palette1.min);
var gradient = lon.multiply((palette4.max-palette4.min)/2).add(palette4.min);
var legendImageLG = gradient.visualize(palette4);
var panelLG = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
panelLG.add(heightCheck9)
//Mangrove extent map 
var extLabel = ui.Label({value:'Mangrove Extent',
style: {fontWeight: 'bold', fontSize: '14px', margin: '10px 5px'}
});
//4.2) Legend
// Canopy Cover 2000 
function makeLegend1 (palette1) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((palette1.max-palette1.min)/100.0).add(palette1.min);
  var legendImage = gradient.visualize(palette1);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel3 = ui.Panel({
    widgets: [
      ui.Label({value: '0', style:{color: '#A9A9A9', fontSize: '12px'}}), 
      ui.Label(''),ui.Label(''),
      heightCheck1,
      ui.Label({value:(year1)}),
      ui.Label({style: {stretch: 'horizontal'}}),
      ui.Label({value: '100', style:{color: '#A9A9A9', fontSize: '12px'}}),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel3).add(thumb);
} 
// Canopy Cover 2010 
function makeLegend2 (palette2) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((palette2.max-palette2.min)/100.0).add(palette2.min);
  var legendImage = gradient.visualize(palette2);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel3 = ui.Panel({
    widgets: [
      ui.Label({value: '0', style:{color: '#A9A9A9', fontSize: '12px'}}), 
      ui.Label(''),ui.Label(''),
      heightCheck2,
      ui.Label({value:(year2)}),
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label({value: '100', style:{color: '#A9A9A9', fontSize: '12px'}})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel3).add(thumb);
} 
// Canopy Cover 2019
function makeLegend3 (palette3) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((palette3.max-palette3.min)/100.0).add(palette3.min);
  var legendImage = gradient.visualize(palette3);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel3 = ui.Panel({
    widgets: [
      ui.Label({value: '0', style:{color: '#A9A9A9', fontSize: '12px'}}), 
      ui.Label(''),ui.Label(''),
      heightCheck3,
      ui.Label({value:(year3)}),
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label({value: '100', style:{color: '#A9A9A9', fontSize: '12px'}})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel3).add(thumb);
} 
// Mangroves AGB
function makeLegend4 (viridis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((viridis.max-viridis.min)/100.0).add(viridis.min);
  var legendImage = gradient.visualize(viridis);
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {position: 'bottom-center'}
  });
  var panel2 = ui.Panel({
    widgets: [
      ui.Label({value:'50', style:{color: '#A9A9A9', fontSize: '12px'}}), 
      ui.Label(''),ui.Label(''),
      heightCheck,
      ui.Label({value:(year1)}),
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label({value:'150', style:{color: '#A9A9A9', fontSize: '12px'}})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', maxWidth: '270px', padding: '0px 0px 0px 8px'}
  });
  return ui.Panel().add(panel2).add(thumb);
} 
//4.4) Add these new widgets to the panel in the order you want them to appear
panel
      .add(CheckCommunes)
      .add(S2_Composite)
      .add(panelL5)
      .add(panelS2)
      //.add(heightCheck6)
      //.add(heightCheck5)
      .add(heightCan)
      .add(makeLegend1(palette1))
 //     .add(heightCheck1)
      //.add(LossGainLabel)
      //.add(makeLegend2(palette2))
//      .add(heightCheck2)
        .add(makeLegend3(palette3))
        .add(panelLG)
//        .add(heightCheck30)
//      .add(separator)
      .add(heightLab)
      .add(makeLegend4(viridis))
//      .add(heightCheck)
      .add(heightCheck4);
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//heightCheck33 = //ui.Panel.widgets().get(Checkbox)
// Communes Borders
var doCheckboxCommunes = function() {
  CheckCommunes.onChange(function(checked){
  Communes.setShown(checked)
  })
}
doCheckboxCommunes();
// L5 Cloud Free Composite 2000
var doCheckbox0 = function() {
  heightCheck7.onChange(function(checked){
  L5_Comp1.setShown(checked)
  })
}
doCheckbox0();
// L5 Cloud Free Composite 2010
var doCheckbox1 = function() {
  heightCheck8.onChange(function(checked){
  L5_Comp2.setShown(checked)
  })
}
doCheckbox1();
// S2 Cloud Free Composite 2016
var doCheckbox2 = function() {
  heightCheck6.onChange(function(checked){
  S2_Comp2.setShown(checked)
  })
}
doCheckbox2();
// S2 Cloud Free Composite 2021
var doCheckbox3 = function() {
  heightCheck5.onChange(function(checked){
  S2_Comp3.setShown(checked)
  })
}
doCheckbox3();
//Canopy Cover
// ext2000
var doCheckbox5 = function() {
  heightCheck1.onChange(function(checked){
  ext2000.setShown(checked)
  })
}
doCheckbox5();
// ext2010
var doCheckbox6 = function() {
  heightCheck2.onChange(function(checked){
  ext2010.setShown(checked)
  })
}
doCheckbox6();
// ext2020
var doCheckbox7 = function() {
  heightCheck3.onChange(function(checked){
  ext2020.setShown(checked)
  })
}
doCheckbox7();
//Simard Biomass Data
// simHBA 2000
var doCheckbox4 = function() {
  heightCheck.onChange(function(checked){
  simHBA.setShown(checked)
  })
}
doCheckbox4();
// Mangr 2020
var doCheckbox9 = function() {
  heightCheck4.onChange(function(checked){
  Mangr2020.setShown(checked)
  simHBAMangr.setShown(checked)
  })
}
doCheckbox9();
// Loss and Gain
var doCheckbox10 = function() {
  heightCheck9.onChange(function(checked){
  LossGain.setShown(checked)
  })
}
doCheckbox10();
////////////////////////////////////////////////////////
//       6) Add a clicking feature to get inspector AGB 2000 //
////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Add a label to the panel.
inspector.add(ui.Label({
      value: 'Click to get Mangrove Biomass (MB)',
      style: {fontSize: '12px',stretch: 'vertical'}
    }));
// Add the panel to the default map.
Map.add(inspector);
//Create a function to be invoked when the map is clicked 2000
Map.onClick(function(coords){
// Clear the panel and show a loading message.
inspector.clear();
inspector.style().set('shown', true);
inspector.add(ui.Label('Loading...', {color: 'gray'}));
//Computer the Canopy Cover value 2020
var point = ee.Geometry.Point(coords.lon, coords.lat);
var reduce = hba.reduce(ee.Reducer.first());
var sampledPoint = reduce.reduceRegion(ee.Reducer.first(), point, 30);
var computedValue = sampledPoint.get('first');
// Request the value from the server and use the results in a function.
computedValue.evaluate(function(result) {
inspector.clear();
// Add a label with the results from the server.
inspector.add(ui.Label({
      value: 'Mangrove Biomass year '+(year1)+': ' + result.toFixed(0)+' ton/ha',
      style: {fontSize: '12px',stretch: 'vertical'}
    }));
// Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
////////////////////////////////////////////////////////
//  7) Constuct graphs to measure extent for each year //
////////////////////////////////////////////////////////
var zoom = 12; // define the zoom
var camau = ee.FeatureCollection("users/baldassarre/MangrGee/communes");
var Mang2000 = simard.gt(1) // I just want the extention not the AGB, I make every pixel ==1
var Mang2020 = MangExtentImg;
//var Mang2019 = ee.Image('users/baldassarre/MangrGee/CaMau2019');
//var Mang2018 = ee.Image('users/baldassarre/MangrGee/CaMau2018');
var Mang2012 = ee.Image('users/baldassarre/MangrGee/CaMau2012');
//var Mang2017 = ee.Image('users/baldassarre/MangrGee/CaMau2017');
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '250px',position:'middle-right'}
})
//Create key of items for dropdown
var roi1 = 'Tam Giang Dong';
var roi11 = 'Tam Giang Tay';
var roi12 = 'Tan An';
var roi2 = 'Dat Mui';
var roi21 = 'Vien An';
var roi22 = 'Lam Hai';
//Construct Dropdown
var graphSelect = ui.Select({
  items:[roi1,roi11,roi12,roi2,roi21,roi22],
  placeholder:'Choose commune',
  onChange: selectLayer,
  style: {position:'top-right'}
})
var constraints = []
//Write a function that runs on change of Dropdown
function selectLayer(){
var graph = graphSelect.getValue() // get value from dropdown selection
panelGraph.clear() //clear graph panel between selections so only one graph displays
//We use "if else" statements to write instructions for drawing graphs
if      (graph == roi1){
//Calculate area in Hectares 2000 and 2020
var area = camau.filter(ee.Filter.eq("VARNAME_3",roi1)).geometry();
Map.centerObject(area,zoom)
var get2000 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get2010 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get2020 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
//Get area for the region
var feature = ee.Feature(area)
var featureYear = feature.set('2000', ee.Number(get2000),'2010', ee.Number(get2010),'2020',ee.Number(get2020))
//Construct Bar Chart
var chartYear = ui.Chart.feature.byProperty(featureYear,['2000','2010','2020'], ['Total'])
                .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear.setOptions({
  title: roi1+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
    panelGraph.add(chartYear)
  }
else if (graph == roi11){
//Calculate area in Hectares 2000 and 2020
var area11 = camau.filter(ee.Filter.eq("VARNAME_3",roi11)).geometry();
Map.centerObject(area11,zoom)
var get2000_11 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area11,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get2010_11 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area11,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get2020_11 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area11,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
//Get area for the region
var feature11 = ee.Feature(area11)
var featureYear11 = feature11.set('2000', ee.Number(get2000_11),'2010', ee.Number(get2010_11),'2020',ee.Number(get2020_11))
//Construct Bar Chart
var chartYear11 = ui.Chart.feature.byProperty(featureYear11,['2000','2010','2020'], ['Total'])
                                  .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear11.setOptions({
  title: roi11+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
    panelGraph.add(chartYear11)
  }
else if (graph == roi12){
//Calculate area in Hectares 2000 and 2020
var area12 = camau.filter(ee.Filter.eq("VARNAME_3",roi12)).geometry();
Map.centerObject(area12,zoom)
var get2000_12 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area12,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get2010_12 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area12,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get2020_12 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area12,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
//Get area for the region
var feature12 = ee.Feature(area12)
var featureYear12 = feature12.set('2000', ee.Number(get2000_12),'2010', ee.Number(get2010_12),'2020',ee.Number(get2020_12))
//Construct Bar Chart
var chartYear12 = ui.Chart.feature.byProperty(featureYear12,['2000','2010','2020'], ['Total'])
                                  .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear12.setOptions({
  title: roi12+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
    panelGraph.add(chartYear12)
  }
else if (graph == roi2){
var area1 = camau.filter(ee.Filter.eq("VARNAME_3",roi2)).geometry();
Map.centerObject(area1,zoom)
var get20001 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area1,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get20101 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area1,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get20201 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area1,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature1 = ee.Feature(area1)
var featureYear1 = feature1.set('2000', ee.Number(get20001),'2010', ee.Number(get20101),'2020',ee.Number(get20201))
//Construct Bar Chart
var chartYear1 = ui.Chart.feature.byProperty(featureYear1,['2000','2010','2020'], ['Total'])
                                  .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear1.setOptions({
  title: roi2+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
  panelGraph.add(chartYear1)
}
else if (graph == roi21){
var area21 = camau.filter(ee.Filter.eq("VARNAME_3",roi21)).geometry();
Map.centerObject(area21,zoom)
var get2000_21 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area21,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get2010_21 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area21,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get2020_21 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area21,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature21 = ee.Feature(area21)
var featureYear21 = feature21.set('2000', ee.Number(get2000_21),'2010', ee.Number(get2010_21),'2020',ee.Number(get2020_21))
//Construct Bar Chart
var chartYear21 = ui.Chart.feature.byProperty(featureYear21,['2000','2010','2020'], ['Total'])
                                  .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear21.setOptions({
  title: roi21+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
  panelGraph.add(chartYear21)
}
else if (graph == roi22){
var area22 = camau.filter(ee.Filter.eq("VARNAME_3",roi22)).geometry();
Map.centerObject(area22,zoom)
var get2000_22 = Mang2000.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area22,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var get2010_22 = Mang2012.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area22,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var get2020_22 = Mang2020.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:area22,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
var feature22 = ee.Feature(area22)
var featureYear22 = feature22.set('2000', ee.Number(get2000_22),'2010', ee.Number(get2010_22),'2020',ee.Number(get2020_22))
//Construct Bar Chart
var chartYear22 = ui.Chart.feature.byProperty(featureYear22,['2000','2010','2020'], ['Total'])
                                  .setSeriesNames(['Extent']);
//Set up title and labels for chart
chartYear22.setOptions({
  title: roi22+': Mangrove extent',
  vAxis: {title: 'Area in Hectares'},
  legend: {position: 'none'},
  hAxis: {
    title: 'Year',
    logScale: false
  }
});
  panelGraph.add(chartYear22)
}
for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
var header3 = ui.Label('Select a Commune to display Mangrove extent and trend (2000-2020)', 
                        {fontSize: '14px', fontWeight: 'bold', color: '#A9A9A9'});
//3.2) Create a panel to hold text
var panel1 = ui.Panel({
  widgets:[header3],//Adds header and text
  style:{width: '250px',position:'middle-right'}});
//Add selecter and graph panel to main panel
  panel1 //.add(graphLabel0)
     // .add(graphLabel)
      .add(graphSelect)
      .add(panelGraph)
ui.root.insert(2,panel1)
////////////////////////////////////////////////////////
//       8) Add a clicking feature to get Canopy Cover time serie //
////////////////////////////////////////////////////////
// Create an intro panel with labels.
var intro = ui.Label({
    value: 'Click a point on the map to visualize the pixel(30m) Canopy Cover time serie',
    style: {fontSize: '14px', fontWeight: 'bold', color: '#A9A9A9'}
});
panel1.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'white'}); //#FF8C00
  Map.layers().set(10, dot);
  // Create an Canopy Cover chart.
  var CoverChart = ui.Chart.image.series(ccc, point, ee.Reducer.mean(), 500).setSeriesNames([(coords.lon.toFixed(3))+' - '+(coords.lat.toFixed(3))]);
  CoverChart.setOptions({
    title: 'Lon - Lat',
    vAxis: {title: 'Canopy Cover (%)'},
    hAxis: {title: 'Year', format: 'yy', gridlines: {count: 20}},
    colors: ['39a8a7']
  });
  panel1.widgets().set(4, CoverChart); // put 4 to have 3 graphs
});