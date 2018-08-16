"use strict";

let assert = require('chai').assert;
let sha256 = require('js-sha256').sha256;


describe('default assert', () => {

    it('URL building works', () => {

        let { m, salt } = emulateEmbedCode();


        // set the data we're going to use
        let clientid = 'CLIENT_ID';
        let email = 'test@care2team.com';
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
        let email = 'test@care2team.com';
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


    it ('make sure calls work asyncronously', () => {


        // set the data we're going to use
        let clientid = 'CLIENT_ID';
        let email = 'test@care2team.com';
        let value1 = '3.00';
        let value2 = '3.00';


        // put in a function that will be called before the code loads
        let { m, salt } = emulateEmbedCode(() => {
            care2TrackDonation(clientid, email, value1);
        });

        care2TrackDonation(clientid, email, value2);


        // make sure there is a pixel with the URL we are expecting
        let result1 = false;
        let result2 = false;

        let url1 = buildURL(clientid, getHashValue(email, salt), value1);
        let url2 = buildURL(clientid, getHashValue(email, salt), value2);

        let imgTags = document.getElementsByTagName('IMG');

        for (let i = 0; i < imgTags.length; i++) {
            if (imgTags[i].src === url1) {
                result1 = true;
            }

            if (imgTags[i].src === url2) {
                result2 = true;
            }
        }


        // test to make sure everything is as expected
        assert.equal(true, result1);
        assert.equal(true, result2);

    });

});


function emulateEmbedCode(queueFunction) {
    // emulate the embed code
    let m = window.care2TrackDonation = function () {
        m.callMethod ? m.callMethod.apply(m, [arguments]) : m.queue.push(arguments)
    };

    m.push = m;
    m.version = '1.0';
    m.queue = [];


    // if we passed in a function, call it before the script loads
    if (typeof queueFunction === 'function') {
        queueFunction();
    }


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