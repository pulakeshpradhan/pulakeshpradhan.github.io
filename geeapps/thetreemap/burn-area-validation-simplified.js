var burnAreaVisParam = ui.import && ui.import("burnAreaVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "palette": [
          "ff0e04"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"palette":["ff0e04"]};
var BurnAreaClean = ee.Image("users/mohagussalim/IDN_BurnAreaNewMethodPostV3CleanedV20200908_2019");
var sample = ee.FeatureCollection("users/mohagussalim/IDN7PROV_REFIdentBAKLHKCIFORPostV4_2019").filter(ee.Filter.neq('BURN2','DELETE'));
var url='https://storage.googleapis.com/burnarea-validation/screenshot/';
var BurnAreaKLHK = ee.FeatureCollection("users/mohagussalim/IDN_BurnArea_2019_KLHK"),
    TrainingImagePre = ee.ImageCollection("users/mohagussalim/IDN_S2PreBurnImage"),
    TrainingImagePost = ee.ImageCollection("users/mohagussalim/IDN_S2PostBurnImage"),
    BurnAreaResult = ee.Image("users/mohagussalim/IDN_BurnArea_2019_V20200629reclass"),
    VIIRS = ee.FeatureCollection("users/mohagussalim/IDN_VIIRSFireAlert_2019"),
    FireFreq=ee.Image("users/mohagussalim/IDN_FireAlertFrequencyMODISIn2019BA_2001to2018");
var posImageVis = {"opacity":1,"bands":["B11","B8","B4"],"min":74,"max":5507,"gamma":1},
    preImageVis = {"opacity":1,"bands":["B11_1","B8_1","B4_1"],"min":74,"max":5507,"gamma":1};
var dateStart='2019-01-01',
    dateEnd='2019-12-31';
/*
var classes = [
  [1,'Other area','ff5d00'],
  [2,'Forest','b10000'],
  [3,'Industrial oilpalm','550000'],
  [4,'Industrial pulpwood','9d9d9d'], 
  [5,'Ladang','ffb468'],
  [6,'Rubber','a39305'],
  [7,'Sawah','ee00ff'],
  [8,'Smallholder oilpalm','ffe84e'],
  [9,'Sugarcane','0050ff'],
  [10,'Mountain/hill','31ffe1'],
//  [11,'Non-burn','d6c107'],
  [12,'Volcano','a700ff']
  ]
*/
var classes = [
  [0,'Never burned prior to 2019','1cae00'],
  [1,'Burned once prior to 2019','fff600'],
  [2,'Burned twice prior to 2019','ff6900'],
  [3,'Burned 3 times prior to 2019','ff0000'],
  [19,'Burned at least 4 times prior to 2019','b80000']
  ]
var postImage = TrainingImagePost.mosaic()
var preImage = TrainingImagePre.mosaic().updateMask(postImage.select('B4'));
var combinedImage =postImage.addBands(preImage);   
var fireAlert = ee.FeatureCollection("users/mohagussalim/IDN_FireAlertMODIS_2019");
                //ee.ImageCollection('FIRMS').select(['T21', 'confidence'])
                //.filterDate(dateStart,dateEnd)
                //.mosaic();//.clip(AOI);
var viirsAlert = VIIRS.filter(ee.Filter.and(ee.Filter.gte('ACQ_DATE',ee.Date(dateStart).millis()),ee.Filter.lte('ACQ_DATE',ee.Date(dateEnd).millis())));
Map.addLayer(combinedImage,
        preImageVis,
        '2019 pre-fire image',
        false
      );
Map.addLayer(combinedImage,
        posImageVis,
        '2019 post-fire image',
        true
      );
var rasterSymbolBurn =
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#222211" quantity="1" label="Burn"/>' +
    '<ColorMapEntry color="#ff0000" quantity="1" label="Burn"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
var BurnAreaResultMasked=BurnAreaResult.updateMask(BurnAreaResult.eq(1));
//Map.addLayer(BurnAreaResultMasked.sldStyle(rasterSymbolBurn),{},'Burn Area (classification result)',false)
var colormapList='';
function getcolormapList(value, index, array){
  colormapList='<ColorMapEntry color="#'+value[2]+'" quantity="'+value[0]+'" label="'+value[1]+'"/>' ;
  //colormapList=colormapList+'<ColorMapEntry color="#'+value[2]+'" quantity="'+value[0]+'" label="'+value[1]+'"/>' ;
  //print(colormapList);
  return colormapList
}
//creating raster symbol
var colormapList=classes.map(getcolormapList);
print(colormapList)
var rasterSymbol =
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +colormapList+
  '</ColorMap>' +
'</RasterSymbolizer>';
//Map.addLayer(BurnAreaClean,{},'Burn Area (test)',true)
//BurnAreaClean=BurnAreaClean.updateMask(BurnAreaClean.neq(11));
Map.addLayer(BurnAreaClean,burnAreaVisParam,'Burned area (Gaveau et al)',true)
//Map.addLayer(FireFreq.sldStyle(rasterSymbol),{},'Burned area (Gaveau et al)',true);
Map.addLayer(BurnAreaKLHK,{},'Burned area (KLHK)',false)
//burn area Modis 
var dataset = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date(dateStart, dateEnd));
var burnedArea = dataset.select('BurnDate');
var burnedAreaVis = {
  min: 1,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.addLayer(burnedArea, burnedAreaVis, 'Burned area (Modis MCD64A1)', false);
Map.addLayer(fireAlert,{color: 'orange'},"Modis fire alert",false);
Map.addLayer(viirsAlert,{color: 'yellow'},"VIIRS fire alert",false);
//Map.setCenter(140.7596, -8.4816,12);//uncomment this to center map to example of area where KLHK capture more than ours in Papua. I think this is because the difference from pre and post not high
//Map.setCenter(118.31655, -8.50749,12);//uncomment this to center map to example of area where KLHK capture more than ours NTB. I think this is due to generalization
//Map.setCenter(111.5461, -2.96692,12);//uncomment this to center map to example of area where KLHK capture more than ours Central Kalimantan.
Map.addLayer(sample,{},'Reference points');
Map.setCenter(121.685, -3.502,6);
//GUI SECTION
var isPanelShow=true;
var mainPanel = ui.Panel();
var rightPanel = ui.Panel();
// Create an intro panel with labels.
var title = ui.Panel([
  ui.Label({
    value: 'Screenshot of reference point',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on reference point to check the screenshot')
]);
var activate = ui.Checkbox('Activate').setValue(true);
title.add(activate);
rightPanel.add(title);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
rightPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
function getFeature(coords) {
  //var testVariable=testVariable+" add more";
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  if(activate.getValue()){
    var initSize=ee.Number(2);
    var bufferSize=(initSize.pow(21-Map.getZoom())).divide(4);
    var buffer=point.buffer(bufferSize);
    print(21-Map.getZoom())
    print(bufferSize)
    var isec=sample.filterBounds(buffer);
    var selectedIsec=ee.Feature(isec.first());
    //var tempLayer=ui.Map.Layer(buffer,{},"Temporary layer");
    //Map.layers().set(1, tempLayer);
    var id='Sending request... ';
    var idLabel =  ui.Label(id);
    rightPanel.widgets().set(2, idLabel);
    var burnStatusLabel =  ui.Label('');
    rightPanel.widgets().set(3, burnStatusLabel);
    var idLink =  ui.Label();
    rightPanel.widgets().set(4, idLink);
    var swir2Link =  ui.Label();
    rightPanel.widgets().set(5, swir2Link);
    var burnStatus='';
    var swir2='';
    var size=ee.Number(isec.size()).getInfo();
    if(size>0){
      idLabel.setValue("Retrieving result, please wait...")
      print('Feature is not null');
      id=ee.String(selectedIsec.get('CID')).getInfo();
      burnStatus='Burn status: '+ee.String(selectedIsec.get('FinalBurn')).getInfo();
      swir2=ee.String(selectedIsec.get('SWIR2')).getInfo();
      var tempLayer=ui.Map.Layer(selectedIsec.buffer(bufferSize),{color:'red'},"Temporary layer");
      Map.layers().set(8, tempLayer);
      idLabel.setValue('Point ID: '+id)
      burnStatusLabel.setValue(burnStatus);
      idLink.setValue('Screenshot 1').setUrl(url+'ID'+id+'.jpg');
      if (swir2=='YES'){
        swir2Link.setValue("Screenshot 2 (SWIR)").setUrl(url+'ID'+id+'_SWIR2.jpg');
      }
    }else{
      idLabel.setValue('No record found.');
      burnStatusLabel.setValue('');
      idLink.setValue('');
      swir2Link.setValue('');
    }
//var className = ee.String(feature.get('name')).getInfo();
// Print the chart.
    if (id!=''){
    }
  }
}
mainPanel.style().set({
  position: 'bottom-right'
});
mainPanel.add(rightPanel);
var panelShow=ui.Button('Hide');
panelShow.onClick(function(){
  if(isPanelShow){
  mainPanel.remove(rightPanel);
  panelShow.setLabel('Show panel');
  isPanelShow=!isPanelShow;
  }
  else{
    mainPanel.insert(0,rightPanel);
  panelShow.setLabel('Hide panel');
  isPanelShow=!isPanelShow;
  }
});
mainPanel.add(panelShow);
//LEGEND
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-center',
    padding: '8px 15px'
  }
});
if(true){
//isLegendExist=true;
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Burned area (Gaveau et al):',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
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
    style: {margin: '0 6px 2px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var legendColorPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
  //style: {width: '250px'}
});
function getLegendList(value){
  legendColorPanel.add(makeRow(value[2], value[1]));
}
classes.forEach(getLegendList);
//legendColorPanel.add(makeRow(classes[0][2], classes[0][1]));
//legendColorPanel.add(makeRow(colorBare, 'Bare'));
//legendColorPanel.add(makeRow(colorVeg, 'Vegetation'));
//legendColorPanel.add(makeRow(colorWater, 'Water'));
//legendColorPanel.add(makeRow(colorCloud, 'Cloud'));
//legendColorPanel.add(makeRow(colorShadow, 'Shadow'));
legend.add(legendColorPanel);
// Add the legend to the map.
//Map.add(legend);
} 
Map.add(mainPanel);
Map.onClick(getFeature);
Map.style().set('cursor', 'crosshair');
//adding logo
var logo = ee.Image("users/mohagussalim/Logo/TheTreeMapLogo");
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'125px',height:'50px',position:'bottom-left'},
//onClick: function() {
//    print(ui.url.get('accept_repo'));
//  }
})
var companyUrl=ui.Label('TheTreeMap.com',{position:'bottom-left'},'https://thetreemap.com/')
var brandingPanel=ui.Panel({
  layout: ui.Panel.Layout.Flow('vertical'),
  style: {position: 'bottom-left'}
});
brandingPanel.add(branding);
brandingPanel.add(companyUrl);
Map.add(brandingPanel);