var image = ui.import && ui.import("image", "image", {
      "id": "users/yangjie/IM/result"
    }) || ee.Image("users/yangjie/IM/result");
Map.setOptions('SATELLITE')
Map.centerObject(ee.Geometry.Point([114.3001, 30.5776]), 11)
Map.addLayer(image.selfMask(),{max:37,min:1,palette:['#4696b6','#61a9b1','#7cbcac','#97cfa8','#b0dfa6','#c1e6ab','#d3eeb1','#e5f5b7','#f7fcbc','#fff7b5','#ffe6a1','#fed58e','#fec47a','#feb266','#f79756','#ef7747','#e75839','#df382a','#d7191c']},'GISA')