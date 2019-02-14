const script = document.createElement('script');
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL('src/inject/article.js'));
const head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
head.insertBefore(script, head.lastChild);

function isMedia(URL) {
    chrome.storage.local.get(['media_urls'], function(result) {
        var websites = JSON.parse(result.media_urls).media_urls;
        var resultcount = 0;
        for (index in websites) {
            // console.log(websites[index][0])
            if (URL.indexOf(index) > -1) {
                var fact = websites[index][0]
                console.log(fact)
                resultcount = resultcount + 1;
            }
        }
        if (resultcount > 0) {
            console.log("Hello. This message was sent from scripts/inject.js");
            inject(document.URL, fact)
        }
    });    
}

chrome.extension.sendMessage({}, function (response) {
    window.addEventListener('load', function () {
        isMedia(document.URL);
        //Mercury.parse().then(result => console.log(result));
    });
});

function inject(url, mediafacts) {
    var htmlString = '<div id="betterweb-injected-banner"><div id="betterweb-injected-banner-content">'+'Bias: '+mediafacts.bias+', factual: '+mediafacts.factual+'</div></div>'

    //parsedDOM = new DOMParser().parseFromString(htmlString, "text/xml");
    document.body.insertAdjacentHTML('beforeend', htmlString)
}
