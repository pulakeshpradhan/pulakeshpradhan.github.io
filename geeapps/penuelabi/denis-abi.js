var SSudan = ee.FeatureCollection('users/penuelabi/ss_payams1');
Map.centerObject(SSudan, 7)
var Auth = '             Presented by Denis Abi, as Masters in the Application of Remote Sensing in Geology [Univeristy of Juba  (South Sudan)]'
var lab = ui.Label(Auth, {fontWeight: 'bold', fontSize: '28px', width: '800px'});
Map.add(lab)
var Congo = "https://penuelabi.users.earthengine.app/view/congo-remote-sensing-geology"
var Ethiopia = "https://penuelabi.users.earthengine.app/view/ethiopia-remote-sensing-geology"
var South = "https://penuelabi.users.earthengine.app/view/south-sudan-remote-sensing-geology"
var Sudan = "https://penuelabi.users.earthengine.app/view/sudan-remote-sensing-geology"
var Sudan_Flood= "https://penuelabi.users.earthengine.app/view/south-sudan-floods-extent"
//var SDN= require('users/penuelabi/Boma_Reseach:SDN');
//var SSD= require('users/penuelabi/Boma_Reseach:South_Sudan_Geology'); 
  var PT = ui.Select({
  placeholder:'Select Country',
  items: [
    {label: 'Congo', value: Congo}, 
    {label: 'Ethiopia', value: Ethiopia },
    //{label: 'SDN', value: SDN },
    //{label: 'SSD', value: SDN },
    {label: 'South Sudan', value: South },
    {label: 'Sudan', value: Sudan },
    {label: 'South Sudan Floods', value: Sudan_Flood }
  ],
   onChange: function(value) {
     var Country = (PT.getValue());
    // ui.root.clear();
   //  ui.root.add(Country)
Map.clear();
  var label = new ui.Label({ 
    value : "CLICK     ON     COUNTRY       LINK" , 
    targetUrl : "http://www.waitabit.org.no",
   // width: '200px'
  });
label.setUrl( Country )
Map.add(PT), Map.add(label);
  }
});
Map.add(PT)