import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { useState } from "react";
import { createContext } from "react";
export const AppContext = createContext();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [messageInterval , setMessageInterval] = useState(3)
  return (
    <AppContext.Provider value={{ isLogin, setIsLogin , messageInterval , setMessageInterval }}>
      <Header />
      <Dashboard />
    </AppContext.Provider>
  );
}
