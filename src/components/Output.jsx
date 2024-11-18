import { useContext } from "react";
import { AppContext } from "../App";

export default function Output() {
  const { outputMessages, totalNumbers, totalSent, totalFailed, currentCount } =
    useContext(AppContext);

  const OutputCard = ({ output }) => {
    return (
      <div className="output-card">
        <p>{output.date}</p>
        <p>{output.number}</p>
        <p className={output.status ? "sent" : "fail"}>
          {output.status ? "SENT" : "FAIL"}
        </p>
      </div>
    );
  };

  const outputElements = outputMessages.map((output) => (
    <OutputCard key={crypto.randomUUID()} output={output} />
  ));

  return (
    <div className="container">
      <h3 className="output-title">Live output</h3>
      <div className="output">{outputElements}</div>
      <div className="output-info">
        <p>{`Total: ${currentCount}/${totalNumbers}`}</p>
        <p>
          Sent: <span className="sent">{totalSent}</span>
        </p>
        <p>
          Failed: <span className="fail">{totalFailed}</span>
        </p>
      </div>
    </div>
  );
}
