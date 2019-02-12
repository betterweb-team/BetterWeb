// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
      // TODO move media_urls.json to LocalStorage
      const media_urls = chrome.runtime.getURL('src/resources/media_urls.json')
      fetch(media_urls)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            localStorage.setItem('media_urls', JSON.stringify(json));
        });

  }
});
