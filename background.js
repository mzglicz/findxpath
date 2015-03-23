function click(e) {
	chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
		console.log("background.js : click()");
		var specTab = tabs[0];
		// var s = "";
		// for (var key in specTab) {
		// 	if (specTab.hasOwnProperty(key)) {
		// 		s += key;
		// 	}
		// }
		// console.log(s);
		chrome.tabs.insertCSS(specTab.id, {file:"mstyle.css"});
		chrome.tabs.executeScript(specTab.id, {file:"script.js"});
	});
}

chrome.browserAction.onClicked.addListener(click);