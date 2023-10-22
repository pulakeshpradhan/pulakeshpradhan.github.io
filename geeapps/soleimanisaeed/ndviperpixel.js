var ndviVis = ui.import && ui.import("ndviVis", "imageVisParam", {
      "params": {
        "min": 0,
        "max": 1,
        "palette": [
          "FFFFFF",
          "CE7E45",
          "DF923D",
          "F1B555",
          "FCD163",
          "99B718",
          "74A901",
          "66A000",
          "529400",
          "3E8601",
          "207401",
          "056201",
          "004C00",
          "023B01",
          "012E01",
          "011D01",
          "011301"
        ]
      }
    }) || {"min":0,"max":1,"palette":["FFFFFF","CE7E45","DF923D","F1B555","FCD163","99B718","74A901","66A000","529400","3E8601","207401","056201","004C00","023B01","012E01","011D01","011301"]};
// Definable varaibles:
{
var ROI = 
        ee.FeatureCollection("users/soleimanisaeed/initiall/LighvanCatchment");
        // ee.FeatureCollection("users/soleimanisaeed/WGEW/boundary");
var ROI_Name=
          "LighvanChai - Study Area's Boundary";
          // "Walnut Gulch - Study Area's Boundary";
var Strt_date= ee.Date('2002-03-20'); 
var End_date = ee.Date('2003-03-19');
var ScaleForCharts=250;
}
// ======= Show the boundaries =======
{
Map.addLayer(
  ROI,                //eeObject
 {color: '009F00'},   //visParams
  ROI_Name,           //name
  true,               //shown, 
  0.5                 //opacity
            );                  //specify a 'green' color and a name   
Map.centerObject(ROI,12.2);
    }
/* Load the MODIS/MOD09GQ 
(MOD09GQ.006 Terra Surface Reflectance Daily Global 250m)
  ======================= raw data, filtered by location and date.
*/{
var dataset = ee.ImageCollection('MODIS/006/MOD09GQ')
                .filterDate(Strt_date,End_date)
                .filterBounds(ROI)
                .map(function(img){
                      return img.addBands(
                                          img.normalizedDifference
                                        (['sur_refl_b02', 'sur_refl_b01'])
                            // Use the normalizedDifference(A, B) to compute (A - B) / (A + B)
                                        .rename("NewNDVI")
                                          )
                                .select('NewNDVI')
                                .clip(ROI)
                                   }
                      );
// print('raw dataset',dataset);
// print('1st:',dataset.first());
}
// Show the first dataset
{  var nd=dataset.median();
  // print(nd);
Map.addLayer(nd,ndviVis,'NDVI Collection median');
}
// ======= NDVI TimeSeries as a chart ======= 
{
  var chart1title= 'mean NDVI of the ROI over time - scale= '+ScaleForCharts+'m';
var chart1 = ui.Chart.image.series({
  imageCollection:dataset,
  region: ROI,
  reducer:ee.Reducer.mean(),
  scale:ScaleForCharts,
  // xProperty
  }).setOptions({
                 title:chart1title,
                 hAxis: {title: 'Time'},
                 vAxis: {title: 'mean NDVI'},
                });
// Display the chart in the console.
print(chart1);
}
// -------------------------------------
var i=0,j=1,k=3, f=2;
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'longitude: ' + coords.lon.toFixed(2) + ' ' +
                 'latitude: ' + coords.lat.toFixed(2);
  panel.widgets().set(i++, ui.Label(f-1+": "+location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(f, ui.Map.Layer(point, {color: 'FF0000'},'Point '+(-1+f).toString()));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(dataset, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time \n'+location,
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(j++, chart);
  panel.widgets().set(k++, ui.Label('You can click again!'));
  // print('i=',i , 'j=',j);
  i++,j++,k++;
  i++,j++,k++,f++;
});
// Add the panel to the ui.root.
ui.root.add(panel);