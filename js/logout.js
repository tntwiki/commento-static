!function(){"use strict";void 0===window.commento&&(window.commento={}),window.commento.origin="[[[.Origin]]]",window.commento.cdn="[[[.CdnPrefix]]]"}(window,document),function(o,i){"use strict";o.paramGet=function(o){for(var t=decodeURIComponent(window.location.search.substring(1)).split("&"),n=0;n<t.length;n++){var e=t[n].split("=");if(e[0]===o)return void 0===e[1]||e[1]}return null},o.buttonDisable=function(o){$(o).attr("disabled",!0)},o.buttonEnable=function(o){$(o).attr("disabled",!1)},o.textSet=function(o,t){var n=$(o);n.show(),n.text(t)},o.unfilledMark=function(o,t){for(var n=0;n<o.length;n++){var e=$(o[n]);""===e.val()&&t(e)}return!0},o.cookieGet=function(o){var t=("; "+i.cookie).split("; "+o+"=");if(2===t.length)return t.pop().split(";").shift()},o.cookieSet=function(o,t){var n=new Date;n.setTime(n.getTime()+31536e6);var e=o+"="+t+("; expires="+n.toUTCString())+"; path=/";/^https:\/\//i.test(origin)&&(e+="; secure"),i.cookie=e},o.cookieDelete=function(o){i.cookie=o+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"},o.timeSince=function(o){var t=Math.floor((new Date-o)/1e3),n=Math.floor(t/31536e3);return 1<n?n+" years ago":1<(n=Math.floor(t/2592e3))?n+" months ago":1<(n=Math.floor(t/86400))?n+" days ago":1<(n=Math.floor(t/3600))?n+" hours ago":1<(n=Math.floor(t/60))?n+" minutes ago":5<t?Math.floor(t)+" seconds ago":"just now"}}(window.commento,document),function(o,t){"use strict";o.logout=function(){o.cookieDelete("commentoOwnerToken"),t.location=o.origin+"/login"}}(window.commento,document);