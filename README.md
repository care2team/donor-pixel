# donor-pixel
Donor Pixel Repo

##### IMPLEMENTATION EXAMPLE:

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
        repeating: false //optional
    });
</script>
```