var pageData = {};

var hostname = location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/, "")
hostname = hostname ? hostname[0] : ""
pageData.hostname = hostname

chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'getData')) {
        response(pageData);
    }
});