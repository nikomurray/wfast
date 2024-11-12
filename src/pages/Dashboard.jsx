import Qr from "../components/Qr";
import MessageForm from "../components/MessageForm";
import { AppContext } from "../App";
import { useContext } from "react";
export default function Dashboard() {
  const { isLogin} = useContext(AppContext);

  return (
    <div className="container">
      <div className="dashboard">
        {!isLogin && <Qr />}
        <MessageForm />
      </div>
    </div>
  );
}
  