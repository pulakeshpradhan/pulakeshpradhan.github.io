Map.setOptions('SATELLITE');
var circuit_list = ee.FeatureCollection('users/joaootavionf007/Circuit_list')
var Season = ['2020','2019','2018', '2017']
var Tracks_2017 ={'Australian Grand Prix' : 1,
              'Chinese Grand Prix' : 17,
              'Bahrain Grand Prix' : 5,  
              'Russian Grand Prix' : 19,  
              'Spanish Grand Prix' : 7,
              'Monaco Grand Prix' : 8,
              'Canadian Grand Prix' : 10,
              'Azerbaijani Grand Prix' : 6, 
              'Austrian Grand Prix' : 16,
              'British Grand Prix' : 18,
              'Hungarian Grand Prix' : 14,
              'Belgian Grand Prix' : 9,
              'Italian Grand Prix' : 4,
              'Singapore Grand Prix' : 15,
              'Malaysian Grand Prix' : 22,
              'Japanese Grand Prix' : 20,
              'United States Grand Prix' : 11,
              'Mexican Grand Prix' : 2,
              'Brazilian Grand Prix' : 3,
              'Abu Dhabi Grand Prix' : 21}  
var Tracks_2018 ={'Australian Grand Prix' : 1,	  
              'Bahrain Grand Prix' : 5,  
              'Chinese Grand Prix' : 17,
              'Azerbaijani Grand Prix' : 6,   
              'Spanish Grand Prix' : 7,
              'Monaco Grand Prix' : 8,
              'Canadian Grand Prix' : 10,
              'French Grand Prix' : 12,
              'Austrian Grand Prix' : 16,
              'British Grand Prix' : 18,
              'German Grand Prix' : 13,
              'Hungarian Grand Prix' : 14,
              'Belgian Grand Prix' : 9,
              'Italian Grand Prix' : 4,
              'Singapore Grand Prix' : 15,
              'Russian Grand Prix' : 19,
              'Japanese Grand Prix' : 20,
              'United States Grand Prix' : 11,
              'Mexican Grand Prix' : 2,
              'Brazilian Grand Prix' : 3,
              'Abu Dhabi Grand Prix' : 21}  
var Tracks_2019 ={'Australian Grand Prix' : 1,	  
              'Bahrain Grand Prix' : 5,  
              'Chinese Grand Prix' : 17,
              'Azerbaijani Grand Prix' : 6,   
              'Spanish Grand Prix' : 7,
              'Monaco Grand Prix' : 8,
              'Canadian Grand Prix' : 10,
              'French Grand Prix' : 12,
              'Austrian Grand Prix' : 16,
              'British Grand Prix' : 18,
              'German Grand Prix' : 13,
              'Hungarian Grand Prix' : 14,
              'Belgian Grand Prix' : 9,
              'Italian Grand Prix' : 4,
              'Singapore Grand Prix' : 15,
              'Russian Grand Prix' : 19,
              'Japanese Grand Prix' : 20,
              'Mexican Grand Prix' : 2,
              'United States Grand Prix' : 11,
              'Brazilian Grand Prix' : 3,
              'Abu Dhabi Grand Prix' : 21}  
var Tracks_2020 ={'Austrian Grand Prix' : 16,
                  'Styrian Grand Prix' : 16,
                  'Hungarian Grand Prix' : 14,
                  'British Grand Prix' : 18,
                  '70th Anniversary Grand Prix' : 18,
                  'Spanish Grand Prix' : 7,
                  'Belgian Grand Prix' : 9,
                  'Italian Grand Prix' : 4,
                  'Tuscan Grand Prix' : 24,
                  'Russian Grand Prix' : 19,
                  'Eifel Grand Prix' : 23,
                  'Portuguese Grand Prix' : 27,
                  'Emilia Romagna Grand Prix' : 25,
                  'Turkish Grand Prix' : 26,
                  'Bahrain Grand Prix' : 5, 
                  'Sakhir Grand Prix' : 28,
                  'Abu Dhabi Grand Prix' : 21}
var Tracks = Tracks_2020
var pnl_main = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '500px'}	});
var pnl_title = ui.Panel({layout: ui.Panel.Layout.flow('horizontal'),style: {width: '480', height: '250'}});
var pnl_Track = ui.Panel();
var logo_F1 = ee.Image('users/joaootavionf007/F1_track_logo').visualize({
    bands:  ['b3', 'b2', 'b1'],
    min: 0,
    max: 255
    });
var img_f1 = ui.Thumbnail({
    image: logo_F1,
    params: {
        dimensions: '1024x512',
        format: 'png'
        },
    style: {height: '230px', width: '450px',padding :'5px' , position: 'top-center'}
    });
var mapTitle = ui.Label('F1 Track Map Guide');	
mapTitle.style().set('color', 'Black');	
mapTitle.style().set('fontWeight', 'bold');	
mapTitle.style().set({fontSize: '32px',padding: '5px'});
var selectSeason = ui.Select({items: Season, value: Season[0],
                            onChange: function(){
                            var year_selected = selectSeason.getValue()  
                            pnl_Track.remove(selectTrack)
                            if (year_selected == 2020){
                              Tracks = Tracks_2020
                            }
                            else
                            if (year_selected == 2019){
                              Tracks = Tracks_2019
                              print('test')
                            }
                            else
                            if(year_selected == 2018){
                              Tracks = Tracks_2018
                            }
                            else
                            if(year_selected == 2017){
                              Tracks = Tracks_2017
                            }
                            selectTrack = ui.Select({items: Object.keys(Tracks), value: Object.keys(Tracks)[0], 
                                   onChange:  function(){
                                   getdata()
                                   },   
                                   style:{padding: '0px 0px 0px 0px', stretch: 'horizontal'}});
                            pnl_Track.add(selectTrack);
                            getdata()
                            }, style:{padding: '0px 0px 0px 0', stretch: 'horizontal'}	});	
var selectTrack = ui.Select({items: Object.keys(Tracks), value: Object.keys(Tracks)[14], 
                             onChange:  function(){
                             getdata()
                             },   
                             style:{padding: '0px 0px 0px 0px', stretch: 'horizontal'}});
var lbl_Slct_Season = ui.Label('Choose The F1 Season:');	
lbl_Slct_Season.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	}); 
var lbl_Slct_Track = ui.Label('Choose The GP:');	
lbl_Slct_Track.style().set({fontSize: '16px', fontWeight: 'bold',padding: '0px 0px'	}); 
pnl_title.add(img_f1);
pnl_main.add(pnl_title);
pnl_main.add(mapTitle);
pnl_main.add(lbl_Slct_Season);
pnl_main.add(selectSeason);
pnl_main.add(lbl_Slct_Track);
pnl_Track.add(selectTrack);
pnl_main.add(pnl_Track);
function getdata() {
Map.clear();
Map.setOptions('SATELLITE');  
var track_selected = selectTrack.getValue()
var tr = circuit_list.filter(ee.Filter.eq('ZID',Tracks[track_selected] ));
lblName.setValue('Name: ' + tr.first().get('Name').getInfo())
lblLenght.setValue('Length: ' + tr.first().get('Length').getInfo() + ' m')
lblCorners.setValue('N° of Turns: '+ tr.first().get('Corners').getInfo()); 
lblCity.setValue('City: ' + tr.first().get('City').getInfo());
lblCountry.setValue('Country: '+ tr.first().get('Country').getInfo()); 
var empty_tr = ee.Image().byte();
var tr_img = empty_tr.paint({
  featureCollection: tr,
  color: 1,
  width: 5
});
Map.addLayer(tr_img, {palette: 'black'}, track_selected);
Map.centerObject(tr)
var buffer = tr.geometry().buffer(5);
var dataset = ee.Image('JAXA/ALOS/AW3D30/V2_2');
var elevation = dataset.select('AVE_DSM').clip(buffer);
var boxcar = ee.Kernel.square({
  radius: 3, units: 'pixels', normalize: true
});
//var elevation = elevation.convolve(boxcar);
var min = ee.Number(elevation.reduceRegion({
reducer: ee.Reducer.min(),
geometry: buffer,
scale: 10,
maxPixels: 1e9
}).values().get(0));
elevation = elevation.subtract(min)
var max = ee.Number(elevation.reduceRegion({
reducer: ee.Reducer.max(),
geometry: buffer,
scale: 10,
maxPixels: 1e9
}).values().get(0));
var min_new = ee.Number(elevation.reduceRegion({
reducer: ee.Reducer.min(),
geometry: buffer,
scale: 10,
maxPixels: 1e9
}).values().get(0));
var elevationVis = {
  min: min_new.toInt().getInfo(),
  max: max.toInt().getInfo(),
  palette: ['yellow', 'orange' ,'red'],
};
Map.addLayer(elevation, elevationVis, 'Elevation');
function makeColorBarParams(palette) {
  return {bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette};
}
var colorBar = ui.Thumbnail({ image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(elevationVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'}
});
var legendLabels = ui.Panel({
    widgets: [
    ui.Label(elevationVis.min, {margin: '4px 8px'}),
    ui.Label((elevationVis.max / 2),{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(elevationVis.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Difference of elevation (m)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel); 
}
var lblName = ui.Label(); 
var lblLenght = ui.Label(); 
var lblCorners = ui.Label(); 
var lblCity = ui.Label();
var lblCountry = ui.Label();
getdata()
pnl_main.add(lblName);
pnl_main.add(lblLenght);
pnl_main.add(lblCorners);
pnl_main.add(lblCity);
pnl_main.add(lblCountry);
ui.root.insert(0, pnl_main);