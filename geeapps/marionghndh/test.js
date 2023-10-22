var test = "meh";
var t2 = ui.url.get("val1");
var t3 = ui.url.get("val2");
var panel_title = ui.Panel({style: {
  width: '15%',
  height: '9%',
  position: "top-center"}})
    .add(ui.Label(t3));
Map.add(panel_title);
print(t2);
// ui.url.set({"val1": "heyho"});