/** visualize Georgia Land Cover Maps
 * 
 */
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-85.5889892578125, 34.511031539914576],
          [-85.5889892578125, 32.819542180144346],
          [-82.4578857421875, 32.819542180144346],
          [-82.4578857421875, 34.511031539914576]]], null, false); 
var makeLegendEntry = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0',
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
  });
}
var makeLegend = function(title, colors) {
  var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })
  var lgt = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  })
  legend.add(lgt)
  for (var k in colors) {
    legend.add(makeLegendEntry(colors[k], k))
  }
  return legend
}
var buildColorPalette = function(colors) {
  var c = []
  for (var k in colors) {
    c.push(colors[k])
  }
  return c.join(',')
}
var nlcdLegends = {
  "Water": "blue",
  "Developed": "red",
  "Barren": "gray",
  "Forest": "darkgreen",
  "Shrub": "brown",
  "Herbaceous": "green",
  "Cultivated": "yellow",
  "Wetlands": "cyan"
}
var tsLandCovers = {
  "Barren": 'gray',
  "Impervious": 'red',
  "Grass/forb/herb": 'green',
  "Water": 'blue',
  "Shrubs": 'brown',
  "Trees": 'darkgreen'
}
var tsLandUses = {
  "Agriculture": 'yellow',
  "Developed": 'red',
  "Forest": 'darkgreen',
  "Non-forest wetland": 'cyan',
  "Other": "blue",
  "Rangeland": "brown"
}
// var legend = makeLegend('Land Cover', nlcdLegends)
// Map.add(legend)
// print(Object.keys(nlcdLegends).length)
// var image = ee.Image("projects/LCMS/Georgia_CCDC_LC/northcentral_ts_nlcd_with_ccdc_1994");
// Map.addLayer(image, {min: 1, max: 8, palette: buildColorPalette(nlcdLegends)})
/************* Main Application Object *****************/
var app = {}
app.initialize = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.OPTIONS = [
    {
      label: "TimeSync Land Cover",
      value: {
        asset: 'projects/LCMS/Georgia_CCDC_LC/northcentral_ts_landcover_with_ccdc_',
        legends: tsLandCovers
      }
    },
    {
      label: "TimeSync Land Use",
      value: {
        asset: 'projects/LCMS/Georgia_CCDC_LC/northcentral_ts_landuse_with_ccdc_',
        legends: tsLandUses
      }
    },
    {
      label: "NLCD Land Cover",
      value: {
        asset: 'projects/LCMS/Georgia_CCDC_LC/northcentral_ts_nlcd_with_ccdc_',
        legends: nlcdLegends
      }
    }
  ]
  app.years = function() {
    var vals = []
    for (var y = 2017; y >= 1986; y--) {
      vals.push({label: ''+y, value: ''+y})
    }
    return vals
  }
  app.mapSet = null
  app.currentYear = 2017
}
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Georgia Land Cover Viewer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you visualization of variants of Land Cover maps.')
    ])
  };
  app.LandcoverPicker = {
    select: ui.Select({
      items: app.OPTIONS,
      placeholder: 'Select Classification',
      onChange: app.refreshMapset
    })
  }
  app.LandcoverPicker.panel = ui.Panel({
    widgets: [
      ui.Label('Classification', {fontWeight: 'bold'}),
      ui.Panel([
        app.LandcoverPicker.select
      ])
    ],
    style: app.SECTION_STYLE
  })
  app.YearPicker = {
    select: ui.Select({
      items: app.years() ,
      placeholder: 'Select Year',
      onChange: app.refreshMapYear
    })
  }
  app.YearPicker.panel = ui.Panel({
    widgets: [
      ui.Label('Year', {fontWeight: 'bold'}),
      ui.Panel([
        app.YearPicker.select
      ])
    ],
    style: app.SECTION_STYLE
  })
  app.legend = ui.Panel()
}
app.createHelper = function() {
  //load new classification
  app.refreshMapset = function() {
    app.mapSet = app.LandcoverPicker.select.getValue()
    app.legend.clear()
    app.legend.add(makeLegend('Legend', app.mapSet.legends))
    Map.clear()
    app.YearPicker.select.setValue(null)
  }
  //load the selected classification year
  app.refreshMapYear = function() {
    Map.clear()
    app.currentYear = app.YearPicker.select.getValue()
    if (!app.currentYear) {
      return;
    }
    var img = ee.Image(app.mapSet.asset + app.currentYear)
    var vis = {min: 1, max: Object.keys(app.mapSet.legends).length, palette: buildColorPalette(app.mapSet.legends)}
    Map.addLayer(img, vis, app.currentYear)
  }
}
app.boot = function() {
  app.initialize()
  app.createHelper()
  app.createPanels()
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.LandcoverPicker.panel,
      app.YearPicker.panel,
      app.legend
    ],
    style: {width: '320px', padding: '8px'}
  })
  ui.root.insert(0, main)
}
app.boot()
Map.centerObject(geometry)