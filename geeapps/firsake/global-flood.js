var srtm = ee.Image("USGS/SRTMGL1_003");
Map.setCenter(11.92,18.27,3);
var garbage_collector = [];
var maskedLayer;
//var slope = ee.Terrain.slope(srtm);
//Map.addLayer(slope, {min:0, max:60}, 'slope');
//PANEL/////////////////////////////////////////////////////////////////////////////////////////
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'FLOOD LEVEL MAPPER - USING SRTM DATA',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#0000FF',  textAlign: 'center'}
  }),
  ui.Label(
    {
    value: 'Look out for dry regions',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#3e3f2f', textAlign: 'center',stretch: 'horizontal'}
    }
  )
]);
panel.add(intro);
var lblMask = ui.Label(
  {
    value:'Flood Threshold (metres)',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#001287', textAlign: 'left' ,stretch: 'horizontal', padding:'10px'}
  }
);
var sldMask = ui.Slider({
  min: 0,
  max: 9000,
  value: 0,
  step: 1,
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'},
  onChange: remask
});
var lblMask = ui.Label(
  {
    value:'Slide to select Flood Threshold (meters)',
    style: {fontSize: '11px', fontWeight: 'bold', color: '#001287', textAlign: 'left' ,stretch: 'horizontal', padding:'10px'}
  }
);
var lblDown = ui.Label(
  {
    value:'By Steve Firsake, using Google Earth Engine.',
    style: {fontSize: '11px', color: '#000000', textAlign: 'left' ,stretch: 'horizontal', padding:'10px'}
  }
);
var lblDisclaimer = ui.Label(
  {
    value:'SRTM Data is limited in coverage - read more about it here: https://gisgeography.com/srtm-shuttle-radar-topography-mission/',
    style: {fontSize: '10px', color: '#FF0000', textAlign: 'left' ,stretch: 'horizontal', padding:'10px'}
  }
);
panel.add(lblMask)
     .add(sldMask)
     .add(lblDown)
     .add(lblDisclaimer)
     ;
ui.root.insert(0, panel);
function remask(value){
  var maskedImage = srtm.updateMask(srtm.lt(value));
  maskedLayer = ui.Map.Layer(maskedImage,{palette:['a4d2f3']},'Flooded');
  try{
    for (var i = 0; i < garbage_collector.length; i++){
      Map.remove(garbage_collector[i]);
    }
  }catch(error){
  }
  Map.add(maskedLayer);
  garbage_collector.push(maskedLayer);
}