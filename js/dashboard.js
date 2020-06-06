!function(){"use strict";void 0===window.commento&&(window.commento={}),window.commento.origin="[[[.Origin]]]",window.commento.cdn="[[[.CdnPrefix]]]"}(window,document),function(o,i){"use strict";o.paramGet=function(o){for(var e=decodeURIComponent(window.location.search.substring(1)).split("&"),n=0;n<e.length;n++){var t=e[n].split("=");if(t[0]===o)return void 0===t[1]||t[1]}return null},o.buttonDisable=function(o){$(o).attr("disabled",!0)},o.buttonEnable=function(o){$(o).attr("disabled",!1)},o.textSet=function(o,e){var n=$(o);n.show(),n.text(e)},o.unfilledMark=function(o,e){for(var n=0;n<o.length;n++){var t=$(o[n]);""===t.val()&&e(t)}return!0},o.cookieGet=function(o){var e=("; "+i.cookie).split("; "+o+"=");if(2===e.length)return e.pop().split(";").shift()},o.cookieSet=function(o,e){var n=new Date;n.setTime(n.getTime()+31536e6);var t=o+"="+e+("; expires="+n.toUTCString())+"; path=/";/^https:\/\//i.test(origin)&&(t+="; secure"),i.cookie=t},o.cookieDelete=function(o){i.cookie=o+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"},o.timeSince=function(o){var e=Math.floor((new Date-o)/1e3),n=Math.floor(e/31536e3);return 1<n?n+" years ago":1<(n=Math.floor(e/2592e3))?n+" months ago":1<(n=Math.floor(e/86400))?n+" days ago":1<(n=Math.floor(e/3600))?n+" hours ago":1<(n=Math.floor(e/60))?n+" minutes ago":5<e?Math.floor(e)+" seconds ago":"just now"}}(window.commento,document),function(o){"use strict";o.post=function(o,e,n){$.ajax({url:o,type:"POST",data:JSON.stringify(e),success:function(o){var e=JSON.parse(o);n(e)}})},o.get=function(o,n){$.ajax({url:o,type:"GET",success:function(o){var e=JSON.parse(o);n(e)}})}}(window.commento,document),function(n){"use strict";n.registerHide=function(o){setTimeout(function(){$(o).fadeOut("fast")},5e3)},n.showGlobalMessage=function(o,e){n.textSet(o,e),n.registerHide(o)},n.globalErrorShow=function(o){n.showGlobalMessage("#global-error",o)},n.globalOKShow=function(o){n.showGlobalMessage("#global-ok",o)}}(window.commento,document),function(n,t){"use strict";n.selfGet=function(e){var o={ownerToken:n.cookieGet("commentoOwnerToken")};void 0!==o.ownerToken?n.post(n.origin+"/api/owner/self",o,function(o){if(!o.success||!o.loggedIn)return n.cookieDelete("commentoOwnerToken"),void(t.location=n.origin+"/login");n.owner=o.owner,e()}):t.location=n.origin+"/login"}}(window.commento,document),function(n){"use strict";n.vs=function(o,e){Vue.set(n.dashboard,o,e)},n.navbarFill=function(){$("#owner-name").text(n.owner.name)},n.vueConstruct=function(o){var e={settings:[{id:"installation",text:"Installation Guide",meaning:"Install Commento with HTML",selected:!1,open:n.installationOpen},{id:"general",text:"General",meaning:"Names, authentication, and export",selected:!1,open:n.generalOpen},{id:"moderation",text:"Moderation Settings",meaning:"Manage moderators, spam filtering",selected:!1,open:n.moderationOpen},{id:"statistics",text:"Analytics",meaning:"Anonymous statistics and graphs",selected:!1,open:n.statisticsOpen},{id:"import",text:"Import Comments",meaning:"Import from a different service",selected:!1,open:n.importOpen},{id:"danger",text:"Danger Zone",meaning:"Here be dragons",selected:!1,open:n.dangerOpen}],domains:[{show:!1,viewsLast30Days:n.numberify(0),commentsLast30Days:n.numberify(0),moderators:[]}],configuredOauths:{},showSettings:!1,cd:0};n.dashboard=new Vue({el:"#dashboard",data:e}),void 0!==o&&o()}}(window.commento,document),function(t){"use strict";t.settingSelect=function(o){var e=t.dashboard.$data.settings;!function(o){for(var e=t.dashboard.$data.settings,n=0;n<e.length;n++)e[n].selected=e[n].id===o}(o),$("ul.tabs li").removeClass("current"),$(".content").removeClass("current"),$(".original").addClass("current");for(var n=0;n<e.length;n++)o===e[n].id&&e[n].open()},t.settingDeselectAll=function(){for(var o=t.dashboard.$data.settings,e=0;e<o.length;e++)o[e].selected=!1}}(window.commento,document),function(i,e){"use strict";i.domainSelect=function(o){for(var e=i.dashboard.$data,n=e.domains,t=0;t<n.length;t++)n[t].domain===o?(i.vs("frozen","frozen"===n[t].state),n[t].selected=!0,e.cd=t,e.importedComments=n[t].importedComments):n[t].selected=!1;e.showSettings=!0,i.settingDeselectAll(),$(".view").hide()},i.domainDeselectAll=function(){for(var o=i.dashboard.$data.domains,e=0;e<o.length;e++)o[e].selected=!1},i.domainNewHandler=function(){var o={ownerToken:i.cookieGet("commentoOwnerToken"),name:$("#new-domain-name").val(),domain:$("#new-domain-domain").val()};i.buttonDisable("#add-site-button"),i.post(i.origin+"/api/domain/new",o,function(o){i.buttonEnable("#add-site-button"),$("#new-domain-name").val(""),$("#new-domain-domain").val(""),e.location.hash="#modal-close",o.success?i.domainRefresh(function(){i.domainSelect(o.domain),i.domainDeselectAll(),i.settingSelect("installation")}):i.globalErrorShow(o.message)})},i.domainRefresh=function(t){var o={ownerToken:i.cookieGet("commentoOwnerToken")};i.post(i.origin+"/api/domain/list",o,function(o){if(o.success){o.domains=o.domains.sort(function(o,e){var n=o.creationDate,t=e.creationDate;return n<t?-1:t<n?1:0});for(var e=0;e<o.domains.length;e++){o.domains[e].show=!0,o.domains[e].selected=!1,o.domains[e].origName=o.domains[e].name,o.domains[e].origDomain=o.domains[e].domain,o.domains[e].viewsLast30Days=i.numberify(0),o.domains[e].commentsLast30Days=i.numberify(0),o.domains[e].allowAnonymous=!o.domains[e].requireIdentification;for(var n=0;n<o.domains[e].moderators.length;n++)o.domains[e].moderators[n].timeAgo=i.timeSince(Date.parse(o.domains[e].moderators[n].addDate))}i.vs("domains",o.domains),i.vs("configuredOauths",o.configuredOauths),void 0!==t&&t()}else i.globalErrorShow(o.message)})},i.domainUpdate=function(o,e){o.requireIdentification=!o.allowAnonymous;var n={ownerToken:i.cookieGet("commentoOwnerToken"),domain:o};i.post(i.origin+"/api/domain/update",n,function(o){o.success?void 0!==e&&e(o.success):i.globalErrorShow(o.message)})},i.domainDelete=function(o,e){var n={ownerToken:i.cookieGet("commentoOwnerToken"),domain:o};i.post(i.origin+"/api/domain/delete",n,function(o){o.success?void 0!==e&&e(o.success):i.globalErrorShow(o.message)})},i.domainClear=function(o,e){var n={ownerToken:i.cookieGet("commentoOwnerToken"),domain:o};i.post(i.origin+"/api/domain/clear",n,function(o){o.success?void 0!==e&&e(o.success):i.globalErrorShow(o.message)})}}(window.commento,document),function(e){"use strict";e.installationOpen=function(){var o='<script defer src="'+e.cdn+'/js/commento.js"><\/script>\n<div id="commento"></div>\n';$("#code-div").text(o),$("pre code").each(function(o,e){hljs.highlightBlock(e)}),$(".view").hide(),$("#installation-view").show()}}(window.commento,document),function(n){"use strict";n.generalOpen=function(){$(".view").hide(),$("#general-view").show()},n.generalSaveHandler=function(){var o=n.dashboard.$data;n.buttonDisable("#save-general-button"),n.domainUpdate(o.domains[o.cd],function(){n.globalOKShow("Settings saved!"),n.buttonEnable("#save-general-button")})},n.ssoProviderChangeHandler=function(){var e=n.dashboard.$data;if(""===e.domains[e.cd].ssoSecret){var o={ownerToken:n.cookieGet("commentoOwnerToken"),domain:e.domains[e.cd].domain};n.post(n.origin+"/api/domain/sso/new",o,function(o){o.success?(e.domains[e.cd].ssoSecret=o.ssoSecret,$("#sso-secret").val(e.domains[e.cd].ssoSecret)):n.globalErrorShow(o.message)})}else $("#sso-secret").val(e.domains[e.cd].ssoSecret)}}(window.commento,document),function(a){"use strict";a.moderationOpen=function(){$(".view").hide(),$("#moderation-view").show()},a.moderatorNewHandler=function(){for(var o=a.dashboard.$data,e=$("#new-mod").val(),n={ownerToken:a.cookieGet("commentoOwnerToken"),domain:o.domains[o.cd].domain,email:e},t=-1,i=0;i<o.domains[o.cd].moderators.length;i++)if(o.domains[o.cd].moderators[i].email===e){t=i;break}-1===t?(o.domains[o.cd].moderators.push({email:e,timeAgo:"just now"}),a.buttonDisable("#new-mod-button"),a.post(a.origin+"/api/domain/moderator/new",n,function(o){a.buttonEnable("#new-mod-button"),o.success?(a.globalOKShow("Added a new moderator!"),$("#new-mod").val(""),$("#new-mod").focus()):a.globalErrorShow(o.message)})):a.globalErrorShow("Already a moderator.")},a.moderatorDeleteHandler=function(o){for(var e=a.dashboard.$data,n={ownerToken:a.cookieGet("commentoOwnerToken"),domain:e.domains[e.cd].domain,email:o},t=-1,i=0;i<e.domains[e.cd].moderators.length;i++)if(e.domains[e.cd].moderators[i].email===o){t=i;break}-1!==t&&(e.domains[e.cd].moderators.splice(t,1),a.post(a.origin+"/api/domain/moderator/delete",n,function(o){o.success?a.globalOKShow("Removed!"):a.globalErrorShow(o.message)}))}}(window.commento,document),function(d){"use strict";d.numberify=function(o){return 0===o?{zeros:"000",num:"",units:""}:o<10?{zeros:"00",num:o,units:""}:o<100?{zeros:"0",num:o,units:""}:o<1e3?{zeros:"",num:o,units:""}:(o<1e6?(e=d.numberify((o/1e3).toFixed(0))).units="K":o<1e9?(e=d.numberify((o/1e6).toFixed(0))).units="M":o<1e12&&((e=d.numberify((o/1e9).toFixed(0))).units="B"),10*e.num%10==0&&(e.num=Math.ceil(e.num)),e);var e},d.statisticsOpen=function(){var r=d.dashboard.$data,o={ownerToken:d.cookieGet("commentoOwnerToken"),domain:r.domains[r.cd].domain};$(".view").hide(),d.post(d.origin+"/api/domain/statistics",o,function(o){if($("#statistics-view").show(),o.success){var e,n,t={showPoint:!1,axisY:{onlyInteger:!0,showGrid:!1},axisX:{showGrid:!1},showArea:!0};e=o.viewsLast30Days,n=o.commentsLast30Days;for(var i=new Array,a=0;a<e.length;a++)if((e.length-a)%7==0){var s=(e.length-a)/7;i.push(s+" week"+(1<s?"s":"")+" ago")}else i.push("");new Chartist.Line("#views-graph",{labels:i,series:[e]},t),new Chartist.Line("#comments-graph",{labels:i,series:[n]},t),r.domains[r.cd].viewsLast30Days=d.numberify(e.reduce(function(o,e){return o+e},0)),r.domains[r.cd].commentsLast30Days=d.numberify(n.reduce(function(o,e){return o+e},0))}else d.globalErrorShow(o.message)})}}(window.commento,document),function(t){"use strict";t.importOpen=function(){$(".view").hide(),$("#import-view").show()},t.importDisqus=function(){var o=$("#disqus-url").val(),e=t.dashboard.$data,n={ownerToken:t.cookieGet("commentoOwnerToken"),domain:e.domains[e.cd].domain,url:o};t.buttonDisable("#disqus-import-button"),t.post(t.origin+"/api/domain/import/disqus",n,function(o){t.buttonEnable("#disqus-import-button"),o.success?($("#disqus-import-button").hide(),t.globalOKShow("Imported "+o.numImported+" comments!")):t.globalErrorShow(o.message)})},t.importCommento=function(){var o=$("#commento-url").val(),e=t.dashboard.$data,n={ownerToken:t.cookieGet("commentoOwnerToken"),domain:e.domains[e.cd].domain,url:o};t.buttonDisable("#commento-import-button"),t.post(t.origin+"/api/domain/import/commento",n,function(o){t.buttonEnable("#commento-import-button"),o.success?($("#commento-import-button").hide(),t.globalOKShow("Imported "+o.numImported+" comments!")):t.globalErrorShow(o.message)})}}(window.commento,document),function(e,n){"use strict";e.dangerOpen=function(){$(".view").hide(),$("#danger-view").show()},e.domainDeleteHandler=function(){var o=e.dashboard.$data;e.domainDelete(o.domains[o.cd].domain,function(o){o&&(n.location=e.origin+"/dashboard")})},e.domainClearHandler=function(){var o=e.dashboard.$data;e.domainClear(o.domains[o.cd].domain,function(o){o&&(n.location=e.origin+"/dashboard")})},e.domainFreezeHandler=function(){var o=e.dashboard.$data;o.domains[o.cd].state="frozen",e.domainUpdate(o.domains[o.cd]),n.location.hash="#modal-close"},e.domainUnfreezeHandler=function(){var o=e.dashboard.$data;o.domains[o.cd].state="unfrozen",e.domainUpdate(o.domains[o.cd]),n.location.hash="#modal-close"}}(window.commento,document),function(n){"use strict";n.domainExportBegin=function(){var o=n.dashboard.$data,e={ownerToken:n.cookieGet("commentoOwnerToken"),domain:o.domains[o.cd].domain};n.buttonDisable("#domain-export-button"),n.post(n.origin+"/api/domain/export/begin",e,function(o){n.buttonEnable("#domain-export-button"),o.success?n.globalOKShow("Data export operation has been successfully queued. You will receive an email."):n.globalErrorShow(o.message)})}}(window.commento,document);