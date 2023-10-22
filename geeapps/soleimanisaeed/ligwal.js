var ROIs ={
  'Lighvan Chai':ee.FeatureCollection("users/soleimanisaeed/LighvanCatchment"),
  'Walnut Gulch':ee.FeatureCollection("users/soleimanisaeed/WGEW/boundary")
  };
// print('sdfdg');
// print('1245');
// console.clear();
var slct = ui.Select({
  items: Object.keys(ROIs),
  onChange: function(key){
    // print(Map.getZoom());
    print(key+" - Study Area's Boundary");
    var newLayer =
    Map.addLayer(
                ROIs[key],
                {color:'00aa00'},
                key+" - Study Area's Boundary"
                );
    Map.centerObject(ROIs[key]);
    Map.layers().reset([newLayer]);
                          },
    });
// Set a place holder.
slct.setPlaceholder('Choose a location...');
// print(slct);
var panel = ui.Panel({
      widgets: [slct],
      layout: ui.Panel.Layout.flow('vertical'),
      style: {position: 'middle-right',width: '150px' //,height:'150px'
      }
    });
Map.add(panel);
/*
var a=ee.FeatureCollection("users/soleimanisaeed/LighvanCatchment");
var aab = Map.addLayer(a,
            {color:'00aa00'},
            "Green"
            );
var abb = Map.addLayer(a,
            {color:'aa0000'},
            "Red"
            );
            // Map.clear(Map.layers(0));
Map.centerObject(a);
// var one = ui.Map.Layer(ee.Image(1))
// var two = ui.Map.Layer(ee.Image(2))
Map.layers().reset([abb]);
// print(Map.layer());
*/