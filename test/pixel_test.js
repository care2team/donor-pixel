"use strict";

let assert = require('chai').assert;
let sha256 = require('js-sha256').sha256;


describe('default assert', () => {

    it('URL building works', () => {

        let { m, salt } = emulateEmbedCode();


        // set the data we're going to use
        let clientid = 'CLIENT_ID';
        let email = 'martin@care2team.com';
        let value = '3.00';


        // make the track donation call
        care2TrackDonation(clientid, email, value);


        // make sure there is a pixel with the URL we are expecting
        let result = false;

        let url = buildURL(clientid, getHashValue(email, salt), value);

        let imgTags = document.getElementsByTagName('IMG');

        for (let i = 0; i < imgTags.length; i++) {
            if (imgTags[i].src === url) {
                result = true;
            }
        }


        // test to make sure everything is as expected
        assert.equal(true, result);

    });


    it ('make sure we don\'t rehash hashed emails', () => {

        let { m, salt } = emulateEmbedCode();


        // set the data we're going to use
        let clientid = 'CLIENT_ID';
        let email = 'martin@care2team.com';
        let value = '3.00';


        // pre-hash the email address
        email = getHashValue(email, salt);


        // make the track donation call
        care2TrackDonation(clientid, email, value);


        // make sure there is a pixel with the URL we are expecting
        let result = false;

        let url = buildURL(clientid, email, value);

        let imgTags = document.getElementsByTagName('IMG');

        for (let i = 0; i < imgTags.length; i++) {
            if (imgTags[i].src === url) {
                result = true;
            }
        }


        // test to make sure everything is as expected
        assert.equal(true, result);

    });

});


function emulateEmbedCode() {
    // emulate the embed code
    let m = window.care2TrackDonation = function () {
        m.callMethod ? m.callMethod.apply(m, [arguments]) : m.queue.push(arguments)
    };

    m.push = m;
    m.version = '1.0';
    m.queue = [];


    // pull in the library
    const salt = require('../src/pixel');


    // return the values
    return { m, salt };
}


function getHashValue(value, salt) {

    return sha256(salt + value);

}


function buildURL(clientid, email, value) {

    return 'https://www.care2.com/tr'
        + '?clientid=' + clientid
        + '&emailhash=' + email
        + '&value=' + value;

}