//First variables to choose dates of calculated imags and NDVI chart
var fechaInicioNDVI = '2019-11-01';
var fechaFinNDVI = '2019-11-15';
var fechaInicioChart = '2016-01-01';
var fechaFinChart =  new Date()-3;
//GEOMETRY CALCULATIONS AND functions
//The first step is on imports
var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-4.732493407279435, 36.538999206514134],
          [-4.7322788305582435, 36.53793030639851],
          [-4.730991370231095, 36.53668898449495],
          [-4.729274756461564, 36.53544764266433],
          [-4.727815634757462, 36.535033857625926],
          [-4.724468237906876, 36.53479248199773],
          [-4.723180777579728, 36.53479248199773],
          [-4.722794539481583, 36.53455110561612],
          [-4.722751624137345, 36.53351662687583],
          [-4.722193724662247, 36.532275234121656],
          [-4.721035010367814, 36.53244765097354],
          [-4.72013378813881, 36.532895932989526],
          [-4.719747550040665, 36.53344766113448],
          [-4.719661719352189, 36.53406835059269],
          [-4.720348364860001, 36.535068339797036],
          [-4.719146735221329, 36.53475799970362],
          [-4.717430121451798, 36.53520626832767],
          [-4.717945105582658, 36.53572349812654],
          [-4.717515952140275, 36.53648209557368],
          [-4.7168722219767005, 36.53651657709898],
          [-4.7160997457804115, 36.536137279474815],
          [-4.71489811614174, 36.53586142548863],
          [-4.71215153411049, 36.536757947345706],
          [-4.711507803946915, 36.53730964793765],
          [-4.710735327750626, 36.53827511450192],
          [-4.710864073783341, 36.53886128474887],
          [-4.710949904471818, 36.53937849010004],
          [-4.711851126700822, 36.540137051690245],
          [-4.712409026175919, 36.54093008539548],
          [-4.713267333060685, 36.541309359509526],
          [-4.713996893912736, 36.541309359509526],
          [-4.713825232535783, 36.542309255073555],
          [-4.713095671683732, 36.54341257310203],
          [-4.712280280143204, 36.54427452935572],
          [-4.710434920340958, 36.54427452935572],
          [-4.709018713981095, 36.543998704400195],
          [-4.707602507621232, 36.54448139742654],
          [-4.706915862113419, 36.545412296894746],
          [-4.705928809195939, 36.54555020697369],
          [-4.704340941459122, 36.54499856518172],
          [-4.701379782706681, 36.54479169849483],
          [-4.699706084281388, 36.544309007405964],
          [-4.697560317069474, 36.54330913770575],
          [-4.6962728567423255, 36.542309255073555],
          [-4.695543295890275, 36.54093008539548],
          [-4.693225867301408, 36.53951641094271],
          [-4.692238814383927, 36.53999913195466],
          [-4.691895491630021, 36.54134383888217],
          [-4.688591010123673, 36.5434470515367],
          [-4.688462264090958, 36.54441244146445],
          [-4.689320570975724, 36.54613632206432],
          [-4.690522200614396, 36.547170631971426],
          [-4.692024237662736, 36.547860164220744],
          [-4.694341666251603, 36.54748092224481],
          [-4.695071227103654, 36.54703272478344],
          [-4.6955003805460365, 36.54606736757842],
          [-4.696187026053849, 36.54510199831755],
          [-4.6976461477579505, 36.54561916192089],
          [-4.699062354117814, 36.54592945842212],
          [-4.701336867362443, 36.5462397536778],
          [-4.7031393118204505, 36.546791386612426],
          [-4.704770094901505, 36.54682586354014],
          [-4.706315047294083, 36.54758435205914],
          [-4.707173354178849, 36.54734301561041],
          [-4.7086324758829505, 36.546274230851566],
          [-4.70940495207924, 36.54610184482905],
          [-4.711078650504533, 36.54613632206432],
          [-4.713009840995255, 36.546894817349425],
          [-4.71489811614174, 36.54696377109718],
          [-4.716657645255509, 36.54730853891337],
          [-4.717773444205704, 36.54754987546973],
          [-4.720520026236954, 36.54806702269609],
          [-4.722408301383439, 36.54854969031899],
          [-4.7243394918741615, 36.54861864259051],
          [-4.725755698234025, 36.548928927051136],
          [-4.727944380790177, 36.54944606505081],
          [-4.729317671805802, 36.549273686102026],
          [-4.731635100394669, 36.54868759480051],
          [-4.732922560721818, 36.548411785591426],
          [-4.73412419036049, 36.54792911710736],
          [-4.734767920524064, 36.546929294230985],
          [-4.735282904654923, 36.54579154901978],
          [-4.734510428458634, 36.54506752062098],
          [-4.733437544852677, 36.54396422621155],
          [-4.732064253837052, 36.54341257310203],
          [-4.730476386100236, 36.54303330930576],
          [-4.731506354361954, 36.542447170688234],
          [-4.733008391410294, 36.54213686020925],
          [-4.733823782950822, 36.541654152544105],
          [-4.7333517141642005, 36.54048184995287],
          [-4.7319784231485755, 36.53924056901135]]]);
// Create a planar polygon.
var planarPolygon = ee.Geometry(geometry, null, false);
// Display the polygons by adding them to the map.
Map.centerObject(geometry);
//Map.addLayer(geometry, {color: 'FF0000'}, 'geodesic polygon');
Map.addLayer(planarPolygon, {color: '000000'}, 'Área de estudio');
print('Polygon printout: ', geometry);
// Print polygon area in square kilometers.
print('Polygon area: ', geometry.area().divide(10000));
// Print polygon perimeter length in kilometers.
print('Polygon perimeter: ', geometry.perimeter().divide(1000));
// Print the geometry as a GegeometrygeometryoJSON string.
print('Polygon GeoJSON: ', geometry.toGeoJSONString());
// Print the GeoJSON 'type'.
print('Geometry type: ', geometry.type());
// Print the coordinates as lists.
print('Polygon coordinates: ', geometry.coordinates());
// Print whether the geometry is geodesic.
print('Geodesic? ', geometry.geodesic());
/*
// Compute a buffer of the polygon.
var buffer = polygon.buffer(1000000);
// Compute the centroid of the polygon.
var centroid = polygon.centroid();
Map.addLayer(buffer, {}, 'buffer');
Map.addLayer(centroid, {}, 'centroid');
// Display polygon 1 in red and polygon 2 in blue.
Map.setCenter(-45, 30);
Map.addLayer(poly1, {color: 'FF0000'}, 'poly1');
Map.addLayer(poly2, {color: '0000FF'}, 'poly2');
// Compute the intersection, display it in blue.
var intersection = poly1.intersection(poly2, ee.ErrorMargin(1));
Map.addLayer(intersection, {color: '00FF00'}, 'intersection');
// Compute the union, display it in magenta.
var union = poly1.union(poly2, ee.ErrorMargin(1));
Map.addLayer(union, {color: 'FF00FF'}, 'union');
// Compute the difference, display in yellow.
var diff1 = poly1.difference(poly2, ee.ErrorMargin(1));
Map.addLayer(diff1, {color: 'FFFF00'}, 'diff1');
// Compute symmetric difference, display in black.
var symDiff = poly1.symmetricDifference(poly2, ee.ErrorMargin(1));
Map.addLayer(symDiff, {color: '000000'}, 'symmetric difference');
*/
// Load the FeatureCollection Sentinel 2.
var s2 = ee.ImageCollection('COPERNICUS/S2')
          .filterBounds(geometry)
          .filterDate(fechaInicioNDVI,fechaFinNDVI );
print(s2);
// Function to mask clouds using the Sentinel-2 QA band..
function maskS2clouds(image) {
  // get date of the image to pass it through
  var date = image.date().millis();
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000).set('system:time_start', date);
}
var imagenes=s2.map(maskS2clouds);
// Display the results on the geometry we are working on.
Map.centerObject(geometry);
//Create the palettes to paint layers in the map.addlayer
var ndviPalette = ['b5b1ae', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
var ndwiPalette = ['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594', '#002556'];
//New variables to know how many images we have for the choosen dates and list them for the loop, try to change GETINFO
print (imagenes);
var list=imagenes.toList(imagenes.size());
var max=ee.Number(imagenes.size());
var maximo = max.getInfo();
//maximum of 149 images to not saturate the server and machine.
if(maximo>149) maximo=149;
var cuenta =0;
//Here starts the loop to calculate each image from the collection with mask clouds of S2 collection
for (var i=0;i<maximo;i++){
    var AuxImg = list.get(i);
    var image = ee.Image(AuxImg);
    var clip=image.clip(geometry);
    if(i===0){
      var dateAnt = 0;
    }else{
      var dateAnt = date;  
    }
    //Try to optimize the code taking GETINFO out or changing it.
    var date = clip.date().format('yyyy-MM-dd').getInfo();
    if(date==dateAnt){
    }else{
      //Now we already have the images in order to be calculated with all the indexes we want to use.
      //At the beginning using the clip image from the general image we collect with all the data about date and bands
      //NDVI: calculate, give name, visualize and export to task menu
        image=clip.addBands(clip.normalizedDifference(['B8','B4']).rename('Estado_césped'));
        var nameVigorosidad_Cultivo= 'Estado_césped_'+cuenta.toString()+'_'+(date);
        var NDVI=image.addBands('Estado_césped');
        Map.addLayer(image.select(['Estado_césped']), {min:0, max: 1,palette: ndviPalette},nameVigorosidad_Cultivo, false);
        /*Export.image.toDrive({ 
                   image: image.select(['Vigorosidad_Cultivo']),
                   description: nameVigorosidad_Cultivo,
                   fileNamePrefix: nameVigorosidad_Cultivo,
                   scale: 10,
                   region:geometry,
                   });*/
        //NDWI: calculate reusing the image already we use in NDVI calculation (as a clip, because it contains all bands) , give name, visualize and export to task menu.        
        image=image.addBands(image.normalizedDifference(['B8A','B11']).rename('Estrés_hídrico'));
        var nameEstrés_hídrico= 'Estrés_hídrico_'+cuenta.toString()+'_'+date;
        Map.addLayer(image.select(['Estrés_hídrico']), {min:0, max: 1,palette: ndwiPalette},nameEstrés_hídrico, false);
        /*Export.image.toDrive({ 
                     image: image.select(['Estrés_hídrico']),
                     description: nameEstrés_hídrico,
                     fileNamePrefix: nameEstrés_hídrico,
                     scale: 30,
                     region:geometry,
                     });*/
        /*//NDRE: calculate reusing the image already we use in NDWI calculation (as a clip, because it contains all bands) , give name, visualize and export to task menu.            
        image=image.addBands(image.normalizedDifference(['B8','B5']).rename('NDRE'));
        var nameNDRE= 'NDRE_'+cuenta.toString()+'_'+date;
        Map.addLayer(image.select(['NDRE']), {min:0, max: 1,palette: ndviPalette},nameNDRE);
        Export.image.toDrive({ 
                   image: image.select(['NDRE']),
                   description: nameNDRE,
                   fileNamePrefix: nameNDRE,
                   scale: 10,
                   region:geometry,
                   });
        //MSAVI2: calculate reusing the image already we use in NDRE calculation (as a clip, because it contains all bands) , give name, visualize and export to task menu.
        image=image.addBands((image.select('B8').multiply(2).add(1).subtract(image.select('B8').multiply(2).add(1).pow(2).subtract(image.select('B8').subtract(image.select('B4')).multiply(8)).sqrt()).divide(2)).rename('MSAVI2'));
        var nameMSAVI2= 'MSAVI2_'+cuenta.toString()+'_'+date;
        Map.addLayer(image.select(['MSAVI2']), {min:0, max: 1,palette: ndviPalette},nameMSAVI2);
        Export.image.toDrive({ 
             image: image.select(['MSAVI2']),
             description: nameMSAVI2,
             fileNamePrefix: nameMSAVI2,
             scale: 10,
             region:geometry,
             });
        */
        //Calculate statistics of indexes
        var maxIndex = image.reduceRegion({
          reducer: ee.Reducer.max(),
          geometry: geometry,
          scale: 10,
          maxPixels: 1e9
        });
        var minIndex = image.reduceRegion({
          reducer: ee.Reducer.min(),
          geometry: geometry,
          scale: 10,
          maxPixels: 1e9
        });
        var meanIndex = image.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: geometry,
          scale: 10,
          maxPixels: 1e9
        });
        print('maxIndex',maxIndex);
        print('minIndex',minIndex);
        print('meanIndex',meanIndex);
        /*
        var has = geometry.reduceRegion({
          reducer: ee.Reducer.max(area),
          geometry: geometry,
          scale: 10,
          maxPixels: 1e9
        });
        print('area',has);
        */
        /*var pairwisediff= function(image){
          var index = NDVIlist.indexOf(image);
          if (index !== 0) {
          var previousimage=NDVIlist.get(index.add(-1));
          var diff = image.subtract(previousimage);
          return diff;}
          };
        var S2_collection_dNDVI = S2collection_NDVI.map(pairwisediff);
*/
        //Calculate Kc from NDVI proposed formulation Calera et al,2014.
        var Kc = (ee.Number(meanIndex.get('Vigorosidad_Cultivo'))).multiply(1.25).add(0.1);
        //var Kc = ((ee.Number(meanIndex.get('Vigorosidad_Cultivo')).subtract(ee.Number(minIndex.get('Vigorosidad_Cultivo')))).divide((ee.Number(maxIndex.get('Vigorosidad_Cultivo'))).subtract(ee.Number(minIndex.get('Vigorosidad_Cultivo'))))).multiply(1.20);
        print('Kc value',Kc);
        //Every time we calculate we visualize and export tehn we are using less cache and computer resources for the executed of the code.
        //with that "cuenta" we get the number of calculated images for each index.
        cuenta++;
    }
}
//Here it give us the info of cuenta
print("Al final tengo " + cuenta + " imágenes");
/////////////////////////////////////////////////////////////////////////////////////////
//APP DEVELOPMENT
//center Button for the geometry
var button = ui.Button({
  style: {
    position:('top-left'),
    fontFamily:('monospace'),
    color:('#009639'),
    backgroundColor:('#8f8f8f'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('100'),
    //fontSize :('6px'),
    //whiteSpace:('pre'),
    //border:('1px solid black'),
    //shown: (false)
    },
  label: 'Centrar Mapa',
  onClick: function() {
    print(Map.centerObject(geometry));
  }
});
//print(button);
Map.add(button);
// Create a panel, initially hidden.
var panel = ui.Panel({
  style: {
    width: '400px',
    shown: false
  },
  widgets: [
    ui.Label('Haz click en el mapa para cerrar el panel.')
  ]
});
//Let´s create and obtain the data for NDVI over time chart
var getdata= ee.ImageCollection ('COPERNICUS/S2') 
                .filterDate (fechaInicioChart, fechaFinChart)
                .filterBounds (geometry) 
                .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
//Calculations for NDVI
var withNDVI = getdata.map(function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
});
var chart1 = ui.Chart.image.doySeriesByYear({
      imageCollection: withNDVI.select ('NDVI'),
      bandName: ('NDVI'),
      region: geometry,
      regionReducer: ee.Reducer.mean(),
      scale: 30,
      //startDay:fechaInicioChart,
      //endDay:fechaFinChart,
    }).setOptions({
      title: 'Histórico NDVI',
      hAxis: {title: 'Línea Temporal (día)', gridlines: {count: 7}},
      vAxis: {title: 'Valor NDVI'},
      interpolateNulls: true,
    });
    chart1.style().set({
            width: '450px',
            height: '340px'
        });
  //we finally add the chart to the panel   
  panel.add(chart1);
//ADD CHART POINT ANALYSIS TO THE PANEL!!!
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Image Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Hacer Click en un punto del mapa para inspeccionar.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  //lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(2, dot);
  // Create an NDVI chart.
  var ndviChart = ui.Chart.image.seriesByRegion({
      imageCollection: withNDVI.select ('NDVI'),
      band: ('NDVI'),
      regions: point,
      reducer: ee.Reducer.mean(),
      scale: 10,
  });
  ndviChart.setOptions({
    title: 'Histórico NDVI de un punto',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true,
  });
  panel.widgets().set(2, ndviChart);
});
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'Gráficas',
  style: {
    position:('top-left'),
    fontFamily:('monospace'),
    color:('#009639'),
    backgroundColor:('#8f8f8f'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('100'),
    //fontSize :('6px'),
    //whiteSpace:('pre'),
    //border:('1px solid black'),
    //shown: (false)
    },
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
Map.add(button);
ui.root.insert(0, panel);
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//MEJORAS PARA LA APP and visualization
Map.setOptions('SATELLITE');
// Set position of new panel2 for legend and title of map
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title for panel2
var legendTitle = ui.Label({
value: 'NDVI',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
//Add AGRON logo
/*
var logo = ee.Image("users/agronservice/tif_2");
//Add logo to panel2 we create
var branding = ui.Thumbnail({
  image:logo,
  params:{bands:['b1','b2','b3'],min:0,max:255},
  style:{width:'75px',height:'75px'}});
legend.add(branding);
*/
// Add the title to the panel2
legend.add(legendTitle);
// create vizualization parameters of the panel2
var viz = {min:0, max:1, palette:['b5b1ae', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301']};
// create the legend image of panel2
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel1);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x200'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel1 = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel1);
Map.add(legend);
//Add text to the map
var label = ui.Label('Developed by AGRON Golf tech.');
  label.style().set({
    position:('bottom-right'),
    fontFamily:('monospace'),
    color:('#009639'),
    backgroundColor:('#DBDBDB'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('100'),
    //fontSize :('6px'),
    //whiteSpace:('pre'),
    //border:('1px solid black'),
    //shown: (false)
    });
//print(label);
Map.add(label);
//Do a Check Box
/*var checkbox = ui.Checkbox('Mostrar Layers', false);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get().setShown(checked);
});
Map.add(checkbox);*/
/*
// CREATE 2 MAPS
var leftMap = ui.Map();
//leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
//rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Selecciona capa para visualizar');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)['NDVI'], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
leftMap.setControlVisibility({zoomControl: true});
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
/*
//===============================Create a slider==========================//
// A helper function to show the image for a given year on the default map.
var showLayer = function(imageNumber) {
  Map.layers().reset();
  var image2 = image.toList(1, imageNumber).get(0);
  Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      bands: ['nd'],
      min: 0,
      max: 1,
      palette: ndviPalette
    },
    name: nameVigorosidad_Cultivo + imageNumber
  });
};
print ('hola')
// Create a label and slider.
var label = ui.Label('NDVI');
// Make a slider to step through all the images.
var slider;
s2.size().evaluate(function(size) {
  slider = ui.Slider({
    min: 0,
    max: size-1,
    step: 1,
    onChange: showLayer,
    style: {stretch: 'horizontal'}
  });
  // Create a panel that contains both the slider and the label.
  var panel2 = ui.Panel({
    widgets: [label, slider],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'top-center',
      padding: '7px'
    }
  });
  // Add the panel to the map.
  Map.add(panel2);
  // Set default values on the slider and map.
  slider.setValue(0);
})
*/
/*
//OTRO SLIDER
var dateSliderOne = ui.Panel([ui.DateSlider({
  start: fechaInicioNDVI,
  end: fechaFinNDVI
})]);
Map.add(dateSliderOne)
*/
/*
// Define a function to generate a download URL of the image for the
// viewport region. 
function downloadImg() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs = {
    name: 'ee_image',
    band: (nameVigorosidad_Cultivo),
    scale: 10,
    region: viewBounds.toGeoJSONString()
 };
 var url = image.getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
// Add UI elements to the Map.
var downloadButton = ui.Button('Download viewport', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
var panel = ui.Panel([downloadButton, urlLabel]);
Map.add(panel);
*/
/////////////////////////////STATISTICS///////////////////////////////////////////////////////
// Create a panel, initially hidden.
/*
var panel3 = ui.Panel({
  style: {
    width: '400px',
    shown: false
  },
  widgets: [
    ui.Label('Haz click en el mapa para cerrar el panel.')
  ]
});
var intro3 = ui.Panel([
  ui.Label({
    value: 'Valores Estadísticos de los Índices',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
panel3.add(intro3);
var maxIndexl = ui.Label(maxIndex.get('Vigorosidad_Cultivo'));
var minIndexl = ui.Label(minIndex.get('Vigorosidad_Cultivo'));
var meanIndexl = ui.Label(meanIndex.get('Vigorosidad_Cultivo'));
var Kcl = ui.Label(Kc);
var area=ui.Label('Polygon area: ', geometry.area().divide(10000));
panel3.add(ui.Panel([area,maxIndexl,minIndexl,meanIndexl,Kcl], ui.Panel.Layout.flow('horizontal')));
// Create a button to unhide the panel.
var button3 = ui.Button({
  label: 'Valores Estadísticos',
  style: {
    position:('top-left'),
    fontFamily:('monospace'),
    color:('#009639'),
    backgroundColor:('#8f8f8f'),
    padding:('3px 3px 3px 3px' ),
    //height:('500'),
    //fontWeight: ('100'),
    //fontSize :('6px'),
    //whiteSpace:('pre'),
    //border:('1px solid black'),
    //shown: (false)
    },
  onClick: function() {
    // Hide the button.
    button3.style().set('shown', false);
    // Display the panel.
    panel3.style().set('shown', true);
    // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId3 = Map.onClick(function() {
      panel3.style().set('shown', false);
      button3.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId3);
    });
  }
});
// Add the button to the map and the panel to root.
Map.add(button3);
ui.root.insert(0, panel3);
*/
/*
// Extracting the series of VI
var ndvis = image.select(['Vigorosidad_Cultivo']);
// Individual differences of composites from the start and the end of time period
var ndvipre = ndvis.filterDate('2019-12-05', '2019-12-10').median();
var ndviactual = ndvis.filterDate('2019-12-10', '2019-12-16');
var difference = ndviactual.subtract(ndvipre);
var differenceLoss= difference.mask(difference.lt(0)).clip(geometry);
var num_differenceLoss=differenceLoss.reduceRegion(ee.Reducer.count(), geometry,250);
print(num_differenceLoss,'NDVI difference');
*/
//////////////////////////////DSM///////////////////////////////////////////////
//Selección de la colección DEM
var DEM = ee.Image("JAXA/ALOS/AW3D30_V1_1");
//Generación de los mapas de pendientes y orientación de laderas
var slope =  ee.Terrain.slope (DEM);
var slope = slope.clip(geometry.buffer(10));
var aspect =  ee.Terrain.aspect (DEM);
var aspect = aspect.clip(geometry.buffer(10));
var DSM = DEM.select('AVE');
var DSM = DSM.clip(geometry.buffer(10));
//Visualización de pendientes
Map.addLayer (slope,{
  min: 0.0,
  max: 90.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},
'Pendientes',false);
// Convert to radians, compute the sin of the aspect.
var sinImage = aspect.divide(180).multiply(Math.PI).sin();
// Display the result.
Map.addLayer(sinImage, {min: -1, max: 1}, 'Orientaciones', false);
/*
//Visualización de orientación de laderas
Map.addLayer (aspect,{
  min: 0.0,
  max: 360.0,
  shown:false,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},
'Laderas');
*/
//Visualización de DEM
Map.addLayer (DSM,{
  min: 20.0,
  max: 165.0,
  palette: [
    '709959', '8ead6a', 'acc27a', 'cbd68b', 'ebe89d', 'f2ea9d', 'f2e399',
    'f2dc91', 'f2d38a', 'ebc486', 'e0b484', 'd4a281', 'c9957f', 'c79183',
    'd9a5a5', 'e6bcc7', 'f2d8e6', 'fff2ff'
  ]},
'Modelo Digital del Terreno');
// Load the SRTM image as new DEM.
var srtm = ee.Image('CGIAR/SRTM90_V4');
// Compute the mean elevation in the polygon.
var meanDict = srtm.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: planarPolygon,
  scale: 90
});
// Get the mean from the dictionary and print it.
var mean = meanDict.get('elevation');
print('Mean elevation', mean);