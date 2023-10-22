/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry2 = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[116.22684931539692, 39.99922861345328],
          [116.30692934774555, 39.99922861345328],
          [116.3148257710854, 39.999162862556915],
          [116.38323282980122, 39.99922861345328],
          [116.40185808920063, 39.99922861345328],
          [116.45335650228657, 39.999162862556915],
          [116.47644495748676, 39.99929436428637],
          [116.52451014303364, 39.99903136057421],
          [116.55034518026508, 39.99929436428637],
          [116.58193087362446, 39.99942586576258],
          [116.60210108541645, 39.99936011505613],
          [116.61634897970356, 39.99942586576258],
          [116.620211360685, 39.999820368671735],
          [116.61978220724262, 40.00146410625993],
          [116.58716654562153, 40.002187338262935],
          [116.53326487325825, 40.00277906783999],
          [116.5048549153725, 40.003173551375596],
          [116.46803355001606, 40.003370792288685],
          [116.43644785665668, 40.00330504538096],
          [116.41378855489887, 40.00383101886994],
          [116.3902709462563, 40.00415975024286],
          [116.35705446981586, 40.0046199715058],
          [116.34108996175922, 40.00494869907992],
          [116.28875102626682, 40.0054089150245],
          [116.2584366559496, 40.00580338336493],
          [116.23406074042225, 40.00626359354795]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Map.centerObject(geometry, 3); 
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  height:'60px',
  position: 'top-center'
});
Map.add(panel);
function addLegend(palette, names) {
  var legend = ui.Panel({
    style: {
      padding: '10px 10px'
    }
  });
  var title = ui.Label({
    value: 'Land cover',
    style: {
      fontWeight: 'bold',
      color: "black",
      fontSize: '16px'
    }
  });
  legend.add(title);
  var addLegendLabel = function(color, name) {
      var showColor = ui.Label({
          style: {
            backgroundColor: color,
            padding: '8px',
            margin: '0 0 4px 0'
          }
      });
      var desc = ui.Label({
          value: name,
          style: {margin: '0 0 4px 8px'}
      });
      return ui.Panel({
          widgets: [showColor, desc],
          layout: ui.Panel.Layout.Flow('horizontal')
      });
  };
  for (var i = 0; i < palette.length; i++) {
    var label = addLegendLabel(palette[i], names[i]);
    legend.add(label);
  }
  ui.root.insert(1, legend)
}
var names1 = ["Cropland","Forest","Grassland","Shrub","Wetland",
             "Water","Tundra","ImperviousSurface","Bareland",'Snow&Ice'];
var palette1 = ['#F9E79F','#196F3D','#2ECC71',"#1E8449","#AED6F1","#642EFE","#0CD137","#C0392B","#F39C12",'#CFD0D0'];
addLegend(palette1, names1);
var year=["1992","1993","1994","1995","1996","1997","1998","1999","2000","2001","2002","2003","2004",
            "2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015",
            "2016","2017","2018","2019","2020"]
var my_result_1=ee.ImageCollection('projects/ee-lxy-open-synergy-maps/assets/final_open_synergy')/*1992-2000*/
var my_result_2=ee.ImageCollection('projects/ee-lxy-open-synergy-maps-2/assets/final_open_synergy_2')/*2001-2010*/
var my_result_3=ee.ImageCollection('projects/ee-lxy-open-synergy-maps-3/assets/final_open_synergy_3')/*2011-2020*/
var gub_90=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_1990')
var gub_95=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_1995')
var gub_00=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_2000')
var gub_05=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_2005')
var gub_10=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_2010')
var gub_15=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_2015')
var gub_18=ee.FeatureCollection('projects/ee-world-city/assets/GUB_Global_2018')
function getYear(name){
  Map.clear()
  Map.add(panel)
  //Map.centerObject(geometry, 3);
  for(var i=0;i<29;i++){
    if(name==year[i]){
      /*1992-2000*/
      if(i>-1 && i<9){
       var yearImg = my_result_1.filter(ee.Filter.stringContains('system:index',name)).mosaic()
       //mountain shadows wrong classified as water, use jrc as water and esa cci for unmatched 
       var jrc=ee.Image('JRC/GSW1_3/YearlyHistory/'+name).gte(3)
       var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+name).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
        [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
       yearImg=yearImg.where(yearImg.eq(6),esa_year).where(jrc.eq(1),6)
      }
      /*2001-2010*/
      if(i>8 && i<19){
       var yearImg = my_result_2.filter(ee.Filter.stringContains('system:index',name)).mosaic()
       //mountain shadows wrong classified as water, use jrc as water and esa cci for unmatched 
       var jrc=ee.Image('JRC/GSW1_3/YearlyHistory/'+name).gte(3)
       var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+name).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
        [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
       yearImg=yearImg.where(yearImg.eq(6),esa_year).where(jrc.eq(1),6)
      }
      /*2011-2020*/
      if(i>18 && i<29){
        if(i==25){//17_beijing some wrong areas using 16 and 18 results to fix
          var yearImg = my_result_3.filter(ee.Filter.stringContains('system:index',name)).mosaic()
          var yearImg_16 = my_result_3.filter(ee.Filter.stringContains('system:index',(1992+i-1).toString())).mosaic()
          var yearImg_18 = my_result_3.filter(ee.Filter.stringContains('system:index',(1992+i+1).toString())).mosaic()
          var wrong_area_change_16_18=yearImg_16.clip(geometry2).subtract(yearImg_18.clip(geometry2))
          var yearImg=yearImg.where(wrong_area_change_16_18.eq(0),yearImg_16)
          //mountain shadows wrong classified as water, use jrc as water and esa cci for unmatched 
          var jrc=ee.Image('JRC/GSW1_3/YearlyHistory/'+name).gte(3)
          var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+name).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
          yearImg=yearImg.where(yearImg.eq(6),esa_year).where(jrc.eq(1),6)
        }
        else{
          var yearImg = my_result_3.filter(ee.Filter.stringContains('system:index',name)).mosaic()
          var jrc=ee.Image('JRC/GSW1_3/YearlyHistory/'+name).gte(3)
          if(i!=28){
            var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+name).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
          }
          else{
            var esa_year = ee.Image('projects/ee-annualsecond-landcover/assets/esa2020').remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
          }
          yearImg=yearImg.where(yearImg.eq(6),esa_year).where(jrc.eq(1),6)
        }
        //mountain shadows wrong classified as urban, change all urban into cropland and use gaia to be our urban 
        if(i>23){
          var j=i
          if(i>25){
            j=26
          }
          var urban = ee.Image("Tsinghua/FROM-GLC/GAIA/v10").gte(2019-1992-i)
          yearImg=yearImg.where(yearImg.eq(8),1).where(urban,8)
        }
      }
      if(i<2){
        //92 93 using gub_90
        var gub_90_g=gub_90.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_90_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>1&&i<7){
        //94-98 using gub_95
        var gub_95_g=gub_95.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_95_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>6&&i<12){
        //99-03 using gub_00
        var gub_00_g=gub_00.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_00_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>11&&i<17){
        //04-08 using gub_05
        var gub_05_g=gub_05.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_05_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>16&&i<22){
        //09-13 using gub_10
        var gub_10_g=gub_10.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_10_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>21&&i<25){
        //14-16 using gub_15
        var gub_15_g=gub_15.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_15_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      if(i>24){
        //17-20 using gub_18
        var gub_18_g=gub_18.map(function (feature){
          return feature.geometry();
        });
        var city_cropland=yearImg.clip(gub_18_g)
        yearImg=yearImg.where(city_cropland.eq(1),3)
      }
      /*
      if(i==27){
      var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+name).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
      var esa_2020_10=ee.ImageCollection("ESA/WorldCover/v100").mosaic()
      esa_2020_10=esa_2020_10.remap([10,20,30,40,50,60,70,80,90,95,100],[2,4,3,1,8,9,10,6,5,5,7])
      yearImg=yearImg.where((esa_2020_10.eq(8)).and(esa_year.eq(8)),8)
      }
      */
      for (var j=0;j<28;j++){
        if(i>=j){
          var esa_year = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+year[j]).remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
          var esa_2020_10=ee.ImageCollection("ESA/WorldCover/v100").mosaic()
          esa_2020_10=esa_2020_10.remap([10,20,30,40,50,60,70,80,90,95,100],[2,4,3,1,8,9,10,6,5,5,7])
          yearImg=yearImg.where((esa_2020_10.eq(8)).and(esa_year.eq(8)),8)
        }
      }
      if(i==28){
        var esa_2019 = ee.Image("users/zhaojiyao15/ESACCI/ESACCI"+"2019").remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
        var esa_2020 = ee.Image('projects/ee-annualsecond-landcover/assets/esa2020').remap([10,11,12,20,30,40,50,60,61,62,70,71,72,80,81,82,90,100,110,120,121,122,130,140,150,151,152,153,160,170,180,190,200,201,202,210,220],
            [1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,3,4,4,4,3,7,9,9,9,9,2,2,5,8,9,9,9,6,10])
        var esa_2020_10=ee.ImageCollection("ESA/WorldCover/v100").mosaic()
        esa_2020_10=esa_2020_10.remap([10,20,30,40,50,60,70,80,90,95,100],[2,4,3,1,8,9,10,6,5,5,7])
        yearImg=yearImg.where((esa_2020_10.eq(8)).and(esa_2019.eq(8)),8)
        yearImg=yearImg.where((esa_2020_10.eq(8)).and(esa_2020.eq(8)),8)
      }
    }  
  }
  yearImg=yearImg.unmask(6)
  Map.addLayer(yearImg,{min:1,max:10,palette: palette1},name)
}
var select=ui.Select({
  items:year,
  style: {width: '370px'},
  onChange:getYear
})
// Set a place holder.
select.setPlaceholder('Choose a year...');
panel.add(select)