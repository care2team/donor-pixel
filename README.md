# targeting-pixel
Targeting Pixel Repo

##### JAVASCRIPT IMPLEMENTATION EXAMPLE:

```html
<script>!function (w, d, e, u, m, t, s) {
        if (w.care2Targeting) return;
        m = w.care2Targeting = function (params) {
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
    }(window, document, 'script', '//dingo.care2.com/targeting/pixel.js');


    care2Targeting({
        clientid: 'CLIENT_ID',
        email: 'test@care2team.com',
        value: '3.00',
        repeating: false
    });
</script>
```

<br />
<details><summary>HTML IMPLEMENTATION EXAMPLE</summary>
<p>

Query parameters passed to the Targeting pixel:

| Parameter | Description | Example |
| :--- | :--- | :--- |
| clientID | Your client ID | 1234 |
| emailhash | The SHA256 hash of the user's lower-cased email, salted with JnXfotSYCdjoYQNtLMp | See hash in the url below |
| value | The amount | 3.12 |
| currency | The ISO 4217 currency code  | USD |
| repeating | This value should 1 for true, 0 for false | 1 |

```html
<img height="1" width="1" alt="" style="display:none" src="https://www.care2.com/targeting-pixel?clientid=1234&emailhash=ca32ff688495d108c175948a8b641b62ddf166bbfd4fb404299758a3e94f59dd&value=3&currency=USD&repeating=0">
```

</p>
</details>
<br />
<details><summary>PHP IMPLEMENTATION EXAMPLE</summary>
<p>

```php
<?php

care2Targeting(
    '1234', // Client ID
    'test-1@gmail.com', // E-mail address
    '3.12', // Targeting value
    'USD',  // Targeting currency
    false   // Repeating
);

function care2Targeting($clientId, $email, $value, $currency, $repeating)
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

    // Validate targeting value
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

    $targetingUrl = 'https://www.care2.com/targeting-pixel?' . http_build_query($queryParams);

    file_get_contents($targetingUrl);
}
```
</p>

</details>
<br />
<details><summary>BULK LIST FOR IMPORT</summary>
<p>

When providing a list for bulk import, please provide a tab-separated (.tsv) file with the following columns:

| Column | Description 
| :--- | :--- |
| amount | the amount of the donation |
| date | the date of the donation in the format YYYY-MM-DD |
| email_hash | The SHA256 hash of the user's lower-cased email, salted with JnXfotSYCdjoYQNtLMp |
| repeating | This value should 1 for true, 0 for false |

</p>
</details>
