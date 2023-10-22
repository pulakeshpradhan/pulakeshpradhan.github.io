var image = ui.import && ui.import("image", "image", {
      "id": "users/reiniscimdins/Fagus_stack"
    }) || ee.Image("users/reiniscimdins/Fagus_stack"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/reiniscimdins/castan_stack"
    }) || ee.Image("users/reiniscimdins/castan_stack"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/reiniscimdins/picea_stack"
    }) || ee.Image("users/reiniscimdins/picea_stack"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/reiniscimdins/pseudotsuga_stack"
    }) || ee.Image("users/reiniscimdins/pseudotsuga_stack"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/reiniscimdins/quercus_stack"
    }) || ee.Image("users/reiniscimdins/quercus_stack"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/reiniscimdins/robinia_stack"
    }) || ee.Image("users/reiniscimdins/robinia_stack"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/reiniscimdins/for_certified_Alps2"
    }) || ee.Image("users/reiniscimdins/for_certified_Alps2"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/reiniscimdins/Abies_alba_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Abies_alba_csv_stack5"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/reiniscimdins/Abies_grandis_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Abies_grandis_csv_stack5"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/reiniscimdins/Acacia_dealbata_inat_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Acacia_dealbata_inat_csv_stack5"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/reiniscimdins/Acer_negundo_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Acer_negundo_csv_stack5"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/reiniscimdins/Ailanthus_altissima_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Ailanthus_altissima_csv_stack5"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/reiniscimdins/Castanea_sativa_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Castanea_sativa_csv_stack5"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/reiniscimdins/Cedrus_libani_inat_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Cedrus_libani_inat_csv_stack5"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/reiniscimdins/Chamaecyparis_lawsoniana_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Chamaecyparis_lawsoniana_csv_stack5"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/reiniscimdins/Cupressus_sempervirens_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Cupressus_sempervirens_csv_stack5"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/reiniscimdins/Fagus_sylvatica_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Fagus_sylvatica_csv_stack5"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/reiniscimdins/Fraxinus_pennsylvanica_inat_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Fraxinus_pennsylvanica_inat_csv_stack5"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/reiniscimdins/Juglans_nigra_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Juglans_nigra_csv_stack5"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/reiniscimdins/Larix_decidua_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Larix_decidua_csv_stack5"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/reiniscimdins/Picea_abies_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Picea_abies_csv_stack5"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/reiniscimdins/Picea_omorika_inat_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Picea_omorika_inat_csv_stack5"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/reiniscimdins/Picea_sitchensis_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Picea_sitchensis_csv_stack5"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/reiniscimdins/Pinus_contorta_inat_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pinus_contorta_inat_csv_stack5"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/reiniscimdins/Pinus_pinaster_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pinus_pinaster_csv_stack5"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/reiniscimdins/Pinus_radiata_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pinus_radiata_csv_stack5"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/reiniscimdins/Pinus_strobus_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pinus_strobus_csv_stack5"),
    image28 = ui.import && ui.import("image28", "image", {
      "id": "users/reiniscimdins/Pinus_sylvestris_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pinus_sylvestris_csv_stack5"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/reiniscimdins/Prunus_serotina_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Prunus_serotina_csv_stack5"),
    image30 = ui.import && ui.import("image30", "image", {
      "id": "users/reiniscimdins/Pseudotsuga_menziesii_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Pseudotsuga_menziesii_csv_stack5"),
    image31 = ui.import && ui.import("image31", "image", {
      "id": "users/reiniscimdins/Quercus_robur_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Quercus_robur_csv_stack5"),
    image32 = ui.import && ui.import("image32", "image", {
      "id": "users/reiniscimdins/Quercus_rubra_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Quercus_rubra_csv_stack5"),
    image33 = ui.import && ui.import("image33", "image", {
      "id": "users/reiniscimdins/Robinia_pseudoacacia_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Robinia_pseudoacacia_csv_stack5"),
    image34 = ui.import && ui.import("image34", "image", {
      "id": "users/reiniscimdins/Thuja_plicata_csv_stack5"
    }) || ee.Image("users/reiniscimdins/Thuja_plicata_csv_stack5"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/reiniscimdins/protected_alps"
    }) || ee.FeatureCollection("users/reiniscimdins/protected_alps");
var m = {};
// Load some images.
m.Prod_fagus = image;
m.Prod_castan = image2;
m.Prod_picea = image3;
m.Prod_pseudotsuga = image4;
m.Prod_robinia = image5;
m.Prod_quercus = image6;
print(m.Prod_fagus)
m.certif = image7
m.Suit_Abies_alba = image8;
m.Suit_Abies_grandis = image9;
m.Suit_Acacia_dealbata = image10;
m.Suit_Acer_negundo = image11;
m.Suit_Ailanthus_altissima = image12;
m.Suit_Castanea_sativa = image13;
m.Suit_Cedrus_libani = image14;
m.Suit_Chamaecyparis_lawsoniana = image15;
m.Suit_Cupressus_sempervirens = image16;
m.Suit_Fagus_sylvatica = image17;
m.Suit_Fraxinus_pennsylvanica = image18;
m.Suit_Juglans_nigra = image19;
m.Suit_Larix_decidua = image20;
m.Suit_Picea_abies = image21;
m.Suit_Picea_omorika = image22;
m.Suit_Picea_sitchensis = image23;
m.Suit_Pinus_contorta = image24;
m.Suit_Pinus_pinaster = image25;
m.Suit_Pinus_radiata = image26;
m.Suit_Pinus_strobus = image27;
m.Suit_Pinus_sylvestris = image28;
m.Suit_Prunus_serotina = image29;
m.Suit_Pseudotsuga_menziesii = image30;
m.Suit_Quercus_robur = image31;
m.Suit_Quercus_rubra = image32;
m.Suit_Robinia_pseudoacacia = image33;
m.Suit_Thuja_plicata = image34;
m.Prod_fagus = m.Prod_fagus.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Prod_castan = m.Prod_castan.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Prod_picea = m.Prod_picea.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Prod_pseudotsuga = m.Prod_pseudotsuga.select(['b1', 'b2', 'b3', 'b4'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070'])
m.Prod_robinia = m.Prod_robinia.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Prod_quercus = m.Prod_quercus.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Prod_fagus = m.Prod_fagus.divide(100)	
m.Prod_castan = m.Prod_castan.divide(100)	
m.Prod_picea = m.Prod_picea.divide(100)	
m.Prod_pseudotsuga = m.Prod_pseudotsuga.divide(100)	
m.Prod_robinia = m.Prod_robinia.divide(100)	
m.Prod_quercus = m.Prod_quercus.divide(100)	
m.Suit_Abies_alba = m.Suit_Abies_alba.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Abies_grandis = m.Suit_Abies_grandis.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Acacia_dealbata = m.Suit_Acacia_dealbata.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Acer_negundo = m.Suit_Acer_negundo.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Ailanthus_altissima = m.Suit_Ailanthus_altissima.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Cedrus_libani = m.Suit_Cedrus_libani.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Chamaecyparis_lawsoniana = m.Suit_Chamaecyparis_lawsoniana.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Cupressus_sempervirens = m.Suit_Cupressus_sempervirens.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Fagus_sylvatica = m.Suit_Fagus_sylvatica.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Fraxinus_pennsylvanica = m.Suit_Fraxinus_pennsylvanica.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Juglans_nigra = m.Suit_Juglans_nigra.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Larix_decidua = m.Suit_Larix_decidua.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Picea_abies = m.Suit_Picea_abies.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Picea_omorika = m.Suit_Picea_omorika.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Picea_sitchensis = m.Suit_Picea_sitchensis.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pinus_contorta = m.Suit_Pinus_contorta.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pinus_pinaster = m.Suit_Pinus_pinaster.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pinus_radiata = m.Suit_Pinus_radiata.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pinus_strobus = m.Suit_Pinus_strobus.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pinus_sylvestris = m.Suit_Pinus_sylvestris.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Prunus_serotina = m.Suit_Prunus_serotina.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Pseudotsuga_menziesii = m.Suit_Pseudotsuga_menziesii.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Quercus_robur = m.Suit_Quercus_robur.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Quercus_rubra = m.Suit_Quercus_rubra.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Robinia_pseudoacacia = m.Suit_Robinia_pseudoacacia.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
m.Suit_Thuja_plicata = m.Suit_Thuja_plicata.select(['b1', 'b2', 'b3', 'b4', 'b5'],
['RCP 4_5 2050', 'RCP 4_5 2070', 'RCP 8_5 2050', 'RCP 8_5 2070', 'Historical'])
var shp = ee.FeatureCollection(table)
var s = {};
s.topic_style = {fontSize: '11px', 
                      color: '#000000',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both',
                      fontWeight: 'bold',
                      margin: '2px 0 2px 0',
                      padding: '0'
};
s.topic_style2 = {fontSize: '11px', 
                      color: '#000000',
                      //fontWeight: 'bold',
                      fontFamily : 'roboto',
                      textAlign: 'left',
                      stretch: 'both',
                      margin: '2px 0 2px 0',
                      padding: '0'
};
var leftMap = ui.Map();
var rightMap = ui.Map();
var c = {};
var treeVis = {
  min: 0,
  max: 9,
  palette: [
    "c9c9c9ff","e4a21cff","f5ff26ff","15de1aff","26958bff","1d0776ff"],
};
var treeVis2 = {
  min: 0,
  max: 1,
  palette: [
    "#692819","#D3212C","#FF681E","#FF980E","#365C02","#004822"],
};
// create static variable band visulisation setup
m.staticInfo = {
    vis: {
      min:1,
      max:3,
        palette: [
    "cb00fdff",
    "1be949ff",
    "5000ebff"
  ]
}}
// create Static widgets features
c.cert_lbl = ui.Label("add certified area", s.topic_style2);
c.cert_checkbox = ui.Checkbox('', true);
// c.cert_button = ui.Button('Add layer');
c.cert_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left'}});
c.cert_Panel.add(c.cert_lbl);
c.cert_Panel.add(c.cert_checkbox);
// Static function
  var S_layer = ui.Map.Layer({
  eeObject: image7,
  visParams: m.staticInfo.vis,
  });
  leftMap.add(S_layer)
c.cert_checkbox.onChange(function(checked) {
    if(checked){leftMap.add(S_layer)}
    else{leftMap.remove(S_layer)}})
/////////////////////////////////////////////////////////
// create Static widgets features
c.prot_lbl = ui.Label("add protected area", s.topic_style2);
c.prot_checkbox = ui.Checkbox('', true);
// c.cert_button = ui.Button('Add layer');
c.prot_Panel = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'bottom-left'}});
c.cert_Panel.add(c.prot_lbl);
c.cert_Panel.add(c.prot_checkbox);
// protected function
  var p_layer = ui.Map.Layer({
  eeObject: shp,
  // visParams: m.staticInfo.vis,
  });
  leftMap.add(p_layer)
c.prot_checkbox.onChange(function(checked) {
    if(checked){leftMap.add(p_layer)}
    else{leftMap.remove(p_layer)}})
  leftMap.add(c.cert_Panel)
////////////////////////////////////////////////////////////////////////////////////////////////
// Make a drop-down menu of bands.
var bandSelect1 = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer1 = ui.Map.Layer(imageSelect1.getValue().select(value), treeVis);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    leftMap.layers().set(0, layer1);
  }
});
// Make a drop down menu of images.
var imageSelect1 = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Picea abies', value: m.Prod_picea},
    {label: 'Fagus sylvatica', value: m.Prod_fagus},
    {label: 'Quercus robur', value: m.Prod_quercus},
    {label: 'Robinia pseudoacacia', value: m.Prod_robinia},
    {label: 'Castanea sativa', value: m.Prod_castan},
    {label: 'Pseudotsuga menziesii', value: m.Prod_pseudotsuga},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect1.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect1.setValue(bandSelect1.items().get(0));
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////
// Make a drop-down menu of bands.
var bandSelect1_suit = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer3 = ui.Map.Layer(imageSelect1_suit.getValue().select(value), treeVis2);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    leftMap.layers().set(0, layer3);
  }
});
// Make a drop down menu of images.
var imageSelect1_suit = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Abies alba', value: m.Suit_Abies_alba},
    {label: 'Abies grandis', value: m.Suit_Abies_grandis},
    {label: 'Acacia dealbata', value: m.Suit_Acacia_dealbata},
    {label: 'Acer negundo', value: m.Suit_Acer_negundo},
    {label: 'Ailanthus altissima', value: m.Suit_Ailanthus_altissima},
    {label: 'Castanea sativa', value: m.Suit_Castanea_sativa},
    {label: 'Cedrus libani', value: m.Suit_Cedrus_libani},
    {label: 'Chamaecyparis lawsoniana', value: m.Suit_Chamaecyparis_lawsoniana},
    {label: 'Cupressus sempervirens', value: m.Suit_Cupressus_sempervirens},
    {label: 'Fagus sylvatica', value: m.Suit_Fagus_sylvatica},
    {label: 'Fraxinus pennsylvanica', value: m.Suit_Fraxinus_pennsylvanica},
    {label: 'Juglans nigra', value: m.Suit_Juglans_nigra},
    {label: 'Larix decidua', value: m.Suit_Larix_decidua},
    {label: 'Picea abies', value: m.Suit_Picea_abies},
    {label: 'Picea omorika', value: m.Suit_Picea_omorika},
    {label: 'Picea sitchensis', value: m.Suit_Picea_sitchensis},
    {label: 'Pinus contorta', value: m.Suit_Pinus_contorta},
    {label: 'Pinus pinaster', value: m.Suit_Pinus_pinaster},
    {label: 'Pinus radiata', value: m.Suit_Pinus_radiata},
    {label: 'Pinus strobus', value: m.Suit_Pinus_strobus},
    {label: 'Pinus sylvestris', value: m.Suit_Pinus_sylvestris},
    {label: 'Prunus serotina', value: m.Suit_Prunus_serotina},
    {label: 'Pseudotsuga menziesii', value: m.Suit_Pseudotsuga_menziesii},
    {label: 'Quercus robur', value: m.Suit_Quercus_robur},
    {label: 'Quercus rubra', value: m.Suit_Quercus_rubra},
    {label: 'Robinia pseudoacacia', value: m.Suit_Robinia_pseudoacacia},
    {label: 'Thuja plicata', value: m.Suit_Thuja_plicata},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect1_suit.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect1_suit.setValue(bandSelect1_suit.items().get(0));
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////
c.Panel1 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'top-left'}});
c.Product1_lbl = ui.Label("tree species productivity", s.topic_style);
c.Suit1_lbl = ui.Label("tree species suitability", s.topic_style);
c.Panel1.add(c.Product1_lbl)
c.Panel1.add(imageSelect1)
c.Panel1.add(bandSelect1)
c.Panel1.add(c.Suit1_lbl)
c.Panel1.add(imageSelect1_suit)
c.Panel1.add(bandSelect1_suit)
// Make a drop-down menu of bands.
var bandSelect2 = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer2 = ui.Map.Layer(imageSelect2.getValue().select(value), treeVis);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    rightMap.layers().set(0, layer2);
  }
});
// Make a drop down menu of images.
var imageSelect2 = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Picea abies', value: m.Prod_picea},
    {label: 'Fagus sylvatica', value: m.Prod_fagus},
    {label: 'Quercus robur', value: m.Prod_quercus},
    {label: 'Robinia pseudoacacia', value: m.Prod_robinia},
    {label: 'Castanea sativa', value: m.Prod_castan},
    {label: 'Pseudotsuga menziesii', value: m.Prod_pseudotsuga},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect2.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect2.setValue(bandSelect2.items().get(0));
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Make a drop-down menu of bands.
var bandSelect2_suit = ui.Select({
  placeholder: ('Select prediction'),
  // style: {width: '150px'},
  onChange: function(value) {
    var layer4 = ui.Map.Layer(imageSelect2_suit.getValue().select(value), treeVis2);
    // Use set() instead of add() so the previous layer (if any) is overwritten.
    rightMap.layers().set(0, layer4);
  }
});
// Make a drop down menu of images.
var imageSelect2_suit = ui.Select({
  placeholder: ('Select specie'),
  // style: {width: '150px'},
  items: [
    {label: 'Abies alba', value: m.Suit_Abies_alba},
    {label: 'Abies grandis', value: m.Suit_Abies_grandis},
    {label: 'Acacia dealbata', value: m.Suit_Acacia_dealbata},
    {label: 'Acer negundo', value: m.Suit_Acer_negundo},
    {label: 'Ailanthus altissima', value: m.Suit_Ailanthus_altissima},
    {label: 'Castanea sativa', value: m.Suit_Castanea_sativa},
    {label: 'Cedrus libani', value: m.Suit_Cedrus_libani},
    {label: 'Chamaecyparis lawsoniana', value: m.Suit_Chamaecyparis_lawsoniana},
    {label: 'Cupressus sempervirens', value: m.Suit_Cupressus_sempervirens},
    {label: 'Fagus sylvatica', value: m.Suit_Fagus_sylvatica},
    {label: 'Fraxinus pennsylvanica', value: m.Suit_Fraxinus_pennsylvanica},
    {label: 'Juglans nigra', value: m.Suit_Juglans_nigra},
    {label: 'Larix decidua', value: m.Suit_Larix_decidua},
    {label: 'Picea abies', value: m.Suit_Picea_abies},
    {label: 'Picea omorika', value: m.Suit_Picea_omorika},
    {label: 'Picea sitchensis', value: m.Suit_Picea_sitchensis},
    {label: 'Pinus contorta', value: m.Suit_Pinus_contorta},
    {label: 'Pinus pinaster', value: m.Suit_Pinus_pinaster},
    {label: 'Pinus radiata', value: m.Suit_Pinus_radiata},
    {label: 'Pinus strobus', value: m.Suit_Pinus_strobus},
    {label: 'Pinus sylvestris', value: m.Suit_Pinus_sylvestris},
    {label: 'Prunus serotina', value: m.Suit_Prunus_serotina},
    {label: 'Pseudotsuga menziesii', value: m.Suit_Pseudotsuga_menziesii},
    {label: 'Quercus robur', value: m.Suit_Quercus_robur},
    {label: 'Quercus rubra', value: m.Suit_Quercus_rubra},
    {label: 'Robinia pseudoacacia', value: m.Suit_Robinia_pseudoacacia},
    {label: 'Thuja plicata', value: m.Suit_Thuja_plicata},
  ],
  onChange: function(value) {
    // Asynchronously get the list of band names.
    value.bandNames().evaluate(function(bands) {
      // Display the bands of the selected image.
      bandSelect2_suit.items().reset(bands);
      // Set the first band to the selected band.
      bandSelect2_suit.setValue(bandSelect2_suit.items().get(0));
    });
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
c.Panel2 = ui.Panel({style: {backgroundColor: '#FFFFFF',position:'top-right'}});
c.Product2_lbl = ui.Label("tree species productivity", s.topic_style);
c.Suit2_lbl = ui.Label("tree species suitability", s.topic_style);
c.Panel2.add(c.Product2_lbl)
c.Panel2.add(imageSelect2)
c.Panel2.add(bandSelect2)
c.Panel2.add(c.Suit2_lbl)
c.Panel2.add(imageSelect2_suit)
c.Panel2.add(bandSelect2_suit)
///////////////////////////////////////
leftMap.add(c.Panel1)
rightMap.add(c.Panel2)
leftMap.setCenter(12.39, 47.30, 7);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: "horizontal",
  wipe: true
})
ui.root.clear();
ui.root.add(splitPanel);
var linkPanel = ui.Map.Linker([leftMap, rightMap])
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x20',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(treeVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(treeVis.min, {margin: '4px 8px'}),
    ui.Label(
        (treeVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(treeVis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle1 = ui.Label('tree species productivity, m3/ha/yr', s.topic_style2);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create the color bar for the legend.
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(treeVis2.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(treeVis2.min, {margin: '4px 8px'}),
    ui.Label(
        (treeVis2.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(treeVis2.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label('tree species suitability', s.topic_style2);
// Add the legendPanel to the map.
var legendPanel1 = ui.Panel([legendTitle1, colorBar1, legendLabels1]);
var desc_panel1 = ui.Panel({style: {position:'bottom-right', width: "200px"}});
var info = {};
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
desc_panel1.add(legendPanel1);
desc_panel1.add(legendPanel2);
rightMap.add(desc_panel1);