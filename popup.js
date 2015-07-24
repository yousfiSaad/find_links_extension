
function renderStatus(hrefs) {
  var col = hrefs.reduce(function(prevL, currentHref){
    var currentL = currentHref.length;
    return Math.max(prevL, currentL);
  }, 0);

  var text = hrefs.join('\n');

  var textArea = document.getElementById('links');

  textArea.setAttribute('cols', col + 10);
  textArea.setAttribute('rows', hrefs.length);

  textArea.textContent = text;

  textArea.focus();
  textArea.select();
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "links_found" ) {


      var hrefs = request.hrefs.filter(function(href){

        if( typeof href !== 'string'){
          return false;
        }

        var fileExtension = href.split('.').pop();
        return ( ['zip', 'rar'].indexOf(fileExtension) !== -1 );

      });
      renderStatus(hrefs);
    }
  }
);

document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({
      active: true,
       currentWindow: true
     }, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });

});
