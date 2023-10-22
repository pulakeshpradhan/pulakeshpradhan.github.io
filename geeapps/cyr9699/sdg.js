/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ecoregions = ee.FeatureCollection("RESOLVE/ECOREGIONS/2017"),
    LandcoverSOC = ee.Image("users/cyr9699/NPP/LandcoverSOC"),
    Landcover = ee.Image("users/cyr9699/NPP/LDchange1"),
    NPPMKtrend = ee.Image("users/cyr9699/NPP/M-Ktrend1"),
    NPPstate = ee.Image("users/cyr9699/NPP/stateNPP"),
    ETMKtrend = ee.Image("users/cyr9699/ET/M-KtrendET"),
    ETstate = ee.Image("users/cyr9699/ET/stateET"),
    PerformanceNPP = ee.Image("users/cyr9699/NPP/PerformanceNPP"),
    PerformanceET = ee.Image("users/cyr9699/ET/performance82"),
    imageCollection = ee.ImageCollection("MODIS/006/MOD13A2"),
    image = ee.Image("users/cyr9699/MK/M-KtrendLAI");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
////define Data///////////////////////////////////////////////////////////////////
////  EVI  Data  /////////////////////////////////////////////////////////////////
var images={
 Data:{
 trend:null,
 state:null,
 performance:null,
 LDchange:null,
 LDchangeSOC:null,
 subkey:null,
 subkey2:null
  }
}
var app={
  ui: {
    titlePanel:null
  }
};
////data/////////////////////////////////////////////////////////////////////////
var NPPtrend=NPPMKtrend.remap([4,3,2,1],[3,1,1,2]).updateMask(PerformanceET)
var ETtrend=ETMKtrend.remap([4,3,2,1],[3,1,1,2]).updateMask(PerformanceET)
var stateNPP=NPPstate.updateMask(PerformanceET)
var stateET=ETstate.updateMask(PerformanceET)
var LDchange=Landcover.updateMask(PerformanceET)
var LDchangeSOC=LandcoverSOC.updateMask(PerformanceET)
//////combine 3//////////////////////////////////////////////////////////////////////////////////
var list=[[NPPtrend,stateNPP,PerformanceNPP],[ETtrend,stateET,PerformanceET]]
function combineProductivity(Trajectory,State,Performance){
var image=ee.Image()
var resultCLASS3=image.expression(
 " (trajectory==2)? 2"+//increase=3,stable=1,decrease=2
     ": (trajectory==1)&&(performance==2)&&(state==2)? 2"+
     ": (trajectory==1)&&(performance==1)&&(state==2)? 1"+//early sign of decline
      ": (trajectory==1)&&(performance==2)&&(state==1)? 1"+//stable but stress
        ": (trajectory==1)&&(performance==1)&&(state==1)? 1"+
           ": (trajectory==1)&&(state==3)? 1"+
               ": (trajectory==3)&&(state==2)&&(performance==2)? 2"+
                  ": (trajectory==3)&&((performance==1)||(state==1))? 3"+
                       ": (trajectory==3)&&(state==3)? 3"+
                          ":0",
  {trajectory:Trajectory,
   performance:Performance,
   state:State,
  }
  ).updateMask(PerformanceNPP)
  return resultCLASS3
}
////////////////////////////////////////////////////////////////////////////////////////////////
function combineall(Productivity,landcover,landcoversoc){
var image=ee.Image()
var resultCLASS7=image.expression(
 " (productivity==2)? 2"+//increase=3,stable=1,decrease=2
     ": (productivity==1)&&((landcover==2)||(soc==2))? 2"+
        ": (productivity==1)&&(landcover==1)&&(soc==1)? 1"+
           ": (productivity==1)&&(landcover==3)&&(soc==3)? 3"+
             ": (productivity==1)&&(landcover==3)&&(soc==3)? 3"+
                ": (productivity==1)&&(landcover==1)&&(soc==3)? 3"+
                  ": (productivity==1)&&(landcover==3)&&(soc==1)? 3"+
                     ": (productivity==3)&&((landcover==2)||(soc==2))? 2"+
                       ": (productivity==3)&&(landcover==1)&&(soc==1)? 3"+
                         ": (productivity==3)&&(landcover==1)&&(soc==3)? 3"+
                            ": (productivity==3)&&(landcover==3)&&(soc==1)? 3"+
                               ": (productivity==3)&&(landcover==3)&&(soc==3)? 3"+
                               ":0",
  {productivity:Productivity,
   landcover:landcover,
   soc:landcoversoc,
  }
  ).updateMask(PerformanceNPP)
  return resultCLASS7
}
/////show map////////////////////////////////////////////////////////////////////////////
function showMap(image,mapname){
Map.layers().set(0, layer)  
  var palette = [
  '#E0E0E0', //1
  '#FF0000', //2
  '#00FF00'//3
  ];
var layer = ui.Map.Layer(image,{min:1, max: 3,palette:palette},mapname);  
Map.layers().set(0, layer)  
}
/////trend///////////////////////////////////////////////////////////////////////////
// function initUI() {
//   app.ui = {};
/////////////////////////////////////////////////////////////////////////////  
// app.ui.title ={
// panel:ui.Panel({
//   style: {
//     width: '400px',
//     shown: true
//   },
//   layout: ui.Panel.Layout.flow('vertical'),
//   widgets: [
//     ui.Label({
//       value:'Global Land Degradation SDG15.3.1',
//       style: {
//             color: "ff0000",
//             fontSize: "30px"
//           },
//     })
//   ]
// });
// }
// }
////////////////////////////////////////////////////////////////////////////////////////////////
function initUI() {
  app.ui = {};
  /////////////////////////////////////
  app.ui.titlePanel = {
  panel:ui.Panel({
  style: {
    width: '400px',
    shown: true
  },
  layout: ui.Panel.Layout.flow('vertical'),
  widgets: [
    ui.Label({
      value:'SDG15.3.1 Tracking Tool',
      style: {
            color: "ff0000",
            fontSize: "30px"
          },
    })
  ]
               })
                      }
  ///////////////////////////////////////
  var buttonTrend = ui.Button({
  label: 'Calculate Trajectory',
  onClick: function() {
 showMap(images.Data.trend,"Trajectory")
  }
});
  var imageSelectTrend = ui.Select({
  items: [
    {label: 'NPP(MOD17A3.055: Terra Net Primary Production Yearly Global 1km)', value: NPPtrend},
    {label: 'NPP/ET(MOD16A2: MODIS Global Terrestrial Evapotranspiration 8-Day Global 1km)', value: ETtrend},
  ],
  onChange: function(value) {
images.Data.trend=value;
  }
}).setPlaceholder("Select Trajectory Data");
  var Productivitylable1 = ui.Label({
    value:"1. Sub-indicator Productivity",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  var Productivitylable2 = ui.Label({
    value:"1.1 Trajectory",
    style: {
      fontWeight: "bold",
    }
  });
  /////state///////////////////////////////////////////////////////////////////////////
  var buttonState = ui.Button({
  label: 'Calculate State',
  onClick: function() {
 showMap(images.Data.state,"State")
  }
});
  var imageSelectState = ui.Select({
  items: [
    {label: 'NPP(MOD17A3.055: Terra Net Primary Production Yearly Global 1km)', value: stateNPP},
    {label: 'NPP/ET(MOD16A2: MODIS Global Terrestrial Evapotranspiration 8-Day Global 1km)', value: stateET},
  ],
  onChange: function(value) {
images.Data.state=value;
  }
}).setPlaceholder("Select State Data");
  var Productivitylable3 = ui.Label({
    value:"1.2 State",
    style: {
      fontWeight: "bold",
    }
  });
  /////////////////////////////////////////////////////////////////////////////////////
  var Productivitylable4 = ui.Label({
    value:"1.3 Performance",
    style: {
      fontWeight: "bold",
    }
    });
  var imageSelectP = ui.Select({
  items: [
    {label: 'NPP(MOD17A3.055: Terra Net Primary Production Yearly Global 1km)', value: PerformanceNPP},
    {label: 'NPP/ET(MOD16A2: MODIS Global Terrestrial Evapotranspiration 8-Day Global 1km)', value: PerformanceET},
  ],
  onChange: function(value) {
images.Data.performance=value;
  }
}).setPlaceholder("Select Performance Data");
  var buttonP = ui.Button({
  label: 'Calculate Performance',
  onClick: function() {
 showMap(images.Data.performance,"Performance")
  }
});
  var Productivitylable5 = ui.Select({
  items: [
    {label: 'RESOLVE Ecoregions 2017',value: LDchangeSOC}
  ],
  onChange: function(value) {
  }
 }).setPlaceholder("Select Ecological Regions");
 ///combine sub indicator//////////////////////////////////////////////////////////////////////////////////////
  var Productivitylable6 = ui.Label({
    value:"1.4 Combine Productive sub-indicators",
    style: {
      fontWeight: "bold",
    }
    });
  var imageSelectcombine = ui.Select({
  items: [
    {label: 'NPP(MOD17A3.055: Terra Net Primary Production Yearly Global 1km)', value: 0},
    {label: 'NPP/ET(MOD16A2: MODIS Global Terrestrial Evapotranspiration 8-Day Global 1km)', value: 1},
  ],
  onChange: function(value) {
var list=[[NPPMKtrend,NPPstate,PerformanceNPP],[ETMKtrend,ETstate,PerformanceET]]    
images.Data.subkey=value;
  }
}).setPlaceholder("Select Sub-Indicator");
  var buttoncmbine = ui.Button({
  label: 'Calculate Combine',
  onClick: function() {
  var subimage= combineProductivity(list[images.Data.subkey][0],list[images.Data.subkey][1],list[images.Data.subkey][2])
  showMap(subimage,"Productivity")
  }
});
//var subimage= combineProductivity(list[images.Data.subkey][0],list[images.Data.subkey][0],list[images.Data.subkey][0])
  app.ui.performancePanel = {
    panel: ui.Panel({
      widgets: [
     Productivitylable1,Productivitylable2,imageSelectTrend,buttonTrend,
     Productivitylable3,imageSelectState,buttonState,
     Productivitylable4, imageSelectP,Productivitylable5,buttonP,
     Productivitylable6, imageSelectcombine,buttoncmbine
      ],
      style: {
        border : "1px solid black",
        stretch :'both'
      },
    })
  };
/////Land cover/////////////////////////////////////////////////////////////////////////////////
  var buttonLD = ui.Button({
  label: 'Calculate Landcover Change',
  onClick: function() {
  showMap(images.Data.LDchange,"Landcover")
  }
});
  var imageSelectLD = ui.Select({
  items: [
    {label: 'GlobalCover ESA-CCI(2000/2015)', value: LDchange}
  ],
  onChange: function(value) {
images.Data.LDchange=LDchange;
  }
}).setPlaceholder("Select Land Cover Data");
  var showLDlable = ui.Label({
    value:"2. Sub-indicator Land cover",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  app.ui.LDchangePanel = {
    panel: ui.Panel({
      widgets: [
      showLDlable,
      imageSelectLD,
      buttonLD,
      ],
      style: {
        border : "1px solid black"
      }
    })
  };
/////land cover soc/////////////////////////////////////////////////////////////////////////////////
  var LDchangeSOClable = ui.Label({
    value:"3. Sub-indicator Soil organic carbon",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  var buttonLDchangeSOC = ui.Button({
  label: 'Calculate Soil organic carbon',
  onClick: function() {
  showMap(images.Data.LDchangeSOC,"SOC")
  }
});
  var imageSelectLDchangeSOC = ui.Select({
  items: [
    {label: 'SoilGrid 250', value: LDchangeSOC}
  ],
  onChange: function(value) {
images.Data.LDchangeSOC=LDchangeSOC;
  }
}).setPlaceholder("Soil organic carbon Data");
  app.ui.LDsocchangePanel = {
    panel: ui.Panel({
      widgets: [
      LDchangeSOClable,
      imageSelectLDchangeSOC,
      buttonLDchangeSOC,
      ],
      style: {
        border : "1px solid black"
      }
    })
  };
  ///combine indicators///////////////////////////////////////////////////////////////////////
  var Combine = ui.Label({
    value:"4. Combining Indicators",
    style: {
      fontWeight: "bold",
      fontSize: "16px"
    }
  });
  var imageSelectcombineall = ui.Select({
  items: [
    {label: 'NPP(MOD17A3.055: Terra Net Primary Production Yearly Global 1km)', value: 0},
    {label: 'NPP/ET(MOD16A2: MODIS Global Terrestrial Evapotranspiration 8-Day Global 1km)', value: 1},
  ],
  onChange: function(value) {
  var list=[[NPPMKtrend,NPPstate,PerformanceNPP],[ETMKtrend,ETstate,PerformanceET]]    
  images.Data.subkey2=value;
  }
}).setPlaceholder("Select Sub-Indicator");
  var buttoncmbineall = ui.Button({
  label: 'Calculate Combine',
  onClick: function() {
  var subimage=combineProductivity(list[images.Data.subkey2][0],list[images.Data.subkey2][1],list[images.Data.subkey2][2])
  var allimage=combineall(subimage,LDchange,LDchangeSOC)
  showMap(subimage,"SDG15.3.1 Result")
  }
});
  app.ui.Combine = {
    panel: ui.Panel({
      widgets: [
      Combine,imageSelectcombineall,buttoncmbineall
      ],
      style: {
        border : "1px solid black"
      }
    })
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
initUI()
var main = ui.Panel({
      widgets: [
        app.ui.titlePanel.panel,
        app.ui.performancePanel.panel,
        app.ui.LDchangePanel.panel,
        app.ui.LDsocchangePanel.panel,
        app.ui.Combine.panel
      ],
      style: {width: "370px", padding: '8px'},
    });
ui.root.insert(0, main);
//subiallimagemage