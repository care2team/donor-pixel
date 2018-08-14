"use strict";

let assert = require('chai').assert;

describe('default assert', () => {

    it('assert works', () => {
        let result = true;

        assert.equal(true, result);
    });

});
