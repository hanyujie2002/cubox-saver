import { useState, useEffect } from 'react';

function Options() {
  const [requestUrl, setRequestUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(['requestUrl'], function(result) {
      if (result.requestUrl) {
        setRequestUrl(result.requestUrl);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.sync.set({ requestUrl }, function() {
      setStatus('Options saved.');
      setTimeout(() => {
        setStatus('');
      }, 2000);
    });
  };

  return (
    <div>
      <h1>Extension Options</h1>
      <label htmlFor="requestUrl">API 链接：</label>
      <input
        type="text"
        id="requestUrl"
        value={requestUrl}
        onChange={(e) => setRequestUrl(e.target.value)}
      />
      <button onClick={handleSave}>保存</button>
      <p>{status}</p>
    </div>
  );
}

export default Options;
