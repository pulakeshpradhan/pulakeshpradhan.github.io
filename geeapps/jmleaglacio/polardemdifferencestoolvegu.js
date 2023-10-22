var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.MultiPoint();
Map.setOptions('SATELLITE');
var defaultResolution=2;
var defaultResidual=2.5;
var defaultCoverage=20;
var defaultVisMin=-20;
var defaultVisMax=20;
var defaultVisMinColour='red';
var defaultVisMidColour='FFFDD0';
var defaultVisMaxColour='blue';
var panelArcticAntarctic=ui.Panel({
  style:{position: 'top-center',
        textAlign:'center',
        stretch:'horizontal',
        margin:'1px 1px 1px 1px'
  }
});
var epsg
var arcticAntarcticFlag  //Arctic = 0, Antarctic = 1
var arcticAntarcticLabel0=ui.Label({value:'Polar DEM Differencing Analysis Tool (EGU demo version, no download options)',style:{fontSize:'20px',fontWeight:'bold'}});
var arcticAntarcticLabel0a=ui.Label({value:'Written by James M. Lea, University of Liverpool. Contact: @JamesMLea j.lea@liverpool.ac.uk',style:{fontSize:'12px',fontWeight:'bold'}});
var arcticAntarcticLabel1=ui.Label({value:'Analyse DEMs from:',style:{fontWeight:'bold'}});
var arcticAntarcticAdemButton=ui.Button({label:'ArcticDEM',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
var arcticAntarcticRemaButton=ui.Button({label:'REMA',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
panelArcticAntarctic.add(arcticAntarcticLabel0).add(arcticAntarcticLabel0a)
  .add(arcticAntarcticLabel1).add(arcticAntarcticAdemButton)
  .add(arcticAntarcticRemaButton);
arcticAntarcticAdemButton.onClick(function(){
  arcticAntarcticFlag=0;
  epsg='EPSG:3413';
  mainGUI(arcticAntarcticFlag,epsg)
})
arcticAntarcticRemaButton.onClick(function(){
  arcticAntarcticFlag=1;
  epsg='EPSG:4326';
  mainGUI(arcticAntarcticFlag,epsg)
})
Map.add(panelArcticAntarctic)
var commentsPanel=ui.Panel({
  style:{position: 'bottom-left',
        textAlign:'center',
        stretch:'horizontal',
        margin:'1px 1px 1px 1px'
  }
});
var commentsLabel1=ui.Label('Have comments/suggestions? Get in touch!',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
var commentsLabel2=ui.Label('Twitter: @JamesMLea',{margin:'1px 1px 1px 1px'}).setUrl('https://twitter.com/JamesMLea');
var commentsLabel3=ui.Label('Email: j.lea@liverpool.ac.uk',{margin:'1px 1px 1px 1px'}).setUrl('mailto:j.lea@liverpool.ac.uk');
commentsPanel.add(commentsLabel1).add(commentsLabel2).add(commentsLabel3)
Map.add(commentsPanel)
var mainGUI=function(arcticAntarcticFlag,epsg){
  arcticAntarcticAdemButton.unlisten();
  arcticAntarcticRemaButton.unlisten();
  Map.remove(panelArcticAntarctic)
  var drawingTools=Map.drawingTools();
  drawingTools.layers().reset();
  drawingTools.setDrawModes(['polygon','rectangle']);
  drawingTools.draw();
  drawingTools.setShape('polygon');
  drawingTools.onDraw(function(){
    drawingTools.stop();
    Map.setControlVisibility({drawingToolsControl:false});
  });
  // 
  // drawingTools.draw()
  // drawingTools.setShape('line')
  // Map.addLayer(ee.Feature(geometryBuffer))
  var mosaic
  if (arcticAntarcticFlag===0){
    mosaic=ee.Image("UMN/PGC/ArcticDEM/V3/2m_mosaic").aside(print);
    Map.setCenter(0,70,2);
  } else {
    mosaic=ee.Image("UMN/PGC/REMA/V1_1/8m").aside(print);
    Map.setCenter(0,-70,2);
  }
  Map.addLayer(mosaic,{min:0,max:2000,palette:['green','brown','orange','gray','white'],opacity:0.4},'Elevation (m)');
  Map.addLayer(ee.Terrain.hillshade(mosaic),{min:0,max:255,opacity:0.4},'Hillshade');
  var panelPlot=ui.Panel({style:{minWidth:'700px',textAlign:'center'}});
  var panelPlotClose=ui.Button({label:'Close',style:{stretch:'horizontal'}});
  panelPlotClose.onClick(function(){
    Map.remove(panelPlot);
  });
  var panelWarning=ui.Panel({
    style:{position: 'top-center',
          textAlign:'center',
          stretch:'horizontal',
          margin:'1px 1px 1px 1px'
    }
  });
  var panelWarningLabel=ui.Label({value:'',style:{textAlign:'center',fontWeight:'bold'}});
  var panelWarningLabel1=ui.Label({value:'',style:{textAlign:'center',fontWeight:'bold'}});
  var panelWarningLabel2=ui.Label({value:'',style:{textAlign:'center',fontWeight:'bold'}});
  var panelWarningLabel3=ui.Label({value:'',style:{textAlign:'center',fontWeight:'bold'}});
  var panelWarningButton=ui.Button({label:'Ok',style:{stretch:'horizontal'}});
  panelWarningButton.onClick(function(){
    Map.remove(panelWarning);
  });
  panelWarning.add(panelWarningLabel);
  panelWarning.add(panelWarningLabel1);
  panelWarning.add(panelWarningLabel2);
  panelWarning.add(panelWarningLabel3);
  panelWarning.add(panelWarningButton);
  var panelData=ui.Panel({
    style:{position: 'top-left'}
  });
  var panelData1=ui.Panel({
    style:{position: 'top-right'}
  });
  var panelText=ui.Label('Step 1 - Draw/Import RoI:',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  var panelTextA=ui.Label('Or, import transect(s) via GEE asset path:',{margin:'1px 1px 1px 1px'});
  var panelTextBoxA=ui.Textbox({placeholder:'e.g. users/UserName/transectAsset',value:'users/Jmleaglacio/testROIa',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
  var panelButtonA=ui.Button({label:'Import asset (single polygon/rectangle only)',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
  var panelTextB=ui.Label('Link: ',{margin:'1px 1px 1px 1px',fontWeight:'bold'})
  var panelTextC=ui.Label('Information on working with GEE Assets',{margin:'1px 1px 1px 1px',textDecoration:'underline'})
                  .setUrl('https://developers.google.com/earth-engine/guides/asset_manager');
  var panelTextA1=ui.Label('__________________________________________________',{margin:'0px 0px 0px 0px',fontWeight:'bold'});
  var panelTextA2=ui.Label('Step 2 - Define timeframe for DEMs:',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  var startDateLabel=ui.Label('Start date in YYYY-MM-DD format:',{margin:'1px 1px 1px 1px'});
  var startDateBox=ui.Textbox({
    value: '2009-08-16',
    style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}
  });
  var endDateLabel=ui.Label('End date in YYYY-MM-DD format:',{margin:'1px 1px 1px 1px'});
  var endDateBox=ui.Textbox({
    value: '2017-03-12',
    style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}
  });
  if (arcticAntarcticFlag===1){
    startDateBox.setValue('2009-01-01');
    endDateBox.setValue('2018-01-01');
  }
  // Dropdown menus for range of months
  var months_dropdown = {
    January: [1],February: [2],March: [3],April: [4],May: [5],
    June: [6],July: [7],August: [8],September: [9],October: [10],
    November: [11],December: [12]
  };
  var months = [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
      ];
  function monthNameToNum(monthname) {
      var month = months.indexOf(monthname)+1;
      return month;
  }
  var startMonthLabel=ui.Label('Select start of month range (default: January):',{margin:'1px 1px 1px 1px'});
  var select1 = ui.Select({
    items: Object.keys(months_dropdown),
    onChange: function() {
    },
    style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}
  });
  var endMonthLabel=ui.Label('Select end of month range (default: December):',{margin:'1px 1px 1px 1px'});
  var select2 = ui.Select({
    items: Object.keys(months_dropdown),
    onChange: function() {
    },
    style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}
  });
  var panelText0=ui.Label('__________________________________________________',{margin:'0px 0px 0px 0px',fontWeight:'bold'});
  var panelText1=ui.Label('Output resolution (meters, min: 2 m):',{margin:'1px 1px 1px 1px'});
  var panelText2=ui.Label('Metadata max vertical residual (+ve value only):',{margin:'1px 1px 1px 1px'});
  var panelText3=ui.Label('Exclude DEMs with <X% RoI coverage',{margin:'1px 1px 1px 1px'});
  var panelTextbox1=ui.Textbox({value:defaultResolution,style:{margin:'1px 1px 1px 1px'}});
  var panelTextbox2=ui.Textbox({style:{margin:'1px 1px 1px 1px'}});
  var panelTextbox3=ui.Textbox({value:defaultCoverage,style:{margin:'1px 1px 1px 1px'}});
  var panelText3b=ui.Label('Step 3 - Define settings:',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  // var panelText3c=ui.Label('Advanced options (may increase execution time):',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  // var panelCheckbox3d=ui.Checkbox({
  //                     label:'Auto. co-register DEMs to ArcticDEM Mosaic',
  //                     value:false,
  //                     style:{margin:'1px 1px 1px 1px'}
  //     });
  // var panelCheckbox3e=ui.Checkbox({
  //                     label:'Export difference from Mosaic instead of elevs',
  //                     value:false,
  //                     style:{margin:'1px 1px 1px 1px'}
  //     });
  var panelText4=ui.Label('__________________________________________________',{margin:'0px 0px 0px 0px',fontWeight:'bold'});
  var panelText4b=ui.Label('Step 4 - Calculate & preview data:',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  var panelText4c=ui.Label('Colour palette form min ('+defaultVisMinColour+') to max ('+defaultVisMaxColour+'):',{margin:'1px 1px 1px 1px'});
  var panelTextbox4d=ui.Textbox({value:defaultVisMin,style:{margin:'1px 1px 1px 1px',color:defaultVisMinColour}});
  var panelTextbox4f=ui.Textbox({value:defaultVisMax,style:{margin:'1px 1px 1px 1px',color:defaultVisMaxColour}});
  // var panelCheckbox4c=ui.Checkbox({
  //                     label:'Auto define sampling interval for preview',
  //                     value:false,
  //                     style:{margin:'1px 1px 1px 1px'}
  //     });
  var panelText5=ui.Label('__________________________________________________',{margin:'0px 0px 0px 0px',fontWeight:'bold'});
  var panelText5a=ui.Label('Step 5 - Export data using values from Step 3:',{margin:'1px 1px 1px 1px',fontWeight:'bold'});
  var panelGo=ui.Button({label:'Calc. & view diff. from Mosaic',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
  var panelDrawNew=ui.Button({label:'Draw new RoI',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}});
  var panelDrawExportImages=ui.Button({label:'Export DEMs of difference',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}}).setDisabled(true);
  var panelDrawExportRoiAsset=ui.Button({label:'Export RoI to Asset',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}}).setDisabled(true);
  var panelDrawExportRoiDrive=ui.Button({label:'Export RoI to Drive',style:{margin:'1px 1px 1px 1px',stretch:'horizontal'}}).setDisabled(true);
  var importedPoly=ee.FeatureCollection([]);
  var importFlag;
  panelButtonA.onClick(function(){
    importedPoly=ee.FeatureCollection(panelTextBoxA.getValue());
    importFlag=1;
    while (Map.layers().length()>1){
              Map.remove(Map.layers().get(Number(Map.layers().length()-1)));
            }
    Map.addLayer(importedPoly,{},'imported RoI')
    drawingTools.stop();
  })
  panelDrawNew.onClick(function(){
    importFlag=0;
    importedPoly=ee.FeatureCollection([]);
    while (Map.layers().length()>1){
              Map.remove(Map.layers().get(Number(Map.layers().length()-1)));
            }
    Map.setControlVisibility({drawingToolsControl:true});
    drawingTools.layers().reset();
    drawingTools.setDrawModes(['polygon','rectangle']);
    drawingTools.draw();
    drawingTools.setShape('polygon');
    drawingTools.onDraw(function(){
    drawingTools.stop();
  });
  });
  panelData.add(panelText).add(panelDrawNew).add(panelText0)
            .add(panelTextA).add(panelTextBoxA).add(panelButtonA)
            .add(panelTextB).add(panelTextC)
            .add(panelTextA1).add(panelTextA2)
            .add(startDateLabel).add(startDateBox)
            .add(endDateLabel).add(endDateBox)
            .add(startMonthLabel).add(select1)
            .add(endMonthLabel).add(select2);
  panelData1.add(panelText3b).add(panelText1).add(panelTextbox1)
            .add(panelText2).add(panelTextbox2)
            .add(panelText3).add(panelTextbox3)
            .add(panelText4).add(panelText4b)
            .add(panelText4c).add(panelTextbox4d).add(panelTextbox4f)
            .add(panelGo)
            .add(panelText5).add(panelText5a)
            .add(panelDrawExportImages).add(panelDrawExportRoiAsset).add(panelDrawExportRoiDrive)
  Map.add(panelData);
  Map.add(panelData1);
  if (arcticAntarcticFlag===1){
    panelTextbox2.setPlaceholder('Not available for REMA')
    panelTextbox2.setDisabled(true)
  } else {
    panelTextbox2.setValue(defaultResidual)
  }
  var visualisationPanel=ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal',true),
    style:{position: 'top-center',
          textAlign: 'center',
          stretch: 'both'
    }
  });
  var visLabel=ui.Label('Selected DEM:');
  var visDropdown=ui.Select({placeholder:'RoI undefined'});
  var visButton=ui.Button('Display').setDisabled(true);
  var visRecalc=ui.Button('Calc. & view diff. to selected DEM').setDisabled(true);
  visualisationPanel.add(visLabel).add(visDropdown).add(visButton).add(visRecalc);
  Map.add(visualisationPanel)
  var startFlag
  var demsOutCopy
  var diffLabelPanel=ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal',true),
    style:{position: 'bottom-center',
          textAlign: 'center',
          stretch: 'both'
    }
  });
  var diffLabel=ui.Label('');
  diffLabelPanel.add(diffLabel);
  Map.add(diffLabelPanel)
  ///////////////////////////////////////////////
  panelGo.onClick(function(){
    startFlag=1
    var outputDEMs=ee.Image(visFunction(demsOutCopy))
    demsOutCopy=outputDEMs;
    diffLabel.setValue('Use Display bar above to see DEM differences. Current reference DEM is: Mosaic');
    visRecalc.onClick(function(){
      startFlag=0;
      diffLabel.setValue('Use Display bar above to see DEM differences. Current reference DEM is: '+visDropdown.getValue());
      while (Map.layers().length()>1){
              Map.remove(Map.layers().get(Number(Map.layers().length()-1)));
            }
      outputDEMs=ee.Image(visFunction(demsOutCopy))
    })
    var exportGeom=ee.Feature(ee.Algorithms.If(ee.Number(ee.FeatureCollection(importedPoly).size()).eq(0),
                      ee.Feature(ee.Feature(ee.FeatureCollection(drawingTools.toFeatureCollection()).first())).set('roiType','manual'),
                      ee.Feature(ee.Feature(ee.FeatureCollection(importedPoly).first())).set('roiType','fromAsset')))
                      .transform(epsg,2)
    panelDrawExportImages.onClick(function(){
      Export.image.toDrive({
        image:ee.Image(outputDEMs),
        description:'DEMsOfDiffFromBaseMap',
        scale:panelTextbox1.getValue(),
        region:exportGeom.geometry(),
        maxPixels:1e12
      })
    })
  })
  ///////////////////////////////////
  //FUNCTIONS
  ///////////////////////////////////
  var demDifferencing=function(demsOutCopy){
    var geom
    // var geom=;
    // print(importFlag)
    // if (importFlag===0){
      // print('manual')
      // var geom1=ee.Feature(ee.Feature(ee.FeatureCollection(drawingTools.toFeatureCollection()).first()).geometry().transform('EPSG:3413',2)).set('roiType','manual').aside(print);
    // } else {
      // print('import')
      // var geom2=ee.Feature(ee.Feature(ee.FeatureCollection(importedPoly).first()).geometry().transform('EPSG:3413',2)).set('roiType','fromAsset').aside(print);
    // }
    // print(ee.Feature(ee.Feature(ee.FeatureCollection(importedPoly).first())).set('roiType','fromAsset'),'import')
    // print(ee.Number(ee.FeatureCollection(importedPoly).size()).eq(0),'flag')
    geom=ee.Feature(ee.Algorithms.If(ee.Number(ee.FeatureCollection(importedPoly).size()).eq(0),
                      ee.Feature(ee.Feature(ee.FeatureCollection(drawingTools.toFeatureCollection()).first())).set('roiType','manual'),
                      ee.Feature(ee.Feature(ee.FeatureCollection(importedPoly).first())).set('roiType','fromAsset')))
                      .transform(epsg,2)
    // print(geom,'geom')
    var roi=ee.Image.constant(1).clip(geom);
    var mosaicClip=ee.Image(mosaic).updateMask(roi)
    var baseDEM
    var roiUpdate
    if (startFlag===1){
      baseDEM=mosaicClip;
    } else {
      baseDEM=ee.Image(demsOutCopy.select(visDropdown.getValue())).add(mosaicClip)
    }
    var baseBandName=ee.String(ee.List(ee.Image(baseDEM).bandNames()).get(0));
    roiUpdate=baseDEM.gt(-999) //accounts for gaps in Mosaic/other base DEms
    var roiArea=ee.Number(ee.Image(roiUpdate).multiply(ee.Image.pixelArea()).reduceRegion({
                                                  reducer:ee.Reducer.sum(),
                                                  geometry:geom.geometry(),
                                                  scale:100,
                                                  crs:epsg,
                                                  maxPixels:1e12
                                                }).get(baseBandName));
    var startDateDefined=startDateBox.getValue();
    var endDateDefined=endDateBox.getValue();
    var startMonth=monthNameToNum(select1.getValue());
    var endMonth=monthNameToNum(select2.getValue());
    if(startMonth===0){
      startMonth=1;
    }
    if(endMonth===0){
      endMonth=12;
    }
    var dems
    if (arcticAntarcticFlag===0){
      dems=ee.ImageCollection(arcticDemLoad(startDateDefined,endDateDefined,startMonth,endMonth,roiUpdate,baseDEM,roiArea,geom))
    } else {
      dems=ee.ImageCollection(remaDemLoad(startDateDefined,endDateDefined,startMonth,endMonth,roiUpdate,baseDEM,roiArea,geom))
    }
    var bandNames=dems.aggregate_array('system:id').aside(print)     
    return ee.Image(dems.toBands().rename(bandNames).addBands(ee.Image(baseDEM).rename(['baseDEM']).toDouble())
                                                    .addBands(ee.Image(mosaicClip).rename(['mosaic']).toDouble()))
  }
  ////////////////////////////////////////////////
  var visFunction=function(demsOutCopy){
    var demsOut=ee.Image(demDifferencing(demsOutCopy)).aside(print);
    var bandNamesOut=ee.List(demsOut.bandNames()).getInfo();
    print(bandNamesOut)
    var select_items = []
    for (var i = 0; i < bandNamesOut.length; i++) {
      select_items.push({
        label: bandNamesOut[i],
        value: bandNamesOut[i]
      })
    }
    print(select_items)
    drawingTools.layers().map(function(layer){
      return layer.setShown(false)
    })
    Map.addLayer(ee.Terrain.hillshade(ee.Image(demsOut).select('baseDEM')),{min:0,max:255},'Base DEM Hillshaded')
    visualisationPanel.clear()
    visDropdown=ui.Select({items: select_items,style:{maxWidth:'150px'}})
    visualisationPanel.add(visLabel).add(visDropdown).add(visButton).add(visRecalc);
    visButton.setDisabled(false)
    visRecalc.setDisabled(false)
    visButton.unlisten()
    visButton.onClick(function(){
      var visBandName=visDropdown.getValue();
      Map.addLayer(ee.Image(demsOut).select(visBandName),
                    {min:panelTextbox4d.getValue(),max:panelTextbox4f.getValue(),
                      palette:[defaultVisMinColour,defaultVisMidColour,defaultVisMinColour]
                    },visBandName)
    })
    return ee.Image(demsOut)
  }
  ///////////////////////////////////////////////
  var exportPanel=ui.Panel({
      style:{position: 'top-center',
            textAlign:'center',
            stretch:'horizontal',
            margin:'1px 1px 1px 1px'
      }
    });
    var exportLabel=ui.Label('To export data, click Run on Tasks tab')
    var exportButton=ui.Button({label:'Close',style:{stretch:'horizontal'}});
    exportPanel.add(exportLabel).add(exportButton)
    exportButton.onClick(function(){
      Map.remove(exportPanel)
    })
  panelDrawExportRoiAsset.onClick(function(){
    var roiExport=drawingTools.toFeatureCollection('roi_id').aside(print)
    Export.table.toAsset({
      collection:ee.FeatureCollection(roiExport),
      assetId:'DemDifferenceRoi',
      description:'DemDifferenceRoi'
    })
    Map.add(exportPanel)
  })
  panelDrawExportRoiDrive.onClick(function(){
    var roiExport=drawingTools.toFeatureCollection('roi_id').aside(print)
    Export.table.toDrive({
      collection:ee.FeatureCollection(roiExport),
      description:'DemDifferenceRoi',
      fileFormat:'SHP'
    })
    Map.add(exportPanel)
  })
  var arcticDemLoad=function(startDateDefined,endDateDefined,startMonth,endMonth,roiUpdate,baseDEM,roiArea,geom){
    return ee.ImageCollection('UMN/PGC/ArcticDEM/V3/2m')
                .filterBounds(geom.geometry())
                .filterMetadata('registrationMeanVerticalResidual','not_less_than',ee.Number(Number(panelTextbox2.getValue())).multiply(-1))
                .filterMetadata('registrationMeanVerticalResidual','not_greater_than',ee.Number(Number(panelTextbox2.getValue())))//.aside(print)
                .filterDate(startDateDefined,endDateDefined)
                .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
                .sort('system:time_start')
                .map(function(im){
                  var x1disp=ee.Image.constant(ee.Number(im.get('registrationDX')))//.clip(image1.get('system:footprint'));
                  var y1disp=ee.Image.constant(ee.Number(im.get('registrationDY')))//.clip(image1.get('system:footprint'));
                  var z1disp=ee.Image.constant(ee.Number(im.get('registrationDZ')))//.clip(image1.get('system:footprint'));
                  var outIm=ee.Image(im.select('elevation')).displace([x1disp,y1disp]).add(z1disp);
                  return ee.Image(outIm).select('elevation').updateMask(roiUpdate).subtract(baseDEM).copyProperties(ee.Image(im))
                          .set('PcCoverage', ee.Number(ee.Image(ee.Image(im).select('elevation').updateMask(roiUpdate).gt(0)).multiply(ee.Image.pixelArea())
                                                .reduceRegion({
                                                  reducer:ee.Reducer.sum(),
                                                  geometry:geom.geometry(),
                                                  scale:100,
                                                  crs:epsg,
                                                  maxPixels:1e12
                                                }).get('elevation')).divide(roiArea).multiply(100)
                                )
                  //add roi area coverage metadata...
                }).map(function(im1){
                  return ee.Image(im1).toDouble().set('system:id',ee.String(ee.Image(im1).get('acqDate1')).cat('_')
                                                      .cat(ee.String(ee.Image(im1).get('acqDate1'))).cat('_Cov')
                                                      .cat(ee.String(ee.Number(ee.Image(im1).get('PcCoverage')).int())).cat('_').cat(im1.id()))
                }).filterMetadata('PcCoverage','not_less_than',ee.Number(Number(panelTextbox3.getValue()))).aside(print)
  }
  var remaDemLoad=function(startDateDefined,endDateDefined,startMonth,endMonth,roiUpdate,baseDEM,roiArea,geom){
    var rema2m=ee.ImageCollection("UMN/PGC/REMA/V1/2m")
                .filterBounds(geom.geometry())
                // .filterMetadata('registrationMeanVerticalResidual','not_less_than',ee.Number(Number(panelTextbox2.getValue())).multiply(-1))
                // .filterMetadata('registrationMeanVerticalResidual','not_greater_than',ee.Number(Number(panelTextbox2.getValue())))//.aside(print)
                .filterDate(startDateDefined,endDateDefined)
                .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
                .sort('system:time_start')
                .map(function(im){
                  // var x1disp=ee.Image.constant(ee.Number(im.get('registrationDX')))//.clip(image1.get('system:footprint'));
                  // var y1disp=ee.Image.constant(ee.Number(im.get('registrationDY')))//.clip(image1.get('system:footprint'));
                  // var z1disp=ee.Image.constant(ee.Number(im.get('registrationDZ')))//.clip(image1.get('system:footprint'));
                  // var outIm=ee.Image(im.select('elevation')).displace([x1disp,y1disp]).add(z1disp);
                  return ee.Image(im).select('elevation').updateMask(roiUpdate).subtract(baseDEM).copyProperties(ee.Image(im))
                          .set('PcCoverage', ee.Number(ee.Image(ee.Image(im).select('elevation').updateMask(roiUpdate).gt(0)).multiply(ee.Image.pixelArea())
                                                .reduceRegion({
                                                  reducer:ee.Reducer.sum(),
                                                  geometry:geom.geometry(),
                                                  scale:100,
                                                  crs:epsg,
                                                  maxPixels:1e12
                                                }).get('elevation')).divide(roiArea).multiply(100)
                                )
                  //add roi area coverage metadata...
                }).map(function(im1){
                  return ee.Image(im1).set('system:id',ee.String(ee.Image(im1).get('acqDate1')).cat('_')
                                                      .cat(ee.String(ee.Image(im1).get('acqDate1'))).cat('_Cov')
                                                      .cat(ee.String(ee.Number(ee.Image(im1).get('PcCoverage')).int())).cat('_').cat(im1.id()).cat('_2m'))
                }).filterMetadata('PcCoverage','not_less_than',ee.Number(Number(panelTextbox3.getValue()))).aside(print)
    var rema8m=ee.ImageCollection("UMN/PGC/REMA/V1/8m")
                .filterBounds(geometry)
                // .filterMetadata('registrationMeanVerticalResidual','not_less_than',ee.Number(Number(panelTextbox2.getValue())).multiply(-1))
                // .filterMetadata('registrationMeanVerticalResidual','not_greater_than',ee.Number(Number(panelTextbox2.getValue())))//.aside(print)
                .filterDate(startDateDefined,endDateDefined)
                .filter(ee.Filter.calendarRange(startMonth, endMonth, 'month'))
                .sort('system:time_start')
                .map(function(im){
                  // var x1disp=ee.Image.constant(ee.Number(im.get('registrationDX')))//.clip(image1.get('system:footprint'));
                  // var y1disp=ee.Image.constant(ee.Number(im.get('registrationDY')))//.clip(image1.get('system:footprint'));
                  // var z1disp=ee.Image.constant(ee.Number(im.get('registrationDZ')))//.clip(image1.get('system:footprint'));
                  // var outIm=ee.Image(im.select('elevation')).displace([x1disp,y1disp]).add(z1disp);
                  return ee.Image(im).select('elevation').updateMask(roiUpdate).subtract(baseDEM).copyProperties(ee.Image(im))
                          .set('PcCoverage', ee.Number(ee.Image(ee.Image(im).select('elevation').updateMask(roiUpdate).gt(0)).multiply(ee.Image.pixelArea())
                                                .reduceRegion({
                                                  reducer:ee.Reducer.sum(),
                                                  geometry:geom.geometry(),
                                                  scale:100,
                                                  crs:epsg,
                                                  maxPixels:1e12
                                                }).get('elevation')).divide(roiArea).multiply(100)
                                )
                  //add roi area coverage metadata...
                }).map(function(im1){
                  return ee.Image(im1).set('system:id',ee.String(ee.Image(im1).get('acqDate1')).cat('_')
                                                      .cat(ee.String(ee.Image(im1).get('acqDate1'))).cat('_Cov')
                                                      .cat(ee.String(ee.Number(ee.Image(im1).get('PcCoverage')).int())).cat('_').cat(im1.id()).cat('_8m'))
                }).filterMetadata('PcCoverage','not_less_than',ee.Number(Number(panelTextbox3.getValue()))).aside(print)
      return ee.ImageCollection(rema2m).merge(rema8m)
  }
}