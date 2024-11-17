import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const AppContext = createContext();

export default function App() {
  const [qrCode, setQrCode] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isSendingMessages, setIsSendingMessages] = useState(false);
  const [messageData, setMessageData] = useState({
    message: "",
    interval: 3,
    numbers: [],
  });
  const [socket, setSocket] = useState(null);
  const [outputMessages, setOutPutMessages] = useState([
    { date: "14:00hs", number: "1169427833", status: true },
    { date: "14:00hs", number: "1169427833", status: false },
    { date: "14:00hs", number: "1169427833", status: true },
    { date: "14:00hs", number: "1169427833", status: true },
    { date: "14:00hs", number: "1169427833", status: false },
    { date: "14:00hs", number: "1169427833", status: true },
    { date: "14:00hs", number: "1169427833", status: true },
    { date: "14:00hs", number: "1169427833", status: false },
    { date: "14:00hs", number: "1169427833", status: true },
  ]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("qr", (data) => {
      setQrCode(data);
    });
    socketInstance.on("login", (data) => {
      setIsLogin(data);
    });
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
        outputMessages,
        qrCode,
      }}
    >
      <Header />
      <Dashboard />
    </AppContext.Provider>
  );
}
