function getBiasData(hostName) {
    return new Promise(function(resolve) {
        chrome.storage.local.get(['media_urls'], function(result) {
            var websites = JSON.parse(result.media_urls).media_urls;
            var website = websites[hostName]; //This is an array with [0] as data!
            if (website === void 0) { // Page not listed 
                resolve(void 0)
            } else {
                resolve(website[0]);
            }
        });
    });
}

async function renderPopup(data) {
    var biasData = await getBiasData(data.hostName);
    if (biasData) {
        document.querySelector("html").innerHTML = biasData.bias + " " + biasData.factual;
    }

}

window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id, { from: 'popup', subject: 'getData' },
            renderPopup);
    });
});