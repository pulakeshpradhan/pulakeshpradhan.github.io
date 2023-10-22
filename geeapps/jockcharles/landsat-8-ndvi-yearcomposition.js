var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"); 
var lm = ui.Map();
lm.setControlVisibility(false);
var rm = ui.Map();
rm.setControlVisibility(false);  
lm.setControlVisibility({zoomControl: true});
lm.centerObject(ee.Geometry.Point([116.2827, 35.0722]), 8)
var app = {  
  data: {  
    lefts: "2019",  
    rights: "2020",  
    cloudScore: 50,  
    lndvi: null,
    rndvi: null,
    method: 'median' 
  },  
  config: {  
    ndviVisParam: {  
      min: -0.2,   
      max: 0.8,  
      palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +  
        '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'  
    }  
  },  
  ui: {}  
};  
var Landsat8 = {  
  //NDVI: (B05 - B04)/(B05 + B04)  
  NDVI: function(img) {  
    var ndvi = img.normalizedDifference(["B5","B4"]);  
    return img.addBands(ndvi.rename("NDVI"));  
  },  
  getL8C : function(startyear, cloud) {
    var startDate = startyear + "-1-1";
    var endDate = startyear + "-12-31";
    var dataset = l8.filterDate(startDate, endDate)  
                    .map(ee.Algorithms.Landsat.simpleCloudScore)  
                    .map(function(image) {  
                      return image.updateMask(image.select("cloud").lte(cloud));  
                    })  
                    .map(Landsat8.NDVI)  
    return dataset;  
  }  
};  
function searchvis(){
  var left8 = Landsat8.getL8C(app.data.lefts, app.data.cloudScore).select("NDVI");
  var right8 = Landsat8.getL8C(app.data.rights, app.data.cloudScore).select("NDVI");
  if (app.data.method=='mean'){
    var leftr = left8.mean();
    var rightr = right8.mean()
  }
  else if (app.data.method=='max'){
    var leftr = left8.max();
    var rightr = right8.max()
  }
  else {
    var leftr = left8.median();
    var rightr = right8.median()
  };
  if (app.data.lndvi !== null){
    lm.remove(app.data.lndvi)
  };
  app.data.lndvi = null;
  if (app.data.rndvi !== null){
    rm.remove(app.data.rndvi)
  };
  app.data.rndvi = null;
  app.data.lndvi = lm.addLayer(leftr, app.config.ndviVisParam, "NDVI-"+app.data.lefts);  
  app.data.rndvi = rm.addLayer(rightr, app.config.ndviVisParam, "NDVI-"+app.data.rights); 
};
function initUI(){
  app.ui = {};
  app.ui.title = {
    panel: ui.Panel({
      widgets:[
        ui.Label({
          value: "Landsat8 NDVI",
          style:{
            color: "0000ff",
            fontSize: "30px"
          }
        }),
        ui.Label({
          value: "produced by Ajimu",
          style:{
            color: "red",
            fontSize: "10px"
          }
        })
        ]
    })
  };
  var subtitle = ui.Label({
    value: "Year selector",
    style:{
      fontWeight: "bold",
      fontSize: "15px"
    }
  });
  var leftlabel = ui.Label("left year:");
  var leftsy = ui.Textbox({
    placeholder: "left year:",
    value: app.data.lefts,
    onChange: function(value){
      print("left year: " + value);
      app.data.lefts = value
    }
  });
  var rightlabel = ui.Label("right year:");
  var rightsy = ui.Textbox({
    placeholder: "right year:",
    value: app.data.rights,
    onChange: function(value){
      print("right year: " + value);
      app.data.rights = value
    }
  });  
  var cloudLabel = ui.Label("cloud cover:");  
  var cloudSlider = ui.Slider({  
    min:1,  
    max:100,  
    value:app.data.cloudScore,  
    step:1,  
    direction: "horizontal",  
    onChange: function(value) {  
      print("cloud cover is: "+ value);  
      app.data.cloudScore = parseInt(value, 10);  
    }  
  });  
  var methodselect = ui.Select({
    items: ['median', 'mean', 'max'],
    placeholder: "select method~",
    onChange: function(value){
      print("method is: "+ value);
      app.data.method = value
    }
  });
  var linker = new ui.Map.Linker([lm, rm]);
  var spPanel = ui.SplitPanel({
    firstPanel: lm,
    secondPanel: rm,
    orientation: 'horizontal',
    wipe: true
  });
  if (app.data.lndvi!==null){
    lm.addLayer(app.data.lndvi, app.config.ndviVisParam, "NDVI "+app.data.lefts);
    rm.addLayer(app.data.rndvi, app.config.ndviVisParam, "NDVI "+app.data.rights);
  };
  var startBtn = ui.Button({  
    label: "Process Start!",  
    onClick: searchvis  
  });  
  app.ui.process = {
    panel: ui.Panel({
      widgets: [
        subtitle,
        leftlabel, leftsy,
        rightlabel, rightsy,
        cloudLabel, cloudSlider,
        methodselect,
        startBtn
        ]
    })  
  };
  var main = ui.Panel({
    widgets:[
      app.ui.title.panel,
      app.ui.process.panel
      ],
      style: {width: "300px", padding: '8px'}
  });
  ui.root.clear();
  ui.root.insert(0, main);
  ui.root.insert(1, spPanel)
};
function main(){
  initUI();
};
main();