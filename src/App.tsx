import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    const _ws = new WebSocket("ws://127.0.0.1:8899/ws")
    setWs(_ws);
    
    _ws.addEventListener('close', (event) => {
      console.log('The connection has been closed successfully.');
    });

    if (!ws) return
    ws.onopen = () => {   // 연결!
      console.log("connected!!");
    };
  }, []);

  const sendMessage = () => {
    if (!ws) return
    const msg = {
      "cmd" : "generateClipboard",
      "section": 3,
      "owner": 27,
      "bookCode": 609,
      "pageNumber": 59,
      "text": "번역된 텍스트",
      "bgImage": "fq22323==",
      "bgWithStrokesImage": "f341341",
      "strokes": [
        {
          "version": 1,
          "strokeUUID": "5234234",
          "deleteFlag": 0,
          "color": -16777216,
          "thickness": 0.2
        }
      ]
    }
    ws.send(JSON.stringify(msg));

    ws.onmessage = (evt: MessageEvent) => {
      console.log(evt);
      console.log(evt.data);
    };
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendMessage}>Send message to server</button>
      </header>
    </div>
  );
}

export default App;
