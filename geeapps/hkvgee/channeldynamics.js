/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Landsat = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    countries = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    dem = ee.Image("CGIAR/SRTM90_V4"),
    jrc = ee.ImageCollection("JRC/GSW1_2/MonthlyHistory"),
    dike = ee.FeatureCollection("users/hkvgee/Tracado_Dique"),
    s2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    Landsat8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// print(Landsat8.first())
var geometry = /* color: #98ff00 */ee.Geometry.Point([34.87341572042385, -17.070148384070723])
// Map.addLayer(geometry)
// Select Mozambique
var Mozambique = countries.filter(ee.Filter.eq('ADM0_NAME','Mozambique'))
// Map.addLayer(Mozambique)
//zoom to center of initial geometry
Map.centerObject(geometry,7)
//rename functions for landsat 5 and 8 so the bands can be used in the same manner
function renameL8(img) {
  var newimg = img.select(['B2', 'B3', 'B4', 'B5'], 
  ['blue', 'green', 'red', 'nir']);
  return newimg;
}
function renameL5(img) {
  var newimg = img.select(['B1', 'B2', 'B3', 'B4'], 
  ['blue', 'green', 'red', 'nir']);
  return newimg;
}
//////////////////////////////////////////////////////////////////////
//////DEM //////////
// clip the dem
var demClip = dem.clip(Mozambique)
// add layer to map
Map.addLayer(demClip,{'min':0,'max':500, palette: ['white','#808000','#008000']},"Elevation (DEM)")
// import the dike shapefile
Map.addLayer(dike,{},'Dikes', false)
/////////////////////////////////////////////////////////////////
/////Add landcovermap///////////////////////////
var landcover = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var landcover = landcover.select('landcover');
// clip the Landcovermap
var LandcoverClip = landcover.clip(Mozambique)
Map.addLayer(LandcoverClip, {}, 'Landcover', false);
/////////////////////////////////////////////////////////////////////////////
/////////create panels and fill some already/////////
// set position of panel
var legend_land = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Landcover Type',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend_land.add(legendTitle);
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
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['aaefef','ffff63','dcef63','cdcd64','006300','009f00','aac700','003b00','286300','788300','8d9f00',
'bd9500','956300','ffb431','ffebae','00785a','009578','00dc83','c31300','fff5d6','0046c7','743411'];
// name of the legend
var names = ['post-flooding of irrigated croplands','rainfed croplands',
'Mosaic cropland',
'Mosaic vegetation',
'Closed to open forest',
'Closed broadleaved deciduous forest','Open broadleaved deciduous forest',
'Closed needleleaved evergreen forest','Open needleleaved forest',
'Closed to open mixed forest','	Mosaic forest-shrubland grassland',
'Mosaic grassland/forest-shrubland','Closed to open shrubland','Closed to open grassland',
'Sparse vegetation','Closed forest regularly flooded - Fresh water',
'Closed forest regularly flooded - saline water',
'Closed/open vegetation on regularly flooded soil',
'Artificial surfaces and associated areas','Bare areas',
'	Water bodies','Unclassified']
// Add color and and names
for (var i = 0; i < 22; i++) {
  legend_land.add(makeRow(palette[i], names[i]));
  }  
// add legend_landcover to map (alternatively you can also print the legend to the console)
Map.add(legend_land);
    // Create a disclaimer panel to display background info
    var panel_disclaim = ui.Panel({style: {width: '325px', shown: 'false'}});
    //text for in disclaimer box
    var descLabel = ui.Label(ee.String('The channel dynamics layer has been produced \nusing Landsat 5 & 8 Imagery. In blue the areas that \nwere water in both start and end year. In red the areas \nthat were land in the start year, and water in the end \nyear. In yellow the areas that were water in the start \nyear and have become land in the end year.')
        .cat('\n\n*The Landsat 5 or 8 image used is the least cloudy \nimage in that year. By no means do the compared \nimages have the same water level. Landsat 5 & 8 TM \nCollection 1 Tier 1 calibrated top-of-atmosphere (TOA) \nreflectance. Calibration coefficients are extracted from \nthe image metadata. See Chander et al. (2009) for \ndetails on the TOA computation. \nhttps://www.sciencedirect.com/science/article/abs/pii \n/S0034425709000169) \nThe year 2012 gives an error because that year is \nnot covered by Landsat 5 or Landsat 8. ')//.cat(currentDate.format("MMM-YYYY"))
        .cat('\n\n\n')
        .cat('Landcover map (GlobCover, Global Land Cover Map) \nGlobCover 2009 is a global land cover map based on \nENVISATs Medium Resolution Imaging Spectrometer \n(MERIS) Level 1B data acquired in full resolution mode \nwith a spatial resolution of approximately 300 meters.\n*The legend has been adjusted to make the legend \nitems shorter. Reference: ESA 2010 and UCLouvain. \nhttp://due.esrin.esa.int/page_globcover.php')
        .cat('\n\nThe dikes layer is a small stretch of dike next to \nthe Limpopo river. ')
        .cat('\n\nDigital Elevation Model (SRTM Digital Elevation Data \nVersion 4)\nThe Shuttle Radar Topography Mission \n(SRTM) digital elevation dataset was originally \nproduced to provide consistent, high-quality elevation \ndata at near global scope. This version of the SRTM \ndigital elevation data has been processed to fill data \nvoids, and to facilitate its ease of use.\nReference: Jarvis, A., H.I. Reuter, A. Nelson, \nE. Guevara. 2008. \nHole-filled SRTM for the globe Version 4, available \nfrom the CGIAR-CSI SRTM 90m \nDatabase: http://srtm.csi.cgiar.org.')
        .getInfo(),
        {whiteSpace: 'pre'}
    );
    //resize text disclaimer box 
       descLabel.style().set('fontSize', '12px');
    // add text to panel    
    panel_disclaim.add(descLabel); 
    // Create a panel, initially hidden.
var panel = ui.Panel({
  style: {
    width: '325px',
    shown: false
  },
  widgets: [
    panel_disclaim
  ]
});
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'i',
  onClick: function() {
    // Hide the button.
    button.style().set('shown', false);
    // Display the panel.
    panel.style().set('shown', true);
    // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      panel.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
// Add the button to the map and the panel to root.
// Map.add(button);
ui.root.insert(0, panel);
// // i button
// var test_toggle = function() {
//   var current = panel_disclaim.style().get('shown');
//   if (current === false) {
//     panel_disclaim.style().set({'shown':true});
//   } else {
//     panel_disclaim.style().set({'shown':false});
//   }
// };
// var button = ui.Button('i', test_toggle);
//add panel for instructions
var panel_top = ui.Panel({style: {position: 'top-center',width: '350px'}});           //Create panel
var refreshLabel = ui.Label('1) Select start and end year, click Refresh Map');       //Create text1
var clickLabel = ui.Label('2) Then click on a point of interest in the map');         //Create text2
panel_top.add(refreshLabel)                                                           //add text1 to panel 
panel_top.add(clickLabel)                                                             //add text1 to panel 
panel_top.add(button)
Map.add(panel_top)                                                                    //add panel to map
      // add panel for DEM legend
      var legend_dem = ui.Panel({
        style: {position: 'bottom-left',
                padding: '8px 15px'}
      });
      // Create DEM legend title
      var legendTitle = ui.Label({
        value: 'Elevation (DEM) in meters',
        style: {fontWeight: 'bold', 
                fontSize: '18px',
                margin: '0 0 4px 0',
                padding: '0'}
      });
      // Add the title to the panel
      legend_dem.add(legendTitle);
      // Creates styles for the legend.
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
              style: {margin: '0 0 4px 6px'}
            });
            // return the panel
            return ui.Panel({
              widgets: [colorBox, description],
              layout: ui.Panel.Layout.Flow('horizontal')
            });
      };
      // // name of the legend
      var names = ['0','250','500']
      var palette= ['ffffff','808000','008000'] 
      // Add color and and names by running function
      for (var i = 0; i < 3; i++) {
        legend_dem.add(makeRow(palette[i], names[i]));
        }  
      // add dem legend to map (alternatively you can also print the legend to the console)
      Map.add(legend_dem); 
///////////////////////////////////////////////////////////////
// Add a panel to host sliders and date selection 
//set position of legend panel
var optionsPanel = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
var optionsLabel = ui.Label({value: 'Options',
    style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'}
});
optionsPanel.add(optionsLabel);
// Add a slider and label for selecting number of months latest year is set to be the year 6 months back form now, to ensure enough images
var now = ee.Date(Date.now()).advance(-6, 'month').get('year').getInfo()
//start year slider
var sliderLabel_start = ui.Label('Start year ');
var monthSlider_start = ui.Slider(1986, now-1, 1990, 1);
monthSlider_start.setValue(1990);  // Set a default value.
optionsPanel.add(sliderLabel_start);
optionsPanel.add(monthSlider_start);
//end year slider
var sliderLabel_end = ui.Label('End year ');
var monthSlider_end = ui.Slider(1987, now, 2005, 1);
monthSlider_end.setValue(2005);  // Set a default value.
optionsPanel.add(sliderLabel_end);
optionsPanel.add(monthSlider_end);
Map.add(optionsPanel);
// when end slider changes set year
monthSlider_end.onChange(function(value) {
  year_end = value;
  print('End year selected: ', year_end);
}); 
// when start slider changes set year
monthSlider_start.onChange(function(value) {
  year_start = value;
  print('Start year selected: ', year_start);
}); 
// now add a button to refresh - this invokes the calculation and loading of maps
var refreshButton = ui.Button({
  label: 'Refresh Map'
});
optionsPanel.add(refreshButton);
        // add panel for channel movement already set position of panel - moved to here so it is outside onclick function
        var legend_channel = ui.Panel({
          style: {
            position: 'bottom-left',
            padding: '8px 15px'
          }
        });
        Map.add(legend_channel);
////////////////////////////////////////////////////////////////////////////////
//////Start of channel movement analysiscode
//add empty channel_movement so it can be removed in the function by initial update
Map.addLayer(ee.Image(0).clip(geometry),{}, 'Channel dynamics')
//initial years for channel movement analysis
var year_start = 1990
var year_end = 2005
//function to call by change of geometry or date  
  var channel_movement = function(geometry) {
        // print(panel_disclaim)
        legend_channel.clear();  //empty legend where channel movement legend has to come
        var layers = Map.layers()  // select all map layers
        var layer = layers.get(3)  // select channel movement layer
        // print(layer)
        layers.remove(layer)       // Remove channle movemoent so it can be replaced by updated years layer
        //start and end dates for image selection
        var start_date_begin = ee.Date.fromYMD(year_start, 1, 1);
        var start_date_end = ee.Date.fromYMD(year_start, 12, 31);
        var end_date_begin = ee.Date.fromYMD(year_end, 1, 1);
        var end_date_end = ee.Date.fromYMD(year_end, 12, 31);
        // print(start_date)
        //filter collection on geometry then rename bands
        var Landsat5_geom = Landsat.filterBounds(geometry)   //filter
        var Landsat8_geom = Landsat8.filterBounds(geometry)
        var landsat5_geom_name = renameL5(Landsat5_geom)      //rename
        var landsat8_geom_name = renameL8(Landsat8_geom)
        var landsat_coll = landsat5_geom_name.merge(landsat8_geom_name)        
        // initial use of 1990
        var image1990 = ee.Image(landsat_coll
        // .filterBounds(geometry)
        .filterBounds(geometry)
        .filterDate(start_date_begin, start_date_end)
        .sort('CLOUD_COVER')
        .first());
        var date_begin = (image1990.date());
        // initial use of 2005
        var image2005 = ee.Image(landsat_coll
        .filterBounds(geometry)
        // .filterBounds(Mozambique)
        .filterDate(end_date_begin, end_date_end)
        .sort('CLOUD_COVER')
        .first());
        var date_end =(image2005.date());
        print(landsat_coll.filterBounds(geometry).filterDate(end_date_begin, end_date_end))
        // print(image2005.select('blue'))
        //LT05_167072_19901008'
        // Manual imagecollection selection
        var imagecollection = ee.ImageCollection([image1990,image2005]);
        var visParams = {bands: ['red', 'green', 'blue'], max: 0.3};
        // Map.addLayer(ee.Image((imagecollection.toList(imagecollection.size())).get(0)), visParams, 't0')
        // Map.addLayer(ee.Image((imagecollection.toList(imagecollection.size())).get(1)), visParams, 't1')
        var Determinewatermask = function(index, centerline, MaxDist) {
          var WaterMaskFunc = function(image){
            var addNDWI = ee.Image(image).addBands(ee.Image(image).normalizedDifference(['green','nir']).rename('NDWI'))
            var edge = ee.Algorithms.CannyEdgeDetector(addNDWI.select('NDWI'), 0.4) 
            // value 0.4 is minimal difference for the edge
            var scale = 200 // Determine the size of the buffer. In this case 200 square meters,
            //the larger the scale the larger the bufferzone around focal_max. 
            var edgeBuffer = edge.focal_max(scale, 'square' , 'meters' ); // create a buffer around the focal_max.
            var EdgeCut = ee.Image(addNDWI).mask(edgeBuffer) //mask the bufferzone around the focal_max
            //edges between land and water
          var threshold = 0
            // Now determine the water mask
          var WaterMask = addNDWI.select('NDWI').gt(threshold) // by using the NDWI create the water mask
          // filter noise with the help of the centerline
          var ExtractChannel = function(ctrline, maxDistance) {
          // extract the channel water bodies from the water mask, based on connectivity to the reference centerline.
          // to only show the rivers and not random other lakes etc.
            var cost = WaterMask.not().cumulativeCost({
                source: ee.Image().toByte().paint(ee.Image(centerline), 1).and(WaterMask), 
                // only use the centerline that overlaps with the water mask
                maxDistance: maxDistance,
                geodeticDistance: false
              }).eq(0);
            return WaterMask.updateMask(cost).unmask(0).updateMask(WaterMask.gte(0)).rename(['channelMask']);
            };
          var channel = ExtractChannel(centerline, MaxDist)
          return channel
          }
        return WaterMaskFunc
        }
        var grwl = ee.FeatureCollection("users/eeProject/grwl") // Global database of river centerline
        // RivWidthCloud Paper
        var bounds = imagecollection.first().geometry(); // First image of Landsatimages (1990)
        var centerlineFiltered = grwl.filterBounds(bounds) // Only use the river centerlines that fit in the 'bounds'
        var WaterMasks = imagecollection.map(Determinewatermask('NDWI',centerlineFiltered, 5000))
        // Make a List out of this imagecollection
        var WaterMasks = WaterMasks.toList(WaterMasks.size())
        // Function calculates the difference between t+1 and t
        //Calculates difference between t0 and t1, see for 'zip' the Docs. Makes sure you can loop through the information
        var DifferenceMasks = WaterMasks.slice(0,-1).zip(WaterMasks.slice(1)).map(function(f){
            return ee.Image(ee.List(f).get(1)).subtract(ee.Image(ee.List(f).get(0)))
          });
        var viz = {palette:['yellow','black','red']};
        // Map.addLayer(ee.ImageCollection(DifferenceMasks),viz,'difference')
        // In eroded and deposited, 0 is land, 1 is water - that is why if you // subtract them from eachother the outcome is -1 or 1
        // if the grid cell was first water and than land and vice versa.
        var eroded = ee.Image(ee.List(DifferenceMasks).get(0)).eq(1)
        .updateMask(ee.Image(ee.List(DifferenceMasks).get(0)).eq(1))
        var deposited = ee.Image(ee.List(DifferenceMasks).get(0)).eq(-1)
        .updateMask(ee.Image(ee.List(DifferenceMasks).get(0)).eq(-1))
        var Mask = ee.Image(ee.List(WaterMasks).get(1))
        var mosaic = ee.ImageCollection([Mask.visualize({palette: ['black', 'blue']}), 
        eroded.visualize({palette: ['red']}), deposited.visualize({palette: ['yellow']})]).mosaic()
        // print(mosaic)
        Map.addLayer(mosaic, {}, 'Channel dynamics').setOpacity(0.5)
        ///////////////////////////////////////
        //In function for start and end year
        // // set position of panel - moved to above the function box
        // Create legend title
        var title_text = (('Channel dynamics '+year_start+' - '+year_end).toString())
        var legendTitle = ui.Label({
          value: title_text,//'Channel movement 1990 - 2005',
          style: {
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '0 0 4px 0',
            padding: '0'
            }
        });
        // Add the title to the panel
        legend_channel.add(legendTitle);
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
                style: {margin: '0 0 4px 6px'}
              });
              // return the panel
              return ui.Panel({
                widgets: [colorBox, description],
                layout: ui.Panel.Layout.Flow('horizontal')
              });
        };
        //  Palette with the colors
        // var palette =['FFFFFF','d742f4','001556','b7d2f7'];
        var palette = ['0000FF','FF0000','FFFF00'];
        // name of the legend
        var names = ['constant water','eroded','deposited']
        // Add color and and names
        for (var i = 0; i < 3; i++) {
          legend_channel.add(makeRow(palette[i], names[i]));
          }  
        var date_begin_string = (date_begin.get('year').getInfo()+'-'+date_begin.get('month').getInfo()+'-'+date_begin.get('day').getInfo())
        var date_end_string = (date_end.get('year').getInfo()+'-'+date_end.get('month').getInfo()+'-'+date_end.get('day').getInfo())
        var date_text = (('*Chosen image: '+date_begin_string+' and '+ date_end_string).toString())
        var dateTitle = ui.Label({
          value: date_text,//'Channel movement 1990 - 2005',
          style: {
            fontSize: '10px',
            margin: '0 0 4px 0',
            padding: '0'
            }
        }); 
        legend_channel.add(dateTitle) 
// return date_begin, date_end
};
//add initial geometry point
// Map.addLayer({ eeObject: geometry, name: 'Point'});
//what to do when clicked on map
Map.onClick(function(coords) {
        var geometry = ee.Geometry.Point([coords.lon, coords.lat]); // Change geometry point
        print(geometry)
        var layers = Map.layers()  // select all map layers
        var layer = layers.get(3)  // select channel movement layer
        // channel_movement(geometry)
        geometry.evaluate(channel_movement);
        return geometry
});
//what to do when refresh button is pressed
var returnImage = refreshButton.onClick(function(){
  channel_movement(geometry);
  print(geometry);
  // print(date_begin, date_end)
});