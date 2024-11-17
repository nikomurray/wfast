import { useContext } from "react";
import { AppContext } from "../App";
import CircularProgress from '@mui/material/CircularProgress';
export default function Qr() {
  const { qrCode } = useContext(AppContext);

  return (
    <div className="qr-container">
      <p>Vinculate your whatsapp account</p>
      <div className="qr-image">
        {qrCode ? <img src={qrCode} alt="qrcode" /> : <div className="loading-qr"><CircularProgress size="60px" /> <p>Loading QR Code...</p></div>}
      </div>
    </div>
  );
}
