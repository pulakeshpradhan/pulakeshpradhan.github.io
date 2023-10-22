var ic = ee.ImageCollection("users/yangjie/IM/annuallyImgCount");
var palette = ['#4696b6','#61a9b1','#7cbcac','#97cfa8','#b0dfa6','#c1e6ab','#d3eeb1','#e5f5b7','#f7fcbc','#fff7b5','#ffe6a1','#fed58e','#fec47a','#feb266','#f79756','#ef7747','#e75839','#df382a','#d7191c']
Map.addLayer(ee.Image('users/yangjie/IM/ImgCount/MSSObservation1972_1978_cloudWeighted'),{max:50,min:10,palette:palette},'1972')
Map.addLayer(ee.Image('users/yangjie/IM/ImgCount/MSSObservation1978_1984_cloudWeighted'),{max:50,min:10,palette:palette},'1978')
var year = [1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]
for(var i =0;i<year.length;i++){
  Map.addLayer(ee.Image('users/yangjie/IM/annuallyImgCount/'+year[i]),{max:50,min:10,palette:palette},String(year[i]))
}