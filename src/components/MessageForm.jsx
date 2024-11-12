import { useContext } from "react";
import { AppContext } from "../App";

export default function MessageForm({}) {
  const { isLogin, messageInterval, setMessageInterval } =
    useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInterval = (e) => {
    setMessageInterval(e.target.value);
  };

  return (
    <div
      className="message-form"
      style={{
        opacity: isLogin ? "1" : "0.5",
        pointerEvents: isLogin ? "auto" : "none",
        gridColumn: isLogin && "1/-1 ",
      }}
    >
      <h2>Campaing configuration</h2>
      <form onSubmit={handleSubmit} disabled={!isLogin}>
        <div className="input-field">
          <label htmlFor="message">Set message:</label>
          <textarea
            type="text"
            name="message"
            id="message"
            placeholder="Enter your message here..."
            disabled={!isLogin}
          />
        </div>
        <div className="input-field">
          <label htmlFor="file">Import numbers from an excel file:</label>
          <input type="file" name="file" id="file" disabled={!isLogin} />
        </div>
        <div className="input-field">
          <label htmlFor="file">
            Interval between each message (seconds):{" "}
          </label>
          <input
          className="interval"
            onChange={handleInterval}
            type="range"
            name="interval"
            id="interval"
            min="2"
            max="10"
            value={messageInterval}
            disabled={!isLogin}
          />
          <span>{messageInterval} seconds</span>
        </div>
        <input
          type="submit"
          className="submit-btn"
          value={"Start campaign"}
          disabled={!isLogin}
        />
      </form>
    </div>
  );
}
