import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import * as XLSX from "xlsx";

export default function MessageForm() {
  const [isIncorrectFile, setIsIncorrectFile] = useState(false);

  const {
    isLogin,
    messageData,
    setMessageData,
    isSendingMessages,
    setIsSendingMessages,
    socket,
  } = useContext(AppContext);

  const handleMessageChange = (e) => {
    setMessageData((prev) => ({ ...prev, message: e.target.value }));
  };

  const handleIntervalChange = (e) => {
    setMessageData((prev) => ({ ...prev, interval: e.target.value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }

    // Check MIME type or file extension
    const validExtensions = ["xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const isExcelFile =
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel" ||
      validExtensions.includes(fileExtension);

    if (!isExcelFile) {
      setIsIncorrectFile(true);
      e.target.value = "";
      return;
    }

    setIsIncorrectFile(false);
    const fileValues = await readExcelFirstColumn(file);
    setMessageData((prev) => ({ ...prev, numbers: fileValues }));
  };

  const readExcelFirstColumn = async (file) => {
    try {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Get the first sheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          // Convert sheet to JSON array with header as 1 (row-wise arrays)
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // Extract all values from the first column, ignoring the header
          const firstColumnValues = [];
          for (let i = 1; i < jsonData.length; i++) {
            const cellValue = jsonData[i][0];
            if (cellValue !== undefined && cellValue !== null) {
              firstColumnValues.push(cellValue);
            }
          }

          resolve(firstColumnValues);
        };

        reader.onerror = (error) => reject(`Error reading file: ${error}`);
        reader.readAsArrayBuffer(file);
      });
    } catch (error) {
      console.error("Error reading Excel file:", error);
      return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("messageData", messageData);
  };
  return (
    <div
      className="message-form"
      style={{
        opacity: isLogin ? "1" : "0.5",
        pointerEvents: isLogin ? "auto" : "none",
        gridColumn: isLogin ? "1/-1" : undefined,
      }}
    >
      <h2>Campaign configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="message">Set message:</label>
          <textarea
            required
            value={messageData.message}
            onChange={handleMessageChange}
            type="text"
            name="message"
            id="message"
            placeholder="Enter your message here..."
            disabled={!isLogin || isSendingMessages}
          />
        </div>
        <div className="input-field">
          <label htmlFor="file">Import numbers from an Excel file:</label>
          <input
            required
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            disabled={!isLogin || isSendingMessages}
          />
          {isIncorrectFile && (
            <p style={{ color: "#f00" }}>
              Incorrect file! Please select a .xlsx file
            </p>
          )}
        </div>
        <div className="input-field">
          <label htmlFor="interval">
            Interval between each message (seconds):
          </label>
          <input
            className="interval"
            onChange={handleIntervalChange}
            type="range"
            name="interval"
            id="interval"
            min="2"
            max="10"
            value={messageData.interval}
            disabled={!isLogin || isSendingMessages}
          />
          <span>{messageData.interval} seconds</span>
        </div>
        <input
          type="submit"
          className={`submit-btn`}
          value={isSendingMessages ? "Stop campaing" : "Start Campaing"}
          disabled={!isLogin}
          style={{ background: isSendingMessages && "#c20000" }}
        />
      </form>
    </div>
  );
}
