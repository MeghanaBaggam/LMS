import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { UserService } from "../Services/UserService";

const RequestLeave = () => {
  const [showModal, setShowModal] = useState(true);

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    mode: "full",
    start_half: "full",
    end_half: "full",
    type: "",
    reason: "",
  });

  const calculateDays = () => {
    if (!form.start_date || !form.end_date) return 0;

    const start = new Date(form.start_date);
    const end = new Date(form.end_date);

    let days = (end - start) / (1000 * 60 * 60 * 24) + 1;

    if (form.mode === "custom") {
      if (form.start_half === "second") days -= 0.5;
      if (form.end_half === "first") days -= 0.5;
    }

    return days;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitLeave = async (e) => {
    e.preventDefault();

    try {
      const days = calculateDays();

      await UserService.createLeave({
        start_date: form.start_date,
        end_date: form.end_date,
        type: form.type,
        reason: form.reason,
        days: days,
        mode: form.mode,
        start_half: form.start_half,
        end_half: form.end_half,
      });

      alert("Leave Request Submitted!");
      setShowModal(false); // CLOSE MODAL
    } catch (error) {
      console.log("Leave Request Error:", error);
      alert("Error submitting leave request");
    }
  };

  if (!showModal) return null;

  return (
    <div className="leave-modal">
      <div className="leave-modal-content">
        <div className="leave-modal-header">
          <h2>Request Leave</h2>
          <button className="close-btn" onClick={() => setShowModal(false)}>
            ✖
          </button>
        </div>

        <form onSubmit={submitLeave}>
          <label>Select Dates</label>

          <input
            type="date"
            name="start_date"
            className="leave-input"
            onChange={handleChange}
          />

          <input
            type="date"
            name="end_date"
            className="leave-input"
            onChange={handleChange}
          />

          <div className="day-type-btns">
            <button
              type="button"
              className={form.mode === "full" ? "active-leave-btn" : ""}
              onClick={() => setForm({ ...form, mode: "full" })}
            >
              Full Days
            </button>

            <button
              type="button"
              className={form.mode === "custom" ? "active-leave-btn" : ""}
              onClick={() => setForm({ ...form, mode: "custom" })}
            >
              Custom
            </button>
          </div>

          {form.mode === "custom" && (
            <div className="custom-container">
              <div>
                <label>{form.start_date}</label>
                <select
                  name="start_half"
                  className="custom-select"
                  onChange={handleChange}
                >
                  <option value="first">First Half</option>
                  <option value="second">Second Half</option>
                  <option value="full">Full Day</option>
                </select>
              </div>

              <div>
                <label>{form.end_date}</label>
                <select
                  name="end_half"
                  className="custom-select"
                  onChange={handleChange}
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

          <label>Leave Type</label>
          <select name="type" className="leave-input" onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="casual">Casual Leave</option>
          </select>

          <label>Reason</label>
          <textarea
            name="reason"
            className="leave-textarea"
            placeholder="Enter reason"
            onChange={handleChange}
          />

          <button className="submit-leave-btn" type="submit">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestLeave;
