chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
      const media_urls = chrome.runtime.getURL('src/shared/json/media_urls.json')
      fetch(media_urls)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            chrome.storage.local.set({'media_urls': JSON.stringify(json)});
        });
  }
});
