function injectAnalytics () {
    const script = document.createElement('script');
    script.setAttribute("type", "module");
    script.setAttribute("src", chrome.extension.getURL('src/inject/js/article.js'));
    const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    head.insertBefore(script, head.lastChild);
}

function getBiasData(origin) {
    return new Promise(function(resolve) {
        chrome.storage.local.get(['media_urls'], function(result) {
            var websites = JSON.parse(result.media_urls).media_urls;
            var website = websites[origin]; //This is an array with [0] as data!
            resolve(website);
        }); 
    });
}

function inject(mediafacts) {
    var htmlString = `<div id="betterweb-injected-banner"><div id="betterweb-injected-banner-content">'+'Bias: '+mediafacts.bias+', factual: '+mediafacts.factual+'</div></div>`
    document.body.insertAdjacentHTML('beforeend', htmlString)
}

chrome.extension.sendMessage({}, function() { // DOM is not available without this call fsr
    window.addEventListener('load', async function() {
        var biasData = await getBiasData(location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, "")[0]);
        console.log(biasData)
        var settingsData = await retrieve.getStoredSettings(["extension_enabled", "media_bias_enabled"])
        if (biasData !== void 0 && settingsData.extension_enabled != "false" && settingsData.media_bias_enabled != "false") {
            inject(biasData[0]);
        }
    });
})

//injectAnalytics();