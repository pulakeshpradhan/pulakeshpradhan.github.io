var Santa_Lucia = ui.import && ui.import("Santa_Lucia", "table", {
      "id": "users/nandopando/AREA_ESTUDIO_SANTA_LUCIA-polygon"
    }) || ee.FeatureCollection("users/nandopando/AREA_ESTUDIO_SANTA_LUCIA-polygon");
//
Map.setCenter(-73.107486, 3.452082, 6);  
//
var departamentos = {
  'Santa_Lucia': Santa_Lucia,
};
/* Create UI Panels */
var panel = ui.Panel({style: {width:'300px'}});
ui.root.insert(0,panel);
var table = ui.Chart(
    [
      ['<img src=https://healingearth.ijep.net/files/styles/chapter_photo/public/images/gfw_logo_4c_small.jpg?itok=YcUdytMq width=120px>']
    ],
    'Table', {allowHtml: true});
var titlePanel = ui.Panel([table], 'flow', {width: '300x', padding: '8px'});
panel.add(titlePanel);
//intro
var intro = ui.Label('Análisis de series de tiempo de imágenes Landsat para caracterizar la extensión y el cambio de la cobertura vegetal en La Isla Santa Lucia', 
{fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
);
var subtitle = ui.Label('Fuente: UMD/hansen/global_forest_change_2019_v1_7, Publicación Hansen, Potapov, Moore, Hancher et al. “High-resolution global maps of 21st-century forest cover change.” Science 342.6160 (2013): 850-853.',
  {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
panel.add(intro).add(subtitle);
//select study area
var selectArea = ui.Select({
  items: Object.keys(departamentos),
});
selectArea.setPlaceholder('Area de estudio...');
panel.add(ui.Label('1. Seleccione el area de influencia del proyecto')).add(selectArea); 
/// Create Land Use Map
var mapbutton = ui.Label('2.Genere los mapas anuales de deforestación');
panel.add(mapbutton);
panel.add(ui.Button("Crear mapas",landMap));
var additional_directions = ui.Label
  ('Seleccione en "Layers" Años 2016 a 2019', 
  {margin: '0 0 0 12px',fontSize: '12px',color: 'gray'});
panel.add(additional_directions);
var outputPanel = ui.Panel();
print(outputPanel);
var hansenImage_2015 = ee.Image("UMD/hansen/global_forest_change_2015_v1_3");
var hansenImage_2016 = ee.Image("UMD/hansen/global_forest_change_2016_v1_4");
var hansenImage_2017 = ee.Image("UMD/hansen/global_forest_change_2017_v1_5");
var hansenImage_2018 = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
var hansenImage_2019 = ee.Image("UMD/hansen/global_forest_change_2019_v1_7");
//
var imageVisParam =  {
		"opacity":1,
		"bands":["loss","treecover2000","gain"],
		"min":[0,120,0],
		"max":[1, 0 ,1],
		"gamma":1
};
var getHansenMap = function( hansenImage  ){
	var treeCoverImage = hansenImage;
	//treeCoverImage = treeCoverImage.clip(region);
	// Threshold to determine if there is forest cover : 10% cover or there was a gain
	treeCoverImage = treeCoverImage.mask( treeCoverImage.select('treecover2000').gt(10).or( treeCoverImage.select('gain').gt(0) ) );
	var treeCoverImageVisualized = treeCoverImage.visualize( imageVisParam );
	return treeCoverImageVisualized;
};
Map.centerObject( Santa_Lucia, 3)
// Same visualization parameters end up in completely different maps when the user zooms out!
Map.addLayer( getHansenMap( hansenImage_2019 ),null, "Hansen 2019")
function landMap(){
Map.clear()
var selectedStudy_name = selectArea.getValue();
var studyArea = departamentos[selectedStudy_name];
Map.centerObject(studyArea,9);
Map.addLayer( getHansenMap( hansenImage_2016.clip(studyArea) ),null, "Hansen 2015")
Map.addLayer( getHansenMap( hansenImage_2016.clip(studyArea) ),null, "Hansen 2016")
Map.addLayer( getHansenMap( hansenImage_2017.clip(studyArea) ),null, "Hansen 2017")
Map.addLayer( getHansenMap( hansenImage_2018.clip(studyArea) ),null, "Hansen 2018")
Map.addLayer( getHansenMap( hansenImage_2019.clip(studyArea) ),null, "Hansen 2019")
}