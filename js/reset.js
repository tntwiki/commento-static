!function(){"use strict";void 0===window.commento&&(window.commento={}),window.commento.origin="[[[.Origin]]]",window.commento.cdn="[[[.CdnPrefix]]]"}(window,document),function(t,r){"use strict";t.paramGet=function(t){for(var e=decodeURIComponent(window.location.search.substring(1)).split("&"),o=0;o<e.length;o++){var n=e[o].split("=");if(n[0]===t)return void 0===n[1]||n[1]}return null},t.buttonDisable=function(t){$(t).attr("disabled",!0)},t.buttonEnable=function(t){$(t).attr("disabled",!1)},t.textSet=function(t,e){var o=$(t);o.show(),o.text(e)},t.unfilledMark=function(t,e){for(var o=0;o<t.length;o++){var n=$(t[o]);""===n.val()&&e(n)}return!0},t.cookieGet=function(t){var e=("; "+r.cookie).split("; "+t+"=");if(2===e.length)return e.pop().split(";").shift()},t.cookieSet=function(t,e){var o=new Date;o.setTime(o.getTime()+31536e6);var n=t+"="+e+("; expires="+o.toUTCString())+"; path=/";/^https:\/\//i.test(origin)&&(n+="; secure"),r.cookie=n},t.cookieDelete=function(t){r.cookie=t+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"},t.timeSince=function(t){var e=Math.floor((new Date-t)/1e3),o=Math.floor(e/31536e3);return 1<o?o+" years ago":1<(o=Math.floor(e/2592e3))?o+" months ago":1<(o=Math.floor(e/86400))?o+" days ago":1<(o=Math.floor(e/3600))?o+" hours ago":1<(o=Math.floor(e/60))?o+" minutes ago":5<e?Math.floor(e)+" seconds ago":"just now"}}(window.commento,document),function(t){"use strict";t.post=function(t,e,o){$.ajax({url:t,type:"POST",data:JSON.stringify(e),success:function(t){var e=JSON.parse(t);o(e)}})},t.get=function(t,o){$.ajax({url:t,type:"GET",success:function(t){var e=JSON.parse(t);o(e)}})}}(window.commento,document),function(o,n){"use strict";o.resetPassword=function(t){if(t.preventDefault(),o.unfilledMark(["#password","#password2"],function(t){t.css("border-bottom","1px solid red")}))if($("#password").val()===$("#password2").val()){var e={resetHex:o.paramGet("hex"),password:$("#password").val()};o.buttonDisable("#reset-button"),o.post(o.origin+"/api/reset",e,function(t){o.buttonEnable("#reset-button"),o.textSet("#err",""),t.success?"owner"===t.entity?n.location=o.origin+"/login?changed=true":$("#msg").html("Your password has been reset. You may close this window and try logging in again."):o.textSet("#err",t.message)})}else o.textSet("#err","The two passwords do not match.");else o.textSet("#err","Please make sure all fields are filled.")}}(window.commento,document);