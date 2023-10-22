var country = ui.import && ui.import("country", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2");
/******************************************
 * last version Modou
 * for Mauritus
 * 
 * ****************************************/ 
/*
   Application  R^2 ~ 0.65 correlation ~ 0.81 at 95% confidence interval: [0.6194450 0.9094365]
  var drySigma = collection.select('VV').reduce(ee.Reducer.percentile([10]));
  var wetSigma = collection.select('VV').reduce(ee.Reducer.percentile([90]));
  var sensitivity = wetSigma.subtract(drySigma).select('VV_p90').rename('sensitivity');
*/
var now=ee.Date(Date.now())
Map.setOptions('SATELLITE')
var regions=country.filter(ee.Filter.eq('ADM0_NAME','Mauritius'))
var empty=ee.Image().toByte()
var outlines = empty.paint({
  featureCollection: regions,
  color: 'red',
  width: 2
});
Map.setCenter(57.574257077938654,-20.27453109448651, 14);
Map.addLayer(outlines, {}, 'sites');
var t1 = new Date();
t1.setMonth(t1.getMonth() - 1);
var t2 = ee.Date(t1.getTime())
var now=ee.Date(Date.now())
var boxcar = ee.Kernel.circle(3);
var collection = ee.ImageCollection("COPERNICUS/S1_GRD")
                  .filterBounds(regions)
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
                  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
                  .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
                  .filterDate(now.advance(-120,'day'),now)
                  .map(function(image){
                    return image.clip(regions)
                                .select(['VV'])
                                .convolve(boxcar)
                  })
var dwVisParams = {
  min: 0,
  max: 8,
  opacity:0.79,
  palette: [
    '#1139ff', '#397D49', '#88B053', '#7A87C6', '#E49635', '#DFC35A',
    '#C4281B', '#A59B8F', '#B39FE1'
  ]
};
var GraphPanel = ui.Panel({style: {width: '17%', height: '38%',position: 'top-left'}});
var header = ui.Label("Last 30 Days LULC (Legend)",{fontSize: '12px',textAlign:'center' ,color: 'black', fontWeight: 'bold'});
GraphPanel.add(header); 
/*****************************************************************************************************
* legende
* my plalettes  '#B39FE1'   "snow"
* **************************************************************************************************/
var mypalette= [
  '#1139ff', '#397D49', '#88B053', '#7A87C6', '#E49635', 
  '#DFC35A','#C4281B', '#A59B8F',]
var mylabels=[
    "Water", "Tree", "Grass","Flooded Vegetation",
    "Crops","Scrub","Buildup", "bareground",
  ]
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({
      style: {
        position: 'bottom-right'
      }
    }),
    entry;
  legend.add(ui.Label({
    style: {
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '1px 1px 1px 1px',
      padding: '2px'
    }
  }));
  for (var x = 0; x < lbl.length; x++) {
    entry = [ui.Label({
        style: {
          color: pal[x],
          border: '1px solid black',
          margin: '1px 1px 4px 1px'
        },
        value: '██'
      }),
      ui.Label({
        value: mylabels[x],
        style: {
          margin: '1px 1px 4px 4px'
        }
      })
    ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  }
  GraphPanel.add(legend);
  // side_panel.add(legend)
};
add_legend('Legend', mylabels, mypalette);
Map.add(GraphPanel)
/******************************************************************************************************************************************
*  App development
* ******************************************************************************************************************************************/
var panel = ui.Panel();
panel.style().set('width', '400px');
var header = ui.Label("Climate-Smart Land and Water Management",{fontSize: '20px',textAlign:'center' ,color: 'black', fontWeight: 'bold'});
var texts = ui.Label({
              value: "This App is about a Large-Scale Spatio-Temporel Soil moisture map  and Forecasting using Cosmic-ray Neutron sensor, "+
                    " Earth Observation Satellite Data, and the NASA NEX-GDDP downscaled climate scenarios"+
                    "for the globe that are derived from the General Circulation Model (GCM)",style: {fontSize: '11px', }});
texts.style().set({textAlign:'justify'});
var contacts = ui.Label('', {fontSize: '10px', color: 'blue'},'')
panel.add(header); 
panel.add(texts);
panel.add(contacts);
var long=ui.Label({style:{fontSize:'12px',fontWeight:'bold',fontFamily:'sherif'}})
var lat=ui.Label({style:{fontSize:'12px',fontWeight:'bold',fontFamily:'sherif'}})
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
                    .map(function(image){
                      return image.multiply(0.0222)
                                  .add(0.4945)
                                  .select('VV')
                                  .rename('SSM')
                                  .copyProperties(image, ['system:time_start'])
                    })
var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
            .filterDate(now.advance(-150,'day'), now)
            .filterBounds(regions);
var classification = dw.select('label');
var dwComposite = classification.reduce(ee.Reducer.mode());
dwComposite=dwComposite.rename('classification')
var bounders= ee.Image().toByte().paint(regions, 1, 2);
var mapId=ui.Map.Layer(dwComposite.clip(regions),dwVisParams,'LULC')
var mapId1=ui.Map.Layer(soilmoisture.filterBounds(regions).filterDate(now.advance(-15, 'day'),now).max().clip(regions),{min:0.27, max:0.47,opacity:0.65,palette:['red','yellow','blue','black']},'soil Moisture',false)
var mapId2=ui.Map.Layer(bounders,{},'Boundering',true) 
Map.layers().set(0,mapId)
Map.layers().set(1,mapId1)
Map.layers().set(2,mapId2)
Map.layers().set(3,layer)
// Load the WAPOR 
  var evapo=ee.ImageCollection("FAO/WAPOR/2/L1_RET_E")
            .filterBounds(regions)
            .filterDate(now.advance(-120, 'day'), now)
            .map(function(image){
              return image.clip(regions).multiply(0.08).rename('Water_Requirement').copyProperties(image, ['system:time_start'])
            })
  var chart2 = ui.Chart.image.series(evapo.select('Water_Requirement'), point, ee.Reducer.mean(), 1000);
  chart2.setSeriesNames(['Crop Evapotranspiration']);
  chart2.setOptions({
    title: 'Crop Water Requirement',
    colors: ['#8e2108'],
    vAxis: {title: 'ETC (mm / day)'},
    hAxis: {title: 'Date', format: 'dd-MM-yy', gridlines: {count: 7}},
  });
// Climate Change Projections 
var base_collection = ee.ImageCollection('NASA/NEX-GDDP')  
    .select(['pr', 'tasmin'])
    .filterMetadata('model', 'equals', 'MIROC5');
// Convert temperature to Celsius.
var january = base_collection.map(function(image) {
  return image.subtract(273.15)
      .copyProperties(image, ['system:time_start', 'scenario']);
});
var rcp85 = january
                  // .filterDate('2023-04-01','2023-07-31')
                  .filterDate(now.advance(-30,'day'),now)
                  .filterMetadata('scenario', 'equals', 'rcp85');
var predictedSm= rcp85.map(function(image){ return image.select('tasmin').multiply(-0.00239).add(0.24).rename('ForecastingSM').copyProperties(image, ['system:time_start', 'scenario'])})
var predictedETo= rcp85.map(function(image){ return image.select('tasmin').multiply(1.4).rename('FETo').copyProperties(image, ['system:time_start', 'scenario'])})
var chartSSM = ui.Chart.image.series(
    predictedSm.select('ForecastingSM'), point, ee.Reducer.mean(), 30)
                .setChartType('LineChart')
                .setOptions({ title: 'Soil Moisture Forecasting',
                vAxis: {title: 'SSM (m3/m3)'},
                hAxis: {title: 'Date', format: 'dd-MM-yy', gridlines: {count: 7}},
                series: {0: {color: '#2b8cbe',lineWidth: 0.8}},legend: {position: 'left'}, });
var chartETo = ui.Chart.image.series(
    predictedETo.select('FETo'), point, ee.Reducer.mean(), 30)
                .setChartType('LineChart')
                .setOptions({ title: 'ETo Forecasting',
                vAxis: {title: 'ETo (mm/mm)'},
                hAxis: {title: 'Date', format: 'dd-MM-yy', gridlines: {count: 7}},
                series: {0: {color: '#252525',lineWidth: 0.8}},legend: {position: 'left'}, });
panel.widgets().set(4,chartSSM); 
panel.widgets().set(5,chartETo)
panel.widgets().set(6,chart2);
}); 
Map.style().set('cursor','crosshair');
ui.root.insert(1, panel)
//::::::::::::::::::::::: side 2 panel to hold information :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
/*****************************************************
 * -20.0555278,57.5315556 ----> Camp Bestel, OK
 * 57.5874674,-20.0461519 --->  Fond du Sac,
 * 
 * 57.492834,-20.233316  ---> Réduit, Moka
 * 57.609608,-20.080855 ---> Mapou
 * 57.4918361,-20.2336238 ---> Réduit, Moka, Mauritius
 * 
 * ******************************************************************************************/
var contactLabel = ui.Label({
    value: 'Contact: inph@gov.sn', 
    style: {fontSize: '12px',
            stretch: 'vertical',
            maxWidth: '120px'
    }
})
var Zoom1 = new ui.Button({
  label: 'Camp Bestel',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(57.5315556,-20.0555278,18)
    } 
})
var Zoom2 = new ui.Button({
  label: 'Fond du Sac',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(57.5874674,-20.0461519, 18)
    }
});
var Zoom3 = new ui.Button({
  label: 'Mapou',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(57.609608,-20.080855, 17)
    }
});
var Zoom4 = new ui.Button({
  label: 'Réduit, Moka',
  style: {stretch: 'horizontal'},
  onClick: function() {
      Map.setCenter(57.4918361,-20.2336238, 17)
    }
});
var emptyLabel = new ui.Label({
    value: '', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var legendGeneral= new ui.Label({
    value: 'NAVIGATION:', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    fontWeight: 'bold',
    maxWidth: '100px'
    }});
var textintros = new ui.Label({
    value: 'Navigation', 
    style: {
    fontSize: '14px',
    stretch: 'vertical',
    padding: '15px 0px 0px 0px'
    }});
var textintros1= new ui.Label({
    value: 'Clic Zoom!', 
    style: {
    fontSize: '14px',
    stretch: 'vertical'}});
var localization = new ui.Panel({
    widgets: [legendGeneral,
         textintros,
         textintros1,
         Zoom1, 
         Zoom2, 
         Zoom3, 
         Zoom4],
    layout: ui.Panel.Layout.flow('vertical'),
});
ui.root.insert(0, localization)
// ui.root.add(localization);