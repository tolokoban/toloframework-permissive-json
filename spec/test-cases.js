module.exports = [
  [`{func()}`], { "0": "func()" },
  [`{ func() }`], { "0": "func()" },
  [`{ func () }`], { "0": "func", "1": "()" },
  [`// tfw.view.checkbox
{View BUTTON
 view.attribs: {
   value: false,
   reversed: false,
   content: Checkbox
 }
 class:tfw-view-checkbox
 class.ok:value
 event.pointerdown:{Toggle value}
 [
   {DIV class:pin [
     {DIV class:"bar thm-bg2"}
     {DIV class:"btn thm-ele2 thm-bg1"}
   ]}
   {DIV class:txt {Attrib content}}
 ]
}`,
   {
     "0": "View",
     "1": "BUTTON",
     "2": [
       {
         "0": "DIV",
         "1": [
           {
             "0": "DIV",
             "class": "bar thm-bg2"
           },
           {
             "0": "DIV",
             "class": "btn thm-ele2 thm-bg1"
           }
         ],
         "class": "pin"
       },
       {
         "0": "DIV",
         "1": {
           "0": "Attrib",
           "1": "content"
         },
         "class": "txt"
       }
     ],
     "view.attribs": {
       "value": false,
       "reversed": false,
       "content": "Checkbox"
     },
     "class": "tfw-view-checkbox",
     "class.ok": "value",
     "event.pointerdown": {
       "0": "Toggle",
       "1": "value"
     }
   }],
  //--------------------------------------------------------------------------------
  [`{View DIV class: test [
  {SECTION [
    {tfw.view.icon content: {Bind "text/value"}, size: 32}
    {HR}
    {tfw.view.textbox view.id:text, value: "home" }
  ]}
//  {SECTION [{showcase.button}]}
]}`,
   {
     "0": "View",
     "1": "DIV",
     "2": [
       {
         "0": "SECTION",
         "1": [
           {
             "0": "tfw.view.icon",
             "content": {
               "0": "Bind",
               "1": "text/value"
             },
             "size": 32
           },
           {
             "0": "HR"
           },
           {
             "0": "tfw.view.textbox",
             "view.id": "text",
             "value": "home"
           }
         ]
       }
     ],
     "class": "test"
   }],
  [`{  
  view.attribs: {
    action: {action}    
    tag: {string ACTION} // The value \`action\` will take on every tap.
    icon: ""
    content: {string "Click me!"}
    pressed: {boolean false}
    flat: {boolean false}
    type: {[default primary secondary] primary}
    enabled: {boolean true}
    inverted: {boolean false}
    visible: {boolean true}
    width: {unit auto}
    wide: {boolean false}
    responsive: {boolean false}
    small: {boolean false, behind: onSmallChanged}
  }
}`,
   {
     "view.attribs": {
       action: {"0": "action"},
       tag: {"0": "string", "1": "ACTION"},
       icon: "",
       content: {"0": "string", "1": "Click me!"},
       pressed: {"0": "boolean", "1": false},
       flat: {"0": "boolean", "1": false},
       type: {"0": ["default", "primary", "secondary"], "1": "primary"},
       enabled: {"0": "boolean", "1": true},
       inverted: {"0": "boolean", "1": false},
       visible: {"0": "boolean", "1": true},
       width: {"0": "unit", "1": "auto"},       
       wide: {"0": "boolean", "1": false},
       responsive: {"0": "boolean", "1": false},
       small: {"0": "boolean", "1": false, "behind": "onSmallChanged"}       
     }
   }
  ]
];
