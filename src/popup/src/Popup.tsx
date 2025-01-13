import { useEffect, useState } from 'react';

function App() {
  const [loadingMessage] = useState("收集网页中");

  useEffect(() => {
    chrome.storage.sync.get(['requestUrl'], function(result) {
      if (result.requestUrl) {
        const requestUrl = result.requestUrl;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var activeTab = tabs[0];
          if (activeTab.url && activeTab.title) {
            makeAPICall(activeTab.url, activeTab.title, requestUrl);
          } else {
            console.error("URL or title is undefined");
          }
        });
      } else {
        chrome.runtime.openOptionsPage();
      }
    });
  }, []);

  function makeAPICall(url: string, title: string, requestUrl: string) {
    var data = {
      "type": "url",
      "content": url,
      "title": title,
    };
    fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        window.close(); // Close the window after successful API call
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div>{loadingMessage}</div>
    </>
  );
}

export default App;
