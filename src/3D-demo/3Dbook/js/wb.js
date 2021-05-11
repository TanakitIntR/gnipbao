    var share_url = location.href;
    var platform = '';
    //### sina wb
    var appkey = 1681459862;
    var j = +new Date;
    var f = null;

    function g(t) {
        var l;
        var q;
        var n = +new Date;
        var e = /=\?(&|$)/g;
        t.data = t.data || "";
        t.data = (t.data ? t.data + "&" : "") + "callback=?";
        q = "jsonp" + j++;
        t.data = (t.data + "").replace(e, "=" + q + "$1");
        window[q] = function (s) {
            clearTimeout(f);
            l = s;
            r();
            
        };
        var m = t.url.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + n + "$2");
        t.url = m + ((m == t.url) ? (t.url.match(/\?/) ? "&" : "?") + "_=" + n : "");
        if (t.data) {
            t.url += (t.url.match(/\?/) ? "&" : "?") + t.data;
            t.data = null
        }
        clearTimeout(f);
        f = setTimeout(function () {}, 30000);
        var k = false;
        var p = document.getElementsByTagName("head")[0];
        var o = document.createElement("script");
        if (t.scriptCharset) {
            o.charset = t.scriptCharset
        }
        o.src = t.url;
        var r = function () {
                if (t.success) {
                    t.success(l)
                }
            };
        p.appendChild(o)
    }
    var sina_share_count = function (e) { 
            var k = "http://api.t.sina.com.cn/short_url/shorten.json";
            var m = "http://api.t.sina.com.cn/short_url/share/counts.json";
            var l = "source=" + appkey + "&url_long=" + e;
            g({
                url: k,
                data: l,
                scriptCharset: "utf-8",
                success: function (n) {
                    if (!n || !n[0]) {
                        c();
                        return
                    }
                   
                    var shorten_url = encodeURIComponent(n[0].url_short); 

                    var o = "source=" + appkey + "&url_short=" + shorten_url;
                    g({
                        url: m,
                        data: o,
                        scriptCharset: "utf-8",
                        success: function (p) {
                            if (!p) {
                                c();
                                return
                            }
                            c(p)
                        }
                    })
                }
            })
        };
    var c = function (o) {

                if(o[0].share_counts > shares_wb) {
                      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                      ga.src = 'http://wkee.net/misc/share-touch.php';
                      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                }

    };

    sina_share_count(share_url);