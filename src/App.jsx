import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [messageData, setMessageData] = useState({
    message: "",
    interval: 3,
    numbers: [],
  });

  return (
    <AppContext.Provider
      value={{ isLogin, setIsLogin, messageData, setMessageData}}
    >
      <Header />
      <Dashboard />
    </AppContext.Provider>
  );
}
