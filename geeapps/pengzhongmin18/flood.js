var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                113.22650279142174,
                23.22124434397614
              ],
              [
                113.22650279142174,
                22.669868401274915
              ],
              [
                114.00103892423424,
                22.669868401274915
              ],
              [
                114.00103892423424,
                23.22124434397614
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[113.22650279142174, 23.22124434397614],
          [113.22650279142174, 22.669868401274915],
          [114.00103892423424, 22.669868401274915],
          [114.00103892423424, 23.22124434397614]]], null, false);
Map.setOptions('SATELLITE',0);
var Foo = require('users/kurihara-yt/MyProject:Function/Flood_Function');
var aoi = geometry;
var textVis = {
  'margin':'0px 8px 0px 0px',
  'fontWeight':'bold',
  'color':'white',
  'backgroundColor': '00000000'
  };
var titleTextVis = {
  'margin':'0px 40px 10px 40px',
  'fontSize': '18px', 
  'font-weight':'bold', 
  'color': 'ADD8E6',
  'backgroundColor': '00000000',
  };
var Control_Panel = ui.Panel({
  style: {
    position: 'bottom-left',    
    stretch:'vertical',
    padding: '8px 15px',
    width: '350px',
    backgroundColor: '00005555'
  }
});
var L_title = ui.Label('Flood Analysis by Sentinel-1', titleTextVis);
var L_text1 = ui.Label('Chose the after flood date:',textVis);
var L_text2 = ui.Label('Chose the before flood date:',textVis);
var L_text3 = ui.Label('Chose the satellite orbit:',textVis);
var L_text4 = ui.Label('Chose the microwave polarization:',textVis);
var L_text5 = ui.Label('Chose the threshold:',textVis);
var orbit = {
  'ASCENDING':[],
  'DESCENDING':[]
}
var polarization = {
  'VV':[],
  'VH':[]
}
var orbit_placeholder = 'Select a orbit';
var poralization_placeholder = 'Select a palarization';
var threshold_value = 1.15;
var dicobjetos = {
after_dataslider:ui.DateSlider({
  start:ee.Date('2014-10-3'),
  end:ee.Date(Date.now()),
  period:1,
  onChange:function(datarange){var afterDate_value=datarange.start()},
  style:{stretch:'horizontal'}}),
before_dataslider:ui.DateSlider({
  start:ee.Date('2014-10-3'),
  end:ee.Date(Date.now()),
  period:1,
  onChange:function(){},
  style:{stretch:'horizontal'}}),
select_orbit:ui.Select({
  items:Object.keys(orbit),
  placeholder:orbit_placeholder,
  onChange:function(){},
  style:{stretch:'horizontal'}}),
select_polarization:ui.Select({
  items:Object.keys(polarization),
  placeholder:'Select a palarization',
  onChange:function(){},
  style:{textAlign :'center' ,stretch:'horizontal'}}),
chose_threshold:ui.Slider({
  min:1,
  max:1.5,
  value:threshold_value,
  onChange:function(){},
  style:{color:'white',backgroundColor:'00000000',stretch:'horizontal'}
})};
var boton = ui.Button({
  label:'Apply',
  onClick:function(b){
  var orbit_placeholder = dicobjetos.select_orbit.getValue();
  var poralization_placeholder = dicobjetos.select_polarization.getValue();
  var threshold_value = dicobjetos.chose_threshold.getValue();
  var afterDate_value=ee.Date(ee.List(dicobjetos.after_dataslider.getValue()).get(0));
  var beforeDate_value=ee.Date(ee.List(dicobjetos.before_dataslider.getValue()).get(0));
  Map.clear();
  Map.add(Control_Panel);
  Foo.function(aoi,afterDate_value,beforeDate_value,orbit_placeholder, 
  poralization_placeholder,threshold_value);
  Map.setControlVisibility({zoomControl:0, scaleControl:0,})
},
  style:{stretch:'horizontal'}})
var Content = ui.Panel({widgets:[L_title,L_text1,dicobjetos.after_dataslider,L_text2,dicobjetos.before_dataslider,
L_text3,dicobjetos.select_orbit,L_text4,dicobjetos.select_polarization,L_text5,dicobjetos.chose_threshold,boton
  ], layout: ui.Panel.Layout.Flow('vertical'), style: {backgroundColor: '00000000'}});
Map.add(Control_Panel.add(Content));
Map.setControlVisibility({zoomControl:0, scaleControl:0,})//  drawingToolsControl