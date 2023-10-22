// var blat=15.483333; // Coban
// var blon=-90.366667; // Coban
// var blat=15.4725; // Morales
// var blon=-88.841389; // Morales
// var blat=15.256590; // Los Amates
// var blon=-89.092249; // Los Amates
// var blat=16.524418; // Sayaxche
// var blon=-90.188656; // Sayaxche
// var blat=15.633546; // Campur
// var blon=-90.048497; // Campur
// var blat=15.804012; // Aldea San Antonio, Barillas, Huehuetenango
// var blon=-91.233269; // Aldea San Antonio, Barillas, Huehuetenango
var volnm='Coban_subset_'; //
var blat=15.47; // 
var blon=-90.366667; // 
var b=ee.Geometry.Rectangle([blon-0.5, blat+0.5, blon+0.5, blat-0.5]); // Fuego
// var volnm='Sn_Pedro_Soloma_subset_'; //
// // var blat=15.659712; // 
// // var blon=-91.429403; // 
// // var blat=15.613462; // 
// // var blon=-91.312248; // 
// var blat=15.613462; // 
// var blon=-91.212248; // 
// var b=ee.Geometry.Rectangle([blon-0.5, blat+0.5, blon+0.5, blat-0.5]); // Fuego
// var volnm='Morales_subset_'; //
// // var blat=15.4725; // Morales
// // var blon=-88.841389; // Morales
// var blat=15.633546; // Campur
// var blon=-90.048497; // Campur
// var b=ee.Geometry.Rectangle([blon-0.5, blat+0.5, blon+0.5, blat-0.5]); // Fuego
// var d1='2020-01-01';
// var d2='2020-02-01';
// var d1='2020-01-01';
// var d2='2020-01-04';
// var d1='2020-11-12';
// var d2='2020-11-14';
var d1='2020-06-07';
var d2='2020-06-09';
var imcoll_2='COPERNICUS/S2';
var a_1=ee.ImageCollection(imcoll_2).filterBounds(ee.Geometry.Rectangle([blon-1.5,blat-1.5,blon+1.5,blat+1.5])).filterDate(d1,d2).mosaic();
print(a_1)
// var d1='2020-11-01';
// var d2='2100-01-01';
// var d1='2020-11-12';
// var d2='2020-11-14';
// var d1='2020-11-24';
// var d2='2020-11-26';
var d1='2020-11-24';
var d2='2020-11-26';
var a_2=ee.ImageCollection(imcoll_2).filterBounds(ee.Geometry.Rectangle([blon-1.5,blat-1.5,blon+1.5,blat+1.5])).filterDate(d1,d2).mosaic();
Map.addLayer(a_1,
	{'min': [0,0,0], 'max': [4000,4000,2500],
//	{'min': [200,200,200], 'max': [1500,1500,1500],
	bands: ['B2', 'B8', 'B4']
//	bands: ['B4', 'B3', 'B2']
	},'Primer imagen',1); // Sentinel 2 
// var aNDVI_1=a_1.normalizedDifference(['B8','B4'])
// Map.addLayer(aNDVI_1,
//	{'min': 0, 'max': 0.7,
//	palette: ['brown','yellow','green']
//	},'NDVI_primer_imagen',0); // Sentinel 2
// Map.setCenter(blon, blat, 13);
var M2=ui.Map();
M2.addLayer(a_2,
	{'min': [0,0,0], 'max': [4000,4000,2500],
//	{'min': [200,200,200], 'max': [1500,1500,1500],
	bands: ['B2', 'B8', 'B4']
//	bands: ['B4', 'B3', 'B2']
	},'Sentinel 2 del 25 de Nov',1); // Sentinel 2 
// var aNDVI_1=a_2.normalizedDifference(['B8','B4'])
// Map.addLayer(aNDVI_1,
//	{'min': 0, 'max': 0.7,
//	palette: ['brown','yellow','green']
//	},'NDVI_primer_imagen',0); // Sentinel 2
// Map.setCenter(blon, blat, 13);
var linker=ui.Map.Linker([ui.root.widgets().get(0), M2]);
print(linker)
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
linker.get(0).setCenter(blon, blat, 12);
// set position of panel
var legend1 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '4px 20px'
  }
});
// Create legend title
var legendTitle1 = ui.Label({
  value: 'Imagenes cortesia de ESA/Copernicus, 2020. Elaborado por Rudiger Escobar-Wolf. Michigan Tech Univ. Dic 2020',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend1.add(legendTitle1);
Map.add(legend1);
// set position of panel
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '4px 10px'
  }
});
// Create legend title
var legendTitle2 = ui.Label({
  value: 'Comparacion de imagenes Sentinel 2 (bandas 2-8-4) del 8 de junio (izquierda) y 25 de noviembre (derecha)',
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend2.add(legendTitle2);
Map.add(legend2);