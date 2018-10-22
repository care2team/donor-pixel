# donor-pixel
Donor Pixel Repo

##### JAVASCRIPT IMPLEMENTATION EXAMPLE:

```html
<script>!function (w, d, e, u, m, t, s) {
        if (w.care2TrackDonation) return;
        m = w.care2TrackDonation = function (params) {
            m.callMethod ? m.callMethod.apply(m, [params]) : m.queue.push(params)
        };
        m.push = m;
        m.version = '1.0';
        m.queue = [];
        t = d.createElement(e);
        t.async = !0;
        t.src = u;
        s = d.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', '//dingo.care2.com/donations/pixel.js');


    care2TrackDonation({
        clientid: 'CLIENT_ID',
        email: 'test@care2team.com',
        value: '3.00',
        repeating: false
    });
</script>
```

##### PHP IMPLEMENTATION EXAMPLE:

```php
<?php

/*
 * The function Care2TrackDonation() will take all of the donation data as arguments, validate them, and then build
 * the url to use to make the Care2 tracking pixel call. The last argument to the function ($returnTrackingUrl)
 * determines whether the function should make the pixel call to Care2, or if it should just return the pixel URL.
 * Just returning the pixel URL can be useful if you need an URL to embed in an <img> HTML tag.
 */

Care2TrackDonation(
    '1234',
    'test-1@gmail.com',
    '3.12',
    'USD',
    false,
    false
);

function Care2TrackDonation($clientId, $email, $value, $currency, $repeating, $returnTrackingUrl = false)
{
    $salt = 'JnXfotSYCdjoYQNtLMp';

    // Validate e-mail address
    $email = trim(strtolower($email));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Email must be a valid email address.");
    }
    $emailHash = hash('sha256', $salt . $email, false);

    // Validate client ID
    $clientId = (int) $clientId;
    if ($clientId <= 0) {
        throw new Exception("Client ID must be an valid integer.");
    }

    // Validate donation value
    $value = (float) $value;
    if ($value <= 0) {
        throw new Exception("Value must be an valid float.");
    }

    $queryParams = [
        'clientid'  => $clientId,
        'emailhash' => $emailHash,
        'value'     => $value,
        'currency'  => $currency,
        'repeating' => ($repeating === true ? 1 : 0)
    ];

    $trackingUrl = 'https://www.care2.com/donation-pixel?' . http_build_query($queryParams);

    if ($returnTrackingUrl) {
        return $trackingUrl;
    } else {
        file_get_contents($trackingUrl);
    }
}
```
