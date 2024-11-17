import { useContext } from "react";
import { AppContext } from "../App";

export default function Output() {
  const { outputMessages } = useContext(AppContext);

  const OutputCard = ({ output }) => {
    return (
      <div className="output-card">
        <p>{output.date}</p>
        <p>{output.number}</p>
        <p className={output.status ? "sent" : "fail"}>{output.status ? "SENT" : "FAIL"}</p>
      </div>
    );
  };

  const outputElements = outputMessages.map((output) => (
    <OutputCard key={crypto.randomUUID()} output={output} />
  ));

  return (
    <div className="container">
      <h3 className="output-title">Live output</h3>
      <div className="output">
        {outputElements}
      </div>
      <div className="output-info">
        <p>Total: 20/20</p>
        <p>Sent: 3</p>
        <p>Failed: 1</p>
      </div>
    </div>
  );
}
