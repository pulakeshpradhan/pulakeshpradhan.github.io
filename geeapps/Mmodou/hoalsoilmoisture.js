var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            15.148415,
            48.15467
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([15.148415, 48.15467]);
/*****************************************************************************************************************************************
 *  Remote sensing and Cosmic-ray neutron sensor data code 
 *  for  converting VV polarization to absolute surface soil moisture in petzenkirchen.
 * Soil Water Management and Crop Nutrition Laboratory, 
 * Joint FAO/IAEA Centre of Nuclear Techniques in Food and Agriculture, Seibersdorf, Austria
 * Centre d'Etude Régional pour l'Amélioration de l'Adaptation à la Sécheresse (CERAAS),
 * Institut Sénégalais de Recherche Agricole (ISRA), Thiès Senegal
 * 
 * Applicatiion
 * R^2 ~ 0.65
 * correlation ~ 0.81 at 95% confidence interval: [0.6194450 0.9094365]
 * csx=15.148415; csy=48.15467;
*/
var crnsLocalisation=ee.Geometry.Point([15.14841,48.15467]); 
var buffer=crnsLocalisation.buffer(1200)
var region=buffer
Map.setOptions('SATELLITE')
Map.centerObject(crnsLocalisation,16)
//Map.addLayer(buffer,{},'Foot Print')
/////////////////////////////////////////change detection algorithm     ++++++++++++++++++++++++++++++++/////////////
//var now=ee.Date(Date.now())
var now=ee.Date(Date.now())
var boxcar = ee.Kernel.circle(10);
var collection = ee.ImageCollection("COPERNICUS/S1_GRD")
                  .filterBounds(region)
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
                  //.filterDate('2020-01-01','2021-12-30')
                  //
                  .map(function(image){
                    return image.clip(region)
                                .select(['VV'])
                                .convolve(boxcar)
                  })
var soilmoisture = collection
                    .select(['VV'])
                    .filterDate(now.advance(-360,'day'),now)
                    .map(function(image){
                      return image.multiply(0.01)
                                  .add(0.36)
                                  .select('VV')
                                  .rename('SSM')
                                  .copyProperties(image, ['system:time_start'])
                    })
// // // /////////////////////////////////////////change detection algorithm  fin    ++++++++++++++++++++++++++++++++/////////////
var panel = ui.Panel();
panel.style().set('width', '450px');
var header = ui.Label("High Resolution  Spatial Soil Moisture Estimation Using Both Radar C-Bands Sentinel-1 and Cosmic-Ray Neutron Sensor in Petzenkirchen HOAL station",{fontSize: '20px',textAlign:'center' ,color: 'black', fontWeight: 'bold'});
var texts = ui.Label({
              value: "This about Spatial Soil moisture modelling and calibrated with in-situ Cosmic-ray Neutron sensor. "+
                    "Direct Radar Backsattered coefficients were used  and Markov Chain Monte Carlo was used to derived accurate"+
                    "statistics. correlation and regression were performed and the obtained equation was used to derived"+
                    "soil water content at m3/m3 in the current study Area of Petzenkirchen. To better describe and understand " +
                    " Soil moisture dynamics, we integrated vegetation index through the widely used NDVI index" +
                    " we also integrated rainfall and temperature in the  study area for better inference about top"+
                    " 5 cm soil moisture",style: {fontSize: '14px', }});
texts.style().set({textAlign:'justify'});
var contacts = ui.Label('Soil Water Management Joined Division IAEA-FAO, Seibersdorf, Vienna, Austria', {fontSize: '15px', color: 'blue'},'')
panel.add(header); 
panel.add(texts);
// panel.add(contacts);
var long=ui.Label({style:{fontSize:'18px',fontWeight:'bold',fontFamily:'sherif'}})
var lat=ui.Label({style:{fontSize:'18px',fontWeight:'bold',fontFamily:'sherif'}})
panel.add(ui.Panel([long,lat],ui.Panel.Layout.flow('horizontal')));
// listening users  to click //////
Map.onClick(function(coords){
Map.layers().remove(Map.layers().get(0));
long.setValue('lon:' + coords.lon.toFixed(3))
lat.setValue('lat:'  + coords.lat.toFixed(3))
var point=ee.Geometry.Point(coords.lon,coords.lat)
var layer=ui.Map.Layer(point,{color:'black'})
var soilmoisture = collection
                    .select(['VV'])
                    .filterDate(now.advance(-300,'day'),now)
                    .map(function(image){
                      return image.multiply(0.0222)
                                  .add(0.4945)
                                  .select('VV')
                                  .rename('SSM')
                                  .copyProperties(image, ['system:time_start'])
                    })
var S2=ee.ImageCollection('COPERNICUS/S2')
        .filterDate(now.advance(-360,'day'),now)
        .filterBounds(region)
        .select('B2','B3','B4','B8','B11','B12')
        .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',15)
        .map(function(image){ 
          return image.addBands(image.normalizedDifference(['B8','B4']).rename('ndvi'))
        }); 
var chirps=ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD')
            .filterDate(now.advance(-360,'day'),now)
            .filterBounds(region)
var mapId=ui.Map.Layer(S2.select('ndvi').max().clip(region),{min:0.05, max:0.85, palette: ["blue","black","yellow","green"]},'NDVI')
var mapId1=ui.Map.Layer(soilmoisture.filterBounds(region),{min:0.14, max:0.35,palette:['red','yellow','blue','green']},'soil Moisture')
var mapId2=ui.Map.Layer(chirps.select('precipitation').filterBounds(region),{},'Precipitation',false) 
Map.layers().set(0,mapId)
Map.layers().set(1,mapId1)
Map.layers().set(2,mapId2)
Map.layers().set(3,layer)
var chartNDVI=ui.Chart.image.series(S2.select('ndvi'),point,ee.Reducer.mean(),10).setChartType('ScatterChart')
        .setOptions({
          title: 'Normalized Difference Vegetation Index NDVI',
          pointSize:4, 
          lineWidth: 1.9,
          hAxis:{title:'Dates', format: 'MM-yy', gridlines: {count: 7}},
          vAxis:{title:'Vegetation Index (NDVI)'}, 
          series:{0:{color:'green'}}
        });
var chartSSM = ui.Chart.image.series(
    soilmoisture.select('SSM'), point, ee.Reducer.mean(), 30)
        .setOptions({
    title: 'Top Surface (0-10cm) Soil Moisture  over 1 Year period',
    pointSize:4,
    vAxis: {title: 'VWC (cm3/cm3)'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'black',
        lineWidth: 1.9
      },
    },
    legend: {position: 'left'},
  });
var chartCHIRPS=ui.Chart.image.series(chirps,point,ee.Reducer.max(),1000)
.setOptions({title:'Rainfall (CHIRPS)', 
                      vAxis:{title:'Precipitation mm/day'}, 
                      hAxis:{title:'Dates',format: 'MM-yy', gridlines: {count: 7}},
                      lineWidth:1.9,
                      pointSize:4,
                      series:{0:{color:'#051cde'}}
  })
panel.widgets().set(4,chartSSM); 
panel.widgets().set(5,chartNDVI);
panel.widgets().set(6,chartCHIRPS)
}); 
Map.style().set('cursor','crosshair');
ui.root.insert(1, panel)