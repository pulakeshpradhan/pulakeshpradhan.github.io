var messages_db = ui.import && ui.import("messages_db", "table", {
      "id": "users/orbtwz/MessagesIpData"
    }) || ee.FeatureCollection("users/orbtwz/MessagesIpData"),
    ipInfo_db = ui.import && ui.import("ipInfo_db", "table", {
      "id": "users/orbtwz/AllIps"
    }) || ee.FeatureCollection("users/orbtwz/AllIps"),
    members_db = ui.import && ui.import("members_db", "table", {
      "id": "users/orbtwz/IronMarchFullMemberData"
    }) || ee.FeatureCollection("users/orbtwz/IronMarchFullMemberData"),
    militaryBases_db = ui.import && ui.import("militaryBases_db", "table", {
      "id": "users/orbtwz/militaryBases2"
    }) || ee.FeatureCollection("users/orbtwz/militaryBases2");
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
//var fc2 = ee.FeatureCollection(table2);
//Map.setCenter(-73.9596, 40.7688, 12);
//Map.addLayer(fc, {}, 'Census roads');
/* Map.addLayer(members.draw({color: 'ff0000', pointRadius: 5}), {}, 'Account Creation IPs'); //Can't add unique colors with .draw()??
 Map.addLayer(messages.draw({color: '003cff', pointRadius: 3}), {}, 'Messages IPs'); //Can't add unique colors with .draw()??
 Map.addLayer(ipInfos.draw({color: '000000', pointRadius: 3}), {}, 'AtomicWaffe users'); //Can't add unique colors with .draw()??
*/
var members = ee.FeatureCollection(members_db);
var messages = ee.FeatureCollection(messages_db);
var ipInfos = ee.FeatureCollection(ipInfo_db);
var militaryBases = ee.FeatureCollection(militaryBases_db);
var messagesFiltered = messages;
var awMembers = members.filter(ee.Filter.neq('awAffiliation', "not available"));
var app = {};
var map;
var mainPanel;
var mainToolsPanel;
var membersLayer;
var awMembersLayer;
var messagesLayer;
var militaryBasesLayer;
 /* The introduction section. */
 var intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'IRON MARCH LEAK EXPLORER',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
       ui.Label({
        value: 'More info and source data in .csv format available at this link',
        style: { fontSize: '14px',}
        }).setUrl('https://docs.google.com/document/d/1WmRZ4nTz4OWhHuOU8QH39rC2AaR1EUcHlWu-PhMigjA/edit?usp=sharing'),
        ui.Label({
        value: 'RED - registration ip location \nBLUE - IPs from messages \nBLACK - AtomWaffen related members \nTop Right > Layers to handle opacities etc... \nClick near a RED dot to obtain user info',
        style: { fontSize: '14px',whiteSpace:'pre-wrap'}
        })
    ])
  };
  var searchUser = {
    description_label: ui.Label('Type a username or ID'),
    searchField_textbox: ui.Textbox(),
    close_button: ui.Button('Close', function(){app.SearchWindowClose()}),
    search_button: ui.Button('Search',function(){app.SearchUserAction()}),
  };
  searchUser.panel = ui.Panel([
      searchUser.description_label,
      searchUser.searchField_textbox,
      ui.Panel([
      searchUser.close_button,
     searchUser.search_button,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
    ]); 
  var userDisplay = {
    name_label: ui.Label('USERNAME:'),
    name_display: ui.Label(),
    memberId_label: ui.Label('MEMBER ID:'),
    memberId_display: ui.Label(),
    email_label: ui.Label('EMAIL:'),
    email_display: ui.Label(),
    mainIp_label: ui.Label('MAIN IP:'),
    mainIp_display: ui.Label(),
    joined_label: ui.Label('JOINED:'),
    joined_display: ui.Label(),
    dbPosts_label: ui.Label('DB POSTS:'),
    dbPosts_display: ui.Label(),
    otherIps_label: ui.Label('OTHER IPs:'),
    otherIps_display: ui.Label(),
    awRelation_label: ui.Label('AW RELATION:'),
    awRelation_display: ui.Label(),
    otherInfos_label: ui.Label('OTHER INFOS:'),
    otherInfos_display: ui.Label(),
  }
  userDisplay.panel = ui.Panel([ 
    ui.Panel([
      userDisplay.name_label,
      userDisplay.name_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}),
    ui.Panel([
      userDisplay.memberId_label,
      userDisplay.memberId_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}),
    ui.Panel([
      userDisplay.email_label,
      userDisplay.email_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}),
    ui.Panel([
      userDisplay.mainIp_label,
      userDisplay.mainIp_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}),   
    ui.Panel([
      userDisplay.joined_label,
      userDisplay.joined_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}), 
    ui.Panel([
      userDisplay.dbPosts_label,
      userDisplay.dbPosts_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px'}),
    ui.Panel([
      userDisplay.awRelation_label,
      userDisplay.awRelation_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px',height: '50px'}),
    ui.Panel([
      userDisplay.otherInfos_label,
      userDisplay.otherInfos_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px',height: '50px'}),
    ui.Panel([
      userDisplay.otherIps_label,
      userDisplay.otherIps_display,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '0px',height: '50px'}),   
       ])
       ;
  mainToolsPanel =  {
      allUsersDisplayButton : ui.Button('All Users', app.AllUsersDisplay_Button),
   //   searchUserButton : ui.Button('Search User', app.SearchUser_Button()),
      clearUserButton : ui.Button("Clear User", function() {app.ClearUser_Button()}),
      searchUserButton : ui.Button('Search User', function() {app.SearchUser_Button();}),
    }
   mainToolsPanel.panel =ui.Panel([
      ui.Panel([
     // mainToolsPanel.allUsersDisplayButton,
     mainToolsPanel.clearUserButton,
      mainToolsPanel.searchUserButton,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
    ]);
app.boot = function() {
  app.CreateInterface();
};
app.ProcessMilitaryBasesDistance = function() {
  var spatialFilter = ee.Filter.withinDistance({
      distance: 3000,
      leftField: '.geo',
      rightField: '.geo',
      maxError: 10
    });
    var joined = ee.Join.saveAll({
      matchesKey: 'items', 
      measureKey: 'distance',
      ordering: 'distance'
    }).apply({
      primary: messages, 
      secondary: militaryBases, 
      condition: spatialFilter
    });
   // print(joined);
  //joined.get(1).get('name');
    map.addLayer(militaryBases.draw({color: 'black', pointRadius: 4}), {}, 'MIlitary Bases');
    map.addLayer(joined.draw({color: 'yellow', pointRadius: 5}), {}, 'MilitaryBasesResult');
}
app.CreateInterface = function() {
  mainPanel = ui.Panel({
    widgets: [
      intro.panel,
      mainToolsPanel.panel,
      userDisplay.panel,
    ],
 /*   style: {
      stretch: 'horizontal',
      height: '100%',
      width: '550px',
      backgroundColor: colors.gray,
      border: BORDER_STYLE,
    }*/
    style: {
      width: '300px',
      padding: '8px',
     border: BORDER_STYLE,
    }
  });
  ui.root.clear();
  map = ui.Map();
  ui.root.add(mainPanel).add(map);
   userDisplay.panel.style().set({shown: false});
   var inspector = ui.Panel([ui.Label('Click on a point to get user info ')]);
  //map.add(inspector);
  messagesLayer = map.addLayer(messagesFiltered.draw({color: 'blue', pointRadius: 3}), {}, 'Messages IPS');
  membersLayer = map.addLayer(members.draw({color: 'ff0000', pointRadius: 5}), {}, 'Account Creation IPs'); //Can't add unique colors with .draw()??
  awMembersLayer = map.addLayer(awMembers.draw({color: 'black', pointRadius: 4}), {}, 'AtomWaffe affiliated');
  // MILITARY POSITIIONS CROSS REFERENCE
  //app.ProcessMilitaryBasesDistance();
}
app.AllUsersDisplay_Button = function() {
  print('some text');
}
var currentUser;
app.DisplayUser = function(user)
{
  print("Display USER");
  //print(user.properties.name);
  currentUser = user;
  if(currentUser === null) {
    userDisplay.panel.style().set({shown: false});
    messagesFiltered = messages;
   // map.remove(messagesLayer);
    messagesLayer.setEeObject(messagesFiltered.draw({color: 'blue', pointRadius: 3}));
   // messagesLayer = map.addLayer(messagesFiltered.draw({color: 'blue', pointRadius: 3}), {}, 'Messages IPS');
    return;
  }
  else {
     userDisplay.panel.style().set({shown: true});
  }
  userDisplay.name_display.setValue(user.properties.name);
  userDisplay.email_display.setValue(user.properties.email);
  userDisplay.memberId_display.setValue(user.properties.member_id);
  userDisplay.mainIp_display.setValue(user.properties.ip_address);
  var date = ee.Date(user.properties.joined *1000);
  //userDisplay.joined_display.setValue(date.toUTCString());
  date.evaluate(function(result){
    //print(result);
     userDisplay.joined_display.setValue(date.format().getInfo());
  });
  userDisplay.dbPosts_display.setValue(user.properties.msgActivity);
  userDisplay.awRelation_display.setValue(user.properties.awAffiliation);
  userDisplay.otherIps_display.setValue(user.properties.otherIps);
  var otherInfos = "";
  if(user.properties.otherEmails != "not available") {
    otherInfos += user.properties.otherEmails;
  }
  if(user.properties.skype != "not available") {
    otherInfos += '|SKYPE: ' + user.properties.skype;
  }
   if(user.properties.facebook != "not available") {
    otherInfos += '|FACEBOOK: ' + user.properties.facebook;
  }
  if(user.properties.otherInfo != ' ') {
    otherInfos += '| : ' + user.properties.otherInfo;
  }
  userDisplay.otherInfos_display.setValue(otherInfos);
  print("Display USER END");
  messagesFiltered = messages.filter(ee.Filter.eq('memberid',user.properties.member_id));
 // map.remove(messagesLayer);
  messagesLayer.setEeObject(messagesFiltered.draw({color: 'blue', pointRadius: 3}));
 // messagesLayer = map.addLayer(messagesFiltered.draw({color: 'blue', pointRadius: 3}), {}, 'Messages IPS');
  print(messagesFiltered);
}
app.ClearUser_Button = function() {
 // currentUser = null;
  app.DisplayUser(null);
  messagesFiltered = messages;
}
app.boot();
app.SearchUser_Button = function() {
  print("SearchUser_Button");
  app.ShowUserSearchWindow();
}
app.ShowUserSearchWindow = function() {
   map.add(searchUser.panel);
}
app.SearchWindowClose = function() {
  map.remove(searchUser.panel);
}
app.SearchUserAction = function() {
  app.SearchWindowClose();
  var wUser = searchUser.searchField_textbox.getValue();
  print(wUser);
  var id = parseInt(wUser);
  var wMember = null;
  if(isNaN(id)) {
    wMember = members.filter(ee.Filter.eq('name', wUser))
  }
  else {
   wMember = members.filter(ee.Filter.eq('member_id', id))
  }
  if(wMember !== null && wMember.first().getInfo() !== null) {
     print("success");
     wMember = wMember.first();
     print(wMember);
      wMember.evaluate(function(result){
         app.DisplayUser(result);
         print(result.latitude +","+ result.longitude);
         map.setCenter(result.geometry.coordinates[0],result.geometry.coordinates[1]);
         print(result);
      });
  }
  else {
    print("fail");
  }
}
map.onClick(function(coords) {
  // Show the loading label.
 /* inspector.clear();
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));*/
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var spatialFilter = ee.Filter.withinDistance({
    distance: 60000,
    leftField: '.geo',
    rightField: '.geo',
    maxError: 10
  });
  var joined = ee.Join.saveAll({
    matchesKey: 'items', 
    measureKey: 'distance',
    ordering: 'distance'
  }).apply({
    primary: click_point, 
    secondary: members, 
    condition: spatialFilter
  });
 // print(joined);
//joined.get(1).get('name');
  if(!joined.first()) {
    return;
  }
    var item = joined.first().get('items');
   // print(item);
     var it2 = item.evaluate( function(result) {
      // print(result[0].properties.name);
       app.DisplayUser(result[0]);
     });
});