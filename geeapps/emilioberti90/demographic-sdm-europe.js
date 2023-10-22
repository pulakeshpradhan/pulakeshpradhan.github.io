Map.setCenter(12, 48, 4.2);
var water = ee.ImageCollection('MODIS/006/MOD44W')
                  .filter(ee.Filter.date('2015-01-01', '2015-05-01'))
                  .select('water_mask')
                  .first()
                  .eq(0)
                  .selfMask();
// BIO 11
var visParsTemp = {
  min: 1,
  max: 1.1,
    palette: ['#2c7bb6', '#abd9e9', '#ffffff', '#fdae61', '#d7191c']
};
var sp1_const = ee.Image('users/emilioberti90/demography/species-1-constant-europe').mask(water);
var sp1_var = ee.Image('users/emilioberti90/demography/species-1-variable-europe').mask(water);
sp1_const = sp1_const.mask(sp1_const.gte(1));
sp1_var = sp1_var.mask(sp1_var.gte(1));
var sp1_const_bin = sp1_const.selfMask();
var sp1_var_bin = sp1_var.selfMask();
// BIO12
var visParsPrec = {
  min: 1,
  max: 1.1,
  palette: ['#cf4001','#ffcf65','#ade489','#7bcd6d','#44b55b']
};
var sp2_const = ee.Image('users/emilioberti90/demography/species-2-constant-europe').mask(water);
var sp2_var = ee.Image('users/emilioberti90/demography/species-2-variable-europe').mask(water);
sp2_const = sp2_const.mask(sp2_const.gte(1));
sp2_var = sp2_var.mask(sp2_var.gte(1));
var sp2_const_bin = sp2_const.selfMask();
var sp2_var_bin = sp2_var.selfMask();
// two stage
var two_const = ee.Image('users/emilioberti90/species-twostages-constant');
var two_var = ee.Image('users/emilioberti90/species-twostages-variable');
var two_nocovar = ee.Image('users/emilioberti90/species-twostages-nocovar');
var two_noac = ee.Image('users/emilioberti90/species-twostages-noac');
two_const = two_const.mask(two_const.gte(1));
two_var = two_var.mask(two_var.gte(1));
two_nocovar = two_nocovar.mask(two_nocovar.gte(1));
two_noac = two_noac.mask(two_noac.gte(1));
var visParsTwo = {
  min: 1,
  max: 1.18,
  palette: ['#440154','#450558','#46085C','#470D60','#471063','#481467','#481769','#481B6D','#481E70','#482173','#482576','#482878','#472C7A','#472F7C','#46327E','#453581','#453882','#443B84','#433E85','#424186','#404587','#3F4788','#3E4A89','#3D4D8A','#3C508B','#3B528B','#39558C','#38598C','#375B8D','#355E8D','#34608D','#33638D','#32658E','#31688E','#2F6B8E','#2E6D8E','#2D708E','#2C718E','#2B748E','#2A768E','#29798E','#287C8E','#277E8E','#26818E','#26828E','#25858E','#24878E','#238A8D','#228D8D','#218F8D','#20928C','#20938C','#1F968B','#1F998A','#1E9B8A','#1F9E89','#1FA088','#1FA287','#20A486','#22A785','#24AA83','#25AC82','#28AE80','#2BB07F','#2EB37C','#31B67B','#35B779','#39BA76','#3DBC74','#41BE71','#47C06F','#4CC26C','#51C56A','#56C667','#5BC863','#61CA60','#67CC5C','#6DCD59','#73D056','#78D152','#7FD34E','#85D54A','#8CD646','#92D741','#99D83D','#A0DA39','#A7DB35','#ADDC30','#B4DE2C','#BBDE28','#C2DF23','#C9E020','#D0E11C','#D7E219','#DDE318','#E4E419','#EBE51A','#F1E51D','#F7E620','#FDE725']
};
// GUI
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  height: '420px',
  position: 'top-right',
  backgroundColor: 'f9f9f9'
});
panel.add(ui.Label({
   'value': 'Demographic SDMs',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '20px'}
}));
panel.add(ui.Label({
   'value': 'Species are constrained by:',
   'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
  'value': '1) minimum temperature of the coldest month (BIO06)',
  'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
  'value': '2) total annual precipitation (BIO12)',
  'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
  'value': '3) BIO06 for juvenile and adult survival and BIO12 for adult fecundity',
  'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
  'value': '',
  'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
   'value': 'Select Species',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '18px'}
}));
var choice = ui.Select({
   'placeholder': 'Select a species',
   'items': ['Species 1', 'Species 2', 'Species 3'],
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '20px'},
   'onChange': function(value){
  Map.layers().reset();
  if (value == 'Species 1') {
    var sp1_map_const = ui.Map.Layer(sp1_const, visParsTemp, 'LTSGR - constant environment', true);
    var sp1_map_var = ui.Map.Layer(sp1_var, visParsTemp, 'LTSGR - variable environment', false);
    var sp1_map_const_bin = ui.Map.Layer(sp1_const_bin, {palette: ['#3a3fb4']}, 'Distribution - constant environment', false, 0.75);
    var sp1_map_var_bin = ui.Map.Layer(sp1_var_bin, {palette: ['#ff4343']}, 'Distribution - variable environment', false, 0.75);
    Map.add(sp1_map_const);
    Map.add(sp1_map_var);
    Map.add(sp1_map_const_bin);
    Map.add(sp1_map_var_bin);
  } else if (value == 'Species 2') {
    var sp2_map_const = ui.Map.Layer(sp2_const, visParsPrec, 'LTSGR - constant environment', true);
    var sp2_map_var = ui.Map.Layer(sp2_var, visParsPrec, 'LTSGR - variable environment', true);
    var sp2_map_const_bin = ui.Map.Layer(sp2_const_bin, {palette: ['#3a3fb4']}, 'Distribution - constant environment', false, 0.75);
    var sp2_map_var_bin = ui.Map.Layer(sp2_var_bin, {palette: ['#ff4343']}, 'Distribution - variable environment', false, 0.75);
    Map.add(sp2_map_const);
    Map.add(sp2_map_var);
    Map.add(sp2_map_const_bin);
    Map.add(sp2_map_var_bin);
  } else {
    var sp3_map_const = ui.Map.Layer(two_const, visParsTwo, 'LTSGR - constant environment', true);
    var sp3_map_nocovar = ui.Map.Layer(two_nocovar, visParsTwo, 'LTSGR - without covariance', false);
    var sp3_map_noac = ui.Map.Layer(two_noac, visParsTwo, 'LTSGR - without autocorrelation', false);
    var sp3_map_var = ui.Map.Layer(two_var, visParsTwo, 'LTSGR - variable environment', true);
    Map.add(sp3_map_const);
    Map.add(sp3_map_nocovar);
    Map.add(sp3_map_noac);
    Map.add(sp3_map_var);
  }
}
});
panel.add(choice);
panel.add(ui.Label({
   'value': 'Abbreviations',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '18px'}
}));
panel.add(ui.Label({
  'value': 'LTSGR = Long Term Stochastic Growth Rate',
  'style': {'backgroundColor': 'f9f9f9'}
}));
Map.add(panel);