var RGI=ee.FeatureCollection('users/Jmleaglacio/IcePick_IDs_v7').aside(print)
          // .filter(ee.Filter.gte('Area',3))
//Set up map split
var linkedMap = ui.Map();
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(1),
  secondPanel: linker.get(0),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var panelLeft=ui.Panel({
    style: {
    position: 'top-left'
    }
  });
var panelRight=ui.Panel({
    style: {
    position: 'top-right'
    }
  });
var infoLabel=ui.Label('Click for info on Greenland glacier change',{color:'blue'}).setUrl('https://www.antarcticglaciers.org/glaciers-and-climate/changing-greenland-ice-sheet/glacier-recession-around-the-greenland-ice-sheet/');
var infoLabel1=ui.Label('Click for info on Greenland glacier change',{color:'blue'}).setUrl('https://www.antarcticglaciers.org/glaciers-and-climate/changing-greenland-ice-sheet/glacier-recession-around-the-greenland-ice-sheet/');
Map.setControlVisibility({layerList:false,mapTypeControl:false,drawingToolsControl:false})
linkedMap.setControlVisibility({layerList:false,mapTypeControl:false,drawingToolsControl:false})
Map.add(infoLabel)
linkedMap.add(infoLabel1)
var satelliteLabelLeft=ui.Label('',{fontWeight:'bold',fontSize:'15px'})
var dateLabelLeft=ui.Label('',{fontSize:'15px'})
panelLeft.add(satelliteLabelLeft).add(dateLabelLeft)
var satelliteLabelRight=ui.Label('',{fontWeight:'bold',fontSize:'15px'})
var dateLabelRight=ui.Label('',{fontSize:'15px'})
panelRight.add(satelliteLabelRight).add(dateLabelRight)
linkedMap.add(panelLeft)
Map.add(panelRight)
//Number of glaciers in regions 1-18 >3km^2
// var RGItotals=ee.List([null,2072,	882,	1808,	1561,	3831,	130,	634,
//                       213,	693,	144,	136,	74,	2673,	1641,	923,	
//                       186,	1048,	47,
// ]);
          //.filter(ee.Filter.eq('region',19))
// print(Math.random())
// var i
// var regionNum=[]
// for ( i = 0; i < 10000; i++) {
//   regionNum[i]= ee.Feature(null).set('rand',ee.Number(Math.random()).multiply(18).ceil())
// }
// print(regionNum)
// print(ui.Chart.feature.histogram(ee.FeatureCollection(regionNum),'rand'))
// Map.addLayer(RGI)
//Set 2 month range options depending on latitude
// var monthRange=[[6,8],[12,1]];
// print(monthRange)
var rgiRegionNum;
var RGIregion;
var RGItotals
var glacNum;
var glacier;
var centroid;
var hemisStartMonth;
var hemisEndMonth;
var getGlacInfo=function(){
}
var numImagesFirst=0;
var numImagesSecond=0;
var numImages=[0,0];
var imCollFirst;
var imCollSecond;
var firstImage;
var secondImage;
var i
var j=0
var centroid1
var runScript=function(RGI){
var addImagery=function(firstImage,secondImage){
  // var numImagesOut=numImages.getInfo();
    if (firstImage!==null && secondImage!==null){
      centroid1=centroid.coordinates().getInfo();
      var firstImageInfo=ee.Dictionary(ee.Image(firstImage).toDictionary(['SPACECRAFT_ID','DATE_ACQUIRED'])).values().getInfo();
      var secondImageInfo=ee.Dictionary(ee.Image(secondImage).toDictionary(['SPACECRAFT_ID','DATE_ACQUIRED'])).values().getInfo();
      print(firstImage,secondImage)
      linkedMap.addLayer(ee.Image(firstImage),{min:0,max:0.8,gamma:1.75});
      Map.addLayer(ee.Image(secondImage),{min:0,max:0.8,gamma:1.75});
      Map.setCenter(centroid1[0],centroid1[1],10);
      satelliteLabelLeft.setValue(firstImageInfo[1]);
      satelliteLabelRight.setValue(secondImageInfo[1]);
      dateLabelLeft.setValue(firstImageInfo[0]);
      dateLabelRight.setValue(secondImageInfo[0]);
    } else {
      getImageInfo(RGI,RGItotals)
    }
}
var getImageInfo=function(RGI,RGItotals){
  // rgiRegionNum=ee.Number(Math.random()).multiply(18).ceil();
  //   print(rgiRegionNum)
  //   RGIregion=ee.FeatureCollection(RGI).filter(ee.Filter.eq('region',rgiRegionNum));
    // glacNum=ee.Number(Math.random()).multiply(RGItotals.get(rgiRegionNum)).ceil().subtract(1);
    glacNum=ee.Number(Math.random()).multiply(290).ceil().subtract(1);
     glacier=ee.Feature(ee.List(ee.FeatureCollection(RGI).toList(290)).get(glacNum));
     centroid=ee.Feature(glacier).geometry();
    // if(centroid[1]>0){
    //   hemisStartMonth=monthRange[0][1];
    //   hemisEndMonth=monthRange[0][1];
    // } else {
    //   hemisStartMonth=monthRange[1][1];
    //   hemisEndMonth=monthRange[1][1];
    // }
    imCollFirst=ee.ImageCollection('LANDSAT/LT04/C01/T1_TOA')
              .filterBounds(centroid)
              .select('B3','B2','B1')
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
              .filter(ee.Filter.calendarRange(7, 8, 'month'))
              .merge(
                ee.ImageCollection("LANDSAT/LE07/C01/T1_RT_TOA")
                .filterBounds(centroid)
                .select('B3','B2','B1')
                .filter(ee.Filter.lt('CLOUD_COVER', 10))
                .filter(ee.Filter.calendarRange(7, 8, 'month')))
              .sort('system:time_start');
    // numImagesFirst=imCollFirst.size().getInfo();
    firstImage=ee.Image(imCollFirst.first());
    imCollSecond=ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
              .filterBounds(centroid)
              .select('B4','B3','B2')
              .filter(ee.Filter.lt('CLOUD_COVER', 10))
              .filter(ee.Filter.calendarRange(7, 8, 'month'))
              .sort('system:time_start',false);
    // numImagesFirst=imCollSecond.size().getInfo();
    secondImage=ee.Image(imCollSecond.first());
    numImages=ee.List([imCollFirst.size(),imCollSecond.size()]);
    addImagery(firstImage,secondImage)
}
getImageInfo(RGI,RGItotals)
}
runScript(RGI)
var buttonPanel=ui.Panel({
    style: {
    position: 'bottom-right'
    }
  });
var nextButton=ui.Button('View another glacier');
nextButton.onClick(function(){
  linkedMap.layers().reset();
  Map.layers().reset();
  runScript(RGI)
})
buttonPanel.add(nextButton)
Map.add(buttonPanel)
//
var infoPanel=ui.Panel({
    style: {
    position: 'bottom-left',
    backgroundColor:'#E0FFFF'
    }
  });
var infoPanel00=ui.Label('Greenland Glacier Change',{fontWeight:'bold',fontSize:'10px',margin:'0px',backgroundColor:'#E0FFFF',color:'black'});
var infoPanel0=ui.Label('School of Environmental Sciences',{fontWeight:'bold',fontSize:'7px',margin:'0px',backgroundColor:'#E0FFFF',color:'blue',textDecoration:'underline'}).setUrl('https://www.liverpool.ac.uk/environmental-sciences/');
var infoPanel1=ui.Label('University of Liverpool',{fontWeight:'bold',fontSize:'7px',margin:'0px',backgroundColor:'#E0FFFF',color:'black'});
var infoPanel2=ui.Label('Created by Dr James Lea',{fontWeight:'bold',fontSize:'7px',margin:'10px 0px 0px 0px',backgroundColor:'#E0FFFF'});
var infoPanel3=ui.Label('Email: j.lea@liverpool.ac.uk',{fontSize:'7px',margin:'0px',backgroundColor:'#E0FFFF',color:'blue',textDecoration:'underline'}).setUrl('mailto:j.lea@liverpool.ac.uk');
var infoPanel4=ui.Label('Twitter: @JamesMLea',{fontSize:'7px',margin:'0px',backgroundColor:'#E0FFFF',color:'blue',textDecoration:'underline'}).setUrl('https://twitter.com/JamesMLea');
infoPanel.add(infoPanel00).add(infoPanel0).add(infoPanel1).add(infoPanel2).add(infoPanel3).add(infoPanel4)
linkedMap.add(infoPanel)