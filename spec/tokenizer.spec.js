"use strict";

describe('tokenizer', function() {
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

    describe('parsing strings', function() {
      check("'Youpi!'", [
        {type: Tokenizer.STRING, index: 0, value: "Youpi!" }
      ]);
      check('"Youpi!"', [
        {type: Tokenizer.STRING, index: 0, value: "Youpi!" }
      ]);

      check("'C\\'est'", [
        {type: Tokenizer.STRING, index: 0, value: "C'est" }
      ]);
      check('"C\'est"', [
        {type: Tokenizer.STRING, index: 0, value: "C'est" }
      ]);

      check("'a\\-b'", [
        {type: Tokenizer.STRING, index: 0, value: "a-b" }
      ]);
      check('"a\\-b"', [
        {type: Tokenizer.STRING, index: 0, value: "a-b" }
      ]);

      check("'a\\nb'", [
        {type: Tokenizer.STRING, index: 0, value: "a\nb" }
      ]);
      check('"a\\nb"', [
        {type: Tokenizer.STRING, index: 0, value: "a\nb" }
      ]);
    });

    describe('parsing identifiers', function() {
      check("Youpi!", [
        {type: Tokenizer.STRING, index: 0, value: "Youpi!" }
      ]);

      check("C'est", [
        {type: Tokenizer.STRING, index: 0, value: "C'est" }
      ]);

      check("a\\-b", [
        {type: Tokenizer.STRING, index: 0, value: "a\\-b" }
      ]);

      check("a\\nb", [
        {type: Tokenizer.STRING, index: 0, value: "a\\nb" }
      ]);
    });

    describe('parsing evrything', function() {
      var check = function(given, expected) {
        it('should tokenize ' + given, function() {
          try {
            var result = Tokenizer.tokenize( given );
            result = result.map(function(itm) { return itm.type; });
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
