/**
 * DONOR PIXEL
 *
 * @author Martin Boynton
 *
 * See bottom of this document for embed code example
 */


var sha256 = require('js-sha256').sha256;

const salt = 'JnXfotSYCdjoYQNtLMp';


(function () {

    var c2td = care2TrackDonation;
    var queue = care2TrackDonation.queue || [];

    var callMethod = c2td.callMethod = function (args) {
        var clientid = args[0];
        var email = args[1];
        var value = args[2];

        var url = 'https://www.care2.com/tr'
            + '?clientid=' + clientid
            + '&emailhash=' + sha256(salt + email)
            + '&value=' + value;


        var img = document.createElement('img');
        img.height = '1';
        img.width = '1';
        img.alt = '';
        img.style = 'display:none';
        img.src = url;


        window.document.body.appendChild(img);
    };

    for (var i = 0; i < queue.length; i++) {
        callMethod(queue[i]);
    }

})();


module.exports = salt;


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