var fRabanales = ui.import && ui.import("fRabanales", "table", {
      "id": "users/fjmesas/Rabanales/Finca_Rabanales_2021_22"
    }) || ee.FeatureCollection("users/fjmesas/Rabanales/Finca_Rabanales_2021_22"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -4.74108306326567,
                37.92905593579627
              ],
              [
                -4.74108306326567,
                37.924113605175656
              ],
              [
                -4.736190714022506,
                37.924113605175656
              ],
              [
                -4.736190714022506,
                37.92905593579627
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-4.74108306326567, 37.92905593579627],
          [-4.74108306326567, 37.924113605175656],
          [-4.736190714022506, 37.924113605175656],
          [-4.736190714022506, 37.92905593579627]]], null, false);
//Pantalla 
var titulo1 = ui.Label({
  value: 'Finca Experimental Rabanales',
  style: {fontSize: '16px',
    fontWeight: 'bold'
  }
});
var titulo2 = ui.Label({
  value: 'ETSIAM',
  style: {fontSize: '16px'}
});
titulo2.setUrl('www.google.es')
var panel = ui.Panel({
  style: {width: '25%'}
});
var sources = {
  Landsat: 'Landsat',
  Sentinel: 'Sentinel 2',
  SRTM: 'SRTM'
};
//Funcion para iniciar el mapa
function init_map() {
  Map.centerObject(fRabanales,14)
  var vis_params = {
    'color': '#ff0000', 
    'width': 1,
    'lineType': 'solid',
    'fillColor': '00000000',
}
  Map.addLayer(fRabanales.style(vis_params),{},"Finca de Rabanales")
}
var select = ui.Select({
  items: Object.keys(sources),
  onChange: function(key) {
    var Llave_Landsat=0
    var Llave_Sentinel2=0
    var Llave_SRTM=0
    switch (sources[key]) {
    case 'Landsat':
      Llave_Landsat=0
      Llave_Sentinel2=1
      Llave_SRTM=0
      Map.clear()
      init_map()
      break;
    case 'Sentinel 2':
      Llave_Landsat=0
      Llave_Sentinel2=1
      Llave_SRTM=0
      Map.clear()
      init_map()
      break;
    case 'SRTM':
      Llave_Landsat=0
      Llave_Sentinel2=0
      Llave_SRTM=1
      Map.clear()
      var srtm = ee.Image('CGIAR/SRTM90_V4');
      var elevacion=srtm.select('elevation');
      var pendiente = ee.Terrain.slope(elevacion)
      var orientacion=ee.Terrain.aspect(elevacion)
      var sombreado=ee.Terrain.hillshade(elevacion)
      Map.addLayer(elevacion.clip(fRabanales),{min:120,max:180},"Elevacion [m]",1 )
      Map.addLayer(pendiente.clip(fRabanales),{min:0,max:8},"Pendiente [%]",0)
      Map.addLayer(orientacion.clip(fRabanales),{},"Orientacion",0)
      init_map()
      break;
    }
    if (sources[key]=='Landsat') {
      if (Llave_Landsat==0) {
      var panel2 = ui.Panel({
        style: {width: '25%'}});
        var titulo3 = ui.Label({
          value: 'Landsat 8',
          style: {fontSize: '16px'}});
          //titulo3.setUrl('www.google.es')
          panel2.add(titulo3)
          panel.add(panel2)
          Llave_Landsat=1
          Llave_Sentinel2=0
          Llave_SRTM=0
          } else {
            if (sources[key]=='Sentinel 2') {
              if (Llave_Sentinel2==0) {
                var panel2 = ui.Panel({
                  style: {width: '25%'}});
                  var titulo3 = ui.Label({
                    value: 'Sentinel 2',
                    style: {fontSize: '16px'}});
                    //titulo3.setUrl('www.google.es')
                    panel2.add(titulo3)
                    panel.add(panel2)
                    Llave_Landsat=0
                    Llave_Sentinel2=1
                    Llave_SRTM=0
              }
            }
          }
    }
    }
    }
  );
select.setPlaceholder('Seleccione fuente de datos...');
panel.add(titulo1)
panel.add(titulo2)
panel.add(select)
ui.root.add(panel);
//Funcion para iniciar el mapa
init_map()