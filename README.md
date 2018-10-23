# donor-pixel
Donor Pixel Repo

<details><summary>JAVASCRIPT IMPLEMENTATION EXAMPLE</summary>
<p>

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
</p>
</details>
<br />
<details><summary>HTML IMPLEMENTATION EXAMPLE</summary>
<p>

Query parameters passed to the donation pixel:

| Parameter | Description | Example |
| :--- | :--- | :--- |
| clientID | Your client ID | 1234 |
| emailhash | The SHA256 hash of the user's lower-cased email, salted with JnXfotSYCdjoYQNtLMp | See hash in the url below |
| value | The amount of the donation | 3.12 |
| currency | The ISO 4217 currency code of the donation | USD |
| repeating | This value should 1 for true, 0 for false | 1 |

```html
<img height="1" width="1" alt="" style="display:none" src="https://www.care2.com/donation-pixel?clientid=1234&emailhash=ca32ff688495d108c175948a8b641b62ddf166bbfd4fb404299758a3e94f59dd&value=3&currency=USD&repeating=0">
```

</p>
</details>
<br />
<details><summary>PHP IMPLEMENTATION EXAMPLE</summary>
<p>

```php
<?php

Care2TrackDonation(
    '1234', // Client ID
    'test-1@gmail.com', // E-mail address
    '3.12', // Donation value
    'USD',  // Donation currency
    false   // Repeating
);

function Care2TrackDonation($clientId, $email, $value, $currency, $repeating)
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
        'repeating' => $repeating === true ? 1 : 0
    ];

    $trackingUrl = 'https://www.care2.com/donation-pixel?' . http_build_query($queryParams);

    file_get_contents($trackingUrl);
}
```
</p>
</details>
