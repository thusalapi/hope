import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { PlusIcon } from "@radix-ui/react-icons";

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
}

const CalendarComponent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
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

  const eventStyleGetter = (event: Event) => {
    return {
      style: {
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "4px",
      },
    };
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
    <div className="flex flex-col h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center h-full">
          <button
            onClick={() => login()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow transition duration-150 ease-in-out"
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
            <button
              onClick={() => setShowEventForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow transition duration-150 ease-in-out flex items-center"
            >
              <PlusIcon className="mr-2" />
              Create
            </button>
          </header>
          <main className="flex-grow p-6">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "calc(100vh - 120px)" }}
              eventPropGetter={eventStyleGetter}
              className="bg-white shadow-lg rounded-lg"
            />
          </main>
        </div>
      )}

      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={createEvent}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
            <div className="mb-4">
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="startDateTime"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="endDateTime"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowEventForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-150 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition duration-150 ease-in-out"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;
