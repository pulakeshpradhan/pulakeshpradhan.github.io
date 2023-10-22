var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -60.725992977021725,
                -33.834528108135736
              ],
              [
                -60.71938401400903,
                -33.82832520223054
              ],
              [
                -60.72367554843286,
                -33.825080974497276
              ],
              [
                -60.730241596101315,
                -33.83128411578689
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-60.725992977021725, -33.834528108135736],
          [-60.71938401400903, -33.82832520223054],
          [-60.72367554843286, -33.825080974497276],
          [-60.730241596101315, -33.83128411578689]]]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -60.69144612490991,
                -33.86411048720292
              ],
              [
                -60.683549701570065,
                -33.86966940508419
              ],
              [
                -60.672563373445065,
                -33.859976698241915
              ],
              [
                -60.68071728885034,
                -33.85356180193933
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-60.69144612490991, -33.86411048720292],
          [-60.683549701570065, -33.86966940508419],
          [-60.672563373445065, -33.859976698241915],
          [-60.68071728885034, -33.85356180193933]]]),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -60.676597415803464,
                -33.84322567780221
              ],
              [
                -60.673035442231686,
                -33.840053306171065
              ],
              [
                -60.6731641882644,
                -33.83884135782956
              ],
              [
                -60.679215251802,
                -33.83370820960722
              ],
              [
                -60.68363553225854,
                -33.8377006848667
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-60.676597415803464, -33.84322567780221],
          [-60.673035442231686, -33.840053306171065],
          [-60.6731641882644, -33.83884135782956],
          [-60.679215251802, -33.83370820960722],
          [-60.68363553225854, -33.8377006848667]]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/cpwaldman/lotes"
    }) || ee.FeatureCollection("users/cpwaldman/lotes");
var lotes = {
 L1 :  geometry,
 L2 :  geometry2,
 L3 :  geometry3
};
var select = ui.Select({
  items: Object.keys(lotes),
  onChange: function(key) {
    Map.centerObject(lotes[key], 13);
 }
});
// Set a place holder.
select.setPlaceholder('Lote');
print(select);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
var features = sat_scene_dict.getInfo()['features'];
var select_items = []
for (var i = 0; i < features.length; i++) {
  select_items.push({
    label: features[i]['properties']['label'],
    value: features[i]['properties']['value']
  })
}
var imageSelect = ui.Select({
  items: select_items,
  onChange: function(value) {
    var selected_scene = 
        landsatCollection.filter(ee.Filter.eq('system:index', value));
    Map.addLayer(selected_scene, {bands: ['B3', 'B2', 'B1']}, 'Selected scene');
  }
});
*/