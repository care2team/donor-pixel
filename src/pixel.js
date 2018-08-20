/**
 * DONOR PIXEL
 *
 * @author Martin Boynton
 *
 * See bottom of this document for embed code example
 */


const sha256 = require('js-sha256').sha256;
const salt = 'JnXfotSYCdjoYQNtLMp';


(function () {

    const c2td = care2TrackDonation;
    let queue = care2TrackDonation.queue || [];

    const callMethod = c2td.callMethod = function (args) {

        let { clientid, email, value, currency, repeating } = args;

        checkForErrors(clientid, email, value);

        let emailhash = email.match(/^[A-Fa-f0-9]{64}$/) ? email : sha256(salt + email);

        let url = 'https://www.care2.com/tr'
            + '?clientid=' + clientid
            + '&emailhash=' + emailhash
            + '&value=' + value;

        if (typeof currency === 'string') {
            url += '&currency=' + currency;
        }

        if (typeof repeating === 'boolean') {
            repeating = repeating ? '1' : '0';
            url += '&repeating=' + repeating;
        }


        let img = document.createElement('img');
        img.height = '1';
        img.width = '1';
        img.alt = '';
        img.style = 'display:none';
        img.src = url;


        window.document.body.appendChild(img);

    };


    for (let i = 0; i < queue.length; i++) {
        callMethod(queue[i]);
    }

})();


module.exports = salt;


/**
 * if there are any errors, simply log them in the javascript console.
 *
 * @param {array} args
 */
function checkForErrors(clientid, email, value) {

    // to prevent errors in the case where there is no console
    if (typeof console !== 'object') {
        const console = {
            error: function () {
            }
        };
    }


    // a prefix for the errors to find them easily
    let prefix = 'Care2 Donation Tracker -- ERROR: ';


    // make sure there are at least 3 arguments
    if (typeof clientid !== 'string' || typeof email !== 'string' || typeof value !== 'string') {
        console.error(prefix + 'There must be at least 3 string arguments in the tracker call.');
    }


    // check to see if the email passes regular expression
    let emailValidation = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (typeof email !== 'string' || !email.match(emailValidation)) {
        console.error(prefix + 'The email address passed [' + email + '] in does not appear to be a valid email.');
    }

}
