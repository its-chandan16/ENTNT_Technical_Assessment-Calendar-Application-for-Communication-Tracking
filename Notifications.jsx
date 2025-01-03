import React from "react";
import { Bell, Clock, AlertCircle, MoreHorizontal } from "lucide-react";

const Notifications = () => {
  const overdueComms = [
    {
      id: 1,
      company: "Servicenow",
      type: "Phone Call",
      dueDate: "2024-12-25",
      description: "Quarterly review call with client stakeholders",
      priority: "high",
    },
    {
      id: 2,
      company: "Codestruck",
      type: "LinkedIn Post",
      dueDate: "2024-12-26",
      description: "Share product launch announcement",
      priority: "medium",
    },
  ];

  const todayComms = [
    {
      id: 3,
      company: "Digitization",
      type: "Message",
      dueDate: "2024-12-28",
      description: "Send connection request and introduction",
      priority: "low",
    },
    {
      id: 4,
      company: "Global Solutions",
      type: "Email",
      dueDate: "2024-12-28",
      description: "Follow up on partnership proposal",
      priority: "high",
    },
  ];

  const icons = {
    "Phone Call": "📞",
    "LinkedIn Post": "💬",
    Email: "📧",
    Message: "💭",
  };

  const priorityClasses = {
    high: "text-red-600 bg-red-50 border-red-200",
    medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    low: "text-green-600 bg-green-50 border-green-200",
  };

  const NotificationCard = ({ comm, isOverdue }) => (
    <div className="p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-grow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{icons[comm.type] || "📌"}</span>
              <span className="font-medium text-gray-900">{comm.company}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${priorityClasses[comm.priority]}`}
              >
                {comm.priority.charAt(0).toUpperCase() + comm.priority.slice(1)}
              </span>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-600">{comm.description}</p>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                isOverdue ? "text-red-600" : "text-gray-500"
              } font-medium`}
            >
              {isOverdue ? "Overdue: " : "Due: "}
              {new Date(comm.dueDate).toLocaleDateString()}
            </span>
            {!isOverdue && (
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                Mark Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = (title, comms, isOverdue, icon, bgColor) => (
    <div className={`bg-white rounded-lg shadow-sm border ${bgColor}`}>
      <div className={`p-4 border-b ${bgColor}`}>
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {comms.length > 0 ? (
          comms.map((comm) => (
            <NotificationCard key={comm.id} comm={comm} isOverdue={isOverdue} />
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            {isOverdue
              ? "No overdue communications"
              : "No communications due today"}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Notifications
              </h2>
              <p className="text-sm text-gray-600">
                Track your communication tasks
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {overdueComms.length} Overdue
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              {todayComms.length} Due Today
            </span>
          </div>
        </div>
      </div>
      {renderSection(
        "Overdue Communications",
        overdueComms,
        true,
        <AlertCircle className="h-5 w-5 text-red-500" />,
        "bg-red-50"
      )}
      {renderSection(
        "Due Today",
        todayComms,
        false,
        <Clock className="h-5 w-5 text-yellow-600" />,
        "bg-yellow-50"
      )}
    </div>
  );
};

export default Notifications;
