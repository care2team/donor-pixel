"use strict";

let assert = require('chai').assert;
let sha256 = require('js-sha256').sha256;

let $ = require('jquery');
global.$ = window.jQuery = window.$ = $;


describe('default assert', () => {

    it('URL building works', () => {

        // emulate the embed code
        let m = window.care2TrackDonation = function () {
            m.callMethod ? m.callMethod.apply(m, [arguments]) : m.queue.push(arguments)
        };

        m.push = m;
        m.version = '1.0';
        m.queue = [];


        // pull in the library
        require('../src/pixel');


        // set the data we're going to use
        let clientid = 'CLIENT_ID';
        let email = 'martin@care2team.com';
        let value = '3.00';


        // make the track donation call
        care2TrackDonation(clientid, email, value);


        // make sure there is a pixel with the URL we are expecting
        let result = false;

        let url = 'https://www.care2.com/tr'
            + '?clientid=' + clientid
            + '&emailhash=' + sha256(email)
            + '&value=' + value;

        $('img').each((index, element) => {
            if (element.src === url) {
                result = true;
            }
        });


        // test to make sure everything is as expected
        assert.equal(true, result);
    });

});
