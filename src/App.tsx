import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("connected");
      setSocket(ws);
    };

    ws.onmessage = (message) => {
      console.log(message.data);
      setLatestMessage(message.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => socket.send(message)} style={{ color: "black" }}>
        Send
      </button>
      <div>{latestMessage}</div>
    </div>
  );
}

export default App;
