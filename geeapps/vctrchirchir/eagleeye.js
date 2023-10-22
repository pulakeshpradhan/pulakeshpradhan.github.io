var sentinel = ui.import && ui.import("sentinel", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    Kiambu = ui.import && ui.import("Kiambu", "table", {
      "id": "users/vctrchirchir/Kiambu"
    }) || ee.FeatureCollection("users/vctrchirchir/Kiambu"),
    VisParam = ui.import && ui.import("VisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 538.82,
        "max": 3698.18,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":538.82,"max":3698.18,"gamma":1},
    NDVIparam = ui.import && ui.import("NDVIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8"
        ],
        "min": 0.031962413229048255,
        "max": 0.6560095382109284,
        "palette": [
          "ff4117",
          "ff8911",
          "f3ff23",
          "66ff25"
        ]
      }
    }) || {"opacity":1,"bands":["B8"],"min":0.031962413229048255,"max":0.6560095382109284,"palette":["ff4117","ff8911","f3ff23","66ff25"]},
    NDBIparam = ui.import && ui.import("NDBIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B11"
        ],
        "min": -0.18556225687265396,
        "max": 0.22221272081136703,
        "palette": [
          "39ff13",
          "fff721",
          "ff5321"
        ]
      }
    }) || {"opacity":1,"bands":["B11"],"min":-0.18556225687265396,"max":0.22221272081136703,"palette":["39ff13","fff721","ff5321"]},
    NDWIparam = ui.import && ui.import("NDWIparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8"
        ],
        "min": -0.1666096889972687,
        "max": 0.30476747393608095,
        "palette": [
          "ffc82f",
          "72ff37",
          "1d30ff"
        ]
      }
    }) || {"opacity":1,"bands":["B8"],"min":-0.1666096889972687,"max":0.30476747393608095,"palette":["ffc82f","72ff37","1d30ff"]},
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    L8RGB = ui.import && ui.import("L8RGB", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0.07682543829083442,
        "max": 0.21962867096066474,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":0.07682543829083442,"max":0.21962867096066474,"gamma":1},
    L8NDVI = ui.import && ui.import("L8NDVI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5"
        ],
        "min": 0.38219940721988677,
        "max": 0.6374527508020401,
        "palette": [
          "ff390e",
          "ff9a33",
          "fff60e",
          "7cff17"
        ]
      }
    }) || {"opacity":1,"bands":["B5"],"min":0.38219940721988677,"max":0.6374527508020401,"palette":["ff390e","ff9a33","fff60e","7cff17"]},
    L8NDBI = ui.import && ui.import("L8NDBI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B6"
        ],
        "min": -0.3743756645917892,
        "max": 0.16053151428699494,
        "palette": [
          "9eff1b",
          "ffed21",
          "ffb91f",
          "ff5c1f"
        ]
      }
    }) || {"opacity":1,"bands":["B6"],"min":-0.3743756645917892,"max":0.16053151428699494,"palette":["9eff1b","ffed21","ffb91f","ff5c1f"]},
    L8NDWI = ui.import && ui.import("L8NDWI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5"
        ],
        "min": -0.12005251824855805,
        "max": 0.33306762754917146,
        "palette": [
          "ff9f11",
          "ffed1d",
          "19ffb4",
          "190cff"
        ]
      }
    }) || {"opacity":1,"bands":["B5"],"min":-0.12005251824855805,"max":0.33306762754917146,"palette":["ff9f11","ffed1d","19ffb4","190cff"]},
    L8False = ui.import && ui.import("L8False", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0.03723498463630676,
        "max": 0.42199502110481263,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":0.03723498463630676,"max":0.42199502110481263,"gamma":1},
    Kajiado = ui.import && ui.import("Kajiado", "table", {
      "id": "users/vctrchirchir/KNwards"
    }) || ee.FeatureCollection("users/vctrchirchir/KNwards"),
    VIRParam = ui.import && ui.import("VIRParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3"
        ],
        "min": -0.22302397072315217,
        "max": 0.6463555592298508,
        "palette": [
          "ff2d0c",
          "ff853d",
          "d3ff4b",
          "10bc25"
        ]
      }
    }) || {"opacity":1,"bands":["B3"],"min":-0.22302397072315217,"max":0.6463555592298508,"palette":["ff2d0c","ff853d","d3ff4b","10bc25"]},
    NDWIPARAM2 = ui.import && ui.import("NDWIPARAM2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3"
        ],
        "min": -1,
        "palette": [
          "ff3919",
          "ffb681",
          "7ce1ff",
          "405ded"
        ]
      }
    }) || {"opacity":1,"bands":["B3"],"min":-1,"palette":["ff3919","ffb681","7ce1ff","405ded"]},
    L8NDVI2 = ui.import && ui.import("L8NDVI2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5"
        ],
        "min": 0.1,
        "max": 0.8,
        "palette": [
          "ff390e",
          "ff9a33",
          "fff60e",
          "7cff17"
        ]
      }
    }) || {"opacity":1,"bands":["B5"],"min":0.1,"max":0.8,"palette":["ff390e","ff9a33","fff60e","7cff17"]},
    L8NDBI2 = ui.import && ui.import("L8NDBI2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B6"
        ],
        "min": -0.49013379245996475,
        "max": 0.15336318343877792,
        "palette": [
          "9eff1b",
          "ffed21",
          "ffb91f",
          "ff5c1f"
        ]
      }
    }) || {"opacity":1,"bands":["B6"],"min":-0.49013379245996475,"max":0.15336318343877792,"palette":["9eff1b","ffed21","ffb91f","ff5c1f"]};
//define Styling of the web app
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var style_title = {
  fontWeight: 'bold',
  fontSize: '30px',
  padding: '11px',
  color: '#f6b319',
  backgroundColor: colors.transparent,
};
var style_description={
  fontSize:'16px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
};
var style_description3={
  fontSize:'14px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
};
 var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      height: '60%',
      width: '40%',
      backgroundColor: '#61122f',
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
 var name_description={
  fontSize:'7px',
  padding:'11px',
  color:'grey',
  backgroundColor:colors.transparent
}; 
  // Initialize the UI. 
//Clear the default UI since we're adding our own main and map panels.
ui.root.clear();
var mapPanel = ui.Map();
ui.root.widgets().reset([mapPanel]);
// Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
//define The wards
var locations= {
  Olkeri: Kajiado.filter(ee.Filter.inList('iebc_wards',['Olkeri'])),
  Ongata_Rongai: Kajiado.filter(ee.Filter.inList('iebc_wards',['Ongat Rongai'])),
  Nkaimurunya: Kajiado.filter(ee.Filter.inList('iebc_wards',['Nkaimurunya'])),
  Oloolua: Kajiado.filter(ee.Filter.inList('iebc_wards',['Oloolua'])),
  Ngong: Kajiado.filter(ee.Filter.inList('iebc_wards',['Ngong'])),
  Kajiado_North:Kajiado
};
//Define Indices Used
var indices={
  TrueColor:'True Color',
  FalseColor:'False Color',
  NDVI:'ndvi',
  NDBI:'ndbi',
  NDWI:'ndwi',
  VARI:'VARI',
  Unsupervised_Classification:'Unsupervised_Classification'
}
//Create the button for selecting counties
var selectLocation=ui.Select({
  placeholder:'Select A Region',
  items:Object.keys(locations),
  onChange:function(key){
    mapPanel.centerObject(locations[key],12)
    mapPanel.addLayer(locations[key])
  }
})
//create the button for selecting Indices
var selectIndices=ui.Select({
  placeholder:'Select An Index or True Colur',
  items:Object.keys(indices)
})
//function for calculating indices_
function calcIndex(a,b){
  return (a.subtract(b).divide)(a.add(b));
}
//Function for calculating VIR
var VIRfunc=function(image){
var VIR=(image.select('B3').subtract(image.select('B4')))
.divide(image.select('B3').add(image.select('B4')).subtract(image.select('B2')))
return VIR
}
//create the date slider
var start=ee.Image(L8.first()).date().get('year').format();
var now=Date.now();
var end=ee.Date(now).format()
// var dateRange=ee.DateRange(start,end).evaluate(function(range){
//   var dateSlider=ui.DateSlider({
//     start:range['dates'][0],
//     end:range['dates'][1],
//     value:range['dates'][1],
//     period:180,
//     onChange:task
//   });
//   mainPanel.add(dateSlider.setValue(now));
//   var Period=dateSlider.getStart();
//   print(Period);
// });
  // Add the app title to the side panel
  var titleLabel = ui.Label('REMOTE SENSING DATA VISUALIZER IN KAJIADO-NORTH SUB-COUNTY', style_title);
  var description= ui.Label('This web app will display remote sensing data for wards in Kajiado North Sub-county Kenya '+'The app will obtain the least cloudy image within a period of six months as specified and visualize it according to the index selected',style_description)
  var description2= ui.Label('The satellite Images can be visualized in five ways: True Color, False Color Composite, Normalized difference vegetation index(NDVI), Normalized Difference Built-up Index (NDBI), Normalized difference water index (NDWI)',style_description)
  var description3=ui.Label('Use the date slider to specify period ',style_description3)
  // DEFINE WEB LINK FOR Land cover Maps
var link = ui.Label('View Land Cover Maps',style_description3);
  mainPanel.add(titleLabel);
  mainPanel.add(description)
  mainPanel.add(description2)
  mainPanel.add(description3)
  mainPanel.add(link)
  mainPanel.add(selectLocation);
  mainPanel.add(selectIndices);
  // Use a SplitPanel so it's possible to resize the two panels.
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
//construct a legend
//function for making a legend
var legend=ui.Panel({
  style:{
    position:'bottom-right',
    padding:'5px'
  }
});
var list_legend=function(color,description){
  var c=ui.Label({
    style:{
      backgroundColor:color,
      padding:'10px',
      margin:'4px'
    }
  });
  var lc=ui.Label({
    value:description,
    style:{
      padding:'10px',
      margin:'4px'
    }
  });
  return ui.Panel({
    widgets:[c,lc],
    layout:ui.Panel.Layout.Flow('horizontal')
  });
};
//add a title
var title=ui.Label({
  value:'LEGEND',
  style:{
    fontSize:'10px',
    fontWeight:'bold',
    margin:'0px',
    position:'top-left'
  }
});
//add title to panel
var legend2=legend.add(title);
//create a function for supervised classification
var unsupervised=function(a,b){
var training=a.sample({
  region:b,
  scale:30,
  numPixels:5000
})
var clusterer=ee.Clusterer.wekaKMeans(6).train(training);
var unsupervisedImage=a.cluster(clusterer);
 return unsupervisedImage
}
//create a function to carry out the tasks
var task=function(range){
  var roi=locations[selectLocation.getValue()]
  var data=L8.filterDate(range.start(),range.end()).filterBounds(roi).sort('CLOUD_COVER').first();
  print(data)
  var Date1=ee.Date(range.start())
  var dateS=data.date().format('yyyy-MM-dd').getInfo();
  print(dateS)
  var clip=data.clip(roi);
  switch(selectIndices.getValue()){
    case 'TrueColor':
      mapPanel.addLayer(clip,L8RGB,'True Color For '+selectLocation.getValue()+' In '+dateS);
      break;
    case 'FalseColor':
      mapPanel.addLayer(clip,L8False,'False Color For '+selectLocation.getValue()+' In '+dateS)
      break;
    case 'NDVI':
      legend.clear();
      mapPanel.addLayer(calcIndex(clip.select('B5'),clip.select('B4')),L8NDVI2,'NDVI For '+selectLocation.getValue()+' In '+dateS)
      var coloursNDVI=['#ff390e','#ff9a33','#fff60e','#7cff17'];
      var NDVI_classes=['Very Low Amount of Vegetation','Low Amount of Vegetation','Medium Amount of Vegetation','High Amount Of Vegetation'];
      for (var a=0;a<4;a++){
        legend.add(list_legend(coloursNDVI[a],NDVI_classes[a]));
      }
      mapPanel.remove(legend);
      mapPanel.add(legend);
     break;
    case 'NDBI':
      legend.clear();
      mapPanel.addLayer(calcIndex(clip.select('B6'),clip.select('B5')),L8NDBI2,'NDBI For '+selectLocation.getValue()+' In '+dateS)
      var coloursNDBI=['#9eff1b','#ffed21','#ffb91f','#ff5c1f'];
      var NDBI_classes=['Very Low Built Up Area','Low Built Up Area','Medium Built Up Area','Highly Built Up Area'];
      for (var b=0;b<4;b++){
        legend.add(list_legend(coloursNDBI[b],NDBI_classes[b]));
      }
      mapPanel.remove(legend);
      mapPanel.add(legend);
      break;
    case 'NDWI':
      legend.clear();
      mapPanel.addLayer(calcIndex(clip.select('B3'),clip.select('B5')),NDWIPARAM2,'NDWI For '+selectLocation.getValue()+' In '+dateS)
      var coloursNDWI=['#ff3919','#ffb681','#7ce1ff','#405ded'];
      var NDWI_classes=['Very Low Amount Of Water','Low Amount of Water','Medium Amount of Water','High Amount of Water'];
      for (var d=0;d<4;d++){
        legend.add(list_legend(coloursNDWI[d],NDWI_classes[d]));
      }
      mapPanel.remove(legend);
      mapPanel.add(legend);
      break;
     case 'VARI':
      legend.clear();
      mapPanel.addLayer(VIRfunc(clip),VIRParam,'VIR For '+selectLocation.getValue()+' In '+dateS)
      var coloursVIR=['#ff2d0c','#ff853d','#d3ff4b','#10bc25'];
      var VIR_classes=['Very Low Amount of Vegetation','Low Amount of Vegetation','Medium Amount of Vegetation','High Amount Of Vegetation'];
      for (var e=0;e<4;e++){
        legend.add(list_legend(coloursVIR[e],VIR_classes[e]));
      }
      mapPanel.remove(legend);
      mapPanel.add(legend);
      break;
      case 'Unsupervised_Classification':
      var VIZPARAM = {"opacity":1,"bands":["viz-red"],"palette":["fff14e","2d7a1a","76d61e","ff2d0c"]};
      unsupervised(clip,roi)
      mapPanel.addLayer(unsupervised(clip,roi).randomVisualizer(),{},'Unsupervised for '+selectLocation.getValue()+' in '+dateS)
}
};
var dateRange=ee.DateRange(start,end).evaluate(function(range){
  var dateSlider=ui.DateSlider({
    start:range['dates'][0],
    end:range['dates'][1],
    value:range['dates'][1],
    period:180,
    onChange:task
  });
  mainPanel.add(dateSlider.setValue(now));
   var Period=dateSlider.getStart();
  print(Period);
//   //create a add button and add it to the Main Panel
// var AddButton = ui.Button({
//   label: 'Add to Map',
//   onClick: task
// });
// mainPanel.add(AddButton); 
});
//create a clear button and add it to the Main Panel
var Clearbutton = ui.Button({
  label: 'Clear Map',
  onClick: function() {
    mapPanel.clear();
    legend.clear()
  }
});
var ButtonC=ui.Panel({
  style:{
    position:'bottom-left',
    padding:'5px',
    backgroundColor: colors.transparent
  }
});
ButtonC.add(Clearbutton);
mainPanel.add(ButtonC);