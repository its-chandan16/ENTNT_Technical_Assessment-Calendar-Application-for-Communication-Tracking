import  { useState, useEffect } from "react";


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState("month"); // 'month', 'week', 'day'
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2024-12-28",
      startTime: "09:00",
      endTime: "10:00",
      company: "TechCorp Inc",
      type: "LinkedIn Post",
      status: "scheduled",
      description: "Create and schedule product launch announcement post",
      priority: "high",
      attendees: ["Marketing Team", "Product Manager"],
    },
    {
      id: 2,
      date: "2024-12-28",
      startTime: "14:00",
      endTime: "15:00",
      company: "Global Solutions",
      type: "Email",
      status: "completed",
      description: "Follow-up email regarding partnership proposal",
      priority: "medium",
      attendees: ["Jane Smith", "Partner Relations"],
    },
    {
      id: 3,
      date: "2024-12-29",
      startTime: "11:30",
      endTime: "12:30",
      company: "InnovateNow",
      type: "Phone Call",
      status: "overdue",
      description: "Quarterly review call with client stakeholders",
      priority: "high",
      attendees: ["Client Success Team", "Account Manager"],
    },
    {
      id: 4,
      date: "2024-12-30",
      startTime: "13:00",
      endTime: "13:30",
      company: "Digital Dynamics",
      type: "LinkedIn Message",
      status: "scheduled",
      description: "Send connection request and introduction message",
      priority: "low",
      attendees: ["Business Development"],
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    date: "",
    startTime: "",
    endTime: "",
    company: "",
    type: "",
    description: "",
    priority: "medium",
    attendees: [],
  });

  // View Options
  const viewOptions = [
    { label: "Month", value: "month" },
    { label: "Week", value: "week" },
    { label: "Day", value: "day" },
  ];

  // Communication Types
  const communicationTypes = [
    "LinkedIn Post",
    "LinkedIn Message",
    "Email",
    "Phone Call",
    "Video Call",
    "In-Person Meeting",
    "Other",
  ];

  // Priority Options
  const priorityOptions = [
    { label: "High", value: "high", color: "bg-red-100 text-red-800" },
    {
      label: "Medium",
      value: "medium",
      color: "bg-yellow-100 text-yellow-800",
    },
    { label: "Low", value: "low", color: "bg-green-100 text-green-800" },
  ];

  // Helper Functions
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const startDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
      ...(view === "week" && { week: "numeric" }),
      ...(view === "day" && { day: "numeric" }),
    });
  };

  // Event Management Functions
  const addEvent = (event) => {
    setEvents([...events, { ...event, id: events.length + 1 }]);
    setShowEventModal(false);
    setNewEvent({
      date: "",
      startTime: "",
      endTime: "",
      company: "",
      type: "",
      description: "",
      priority: "medium",
      attendees: [],
    });
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
    setSelectedEvent(null);
  };

  const updateEvent = (eventId, updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
    setSelectedEvent(null);
  };

  // Modal Components
  const EventModal = () => {
    // Create local state for form data
    const [formData, setFormData] = useState(
      selectedEvent
        ? { ...selectedEvent }
        : {
            date: "",
            startTime: "",
            endTime: "",
            company: "",
            type: "",
            description: "",
            priority: "medium",
            attendees: [],
          }
    );

    // Update local state when selectedEvent changes
    useEffect(() => {
      if (selectedEvent) {
        setFormData({ ...selectedEvent });
      }
    }, [selectedEvent]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedEvent) {
        updateEvent(selectedEvent.id, formData);
      } else {
        addEvent(formData);
      }
      setShowEventModal(false);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </h3>
            <button
              onClick={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select type...</option>
                  {communicationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                {selectedEvent && (
                  <button
                    type="button"
                    onClick={() => deleteEvent(selectedEvent.id)}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {selectedEvent ? "Update" : "Add"} Event
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  // Calendar View Components
  const MonthView = () => (
    <div className="grid grid-cols-7 gap-px bg-gray-200">
      {Array.from({ length: startDayOfMonth(currentDate) }).map((_, index) => (
        <div key={`empty-${index}`} className="h-32 bg-gray-50" />
      ))}
      {Array.from({ length: daysInMonth(currentDate) }).map((_, index) => {
        const day = index + 1;
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        );
        const isToday = new Date().toDateString() === date.toDateString();
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        const dayEvents = events.filter(
          (event) => new Date(event.date).toDateString() === date.toDateString()
        );

        return (
          <div
            key={day}
            onClick={() => setSelectedDate(date)}
            className={`
              h-32 bg-white p-2 cursor-pointer
              ${isToday ? "bg-blue-50" : ""}
              ${isSelected ? "ring-2 ring-blue-500" : ""}
              hover:bg-gray-50
            `}
          >
            <div className="flex justify-between items-start">
              <span
                className={`text-sm font-semibold ${
                  isToday ? "text-blue-600" : ""
                }`}
              >
                {day}
              </span>
              {dayEvents.length > 0 && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {dayEvents.length}
                </span>
              )}
            </div>
            <div className="mt-1 space-y-1 overflow-y-auto max-h-24">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setShowEventModal(true);
                  }}
                  className={`
                    text-xs p-1 rounded truncate cursor-pointer
                    ${
                      priorityOptions.find((p) => p.value === event.priority)
                        ?.color
                    }
                  `}
                >
                  {event.startTime} - {event.company}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const WeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {Array.from({ length: 7 }).map((_, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const dayEvents = events.filter(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString()
          );
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <div key={index} className="min-h-[200px] bg-white p-2">
              <div
                className={`text-sm font-semibold mb-2 ${
                  isToday ? "text-blue-600" : ""
                }`}
              >
                {date.toLocaleDateString("default", {
                  weekday: "short",
                  day: "numeric",
                })}
              </div>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventModal(true);
                    }}
                    className={`
                      text-xs p-2 rounded cursor-pointer
                      ${
                        priorityOptions.find((p) => p.value === event.priority)
                          ?.color
                      }
                    `}
                  >
                    <div className="font-semibold">
                      {event.startTime} - {event.endTime}
                    </div>
                    <div>{event.company}</div>
                    <div className="text-gray-600">{event.type}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const DayView = () => {
    const dayEvents = events
      .filter(
        (event) =>
          new Date(event.date).toDateString() === currentDate.toDateString()
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>
        <div className="divide-y">
          {dayEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setShowEventModal(true);
              }}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="text-lg">{event.company}</div>
                  <div className="text-gray-600">{event.type}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {event.description}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    priorityOptions.find((p) => p.value === event.priority)
                      ?.color
                  }`}
                >
                  {event.priority}
                </span>
              </div>
            </div>
          ))}
          {dayEvents.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    );
  };

  // Navigation Functions
  const goToPreviousUnit = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToNextUnit = () => {
    const newDate = new Date(currentDate);
    switch (view) {
      case "month":
        newDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "week":
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case "day":
        newDate.setDate(currentDate.getDate() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Main Component Return
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">{formatDate(currentDate)}</h1>
            <div className="flex space-x-2">
              <button
                onClick={goToPreviousUnit}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ←
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                Today
              </button>
              <button
                onClick={goToNextUnit}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                →
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex rounded-md shadow-sm">
              {viewOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setView(option.value)}
                  className={`
                        px-4 py-2 text-sm font-medium
                        ${
                          view === option.value
                            ? "bg-blue-100 text-blue-700"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }
                        ${option.value === "month" ? "rounded-l-md" : ""}
                        ${option.value === "day" ? "rounded-r-md" : ""}
                        border border-gray-300
                      `}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedEvent(null);
                setShowEventModal(true);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Event
            </button>
            {/* ADD NEW NAVIGATION LINKS HERE */}
            {/* <Link
              to="/"
              className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/admin"
              className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 flex items-center"
            >
              <span className="mr-1">⚙️</span>
              Admin
            </Link> */}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-semibold text-gray-700 bg-gray-100"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}

      {showEventModal && <EventModal />}
    </div>
  );
};

export default Calendar;
