function getBiasData(origin) {
    return new Promise(function(resolve) {
        chrome.storage.local.get(['media_urls'], function(result) {
            var websites = JSON.parse(result.media_urls).media_urls;
            var website = websites[origin]; //This is an array with [0] as data!
            resolve(website);
        });
    });
}

(async function main() {
    var biasData = await getBiasData(location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, "")[0])

    chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showPageAction'
    });

    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        if ((msg.from === 'popup') && (msg.subject === 'getData') && biasData) {
            response({ data: biasData[0], match: true });
        } else {
            response({ match: false });
        }
    });
})()