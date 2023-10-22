var S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
//***************************************
// GET THE PAST MONTH OF SENTINEL-1
//***************************************
var t1 = new Date();
t1.setMonth(t1.getMonth() - 1);
var t2 = ee.Date(t1.getTime())
var S1_VVVH = S1
       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
       .filterDate(t2, t2.advance(1,'month'));
var S1_HHHV = S1
       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HV'))
       .filterDate(t2, t2.advance(1,'month'));
// Select bands of interest
S1_VVVH = S1_VVVH
    .select(['VV','VH'])
    .mean()
S1_VVVH = S1_VVVH.addBands(S1_VVVH.select('VV').divide(S1_VVVH.select('VH'))).rename(['co-pol','cross-pol','ratio']);
S1_HHHV = S1_HHHV
    .select(['HH', 'HV'])
    .mean()
S1_HHHV = S1_HHHV.addBands(S1_HHHV.select('HH').divide(S1_HHHV.select('HV'))).rename(['co-pol','cross-pol','ratio']);
var S1 = ee.ImageCollection([S1_VVVH, S1_HHHV]).mean()
//#######################################################################
var leftMap = ui.Map();
var rightMap = ui.Map();
leftMap.setOptions("SATELLITE")
rightMap.setOptions("SATELLITE")
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
rightMap.setControlVisibility({layerList: true});
// Add callback for download functionality
rightMap.onChangeBounds( ui.util.debounce(
    function(){
      getDownloadURL(TIFFdownload);  
      getPNGDownloadURL(PNGdownload);
    },
    1000,
    rightMap
  )
); 
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
var layer = ui.Map.Layer(S1);
layer.setVisParams({'min':[-25,-30,0.2],'max':[3, -2, 1], 'gamma':0.6});
rightMap.layers().add(layer);
layer.setName('Sentinel-1 backscatter');
leftMap.setCenter(8.957589, 47.600185, 6)
function updateMap(start_date, end_date, method){
  S1 = ee.ImageCollection("COPERNICUS/S1_GRD").filterDate(start_date, end_date);
  var S1_VVVH = S1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'));
  var S1_HHHV = S1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HV'))
  // Select bands of interest
  S1_VVVH = S1_VVVH.select(['VV','VH'])
  S1_HHHV = S1_HHHV.select(['HH', 'HV'])
  if (method == 'min') {
    S1_VVVH = S1_VVVH.min();
    S1_HHHV = S1_HHHV.min();
  } else if (method == 'max') {
    S1_VVVH = S1_VVVH.max();
    S1_HHHV = S1_HHHV.max();
  } else {
    S1_VVVH = S1_VVVH.mean();
    S1_HHHV = S1_HHHV.mean();
  }
  S1_VVVH = S1_VVVH.addBands(S1_VVVH.select('VV').divide(S1_VVVH.select('VH'))).rename(['copol','crosspol','ratio']);
  S1_HHHV = S1_HHHV.addBands(S1_HHHV.select('HH').divide(S1_HHHV.select('HV'))).rename(['copol','crosspol','ratio']);
  S1 = ee.ImageCollection([S1_VVVH, S1_HHHV]).mean();
  layer.setEeObject(S1)
  // Update download URL
  getPNGDownloadURL(PNGdownload)
  /*var params = layer.getVisParams();
  var geometry = ee.Geometry.Polygon(
        [[[4.7692765998097, 50.81316719470048],
          [4.7692765998097, 50.76802418827143],
          [4.85991380684095, 50.76802418827143],
          [4.85991380684095, 50.81316719470048]]]);
  var region = JSON.stringify(geometry.getInfo())
  print(S1.visualize({min: params['min'], max: params['max'], gamma: params['gamma']})
          .getDownloadURL({dimensions: 1000, region: region, format: 'png'}))
*/
}
function updateColors(redmin, redmax, greenmin, greenmax, bluemin, bluemax) {
  var params = layer.getVisParams();
  layer.setVisParams({'min':[redmin, greenmin, bluemin],
                      'max':[redmax, greenmax, bluemax], 'gamma':0.6});
  // Update download URL
  getPNGDownloadURL(PNGdownload)
}
function getDownloadURL(label){
  S1.getDownloadURL(
    {
      dimensions : 1024 , 
      region : rightMap.getBounds( true ), 
      format:"geotiff",
      name: "SARworld_S1backscatter_composite"
    }, 
    function(url){
      if( url.length > 0){
        label.setUrl( url );
      }
    });
}
function getPNGDownloadURL(label){
  var params = layer.getVisParams();
  S1.visualize({min: params['min'], max: params['max'], gamma: params['gamma']})
  .getDownloadURL(
        {
          dimensions : 1024 , 
          region : rightMap.getBounds( true ), 
          format:"png",
          name: "SARworld_S1backscatter_composite"
        }, 
        function(url){
          if( url.length > 0){
            label.setUrl( url );
          }
        });
}
function handlePNGDownload() {
  var params = layer.getVisParams();
  var url = S1.visualize({min: params['min'], max: params['max'], gamma: params['gamma']})
          .getDownloadURL(
            { name: 'SARworld',
              dimensions: 1000,
              region: rightMap.getBounds( true ),
              format: 'png'});
  print(url)
}
// Now we add a few buttons with interesting example locations
var label = new ui.Label({
    value: 'Suggestions:', 
    style: {
    fontSize: '16px',
    stretch: 'vertical',
    fontWeight: 'bold'}});
var parisZoom = new ui.Button({
  label: 'Paris',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(2.350876, 48.854044, 12)
    }
});
var windfarmZoom = new ui.Button({
  label: 'Offshore wind farms',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(2.221526, 51.721082,  9)
    } 
})
var MountEverestZoom = new ui.Button({
  label: 'Mount Everest',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(86.925104, 27.988347, 10)
    }
});
var agricultureZoom = new ui.Button({
  label: 'Agriculture',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(5.219898, 50.736641, 12)
    }
});
var niledeltaZoom = new ui.Button({
  label: 'Nile delta',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(31.271549, 30.864736, 9)
    }
});
var tenerifeZoom = new ui.Button({
  label: 'Tenerife',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-16.625064, 28.287297, 11)
    }
});
var sanfranciscoZoom = new ui.Button({
  label: 'San Francisco',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-122.448595, 37.794794, 13)
    }
});
var icelandZoom = new ui.Button({
  label: 'Iceland',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-18.411052, 64.843499, 7)
    }
});
var AfghanistanZoom = new ui.Button({
  label: 'Afghanistan',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(63.953475, 32.987774, 5)
    }
});
var emptyLabel = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var startDateLabel = new ui.Label({
    value: 'Start:  ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var endDateLabel = new ui.Label({
    value: 'End:  ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var startDateBox = ui.Textbox({
      placeholder: 'min', 
      value: ee.Date(t1).format("yyyy-MM-dd").getInfo(), 
      style: {
        maxWidth: '100px'
      }
      })
var endDateBox = ui.Textbox({
      placeholder: 'min', 
      value: t2.advance(1,'month').format("yyyy-MM-dd").getInfo(), 
      style: {
        maxWidth: '100px'
      }
      })
var startDatePanel = new ui.Panel({
    widgets: [startDateLabel, startDateBox],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var endDatePanel = new ui.Panel({
    widgets: [endDateLabel, endDateBox],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var methodLabel = new ui.Label({
    value: 'Method:  ', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var methodSelection = ui.Select({
      items: ['mean','min','max'],
      placeholder: 'Choose...', 
      value: 'mean', 
      style: {
        maxWidth: '100px'
      }
      })
var methodPanel = new ui.Panel({
    widgets: [methodLabel, methodSelection],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var updateButton = ui.Button({
    label: 'Update map', 
    style: {stretch: 'horizontal'},
    onClick: function(){
        updateMap(startDateBox.getValue(), endDateBox.getValue(), methodSelection.getValue())      
      }
})
var PNGdownload = new ui.Label({ 
    value : "Download PNG" , 
    targetUrl : "http://www.waitabit.org.no",
    style: {textAlign: 'center',
            stretch: 'horizontal'
    },
  });
var TIFFdownload = new ui.Label({ 
    value : "Download GeoTIFF" , 
    targetUrl : "http://www.waitabit.org.no",
    style: {textAlign: 'center',
            stretch: 'horizontal'
    },
  });
var legendGeneral= new ui.Label({
    value: 'Sentinel-1 backscatter:', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '100px'
    }});
var legendVV = new ui.Label({
    value: 'Red: co-pol (dB)', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    padding: '15px 0px 0px 0px'
    }});
var legendVH = new ui.Label({
    value: 'Green: cross-pol (dB)', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var legendRatio = new ui.Label({
    value: 'Blue: ratio', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var colorPaletteLabel= new ui.Label({
    value: 'Change color range min/max:', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '100px'
    }});
var redColorLabel = new ui.Label({
    value: 'Red:  ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var redMin = ui.Textbox({
      placeholder: 'min', 
      value: -25, 
      style: {
        maxWidth: '40px'
      }
      })
var redMax = ui.Textbox({
      placeholder: 'max', 
      value: 3, 
      style: {
        maxWidth: '40px'
      }
      })
var redColorPanel = new ui.Panel({
    widgets: [redColorLabel, redMin, redMax],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var greenColorLabel = new ui.Label({
    value: 'Green: ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var greenMin = ui.Textbox({
      placeholder: 'min', 
      value: -30, 
      style: {
        maxWidth: '40px'
      }
      })
var greenMax = ui.Textbox({
      placeholder: 'max', 
      value: -2, 
      style: {
        maxWidth: '40px'
      }
      })
var greenColorPanel = new ui.Panel({
    widgets: [greenColorLabel, greenMin, greenMax],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var blueColorLabel = new ui.Label({
    value: 'Blue: ', 
    style: {
    fontSize: '14px',
    stretch: 'horizontal'}});
var blueMin = ui.Textbox({
      placeholder: 'min', 
      value: 0.2, 
      style: {
        maxWidth: '40px'
      }
      })
var blueMax = ui.Textbox({
      placeholder: 'max', 
      value: 1, 
      style: {
        maxWidth: '40px'
      }
      })
var blueColorPanel = new ui.Panel({
    widgets: [blueColorLabel, blueMin, blueMax],
    layout: ui.Panel.Layout.flow('horizontal'),
});
var updateColorsButton = ui.Button({
  label: 'Update colors',
  style: {stretch: 'horizontal'},
  onClick: function(){
    updateColors(parseFloat(redMin.getValue()), parseFloat(redMax.getValue()), 
                parseFloat(greenMin.getValue()), parseFloat(greenMax.getValue()), 
                parseFloat(blueMin.getValue()), parseFloat(blueMax.getValue()))
  }
})
var resetButton = ui.Button({
    label: 'Reset colors', 
    style: {stretch: 'horizontal'},
    onClick: function(){
        redMin.setValue(-25)
        redMax.setValue(3)
        greenMin.setValue(-30)
        greenMax.setValue(-2)
        blueMin.setValue(0.2)
        blueMax.setValue(1)
        updateColors(redMin.getValue(), redMax.getValue(), 
                greenMin.getValue(), greenMax.getValue(), 
                blueMin.getValue(), blueMax.getValue())
    }
})
var contactLabel = ui.Label({
    value: 'Contact: kristof.vantricht@vito.be', 
    style: {fontSize: '11px',
            stretch: 'vertical',
            maxWidth: '120px'
    }
})
var exampleLocations = new ui.Panel({
    widgets: [legendGeneral,
         startDatePanel, endDatePanel, methodPanel, updateButton,
         PNGdownload, TIFFdownload,
         legendVV, legendVH, legendRatio,
         redColorPanel, greenColorPanel, blueColorPanel, updateColorsButton,
         resetButton, emptyLabel, label, windfarmZoom, MountEverestZoom, agricultureZoom, 
         niledeltaZoom, tenerifeZoom,sanfranciscoZoom, AfghanistanZoom,
         contactLabel],
    layout: ui.Panel.Layout.flow('vertical'),
});
ui.root.add(exampleLocations);