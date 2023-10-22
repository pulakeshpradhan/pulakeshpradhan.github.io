///////////////////////////////////////////////////////////////
//      2) Begin setting up map appearance and app layers    //
///////////////////////////////////////////////////////////////
//2.1) Set up general display
//Set up a satellite background
Map.setOptions('Satellite')
Map.setOptions('Aubergine', {Aubergine: Aubergine()}).setControlVisibility(null, true, true, true, true, false);  //darkMap //dark // GRAYMAP //Aubergine --> Change by these themes (Base maps)
//Map.setCenter(-72.0597, 2.3355, 12);
//Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
      //But here we change REMAP to HAVE a final order!!!
      /// 3 = stable forest, 5 = stable cattle 7 = stable coca
      /// 2 = forest to cattle 1 = forest to coca
      /// 6 = cattle to forest ; 4 = cattle to coca
      /// 9 = coca to forest ; 8 = coca to cattle  ///11 = urban
var vis = {"opacity":1,"bands":["transitions"], min:1 , max:6,
"palette":['#e41a1c','#13D4CA', '#ff7f00','#EFEBE6','#f781bf', '#55E05E']};
var visx = {"opacity":1,"bands":["transitions"],
"palette":['#e41a1c','#377eb8', '#000000', '#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999', "#08306b", "8856a7"]};
var OR = ee.Geometry.Point([-76.81918143894477, 0.5399353772701594]);
Map.centerObject(OR, 12)
var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
// Now we can spatially and temporally filter our imagery by specific date, place, and propertyvar L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
var filtered = L8.filterDate('2019-01-01', '2019-12-31') // temporal filter
                 .filterBounds(OR) // spatial filter
                 .filterMetadata("CLOUD_COVER",'less_than',40) // property filter
                 .select (0,1,2,3,4,5,6,7)
                 .sort('"CLOUD_COVER"')
                 //.select ("B1", "BQA")
//print(filtered, 'filtered')      
// Next, let's process RGB on the 1st image and visualize
var false_vis = {min:9000, max:20000, bands:['SR_B6','SR_B5','SR_B3']}
var PA5 = ee.FeatureCollection('users/murillop/COL_cartography/PA_5');
var nukak = ee.FeatureCollection("WCMC/WDPA/current/polygons").filter(ee.Filter.inList('ORIG_NAME', ['Nukak']))
var fumigacion = ee.FeatureCollection("users/murillop/Forensic_Guaviare/fumigation_lines");
var parques= PA5.merge(nukak)
parques = parques.map(function(f){return f.simplify(100)})
var empty = ee.Image().byte();
var contours = empty.paint({
  featureCollection: parques,
  color:1,
  width:3
}); 
var fumigacion2 = empty.paint({
  featureCollection: fumigacion,
  // color:5,
  // width:6
}); 
//2.3) Create variables for GUI layers for each layer
//We set each layer to "false" so the user can turn them on later
var y1989 = ee.Image("users/murillop/CH3/FinalTransitionsCocaApp/transition_1989");
var y2009 = ee.Image("users/murillop/CH3/FinalTransitionsCocaApp/transition_2009");
var y2019 = ee.Image("users/murillop/CH3/FinalTransitionsCocaApp/transition_2019");
var y1989_1 = y1989.select('transitions').remap([1,2,3,4,5,6,7,8,9,10,11], [1,2,0,0,3,6,4,5,6,0,0]).selfMask().rename('transitions')
var y2009_1 = y2009.select('transitions').remap([1,2,3,4,5,6,7,8,9,10,11], [1,2,0,0,3,6,4,5,6,0,0]).selfMask().rename('transitions')
var y2019_1 = y2019.select('transitions').remap([1,2,3,4,5,6,7,8,9,10,11], [1,2,0,0,3,6,4,5,6,0,0]).selfMask().rename('transitions')
var fumigacion3 = ui.Map.Layer(fumigacion2, {palette: 'FFFFFF'}, 'Fumigation points', true)
var PAs = ui.Map.Layer(contours, {palette: 'FFFFFF'}, 'Protected Areas', true)
var y1989_1_vis = ui.Map.Layer(y1989_1, vis, '1989',true)
var y2009_1_vis = ui.Map.Layer(y2009_1, vis, '2009',false)
var y2019_1_vis = ui.Map.Layer(y2019_1, vis, '2019',false)
Map.addLayer(filtered,false_vis, 'Landsat2019')
Map.add(y1989_1_vis)// to be empty 
Map.add(y2009_1_vis)// to be empty 
Map.add(y2019_1_vis)// to be empty 
Map.addLayer(fumigacion, {color:"yellow"}, 'Fumigation (Informative)')
Map.add(PAs)//  
//But here we change REMAP to HAVE a final order!!!
/// 3 = stable forest, 5 = stable cattle 7 = stable coca
/// 2 = forest to cattle 1 = forest to coca
/// 6 = cattle to natural ; 4 = cattle to coca
/// 9 = coca to natural ; 8 = coca to cattle  ///11 = urban //10 = water
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Annual coca farming and cattle lands in the Andes-Amazon region (1985-2019)', {fontSize: '28px', fontWeight: 'bold', color: 'white', backgroundColor : 'black'});
//App summary
var text = ui.Label(
  'This app shows the location of coca  and cattle ranching lands in the Colombian Andes-Amazon. We combined Landsat + LandTrendr + a Deep learning approach. We present few years '  +
  'to avoid any criminalization or persecution processes over small farmers that depend on coca as way to livehood. ',
    {fontSize: '15px', color: 'white',  backgroundColor : 'black'});
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '300px',position:'middle-right', backgroundColor : 'black'}});
var drawLabel = ui.Label({value: 'Scientific Reports Paper',  style: {
  color: 'grey', fontSize: '14px', backgroundColor: 'rgba(0,0,0,0.0)', textDecoration: 'underline',
  margin: '3px 4px 2px 4px'}, targetUrl: 'https://rdcu.be/c4NER'
});
panel.add(drawLabel)
// Add our main panel to the root of our GUI
ui.root.insert(1,panel)
///////////////////////////////////////////////////////////////
//         4) Add checkbox widgets and legends               //
///////////////////////////////////////////////////////////////
//Create a label for the Gain and Loss series of checkboxes
var extLabel = ui.Label({value:'Year 1985',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', color: 'white',  backgroundColor : 'black'}
});
// Add checkboxes to our display
//Create checkboxes that will allow the user to view the extent map for different years
//Creating the checkbox will not do anything yet, we add functionality further 
var extCheck4 = ui.Checkbox({label: 'Land transitions in 1989', style: {width: '400px', fontSize : '18px', color: 'white', backgroundColor : 'black' }}).setValue(true); //false = unchecked
var extCheck5 = ui.Checkbox({label: 'Land transitions in 2009', style: {width: '400px', fontSize : '18px', color: 'white', backgroundColor : 'black' }}).setValue(false); //false = unchecked
var extCheck6 = ui.Checkbox({label: 'Land transitions in 2019', style: {width: '400px', fontSize : '18px', color: 'white', backgroundColor : 'black' }}).setValue(false); //false = unchecked
//Extent Legend 
// /////// Set position of panel
var extentLegend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    backgroundColor : 'black'}
});
var makeRowb = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px', color: 'white', backgroundColor : 'black'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
        style: {color: 'white', backgroundColor : 'black'}
      });
};
//Create a palette using the same colors we used for each extent layer
var paletteMAPb = [
'e41a1c',
'13D4CA',
'ff7f00',
'EFEBE6',
'f781bf',
'55E05E',
'ffff00'
];
// Name of each legend value
var namesb = ['Forest to Coca','Forest to Cattle','Stable Cattle', 'Stable Coca', 'Coca to Cattle', 'Forest Regrowth','Fumigation points (informative)']; 
// Add color and names to legend
for (var i = 0; i < 7; i++) {
  extentLegend2.add(makeRowb(paletteMAPb[i], namesb[i]));
  } 
//4.4) Add these new widgets to the panel in the order you want them to appear
panel 
      .add(extCheck4)
      .add(extCheck5) 
      .add(extCheck6)
      .add(extentLegend2)  
///////////////////////////////////////////////////////////////
//          5) Add functionality to widgets                  //
///////////////////////////////////////////////////////////////
//For each checkbox we create function so that clicking the checkbox
//Turns on layers of interest
//YEAR 1
var doCheckbox4 = function() {
  extCheck4.onChange(function(checked){
  y1989_1_vis.setShown(checked)
  })
}
doCheckbox4();
//YEAR 2
var doCheckbox5 = function() {
  extCheck5.onChange(function(checked){
  y2009_1_vis.setShown(checked)
  })
}
doCheckbox5();
//YEAR 3
var doCheckbox6 = function() {
  extCheck6.onChange(function(checked){
  y2019_1_vis.setShown(checked)
  })
}
doCheckbox6();
////Base maps
function darkMap() 
{  return [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#191919"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];
}
function dark() 
{return [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
}
function GRAYMAP() 
{return [
    {   // Dial down the map saturation.
    stylers: [ { saturation: -100 } ],
    //stylers: [{color: '#382e61'}]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
]
}
function Aubergine()
{return [
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
}