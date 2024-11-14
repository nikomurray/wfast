import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const AppContext = createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSendingMessages, setIsSendingMessages] = useState(false);
  const [messageData, setMessageData] = useState({
    message: "",
    interval: 3,
    numbers: [],
  });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        messageData,
        setMessageData,
        isSendingMessages,
        setIsSendingMessages,
        socket,
      }}
    >
      <Header />
      <Dashboard />
    </AppContext.Provider>
  );
}
