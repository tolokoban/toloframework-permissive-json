"use strict";

var INPUT1 = `// tfw.view.checkbox
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
}`;
var OUTPUT1 = {
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
};



describe('{index}', function() {
  var P = require("../src/index").parse;

  var check = function( given, expected ) {
    it('should parse ' + given, function() {
      try {
        var result = P(given);
        expect( result ).toEqual( expected );
      }
      catch( ex ) {
        fail(ex);
      }
    });
  };

  var checkStrict = function( given, expected ) {
    try {
      it('should parse ' + given, function() {
        var result = P(given);
        var rS = JSON.stringify(result, null, "  ");
        var eS = JSON.stringify(expected, null, "  ");
        if( rS != eS ) {
          console.log("Expected:");
          console.log(eS);
          console.log("Result:");
          console.log(rS);
        }
        expect( result ).toBe( expected );
      });
    }
    catch( ex ) {
      fail(ex);
    }
  };

  describe('string', function() {
    check("Hello", "Hello");
    check('{DIV class:"bar thm-bg2"}', {"0": "DIV", "class": "bar thm-bg2"});
  });

  describe('number', function() {
    checkStrict("666", 666);
    checkStrict("3.141", 3.141);
  });

  describe('special', function() {
    checkStrict("true", true);
    checkStrict("false", false);
    checkStrict("null", null);
    checkStrict("undefined", undefined);
  });

  describe('array', function() {
    check("[ ]", []);
    check("[,,,]", []);
    check("[1]", [1]);
    check("[[1]]", [[1]]);
    check("[[[1]]]", [[[1]]]);
    check("[1,2,3,4]", [1,2,3,4]);
    check("[1 2 3 4]", [1,2,3,4]);
    check("[,,1,2,3,,4]", [1,2,3,4]);
    check("[[1],A]", [[1],"A"]);
    check("[1,[2,3],4]", [1,[2,3],4]);
    check("[1,[2,3],[4]]", [1,[2,3],[4]]);
  });

  describe('object', function() {
    check("{ }", {});
    check("{,,,}", {});
    check("{beast:666}", {beast: 666});
    check("{x:'Youpi', y:27}", {x: 'Youpi', y:27});
    check("{beast:666}", {beast: 666});
    check("{666}", {"0": 666});
    check("{{666}}", {"0": {"0": 666}});
    check("{torgnole}", {"0": "torgnole"});
    check("{A,B}", {"0": "A", "1": "B"});
    check("{A;B}", {"0": "A;B"});
    check("{A B}", {"0": "A", "1": "B"});
    check("{{A},B}", {"0": {"0": "A"}, "1": "B"});
    check("{{A}B}", {"0": {"0": "A"}, "1": "B"});
    check("{[A],B}", {"0": ["A"], "1": "B"});
    check("{[A]B}", {"0": ["A"], "1": "B"});
  });

  describe('complex objects', function() {
    check(INPUT1, OUTPUT1);
  });
});


