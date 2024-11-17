import { useContext } from "react";
import { AppContext } from "../App";

export default function Qr() {
  const { qrCode } = useContext(AppContext);

  return (
    <div className="qr-container">
      <p>Vinculate your whatsapp account</p>
      <div className="qr-image">
        {qrCode ? <img src={qrCode} alt="qrcode" /> : <p>Loading QR Code...</p>}
      </div>
    </div>
  );
}
