import React from "react";

// Sample data - you might want to move this to a shared data file
const companies = [
  {
    id: 1,
    name: "TechCorp Inc",
    nextCommunication: "Today",
  },
  {
    id: 2,
    name: "Global Solutions Ltd",
    nextCommunication: "Today",
  },
];

const Tasks = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">Today's Tasks</h2>
      <div className="space-y-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="p-4 bg-gray-50 rounded hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{company.name}</h3>
                <p className="text-sm text-gray-600">
                  Next communication due: {company.nextCommunication}
                </p>
              </div>
              <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Complete
              </button>
            </div>
          </div>
        ))}
        {companies.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No tasks scheduled for today
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
