//var constants = require('users/osman/prototype:utils/constants') // import constants script
//var utils = require("users/osman/prototype:utils/utils") // import utils script
var test_cases = require("users/osman/prototype:utils/test_cases.js") 
//print(constants.colors)
var ui_components = require("users/osman/prototype:utils/ui_components.js")
Map.add(ui_components.dNBR_legend())
var left_panel = ui.Panel(
  {
    style: { 
      width: "375px", 
      position: "top-left" 
    }
  }
)
var right_panel = ui.Panel(
  {
    style: { 
      width: "375px", 
      position: "top-right" 
    }
  }
)
ui.root.insert(0,left_panel)
ui.root.insert(2, right_panel)