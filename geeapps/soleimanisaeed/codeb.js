var ndviVis = {"min":0,"max":1,"palette":["FFFFFF","CE7E45","DF923D","F1B555","FCD163","99B718","74A901","66A000","529400","3E8601","207401","056201","004C00","023B01","012E01","011D01","011301"]};
// Definable varaibles:
{
var Strt_date= ee.Date('2020-03-20'); 
var End_date = ee.Date('2021-03-19');
var ScaleForCharts=250;
var ROIs ={
  'Lighvan Chai':ee.FeatureCollection("users/soleimanisaeed/LighvanCatchment"),
  'Walnut Gulch':ee.FeatureCollection("users/soleimanisaeed/WGEW/boundary")
  };
}
// ======= NDVI TimeSeries as a chart ======= 
{
// Display the chart in the console.
}
// ====================================----------------========================
var slct = ui.Select({
  items: Object.keys(ROIs),
  placeholder:('Choose a location...'),
  onChange: function(key){
var chart1title= key+" 's mean NDVI over time - scale= "+ScaleForCharts+"m";
    print(key+" - Study Area's Boundary");
/* Load the MODIS/MOD09GQ 
(MOD09GQ.006 Terra Surface Reflectance Daily Global 250m)
  ======================= raw data, filtered by location and date.
*/
var dataset = ee.ImageCollection('MODIS/006/MOD09GQ')
                .filterDate(Strt_date,End_date)
                .filterBounds(ROIs[key])
                .map(function(img){
                      return img.addBands(
                                          img.normalizedDifference
                                        (['sur_refl_b02', 'sur_refl_b01'])
                            // Use the normalizedDifference(A, B) to compute (A - B) / (A + B)
                                        .rename("NewNDVI")
                                          )
                                .select('NewNDVI')
                                .clip(ROIs[key]);
                                   }
                      );
// Show the first dataset
  var nd=dataset.median();
  // print(nd);
// Define chart                          
var chrt1 = ui.Chart.image.series({
  imageCollection:dataset,
  region: ROIs[key],
  reducer:ee.Reducer.mean(),
  scale:ScaleForCharts,
  // xProperty
  }).setOptions({
                 title:chart1title,
                 hAxis: {title: 'Time'},
                 vAxis: {title: 'mean NDVI'},
                });
print(chrt1);
//   ======================= Show the inserted data on the Map
var newLayer =
    Map.addLayer(
                ROIs[key],
                {color:'00aa00'},
                key+" - Study Area's Boundary"
                );
    Map.centerObject(ROIs[key]);//,11.2);
    Map.layers().reset([newLayer]);
var ab=  Map.addLayer(nd,ndviVis,'1st NDVI-Collection');
                        }
                        });
// Set a place holder.
// slct.setPlaceholder('Choose a location...');
/*
*/
var panel = ui.Panel({
      widgets: [slct],
      layout: ui.Panel.Layout.flow('vertical'),
      style: {position: 'middle-right',width: '150px' //,height:'150px'
      }
    });
Map.add(panel);