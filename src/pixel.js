var sha256 = require('js-sha256').sha256;


(function () {

    var c2td = care2TrackDonation;
    var queue = care2TrackDonation.queue || [];

    var callMethod = c2td.callMethod = function (args) {
        var clientid = args[0];
        var email = args[1];
        var value = args[2];

        var url = 'https://www.care2.com/tr'
            + '?clientid=' + clientid
            + '&emailhash=' + sha256(email)
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

