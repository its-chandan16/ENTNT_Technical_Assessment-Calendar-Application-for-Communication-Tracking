import { useState } from "react";
import { Link } from "react-router-dom";
import AdminCompanies from "./AdminCompanies";
import AdminCommunicationMethods from "./AdminCommunicationMethods";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("companies");

  const renderContent = () => {
    switch (selectedTab) {
      case "companies":
        return <AdminCompanies />;
      case "communication-methods":
        return <AdminCommunicationMethods />;
      default:
        return <AdminCompanies />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedTab("companies")}
                className={`px-3 py-2 rounded-md ${
                  selectedTab === "companies"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Companies
              </button>
              <button
                onClick={() => setSelectedTab("communication-methods")}
                className={`px-3 py-2 rounded-md ${
                  selectedTab === "communication-methods"
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Communication Methods
              </button>
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                User Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Companies</h3>
            <p className="text-2xl font-bold">2</p>
            <p className="text-green-500 text-sm">Active</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Communication Methods</h3>
            <p className="text-2xl font-bold">5</p>
            <p className="text-blue-500 text-sm">Configured</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Mandatory Methods</h3>
            <p className="text-2xl font-bold">3</p>
            <p className="text-orange-500 text-sm">Required</p>
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
