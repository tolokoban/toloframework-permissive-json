"use strict";

/* Uncomment this for specific debug with devtool.
describe('Debugging', function() {
  it('should work', function() {
    debugger;
    var Tokenizer = require("../src/tokenizer");
    var result = Tokenizer.tokenize( "/root" );
  });
});
*/

describe('{tokenizer}', function() {
  var Tokenizer = require("../src/tokenizer");
  describe('correct code', function() {
    var check = function(given, expected) {
      it('should tokenize ' + given, function() {
        try {
          var result = Tokenizer.tokenize( given );
          result = JSON.stringify( result, null, '  ' );
          expect( result ).toEqual( JSON.stringify( expected, null, '  ' ) );
        }
        catch( ex ) {
          fail( ex );
        }
      });
    };

    describe('parsing numbers', function() {
      var check = function(given, expected) {
        it(JSON.stringify(given) + " should be parsed as " + expected, function() {
          var result = Tokenizer.tokenize( given );
          expect( result[0].value ).toBe( expected );
        });
      };
      check("666", 666);
      check("-666", -666);
      check("3.14", 3.14);
      check("-3.14", -3.14);
      check(".5", .5);
      check("3e12", 3000000000000);
      check("3e-2", 0.03);
      check("-3e-2", -0.03);
      check("-3.14e-2", -0.0314);
      check("-3.14e2", -314);
      check(".1e2", 10);
      check("-.1e2", -10);
      check("0xFF", 255);
      check("-0xFF", -255);
      check("0b1111", 15);
      check("-0b1111", -15);
      check("0o33", 27);
      check("-0o33", -27);
    });

    describe('parsing strings', function() {
      check("'Youpi!'", [ {type: Tokenizer.STRING, index: 0, value: "Youpi!" } ]);
      check('"Youpi!"', [ {type: Tokenizer.STRING, index: 0, value: "Youpi!" } ]);
      check("'C\\'est'", [ {type: Tokenizer.STRING, index: 0, value: "C'est" } ]);
      check('"C\'est"', [ {type: Tokenizer.STRING, index: 0, value: "C'est" } ]);
      check("'a\\-b'", [ {type: Tokenizer.STRING, index: 0, value: "a-b" } ]);
      check('"a\\-b"', [ {type: Tokenizer.STRING, index: 0, value: "a-b" } ]);
      check("'a\\nb'", [ {type: Tokenizer.STRING, index: 0, value: "a\nb" } ]);
      check('"a\\nb"', [ {type: Tokenizer.STRING, index: 0, value: "a\nb" } ]);
    });

    describe('parsing empty strings', function() {
      check("''", [{type: Tokenizer.STRING, index: 0, value: ""}]);
      check('""', [{type: Tokenizer.STRING, index: 0, value: ""}]);
    });

    describe('parsing identifiers', function() {
      [
        "*", "+", "-", "?", "=", "<", ">", "(", ")", "/", "a/b", "Team74",
        "Youpi!", "C'est", "a\\b", "a\\nb", "a\\-b",
        "/root", "/home/tolokoban/",
        "f()", "tfw.view.button", "func()"
      ].forEach(function (text) {
        check(text, [ {type: Tokenizer.STRING, index: 0, value: text } ]);
      });
    });

    describe('parsing evrything', function() {
      var check = function(given, expected) {
        it('should tokenize ' + given, function() {
          try {
            var result = Tokenizer.tokenize( given );
            result = result.map(function(itm) { return itm.type; });
            if( JSON.stringify(result) != JSON.stringify(expected)) {
              console.error("Given:    ", given);
              console.error("Expected: ", expected);
              console.error("Got:      ", result);
            }
            expect( result ).toEqual( expected );
          }
          catch( ex ) {
            fail( ex );
          }
        });
      };

      check(
        "{card: [42, Youpi!], Eliot...}", 
        [1,5,8,3,6,5,4,5,2]
      );
      check(
        "{[A],B}",
        [1,3,5,4,5,2]
      );
      check(
        "[[1],A]",
        [3,3,6,4,5,4]
      );
    });

    check("{}", [
      {type: Tokenizer.OBJ_OPEN, index: 0},
      {type: Tokenizer.OBJ_CLOSE, index: 1}
    ]);

    check("}", [
      {type: Tokenizer.OBJ_CLOSE, index: 0}
    ]);

    check(" { \t  } \n  \r\r\n  \t\t", [
      {type: Tokenizer.OBJ_OPEN, index: 1},
      {type: Tokenizer.OBJ_CLOSE, index: 6}
    ]);

    check("[]", [
      {type: Tokenizer.ARR_OPEN, index: 0},
      {type: Tokenizer.ARR_CLOSE, index: 1}
    ]);

    check("]", [
      {type: Tokenizer.ARR_CLOSE, index: 0}
    ]);

    check("[ 'Toto']", [
      {type: Tokenizer.ARR_OPEN, index: 0},
      {type: Tokenizer.STRING, index: 2, value: 'Toto'},
      {type: Tokenizer.ARR_CLOSE, index: 8}
    ]);

    check("// This is a ← comment.", []);

    check("", []);
  });

  describe('exceptions', function() {
    var check = function(given, expected) {
      it('should throw an exception for ' + given, function() {
        try {
          var tokens = Tokenizer.tokenize( given );
          console.log( JSON.stringify( tokens, null, '  ' ) );
          fail("An exception was expected!");
        }
        catch( ex ) {
          if( ex.index !== expected ) fail( ex );
          expect( ex.index ).toBe( expected );
        }
      });
    };

    check("{'}", 1);
  });
});
