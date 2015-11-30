// Define Chrome Variable
var chrome;
//get url of active tab
chrome.tabs.query({
	'active': true,
	'lastFocusedWindow': true
}, function(tabs) {
	var url = tabs[0].url;
	//V1(IDX Broker Original) urls will all have a number after /idx/
	//set variables for comparison
	var og_1 = url.indexOf('/idx/' + 1);
	var og_2 = url.indexOf('/idx/' + 2);
	var og_3 = url.indexOf('/idx/' + 3);
	var og_4 = url.indexOf('/idx/' + 4);
	var og_5 = url.indexOf('/idx/' + 5);
	var og_6 = url.indexOf('/idx/' + 6);
	var og_7 = url.indexOf('/idx/' + 7);
	var og_8 = url.indexOf('/idx/' + 8);
	var og_9 = url.indexOf('/idx/' + 9);
	//Pt and Lt urls will have /idx/,/i/, or /m/
	//set variables for comparison
	var p_l = url.indexOf('/idx/');
	var p_l_i = url.indexOf('/i/');
	var p_l_m = url.indexOf('/m/');
	//is this an v1 page?
	if (og_1 > -1 || og_2 > -1 || og_3 > -1 || og_4 > -1 || og_5 > -1 || og_6 > -1 || og_7 > -1 || og_8 > -1 || og_9 > -1) {
		document.getElementById('idx-page-or-not').innerHTML = '<div class="idx-active-original">is an IDX Broker Original page</div></a><p><strong>Having an issue?</strong></p><p>Click here for <a href="is_v1.html">common support issues</a>.<br/><br/>It is time to migrate to IDX Broker <a href="http://support.idxbroker.com/customer/portal/articles/1920448-migrating-to-idx-broker-lite" target="_blank">Lite</a> or <a href="http://support.idxbroker.com/customer/portal/articles/1917489-migrating-to-platinum" target="_blank">Platinum<a/>. imFORZA help you migrate</p>';
	}
	//is this pt or lt?
	else if (p_l > -1 || p_l_i > -1 || p_l_m > -1) {
		document.getElementById('idx-page-or-not').innerHTML = '<div class="idx-active-platinum">is an IDX Broker Page (Lite or Platinum)</div><p><strong>Having an issue?</strong></p>Common issues: Missing Images, Missing Listings, etc <br/><a href="is_pt.html">Click here for more on these</a>.<br/><p>Any enhancement requests should be submitted to the <a href="http://developers.idxbroker.com/forums/forum/enhancements/" target="_blank">Developer Partner forums</a></p>';
		document.getElementById('appendages').innerHTML = '<select id="append" placeholder="Use URL appendage"><option value="none" style="color: #ddd;">No Appendage (default)</option><option value="nowrapper">Remove IDX Wrapper</option><option value="nocss">Remove IDX Custom CSS</options><option value="nosubheader">Remove IDX SubHeaders</option><option value="bare">remove wrapper, css, and sub headers</option><option value="mobile">force IDX Mobile page</option><option value="verbose">Verbose Mode</option></select><div id="log"></div>';
		var log = document.getElementById("log");
		// Adding listener
		var sel = document.getElementById("append");
		sel.addEventListener("change", function() {
			//deterimine of the currtne tab has a ? and handle
			if (sel.value !== "none") {
				if (url.indexOf('?') > -1) { /*jshint unused:false*/
					var append = '&';
				} else { /*jshint -W004 */
					var append = '?';
				}
				//add appendage from selection
				 /*jshint -W038 */
				var goto = url + append + sel.value;
				log.innerHTML = "<div class='appending-details'><p>You just appended the following variable to this page:</p><code><pre>" + sel.value + "</pre></code></div>";
				chrome.tabs.update(null, {
					url: goto
				});
			} else {
				log.innerHTML = "<p class='note'>Use the dropdown above to append a troubleshooting variable to this IDX page. For more information please view this <a href=\"https://youtu.be/yMNN78n7Dno\" target=\"_blank\">video tutorial</a>.</p>";
			}
		});
		// Create event and fire it.
		var changeEvent = document.createEvent("HTMLEvents");
		changeEvent.initEvent("change", true, true);
		sel.dispatchEvent(changeEvent);
	}
	//decalre this page as not V1, pt or lt
	else {
		document.getElementById('idx-page-or-not').innerHTML = '<div class="idx-not-active"> is not an IDX Broker Page</div><p> While this page is not an IDX Broker page, there still may be IDX elements such as widgets. <br /><br /><a href="not_idx.html">Click here for more information<a></p>';
	}
});