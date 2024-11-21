import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const AppContext = createContext();

export default function App() {
  const [qrCode, setQrCode] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isSendingMessages, setIsSendingMessages] = useState(false);
  const [messageData, setMessageData] = useState({
    message: "",
    interval: 3,
    numbers: [],
  });
  const [socket, setSocket] = useState(null);
  const [outputMessages, setOutPutMessages] = useState([]);
  const [totalNumbers, setTotalNumbers] = useState(0);
  const [totalSent, setTotalSent] = useState(0);
  const [totalFailed, setTotalFailed] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);

  const clearAllValues = () => {
    setOutPutMessages([]);
    setTotalNumbers(0);
    setTotalSent(0);
    setTotalFailed(0);
    setCurrentCount(0);
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:3000");
    setSocket(socketInstance);

    socketInstance.on("qr", (data) => {
      setQrCode(data);
    });
    socketInstance.on("login", (data) => {
      setIsLogin(data);
      setQrCode(null);
    });
    socketInstance.on("totalNumbers", (data) => {
      setTotalNumbers(data);
    });
    socketInstance.on("report", (data) => {
      setCurrentCount((prev) => prev + 1);
      setOutPutMessages((prev) => [...prev, data]);
      setTotalSent((prev) => (data.status ? prev + 1 : prev));
      setTotalFailed((prev) => (!data.status ? prev + 1 : prev));
    });
    socketInstance.on("finish", () => {
      setIsSendingMessages(false);
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
        setOutPutMessages,
        outputMessages,
        qrCode,
        totalNumbers,
        totalSent,
        totalFailed,
        currentCount,
        clearAllValues,
      }}
    >
      <Header />
      <Dashboard />
    </AppContext.Provider>
  );
}
