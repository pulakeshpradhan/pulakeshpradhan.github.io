var state_name = 'MWI';
var dat0 = new Date() 
var yyyy = dat0.getFullYear()
var sadc_provinces = ee.FeatureCollection('users/thanhgeevn/sadc/sadc_provinces');
var state = sadc_provinces.filter(ee.Filter.eq('ISO_NAME', state_name));
var country = state.first().get('COUNTRY').getInfo();
var provinces = state.aggregate_array('SUB_COUNTR');
provinces = ee.List(provinces).insert(0, '--Whole country--');
var basemap = ee.Image("users/thanhgeevn/sadc/FDM_"+state_name+"_2015");
var color = ['00dc82','00734c','389e00','ff5500','b5bd2b','bd7e00','ffff82','ffc94d','fff5e6','ff73df','0084a8','97dbf2','ffe8e8'];
var names = ['Closed Deciduous Forest', 'Montane Forest', 'Sub-montane Forest', 'Plantation', 'Deciduous Woodland', 'Deciduous Shrubs','Cropland', 'Savana', 'Bareground', 'Mangrove', 'Swamp', 'Waterbody', 'Pan'];
var addprop = function(img) {
  return img.set('b1_class_name', names)
.set('b1_class_palette', color)
.set('b1_class_values', [0,1,2,3,4,5,6,7,8,9,10,11,12]);
};
var fdm2015 = addprop(basemap)
// Create the panel for the legend items.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px' }});
var control = ui.Panel({style: {position: 'top-center', padding: '8px 15px' }});
// Create and add the Map title.
var title = ui.Label({value: country+' NFIS', style: {fontWeight: 'bold',fontSize: '30px', margin: '0 0 4px 0', padding: '0', color: 'red'}});
var select_label = ui.Label({value: 'Please select area of interest:', style: {fontSize: '20px', margin: '0 0 4px 0', padding: '0', color: 'black'}});
var select_layer = ui.Label({value: 'Please select layers:', style: {fontSize: '20px', margin: '0 0 4px 0', padding: '0', color: 'black'}});
control.add(title);
control.add(select_label);
ui.root.clear()
var map = ui.Map()
map.centerObject(state, 6);
ui.root.add(control)
ui.root.add(map)
provinces.getInfo(function(names) {
  var makeRow = function(color, name) {
    var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 40px'}});
    var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
    return ui.Panel({widgets: [colorBox, description], layout: ui.Panel.Layout.Flow('horizontal')});
  };
  var checkbox = ui.Checkbox('FDM2015', false);
  var changes = ui.Checkbox('Forest Changes', false);
  var combo = ui.Select({
    style: {minWidth: '250px'},
    items: names,
    onChange: function(prov){
      if (prov === '--Whole country--'){
        map.clear();
        control.remove(legend);
        control.remove(changes);
        checkbox.setValue(false);
        var aoic = sadc_provinces.filter(ee.Filter.eq('ISO_NAME', state_name));
        var namec = country;
        map.centerObject(aoic, 6)
        checkbox.onChange(function(checked) {
          if (checked){
            fdm2015.toDictionary().select(['b1' + ".*"]).evaluate(function(result) {
              var palette = result['b1' + "_class_palette"];
              var names = result['b1' + "_class_name"];
              for (var i = 0; i < names.length; i++) {
                legend.add(makeRow(palette[i], names[i]))
              }
            })
            map.clear()
            map.addLayer(fdm2015.clip(aoic).focal_median(3, 'circle', 'pixels'), {min: 1, max: 13, palette: color}, namec+' Basemap');
          } else {
            legend.clear();
            map.clear()
          }
        });
        var showLayer = function(year) {
          //map.layers().reset();
          var image = ee.Image("users/thanhgeevn/sadc/"+state_name+"_"+year).clip(aoic);
          //map.clear()
          //map.add(slider)
          //map.addLayer(fdm2015.clip(aoic).focal_median(3, 'circle', 'pixels'), {min: 1, max: 13, palette: color}, namec+' Basemap');
          map.addLayer({eeObject: ee.Image(image), visParams: {}, name: String('Changes in '+ namec +" "+year)});
          print(map.layers())
        };
        var slider = ui.Slider({
          min: 2016,
          max: yyyy-1,
          step: 1,
          onChange: showLayer,
          style: {
            position: 'top-center',
            padding: '15px',
            stretch: 'horizontal'}
        });
        changes.onChange(function(chec) {
          if (chec) {
            map.add(slider)
            slider.setValue(2017);
          } else {
            map.remove(slider)
          }
        })
        control.add(legend);
        control.add(changes);
      } else {
        map.clear();
        control.remove(legend);
        control.remove(changes);
        checkbox.setValue(false);
        var aoip = sadc_provinces.filter(ee.Filter.eq('SUB_COUNTR', prov));
        var namep = aoip.first().get('SUB_COUNTR').getInfo();
        map.centerObject(aoip, 10)
        checkbox.onChange(function(checked) {
          if (checked){
            map.clear()
            fdm2015.toDictionary().select(['b1' + ".*"]).evaluate(function(result) {
              var palette = result['b1' + "_class_palette"];
              var names = result['b1' + "_class_name"];
              for (var i = 0; i < names.length; i++) {
                legend.add(makeRow(palette[i], names[i]))
              }            
            })
            map.addLayer(fdm2015.clip(aoip).focal_median(3, 'circle', 'pixels'), {min: 1, max: 13, palette: color}, namep+' Basemap');
          } else {
            legend.clear();
            map.clear()
          }
        });
        control.add(legend);
        control.add(changes);
    }
    }});
  control.add(combo);
  control.add(select_layer);
  control.add(checkbox);
  control.add(changes);
  });