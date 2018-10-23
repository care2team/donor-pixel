"use strict";

let assert = require('chai').assert;
let sha256 = require('js-sha256').sha256;


it('make sure calls work asyncronously', () => {

    // set the data we're going to use
    let clientid = 1234;
    let email = 'test+call_async@care2team.com';
    let value1 = 1.00;
    let value2 = 2.00;


    // put in a function that will be called before the code loads
    let { m, salt } = emulateEmbedCode(() => {
        care2TrackDonation({ clientid, email, value: value1 });
    });

    care2TrackDonation({ clientid, email, value: value2 });


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
    assert.equal(true, result1, 'make sure call work asyncronously when called before code library loads');
    assert.equal(true, result2, 'make sure call work asyncronously when called after code library loads');

});


it('URL building works', () => {

    let { m, salt } = emulateEmbedCode();


    // set the data we're going to use
    let clientid = 5678;
    let email = 'test+build_url@care2team.com';
    let value = 3.00;


    // make the track donation call
    care2TrackDonation({ clientid, email, value });


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
    assert.equal(true, result, 'URL building works');

});


it('make sure we don\'t rehash hashed emails', () => {

    let { m, salt } = emulateEmbedCode();


    // set the data we're going to use
    let clientid = 9012;
    let email = 'test+dont_rehash@care2team.com';
    let value = 4.00;


    // pre-hash the email address
    email = getHashValue(email, salt);


    // make the track donation call
    care2TrackDonation({ clientid, email, value });


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
    assert.equal(true, result, 'make sure we don\'t rehash hashed emails');

});


function emulateEmbedCode(queueFunction) {

    if (window.care2TrackDonation) {
        return { m: window.care2TrackDonation, salt: require('../src/pixel') };
    }

    // emulate the embed code
    let m = window.care2TrackDonation = function (params) {
        m.callMethod ? m.callMethod.apply(m, [params]) : m.queue.push(params)
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


function buildURL(clientid, email, value, currency, repeating) {

    let url = 'https://www.care2.com/tracking-pixel'
        + '?clientid=' + clientid
        + '&emailhash=' + email
        + '&value=' + value;

    if (typeof currency !== 'undefined') {
        url += '&currency=' + currency;
    }

    if (typeof repeating !== 'undefined') {
        repeating = repeating ? '1' : '0';
        url += '&repeating=' + repeating;
    }


    return url;

}
