var anos = ee.List(['1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996',
            '1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008',
            '2009','2010','2011','2012','2013','2014','2015','2016','2017'
            ]);
var clip = ee.FeatureCollection('users/rnvuefsppgm/MA_PE_clip_V2').geometry();
var palettes = require('users/mapbiomas/modules:Palettes.js');
var integ30 = ee.Image("projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_integration_v1")
                .clip(clip);
var FeatureClass = ee.List([]);
anos.evaluate(function(years){
    var nowhereFeature;
    years.forEach(function(ano){
      var colclip =  integ30.select(['classification_'+ano]);
      var mask3 = colclip.mask(colclip.select('classification_'+ano).eq(3));
      var pixelCount3 = mask3.select('classification_'+ano).multiply(ee.Image.pixelArea()).divide(1000).reduceRegion({reducer: ee.Reducer.count(),geometry: clip,   scale: 30,   maxPixels: 1e13  });
      var mask4 = colclip.mask(colclip.select('classification_'+ano).eq(4));
      var pixelCount4 = mask4.select('classification_'+ano).multiply(ee.Image.pixelArea()).divide(1000).reduceRegion({reducer: ee.Reducer.count(),geometry: clip,   scale: 30,   maxPixels: 1e13  });
      var mask12 = colclip.mask(colclip.select('classification_'+ano).eq(12));
      var pixelCount12 = mask12.select('classification_'+ano).multiply(ee.Image.pixelArea()).divide(1000).reduceRegion({reducer: ee.Reducer.count(),geometry: clip,   scale: 30,   maxPixels: 1e13  });
      var mask21 = colclip.mask(colclip.select('classification_'+ano).eq(21));
      var pixelCount21 = mask21.select('classification_'+ano).multiply(ee.Image.pixelArea()).divide(1000).reduceRegion({reducer: ee.Reducer.count(),geometry: clip,   scale: 30,   maxPixels: 1e13  });
      var mask26 = colclip.mask(colclip.select('classification_'+ano).eq(26));
      var pixelCount26 = mask26.select('classification_'+ano).multiply(ee.Image.pixelArea()).divide(1000).reduceRegion({reducer: ee.Reducer.count(),geometry: clip,   scale: 30,   maxPixels: 1e13  });
      var dict = ee.Dictionary({
                    'ano': ano,
                    'areaFloresta': pixelCount3.get('classification_'+ano), 
                    'areaSavana': pixelCount4.get('classification_'+ano), 
                    'areaCampo': pixelCount12.get('classification_'+ano), 
                    'areaAgricultura': pixelCount21.get('classification_'+ano), 
                    'areaAgua': pixelCount26.get('classification_'+ano)
        });
        // Create a null geometry feature with the dictionary of properties.
        nowhereFeature = ee.Feature(null, dict);
        //print('diccionario ', nowhereFeature)
        FeatureClass = ee.List(FeatureClass).add(nowhereFeature)
        Map.addLayer(colclip, {min:0, max:33, palette:palettes.get('classification2'), format: 'png'}, '3.0'+ano, true);
        return FeatureClass
      })
      FeatureClass = ee.FeatureCollection(FeatureClass)
      //print('toda feature collection', FeatureClass)
      //Define a dictionary of customization options.
      var options = {
          title: 'Grafico Area',
          vAxis: {title: 'Área Km²'},
          lineWidth: 2,
          pointSize: 6,
          legend: {position: 'none'},
          colors: ['#3a843c', '#07ff0e', '#c7ed1e', '#ffc700', '#0048ff'],
          hAxis: {
            title: "Anos",
            logScale: true
          },
          width: 850, 
          height: 400,
          margin: '0 0 4px 0',
          padding: '0'
      };
      var optChar = {
                features: FeatureClass,
                xProperty: 'ano',
                yProperties: ['areaFloresta', 'areaSavana', 'areaCampo', 'areaAgricultura', 'areaAgua']
      }
      // Make a BarChart from the table and the options. featuress
      var chart = ui.Chart.feature.byFeature(optChar)
                          .setChartType('LineChart')
                          .setOptions(options)
      //print(chart);
      var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    height: '500px', 
    width: '900px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Gráfico de área',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
legend.add(chart);
Map.add(legend);
Map.setCenter(-37.0000, -8.0000, 8)      
});