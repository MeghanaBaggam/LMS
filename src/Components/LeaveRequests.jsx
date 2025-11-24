import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const RequestLeave = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mode, setMode] = useState("full"); // full / custom
  const [startHalf, setStartHalf] = useState("full"); // first / second / full
  const [endHalf, setEndHalf] = useState("full");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");

  // Calculate leave days
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let days = (end - start) / (1000 * 60 * 60 * 24) + 1;

    // Custom half-days logic
    if (mode === "custom") {
      if (startHalf === "second") days -= 0.5;
      if (endHalf === "first") days -= 0.5;
    }

    return days;
  };

  const submitLeave = async () => {
    try {
      const days = calculateDays();

      await axios.post(
        "http://127.0.0.1:8000/api/leaves",
        {
          start_date: startDate,
          end_date: endDate,
          type: leaveType,
          reason,
          days,
          mode,
          start_half: startHalf,
          end_half: endHalf,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Leave Request Submitted!");
      onClose();
    } catch (error) {
      console.log("Leave Request Error:", error);
      alert("Error submitting leave request");
    }
  };

  return (
    <div className="leave-modal">
      <div className="leave-modal-content">
        <div className="leave-modal-header">
          <h2>Request Leave</h2>
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Date Selection */}
        <label>Select Dates</label>
        <input
          type="date"
          className="leave-input"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="leave-input"
          onChange={(e) => setEndDate(e.target.value)}
        />

        {/* Buttons */}
        <div className="day-type-btns">
          <button
            className={mode === "full" ? "active-leave-btn" : ""}
            onClick={() => setMode("full")}
          >
            Full Days
          </button>

          <button
            className={mode === "custom" ? "active-leave-btn" : ""}
            onClick={() => setMode("custom")}
          >
            Custom
          </button>
        </div>

        {/* Custom Half-Day UI */}
        {mode === "custom" && (
          <div className="custom-container">
            <div>
              <label>{startDate}</label>
              <select
                className="custom-select"
                onChange={(e) => setStartHalf(e.target.value)}
              >
                <option value="first">First Half</option>
                <option value="second">Second Half</option>
                <option value="full">Full Day</option>
              </select>
            </div>

            <div>
              <label>{endDate}</label>
              <select
                className="custom-select"
                onChange={(e) => setEndHalf(e.target.value)}
              >
                <option value="first">First Half</option>
                <option value="second">Second Half</option>
                <option value="full">Full Day</option>
              </select>
            </div>
          </div>
        )}

        <p style={{ marginTop: "10px" }}>
          <strong>{calculateDays()}</strong> day(s) requested
        </p>

        {/* Leave Type */}
        <label>Leave Type</label>
        <select
          className="leave-input"
          onChange={(e) => setLeaveType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="paid">Paid Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="unpaid">Unpaid Leave</option>
        </select>

        {/* Reason */}
        <label>Reason</label>
        <textarea
          className="leave-textarea"
          placeholder="Enter reason"
          onChange={(e) => setReason(e.target.value)}
        />

        <button className="submit-leave-btn" onClick={submitLeave}>
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default RequestLeave;
