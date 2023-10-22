var image = ui.import && ui.import("image", "image", {
      "id": "users/pjgelabert/Climark/Benetif"
    }) || ee.Image("users/pjgelabert/Climark/Benetif");
var panel1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '5px 50px'
  }
});
var panel2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '30px 40px'
  }
});
var panel3 = ui.Panel({
  style: {
    position: 'bottom-left',
    //padding: '30px 40px'
  }
});
Map.add(panel3)
Map.add(panel2)
Map.add(panel1)
// Create legend title
var Title = ui.Label({
  value: 'Click on map to get economic benefit values',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 0px 0px',
    padding: '0'
    }
});
var contact = ui.Label({
  value: 'Contact details: info@lifeclimark.eu',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 0px 0',
    padding: '0'
    }
}); 
// Add the title to the panel
panel1.add(Title);
panel3.add(contact)
panel2.widgets().set(0, ui.Label({
    value: 'Fuel treatment cost is approx. (not included):',
    style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '0 0 5px 0',
    padding: '0'
    }
    }));
panel2.widgets().set(1, ui.Label({
    value: '-   Treatment cost: 1,500 €/ha= 700 (thinning) + 800 (Rx)',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0 0 0px 0',
    }
    })); 
panel2.widgets().set(2, ui.Label({
    value: '-   Treatment duration: 8 years (Casals et al. 2016)',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0px 0 0px 0',
    }
    })); 
panel2.widgets().set(3, ui.Label({
    value: '-   Annualized treatment cost: 188 €/ha per yr',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0 0 0px 0',
    }
    }));
panel2.widgets().set(4, ui.Label({
    value: 'We assumed to assess the gross benefit:',
    style: {
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '10px 0 5px 0',
    padding: '0'
    }
    }));
panel2.widgets().set(5, ui.Label({
    value: '-   Carbon credit market value: ~ 13 € per T CO2',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0 0 0px 0',
    }
    })); 
panel2.widgets().set(6, ui.Label({
    value: '-   Carbon emission during Rx treatments: ~ 3 T CO2/ha',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0 0 0px 0',
    }
    })); 
panel2.widgets().set(7, ui.Label({
    value: '-   Carbon emission on treated areas during wildfires: ~ 20% of untreated scenario.',
    style: {
    fontWeight: 'ligth',
    fontSize: '10px',
    margin: '0 0 0px 0',
    }
    })); 
//'* Note that the final results will highly depend on these assumptions',
var Benefit = image;
var pvis = {max:4.5, min:0, palette:["130fff","2b45ff","798aff","bacfff","ffd0cc","ff7f79","ff4036","ff1a0f"] }
Map.addLayer(Benefit, pvis, 'Gross benefit');
//print(flcom)
// Configure the map.
var baseMap = require('users/tl2581/packages:baseMap.js')
Map.setCenter(1.8606842601029712,41.771671514747425,8);
Map.style().set('cursor', 'crosshair');
Map.setOptions('Dark', {'Dark': baseMap.darkTheme});;
// set position of panel
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click on map')]);
panel1.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray',
    fontWeight: 'bold'
    }
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var meanNdvi = ndvi.reduce('mean');
  var sample = Benefit.sample(point, 30).getInfo()['features']['0']['properties']['b1'];
  var computedValue = ee.Number(sample)
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0,ui.Label({
      value: 'Gross benefit from carbon credits: ' + result.toFixed(2)+ ' (€/ha per yr)',
      style:{fontWeight: 'lighter'}
    }));
  });
});
var panel = ui.Panel({
  style: {
    position: 'top-center',
    padding: '5px 50px'
  }
});
Map.add(panel)
panel.widgets().set(0, ui.Label({
    value: 'Gross Benefit from carbon credits',
    style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 0px 175px',
    }
    }));
panel.widgets().set(1, ui.Label({
    value: 'Action C5. Strategic fuels management aimed at reducing wildfire risk - LIFE CLIMARK - Project n°: LIFE16 CCM/ES/000065',
    style: {
    fontWeight: 'ligth',
    fontSize: '12px',
    margin: '0 0 0px 0',
    }
    }));