Map.setControlVisibility({
  layerList: false
});
Map.setControlVisibility({layerList: false, zoomControl: false,drawingToolsControl:false});
Map.setOptions('HYBRID');
var geometry = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
  .filter(ee.Filter.eq('wld_rgn', 'Central America'));
var before_start= '2020-10-01';
var before_end='2020-10-30';
var after_start='2020-11-01';
var after_end='2020-11-30';
var polarization = "VH";
var pass_direction = "DESCENDING"; 
var difference_threshold = 1.25; 
var aoi = ee.FeatureCollection(geometry);
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  .filterBounds(aoi)
  .select(polarization);
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('de ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' al ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      var before_count = before_collection.size();
/*      print(ee.String('Imágenes seleccionadas: Antes de la inundación ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);*/
      var after_count = before_collection.size();
/*      print(ee.String('Imágenes seleccionadas: Despues de la inundación ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);*/
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
var smoothing_radius = 50; //puede ser 50 hay que calibrar
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
var difference = after_filtered.divide(before_filtered);
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      var flooded_mask = difference_binary.where(swater_mask,0);
      var flooded = flooded_mask.updateMask(flooded_mask);
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(25));
      var DEM = ee.Image("NASA/NASADEM_HGT/001");
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
      var HillShade = ee.Terrain.hillshade(DEM);
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, 
  bestEffort: true
  });
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
var ca = ee.Image().byte().paint({featureCollection:geometry,width:1}).visualize({palette:"red"});
var A = ui.Map.Layer(flooded,{palette:"FFAA00"},'Áreas inundadas',false);
var B = ui.Map.Layer(swater.clip(geometry),{palette:"0000FF"},'Caudales Permanentes');
var C = ui.Map.Layer(ca,{},"Límites fronterizos");
var D = ui.Map.Layer(HillShade.clip(geometry), {min: 100, max:255,opacity:0.6}, 'Terreno');
Map.add(D);
Map.add(B);
Map.add(A);
Map.add(C);
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
var mapTitle = ui.Label({
  value: 'Áreas inundadas durante los huracanes ETA e IOTA en Centroamérica',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 2px 0',
    padding: '0'
    }
});
title.add(mapTitle);
Map.add(title);
//Leyendas
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '250px'
  }
});
var legendTitle = ui.Label({
  value: 'Leyenda',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var makeRow = function(color, name, fill) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  var emptyBox = ui.Label({
    style: {
      border: '1px solid ' + color,
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  if (fill == 'solid') {
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  } else if (fill == 'outline') {
    return ui.Panel({
      widgets: [emptyBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  }
};
var palette =['#FFAA00', '#0000FF', '#FF0000'];
var names = ['Áreas inundadas','Cuerpos de agua permanente','Límites de Froterizos'];
var fills = ['solid', 'solid', 'outline'];
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i], fills[i]));
}
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var text6 = ui.Label('Información: Este visor ha sido creado con el fin de analizar las imágenes de Radar de Apertura sintética de Sentinel-1 (COPERNICUS/S1_GRD) y su aplicación en la gestión de los recursos hídricos, desde la plataforma google Earth Engine. La información que se encuentra dispuesta inicia desde el 01 al 30 de noviembre del 2020. Debe tenerse en cuenta que las imágenes para el cálculo de las zonas inundadas post huracanes, son obtenidas de la aplicación de detección de cambios a partir de pixeles de 10 metros; con lo que el modelamiento en zonas urbanas, genera estimaciones con ruido proveniente de la reflectancia variada del lugar',subTextVis)
legend.add(text6);
Map.add(legend);
Map.centerObject(geometry,5)
var header = ui.Label('Información disponible', 
  { 
    fontSize: '18px', 
    fontWeight: 'bold', 
    color: '0000ff', 
    width: '200px',
    textAlign: 'center'
  }
);
var panel = ui.Panel({
  widgets:[header],
  style:{position:'middle-right'}});   
var intro = ui.Panel([
  ui.Label({
    value: '_________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value:'Capas',
    style: {fontSize: '14px', fontWeight: 'bold'}
  })]);
panel.add(intro)
ui.root.insert(1,panel)
var extCheckA = ui.Checkbox('Áreas inundadas').setValue(false);
var extCheckB = ui.Checkbox('Cuerpos de agua permanentes').setValue(true); 
var extCheckC = ui.Checkbox('Límites fronterizos').setValue(true); 
var extCheckD = ui.Checkbox('Modelo de elevación digital').setValue(true); 
// // Establecer la posición del panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var makeRowa = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
            // Devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
panel.add(extCheckA)
     .add(extCheckB)
     .add(extCheckC)
     .add(extCheckD)
var doCheckboxA = function() {
  extCheckA.onChange(function(checked){
  A.setShown(checked)
  })
}
doCheckboxA();   
var doCheckboxB = function() {
  extCheckB.onChange(function(checked){
  B.setShown(checked)
  })
}
doCheckboxB();     
var doCheckboxC = function() {
  extCheckC.onChange(function(checked){
  C.setShown(checked)
  })
}
doCheckboxC();     
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxC();   
var doCheckboxD = function() {
  extCheckD.onChange(function(checked){
  D.setShown(checked)
  })
}
doCheckboxD(); 
var lugares = {
  Playitas_Guatemala: [-90.49108, 15.99965],
  Polochic_Guatemala: [-89.5885, 15.4013],
  Choloma_Honduras: [-87.8518, 15.6868],
  Olancho_Honduras: [-86.5791, 15.4644],
  RACC_Nicaragua: [-83.3112, 14.4334]
};
var ubicar = ui.Select({
  items: Object.keys(lugares),
  onChange: function(key) {
    Map.setCenter(lugares[key][0], lugares[key][1],10);
  }
});
ubicar.setPlaceholder('Principales Zonas afectadas');
panel.add(ubicar);
var logo = ee.Image('users/nestorcaalsuc/logos/Logo').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
var thumb = ui.Thumbnail({
  image: logo,
  params: {
    dimensions: '300x320',
    format: 'png'
  },
  style: {
    height: '200px',
    width: '210px',
    padding :'0'
  }
});
var intro4 = ui.Panel([
  ui.Label({
    value: '_________________________',
    style: {fontWeight: 'bold',  color: '01FFFF'},
  }),
  ui.Label({
    value: 'Autor: Ing. M.Sc. Nestor Caal Suc',
    style: {fontWeight: 'normal', fontSize: '12px', margin: '10px 5px'}
  }),
  ui.Label({
    value: 'Con el apoyo de: ',
    style: {fontWeight: 'normal', fontSize: '12px', margin: '10px 5px'}
  })
]);
panel
.add(intro4)
.add(thumb);