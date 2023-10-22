var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                13.781463529463206,
                51.14484924678576
              ],
              [
                13.781463529463206,
                50.57621464144422
              ],
              [
                14.819671537275706,
                50.57621464144422
              ],
              [
                14.819671537275706,
                51.14484924678576
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[13.781463529463206, 51.14484924678576],
          [13.781463529463206, 50.57621464144422],
          [14.819671537275706, 50.57621464144422],
          [14.819671537275706, 51.14484924678576]]], null, false),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/svoboj25/Mariopol/Mariupol2022"
    }) || ee.Image("users/svoboj25/Mariopol/Mariupol2022"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            14.29674441047839,
            50.8687491431326
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([14.29674441047839, 50.8687491431326]),
    image = ui.import && ui.import("image", "image", {
      "id": "users/svoboj25/20220725_095339_45_241c_3B_AnalyticMS_SR_8b_harmonized"
    }) || ee.Image("users/svoboj25/20220725_095339_45_241c_3B_AnalyticMS_SR_8b_harmonized");
/* 
var filter2020 = ee.Filter.or(
        ee.Filter.date('2020-03-04', '2020-03-05'),
        ee.Filter.date('2020-03-14', '2020-03-15'),
        ee.Filter.date('2020-04-03', '2020-04-04'))
// import cloudy Sentinel-2 SR collection
var Mariupol2020 = ee.ImageCollection('COPERNICUS/S2_SR')
.filterBounds(geometry)
.filter(filter2020)
.select(['B12','B11','B9'])
;
var Mariopol2020max = Mariupol2020.reduce(ee.Reducer.max());
Export.image.toAsset({
  image: Mariopol2020max,
  description: 'Mariupol2020',
  maxPixels: 1e13,
  region: geometry
});
var Mariupol2022 = ee.ImageCollection('COPERNICUS/S2_SR')
.filterBounds(geometry)
.filterDate('2022-03-14','2022-03-30')
.select(['B12','B11','B9'])
//.filterMetadata('MGRS_TILE', 'equals', '33UXQ')
;
var Mariopol2022max = Mariupol2022.reduce(ee.Reducer.max());
Export.image.toAsset({
  image: Mariopol2022max,
  description: 'Mariupol2022',
  maxPixels: 1e13,
  region: geometry
});
*/
// import cloudy Sentinel-2 SR collection
var SnimekCervenecVyber = ee.ImageCollection('COPERNICUS/S2_SR')
.filterBounds(geometry)
.filterDate('2022-07-17', '2022-07-18')
.select(['B12','B11','B9'])
;
//print(SnimekLedenVyber)
var SnimekCervenecVybermax = SnimekCervenecVyber.reduce(ee.Reducer.max());
var MapSnimky = ui.Map()
var MapGoogle = ui.Map()
MapGoogle.setOptions('HYBRID');
MapSnimky.addLayer(image.select("b6","b7","b8"), {min: 0, max: 5000}, 'NIR Planet 25 cervenec', true);
MapSnimky.addLayer(SnimekCervenecVybermax.unmask(0), {min: 0, max: 4000}, 'SnimekCervenec17', false);
MapGoogle.addLayer(image2, {min: 1000, max: 7500}, 'Mariopol2022', true);
var splitPanel = ui.SplitPanel({
  firstPanel: MapSnimky,
  secondPanel: MapGoogle,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear()
ui.root.add(splitPanel)
var linkPanel = ui.Map.Linker([MapSnimky,MapGoogle])
MapSnimky.centerObject(geometry2,13)
//MapSnimky.setControlVisibility({all: false});
MapGoogle.setControlVisibility({all: true});
////////////////////VYTVOŘENÍ PANELU ATD
var panel = ui.Panel()
panel.style().set({ width: '370px',position: "middle-left"});
ui.root.insert(1,panel)
///////////////////////////
var controlPanel = ui.Panel({
  widgets: [  
     ui.Label({value: "Google mapy",
style: {textAlign:'centasdsadered',fontSize: '15px', color: '484848', fontWeight: 'bold'}})],
  style: {position: 'bottom-right'},
  layout: null,
});
MapGoogle.add(controlPanel);
var Datum_17_08 = ui.Panel({
  widgets: [  
     ui.Label({value: "SWIR snímek 17. červenec",
style: {textAlign:'centasdsadered',fontSize: '15px', color: '484848', fontWeight: 'bold'}})],
  style: {position: 'bottom-left', shown: false},
  layout: null,
});
MapSnimky.add(Datum_17_08);
var DatumLeden = ui.Panel({
  widgets: [  
     ui.Label({value: "NIR snímek Planet.com z 25. července",
style: {textAlign:'centasdsadered',fontSize: '15px', color: '484848', fontWeight: 'bold'}})],
  style: {position: 'bottom-left'},
  layout: null,
});
MapSnimky.add(DatumLeden);
var nazev = ui.Label({value: "Válka na Ukrajině - bitva o Mariupol",
style: {textAlign:'centasdsadered',fontSize: '21px', color: '484848', fontWeight: 'bold'}});
panel.add(nazev)
var podnadpis = ui.Label({value: "z družice Sentinel-2, v březnu 2022",
style: {fontSize: '18px', color: '484848', textAlign:'center'}});
panel.add(podnadpis)
var mezera = ui.Label({value: "",
style: {textAlign:'centasdsadered',fontSize: '15px', color: '484848', fontWeight: 'bold'}});
panel.add(mezera)
var podnadpis = ui.Label({value: "Vrstva k porovnání: ",
style: {margin: '14px'}//, color: '484848', fontWeight: 'bold',textAlign:'center'}
});
var a = 0
var list = ["snímek z 8. ledna 2022","SWIR snímek S2 z 17. července","NIR snímek Planet.com 25. července"]
var select = ui.Select({items:list,placeholder:(list[2]),onChange: selectLayer})
function selectLayer(){
  var graph = select.getValue()
  if (graph ==  "snímek z 8. ledna 2022"){
   MapSnimky.layers().get(0).set('shown', false)
   MapSnimky.layers().get(1).set('shown', true)
   MapSnimky.setControlVisibility({all: false});
   Datum_17_08.style().set('shown', false);
   DatumLeden.style().set('shown', true);
  }
 else if(graph == "SWIR snímek S2 z 17. července"){
   MapSnimky.layers().get(1).set('shown', true)
   MapSnimky.layers().get(0).set('shown', false)
   Datum_17_08.style().set('shown', true);
   DatumLeden.style().set('shown', false);
 }
else{
  MapSnimky.setControlVisibility({mapTypeControl: true})
  MapSnimky.layers().get(1).set('shown', false)
  MapSnimky.layers().get(0).set('shown', true)
  Datum_17_08.style().set('shown', false);
  DatumLeden.style().set('shown', false);
}}
///////////////////////////////
var panel2 = ui.Panel({
  widgets: [
    podnadpis,
    select
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
panel.add(panel2)
var AzovPryc = function(){
if (AzovstalOcel.getValue()== 1){
  MapSnimky.layers().get(2).set('shown', true);
  Map2022.layers().get(1).set('shown', true);
}else
{
 MapSnimky.layers().get(2).set('shown', false);
 Map2022.layers().get(1).set('shown', false);
}}
var AzovstalOcel = ui.Checkbox({label: "zobrazit Železárny a ocelárny Azovstal",value: 1, onChange: AzovPryc})
panel.add(AzovstalOcel)
var IljichPryc = function(){
if (IljichOcel.getValue()== 1){
  MapSnimky.layers().get(3).set('shown', true);
  Map2022.layers().get(2).set('shown', true);
}else
{
 MapSnimky.layers().get(3).set('shown', false);
 Map2022.layers().get(2).set('shown', false);
}}
var IljichOcel = ui.Checkbox({label: "zobrazit Iljičův hutní závod v Mariupolu",value: 1, onChange: IljichPryc})
panel.add(IljichOcel)
var infohead = ui.Label({value: "",
style: {textAlign:'centasdsadered',fontSize: '15px', color: '484848', fontWeight: 'bold'}});
panel.add(infohead)
var infotext1 = ui.Label({value:
"Vrstvy mapové aplikace jsou vytvořeny z multispektrálních dat družice Sentinel-2 evropského programu Copernicus. Světlé žlutooranžové lokality v mapové aplikaci představují místa, která vykazují vysoké hodnoty teplot v době snímání. Zatímco v březnu roku 2020 bylo možné taková místa nalézt v Mariupolu téměř výhradně v průmyslových částech města (Iljičovy závody a ocelárny Azovstal), tak na snímcích z doby probíhajícího válečného konfliktu se jedná o důkaz dopadů bomb a destruktivní činnosti ruských okupantů v rezidenčních částech tohoto města."
,style: {fontSize: '13px', color: '484848',textAlign:'justify'}});
panel.add(infotext1)
var infotext2 = ui.Label({value:
"Kterak vznikly tyto snímky? V mapovém poli jsou zobrazeny barevné kompozity infračervených snímků (R = B12, G = B11, B = B9) z družice Sentinel-2. Pomocí aplikace je možno porovnat stav z března roku 2020, 8. ledna 2022 a března 2022. Objekty s vysokou teplotou by měly být patrné v tomto kompozitu, jelikož znatelně září ve středních spektrech infračerveného záření, v tzv. Short Wave Infrared (SWIR)."
,style: {fontSize: '13px', color: '484848',textAlign:'justify'}});
panel.add(infotext2)
var copy = ui.Label({value:
"Autor: Jan Svoboda ©EO4Landscape"
,style: {fontSize: '13px', color: '484848',textAlign:'justify'}});
panel.add(copy)