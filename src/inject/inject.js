function isMedia (URL) {
    return true; // TODO Remove for production
}

chrome.extension.sendMessage({}, function(response) {
	window.addEventListener('load', function () {
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//alert("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

        if (isMedia(document.URL) ) {
            console.log("Hello. This message was sent from scripts/inject.js");
            inject(document.URL)
        }

	});
});

function inject (url) {
    var htmlString = '<div id="betterweb-injected-banner"><div id="betterweb-injected-banner-content">This is your banner text, centered and fixed at 800px in width</div></div>'

    //parsedDOM = new DOMParser().parseFromString(htmlString, "text/xml");
    document.body.insertAdjacentHTML('beforeend', htmlString)
}
