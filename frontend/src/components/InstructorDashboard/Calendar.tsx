import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, isSameDay } from "date-fns";

interface Session {
  _id: string;
  title: string;
  date: string; // ISO date string
}

const Calendar: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session");
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getSessionDates = () => {
    return sessions.map((session) => new Date(session.date));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);
    const sessionDates = getSessionDates();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="flex items-center justify-center border h-12"
        ></div>
      );
    }

    for (let day = 1; day <= totalDays; day++) {
      const currentDay = new Date(year, month, day);
      const isSessionDay = sessionDates.some((sessionDate) =>
        isSameDay(sessionDate, currentDay)
      );

      days.push(
        <div
          key={day}
          className={`flex items-center justify-center border h-12 ${
            isSessionDay ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + offset)
    );
    setCurrentDate(newDate);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 m-4">
      <div className="flex justify-between mb-2">
        <button
          onClick={() => changeMonth(-1)}
          className="btn btn-sm btn-outline"
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="btn btn-sm btn-outline"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <div className="font-semibold text-center">Sun</div>
        <div className="font-semibold text-center">Mon</div>
        <div className="font-semibold text-center">Tue</div>
        <div className="font-semibold text-center">Wed</div>
        <div className="font-semibold text-center">Thu</div>
        <div className="font-semibold text-center">Fri</div>
        <div className="font-semibold text-center">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
