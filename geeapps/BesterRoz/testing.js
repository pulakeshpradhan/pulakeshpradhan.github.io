//create point geometry (will call an asset in the real script)
var point = ee.Geometry.Point([28.549, -28.5]);
var feature = ee.Feature(point, {'text_prop': 'Nepo SA is a company that seeks to promote healthy, affordable and sustainable food production on restoration perspective. Nepo SA successfully produced naturally bio-fortified, GMO-free, conservation agriculture produced maize-soya blend under the banner of Pure Pap (pure porridge) through networking and restoration model.  Jaap Knot and his wife the founders of Nepo SA  were invited by a Dutch Christian who aim in assisting them in growing their company in return was to “explore agribusiness opportunities” and identify business opportunities to add value for other farmers. They further worked with Growing Nations Trust (GNT) based in Lesotho. The Nepo SA has experience of 10 years testing and development of the product called pure pap and roasted soya beans, with various forms of conservation agriculture in Africa-conditions. However, there were other business Jaap were involved in such as fish farming, fruit drying, rosehip planting, bee keeping, and mobile milling to vegetable production.  LINK: https://restory.co.za/2020/04/21/a-letter-to-the-president-in-the-times-of-the-corona-virus/'})
Map.setCenter(28.549, -28.5, 10);
Map.addLayer(point, {}, "acou");
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click on the point')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'black'}
  }));
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  // compute distance, a long running operation
  var computedValue = click_point.distance(feature.geometry())
  computedValue.evaluate(function(result) {
    if (result < 1000) {
      // get the text property, a long running operation
      var lbl = feature.get('text_prop')
      lbl.evaluate(function(result) {
        inspector.widgets().set(0, ui.Label({
          value: 'Text: ' + result,
        }))
      });
    } else {
      inspector.widgets().set(0, ui.Label({
        value: 'Click on the point',
      }));
    }
  });
});