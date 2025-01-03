import React, { useState } from "react";

const AdminCompanies = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Innovative Tech Solutions",
      location: "New York, NY",
      emails: ["info@innovativetech.com", "support@innovativetech.com"],
      periodicity: "2 weeks",
      comments: "Leading provider of cloud-based solutions.",
    },
    {
      id: 2,
      name: "NextGen Ventures",
      location: "Berlin, Germany",
      emails: ["contact@nextgenventures.com"],
      periodicity: "1 month",
      comments: "Focus on emerging technologies in Europe.",
    },
  ]);

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, { ...newCompany, id: companies.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleEditCompany = (companyData) => {
    setCompanies(
      companies.map((company) =>
        company.id === editingCompany.id
          ? { ...companyData, id: company.id }
          : company
      )
    );
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleDeleteCompany = (companyId) => {
    setCompanies(companies.filter((company) => company.id !== companyId));
  };

  const openEditModal = (company) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Company Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add New Company
        </button>
      </div>

      <div className="grid gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {company.name}
                </h3>
                <p className="text-gray-600">{company.location}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(company)}
                  className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Contact Details
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    📧 {company.emails.join(", ")}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Communication Settings
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    🔄 Periodicity: {company.periodicity}
                  </p>
                  <p className="text-sm text-gray-600">💭 {company.comments}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CompanyForm
          onClose={handleCloseModal}
          onSubmit={editingCompany ? handleEditCompany : handleAddCompany}
          initialData={editingCompany}
          isEditing={!!editingCompany}
        />
      )}
    </div>
  );
};

const CompanyForm = ({ onClose, onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      location: "",
      emails: [""],
      periodicity: "",
      comments: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {isEditing ? "Edit Company" : "Add New Company"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Addresses
                  </label>
                  {formData.emails.map((email, index) => (
                    <input
                      key={index}
                      type="email"
                      value={email}
                      onChange={(e) =>
                        handleArrayChange(index, "emails", e.target.value)
                      }
                      className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter email address"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField("emails")}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Another Email
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Communication Periodicity
                </label>
                <input
                  type="text"
                  name="periodicity"
                  value={formData.periodicity}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2 weeks, 1 month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add any additional notes or comments..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {isEditing ? "Save Changes" : "Add Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCompanies;
