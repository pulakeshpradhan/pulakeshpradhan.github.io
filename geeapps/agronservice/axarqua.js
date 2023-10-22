var geometry = /* color: #00ffff */ee.Geometry.Polygon(
        [[[-4.086717727556561, 36.75490030487483],
          [-4.011766097856821, 36.760686144666884],
          [-4.009765015053063, 36.85570439410366],
          [-4.010229101266191, 36.92150764047109],
          [-4.077841790914135, 36.95403010497764],
          [-4.2552739296687605, 36.89421544504862],
          [-4.170828234457531, 36.767879547342154]]]);
//First variables to choose dates of calculated imags and NDVI chart
var fechaInicioNDVI = '2016-12-21';
var fechaFinNDVI = '2016-12-31';
var fechaInicioChart = '2016-01-01';
var fechaFinChart =  new Date()-3;
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
var ndviPalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
var ndwiPalette = ['f7fcf0', 'e0f3db', 'ccebc5', 'a8ddb5', '7bccc4', '4eb3d3', '2b8cbe', '08589e'];
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
        image=clip.addBands(clip.normalizedDifference(['B8','B4']).rename('NDVI'));
        var nameNDVI= 'NDVI_'+cuenta.toString()+'_'+date;
        Map.addLayer(image.select(['NDVI']), {min:0, max: 1,palette: ndviPalette},nameNDVI);
        Export.image.toDrive({ 
                   image: image.select(['NDVI']),
                   description: nameNDVI,
                   fileNamePrefix: nameNDVI,
                   scale: 10,
                   region:geometry,
                   });
        //NDWI: calculate reusing the image already we use in NDVI calculation (as a clip, because it contains all bands) , give name, visualize and export to task menu.        
        image=image.addBands(image.normalizedDifference(['B8A','B11']).rename('NDWI'));
        var nameNDWI= 'NDWI_'+cuenta.toString()+'_'+date;
        Map.addLayer(image.select(['NDWI']), {min:0, max: 1,palette: ndwiPalette},nameNDWI);
        Export.image.toDrive({ 
                     image: image.select(['NDWI']),
                     description: nameNDWI,
                     fileNamePrefix: nameNDWI,
                     scale: 30,
                     region:geometry,
                     });
        //NDRE: calculate reusing the image already we use in NDWI calculation (as a clip, because it contains all bands) , give name, visualize and export to task menu.            
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
        var meanindex = image.reduceRegion({
          reducer: ee.Reducer.mean(),
          geometry: image.geometry(),
          scale: 10,
          maxPixels: 1e9
        });
        print(meanindex);
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
var chart1 = ui.Chart.image.series({
      imageCollection: withNDVI.select('NDVI'),
      region: geometry,
      reducer: ee.Reducer.first(),
      scale: 30
    }).setOptions({
      title: 'Histórico NDVI',
      hAxis: {title: 'Línea Temporal'},
      vAxis: {title: 'Valor NDVI'}
    });
    chart1.style().set({
            width: '380px',
            height: '300px'
        });
  //we finally add the chart to the panel   
  panel.add(chart1);
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
value: 'VI',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}
});
//Add AGRON logo
/*
var logo = ee.Image("users/agronservice/LOGO_negro");
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
var viz = {min:0, max:1, palette:['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
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