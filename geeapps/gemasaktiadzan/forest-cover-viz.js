var center = ui.import && ui.import("center", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            113.93130487967329,
            0.5259383172842086
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([113.93130487967329, 0.5259383172842086]),
    country = ui.import && ui.import("country", "table", {
      "id": "projects/ee-asiapacific-07/assets/country"
    }) || ee.FeatureCollection("projects/ee-asiapacific-07/assets/country"),
    mos_2000 = ui.import && ui.import("mos_2000", "image", {
      "id": "projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2000_vers1"
    }) || ee.Image("projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2000_vers1"),
    mos_2010 = ui.import && ui.import("mos_2010", "image", {
      "id": "projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2010_vers1"
    }) || ee.Image("projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2010_vers1"),
    mos_2020 = ui.import && ui.import("mos_2020", "image", {
      "id": "projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2020_vers1"
    }) || ee.Image("projects/ee-asiapacific-07/assets/2021-06-25_mosaic_ap_2020_vers1"),
    def_0010 = ui.import && ui.import("def_0010", "image", {
      "id": "projects/ee-asiapacific-07/assets/2021-06-25_DEF_0010"
    }) || ee.Image("projects/ee-asiapacific-07/assets/2021-06-25_DEF_0010"),
    def_1020 = ui.import && ui.import("def_1020", "image", {
      "id": "projects/ee-asiapacific-07/assets/2021-06-25_DEF_1020"
    }) || ee.Image("projects/ee-asiapacific-07/assets/2021-06-25_DEF_1020");
// Map viz
Map.addLayer(def_1020, {palette:['#377eb8']}, 'Deforestation 2010-2020', 0);
Map.addLayer(def_0010, {palette:['#e41a1c']}, 'Deforestation 2000-2010', 0);
Map.addLayer(mos_2000, {palette:['#ffffb3']}, 'Forest cover in 2000', 0);
Map.addLayer(mos_2010, {palette:['#ff7f00']}, 'Forest cover in 2010', 0);
Map.addLayer(mos_2020, {palette:['#4daf4a']}, 'Forest cover in 2020', 1);
Map.centerObject(center, 3);
// Create the title label
var title = ui.Label('FOREST COVER IN ASIA PACIFIC 2000-2020');
title.style().set('position', 'top-center');
Map.add(title);
// Create legend
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '25px 35px'
}
});
// Create legend title
// var titleLegend = ui.Label({
// value: 'Legend',
// style: {
// fontWeight: 'bold',
// fontSize: '18px',
// margin: '0 0 4px 0',
// padding: '0'
// }
// });
// var titleClass =  ui.Label({
// value: '',
// style: {
// fontWeight: 'normal',
// fontSize: '16px',
// margin: '0 0 4px 0',
// padding: '0'
// }
// });
// legend.add(titleLegend);
// legend.add(titleClass);
// Membuat 1 baris legenda
var row = function(color, name) {
// Membuat simbol isi peta di legenda
var colorbox = ui.Label({
style: {
backgroundColor: '#' + color,
padding: '8px',
margin: '0 0 4px 0'
}
});
// Menyusun simbol peta dan deskripsi
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
return ui.Panel({
widgets: [colorbox, description],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
legend.add(row('ffffb3', 'Forest cover in 2000'));
legend.add(row('ff7f00', 'Forest cover in 2010'));
legend.add(row('4daf4a', 'Forest cover in 2020'));
// legend.add(row('006400', 'Primary forest'));
// legend.add(row('9ACD32', 'Secondary forest'));
legend.add(row('e41a1c', 'Deforestation in 2000-2010'));
legend.add(row('377eb8', 'Deforestation in 2010-2020'));
//Menambahkan legenda pada peta
Map.add(legend);