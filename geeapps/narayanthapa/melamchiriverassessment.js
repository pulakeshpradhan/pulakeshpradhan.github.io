var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    ndviViz = ui.import && ui.import("ndviViz", "imageVisParam", {
      "params": {
        "max": 1,
        "min": -1,
        "palette": [
          "#d2222d",
          "#ffbf00",
          "#238823",
          "#007000"
        ]
      }
    }) || {"max":1,"min":-1,"palette":["#d2222d","#ffbf00","#238823","#007000"]},
    ndwiViz = ui.import && ui.import("ndwiViz", "imageVisParam", {
      "params": {
        "max": 1,
        "min": -1,
        "palette": [
          "#d2222d",
          "#ffbf00",
          "#238823",
          "#007000"
        ]
      }
    }) || {"max":1,"min":-1,"palette":["#d2222d","#ffbf00","#238823","#007000"]},
    mndwiViz = ui.import && ui.import("mndwiViz", "imageVisParam", {
      "params": {
        "max": 1,
        "min": -1,
        "palette": [
          "#d2222d",
          "#ffbf00",
          "#238823",
          "#007000"
        ]
      }
    }) || {"max":1,"min":-1,"palette":["#d2222d","#ffbf00","#238823","#007000"]},
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/narayanthapa/Studyarea"
    }) || ee.FeatureCollection("users/narayanthapa/Studyarea"),
    runoffs = ui.import && ui.import("runoffs", "image", {
      "id": "users/narayanthapa/runoffs"
    }) || ee.Image("users/narayanthapa/runoffs"),
    wriViz = ui.import && ui.import("wriViz", "imageVisParam", {
      "params": {
        "min": -3,
        "max": 3,
        "palette": [
          "#d2222d",
          "#ffbf00",
          "#238823",
          "#007000"
        ]
      }
    }) || {"min":-3,"max":3,"palette":["#d2222d","#ffbf00","#238823","#007000"]},
    riverzone = ui.import && ui.import("riverzone", "table", {
      "id": "users/narayanthapa/Buf_Melamchi"
    }) || ee.FeatureCollection("users/narayanthapa/Buf_Melamchi"),
    landcover2021 = ui.import && ui.import("landcover2021", "image", {
      "id": "users/narayanthapa/landcover2021"
    }) || ee.Image("users/narayanthapa/landcover2021"),
    precipitation = ui.import && ui.import("precipitation", "imageCollection", {
      "id": "JAXA/GPM_L3/GSMaP/v6/operational"
    }) || ee.ImageCollection("JAXA/GPM_L3/GSMaP/v6/operational"),
    landcover2022 = ui.import && ui.import("landcover2022", "image", {
      "id": "users/narayanthapa/landcover2022"
    }) || ee.Image("users/narayanthapa/landcover2022"),
    ndvi_plattee = ui.import && ui.import("ndvi_plattee", "imageVisParam", {
      "params": {
        "palette": "black"
      }
    }) || {"palette":"black"};
//var landcover2022=landcover22.select('b1').clip(riverzone)
//var landcover2021=datasets.select('b1').clip(riverzone)
//print(datasets)
//var landcover = landcover2021.select('b1').clip(riverzone);
var run=runoffs.gte(2).updateMask(runoffs)
var rainfall=precipitation.select('hourlyPrecipRate').filterBounds(run.geometry());
//print(rainfall)
//cloudmask
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Define the chart and print it to the console.
/* Model****************************************/
/* Model****************************************/
/************************* Component************/
/*components*****************************/
var c={};
//empty panel
c.controlPanel=ui.Panel();
// split panel
// information
c.info={};
c.info.titleLabel=ui.Label("Web Map Application For Preliminary Flood Damage Assessment Using Google Earth Engine- A Case Study Of Melamchi River");
// Year from user
c.inputYear={}
c.inputYear.label1=ui.Label("Enter the date")
c.inputYear.predate=ui.Textbox('yyyy-mm-dd','2016-06-23');
c.inputYear.label2=ui.Label("Enter the date")
c.inputYear.postdate=ui.Textbox('yyyy-mm-dd','2016-06-23');
//Band selector
c.selectBand={}
c.selectBand.leftlabel=ui.Label('Select Band ratio');
c.selectBand.leftselector=ui.Select(['NDVI','NDWI','MNDWI','WRI']);
c.selectBand.rightlabel=ui.Label('Select Band ratio');
c.selectBand.rightselector=ui.Select(['NDVI','NDWI','MNDWI','WRI']);// from imagendviViz,ndwiViz,mndwiViz,wriViz
c.selectBand.panel=ui.Panel([c.inputYear.label1,c.inputYear.predate,c.selectBand.leftlabel,c.selectBand.leftselector]);
c.selectBand.panel1=ui.Panel([c.inputYear.label2,c.inputYear.postdate,c.selectBand.rightlabel,c.selectBand.rightselector]);
// defining legend widiget
// Define a legend widget group.
c.legendleft={}
c.legendleft.title=ui.Label();
c.legendleft.colorbar=ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legendleft.leftlabel=ui.Label('[min]');
c.legendleft.leftcenterlabel=ui.Label();
c.legendleft.rightcenterlabel=ui.Label();
c.legendleft.rightlabel=ui.Label('[max]');
c.legendleft.labelPanel = ui.Panel({
  widgets: [
    c.legendleft.leftlabel,
    c.legendleft.leftcenterlabel,
    c.legendleft.rightcenterlabel,
    c.legendleft.rightlabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
})
c.legendleft.panel=ui.Panel([
  c.legendleft.title,
  c.legendleft.colorbar,
  c.legendleft.labelPanel]);
// right label
c.legendright={}
c.legendright.title=ui.Label();
c.legendright.colorbar=ui.Thumbnail(ee.Image.pixelLonLat().select(0));
c.legendright.leftlabel=ui.Label('[min]');
c.legendright.leftcenterlabel=ui.Label();
c.legendright.rightcenterlabel=ui.Label();
c.legendright.rightlabel=ui.Label('[max]');
c.legendright.labelPanel = ui.Panel({
  widgets: [
    c.legendright.leftlabel,
    c.legendright.leftcenterlabel,
    c.legendright.rightcenterlabel,
    c.legendright.rightlabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
})
c.legendright.panel=ui.Panel([
  c.legendright.title,
  c.legendright.colorbar,
  c.legendright.labelPanel]);
/*composition***************************/
//default map
// dividing map into two component
c.leftmap=ui.Map()
c.leftmap.setControlVisibility(false)
c.leftmap.setCenter(85.55,27.84,14);
c.leftmap.setOptions('SATELLITE')
c.rightmap=ui.Map()
c.rightmap.setControlVisibility(false);
c.rightmap.setCenter(85.55,27.84,14);
c.rightmap.setOptions('SATELLITE');
// Map for chart pannel
// Adding image to map:
var leftimage=ui.Map.Layer()
var rightimage=ui.Map.Layer()
c.splitPanel=ui.SplitPanel({
  firstPanel:c.leftmap,
  secondPanel:c.rightmap,
  orientation:'horizontal',
  wipe:true
})
ui.root.clear()
//adding to root
ui.root.add(c.controlPanel);
ui.root.add(c.splitPanel);
var linkPanel=ui.Map.Linker([c.leftmap,c.rightmap]);
c.leftmap.add(c.selectBand.panel);
c.rightmap.add(c.selectBand.panel1);
c.leftmap.add(c.legendleft.panel);
c.rightmap.add(c.legendright.panel)
/***************************Style*****************/
var s={}
//styling control panel
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
c.controlPanel.style().set({
  width: '400px',
  padding: '0px',
});
c.info.titleLabel.style().set(
  {
    fontSize:'20px',
    fontWeight:'bold'
  });
c.selectBand.panel.style().set(
  {
    position:'top-left'
  });
c.selectBand.panel1.style().set({
  position:'top-right'
})
// styling the flood assessment
// styling the legend title
c.legendleft.title.style().set(
  {
    fontWeight:'bold',
    fontSize:'12px',
    color:'383838'
  });
c.legendright.title.style().set(
  {
    fontWeight:'bold',
    fontSize:'12px',
    color:'383838'
  });
s.opacityredMed={
  backgroundColor: 'rgba(135, 206, 235, 0.8)'
}
c.legendleft.title.style().set(s.opacityWhiteNone);
c.legendright.title.style().set(s.opacityWhiteNone);
c.selectBand.panel.style().set(s.opacityredMed);
c.selectBand.panel1.style().set(s.opacityredMed);
// styling  colorbar
c.legendleft.colorbar.style().set(
  {
    stretch:'horizontal',
    margin:'0px 8px',
    maxHeight:'20px'
  })
c.legendright.colorbar.style().set(
  {
    stretch:'horizontal',
    margin:'0px 8px',
    maxHeight:'20px'
  })
// styling label
c.legendleft.leftlabel.style().set({
  margin:'4px 8px',
  fontSize:'12px'
});
c.legendright.leftlabel.style().set(
  {
    margin:'4px 8px',
    fontSize:'12px'
  })
c.legendleft.leftlabel.style().set(s.opacityWhiteNone);
c.legendright.leftlabel.style().set(s.opacityWhiteNone);
c.legendleft.leftcenterlabel.style().set({
  margin:'4px 8px',
  fontSize:'12px',
  textAlign:'center',
  stretch:'horizontal'
});
c.legendright.leftcenterlabel.style().set(
  {
    margin:'4px 8px',
    fontSize:'12px',
    textAlign:'center',
    stretch:'horizontal'
  })
c.legendleft.leftcenterlabel.style().set(s.opacityWhiteNone);
c.legendright.leftcenterlabel.style().set(s.opacityWhiteNone);
c.legendleft.rightcenterlabel.style().set({
  margin:'4px 8px',
  fontSize:'12px',
  textAlign:'center',
  stretch:'horizontal'
});
c.legendright.rightcenterlabel.style().set(
  {
    margin:'4px 8px',
    fontSize:'12px',
    textAlign:'center',
    stretch:'horizontal'
  })
c.legendleft.rightcenterlabel.style().set(s.opacityWhiteNone);
c.legendright.rightcenterlabel.style().set(s.opacityWhiteNone);
c.legendleft.rightlabel.style().set({
  margin:'4px 8px',
  fontSize:'12px',
});
c.legendright.rightlabel.style().set(
  {
    margin:'4px 8px',
    fontSize:'12px',
  })
c.legendleft.rightlabel.style().set(s.opacityWhiteNone);
c.legendright.rightlabel.style().set(s.opacityWhiteNone);
c.legendleft.panel.style().set({
  position:'bottom-left',
  width:'200px',
  padding:'0px'
})
c.legendright.panel.style().set({
  position:'bottom-right',
  width:'200px',
  padding:'0px'
})
c.legendleft.panel.style().set(s.opacityWhiteMed);
c.legendleft.labelPanel.style().set(s.opacityWhiteNone);
c.legendright.panel.style().set(s.opacityWhiteMed);
c.legendright.labelPanel.style().set(s.opacityWhiteNone);
/**************************Behaviour*************/
var addBandratio=function(image){
   var ndvi= image.normalizedDifference(['B8','B4']).rename("NDVI")
   var ndwi= image.normalizedDifference(['B3','B8']).rename("NDWI");
   var mndwi=image.normalizedDifference(['B3','B11']).rename('MNDWI');
   var wri=image.expression("(b3+b4)/(b8+b11)",{
     b3:image.select('B3'),
     b4:image.select('B4'),
     b8:image.select('B8'),
     b11:image.select('B11')
   }).rename('WRI')
   return image.addBands([ndvi,ndwi,mndwi,wri])
}
var viz={
  NDVI:ndviViz,
  NDWI:ndwiViz,
  MNDWI:mndwiViz,
  WRI:wriViz
}
var visualleft
var visualright
function updateMap(){
  //user input date
  var leftdate=c.inputYear.predate.getValue();
  leftdate=ee.Date(leftdate)
  var leftdate_end=leftdate.advance(9,'day')
  var rightdate=c.inputYear.postdate.getValue();
  rightdate=ee.Date(rightdate)
  var rightdate_end=rightdate.advance(9,'day')
  //user input band name
  var  bandnameleft=ee.Algorithms.String(c.selectBand.leftselector.getValue());
  var bandnameright=ee.Algorithms.String(c.selectBand.rightselector.getValue());
  // user filtering by date and filterBounds
  var predataset=imageCollection.filterDate(leftdate,leftdate_end).filterBounds(riverzone);
  var postdataset=imageCollection.filterBounds(riverzone).filterDate(rightdate,rightdate_end);
   //finding band ratio of that image
   var preimage=predataset.map(addBandratio);
   var postimage=postdataset.map(addBandratio);
   // adding visualization to band
//Dictionary for visualizaion:
var preimage_mean=preimage.select(bandnameleft).mean().clip(riverzone);
var postimage_mean=postimage.select(bandnameright).mean().clip(riverzone);
var prendvi=preimage_mean.visualize(ndviViz);
var postndvi=postimage_mean.visualize(ndviViz);
var prendwi=preimage_mean.visualize(ndwiViz);
var postndwi=postimage_mean.visualize(ndwiViz);
var premndwi=preimage_mean.visualize(mndwiViz);
var postmndwi=postimage_mean.visualize(mndwiViz);
var prewri=preimage_mean.visualize(wriViz);
var postwri=postimage_mean.visualize(wriViz);
// creating dictionary
var preImage={
      NDVI:prendvi,
      NDWI:prendwi,
      MNDWI:premndwi,
      WRI:prewri
}
var postImage={
      NDVI:postndvi,
      NDWI:postndwi,
      MNDWI:postmndwi,
      WRI:postwri
}
//var previz= preVisualize(preimage_mean,val_left);
//var postviz=postVisualize(postimage_mean,val_right);
// Adding image to map:
/*
var leftimageNDVI=ui.Map.Layer(preimage_mean,ndviViz);
var rightimageNDVI=ui.Map.Layer(postimage_mean,ndviViz);
var leftimageNDWI=ui.Map.Layer(preimage_mean,ndwiViz);
var rightimageNDWI=ui.Map.Layer(postimage_mean,ndwiViz);
var leftimageMNDWI=ui.Map.Layer(preimage_mean,mndwiViz);
var rightimageMNDWI=ui.Map.Layer(postimage_mean,mndwiViz);
var leftimageWRI=ui.Map.Layer(preimage_mean,wriViz);
var rightimageWRI=ui.Map.Layer(postimage_mean,wriViz);
 var leftimage={
      NDVI:leftimageNDVI,
      NDWI:leftimageNDWI,
      MNDWI:leftimageMNDWI,
      WRI:leftimageWRI
}
var rightimage={
      NDVI:rightimageNDVI,
      NDWI:rightimageMNDWI,
      MNDWI:rightimageMNDWI,
      WRI:rightimageWRI
}
*/
  // creating layers
//var leftlayers=c.leftmap.layers()
//var rightlayers=c.rightmap.layers()
// adding image to layers.....
var leftband=c.selectBand.leftselector.getValue()
var rightband=c.selectBand.rightselector.getValue()
 visualleft=viz[leftband]
 visualright=viz[rightband]
//leftlayers.add(leftimage[leftband]);
//rightlayers.add(rightimage[rightband]);
 var layerleft=ui.Map.Layer(preImage[leftband]);
  c.leftmap.layers().set(0, layerleft);
var layerright=ui.Map.Layer(postImage[rightband]);
  c.rightmap.layers().set(0, layerright);
}
 function updateLegendleft() {
  c.legendleft.title.setValue(c.selectBand.leftselector.getValue());
  c.legendleft.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: visualleft['palette']
  });
  c.legendleft.leftlabel.setValue(
    visualleft.min);
  c.legendleft.leftcenterlabel.setValue((
   visualleft.max+visualleft.min)/2);
  c.legendleft.rightcenterlabel.setValue(
    visualleft.max/2)
  c.legendleft.rightlabel.setValue(
    visualleft.max);
}
function updateLegendright(){
  // right legend
   c.legendright.title.setValue(c.selectBand.rightselector.getValue());
  c.legendright.colorbar.setParams({
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: visualright['palette']
  });
  c.legendright.leftlabel.setValue(
    visualright.min);
  c.legendright.leftcenterlabel.setValue((
   visualright.max+visualright.min)/2);
  c.legendright.rightcenterlabel.setValue(
    visualright.max/2)
  c.legendright.rightlabel.setValue(
    visualright.max);
}
/*************************Initialization********/
c.inputYear.predate.onChange(updateMap);
c.inputYear.postdate.onChange(updateMap);
c.selectBand.leftselector.onChange(updateMap);
c.selectBand.leftselector.onChange(updateLegendleft);
c.selectBand.rightselector.onChange(updateMap);
c.selectBand.rightselector.onChange(updateLegendright);
// Assesssment section
c.assessment={}
c.assessment.label=ui.Label('Enter the date for assessment');
c.assessment.year=ui.Textbox('yyyy-mm-dd','2021-06-16');
c.assessment.button=ui.Button('Flood assessment');
// assessment chart
c.titlechart=ui.Label();
c.title_sub=ui.Label();
c.chartPanel=ui.Panel()
c.assessment.chart=ui.Panel();
c.floodtext=ui.Label();
c.floodsubtext=ui.Label();
c.number2=ui.Label()
c.populationtext = ui.Label();
c.populationsubtext = ui.Label();
c.number = ui.Label();
c.chartLabel=ui.Panel([c.titlechart,c.title_sub])
c.populationPanel=ui.Panel([c.populationtext,c.populationsubtext,c.number]);
c.floodPanel=ui.Panel([c.floodtext,c.floodsubtext,c.number2])
  c.map=ui.Map()// defualt map
  c.map.setCenter(85.58,27.81,11);
c.legendPanel=ui.Panel();
c.assessment.container=ui.Panel();
c.info.panel=ui.Panel([c.info.titleLabel,c.assessment.label,c.assessment.year,c.assessment.button]);
c.controlPanel.add(c.info.panel);
// composition
// style
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px',
  'color':'bf0f19',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px',
  'font-weight':'',
  'color': '3333ff'
  };
c.titlechart.style().set(textVis)
c.title_sub.style().set(subTextVis)
c.populationtext.style().set(textVis)
c.populationsubtext.style().set(subTextVis)
c.number.style().set(numberVIS)
c.floodtext.style().set(textVis)
c.floodsubtext.style().set(subTextVis)
c.number2.style().set(numberVIS)
c.chartlabel=ui.Panel([c.titlechart, c.title_sub]);
c.controlPanel.add(c.floodPanel);
c.controlPanel.add(c.chartlabel);
c.controlPanel.add(c.chartPanel);
c.controlPanel.add(c.populationPanel);
// Define a panel for displaying a map of assessemt.
c.mapa = {};
c.mapa.shownButton = ui.Button('Show Assessment Map');
c.mapa.container = ui.Panel();  // will hold the dynamically generated  map.
c.mapa.mapPanel = ui.Panel([c.mapa.shownButton, c.mapa.container]);
c.leftmap.add(c.mapa.mapPanel);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
c.mapa.mapPanel.style().set({
  position: 'bottom-left',
  stretch:'both',
  shown:true
});
c.mapa.mapPanel.style().set(s.opacityWhiteNone);
function updateAssessment(){
  // user input
var post_start=c.assessment.year.getValue();
post_start=ee.Date(post_start);
var year=post_start.get('year');
var number=ee.Algorithms.If(year.lte(2021),2021,2022)
var landviz={bands: ["b1"],
max: 5,
min: 1,
palette: ["006400","f096ff","fa0000","b4b4b4","0064c8"]}
var landcover21=landcover2021
var landcover22=landcover2022
var landcover=ee.Dictionary({
  2021:landcover21,
  2022:landcover22
})
var landcover=ee.Image(landcover.get(number))
//var landcover=ee.Algorithms.If(year.lte(2021), landcover2021, landcover2022)
var post_end=post_start.advance(9,'day')
var postimage= imageCollection.filterDate(post_start,post_end).filterBounds(riverzone).map(maskS2clouds);
var pre_rain=ee.Date(post_start);
var post_rain=pre_rain.advance(3,'day');
var rain=rainfall.filterDate(pre_rain,post_rain);
rain=rain.sum();
var meanDictionary = rain.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: geometry,
  scale: 11132 ,
  maxPixels: 1e9
});
var maxrainfall= meanDictionary.getNumber('hourlyPrecipRate');
// IF CONDITION ..... remaining......
//print(maxrainfall)
var postndvi= postimage.map(function(image){
   var ndvi= image.normalizedDifference(['B8','B4']).rename("postndvi");
   var ndwi= image.normalizedDifference(['B3','B8']).rename("postndwi");
   var mndwi=image.normalizedDifference(['B3','B11']).rename('postmndwi');
   var wri=image.expression("(b3+b4)/(b8+b12)",{
     b3:image.select('B3'),
     b4:image.select('B4'),
     b8:image.select('B8'),
     b12:image.select('B11')
   }).rename('postwri')
   return image.addBands([ndvi,ndwi,mndwi,wri]);
});
var post_ndvi=postndvi.select('postndvi').min();
var post_wri=postndvi.select('postwri').max();
var post_ndwi=postndvi.select('postndwi').min();
var post_mndwi=postndvi.select('postmndwi').min();
var ndviflood=post_ndvi.lt(0.06).clip(riverzone);
ndviflood=ndviflood.updateMask(ndviflood);
var mndwiflood=post_mndwi.gt(-0.05).clip(riverzone);
mndwiflood.updateMask(mndwiflood)
//Area of flood
var stats = ndviflood.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: riverzone,
  scale: 10,
  maxPixels: 1e10,
  tileScale: 16
})
var flood_area_ha =ee.Number(stats.get('postndvi')).divide(10000).round();
// converting to number
// Convert the flood extent to hectares (area calculations are originally given in meters)
var ndviwater=post_ndvi.lt(0).clip(riverzone);
ndviwater=ndviwater.updateMask(ndviwater);
// Damage assessment:
var crops=landcover.eq(3).selfMask().clip(riverzone);
var bareland=landcover.eq(2).selfMask().clip(riverzone);
var tree=landcover.eq(4).selfMask().clip(riverzone);
var urban= landcover.eq(1).selfMask().clip(riverzone);
var water= landcover.eq(5).selfMask().clip(riverzone);
// Bare land//
var floodedbareland=bareland.mask(ndviflood).updateMask(bareland);
var barestats=floodedbareland.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:riverzone,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var barestat=ee.Number(barestats.get('b1')).divide(10000).round();
// forest
var floodedtree=tree.mask(ndviflood).updateMask(tree);
var treestats=floodedtree.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:riverzone,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var treestat=ee.Number(treestats.get('b1')).divide(10000).round();
//crops
var floodedcrops=crops.mask(ndviflood).updateMask(crops);
var cropstats = floodedcrops.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: riverzone,
  scale: 10,
  maxPixels: 1e10,
  tileScale: 16
})
var cropstat =ee.Number(cropstats.get('b1')).divide(10000).round();
// Urbans
var floodedurban=urban.mask(ndviflood).updateMask(urban);
var urbanstats=floodedurban.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:riverzone,
  scale:10,
  maxPixels:1e10,
  tileScale:16
})
var urbanstat=ee.Number(urbanstats.get('b1')).divide(10000).round();
var population_count = ee.ImageCollection("WorldPop/GP/100m/pop_age_sex_cons_unadj").select('population').mean().clip(riverzone);
var population_exposed = population_count
  .mask(ndviflood)
  .updateMask(population_count);
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  scale:92,
  maxPixels:1e9
});
// Get number of exposed people as integer
var number_pop_exposed = stats.getNumber('population').round();
var assessment=ee.Dictionary({
   Urban:urbanstat,
   BareLand:barestat,
   Forest:treestat,
   Crop:cropstat
})
var nonassess=ee.Dictionary({
   Urban:0,
   BareLand:0,
   Forest:0,
   Crop:0
})
var landcover_text=ee.Algorithms.If(year.lte(2021),'Esri landcover Sentinel 10m 2020-01-01-2021-01-01 ','Sentinel 10m 2022-02-01-2022-03-01')
var assess=ee.Algorithms.If(maxrainfall.gt(1),assessment,nonassess)
var asment=ee.Dictionary(assess);
var pop= ee.Algorithms.If(maxrainfall.gt(1),number_pop_exposed,0);
var flood_area= ee.Algorithms.If(maxrainfall.gt(1),flood_area_ha,0);
c.titlechart.setValue('Flood assessment using Land cover unit in hectares');
landcover_text.evaluate(function(val){c.title_sub.setValue(val)}),numberVIS;
var chart=ui.Chart.array.values({
  array: asment.values(),
  axis: 0,
  xLabels:asment.keys()
}).setChartType('PieChart')
.setOptions({
  colors:['#b4b4b4', '#f096ff', '#006400','#FA0000']
});
// estimated flood
c.floodtext.setValue('Estimated flood extent:');
c.floodsubtext.setValue('based on Senintel2 imagery & NDVI Band ratio ');
c.number2.setValue('Please wait...',numberVIS);
flood_area.evaluate(function(val){c.number2.setValue(val+' hectares')}),numberVIS;
// estimated population
c.populationtext.setValue('Estimated number of exposed people: ');
c.populationsubtext.setValue('based on WorldPop 2020-01-01-2021-01-01');
c.number.setValue('Please wait...');
pop.evaluate(function(val){c.number.setValue(val)});
c.assessment.chart.style().set({
  fontSize:'14px',
  margin: '0px 0px',
});
c.chartPanel.widgets().reset([chart]);
}
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
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
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
//  Palette with the colors
var color=['000000','006400','f096ff','fa0000','b4b4b4','0064c8'];
// name of the legend
var title=['Flood','Forest','Cropland','Built-up','Barrenland','Water'];
// Add color and and names
for(var i=0; i<6; i++){
  legend.add(makeRow(color[i], title[i]));
}
function assmap(){
var post_start=c.assessment.year.getValue();
post_start=ee.Date(post_start);
var year=post_start.get('year');
var number=ee.Algorithms.If(year.lte(2021),2021,2022)
var landviz={bands: ["b1"],
min: 1,
max: 5,
palette: ["fa0000","b4b4b4","f096ff","006400","0064c8"]}//builtup ,barren,crop,forest,river
var landcover21=landcover2021.select('b1').visualize(landviz);
var landcover22=landcover2022.select('b1').visualize(landviz)
var landcover=ee.Dictionary({
  2021:landcover21,
  2022:landcover22
})
var landcover=ee.Image(landcover.get(number))
var landcoverlayer=ui.Map.Layer(landcover,{},'Landcover');
var post_end=post_start.advance(9,'day')
var postimage= imageCollection.filterDate(post_start,post_end).filterBounds(riverzone).map(maskS2clouds);
var pre_rain=ee.Date(post_start);
var post_rain=pre_rain.advance(3,'day');
var rain=rainfall.filterDate(pre_rain,post_rain);
rain=rain.sum();
var meanDictionary = rain.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: geometry,
  scale: 11132 ,
  maxPixels: 1e9
});
var maxrainfall= meanDictionary.getNumber('hourlyPrecipRate');
var max_rain=ee.Number(maxrainfall)
// IF CONDITION ..... remaining......
var postndvi= postimage.map(function(image){
   var ndvi= image.normalizedDifference(['B8','B4']).rename("postndvi");
   var ndwi= image.normalizedDifference(['B3','B8']).rename("postndwi");
   var mndwi=image.normalizedDifference(['B3','B11']).rename('postmndwi');
   var wri=image.expression("(b3+b4)/(b8+b12)",{
     b3:image.select('B3'),
     b4:image.select('B4'),
     b8:image.select('B8'),
     b12:image.select('B11')
   }).rename('postwri')
   return image.addBands([ndvi,ndwi,mndwi,wri]);
});
var post_ndvi=postndvi.select('postndvi').min();
var post_wri=postndvi.select('postwri').max();
var post_ndwi=postndvi.select('postndwi').min();
var post_mndwi=postndvi.select('postmndwi').min();
var ndviflood=post_ndvi.lt(0.06).clip(riverzone);
ndviflood=ndviflood.updateMask(ndviflood);
var unflooded= post_ndvi.lt(-1).selfMask().clip(riverzone)
var flood=ee.Algorithms.If(max_rain.gte(1), ndviflood.visualize(ndvi_plattee),unflooded );
var flooded=ee.Image(flood)
c.map.layers().set(0, landcoverlayer);
var floode= ui.Map.Layer(flooded,{},'Flood');
//
c.map.layers().set(1, floode)
  c.mapa.container.widgets().reset([c.map]);
  c.mapa.container.style().set({
  width:'795px',
  height:'355px'
})
// add legend to map (alternatively you can also print the legend to the console)
}
c.map.add(legend)
// Handles map clicks for charting.
function showHideMap() {
  var shown =true;
  var label = 'Hide Assessment Map';
  if (c.mapa.shownButton.getLabel() == 'Hide Assessment Map') {
    shown = false;
    label = 'Show Assessment Map';
  }
  c.mapa.container.style().set({shown: shown});
  c.mapa.shownButton.setLabel(label);
}
c.mapa.shownButton.onClick(showHideMap);
c.mapa.shownButton.onClick(assmap);
c.assessment.button.onClick(updateAssessment);