var India = ee.FeatureCollection("users/sachinbobbili/India");
Map.centerObject(India,4.5);
Map.setOptions("SATELLITE")
var years = ['2000','2001','2002','2003','2004',
             '2005','2006','2007','2008','2009',
             '2010','2011','2012','2013','2014',
             '2015','2016','2017','2018','2019',
             '2020','2021','2022'];
var yearSelector = ui.Select({
  items: years,
  value: '2022',
  placeholder: 'Select a year',
  style:{color:'red',
         textAlign:'center',
         fontSize :'24px'
 }
  });
Map.add(yearSelector);
var bands =['NDVI','EVI'];
var bandSelector = ui.Select({items:bands, 
                              placeholder:'Select Vegetation Indice', 
                              value:'EVI', 
                              onChange:function(){}, 
                              style:{color:'red',
                              width:'200px',
                              textAlign:'center',
                              fontSize :'24px'
                              }});
Map.add(bandSelector); 
var loadImage = function() {
  var year = yearSelector.getValue();
  var band = bandSelector.getValue();
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), 1, 1);
  var endDate = startDate.advance(1, 'year');
  var col = ee.ImageCollection("MODIS/061/MOD13Q1");
  var filtered = col.filter(ee.Filter.date(startDate, endDate));
  var composite = filtered.select(band).mean().clip(India);
  var layerName = 'Terra 16-Day Global 250m ' +band + ' '+year;
  var Vis = { min: 0.0,
  max: 8000.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301']};
  Map.addLayer(composite, Vis, layerName);
};
var button = ui.Button({
  label: 'Submit',
  onClick: loadImage,
  style:{color:'red',
        textAlign:'center',
        fontSize :'24px'
                              }
  });
Map.add(button);