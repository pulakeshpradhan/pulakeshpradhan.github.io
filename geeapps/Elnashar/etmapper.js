var f = require('users/Elnashar/MyProjects:ETMapper');
var optBands  = ['B','G','R','NIR','SWIR1','SWIR2'];
// Visualization parameters
var True_viz  = {min:0, max:0.12, bands:['R','G','B']};
var False_viz = {min:0, max:0.50, bands:['SWIR1','NIR','R']};
var ETf_viz  = {min:0.0, max:1.05, palette:['Red','SandyBrown','Yellow','LimeGreen','DarkBlue']};
var ETa_viz  = {min:0.0, max:10.0, palette:['DarkRed','SandyBrown','Yellow','LimeGreen','DarkBlue']};
var NDVI_viz = {min:0.0, max:1.00, palette:['FFFFFF','CE7E45','DF923D','F1B555','FCD163','99B718','74A901','66A000','529400','3E8601','023B01','012E01','011D01','011301']};
//////////////////////////////////////////////// GUI
function buildImagesList(items){
    ImagesList = ui.Select({
      items:items,      
      placeholder:'List of images',
      style:{color:'red', width:'100%', margin:'auto', position:'top-center'},
    }); 
  return ImagesList;
}
function buildImageSearch(ImagesList){
  ImageSearch = ui.Panel({
    layout:ui.Panel.Layout.flow('vertical'),
    style:{backgroundColor:"#367bf0", margin:'2px 5px', border:'0.5px solid black'},
    widgets:[
      ui.Label({
        value:'Search for images',
        style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'},
      }),
      ui.Panel({
        layout:ui.Panel.Layout.flow("vertical"),
        style:{position: 'top-center'},
        widgets:[
          ui.Label({value:"Select your Landsat image.",
          style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'}})        
          ]
      }),
      ui.Panel({
        layout:ui.Panel.Layout.flow("horizontal"),
        style:{position: 'top-center', margin: 'auto', width:'100%'},
        widgets:[
          ui.Panel({
            layout:ui.Panel.Layout.flow("horizontal"),
            style:{position:'top-center', margin:'auto'},
            widgets:[
              ImagesList,
            ]          
          })
          ]
        })
    ]
  });
  return ImageSearch;
}
function addDraw(Point){
  drawingTools.clear();
  drawingTools.addLayer([Point], 'Point', 'green');
}
var pointClick = null;
var ImagesList = null;
var ImageSearch = null;
var panel = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{maxWidth:'550px'},
});
var map = ui.Map({
  // center:{lon:30, lat:29.5, zoom:2},
  center:{lon:9.671617489666303, lat:51.69229895251039, zoom:9},
});
map.style().set('cursor', 'crosshair');
var drawingTools = map.drawingTools();
drawingTools.getShown();
drawingTools.setDrawModes([]);
var Title = ui.Label({
  value:'ETMapper (experimental)', 
  style:{fontSize:'20px', fontWeight:'normal', color:"green", textAlign:'center',  margin:'auto', whiteSpace:'pre'},
});
panel.add(Title); 
var Subtitle = ui.Label({
  value:'EvapoTranspiration (ET) Mapper',
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'},
});
panel.add(Subtitle);
var WritingBy = ui.Label({
  value:'By Abdelrazek Elnashar',
  style:{fontSize:'20px', fontWeight:'normal', color:"blue", textAlign:'center', margin:'auto', whiteSpace:'pre'},
  targetUrl:'https://orcid.org/0000-0001-8008-5670',
});
panel.add(WritingBy);
var InstructionsPanel = ui.Panel({
    layout:ui.Panel.Layout.flow('vertical'),
    style:{position:'top-center', width:'40%', height:'auto',},
    widgets:[
      ui.Label({value:'Instructions', style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'}, }),
      // ui.Label({value:'1 – Select data range to', style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'}}), 
      ]
});
var InstructionsButton = ui.Button({
  label:'Instructions',
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'}, 
  onClick: function(){
    map.remove(FAQPanel);
    map.remove(Inspector);
    map.add(InstructionsPanel);
  },
});
var CloseInstruction = ui.Button({
  label:'Close',
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'},
  onClick:function(){
    map.remove(InstructionsPanel);
  },
});
InstructionsPanel.add(CloseInstruction);
var FAQPanel = ui.Panel({
    layout:ui.Panel.Layout.flow('vertical'),
    style:{position:'top-center', width:'40%', height:'auto',},
    widgets:[
      ui.Label({value:'Frequently Asked Questions (FAQ)', style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'}, }),
      ],
});  
var FAQButton = ui.Button({
  label:'FAQ',
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'},
  onClick: function(){
    map.remove(InstructionsPanel);
    map.remove(Inspector);
    map.add(FAQPanel);
  },
});
var CloseFAQ = ui.Button({
  label:'Close',
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'}, 
  onClick:function(){
    map.remove(FAQPanel);
  },
});
FAQPanel.add(CloseFAQ);
var PanelButtons = ui.Panel({
  layout:ui.Panel.Layout.flow('horizontal'),
  widgets:[InstructionsButton, FAQButton],
});
panel.add(PanelButtons);
var startDate = ui.Textbox({
  value:"2020-01-01",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'center', margin:'auto'},
}); 
var endDate = ui.Textbox({
  value:"2020-12-31",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'center', margin:'auto'},
}); 
var DataSearch = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor:"#367bf0", margin:'2px 5px', border:'0.5px solid black'},
  widgets:[
    ui.Label({
      value:'Data search',
      style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'},
    }),
    ui.Panel({
      layout:ui.Panel.Layout.flow("vertical"),
      style:{position: 'top-center'},
      widgets:[
        ui.Label({value:"Change the date range: YYYY-MM-DD.",
        style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'}})        
        ]
    }),
    ui.Panel({
      layout:ui.Panel.Layout.flow("horizontal"),
      style:{position: 'top-center', margin:'auto', width:'100%'},
      widgets:[
        ui.Panel({
          layout:ui.Panel.Layout.flow("horizontal"),
          style:{position:'top-center', margin:'auto'},
          widgets:[
            startDate,
            endDate
          ]          
        })
        ]
      })
  ]
});
panel.add(DataSearch);
var lonText = ui.Textbox({
  value:"Longitude",
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'center', margin:'auto'},
}); 
var LatText = ui.Textbox({
  value:"Latitude" ,
  style:{fontSize:'20px', fontWeight:'normal', color:"red", textAlign:'center', margin:'auto'},
}); 
var LocText = ui.Button({
  label:'Search'    ,
  style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto'},
}); 
var LocationSearch = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style:{backgroundColor:"#367bf0", margin:'2px 5px', border:'0.5px solid black'},
  widgets:[
    ui.Label({
      value:'Location information',
      style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'},     
    }),
    ui.Panel({
      layout:ui.Panel.Layout.flow("vertical"),
      style:{position: 'top-center'},
      widgets:[
        ui.Label({value:"Click on the map to select a location.",
        style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'}})        
        ]
    }),
    ui.Panel({
      layout:ui.Panel.Layout.flow("vertical"),
      style:{position:'top-center', margin:'auto'},
      widgets:[
        ui.Panel({
          layout:ui.Panel.Layout.flow("horizontal"), 
          style:{position:'top-center', margin:'auto'},
          widgets:[
            lonText,
            LatText        
            ]
        }),
        LocText,
        ]
    }),    
    ]
});
panel.add(LocationSearch);
var Inspector = ui.Panel([ui.Label('Click on the map to get a location ETa value(s).')]);
map.onClick(function(coords){
  lonText.setValue(coords.lon);
  LatText.setValue(coords.lat);
  pointClick = ee.Geometry.Point([coords.lon, coords.lat]);
  addDraw(pointClick);
});
LocText.onClick(function(){
  var locLon = lonText.getValue();
  var locLat = LatText.getValue();
  if ((locLon !== 'Longitude') & (locLat !== 'Latitude')){
    map.layers().reset();
    map.remove(Inspector);
    panel.remove(ImagesList);
    panel.remove(ImageSearch);
    var Point = ee.Geometry.Point([Number(locLon), Number(locLat)]);
    addDraw(Point);
    map.centerObject(Point, 9);
    var geometry = Point;
    var st = ee.Date(startDate.getValue());
    var en = ee.Date(endDate.getValue());
    var Sensor     = ['L8'];
    var Path       = false;
    var Row        = false;
    var CloudCover = false;
    var CloudMask  = true;
    var RemoveEdges= true;
    var OTBs = f.getLANDSAT(geometry, st, en, Sensor, Path, Row, CloudCover, CloudMask, RemoveEdges).map(f.setTimes).map(f.setIndices).map(f.setAs);
    OTBs.evaluate(function(col){
      var items = []; 
      col.features.forEach(function(feature){ 
      var label = feature.properties.LANDSAT_SCENE_ID + "/ "  + feature.properties.Date + "/ Cloud " + feature.properties.CLOUD_COVER + "%";
      items.push(label);
      }); 
      ImagesList = buildImagesList(items);
      ImageSearch = buildImageSearch(ImagesList);
      panel.add(ImageSearch);
      ImagesList.onChange(function(ID){
        map.layers().reset();
        map.remove(Inspector);
        map.add(Inspector);
        var image = OTBs.filter(ee.Filter.eq('LANDSAT_SCENE_ID', ID.split("/")[0])).first();
        var ETMapper = f.getETMapper(image);
        map.addLayer(image.select(optBands), False_viz, 'Image', 0, 1);
        map.addLayer(image.select('NDVI'), NDVI_viz, 'NDVI', 1, 1);
        var ETa24 = ['ETa24_SEBAL', 'ETa24_METRIC','ETa24_SSEBop','ETa24_Median'];
        function getShownValue(){
          map.onClick(function(){
            Inspector.widgets().set(0, ui.Label({value:'Loading value(s)...', style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'}}));
            var sample = ETMapper.select(ETa24).sample(pointClick, 30);
            sample = sample.first().toDictionary().map(function scale(key, value){
              var list = [];
              var trueCase  = ee.String(ee.String(key).split('_').get(1)).cat(ee.String(':')).cat(ee.String(value).slice(0, 4));
              var falseCase = ee.String(ee.String(key).split('_').get(1)).cat(ee.String(':None'));
              list.push(ee.String(ee.Algorithms.If(ee.Number(value).gte(0), trueCase, falseCase)));
              return list;
            });
            sample = ee.String(sample.values().flatten().join('; '));
            sample.evaluate(function(value){
              Inspector.widgets().set(0, ui.Label({value:value, style:{fontSize:'20px', fontWeight:'normal', color:"black", textAlign:'center', margin:'auto', whiteSpace:'pre'}}));
            });
          });
        }
        getShownValue();
      });
    });
  }
  else{
    map.remove(Inspector);
    map.add(Inspector);
    Inspector.widgets().set(0, ui.Label({value:'Click on the map to select a location or fill location information (Longitude and Latitude).', style:{color:'red'}}));
  }
});
ui.root.clear();
ui.root.add(panel);
ui.root.add(map);