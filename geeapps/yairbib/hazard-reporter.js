var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
// namespace for our application
var app ={}
app.Panels = function(){
    /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'דיווח מפגעים',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('אפליקציה זו מאפשרת דיווח וצפיה במפגעים.')            
    ])
  };
  app.hazard = {
      select: ui.Select({
      items: app.hazardTyeps,
      placeholder: 'בחר סוג',
    })
  }
  app.hazard.panel = ui.Panel({
    widgets: [
      ui.Label('בחר סוג מפגע', {fontWeight: 'bold'}),
      app.hazard.select
    ],
    style: app.SECTION_STYLE
  });
  app.priority = {
      select: ui.Select({
      items: app.priorityTyeps,
      placeholder: 'בחר דחיפות',
    })
  }
  app.priority.panel = ui.Panel({
    widgets: [
      ui.Label('בחר דחיפות', {fontWeight: 'bold'}),
      app.priority.select
    ],
    style: app.SECTION_STYLE
  });
  app.description = {
      textBox: ui.Textbox({
      placeholder: 'הוסף כמה מילים',
    })
  }
  app.description.panel = ui.Panel({
    widgets: [
      ui.Label('תאר מפגע', {fontWeight: 'bold'}),
      app.description.textBox
    ],
    style: app.textbox_style
  });
  app.repotersDetailes = {
      textBox: ui.Textbox()
  }
  app.repotersDetailes.panel = ui.Panel({
    widgets: [
      ui.Label('פרטי המדווח', {fontWeight: 'bold'}),
      app.repotersDetailes.textBox
    ],
    style: app.textbox_style
  });
  app.contactDetailes = {
      textBox: ui.Textbox()
  }
  app.contactDetailes.panel = ui.Panel({
    widgets: [
      ui.Label('פרטים ליצירת קשר', {fontWeight: 'bold'}),
      app.contactDetailes.textBox
    ],
    style: app.textbox_style
  });
  app.report = {
    button: ui.Button({
      label: 'דווח',
      // React to the button's click event.
      onClick: function() {
        var today = new Date();
        var d = ee.Date(today)
        var location = ui.util.getCurrentPosition(app.point) 
        var hazard = app.hazard.select.getValue() || ''
        var priority = app.priority.select.getValue() || ''
        var description = app.description.textBox.getValue() || ''
        var repotersDetailes = app.repotersDetailes.textBox.getValue() || ''
        var contactDetailes = app.contactDetailes.textBox.getValue() || ''
        var feature = ee.Feature(app.currentPoint ,{
          'type': hazard, 
          'date': d, 
          'priority': priority,
          'repotersDetailes': repotersDetailes, 
          'contactDetaile': contactDetailes
        });
        app.hazardPoints && app.hazardPoints.push(feature)
        }
      })
    }
      /* Save report. */
  app.report.panel = ui.Panel({
        widgets: [
          app.report.button
        ],
        style: app.SECTION_STYLE
      });
    };
  app.hazardsToDispaly = {
      select: ui.Select({
      items: ['שריפה', 'פשע', 'אבנים בכביש','מחבל' ,'בור בכביש', 'חשמל חשוף' , 'גדר חסומה'],
      placeholder: 'בחר סוג',
    })
  }
  app.hazardsToDispaly.panel = ui.Panel({
    widgets: [
      ui.Label('בחר סוג מפגע להצגה', {fontWeight: 'bold'}),
      app.hazardsToDispaly.select
    ],
    style: app.SECTION_STYLE
  });
  app.filterByHazard = {
      button: ui.Button({
        label: 'סנן לפי מפגעים',
        onClick: function() {
          var type = app.hazardsToDispaly.select.getValue()
          print('type:', type)
          Map.clear()
          var pointsToDisplay = app.hazardPoints.filter(function(e) {
            var property = e.getString('type').getInfo();
            return property === type
          })
          Map.addLayer(ee.FeatureCollection(pointsToDisplay))
        }
      })
    }
  app.filterByHazard.panel = ui.Panel({
        widgets: [
          app.filterByHazard.button
        ],
        style: app.SECTION_STYLE
      });
  var RANDOM_HAZARD_AMOUNT = 50;
  var craeteRandomHazards = function() {
    var region = ee.Geometry.Rectangle(
    {coords: [35.2008, 31.7968, 35.2331, 31.7798], geodesic: false});
    // Generate 50 random points with the region.
    var randomPoints = ee.FeatureCollection.randomPoints(
    {region: region, points: 50, seed: 0, maxError: 1});
    randomPoints= randomPoints.toList(50);
    var today = new Date();
    var d = ee.Date(today)
    for(var i=0; i<RANDOM_HAZARD_AMOUNT; i++){
        var hazard = app.hazardTyeps[i%app.hazardTyeps.length];
        var location = randomPoints.get(i);
        var priority = app.priorityTyeps[i%app.priorityTyeps.length];
        location = ee.Feature(location).geometry();
        var feature = ee.Feature(location,{
          type: hazard, 
          date: d, 
          priority: priority,
          repotersDetailes: 'Yair Biber', 
          contactDetaile: '0587-111-575'
        })
        print(feature)
        app.hazardPoints.push(feature)
      }
       Map.addLayer(ee.FeatureCollection(app.hazardPoints))
  }
  app.test = {
      button: ui.Button({
        label: 'הזן מפגעים לדוגמא',
        onClick: craeteRandomHazards
      })
    }
    app.test.panel = ui.Panel({
        widgets: [
          app.test.button
        ],
        style: app.SECTION_STYLE
      });
// location event handler  
app.point = function(point){
  app.currentPoint = point
  Map.centerObject(point)
  Map.addLayer(point)
}
// in case we got an error from getlocation
app.oops = function (error) {
  // FOR Students:
  // in case we cant get the location 
  // add panel to manually insert location
  // by clicking the map (hit: Map.onClick)
  print(error);
}
// add aditional functions
app.Helpers = function(){
}
// application data
app.Data = function(){
    app.SECTION_STYLE = {margin: '20px 0 0 0'};
    app.textbox_style = {margin: '20px 0 0 0', stretch: 'both'}
    app.hazardTyeps = ['שריפה', 'פשע', 'אבנים בכביש','מחבל' ,'בור בכביש', 'חשמל חשוף' , 'גדר חסומה']
    app.priorityTyeps = ['לא דחוף', 'דחוף', 'דחוף מאוד' , 'קריטי']
    app.hazardPoints = []
}
// start the app
app.boot = function() {
  Map.setCenter(35.2, 31.78, 18);
  // get current user location 
  var location = ui.util.getCurrentPosition(app.point)
  app.Data()
  app.Panels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.hazard.panel,
      app.priority.panel,
      app.description.panel,
      app.repotersDetailes.panel,
      app.contactDetailes.panel,
      app.report.panel,
      app.hazardsToDispaly.panel,
      app.filterByHazard.panel,
      app.test.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
};
app.boot();