// Test import
//var damage_areas = ee.FeatureCollection("projects/w261v2-338000/assets/all_data");
var damage_areas = ee.FeatureCollection("projects/w261v2-338000/assets/all_data2");
// Import volcano locations
var locations = ee.FeatureCollection("projects/w261v2-338000/assets/Volcano_Locations");
// Import cities
var locations2 = ee.FeatureCollection("projects/w261v2-338000/assets/volcano_cities");
var cities = ee.FeatureCollection("projects/w261v2-338000/assets/city_data");
// Import power plant info
var powerlocations = ee.FeatureCollection("projects/w261v2-338000/assets/power_plant");
var plants = ee.FeatureCollection("projects/w261v2-338000/assets/volc_power_plant");
//print(powerlocations)
// Import Dam info
var damlocations = ee.FeatureCollection("projects/w261v2-338000/assets/GOOD2_dams");
var dams = ee.FeatureCollection("projects/w261v2-338000/assets/volc_dam");
// import list
var table = ee.FeatureCollection("projects/w261v2-338000/assets/SampleEruptions");
var table2 = table.getInfo()
var volcanos_temp = table.filter(ee.Filter.eq('all_data', true));
var volcanos = volcanos_temp.aggregate_array('VolcanoName').distinct().sort()
//print(table.filter(ee.Filter.eq('VolcanoName', 'Taal')));
Map.addLayer(locations2, {color: 'red'})
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'25%',backgroundColor:'lightgray', border: '1px solid black'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Volcano Disaster Relief Dashboard',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px',backgroundColor:'lightgray'}
);
var subtitle = ui.Label('There are currently 619 known volcanos'+
  ' that are in a deveopling nation near a population.'+
  ' Select a volcano that you would like to see the damaged area. ', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
//On volcano selection
var select_volcano = ui.Select({
  items: volcanos.getInfo(),
  placeholder:'Select a Volcano',
  onChange: function() {
    Map.clear()
    var volcano = select_volcano.getValue();
    var info = table.filter(ee.Filter.eq('VolcanoName', volcano));
    // get the info for the selected volcano
    var lat = ee.Number(info.aggregate_array('Latitude').getNumber(0));
    var lon = ee.Number(info.aggregate_array('Longitude').getNumber(0));
    var start = info.aggregate_array('StartDate').get(0);
    var end = info.aggregate_array('EndDate').get(0);
    var pop = info.aggregate_array('TotalPop').getInfo(0);
    var NumCit = info.aggregate_array('NumCities').getInfo(0);
    var cloud_pct = ee.Number(info.aggregate_array('cloud_pct').getNumber(0));
    print(cloud_pct)
    // set that location
    var point = ee.Geometry.Point(lon,lat);
    // get the damaged area for the selected volcano
    var damage = damage_areas.filter(ee.Filter.eq('volc_name', volcano));
    var date_list = damage.aggregate_array('diffdiff_d').distinct().sort()
    var select_date = ui.Select({
      items: date_list.getInfo(),
      placeholder:'Select a Date',
      onChange: function() {
        Map.clear()
        var date = select_date.getValue();
        //Add Sat Image
        // var dataset = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
        // .filterDate('2021-07-01', '2022-07-01')
        // .filterBounds(point)
        // .filter(ee.Filter.lt('CLOUD_COVER', 22))
        // Map.addLayer(dataset,{bands:['SR_B4','SR_B3','SR_B2']}, "Satellite Image");   
        /**
         * Function to mask clouds using the Sentinel-2 QA band
         * @param {ee.Image} image Sentinel-2 image
         * @return {ee.Image} cloud masked Sentinel-2 image
         */
        function maskS2clouds(image) {
          var qa = image.select('QA60');
          // Bits 10 and 11 are clouds and cirrus, respectively.
          var cloudBitMask = 1 << 10;
          var cirrusBitMask = 1 << 11;
          // Both flags should be set to zero, indicating clear conditions.
          var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
              .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
          return image.updateMask(mask).divide(10000);
        }
        var visualization = {
          min: 0.0,
          max: 0.3,
          bands: ['B4', 'B3', 'B2'],
        };
        var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                          .filterDate('2021-01-01','2022-12-19')
                          // Pre-filter to get less cloudy granules.
                          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_pct))
                          .map(maskS2clouds);
        var sze_m = 1000;
        var pt = ee.Geometry.Point(lon,lat);
        var aoi = pt.buffer({'distance':sze_m});
        //Map.setCenter(lon, lat, 10);
        Map.addLayer(dataset.mean(), visualization, 'RGB');
        Map.centerObject(point, 10);
        //add power plants
        plants = plants.filter(ee.Filter.eq('volc_name',volcano));
        print(plants)
        Map.addLayer(plants,{'color': 'green'},"Power Plants")
        //add cities
        cities = cities.filter(ee.Filter.eq('volc_name',volcano));
        cities = cities.filter(ee.Filter.eq('scale','log'));
        Map.addLayer(cities,{'color': 'grey'},"Cities")
        //add dams
        dams = dams.filter(ee.Filter.eq('volc_name',volcano));
        Map.addLayer(plants,{'color': 'blue'},"Dams")
        //add power plants
        plants = plants.filter(ee.Filter.eq('volc_name',volcano));
        Map.addLayer(plants,{'color': 'purple'},"Power Plants")
        //get city info for dashboard
        var citytop3 = cities.limit({max: 3, property: 'city_name', ascending: true});
        var names = citytop3.aggregate_array('city_name');
        print(names)
        var name1 = names.get(0);
        var name2 = names.get(1);
        var name3 = names.get(2);
        var pops = citytop3.aggregate_array('city_pop');
        var pop1 = pops.get(0);
        var pop2 = pops.get(1);
        var pop3 = pops.get(2);
        var dists = citytop3.aggregate_array('cv_dist_km');
        var dist1 = dists.get(0);
        var dist2 = dists.get(1);
        var dist3 = dists.get(2);
        var flag = ee.Algorithms.IsEqual(citytop3.size(), 0);
        print(flag);
        var maincityheader = ui.Label('Closest Cities', {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px',backgroundColor:'lightgray'});
        var cityheader1 = ui.Label(name1.getInfo(0) + '', {fontWeight: 'bold', fontSize: '18px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citypop1 = ui.Label('- Population ' + pop1.getInfo(0), {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citydist1 = ui.Label('- Distance ' + dist1.getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        var cityheader2 = ui.Label(name2.getInfo(0) + '', {fontWeight: 'bold', fontSize: '18px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citypop2 = ui.Label('- Population ' + pop2.getInfo(0), {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citydist2 = ui.Label('- Distance ' + dist2.getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        var cityheader3 = ui.Label(name3.getInfo(0) + '', {fontWeight: 'bold', fontSize: '18px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citypop3 = ui.Label('- Population ' + pop3.getInfo(0), {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        var citydist3 = ui.Label('- Distance ' + dist3.getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
        // Add damage polygons
        var damage_1_all = damage.filter(ee.Filter.eq('layer',254.0))
        var damage_1 = damage_1_all.filter(ee.Filter.eq('diffdiff_d',date))
        var damage_5_all = damage.filter(ee.Filter.eq('layer',255.0))
        var damage_5 = damage_5_all.filter(ee.Filter.eq('diffdiff_d',date))
        var damage_area = damage_1.geometry().area({'maxError': 1}).getInfo(0);
        var damage_area = ee.Number(damage_area).divide(ee.Number(1000)).round().getInfo(0);
        Map.addLayer(damage_5,{'color': 'yellow'},"Minor Damage")
        Map.addLayer(damage_1,{'color': 'red'},"Severe Damage")        
        //get dam and powerplants in the damaged area
        var powerintersection = damage_5.geometry().intersection({'right': powerlocations});
        var damintersection = damage_5.geometry().intersection({'right': damlocations});
        //var distance = powerlocations.distance({'right': point, 'maxError': 1});
        //print(distance)
        // add power plants
        Map.addLayer(powerintersection, {color: 'purple'},"Power Plants");
        // add dam
        Map.addLayer(damintersection, {color: 'blue'},"Dams");
        // add volcanoes
        Map.addLayer(locations, {color: 'red'},"Volcanos")
        // Add Panel
        panel.clear();
        var header = ui.Label('Volcano Disaster Relief Dashboard',
        {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px',backgroundColor:'lightgray'}
        );
        var subtitle = ui.Label(' Select a volcano that you would like to see the damaged area. ', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
        var sub2 = ui.Label(' What date would you like to view the damage area? ', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
        var subheader = ui.Label(volcano + ' Disaster Relief Information',
        {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px',backgroundColor:'lightgray'}
        );
        //var date = ui.Label('- Eruption Date - ' + damage_date, {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'});
        var subtitle1 = ui.Label('- Highly Impacted Area: '+ damage_area + ' km2', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
        panel.add(header).add(subtitle).add(select_volcano).add(sub2).add(select_date).add(subheader).add(subtitle1).add(maincityheader).add(cityheader1).add(citypop1).add(citydist1).add(cityheader2).add(citypop2).add(citydist2).add(cityheader3).add(citypop3).add(citydist3)
        Map.add(legend);
      }
      });
    // set new map center
    Map.centerObject(point, 10);
    // Add Panel
    panel.clear();
    var header = ui.Label('Volcano Disaster Relief Dashboard',
    {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px',backgroundColor:'lightgray'}
    );
    var subtitle = ui.Label(' Select a volcano that you would like to see the damaged area. ', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
    var sub2 = ui.Label(' What date would you like to view the damage area? ', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
    panel.add(header).add(subtitle).add(select_volcano).add(sub2).add(select_date);
    Map.add(legend);
  }
  });
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'My Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
var palette =['FF0000', 'B2BEB5', '1500ff', 'BF40BF'];
// name of the legend
var names = ['volcanos','Cities','Dams', 'Power Plants'];
// Add color and and names
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Add title and description to the panel.  
panel.add(intro).add(subtitle).add(select_volcano);