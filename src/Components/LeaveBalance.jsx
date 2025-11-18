import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { Doughnut } from 'react-chartjs-2';
import { Chart as chartjs,ArcElement,Tooltip,Legend } from 'chart.js';

chartjs.register(ArcElement,Tooltip,Legend)
export const LeaveBalance = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const used=20-user.leave_balance;

  const chartData={
    labels:["Used","Available"],
    datasets:[
      {
        data:[used,user.leave_balance],
        backgroundColor: ["#c0392b", "#f1c40f"],
        hoverBackgroundColor: ["#e74c3c", "#f7dc6f"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='leave-balance-main'>
      
      <div className='employee-card'>
        <FaUserCircle className="lb-avatar" />
        <p className='lb-id'>{user.id}</p>
        <h3 className='lb-name'>{user.name}</h3>
        <p className='lb-email'>{user.email}</p>
        <p className='lb-role'>{user.role}</p>
        <p className='lb-report'>Reporting To:{user.manager?.name||"-"}</p>
        <p className='lb-leave'>Leave Balance:{user.leave_balance}</p>
      </div>

<div className="lb-chart-section">
        <h3 className="lb-chart-title">My Leave Balance</h3>
        <Doughnut data={chartData} width={250} height={250} />

        <div className="lb-chart-legend">
          <div className="lb-legend-item">
            <span className="balance-color"></span> Balance: {user.leave_balance}/20
          </div>
          <div className="lb-legend-item">
          </div>
        </div>
      </div>
    

    <div className='lb-calender'>
      <Calendar/>
      <div className='lb-calendar-legend'>
        <span className="dot today-dot"></span> Today
          <span className="dot leave-dot"></span> Leave
          <span className="dot holiday-dot"></span> Holiday
      </div>

    </div>
</div>

  );
};
export default LeaveBalance;
