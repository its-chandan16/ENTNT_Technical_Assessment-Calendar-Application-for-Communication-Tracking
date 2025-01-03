import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import Overview from "./Overview";
import Notifications from "./Notifications";
import Calendar from "./Calendar";
import CommunicationActionModal from "./CommunicationActionModal";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Sample notification counts - in a real app, these would come from a central state management system
  const notificationCounts = {
    overdue: 2,
    dueToday: 2,
    total: 4,
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <Overview
            onCompanySelect={(companies) => {
              setSelectedCompanies(companies);
              setIsModalOpen(true);
            }}
          />
        );
      case "notifications":
        return <Notifications />;
      case "calendar":
        return <Calendar />;
      default:
        return <Overview />;
    }
  };
  const handleCommunicationSubmit = (formData) => {
    // Handle the communication logging here
    console.log("Communication logged:", formData);
  };

  const NotificationBadge = ({ count }) =>
    count > 0 ? (
      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
        {count}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Communication Dashboard</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedTab("overview")}
                className={`px-3 py-2 rounded-md ${
                  selectedTab === "overview"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setSelectedTab("notifications")}
                className={`px-3 py-2 rounded-md relative ${
                  selectedTab === "notifications"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {selectedTab !== "notifications" && (
                    <NotificationBadge count={notificationCounts.total} />
                  )}
                </div>
              </button>

              <button
                onClick={() => setSelectedTab("calendar")}
                className={`px-3 py-2 rounded-md ${
                  selectedTab === "calendar"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Calendar
              </button>

              <Link
                to="/admin"
                className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 flex items-center"
              >
                <span className="mr-1">⚙️</span>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      <CommunicationActionModal
        companies={selectedCompanies}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommunicationSubmit}
      />
    </div>
  );
};

export default Dashboard;
