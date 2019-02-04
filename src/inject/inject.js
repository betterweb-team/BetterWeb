function isMedia (URL) {
    return true; // TODO Remove for production
}

chrome.extension.sendMessage({}, function(response) {
	window.addEventListener('load', function inject() {
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		//alert("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

        if (isMedia(document.URL) ) {
            console.log("Hello. This message was sent from scripts/inject.js");
        }

	});
});