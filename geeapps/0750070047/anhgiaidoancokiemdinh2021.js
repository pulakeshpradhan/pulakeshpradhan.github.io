var khuvuc = ee.Image("projects/khoaluan-0750070047/assets/anhgiaidoan2021");
var viz = {
  min: 1,
  max:4,
  palette: ['0000FF','FF0000','FFFF00','00FF00']
}
Map.addLayer(khuvuc,viz, 'LANDSAT 8',1);
Map.centerObject(khuvuc,12);