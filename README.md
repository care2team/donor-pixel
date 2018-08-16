# donor-pixel
Donor Pixel Repo

##### EMBED CODE EXAMPLE:

```html
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
```