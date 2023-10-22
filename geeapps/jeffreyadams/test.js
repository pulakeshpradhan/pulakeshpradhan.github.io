var table = ui.import && ui.import("table", "table", {
      "id": "projects/w261v2-338000/assets/Volcano_Locations"
    }) || ee.FeatureCollection("projects/w261v2-338000/assets/Volcano_Locations");
// Import damage files
var damage_areas = ee.FeatureCollection("projects/w261v2-338000/assets/all_data2");
var sakura = ee.FeatureCollection("projects/w261v2-338000/assets/fake_sakura")
damage_areas = damage_areas.merge(sakura)
// Import volcano locations
//var locations = ee.FeatureCollection("projects/w261v2-338000/assets/Volcano_Locations");
// Import cities
var locations_dev = ee.FeatureCollection("projects/w261v2-338000/assets/volcano_cities");
var cities = ee.FeatureCollection("projects/w261v2-338000/assets/city_data");
// Import power plant info
var plants = ee.FeatureCollection("projects/w261v2-338000/assets/volc_power_plant");
// Import Dam info
var dams = ee.FeatureCollection("projects/w261v2-338000/assets/volc_dam");
// import list
var table = ee.FeatureCollection("projects/w261v2-338000/assets/SampleEruptions");
var table2 = table.getInfo()
var volcanos_temp = table.filter(ee.Filter.eq('all_data', true));
var volcanos = volcanos_temp.aggregate_array('VolcanoName').distinct().sort()
//print(table.filter(ee.Filter.eq('VolcanoName', 'Taal')));
Map.addLayer(locations_dev, {color: 'orange'})
// Generate main panel and add it to the map.
var panel = ui.Panel({style: {width:'25%',backgroundColor:'lightgray', border: '1px solid black'}});
ui.root.insert(0,panel);
// Define title and description.
var intro = ui.Label('Volcano Disaster Relief Dashboard',
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px',backgroundColor:'lightgray'}
);
var subtitle = ui.Label('This dashboard shows areas on satellite imagery that have incurred damage from eruption. In order to help International Disaster Response Organizations in supporting Developing Nations', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
//On volcano selection
var select_volcano = ui.Select({
  items: volcanos.getInfo(),
  placeholder:'Select a Volcano',
  onChange: function() {
    Map.clear()
    var volcano = select_volcano.getValue();
    var info = table.filter(ee.Filter.eq('VolcanoName', volcano));
    print(info)
    // get the info for the selected volcano
    var lat = ee.Number(info.aggregate_array('Latitude').getNumber(0));
    var lon = ee.Number(info.aggregate_array('Longitude').getNumber(0));
    var start = info.aggregate_array('StartDate').get(0);
    var end = info.aggregate_array('EndDate').get(0);
    var pop = info.aggregate_array('TotalPop').getInfo(0);
    var NumCit = info.aggregate_array('NumCities').getInfo(0);
    var cloud_pct = ee.Number(info.aggregate_array('cloud_pct').getNumber(0));
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
        Map.addLayer(dataset.mean(), visualization, 'Satellite Images');
        Map.addLayer(locations_dev, {color: 'orange'}, "Volcanos")
        Map.centerObject(point, 10);
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
        // Add damage polygons
        var damage_1_all = damage.filter(ee.Filter.eq('layer',254.0))
        var damage_1 = damage_1_all.filter(ee.Filter.eq('diffdiff_d',date))
        var damage_5_all = damage.filter(ee.Filter.eq('layer',255.0))
        var damage_5 = damage_5_all.filter(ee.Filter.eq('diffdiff_d',date))
        var damage_area = damage_1.geometry().area({'maxError': 1}).getInfo(0);
        var damage_area = ee.Number(damage_area).divide(ee.Number(1000000)).round().getInfo(0);
        var subtitle1 = ui.Label('- Highly Impacted Area: '+ damage_area + ' km2', {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px',backgroundColor:'lightgray'});
        var maincityheader = ui.Label('Closest Cities', {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px',backgroundColor:'lightgray'});
        Map.addLayer(damage_5,{'color': 'yellow'},"Minor Damage")
        Map.addLayer(damage_1,{'color': 'red'},"Severe Damage")        
        panel.add(header).add(subtitle).add(select_volcano).add(sub2).add(select_date).add(subheader).add(subtitle1).add(maincityheader);
        Map.add(legend);
        //add cities
        print(volcano)
        var cities_new = cities.filter(ee.Filter.eq('volc_name',volcano));
        cities_new = cities_new.filter(ee.Filter.eq('scale','log'));
        print(cities_new)
        Map.addLayer(cities_new,{'color': 'grey'},"Cities")
        //add dams
        var dams_new = dams.filter(ee.Filter.eq('volc_name',volcano));
        Map.addLayer(dams_new,{'color': 'blue'},"Dams")
        //add power plants
        var plants_new = plants.filter(ee.Filter.eq('volc_name',volcano));
        Map.addLayer(plants_new,{'color': 'purple'},"Power Plants")
        //get city info for dashboard
        var citytop3 = cities_new.limit({max: 3, property: 'cv_dist_km', ascending: true});
        print(citytop3)
        var where = citytop3.aggregate_array('city_name');
        var pop = citytop3.aggregate_array('city_pop');
        var dist = citytop3.aggregate_array('cv_dist_km');
        var i = 0
        var sz = citytop3.size()
        print(sz.getInfo())
        while ( i < sz.getInfo()){ 
          //print("processing: ", i)
          var cityheader = ui.Label(where.get(i).getInfo() + '', {fontWeight: 'bold', fontSize: '17px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(cityheader)
          var citypop = ui.Label('- Population: ' + pop.get(i).getInfo(0), {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(citypop)
          var citydist = ui.Label('- Distance: ' + dist.get(i).getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(citydist)
          i++
        }
        //get power info for dashboard
        var mainpowerheader = ui.Label('Closest Power Plants', {fontWeight: 'bold', fontSize: '20px', margin: '15px 5px',backgroundColor:'lightgray'});
        panel.add(mainpowerheader)
        var powertop3 = plants_new.limit({max: 3, property: 'dv_dist_km', ascending: true});
        print(powertop3)
        var name = powertop3.aggregate_array('plant_name');
        var dist = powertop3.aggregate_array('pv_dist_km');
        var type = powertop3.aggregate_array('primary fuel');
        var size = powertop3.aggregate_array('plant_capacity');
        var i = 0
        var szp = powertop3.size()
        while ( i < szp.getInfo()){ 
          //print("processing: ", i)
          var powerheader = ui.Label('Plant Name: ' + name.get(i).getInfo() + '', {fontWeight: 'bold', fontSize: '17px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(powerheader)
          var powerdist = ui.Label('- Distance: ' +dist.get(i).getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(powerdist)
          var powertype = ui.Label('- Fuel: ' + type.get(i).getInfo(0), {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(powertype)
          var powersize = ui.Label('- Size: ' + size.get(i).getInfo(0) + ' MW', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(powersize)
          i++
        }      
        //get dam info for dashboard
        var maindamheader = ui.Label('Closest Dams', {fontWeight: 'bold', fontSize: '20px', margin: '15px 5px',backgroundColor:'lightgray'});
        panel.add(maindamheader)
        var damtop3 = dams_new.limit({max: 3, property: 'dv_dist_km', ascending: true});
        print(damtop3)
        var name = damtop3.aggregate_array('dam_id');
        var dist = damtop3.aggregate_array('dv_dist_km');
        var i = 0
        var szd = damtop3.size()
        while ( i < szd.getInfo()){ 
          //print("processing: ", i)
          var damheader = ui.Label('Dam ID: ' + name.get(i).getInfo() + '', {fontWeight: 'bold', fontSize: '17px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(damheader)
          var damdist = ui.Label('- Distance: ' + dist.get(i).getInfo(0) + ' km', {fontSize: '16px', margin: '2px 5px',backgroundColor:'lightgray'});
          panel.add(damdist)
          i++
        }        
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
var palette =['FFFF00','FF0000','FFAC1C', 'B2BEB5', '1500ff', 'BF40BF'];
// name of the legend
var names = ['Minor Damage','Major Damage','Volcanos','Cities (Population Log Scale)','Dams', 'Power Plants'];
// Add color and and names
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Add title and description to the panel.  
panel.add(intro).add(subtitle).add(select_volcano);