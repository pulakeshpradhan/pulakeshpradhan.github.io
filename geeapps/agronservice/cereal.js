//First variables to choose dates of calculated imags and NDVI chart
var newDate = new Date();
var fechaFinNDVI = '2019-10-30';
var fechaInicioNDVI = '2019-10-01';
var fechaInicioChart = '2016-01-01';
var fechaFinChart =  new Date()-3;
//GEOMETRY CALCULATIONS AND functions
//The first step is on imports
var geometry = /* color: #d63000 */ee.Geometry.MultiPolygon(
        [[[[-4.916148578877173, 37.465590773181496],
           [-4.915633594746313, 37.46530123954195],
           [-4.9153761026808835, 37.46540342801335],
           [-4.91471091484519, 37.465028736268685],
           [-4.914839660877905, 37.4647902950898],
           [-4.911320602650366, 37.462712418344154],
           [-4.911063110584936, 37.46238880939172],
           [-4.910655414814673, 37.46223552045171],
           [-4.910204803700171, 37.46204816687604],
           [-4.909582531208716, 37.462099263352336],
           [-4.909282123799048, 37.46199707036483],
           [-4.908638393635473, 37.461622361549104],
           [-4.907994663471899, 37.461060294804675],
           [-4.907629883045874, 37.460532288862765],
           [-4.902372753376684, 37.462525065963426],
           [-4.902844822163305, 37.46298493005986],
           [-4.903145229572973, 37.463410727627284],
           [-4.903574383015356, 37.46429637880019],
           [-4.903939163441382, 37.464858421218494],
           [-4.904497062916479, 37.46540342801335],
           [-4.9048403856703855, 37.4657099925895],
           [-4.90548411583396, 37.46591436827524],
           [-4.906127845997534, 37.466186868320456],
           [-4.906793033833227, 37.466459367372416],
           [-4.9075590280239645, 37.46703070737457],
           [-4.908352961892373, 37.46767788369618],
           [-4.908996692055947, 37.468256931445424],
           [-4.909511676186806, 37.4684783308701],
           [-4.910691848153359, 37.46919361683769],
           [-4.911271205300576, 37.46869972963907],
           [-4.911872020119912, 37.46837614660174],
           [-4.912558665627724, 37.46800146975601],
           [-4.913459887856728, 37.467405389085755],
           [-4.915026297921425, 37.46633243190196]]],
         [[[-4.89877908433282, 37.46121055697877],
           [-4.897663285382625, 37.46199404122137],
           [-4.89828555787408, 37.46255610094688],
           [-4.898929288037654, 37.46313518836623],
           [-4.89953010285699, 37.463441762243086],
           [-4.9000665446599685, 37.46376536663827],
           [-4.900431325085994, 37.46391865244187],
           [-4.900495698102351, 37.464140064714485],
           [-4.900624444135066, 37.464276318094804],
           [-4.900967766888972, 37.46431038140108],
           [-4.9011394282659255, 37.46449772930822],
           [-4.901461293347713, 37.464719139865956],
           [-4.9018904467900954, 37.464821329132974],
           [-4.9022123118718826, 37.464804297598164],
           [-4.902577092297908, 37.465008675759776],
           [-4.902761487842262, 37.46526892270433],
           [-4.9029653357273935, 37.46543923681936],
           [-4.903201370120704, 37.46558400351208],
           [-4.903458862186134, 37.465788379542225],
           [-4.90380218494004, 37.465933145558886],
           [-4.90405967700547, 37.46606939567142],
           [-4.904220609546363, 37.466248223567305],
           [-4.90454247462815, 37.46613752063459],
           [-4.9048106955296396, 37.46606939567142],
           [-4.904864339709937, 37.4659416611982],
           [-4.904177694202125, 37.4653625955156],
           [-4.90405967700547, 37.46523485983476],
           [-4.903145827135873, 37.46386931802332],
           [-4.902394808611703, 37.464286594727405],
           [-4.902577198824716, 37.46442284784065],
           [-4.902491368136239, 37.46450800591038],
           [-4.901901282152963, 37.46432917385197],
           [-4.901622332415414, 37.46410776213939],
           [-4.901300467333627, 37.46374157979119],
           [-4.901622332415414, 37.463400943438565],
           [-4.901944197497201, 37.463417975293055],
           [-4.902298249087167, 37.46323914062743],
           [-4.902845419726205, 37.46371603211859],
           [-4.903017081103158, 37.463664936747165],
           [-4.902899063906503, 37.4634094593663],
           [-4.902641571841073, 37.463019081099276],
           [-4.902287520251107, 37.46272953750057],
           [-4.9019334686611415, 37.462337800258865],
           [-4.901643790087533, 37.46203973793917],
           [-4.901300467333627, 37.461826835554824],
           [-4.900764025530648, 37.4615287711983],
           [-4.899991549334359, 37.46115406003576],
           [-4.899380005678964, 37.46158838416465],
           [-4.898918665728402, 37.4612307056536]]],
         [[[-4.917299470791523, 37.46433727567749],
           [-4.916548452267353, 37.463962578589616],
           [-4.916226587185566, 37.4637496816804],
           [-4.915604314694111, 37.46327279040386],
           [-4.914756736645405, 37.46238712710612],
           [-4.9135658358427925, 37.462370095016794],
           [-4.913297614941303, 37.46222532210101],
           [-4.911430797466938, 37.462259386341735],
           [-4.911312780270283, 37.46236157897068],
           [-4.911366424450581, 37.462617059932036],
           [-4.913622029256675, 37.46397362372638],
           [-4.916078932714316, 37.46539575931967],
           [-4.917323477697226, 37.465302086549926]]],
         [[[-4.935438192873322, 37.450558091798065],
           [-4.936275042085969, 37.44972338284521],
           [-4.936446703462922, 37.44892273489387],
           [-4.937884367494904, 37.44672516775631],
           [-4.938184774904572, 37.44582227262614],
           [-4.938270605593049, 37.44510676308595],
           [-4.937533437841828, 37.43963529430066],
           [-4.935656797618068, 37.43816899421319],
           [-4.933832895487941, 37.43602222550752],
           [-4.92838264676968, 37.43740229817318],
           [-4.928146612376369, 37.43709561755787],
           [-4.926601659983791, 37.437334147033944],
           [-4.924970876902736, 37.437640826671775],
           [-4.922503244609035, 37.439020869489816],
           [-4.9196708318893085, 37.440145330006516],
           [-4.917042334564991, 37.44157129392693],
           [-4.911098559387989, 37.445251158261286],
           [-4.901955855240572, 37.45116901014786],
           [-4.8957060307903655, 37.455418580846036],
           [-4.896027895872153, 37.455588917398174],
           [-4.8973797292156585, 37.45822908434674],
           [-4.897873255674399, 37.459370288949515],
           [-4.898645731870688, 37.46018785765867],
           [-4.899718615476645, 37.46081806077118],
           [-4.90158543295101, 37.46185703268463],
           [-4.902207705442465, 37.46245819411043],
           [-4.90956768697933, 37.45978411111952],
           [-4.92547146523898, 37.453793612292394],
           [-4.9317265250092035, 37.45148778609377],
           [-4.932520458877612, 37.45126633635824],
           [-4.934279987991381, 37.45084046963951],
           [-4.934644768417407, 37.450601983217965]]]]);
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
var ndwiPalette = //['#eff3ff', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#084594', '#002556'];
['eff3ff','deebf7','9ecae1','3182bd', '08519c','dd1c77','980043', 'fb6a4a', 'a50f15'];
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
        image=clip.addBands(clip.normalizedDifference(['B8','B4']).rename('Vigorosidad_Cultivo'));
        var nameVigorosidad_Cultivo= 'Vigorosidad_Cultivo_'+cuenta.toString()+'_'+(date);
        var NDVI=image.addBands('Vigorosidad_Cultivo');
        Map.addLayer(image.select(['Vigorosidad_Cultivo']), {min:0, max: 1,palette: ndviPalette},nameVigorosidad_Cultivo, false);
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
    style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: '#d4fcac'}
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
  //CHIRPS Precipitation chart
  var prec = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
  .filterDate(fechaInicioChart, fechaFinChart)
  .select(['precipitation'])
  .filterBounds(geometry);
  // .map(function (img) {
  //   return img.clip(g).multiply(30)
  //   .set('system:time_start', img.get('system:time_start')). select(['precipitation']);
  //   })
  //   .sort('system:time_start', true);
  Map.style().set('cursor', 'crosshair');
  // Create prec chart.
  var precChart = ui.Chart.image.series(prec, geometry)
      .setOptions({
        title: 'Precipitación',
        vAxis: {title: 'Prec. (mm)'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        colors: ['#000099'],
      });
  //panel.widgets().set(3, GSMapChart);
  panel.add(precChart);
  //MODIS Temp chart
  var temp = ee.ImageCollection('MODIS/006/MOD11A2')
    .select(['LST_Day_1km'])
    .filterDate(fechaInicioChart, fechaFinChart)
    .map(function (img) {
    return img.clip(geometry).multiply(0.02).subtract(273.15)
    .set('system:time_start', img.get('system:time_start')). select(['LST_Day_1km']);
    })
    .sort('system:time_start', true);
    // Create temp chart.
  var TempChart = ui.Chart.image.series(temp, geometry)
      .setOptions({
        title: 'Temperatura',
        vAxis: {title: 'Temp. °C'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        colors: ['#000099'],
      });
  //panel.widgets().set(4, TempChart);
  panel.add(TempChart);
Map.style().set('cursor', 'crosshair');
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
var label = ui.Label('AGRON - make sense of the data');
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
  min: 133.0,
  max: 256.0,
  palette: [
    '709959', '8ead6a', 'acc27a', 'cbd68b', 'ebe89d', 'f2ea9d', 'f2e399',
    'f2dc91', 'f2d38a', 'ebc486', 'e0b484', 'd4a281', 'c9957f', 'c79183',
    'd9a5a5', 'e6bcc7', 'f2d8e6', 'fff2ff'
  ]},
'Modelo Digital del Terreno');
// Load the SRTM image as new DEM.
var srtm = ee.Image('CGIAR/SRTM90_V4');
//var scale = srtm.projection().nominalScale();
//print('SRTM scale in meters', scale);
// Compute the mean elevation in the polygon.
var meanDict = srtm.reduceRegion({
  bestEffort: true,
  reducer: ee.Reducer.mean(),
  geometry: geometry,
  scale: 90
});
print('Mean elevation', meanDict);
// Get the mean from the dictionary and print it.
var mean = meanDict.get('elevation');
print('Mean elevation', mean);
var maxALT= srtm.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: geometry,
  maxPixels: 1000
});
var maxal = maxALT.get('elevation');
print('Max elevation', maxal);
var minALT = srtm.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: geometry,
  maxPixels: 1000
});
var minal = minALT.get('elevation');
print('Min elevation', minal);
/*
app.boot = function() {
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.export.panel,
    ],
    style: {width: '350px',backgroundColor: '225129'}
  });
  ui.root.clear();
  ui.root.insert(0, main);
  maps[0].style().set('cursor', 'crosshair');
  maps[1].style().set('cursor', 'crosshair');
  maps[2].style().set('cursor', 'crosshair');
  maps[3].style().set('cursor', 'crosshair');
  maps[4].style().set('cursor', 'crosshair');
  ui.root.add(mapGrid);
  ui.root.add(panel);
};
app.boot();
*/