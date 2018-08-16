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

        checkForErrors(args);

        let { clientid, email, value } = gatherArguments(args);

        let emailhash = email.match(/^[A-Fa-f0-9]{64}$/) ? email : sha256(salt + email);

        let url = 'https://www.care2.com/tr'
            + '?clientid=' + clientid
            + '&emailhash=' + emailhash
            + '&value=' + value;

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
function checkForErrors(args) {

    let { clientid, email, value } = gatherArguments(args);


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
    if (args.length < 3) {
        console.error(prefix + 'There must be at least 3 arguments in the tracker call.');
    }


    // check to see if the email passes regular expression
    let emailValidation = /^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (typeof email !== 'string' || !email.match(emailValidation)) {
        console.error(prefix + 'The email address passed in does not appear to be a valid email.');
    }

}


/**
 * assign the arguments to separate values
 *
 * @param {array} args
 */
function gatherArguments(args) {
    let clientid = args[0];
    let email = args[1];
    let value = args[2];

    return { clientid, email, value };
}


/*

EMBED CODE EXAMPLE:


<script>!function (w, d, e, u, m, t, s) {
        if (w.care2TrackDonation) return;
        m = w.care2TrackDonation = function () {
            m.callMethod ? m.callMethod.apply(m, [arguments]) : m.queue.push(arguments)
        };
        m.push = m;
        m.version = '1.0';
        m.queue = [];
        t = d.createElement(e);
        t.async = !0;
        t.src = u;
        s = d.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'donor-pixel.js');
</script>

 */