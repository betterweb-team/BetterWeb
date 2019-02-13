function isMedia(origin) {
    chrome.storage.local.get(['media_urls'], function(result) {
        var websites = JSON.parse(result.media_urls).media_urls;
        var website = websites[origin][0];
        if (origin !== void 0) {
            inject(website);
        }
    });    
}


window.addEventListener('load', function () {
    isMedia(location.host.split(".")[0] == "www" ? location.host.replace(/www\./g, "") : location.host);
});


function inject(mediafacts) {
    var htmlString = '<div id="betterweb-injected-banner"><div id="betterweb-injected-banner-content">'+'Bias: '+mediafacts.bias+', factual: '+mediafacts.factual+'</div></div>'
    document.body.insertAdjacentHTML('beforeend', htmlString)
}
