
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var allLinks = document.querySelectorAll('a');

      var hrefs = [];
      for (var i in allLinks) {
        var a = allLinks[i];
        hrefs.push(a.href);
      };

      chrome.runtime.sendMessage({ "message": "links_found", "hrefs": hrefs });
    }
  }
  );
