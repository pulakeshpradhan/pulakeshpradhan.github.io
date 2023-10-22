var built_up = ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"),
    population = ee.ImageCollection("JRC/GHSL/P2016/POP_GPW_GLOBE_V1"),
    gsw = ee.ImageCollection("JRC/GSW1_1/YearlyHistory"),
    district = ee.FeatureCollection("users/saurabh/district_map"),
    andhra_pradesh = ee.FeatureCollection("users/saurabh/andhra_pradesh");
////////////////////////Set Map as India after Starting
Map.setCenter(78.9629, 20.5937, 4.3);
//////////////////////////Dictionary Conversion Tool
var tools = require('users/fitoprincipe/geetools:tools');
////////////////////////FUNCTIONS//////////////////////////////////////
//////////////////////////Dictionary of States
var state_dict = tools.featureCollection.toDictionary(district, {idField:'STATE_NAME'} ).getInfo();
/////////////Function of Center Object of State
var centerobject = function(state){
  var object = district.filter(ee.Filter.eq('STATE_NAME', state));
  Map.centerObject(object);
};
/////////////Function of Center Object of District
var centerobject_1 = function(district0){
  var object = district.filter(ee.Filter.eq('dname', district0));
  Map.centerObject(object);
  return object;
};
//////////////////Function for Dictionary of District 
var district_fun = function(state){
  //Separate the value from FeatureCollection
  var district_data = district.filter(ee.Filter.eq('STATE_NAME', state));
  var district_dict = tools.featureCollection.toDictionary(district_data, {idField:'dname'} ).getInfo();
  return district_dict;
};
////// Function for State Data to Retrieve District
var state_data = function(state){
  var s_data = tools.featureCollection.toDictionary(district, {idField:'STATE_NAME'} ).getInfo();
  return s_data;
};
/////////////////////////////////////////////////////////////////////
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Layer Result'));
// Add the panel to the default map.
Map.add(inspector);
////////////////////////////////////////////////////////////////////////
////////////////////////// VARIABLES///////////////////////////////////
var district_dict = null;
var boolean = true;
var start_year_var, end_year_var = null;
////////////////////////////////////////////////////////////////////////////
//////////////////Function for Selecting the District by Dictionary in selected State
var dict_key = null; 
var geometry = null;
var x = function(district_dict)
{
  var select_district = ui.Select({
    placeholder: 'Select District',
    items: Object.keys(district_dict),
    onChange: function(key){
      var dict_key = centerobject_1(key);
      geometry = dict_key;
    }
  });
  select_district.style().set({
    position: 'top-right',
    color: 'blue',
    fontSize: '30',
    fontFamily: 'monospace',
    stretch: 'horizontal',
  });
  dd_panel.widgets().set(0, select_district);
};
/*
/////////////Function of Center Object of State
var centerobject_state = function(state){
  var object = district.filter(ee.Filter.eq('NAME_1', state));
  Map.centerObject(object);
  return object;
};
*/
//Built_up band for density
var builtUp = built_up.select('built');
//Masking the data for individual Layers in Builtup
var mask1975 = builtUp.eq(6);
var mask1990 = builtUp.eq(5).add(builtUp.eq(6));
var mask2000 = builtUp.eq(4).add(builtUp.eq(5)).add(builtUp.eq(6));
var mask2015 = builtUp.eq(3).add(builtUp.eq(4)).add(builtUp.eq(5)).add(builtUp.eq(6));
//////Function of the Built_Up chart
function builtup_chart(state, sy, ey){
  //ReduceRegion
  var a = mask1975.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: state,
    scale: 38,
    maxPixels: 1e9
  });
  var b = mask1990.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: state,
    scale: 38,
    maxPixels: 1e9
  });
  var c = mask2000.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: state,
    scale: 38,
    maxPixels: 1e9
  });
  var d = mask2015.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: state,
    scale: 38,
    maxPixels: 1e9
  });
  //Convert the Updated masked variable into Array 
  var mArray = [a.values(), b.values(), c.values(), d.values()];
  var newArray = [];
  for(var i =s; i<=e; i++)
  {
    newArray.push(mArray[i]);
  }
  var fArray = ee.Array(newArray);
  //Formula for convert sq Km  = (pixels)*((resolution^2)/1000*1000)
//Here Resolution = 38metre, data = masked___ , pixels = 255(max_value)
  var maskedArray = fArray.multiply(0.001444);
  //Array of Years
  var year = ['1975','1990','2000','2015'];
  var newYear = [];
  for(i =s; i<=e; i++)
  {
    newYear.push(year[i]);
  }
  //Variable for Built Chart
  var built_chart = ui.Chart.array.values(maskedArray, 0, newYear)
    .setSeriesNames(['BuiltUp'])
    .setChartType('LineChart')
    .setOptions({
      title: 'BuiltUp Chart for the change in BuiltUp in Years',
      hAxis: {'title': 'Years'},
      vAxis: {'title': 'BuiltUp in District in Sq. KM Area)'},
      lineWidth: 1,
      pointSize: 4,
      pointShape: 'circle',
      width: '500px',
      series: {0: {color : 'FF0000'}
  }});
  return built_chart;
}
//Function for addLayer of Built_Up
function addLayer_builtup(start_year, end_year, state){
  Map.clear();
  ///////////////////////////////Vis_Params////////////////
  var builtUp1975 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'FFA07A'],
  };
  var builtUp1975_1990 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'F08080', 'FFA07A'],
  };
   var builtUp1975_2000 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FA0000', 'F08080', 'FFA07A'],
    };
    var builtUp1990 = {
         min: 1.0,
         max: 6.0,
         palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FFFFFF', 'F08080', 'FFFFFF'],
    };
    var builtUp1990_2000 = {
          min: 1.0,
          max: 6.0,
          palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FA0000', 'FFFFFF', 'FFFFFF'],
    };
    var builtUp1990_2015 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', '8B0000', 'FA0000', 'FFFFFF', 'FFFFFF'],
    };
    var builtUp2000 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', 'FFFFFF', 'FA0000', 'FFFFFF', 'FFFFFF'],
    };
    var builtUp2000_2015 = {
        min: 1.0,
        max: 6.0,
        palette: ['0c1d60', 'FFFFFF', '8B0000', 'FFFFFF', 'FFFFFF', 'FFFFFF'],
    };
  //Parameters for the BuiltUp
  if(start_year==1975 && end_year == 1975){
    Map.addLayer(builtUp.clip(state), builtUp1975, 'Built-Up till 1975');
  }
  else if(start_year==1975 && end_year == 1990){
    Map.addLayer(builtUp.clip(state), builtUp1975, 'Built-Up 1975');
    Map.addLayer(builtUp.clip(state), builtUp1975_1990, 'Built-Up 1990');
  }
  else if(start_year==1975 && end_year == 2000){
    Map.addLayer(builtUp.clip(state), builtUp1975, 'Built-Up 1975');
    Map.addLayer(builtUp.clip(state), builtUp1975_1990, 'Built-Up 1990');
    Map.addLayer(builtUp.clip(state), builtUp1975_2000, 'Built-Up 2000');
  }
  else if(start_year==1975 && end_year == 2015){
    var builtUp1975_2015 = {
      min: 1.0,
      max: 6.0,
      palette: ['0c1d60', 'FFFFFF', '8B0000', 'FA0000', 'F08080', 'FFA07A'],
    };
    Map.addLayer(builtUp.clip(state), builtUp1975, 'Built-Up 1975');
    Map.addLayer(builtUp.clip(state), builtUp1975_1990, 'Built-Up 1990');
    Map.addLayer(builtUp.clip(state), builtUp1975_2000, 'Built-Up 2000');
    Map.addLayer(builtUp.clip(state), builtUp1975_2015, 'Built-Up 2015');
  }
  else if(start_year==1990 && end_year == 1990){
    Map.addLayer(builtUp.clip(state), builtUp1990, 'Built-Up 1990');
  }
  else if(start_year==1990 && end_year == 2000){
    Map.addLayer(builtUp.clip(state), builtUp1990, 'Built-Up 1990');
    Map.addLayer(builtUp.clip(state), builtUp1990_2000, 'Built-Up 2000');
  }
  else if(start_year==1990 && end_year == 2015){
    Map.addLayer(builtUp.clip(state), builtUp1990, 'Built-Up 1990');
    Map.addLayer(builtUp.clip(state), builtUp1990_2000, 'Built-Up 2000');
    Map.addLayer(builtUp.clip(state), builtUp1990_2015, 'Built-Up 2015');
  }
  else if(start_year==2000 && end_year == 2000){
    Map.addLayer(builtUp.clip(state), builtUp2000, 'Built-Up 2000');
  }
  else if(start_year==2000 && end_year == 2000){
    Map.addLayer(builtUp.clip(state), builtUp2000, 'Built-Up 2000');
    Map.addLayer(builtUp.clip(state), builtUp2000_2015, 'Built-Up 2015');
  } 
  else{
     Map.addLayer(builtUp.clip(state), builtUp2000_2015, 'Built-Up 2015');
  }
}
//Parameter for Population Density
var populationCountVis = {
  min: 0.0,
  max: 200.0,
  palette: ['060606', '337663', '337663', 'ffffff'],
};
//function for Population Year and State
function addLayer(year, dist){
  Map.addLayer(year.clip(dist), populationCountVis, 'Population Count');
}
var color = function(){
  ////////////////////////////////////////////////////////////////
////////////////////Panel for Color used in Built_Up
  //Panel for Label of colors
  var label_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-left',
      width: '220px',
      height: '170px',
      backgroundColor: 'FFF8DC'
    }
  });
  Map.add(label_panel);
  // Create legend title
  var Title = ui.Label({
      value: 'Legend : Built-up',
      style: {
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '0 0 4px 0',
          padding: '0',
          color: 'red'
      }
  });
  // Add the title to the panel
  label_panel.add(Title);
  // Creates and styles 1 row of the legend.
  var makeRow = function (color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
          style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '8px',
              margin: '0 0 4px 0'
          }
      });
    // Create the label filled with the description text.
    var description = ui.Label({
        value: name,
        style: { margin: '0 0 4px 6px' }
    });
    // return the panel
    return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  //  Palette with the colors
  var pallete = ['FFFFFF','0c1d60', '8B0000', 'FA0000', 'F08080', 'FFA07A'];
  // name of the legend
  var names = [ 'Non-builtup','Water bodies', 'Built-up from 2000 to 2014','Built-up from 1990 to 2000', 'Built-up from 1975 to 1990', 'Built-up upto 1975'];
  // Add color and and names
  for (var i = pallete.length; i > 0; i--) {
      label_panel.add(makeRow(pallete[i - 1], names[i - 1]));
  }
  ////////////////////////End of Color Label
};
var color_population = function(){
  ////////////////////////////////////////////////////////////////
////////////////////Panel for Color used in Population
  //Panel for Label of colors
  var label_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'top-left',
      width: '240px',
      height: '130px',
      backgroundColor: 'FFF8DC'
    }
  });
  Map.add(label_panel);
  // Create legend title
  var Title = ui.Label({
      value: 'Legend : Population',
      style: {
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '0 0 4px 0',
          padding: '0',
          color: 'red'
      }
  });
  // Add the title to the panel
  label_panel.add(Title);
  // Creates and styles 1 row of the legend.
  var makeRow = function (color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
          style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '8px',
              margin: '0 0 4px 0'
          }
      });
    // Create the label filled with the description text.
    var description = ui.Label({
        value: name,
        style: { margin: '0 0 4px 6px' }
    });
    // return the panel
    return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  //  Palette with the colors
  var pallete = ['060606', '337663', 'ffffff'];
  // name of the legend
  var names = ['No Population', 'No Data','Population(0 to 1.34419e+06)'];
  // Add color and and names
  for (var i = pallete.length; i > 0; i--) {
      label_panel.add(makeRow(pallete[i - 1], names[i - 1]));
  }
  ////////////////////////End of Color Label
};
//Variable for storing Start Year
var start_year = null;
var year_start = null;
//Variable for storing End Year
var end_year = null;
var year_end = null;
//Variable for Population Chart
var chart = null;
//Variable for duration
var s = null;
var e = null;
////////////////////////////////
//Function for addLayer and chart for population
var return_addLayer = function(sy,ey,dist)
{
 var layer = population.filter(ee.Filter.calendarRange(sy,ey,'year') );
 ///////////////////////////////////////
   inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
 /////////////////////////////////////////
 var i = 0;
 var s = ['1975','1990','2000','2015'];
 //Function for addlayer
  function addImage(image) { // display each image in collection
      var id = image.id;
      var Layer_image = ee.Image(image.id);
      Map.addLayer(Layer_image.clip(dist), populationCountVis, 'PopulationCount'+s[i]);
      var layers = Map.layers();
      layers.forEach(function(lay) {
        inspector.clear();
        var lay_name = lay.getName();
      // Add a label with the results from the server.
        inspector.add(ui.Label({
        value: lay_name,
        style: {stretch: 'vertical'}
      }));
      });
      i=i+1;
    }
      layer.evaluate(function(layer) {  // use map on client-side
      layer.features.map(addImage);
  });
/////////////////////////
/////////////////////////
  // Population function:
  var populationfunction = function(image){
  //get pixels above the threshold
    var population_a = image.select('population_count');
    var population_area = population_a.rename('population_Count');
    image = image.addBands(population_area);
    var stats = population_area.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: dist, 
      scale :250,
      maxPixels: 1e9
    });
    return image.set(stats);
  };
  var collection = layer.map(populationfunction);
  var chart = ui.Chart.image.series({
    imageCollection: collection.select('population_Count'), 
    region: dist, 
    reducer: ee.Reducer.sum(),
    scale : 250
  })
  .setChartType('LineChart')
  .setOptions({
          title: 'Population Count in state',
          vAxis: {title: 'Population in District '},
          hAxis: {title: 'YEARS'},
          color: '00FF00',
          crosshair: { opacity: 0.0 },          
          pointSize: 10,
          pointShape: 'circle',
        });
  population_chart_panel.widgets().set(0,chart);
};
//////////////////////////////////
// CREATE UI
/////////////////////////////////
//Label for GHSL
var ghsl_label = ui.Label("Human Settlement in India");
ghsl_label.style().set({
  color: '9633FF',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
  fontWeight: 'bold'
});
//Label for Select State
var sd_label = ui.Label({
  value: 'Select State And District for Analysis',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    padding : '0',
    color : 'black'
  }
});
//Selecting the States by Dictionary in Given Data
var select_state = ui.Select({
  placeholder: 'Select State',
  items: Object.keys(state_dict),
  onChange: function(key) {
    centerobject(key);
    var district_dict = district_fun(key);
    boolean = false;
    x(district_dict,boolean);
  }
});
select_state.style().set({
  position: 'top-right',
  color: 'blue',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
});
///////////////////Selecting the District by Dictionary in selected State(Disable)
  var select_district = ui.Select({
    placeholder: 'Select District',
    disabled: true,
    onChange: function(key){
      centerobject_1(key);
    }
  });
  select_district.style().set({
    position: 'top-right',
    color: 'blue',
    fontSize: '30',
    fontFamily: 'monospace',
    stretch: 'horizontal',
  });
//Label for Built-Up Areas
var label_builtUp = ui.Label("Built-Up: ");
label_builtUp.style().set({
  color: 'red',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
  fontWeight: 'bold'
});
//Dictionary for Selecting Year
var year_built = {
  '1975': 1975,
  '1990': 1990,
  '2000': 2000,
  '2015': 2015
};
//Panel for Built_Up Chart
var builtUp_chart_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
        width: '480px',
        height: '220px',
        border: '1px solid black',
       // shown: false
  }
});
//Selecting the Start Year for BuilltUp
var built_start = ui.Select({
  placeholder: 'Start Year',
  items: Object.keys(year_built),
  style: {
    stretch: 'horizontal'
  },
  onChange: function(key) {
    year_start = year_built[key];
    if(key == '1975')
      s =0;
    else if(key == '1990')
      s =1;
    else if(key == '2000')
      s =2;
    else
      s =3;
  }
});
//Selecting the End Year for BuiltUp
var built_end = ui.Select({
  placeholder: 'End Year',
  items: Object.keys(year_built),
   style: {
    stretch: 'horizontal'
  },
  onChange: function(key) {
    year_end = year_built[key];
    if(key == '1975')
      e =0;
    else if(key == '1990')
      e =1;
    else if(key == '2000')
      e =2;
    else
      e =3;
  }
});
//Button for Adding Data for BuiltUp
var builtup_button = ui.Button('Get Data');
builtup_button.style().set({
  color: 'green',
  stretch: 'horizontal'
});
builtup_button.onClick(function(){
  addLayer_builtup(year_start, year_end, geometry);
  builtUp_chart_panel.widgets().set(0,builtup_chart(geometry,s,e));
  color();
});
//Panel for Select Years
var builtup_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '480px',
        border: '1px solid black',
        stretch: 'horizontal'
    }
});
builtup_panel.widgets().set(0, built_start);
builtup_panel.widgets().set(1, built_end);
builtup_panel.widgets().set(2, builtup_button);
//builtup_panel.widgets().set(builtup_chart);
//Button for reset the Map
builtup_panel.widgets().set(3,
    ui.Button({
        label: 'Clear',
        style: { color: 'red',
                  stretch: 'horizontal'},
        onClick: function () {
            Map.clear();
            builtUp_chart_panel.clear();
        }
    })
);
//Panel for Population Chart
var population_chart_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
        width: '480px',
        height: '220px',
        border: '1px solid black',
       // shown: false
  }
});
//Label for Population Areas
var label_population = ui.Label("Population: ");
label_population.style().set({
  color: 'red',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
  fontWeight: 'bold'
});
//Selecting the Start Year for Population
var population_start = ui.Select({
  placeholder: 'Start Year',
  items: Object.keys(year_built),
   style: {
    stretch: 'horizontal'
  },
  onChange: function(key) {
    start_year= year_built[key];
    }
});
//Selecting the Start Year for Population
var population_end = ui.Select({
  placeholder: 'End Year',
   style: {
    stretch: 'horizontal'
  },
  items: Object.keys(year_built),
  onChange: function(key) {
    end_year = year_built[key];
  }
});
//Button for Adding Data for BuiltUp
var population_button = ui.Button('Get Data');
population_button.style().set({
  color: 'green',
  stretch: 'horizontal'
});
population_button.onClick(function(){
  return_addLayer(start_year, end_year, geometry);
  color_population();
});
//Panel for Population 
var population_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '480px',
        border: '1px solid black'
    }
});
population_panel.widgets().set(0, population_start);
population_panel.widgets().set(1, population_end);
population_panel.widgets().set(2, population_button);
//Button for reset the Map
population_panel.widgets().set(3,
    ui.Button({
        label: 'Clear',
        style: {color: 'red',
                stretch: 'horizontal'},
        onClick: function () {
            Map.clear();
            population_chart_panel.clear();
        }
    })
);
////////////////////////////////////////////////////////////////////////
//Panel for Select States
var sd_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '240px',
        border: '1px solid black',
        stretch: 'horizontal'
    }
});
//Panel for Select District
var dd_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '240px',
        border: '1px solid black',
        stretch: 'horizontal'
    }
});
//SplitPanel for Select States and Districts
var split_panel = ui.SplitPanel({
    firstPanel: sd_panel,
    secondPanel: dd_panel,
    style: {
        width: '480px',
        height: '50px',
        stretch: 'horizontal'
    }
});
///////////////////////////////////////////////////////////////////////
//Panel for Showing the States and Buttons
var ghsl_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-right',
        width: '500px',
        height: '690px'
    }
});
ghsl_panel.add(ghsl_label);
ghsl_panel.add(sd_label);
ghsl_panel.add(split_panel);
ghsl_panel.add(label_builtUp);
ghsl_panel.add(builtup_panel);
ghsl_panel.add(builtUp_chart_panel);
ghsl_panel.add(label_population);
ghsl_panel.add(population_panel);
ghsl_panel.add(population_chart_panel);
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Global Surface water /////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////Function for Clip of Ditrict 
var water_data = function(geometry){
  var image = gsw.map(function(image) { return image.clip(geometry); });
  return image;
};
////////////////////////////////////////////////////////////////
//////////////////////// Water Occurance ///////////////////////
// year dict
var current_yr = 2015;
var start_yr = 1990  ;
var year_dict = {};
for(var i = start_yr; i<=current_yr; i++) 
{
  year_dict[i] = i;
}
//////////////////////////////////////////////////////////////////
/////////////////////Function for Color/////////////////////////
var color_water = function(){
  ////////////////////////////////////////////////////////////////
////////////////////Panel for Color used in Built_Up
  //Panel for Label of colors
  var label_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-left',
      width: '220px',
      height: '120px',
      backgroundColor: 'FFF8DC'
    }
  });
  Map.add(label_panel);
  // Create legend title
  var Title = ui.Label({
      value: 'Legend : Water',
      style: {
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '0 0 4px 0',
          padding: '0',
          color: 'red'
      }
  });
  // Add the title to the panel
  label_panel.add(Title);
  // Creates and styles 1 row of the legend.
  var makeRow = function (color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
          style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '8px',
              margin: '0 0 4px 0'
          }
      });
    // Create the label filled with the description text.
    var description = ui.Label({
        value: name,
        style: { margin: '0 0 4px 6px' }
    });
    // return the panel
    return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  //  Palette with the colors
  var pallete = ['086743','ffffff', '0000ff'];
  // name of the legend
  var names = ['No Data', 'No Water ', 'Permanent Water'];
  // Add color and and names
  for (var i = pallete.length; i > 0; i--) {
      label_panel.add(makeRow(pallete[i - 1], names[i - 1]));
  }
  ////////////////////////End of Color Label
};
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////Functions//////////////////////////////
var vis_params = {
  min : 0,
  max : 3,
  palette : ['086743','ffffff', '0000ff', '0000ff']
};
///////////////////////////////////////////////////////////////////////
/////////////////////Function for Chart and AddLayer///////////////////
var water_chart = function(img,geometry,sy,ey)
{
  Map.clear();
  chart_panel.clear();
  var filter_img = img.filterBounds(geometry).filter(ee.Filter.calendarRange(sy,ey,'year') );
  var layer = img.filter(ee.Filter.calendarRange(sy,ey,'year'));
    ////////////////////////////Adding Layer of Geometry
  Map.addLayer({
    eeObject: geometry,
    name: 'district_boundry',
    opacity: 0.1});
///////////////////////////////////////////////////////////////////////////
//////////////////////Function for addLayer/////////////////////////////////
var i = sy;
var j = ey-sy;
  function addImage(image) { // display each image in collection
      var id = image.id;
      var Layer_image = ee.Image(image.id);
      Map.addLayer(Layer_image.clip(geometry), vis_params,'Water'+i);
      i=i+1;
    }
      layer.evaluate(function(layer) {  // use map on client-side
      layer.features.map(addImage);
  });
// water function:
  var waterfunction = function(image){
    var s = image.select('waterClass');
    var water01 = s.eq(3).add(s.eq(2));
    //Calculate the pixel value in square kilometer
    var water_area = water01.multiply(0.0009);
    var waterArea = water_area.rename('waterArea');
    image = image.addBands(waterArea);
    var stats = waterArea.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: geometry,
      scale: 30,
      bestEffort: true,
      maxPixels: 1e9
    });
    return image.set(stats);
  };
  var collection = filter_img.map(waterfunction);
  var chart = ui.Chart.image.seriesByRegion({
    imageCollection: collection, 
    regions: geometry,
    reducer: ee.Reducer.sum(),
    band : 'waterArea',
    scale: 30,
    xProperty: 'system:time_start',
    seriesProperty : 'WaterArea'
  })
  .setChartType('ScatterChart')
  .setOptions({
          title: 'Water Area',
          vAxis: {title: 'Permanent Water in District in Sq. KM. Area'},
          hAxis: {title: 'YEARS', gridlines: {count : j}},
          color: '00FF00',
          crosshair:{opacity : 0.0},
        });
  chart_panel.widgets().set(0,chart);
};
///////////////////////////////////////////////////////////////////////////
/////////////// UI UI UI UI UI UI UI /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//Label for Surface Water
var gsw_label = ui.Label("Surface Water in India");
gsw_label.style().set({
  color: '9633FF',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
  fontWeight: 'bold'
});
//Label for Duration
var to_label = ui.Label({
  value: 'To',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    padding : '0',
    color : 'black'
  }
});
//Create select for start year
var start_year = ui.Select({
  placeholder: 'Start year',
  items: Object.keys(year_dict),
    style: {
    stretch: 'horizontal'
  },
  onChange : function(key){
    start_year_var = year_dict[key];
  }
});
//Create select for end year
var end_year = ui.Select({
  placeholder: 'End year',
  items: Object.keys(year_dict),
    style: {
    stretch: 'horizontal'
  },
  onChange : function(key){
    end_year_var = year_dict[key];
  }
});
//////////////////Panel for Selecting Years
var year_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '480px',
        border: '1px solid black',
        stretch: 'horizontal'
    }
});
year_panel.widgets().set(0,start_year);
year_panel.widgets().set(1, to_label);
year_panel.widgets().set(2,end_year);
//////////////////Panel for Buttons for Graph
var button_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
        width: '480px',
        border: '1px solid black',
        stretch: 'horizontal'
    }
});
//////////////////////////Button For generating Graph
var graph_button = ui.Button('Generate Graph');
graph_button.style().set({
  color: 'green',
  stretch: 'horizontal'
});
graph_button.onClick(function(){
  var image = water_data(geometry );
  water_chart(image,geometry, start_year_var, end_year_var);
  color_water();
});
button_panel.widgets().set(0, graph_button);
//Button for reset the Map
button_panel.widgets().set(1,
    ui.Button({
        label: 'Clear',
        style: {color: 'red',
                stretch: 'horizontal'},
        onClick: function () {
            Map.clear();
            chart_panel.clear();
        }
    })
);
///////////////////////////////////////////////////////
sd_panel.widgets().set(0, select_state);
dd_panel.widgets().set(0, select_district);
//////////////////////////////////////////
/////////////////////////////////////////////////////
//Panel for Water Occurrence Chart
var chart_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
        width: '480px',
        height: '220px',
        border: '1px solid black'
  }
});
/////////////////////Panel for the HyperLink
var link_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-right',
        width: '480px',
        border: '1px solid black'
    }
});
//Label for Redirecting to other Project
var hyperlink_label = ui.Label("Redirect to Other Projects:");
hyperlink_label.style().set({
  color: 'black',
  fontSize: '30',
  fontFamily: 'monospace',
  stretch: 'horizontal',
  fontWeight: 'bold'
});
var project1 = ui.Label("1. GHSL and GSW");
project1.setUrl('https://code.earthengine.google.com/0feb2f84428d0a0ab692e6543abade2f');
var project2 = ui.Label("2. Spectral Indices");
project2.setUrl('https://code.earthengine.google.com/c750e4fa3342bb9ed021d8c4e6d4639c');
link_panel.widgets().set(0, hyperlink_label);
link_panel.widgets().set(1, project1);
link_panel.widgets().set(2, project2);
/////////////////////Panel for the GSW
var gsw_panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-right',
        width: '480px',
        height: '500px',
        border: '1px solid black'
    }
});
gsw_panel.add(gsw_label);
gsw_panel.add(year_panel);
gsw_panel.add(button_panel);
gsw_panel.add(chart_panel);
gsw_panel.add(link_panel);
////////////////////////////Panel for GHSL and GSW
//Panel for adding all the Layers
var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
        position: 'top-right',
        width: '500px',
        height: '585px'
    }
});
////////////////////////////////////////////////
panel.add(ghsl_panel);
panel.add(gsw_panel);
ui.root.add(panel);
////////////////////////////////////////////////