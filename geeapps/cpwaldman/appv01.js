var table = ui.import && ui.import("table", "table", {
      "id": "users/cpwaldman/lotes"
    }) || ee.FeatureCollection("users/cpwaldman/lotes");
//keys-value
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
var lotes = table
print ("lotes", lotes);
Map.addLayer(lotes,{},"lotes" );
//  A cada lote de la tabla le agrego dos properties, un label y un value
//item es el nombre que le ponemos al parametro( en este caso es cada lote) de la funcion de map, y representa cada uno de los features de la coleccion lotes
var lotes_dict = lotes.map(function(item) { 
  var dict = {
    id: item.id(),   // para poder filtrar tengo que poner el ID entre las properties
    // esto es provisorio,hay que agregar columna llamada label  en arcgis con el nombre de cada lote para que aprezca en el select, entonces podré, label: item.label
    nombre: ee.String('Lote ').cat(ee.Number.parse(item.id())),  // cambie la funcion por otra que no tiene el problema de quedarse solo con el utlimo digito
    // al item.id() la funcion ee.Number.parse la convierte en numero para sacarle todos los 0 de la izquierda
    area: item.geometry().area().divide(10000)  // Agregue el area
  };
  return ee.Feature(item.geometry(), dict);  // creamos un nuevo fgeature con la geometria del anterior y en el dict estan las propiedades que le estamos agregando (id, nombre, area)
});
print( "lotes_dict", lotes_dict);
//traigo localmente la Feature collection "lotes_dict"  (o sea lo convierto en una lista)para poder meterlo en el ui.select :
var features_local = lotes_dict.getInfo()['features'];
print("features_local", features_local);//features es una lista, no hay FC en la version local(lo corre en mi pc)
//Hago una nueva lista de diccionarios [{label: xxx, value: yyy}]que es lo que necesita el combo para funcionar, que cada objeto tenga un label y un value(no sirve tenerlo adentro de properties)
var select_items = []//creo una lista vacía 
for (var i = 0; i < features_local.length; i++) {
  select_items.push({ // cada push agrega un elemento a la lista
    label: features_local[i]['properties']['nombre'],  // primero accede al elemento [i], luego a la ['properties'] y despues a ['nombre']
    value: features_local[i]['properties']['id']
  })
}
print ("select_items",select_items)
var loteSelect = ui.Select({
  items: select_items,//armo el combo, uso select_items porque es local
  onChange: function(value) {
    print(value) // es el value del dict que esta en el select_items (lo estamos llenando con id)
    // le pido a lotes_dict que me pase el feture que corresponde al id que tengo en value, eso me devuelve una FC de un solo elemento y con el .first me quedo con el feature correspondiuente a ese value (me devuelve un feature no una FC)  elemento 
    var ft = lotes_dict.filter(ee.Filter.eq('id', value)).first()  // Sebas: busco la feature que tenga el mismo id que me viene en value
    print(ft)
    Map.centerObject(ft)
  }
});
// Set a place holder.
loteSelect.setPlaceholder('seleccionar Lote...');
panel.add(loteSelect)