import React, { useState } from "react";

// Sample data
const initialCompanies = [
  {
    id: 1,
    name: "TechCorp Inc",
    location: "San Francisco, CA",
    communications: [
      {
        type: "LinkedIn Post",
        date: "2024-12-20",
        notes: "Shared company update",
      },
      { type: "Email", date: "2024-12-15", notes: "Quarterly review" },
    ],
  },
  {
    id: 2,
    name: "Global Solutions Ltd",
    location: "London, UK",
    communications: [
      { type: "LinkedIn Message", date: "2024-12-22", notes: "Introduction" },
      { type: "Email", date: "2024-12-18", notes: "Follow-up meeting" },
    ],
  },
];

const Overview = ({ onCompanySelect }) => {
  const [companies] = useState(initialCompanies);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(new Set());

  const handleCompanySelection = (companyId) => {
    setSelectedCompanyIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(companyId) ? newSet.delete(companyId) : newSet.add(companyId);
      return newSet;
    });
  };

  // Company card component
  const CompanyCard = ({ company }) => (
    <div
      className={`bg-white rounded-lg shadow-md transition-all p-4 cursor-pointer hover:shadow-lg hover:bg-blue-50 ${
        selectedCompanyIds.has(company.id) ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => handleCompanySelection(company.id)}
    >
      <div className="bg-gray-50 -m-4 mb-4 p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-gray-800">{company.name}</h3>
          <button
            className="p-1 rounded-full border border-gray-300 hover:bg-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              handleCompanySelection(company.id);
            }}
          >
            {selectedCompanyIds.has(company.id) ? "✓" : ""}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-600 flex items-center">
          <span className="mr-2">📍</span>
          {company.location}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Recent Communications</h4>
          {company.communications.map((comm, idx) => (
            <div
              key={idx}
              className="flex items-center p-2 bg-gray-50 rounded hover:bg-gray-100"
              title={comm.notes}
            >
              <span className="mr-2">
                {comm.type === "LinkedIn Post" && "💬"}
                {comm.type === "Email" && "📧"}
                {comm.type === "Phone Call" && "📞"}
                {comm.type === "LinkedIn Message" && "💭"}
              </span>
              <span className="text-sm text-gray-700">{comm.type}</span>
              <span className="ml-auto text-sm text-gray-500">{comm.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Stats Overview Component
  const StatsOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Communications</h3>
        <p className="text-2xl font-bold text-gray-800">24</p>
        <p className="text-green-500 text-sm">↑ 12% from last month</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Active Companies</h3>
        <p className="text-2xl font-bold text-gray-800">8</p>
        <p className="text-blue-500 text-sm">↑ 2 new this month</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Pending Tasks</h3>
        <p className="text-2xl font-bold text-gray-800">5</p>
        <p className="text-orange-500 text-sm">Due this week</p>
      </div>
    </div>
  );

  // Floating action button for logging communication
  const ActionButton = selectedCompanyIds.size > 0 && (
    <button
      onClick={() =>
        onCompanySelect(companies.filter((c) => selectedCompanyIds.has(c.id)))
      }
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center space-x-2"
    >
      <span>Log Communication</span>
      <span className="bg-blue-500 px-2 py-1 rounded-full text-sm">
        {selectedCompanyIds.size}
      </span>
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Notification Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-blue-700">
          You have 3 communications scheduled for today
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {/* Floating Action Button */}
      {ActionButton}
    </div>
  );
};

export default Overview;
