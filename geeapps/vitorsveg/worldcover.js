/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var wocoCol_v100 = ee.ImageCollection("ESA/WorldCover/v100"),
    S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    S1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    wocoCol_v200 = ee.ImageCollection("ESA/WorldCover/v200");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//***************************************
// VISUALIZE WORLDCOVER
//***************************************
// Code modified from:
// SARworld GEE app (Kristof Van Tricht)
// 
var woco_2020 = wocoCol_v100.first();
var woco_2021 = wocoCol_v200.first();
//var t1 = ee.Date('2020-01-01');
//var t2 = ee.Date('2020-12-31');
// ----------------------------------------------------------------------
// prepare S1 data
function get_s1_data(t1,t2){
  var S1_VVVH = S1
       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
       .filterDate(t1, t2);
  var S1_HHHV = S1
       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HV'))
       .filterDate(t1, t2);
  // Select bands of interest
  S1_VVVH = S1_VVVH
      .select(['VV','VH'])
      .mean();
  S1_VVVH = S1_VVVH.addBands(S1_VVVH.select('VV').divide(S1_VVVH.select('VH'))).rename(['co-pol','cross-pol','ratio']);
  S1_HHHV = S1_HHHV
      .select(['HH', 'HV'])
      .mean();
  S1_HHHV = S1_HHHV.addBands(S1_HHHV.select('HH').divide(S1_HHHV.select('HV'))).rename(['co-pol','cross-pol','ratio']);
  return ee.ImageCollection([S1_VVVH, S1_HHHV]).mean();
}
// ----------------------------------------------------------------------
// prepare S2 data
var maskclouds = function(image) {
    var SCL = image.select(['SCL']);
    var clouds = SCL.eq(0).or(SCL.eq(1)).or(SCL.eq(3)).or(SCL.eq(6)).or(SCL.eq(8)).or(SCL.eq(9)).or(SCL.eq(10)).or(SCL.eq(11));
    return image.updateMask(clouds.not()); // remove the clouds from image
  };
function get_s2_data(t1,t2){
  var CLOUD_FILTER = 20
  return S2
      .filterDate(t1,t2)
      .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', CLOUD_FILTER))
      .map(maskclouds)
      .select(['B2', 'B3', 'B4', 'B8'])
      .median();
}
//print(S2_RGBN);
//#######################################################################
// Generate split panel
// ----------------------------------------------------------------------
// create left and right panel 
var leftMap = ui.Map();
var rightMap = ui.Map();
leftMap.setOptions("SATELLITE");
rightMap.setOptions("SATELLITE");
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
rightMap.setControlVisibility({layerList: true});
// Add callback for download functionality
// rightMap.onChangeBounds( ui.util.debounce(
//     function(){
//       //getDownloadURL(TIFFdownload);  
//       getPNGDownloadURL(PNGdownload);
//     },
//     1000,
//     rightMap
//   )
// ); 
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
// ----------------------------------------------------------------------
// Plot WorldCover map
var woco_intervals =
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#006400" quantity="10" label="Trees"/>' +
    '<ColorMapEntry color="#58481f" quantity="11" label="Needle-leaved evergreen trees"/>' +
    '<ColorMapEntry color="#70663e" quantity="12" label="Needle-leaved deciduous trees"/>' +
    '<ColorMapEntry color="#009900" quantity="13" label="Broadleaved evergreen trees"/>' +
    '<ColorMapEntry color="#00cc00" quantity="14" label="Broadleaved deciduous trees"/>' +
    '<ColorMapEntry color="#ffbb22" quantity="20" label="Shrubland"/>' +
    '<ColorMapEntry color="#ffff4c" quantity="30" label="Grassland"/>' +
    '<ColorMapEntry color="#f096ff" quantity="40" label="Cropland"/>' +
    '<ColorMapEntry color="#fa0000" quantity="50" label="Built-up"/>' +
    '<ColorMapEntry color="#b4b4b4" quantity="60" label="Barren / sparse vegetation"/>' +
    '<ColorMapEntry color="#f0f0f0" quantity="70" label="Snow and ice"/>' +
    '<ColorMapEntry color="#0064c8" quantity="80" label="Open water"/>' +
    '<ColorMapEntry color="#99d9ea" quantity="82" label="Permanent water"/>' +
    '<ColorMapEntry color="#f5e9f5" quantity="84" label="Seasonal water"/>' +
    '<ColorMapEntry color="#c7d5d6" quantity="86" label="NA"/>' +
    '<ColorMapEntry color="#71c2c7" quantity="89" label="NA"/>' +
    '<ColorMapEntry color="#0096a0" quantity="90" label="Herbaceous wetland"/>' +
    '<ColorMapEntry color="#00cf75" quantity="95" label="Mangroves"/>' +
    '<ColorMapEntry color="#fae6a0" quantity="100" label="Moss and lichen"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
var rightlayer = ui.Map.Layer(woco_2021.sldStyle(woco_intervals));
rightMap.layers().add(rightlayer);
rightlayer.setName('WorldCover classification 2021');
// ----------------------------------------------------------------------
// Add high resolution background on left panel by default
//var layer = ui.Map.Layer();
leftMap.setCenter(4.79, 50.87, 6);
var layer = ui.Map.Layer();
leftMap.layers().add(layer);
//#######################################################################
// Functionality
// ----------------------------------------------------------------------
// Update background layer (left panel)
function updateMap(method, selectedMap){
  if (method == 'WorldCover 2020') {
    selectedMap.clear();
    var layer = ui.Map.Layer(woco_2020.sldStyle(woco_intervals));
    // layer.setVisParams({'min':[-25,-30,0.2],'max':[3, -2, 1], 'gamma':0.6});
    selectedMap.layers().add(layer);
    layer.setName('WorldCover classification 2020');
  } else if (method == 'WorldCover 2021') {
    selectedMap.clear();
    var layer = ui.Map.Layer(woco_2021.sldStyle(woco_intervals));
    // layer.setVisParams({'min':[-25,-30,0.2],'max':[3, -2, 1], 'gamma':0.6});
    selectedMap.layers().add(layer);
    layer.setName('WorldCover classification 2021');
  } else if (method == 'Sentinel-1 VV, VH, VH/VV Composite 2020') {
    selectedMap.clear();
    var layer = ui.Map.Layer(get_s1_data(ee.Date('2020-01-01'),ee.Date('2020-12-31')));
    layer.setVisParams({'min':[-25,-30,0.2],'max':[3, -2, 1], 'gamma':0.6});
    selectedMap.layers().add(layer);
    layer.setName('S1 2020');
  } else if (method == 'Sentinel-1 VV, VH, VH/VV Composite 2021') {
    selectedMap.clear();
    var layer = ui.Map.Layer(get_s1_data(ee.Date('2021-01-01'),ee.Date('2021-12-31')));
    layer.setVisParams({'min':[-25,-30,0.2],'max':[3, -2, 1], 'gamma':0.6});
    selectedMap.layers().add(layer);
    layer.setName('S1 2021');
  } else if (method == 'Google Satellite') {
      selectedMap.clear();
      selectedMap.setOptions("SATELLITE");
      var layer = ui.Map.Layer();
      layer.setName('Background');
      selectedMap.layers().add(layer);
  } else if (method == 'Google Road') {
      selectedMap.clear();
      selectedMap.setOptions("ROADMAP");
      var layer = ui.Map.Layer();
      layer.setName('Background');
      selectedMap.layers().add(layer);
  } else if (method == 'Google Hybrid') {
      selectedMap.clear();
      selectedMap.setOptions("HYBRID");
      var layer = ui.Map.Layer();
      layer.setName('Background');
      selectedMap.layers().add(layer);
  } else if (method == 'Sentinel-2 RGB Composite 2020'){
      selectedMap.clear();
      //print(S2_RGBN_2020);
      var layer = ui.Map.Layer(get_s2_data(ee.Date('2020-01-01'),ee.Date('2020-12-31')));
      layer.setVisParams({'bands': ['B4','B3','B2'],
                          'min':[0,0,0],
                          'max':[3000, 3000, 3000]
      });
      layer.setName('S2 RGB 2020');
      selectedMap.layers().add(layer);
  } else if (method == 'Sentinel-2 RGB Composite 2021'){
      selectedMap.clear();
      //print(S2_RGBN_2021);
      var layer = ui.Map.Layer(get_s2_data(ee.Date('2021-01-01'),ee.Date('2021-12-31')));
      layer.setVisParams({'bands': ['B4','B3','B2'],
                          'min':[0,0,0],
                          'max':[3000, 3000, 3000]
      });
      layer.setName('S2 RGB 2021');
      selectedMap.layers().add(layer);
  } else if (method == 'Sentinel-2 False Color Composite 2020'){
      selectedMap.clear();
      //print(S2_RGBN_2020);
      var layer = ui.Map.Layer(get_s2_data(ee.Date('2020-01-01'),ee.Date('2020-12-31')));
      layer.setVisParams({'bands': ['B8','B4','B3'],
                          'min':[0,0,0],
                          'max':[3000, 3000, 3000]
      });
      layer.setName('S2 FCC 2020');
      selectedMap.layers().add(layer);
  }else if (method == 'Sentinel-2 False Color Composite 2021'){
      selectedMap.clear();
      //print(S2_RGBN_2021);
      var layer = ui.Map.Layer(get_s2_data(ee.Date('2021-01-01'),ee.Date('2021-12-31')));
      layer.setVisParams({'bands': ['B8','B4','B3'],
                          'min':[0,0,0],
                          'max':[3000, 3000, 3000]
      });
      layer.setName('S2 FCC 2021');
      selectedMap.layers().add(layer);
  }
}
// ----------------------------------------------------------------------
// Download png
// https://gis.stackexchange.com/questions/397930/adding-text-and-legend-to-image-collection-animation-in-earth-engine
function getPNGDownloadURL(label){
  var params = rightlayer.getVisParams();
  //var logo = ee.Image("users/SE_FHM/Logos/Tall_Timbers_Logo")
  //print(logo)
  //print(rightMap.getBounds( true ))
  woco.sldStyle(woco_intervals).visualize({})
  .getDownloadURL(
        {
          dimensions : 1024 , 
          region : rightMap.getBounds( true ), 
          format:"png",
          name: "WorldCover"
        }, 
        function(url){
          if( url.length > 0){
            label.setUrl( url );
          }
        });
}
function handlePNGDownload() {
  //var params = rightlayer.getVisParams();
  var url = woco.sldStyle(woco_intervals).visualize({})
          .getDownloadURL(
            { name: 'WorldCover',
              dimensions: 1000,
              region: rightMap.getBounds( true ),
              format: 'png'});
  print(url);
}
//#######################################################################
// layout 
// ----------------------------------------------------------------------
// General introduction
var titleGeneral= new ui.Label({
    value: 'ESA WorldCover 10 m 2021 v200', 
    style: {
    fontSize: '20px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '350px'
    }});
var logo = ee.Image('users/vitorsveg/worldcover-logo-whitebg-500px').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1500x1500',
        format: 'png'
        },
    style: {position: 'top-center', height: '150px', width: '150px',padding :'0', 
    },
    });
var thumb = ui.Panel({
  widgets: [thumb],
  layout: ui.Panel.Layout.absolute(),
  style: {height: '180px'},
}) 
//var thumb = ui.Thumbnail({
//    image: logo,
//    params: {
//        dimensions: '1200x627',
//        format: 'png'
//        },
//    style: {height: '150px', width: '300px',padding :'0'}
//    });
//var thumb = new ui.Panel(thumb, 'flow', {width: '300px'});
//thumb.style().set('position', 'top-center');
//var logoPanel = new ui.Panel({
//    widgets: [thumb],//, PNGdownloadPanel
//    layout: ui.Panel.Layout.flow('vertical')
//});
//ui.root.widgets().add(logoPanel);
var reference= new ui.Label({
    value: 'This will be the citation to the paper, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'
    }});
var DOI= new ui.Label(
    'Here we will put the DOI', 
    {
    fontSize: '14px',
    stretch: 'vertical'
    },
    'somelink'
);
var descriptionA= new ui.Label({
    value: "The European Space Agency (ESA) WorldCover products provide global land cover maps for 2020 and 2021 at 10 m resolution based on Sentinel-1 and Sentinel-2 data. The WorldCover product comes with 11 land cover classes, aligned with UN-FAO's Land Cover Classification System, and has been generated in the framework of the ESA WorldCover project. Please note that different algorithm versions were used to generate the 2020 (v100) and 2021 (v200) maps. Consequently, the changes between the maps include both real changes in land cover and changes due to the algorithms used.",
    style: {
    fontSize: '14px',
    stretch: 'vertical'
    }});
var descriptionB= new ui.Label({
    value: "The WorldCover product is developed by a consortium lead by VITO Remote Sensing together with partners Brockmann Consult, CS SI, Gamma Remote Sensing AG, IIASA and Wageningen University.",
    style: {
    fontSize: '14px',
    stretch: 'vertical'
    }});
var descriptionPanel = new ui.Panel({
    widgets: [descriptionA, descriptionB],
    layout: ui.Panel.Layout.flow('vertical'),
});
var URLwocoLabel= new ui.Label(
    'Please refer to', 
    {
    fontSize: '14px',
    stretch: 'vertical',
    margin: '0px 15px 0px 10px'
    });
 var emptyLabel00 = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var URLwoco2020 = new ui.Label(
    'https://doi.org/10.5281/zenodo.5571935 (2020)', 
    {
    fontSize: '14px',
    stretch: 'vertical',
    margin: '0px 15px 10px 9px',
    color: 'blue'
    },
    'https://doi.org/10.5281/zenodo.5571935'
    );
var URLwoco2021 = new ui.Label(
    'https://doi.org/10.5281/zenodo.7254221  (2021)', 
    {
    fontSize: '14px',
    stretch: 'vertical',
    margin: '0px 15px 10px 9px',
    color: 'blue'
    },
    'https://doi.org/10.5281/zenodo.7254221'
    );
var URLwocoPanel = new ui.Panel({
    widgets: [URLwocoLabel, URLwoco2020, URLwoco2021],
    layout: ui.Panel.Layout.flow('vertical'),
});
var URLbg= new ui.Label(
    'More information about the land cover maps', 
    {
    fontSize: '14px',
    stretch: 'vertical',
    color: 'blue'
    },
    'https://esa-worldcover.org'
    );
var URLmanual= new ui.Label(
    'Product User Manual & Product Validation Report', 
    {
    fontSize: '14px',
    stretch: 'vertical',
    color: 'blue'
    },
    'https://esa-worldcover.org/en/data-access'
    );
var PNGdownloadLabel= new ui.Label(
    'PNG:', 
    {
    fontSize: '14px',
    stretch: 'vertical'
    });
var PNGdownload = new ui.Label({ 
    value : "download here" , 
    targetUrl : "http://www.waitabit.org.no",
    style: {
    fontSize: '14px',
    stretch: 'vertical'
    },
  });
var PNGdownloadPanel = new ui.Panel({
    widgets: [PNGdownloadLabel, PNGdownload],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var introPanel = new ui.Panel({
    widgets: [  descriptionPanel],//, PNGdownloadPanel titleGeneral,titleGeneral, reference, DOI,
    layout: ui.Panel.Layout.flow('vertical'),
});
 var emptyLabel0 = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
// ----------------------------------------------------------------------
// Legend
var titleLegend= new ui.Label({
    value: 'Legend', 
    style: {
    fontSize: '18px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '200px', 
    color: '#858585'
    }});
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 0 10px'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 20px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['006400',
              '58481f', 
              '70663e', 
              '009900',
              '00cc00',
              'ffbb22',
              'ffff4c',
              'f096ff',
              'fa0000',
              'b4b4b4',
              'f0f0f0',
              '0064c8',
              '99d9ea',
              'f5e9f5',
              '0096a0',
              '00cf75',
              'fae6a0'
              ];
// name of the legend
var names = ['Tree cover',
            'Needle-leaved evergreen trees',
            'Needle-leaved deciduous trees',
            'Broadleaved evergreen trees',
            'Broadleaved deciduous trees',
            'Shrubland',
            'Grassland',
            'Cropland',
            'Built-up',
            'Bare / sparse vegetation',
            'Snow and ice',
            'Permanent water bodies',
            'Permanent water',
            'Seasonal water',
            'Herbaceous wetland',
            'Mangroves',
            'Moss and lichen'
            ];
var leg0 = makeRow(palette[0], names[0]);
var leg5 = makeRow(palette[5], names[5]);
var leg6 = makeRow(palette[6], names[6]);
var leg7 = makeRow(palette[7], names[7]);
var leg8 = makeRow(palette[8], names[8]);
var leg9 = makeRow(palette[9], names[9]);
var leg10 = makeRow(palette[10], names[10]);
var leg11 = makeRow(palette[11], names[11]);
var leg14 = makeRow(palette[14], names[14]);
var leg15 = makeRow(palette[15], names[15]);
var leg16 = makeRow(palette[16], names[16]);
// legend panel
var legendPanel = new ui.Panel({
    widgets: [leg0, leg5, leg6, leg7, leg8, leg9, leg10,
              leg11,leg14,leg15, leg16],
    layout: ui.Panel.Layout.flow('vertical'),
});
 var emptyLabel1 = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
// ----------------------------------------------------------------------
// Background settings
var methodLeftSelection = ui.Select({
      items: ['WorldCover 2021',
      'WorldCover 2020',
      'Google Satellite',
      'Google Road',
      'Google Hybrid',
      'Sentinel-1 VV, VH, VH/VV Composite 2021',
      'Sentinel-1 VV, VH, VH/VV Composite 2020',
      'Sentinel-2 RGB Composite 2021',
      'Sentinel-2 RGB Composite 2020',
      'Sentinel-2 False Color Composite 2021',
      'Sentinel-2 False Color Composite 2020'],
      onChange: function(){
        updateMap(methodLeftSelection.getValue(), leftMap)  //startDateBox.getValue(), endDateBox.getValue(),    
      },
      placeholder: 'Choose...', 
      value: 'Google Satellite', 
      style: {
        width: '125px',
        maxWidth: '250px'
      }
      })
var methodRightSelection = ui.Select({
      items: ['WorldCover 2021',
      'WorldCover 2020',
      'Google Satellite',
      'Google Road',
      'Google Hybrid',
      'Sentinel-1 VV, VH, VH/VV Composite 2021',
      'Sentinel-1 VV, VH, VH/VV Composite 2020',
      'Sentinel-2 RGB Composite 2021',
      'Sentinel-2 RGB Composite 2020',
      'Sentinel-2 False Color Composite 2021',
      'Sentinel-2 False Color Composite 2020'],
      onChange: function(){
        updateMap(methodRightSelection.getValue(), rightMap)  //startDateBox.getValue(), endDateBox.getValue(),    
      },
      placeholder: 'Choose...', 
      value: 'WorldCover 2021', 
      style: {
        width: '125px',
        maxWidth: '250px'
      }
      })
var titleLeftPanel= new ui.Label({
    value: 'Left panel', 
    style: {
    fontSize: '18px', 
    position: 'middle-left',
    stretch: 'vertical',
    fontWeight: 'bold',
    width: '125px',
    maxWidth: '125px', 
    color: '#858585'
    }});
var titleRightPanel= new ui.Label({
    value: 'Right panel', 
    style: {
    fontSize: '18px',
    position: 'middle-right',
    stretch: 'vertical',
    fontWeight: 'bold',
    width: '125px',
    maxWidth: '125px', 
    color: '#858585'
    }});
var methodTitlePanel = new ui.Panel({
    widgets: [titleLeftPanel, titleRightPanel],
    layout: ui.Panel.Layout.flow('horizontal')
});
var methodSelectionPanel = new ui.Panel({
    widgets: [methodLeftSelection, methodRightSelection],
    layout: ui.Panel.Layout.flow('horizontal')
});
var methodRightPanel = new ui.Panel({
    //widgets: [methodRightSelection],
    layout: ui.Panel.Layout.flow('horizontal')
});
//var leftMapSelectionPanel = new ui.Panel({
//    widgets: [methodLeftPanel],
//    layout: ui.Panel.Layout.flow('vertical'),
//});
//var rightMapSelectionPanel = new ui.Panel({
//    widgets: [methodRightPanel],
//    layout: ui.Panel.Layout.flow('vertical'),
//});
 var emptyLabel2 = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
// ----------------------------------------------------------------------
// Suggested locations
var titleSuggestions= new ui.Label({
    value: 'Suggestions', 
    style: {
    fontSize: '18px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '200px', 
    color: '#858585'
    }});
var pivotZoom = new ui.Button({
  label: 'Colorado Springs',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-105.7, 37.68, 9) //31.271549, 30.864736
    }
});
var sanFranciscoZoom = new ui.Button({
  label: 'San Francisco',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-122.4194, 37.7749, 12)
    }
});
var amazonZoom = new ui.Button({
  label: 'Amazon',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-63.8972, -8.7636, 12)
    }
});
var sineSaloumZoom = new ui.Button({
  label: 'Sine Saloum',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-16.4988, 13.8353, 12)
    }
});
var amsterdamZoom = new ui.Button({
  label: 'Amsterdam',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(4.9041, 52.3676, 12)
    }
});
var sundarbansZoom = new ui.Button({
  label: 'Sundarbans',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(89.1833, 21.9497, 12)
    }
});
var pacificZoom = new ui.Button({
  label: 'Sundarbans',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(89.1833, 21.9497, 12)
    }
});
var emptyLabel3 = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var copyrightLabel = ui.Label({
    value: '@ ESA WorldCover project 2021', 
    style: {fontSize: '11px',
            stretch: 'vertical',
            maxWidth: '400px'
    }
})
var copyrightLabel2 = ui.Label({
    value: '@ Contains modified Copernicus Sentinel data (2021), processed by ESA WorldCover consortium', 
    style: {fontSize: '11px',
            stretch: 'vertical',
            maxWidth: '400px'
    }
})
var copyrightPanel = new ui.Panel({
    widgets: [copyrightLabel, copyrightLabel2],
    layout: ui.Panel.Layout.flow('vertical'),
});
var contactLabel = ui.Label({
    value: 'Contact: remotesensing@vito.be', 
    style: {fontSize: '11px',
            stretch: 'vertical',
            maxWidth: '150px',
            margin: '0 0 0px 10px'
    }
})
var URLcontact= new ui.Label(
    'https://esa-worldcover.org/', 
    {
    fontSize: '11px',
    stretch: 'vertical',
    margin: '0px 20px 20px 10px',
    color: 'blue'
    },
    'https://esa-worldcover.org/'
    );
var vitologo = ee.Image('users/vitorsveg/vito_logo_4').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var vitothumb = ui.Thumbnail({
  image: vitologo,
  params: {dimensions: '1000x2000',//'627x1200',
  format: 'png'},  style: {height: '100px', width: '200px',padding :'0'}});
var exampleLocations = new ui.Panel({
    widgets: [thumb,//logoPanel,
              introPanel,
              emptyLabel00,
              URLwocoPanel,
              URLbg, URLmanual,
              emptyLabel0,
              titleLegend,
              legendPanel,
              emptyLabel1,
              methodTitlePanel,
              methodSelectionPanel,
              emptyLabel3,
              titleSuggestions,
              pivotZoom,
              sanFranciscoZoom,
              amazonZoom,
              sineSaloumZoom,
              amsterdamZoom, 
              sundarbansZoom,
              copyrightPanel,
              contactLabel],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {width: '300px'}
});
ui.root.add(exampleLocations);