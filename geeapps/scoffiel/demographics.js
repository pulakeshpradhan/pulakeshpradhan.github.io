Map.setCenter(-118, 33.7, 11);
var states = ee.FeatureCollection('TIGER/2016/States');
var cali = states.filter(ee.Filter.eq('NAME', 'California'));
var dataset = ee.FeatureCollection('TIGER/2010/Tracts_DP1').filterBounds(cali);
print(dataset.first());
pop = ee.Number.parse(dataset.get('dp0010001'));
// Turn the strings into numbers
dataset = dataset.map(function (f) {
  return f.set({
    'med_age': ee.Number.parse(f.get('dp0020001')), 
    'pop_dens': ee.Number.parse(f.get('dp0010001')).divide(ee.Number.parse(f.get('shape_area'))),
    'white': ee.Number.parse(f.get('dp0080003')).divide(ee.Number.parse(f.get('dp0080001'))),
    'black': ee.Number.parse(f.get('dp0080004')).divide(ee.Number.parse(f.get('dp0080001'))),
    'asian': ee.Number.parse(f.get('dp0080006')).divide(ee.Number.parse(f.get('dp0080001'))),
    'hisp': ee.Number.parse(f.get('dp0100002')).divide(ee.Number.parse(f.get('dp0100001'))),
    '25_44': (ee.Number.parse(f.get('dp0010026')).add(ee.Number.parse(f.get('dp0010027'))).add(ee.Number.parse(f.get('dp0010028'))).add(ee.Number.parse(f.get('dp0010029'))))
      .divide(ee.Number.parse(f.get('dp0010001'))),
    'rent':  ee.Number.parse(f.get('dp0210003')).divide(ee.Number.parse(f.get('dp0210001'))),
  });
});
var pop = ee.Image().float().paint(dataset, 'pop_dens');
var age = ee.Image().float().paint(dataset, 'med_age');
var white = ee.Image().float().paint(dataset, 'white');
var black = ee.Image().float().paint(dataset, 'black');
var asian = ee.Image().float().paint(dataset, 'asian');
var hisp = ee.Image().float().paint(dataset, 'hisp');
var age25_44 = ee.Image().float().paint(dataset, '25_44');
var rent = ee.Image().float().paint(dataset, 'rent');
Map.addLayer(pop, {min: 0,max:100000000,opacity: 0.7, palette:['white','black']}, 'Population density');
Map.addLayer(age, {min:25,max:60,palette:['white','black'],opacity:0.7}, 'Median age',0,1);
Map.addLayer(age25_44, {min:0.1,max:0.6,palette:['white','black'],opacity:0.7}, '% Age 25-44',0,1);
Map.addLayer(white, {min:0,max:0.8,palette:['white','black'],opacity:0.7}, '% white',0,1);
Map.addLayer(black, {min:0,max:0.8,palette:['white','black'],opacity:0.7}, '% Black',0,1);
Map.addLayer(asian, {min:0,max:0.8,palette:['white','black'],opacity:0.7}, '% Asian',0,1);
Map.addLayer(hisp, {min:0,max:0.8,palette:['white','black'],opacity:0.7}, '% Hispanic/Latino',0,1);
Map.addLayer(rent, {min:0,max:1,palette:['white','black'],opacity:0.7}, '% renter',0,1);
//Map.addLayer(dataset, null, 'for Inspector', false);
//election data, acquired from NYT https://github.com/TheUpshot/presidential-precinct-map-2020 
var election = ee.FeatureCollection('users/scoffiel/election_results');
election = ee.Image().float().paint(election, 'pct_dem_le');
Map.addLayer(election, {min:-100,max:100,palette:['red','white','blue'],opacity:0.7}, '2020 election',0,1);
//income data, acquired from TIGER https://www2.census.gov/geo/tiger/TIGER_DP/2016ACS/
//median household income (B19013e1)
var income = ee.FeatureCollection('users/scoffiel/income_data');
income = ee.Image().float().paint(income, 'X19_INCOM');
Map.addLayer(income, {min:10000,max:200000,palette:['white','black'],opacity:0.7}, 'Median income',0,1);
//add inspector ----------------------------------------------
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'bottom-right'}
});
var title = ui.Label({
  value: 'Click anywhere to get stats',
  style: {
    fontWeight: 'bold',
    fontSize: '16px'
    }
});
inspector.add(title);
Map.add(inspector);
//Create a function to be invoked when the map is clicked
Map.onClick(function(coords){
  inspector.clear()
  inspector.style().set('shown', true);
  // Add a Close button.
  inspector.insert(0,ui.Button({
    label: 'Close',
    onClick: function() {
      inspector.style().set('shown', false);
    }
  }));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //1. median age
  var stat = age.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Median age: ' + result.toFixed(0),
          style: {stretch: 'horizontal'}
        }));
  });
  //2. age 25-44
  stat = age25_44.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Age 25-44: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //3. white
  stat = white.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'White: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //4. Black
  stat = black.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Black: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //5. Asian
  stat = asian.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Asian: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //6. Hispanic
  stat = hisp.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Hispanic/Latino: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //7. renter
  stat = rent.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Renter: ' + (result*100).toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //8. election
  stat = election.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Bidens lead: ' + result.toFixed(0) + '%',
          style: {stretch: 'horizontal'}
        }));
  });
  //9. income
  stat = income.reduce(ee.Reducer.first());
  stat = stat.reduceRegion(ee.Reducer.first(), point, 30);
  stat = stat.get('first');  
  // Request the value from the server and use the results in a function.
  stat.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.insert(0,ui.Label({
          value: 'Income: $' + result.toFixed(0),
          style: {stretch: 'horizontal'}
        }));
  });
});