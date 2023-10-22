var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                120.7236948535391,
                33.594750918070815
              ],
              [
                120.87717944725777,
                33.263294285479596
              ],
              [
                120.97592465481594,
                32.92258567127686
              ],
              [
                120.97442945373037,
                32.80350051210727
              ],
              [
                120.96470951186942,
                32.68441510278975
              ],
              [
                120.98181753750458,
                32.61593256221592
              ],
              [
                121.0534785274341,
                32.59948437659311
              ],
              [
                121.11675361034465,
                32.57447953465874
              ],
              [
                121.12022247865492,
                32.551839591146255
              ],
              [
                121.1549210584772,
                32.5286167169788
              ],
              [
                121.22119631974806,
                32.48704682539174
              ],
              [
                121.26960047448098,
                32.471309110074664
              ],
              [
                121.32469464844637,
                32.455904689341544
              ],
              [
                121.32794638822291,
                32.451207908499754
              ],
              [
                121.32699830464473,
                32.450551015149856
              ],
              [
                121.37539314286103,
                32.51938253949377
              ],
              [
                121.39824305329992,
                32.554362724263925
              ],
              [
                121.43621151850444,
                32.55576425903296
              ],
              [
                121.43672616434019,
                32.51620508436263
              ],
              [
                121.40703886823302,
                32.496323629423735
              ],
              [
                121.34424651524556,
                32.446134820542156
              ],
              [
                121.34399396659997,
                32.4452026496811
              ],
              [
                121.3430734561542,
                32.444856682136844
              ],
              [
                121.46527682086595,
                32.392667354987104
              ],
              [
                121.58383806660763,
                32.23230588724018
              ],
              [
                121.78113574297195,
                32.23985558541248
              ],
              [
                121.94684678795157,
                32.25456675444097
              ],
              [
                122.05213320983019,
                32.2677270439717
              ],
              [
                122.20218619956366,
                32.3250980958491
              ],
              [
                122.2947519574263,
                32.36134978787544
              ],
              [
                122.352430899703,
                32.40232933871233
              ],
              [
                122.40003838379889,
                32.45410762305328
              ],
              [
                122.22150997172511,
                32.834936262891475
              ],
              [
                121.92272545685104,
                33.251421940588735
              ],
              [
                121.70972884608753,
                33.56622411993984
              ],
              [
                121.60901849832273,
                33.76116590577654
              ],
              [
                121.50373033626366,
                33.86993954498812
              ],
              [
                121.47443094843432,
                33.88970046335001
              ],
              [
                120.71270724736742,
                33.592351572949276
              ],
              [
                120.70996112157638,
                33.59387639821264
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[120.7236948535391, 33.594750918070815],
          [120.87717944725777, 33.263294285479596],
          [120.97592465481594, 32.92258567127686],
          [120.97442945373037, 32.80350051210727],
          [120.96470951186942, 32.68441510278975],
          [120.98181753750458, 32.61593256221592],
          [121.0534785274341, 32.59948437659311],
          [121.11675361034465, 32.57447953465874],
          [121.12022247865492, 32.551839591146255],
          [121.1549210584772, 32.5286167169788],
          [121.22119631974806, 32.48704682539174],
          [121.26960047448098, 32.471309110074664],
          [121.32469464844637, 32.455904689341544],
          [121.32794638822291, 32.451207908499754],
          [121.32699830464473, 32.450551015149856],
          [121.37539314286103, 32.51938253949377],
          [121.39824305329992, 32.554362724263925],
          [121.43621151850444, 32.55576425903296],
          [121.43672616434019, 32.51620508436263],
          [121.40703886823302, 32.496323629423735],
          [121.34424651524556, 32.446134820542156],
          [121.34399396659997, 32.4452026496811],
          [121.3430734561542, 32.444856682136844],
          [121.46527682086595, 32.392667354987104],
          [121.58383806660763, 32.23230588724018],
          [121.78113574297195, 32.23985558541248],
          [121.94684678795157, 32.25456675444097],
          [122.05213320983019, 32.2677270439717],
          [122.20218619956366, 32.3250980958491],
          [122.2947519574263, 32.36134978787544],
          [122.352430899703, 32.40232933871233],
          [122.40003838379889, 32.45410762305328],
          [122.22150997172511, 32.834936262891475],
          [121.92272545685104, 33.251421940588735],
          [121.70972884608753, 33.56622411993984],
          [121.60901849832273, 33.76116590577654],
          [121.50373033626366, 33.86993954498812],
          [121.47443094843432, 33.88970046335001],
          [120.71270724736742, 33.592351572949276],
          [120.70996112157638, 33.59387639821264]]]),
    train_label = ui.import && ui.import("train_label", "table", {
      "id": "users/MarsXu/Rudong_Feature"
    }) || ee.FeatureCollection("users/MarsXu/Rudong_Feature"),
    train_image = ui.import && ui.import("train_image", "image", {
      "id": "users/MarsXu/exampleExport"
    }) || ee.Image("users/MarsXu/exampleExport");
var year_start=2015, year_end=2022;
var i=0,data=[];
for(var year=year_start;year<year_end;year++)
{
   var y=year.toString();
   print('SAR Data '+y);
   data[i]=ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.eq('instrumentMode', 'IW')) 
      .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')) 
      .filter(ee.Filter.eq('transmitterReceiverPolarisation',['VV', 'VH']))
      .filterMetadata('resolution_meters', 'equals' , 10)
      .filterDate(y+'-01-1', y+'-12-31')
      .filterBounds(roi).mean().clip(roi);
   i     =i+1;
}
// Import SAR data processing module
var method = require('users/MarsXu/CodeofRS:dataProcessing/methods');
// Display SAR data
Map.centerObject(roi, 11);
/*
i=0;
for(var year=year_start;year<year_end;year++){
   var y=year.toString();
   Map.addLayer(data[i].select('VV'), {min:-15,max:0}, y+'_VV', 0);
   Map.addLayer(data[i].select('VH'), {min:-27,max:0}, y+'_VH', 0);
   i=i+1;
}
*/
//Apply Refined Lee filter to reduce speckle
var data_filtered=[];
for(i=0;i<data.length;i++)
{
 data_filtered[i] = ee.Image.cat([
      method.toDB(
        method.refinedLee(
          method.toNatural(data[i].select('VV'))
        )
      ),
      method.toDB(
        method.refinedLee(
          method.toNatural(data[i].select('VH'))
          )
        )
    ]).rename(['VV', 'VH']);
  //print(data_filtered[i],'filtered');  
}
i=0;
for(var year=year_start;year<year_end;year++){
   var y=year.toString();
   Map.addLayer(data_filtered[i].select('VV'), {min:-15,max:0}, y+'filtered_VV', 0);
  // Map.addLayer(data_filtered[i].select('VH'), {min:-27,max:0}, y+'filtered_VH', 0);
   i=i+1;
}
var Pol_data=[];
i=0;
for(var year=year_start;year<year_end;year++){
  Pol_data[i]=ee.Image.cat(data_filtered[i].select('VV'),data_filtered[i].select('VH'));
  i=i+1;
}
//define the sar bands to train you data
var bands=['VH','VV'];
var training= train_image.select(bands).sampleRegions({
    collection:train_label,
    properties:['landcover'],
    scale:30,
  });
//train the classifier
var classifier=ee.Classifier.smileRandomForest(2).train({
    features:training,
    classProperty:'landcover',
    inputProperties:bands
  });
//Run the classifier
var classified=[];
var class_augmented =[];
i=0;
for(var year=year_start;year<year_end;year++){
  classified[i]= Pol_data[i].select(bands).classify(classifier);
  class_augmented[i]= classified[i].spectralDilation('sed', ee.Kernel.circle(120,'meters'), true); //dilation
var palette= ['FFFFFF', '0000ff', 'ff0000'];
var dif_Vispar = {
  min: 0,
  max:2,
  palette:palette,
};
  //Map.addLayer(classified[i].eq(2).selfMask(),{palette:'FF0000'},year+'classified',0); 
  Map.addLayer( class_augmented[i],dif_Vispar,year+'Augmented classification',0);
  i=i+1;
}