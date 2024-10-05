import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
}

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState({
    summary: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
  });

  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Login successful", response);
      setToken(response.access_token);
      setIsAuthenticated(true);
      fetchEvents(response.access_token);
    },
    onError: (error) => console.log("Login Failed", error),
    scope: "https://www.googleapis.com/auth/calendar.events",
  });

  const fetchEvents = async (accessToken: string) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
          },
        }
      );

      console.log("Fetched events:", response.data.items);

      const events = response.data.items.map((event: any) => ({
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
        description: event.description,
      }));
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const createEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating event with data:", newEvent);
    try {
      const eventToCreate = {
        summary: newEvent.summary,
        description: newEvent.description,
        start: {
          dateTime: new Date(newEvent.startDateTime).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(newEvent.endDateTime).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      console.log("Sending event to Google Calendar:", eventToCreate);

      const response = await axios.post(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        eventToCreate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Event creation response:", response);

      if (response.status === 200) {
        alert("Event created and added to Google Calendar!");
        fetchEvents(token!);
        setNewEvent({
          summary: "",
          description: "",
          startDateTime: "",
          endDateTime: "",
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please check the console for details.");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={() => login()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Load Google Calendar
        </button>
      ) : (
        <>
          <>
            <form
              onSubmit={createEvent}
              className="space-y-6 p-6 bg-white shadow-md rounded-lg mt-10 max-w-lg mx-auto"
            >
              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  name="summary"
                  id="summary"
                  value={newEvent.summary}
                  onChange={handleInputChange}
                  placeholder="Add title"
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  placeholder="Add description"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="startDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="startDateTime"
                  id="startDateTime"
                  value={newEvent.startDateTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="endDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDateTime"
                  id="endDateTime"
                  value={newEvent.endDateTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </form>
          </>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: "50px" }}
          />
        </>
      )}
    </div>
  );
};

export default CalendarComponent;
