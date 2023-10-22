var CLC2002 = ui.import && ui.import("CLC2002", "table", {
      "id": "users/murillop/CH2/Cobertura_Tierra_2000_2002_AA_6_classes_simply_GEE"
    }) || ee.FeatureCollection("users/murillop/CH2/Cobertura_Tierra_2000_2002_AA_6_classes_simply_GEE"),
    studyarea = ui.import && ui.import("studyarea", "table", {
      "id": "users/murillop/CH2/ch2_studyarea_simplify_wgs84"
    }) || ee.FeatureCollection("users/murillop/CH2/ch2_studyarea_simplify_wgs84"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "min": 1,
        "max": 6,
        "palette": [
          "0c090e",
          "f5ff49",
          "36b413",
          "b945ff",
          "5cff66",
          "3f77ff"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"min":1,"max":6,"palette":["0c090e","f5ff49","36b413","b945ff","5cff66","3f77ff"]},
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/murillop/2002"
    }) || ee.Image("users/murillop/2002"),
    vis1_6 = ui.import && ui.import("vis1_6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "min": 1,
        "max": 6,
        "palette": [
          "8a2c83",
          "f6efc1",
          "30791c",
          "f59053",
          "84b920",
          "236493"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"min":1,"max":6,"palette":["8a2c83","f6efc1","30791c","f59053","84b920","236493"]},
    PAs = ui.import && ui.import("PAs", "table", {
      "id": "users/murillop/COL_cartography/PA_5"
    }) || ee.FeatureCollection("users/murillop/COL_cartography/PA_5"),
    arevalo_2002 = ui.import && ui.import("arevalo_2002", "image", {
      "id": "users/murillop/CH2/arevalo_2002"
    }) || ee.Image("users/murillop/CH2/arevalo_2002"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/murillop_OSU/1988"
    }) || ee.Image("users/murillop_OSU/1988"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/murillop_OSU/1996"
    }) || ee.Image("users/murillop_OSU/1996"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/murillop_OSU/2002"
    }) || ee.Image("users/murillop_OSU/2002"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/murillop_OSU/2014"
    }) || ee.Image("users/murillop_OSU/2014"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/murillop_OSU/2018"
    }) || ee.Image("users/murillop_OSU/2018"),
    puntos = ui.import && ui.import("puntos", "table", {
      "id": "users/murillop/CH2/UCDP"
    }) || ee.FeatureCollection("users/murillop/CH2/UCDP");
var Aubergine= 
[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
// Load the secondary collection: WRS-2 polygons.TILES. 
var wrs = ee.FeatureCollection('ft:1_RZgjlcqixp-L9hyS6NYGqLaKOlnhSC35AB5M5Ll');
// Define a spatial filter as geometries that intersect.
var spatialFilter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 10
});
// Define a save all join.
var saveAllJoin = ee.Join.saveAll({
  matchesKey: 'scenes',
});
var study_fc = studyarea;
var intersectJoined = saveAllJoin.apply(study_fc, wrs, spatialFilter);
// Get the result and display it.
var intersected = ee.FeatureCollection(ee.List(intersectJoined.first().get('scenes')));
//Map.addLayer(intersected, {color: 'grey'}, 'WRS-2 polygons', false);
//
// var sld_intervals_murillo =
// '<RasterSymbolizer>' +
// ' <ColorMap  type="intervals" extended="false" >' +
//     '<ColorMapEntry color="#21b8d6" quantity="0" label="Other to other"/>' +
//     '<ColorMapEntry color="#30791c" quantity="3" label="Forest"/>' +
//     '<ColorMapEntry color="#f59053" quantity="4" label="Grassland"/>' +
//     '<ColorMapEntry color="#8a2c83" quantity="1" label="Urban+other"/>' +
//     '<ColorMapEntry color="#f6efc1" quantity="2" label="Pasture/cropland"/>' +
//     '<ColorMapEntry color="#84b920" quantity="5" label="Secondary forest"/>' +
//     '<ColorMapEntry color="#236493" quantity="6" label="Water"/>' +
//     '<ColorMapEntry color="#ff000c" quantity="8" label="Forest to pastures"/>' +
//     '<ColorMapEntry color="#d47fd4" quantity="9" label="Forest to secondary forest"/>' +
//     '<ColorMapEntry color="#bbff00" quantity="11" label="Gain of secondary forest"/>' +
//     '<ColorMapEntry color="#ff00ff" quantity="13" label="All to unclassified"/>' +
//     '<ColorMapEntry color="#47f0b2" quantity="14" label="Loss of secondary forest"/>' +
//     '<ColorMapEntry color="#000000" quantity="15" label="True NoData"/>' +
//     '<ColorMapEntry color="#630045" quantity="16" label="Buffer"/>' +
//   '</ColorMap>' +
// '</RasterSymbolizer>';
var sld_intervals =
'<RasterSymbolizer>' +
 ' <ColorMap  type="intervals" extended="false" >' +
    '<ColorMapEntry color="#21b8d6" quantity="0" label="Other to other"/>' +
    '<ColorMapEntry color="#30791c" quantity="1" label="Forest"/>' +
    '<ColorMapEntry color="#f59053" quantity="2" label="Grassland"/>' +
    '<ColorMapEntry color="#8a2c83" quantity="3" label="Urban+other"/>' +
    '<ColorMapEntry color="#f6efc1" quantity="4" label="Pasture/cropland"/>' +
    '<ColorMapEntry color="#84b920" quantity="5" label="Secondary forest"/>' +
    '<ColorMapEntry color="#236493" quantity="6" label="Water"/>' +
    '<ColorMapEntry color="#ff000c" quantity="8" label="Forest to pastures"/>' +
    '<ColorMapEntry color="#d47fd4" quantity="9" label="Forest to secondary forest"/>' +
    '<ColorMapEntry color="#bbff00" quantity="11" label="Gain of secondary forest"/>' +
    '<ColorMapEntry color="#ff00ff" quantity="13" label="All to unclassified"/>' +
    '<ColorMapEntry color="#47f0b2" quantity="14" label="Loss of secondary forest"/>' +
    '<ColorMapEntry color="#000000" quantity="15" label="True NoData"/>' +
    '<ColorMapEntry color="#630045" quantity="16" label="Buffer"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte()
// Paint the edges with different colors, display.
var PA = empty.paint({
  featureCollection: PAs,
  color: 'blue',
  width: 2
});
//Map.addLayer(ee.Image(arevalo_2002).sldStyle(sld_intervals), {}, '2002_CCDC');
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////Add a legend/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px', 
    backgroundColor: 'FFFFFF'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Land Cover',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0', 
    backgroundColor: 'FFFFFF'
    }
});
// Add the title to the panel
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
        style: {
          margin: '0 0 4px 6px', 
          backgroundColor: 'FFFFFF'
        }
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
        style: {backgroundColor: 'FFFFFF'}
      });
};
//  Palette with the colors
var palette =["8a2c83","f6efc1","30791c","f59053","84b920","236493"];
 // name of the legend
var names = ['Urban', 'Pastures(cattle/coca)', 'Forest', 'Grasslands(natural)', 'Forest regrowth', 'Water'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Set up display
Map.setOptions('Aubergine', {'Aubergine': Aubergine}).setControlVisibility(false, true, true, true, true, false)
Map.style().set('cursor', 'crosshair');
/////////////////////////////////////////////////////////////////
//Build all classified years into an image 
var startYr = 1988
var endYr = 2019
var lc = ee.ImageCollection([])
//https://code.earthengine.google.com/?asset=users/esteban_SUPERSPECTRO/to_publish
for (var year = startYr; year<=endYr; year++){
  //var class_img = ee.Image("users/esteban_SUPERSPECTRO/to_publish_non_majority/"+year).set('year',year).rename('classification')
  var class_img = ee.Image("users/esteban_SUPERSPECTRO/to_publish_with_majority/"+year).set('year',year).rename('classification')
  lc= lc.merge(ee.ImageCollection([class_img]))}
  /////////////////////////////////////////////////////
var rgb = lc.map(function(img) { 
    return img.visualize({
    min: 1,
    max: 6,
    palette: ["8a2c83","f6efc1","30791c","f59053","84b920","236493"],
    forceRgbOutput: true
  }).clip(studyarea.geometry())  //Functional //ch2_studyarea
})
var gifParams = {
  'region': studyarea.geometry(),
  'dimensions': 256,
  'crs': 'EPSG:32618',
  'framesPerSecond': 2,
  'format': 'gif'
};
// set position of panel
var video1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '0px',
    //padding: '8px 15px', 
    backgroundColor: 'ffffff'
  }
});
var thumbLabel = ui.Label('Small Video Full Study Area. Serie: 1988-2018\n\nIf the video does not render...Just Refresh...', {whiteSpace:'pre'});
var gistLabel = ui.Label({
    value: 'Click to see TIMEMACHINE video',
  });
gistLabel.setUrl('http://emapr.ceoas.oregonstate.edu/pages/timemachine2/view.html');
// Add the title to the panel
//video1.add(legendTitle);
Map.add(video1.add(thumbLabel).add(ui.Thumbnail(rgb, gifParams)).add(gistLabel))
//////////////////////////////////////////////////////////////////
var size = lc.size()
var lista = lc.toList(size)
var y1988 = ee.Image(lista.get(0)); var y2002 = ee.Image(lista.get(14));var y2008 = ee.Image(lista.get(20));var y2018 = ee.Image(lista.get(30))
var y2014 = ee.Image(lista.get(26))
Map.addLayer(y1988,vis1_6, '1988_LT', false)
Map.addLayer(y2002,vis1_6, '2002_LT')
Map.addLayer(y2008,vis1_6, '2008_LT', false)
Map.addLayer(y2014,vis1_6, '2014_LT', false)
Map.addLayer(y2018,vis1_6, '2018_LT', false)
Map.centerObject(y1988,8)
//Map.addLayer(image8,{}, '2002_LT_v3')
//Map.addLayer(image10,{}, '2018_LT_v3')
//Convert feature CORINE LAND COVER to image
var ppp= ee.List(["ffffff", "312a2a", "ffd04c", "2cde42", "ff46f0", "75ffdf", "2421ff"]); //ppp includes two colors at the beggining  because class starts in 1 NOT in ZERO
var classes_CLC = ee.Image().byte().paint(CLC2002, "class").rename("class");
//Map.addLayer(classes_CLC,{min:0, max:6, palette: ['FF0000', "8a2c83","f6efc1","30791c","f59053","84b920","236493"]}, 'Corine Land Cover 2002', false)
Map.addLayer(PA, {palette:'red'}, 'Protected Areas');
Map.addLayer(puntos,{},'Fatalities-GED')