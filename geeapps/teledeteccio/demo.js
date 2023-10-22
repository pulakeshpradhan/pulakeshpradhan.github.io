var mainPanelFactory = require('users/teledeteccio/demo:MainPanel.js');
var inspectorFactory = require('users/teledeteccio/demo:Inspector.js');
var connectorFactory = require('users/teledeteccio/demo:Connector.js');
var leftMap = ui.root.widgets().get(0);
var rightMap = ui.Map({style: {width: '40%'}});
var connector = new connectorFactory.newConnector();
var inspector = new inspectorFactory.newInspector(connector);
var leftMainPanel = new mainPanelFactory.newMainPanel(leftMap, connector, true);
var rightMainPanel = new mainPanelFactory.newMainPanel(rightMap, connector);
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true
});
ui.root.widgets().reset([splitPanel]);
ui.Map.Linker([leftMap, rightMap]);
leftMainPanel.init('bottom-left');
rightMainPanel.init('bottom-right');
connector.init(leftMainPanel, rightMainPanel, inspector);