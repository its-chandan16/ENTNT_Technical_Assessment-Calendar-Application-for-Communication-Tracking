import React, { useState, useEffect } from "react";

const AdminCommunicationMethods = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sequence: "",
    mandatory: false,
  });

  const [communicationMethods, setCommunicationMethods] = useState([
    {
      id: 1,
      name: "LinkedIn Post",
      description: "Share updates on company LinkedIn",
      sequence: 1,
      mandatory: true,
    },
    {
      id: 2,
      name: "LinkedIn Message",
      description: "Direct message to company representatives",
      sequence: 2,
      mandatory: true,
    },
    {
      id: 3,
      name: "Email",
      description: "Formal email communication",
      sequence: 3,
      mandatory: true,
    },
    {
      id: 4,
      name: "Phone Call",
      description: "Direct phone communication",
      sequence: 4,
      mandatory: false,
    },
    {
      id: 5,
      name: "Other",
      description: "Any other form of communication",
      sequence: 5,
      mandatory: false,
    },
  ]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen || isDeleteModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAddModalOpen, isEditModalOpen, isDeleteModalOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = Math.max(...communicationMethods.map((m) => m.id)) + 1;
    setCommunicationMethods((prev) => [
      ...prev,
      {
        ...formData,
        id: newId,
        sequence: Number(formData.sequence),
      },
    ]);
    setFormData({
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
    setIsAddModalOpen(false);
  };

  const handleEditClick = (method) => {
    setSelectedMethod(method);
    setFormData(method);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setCommunicationMethods((prev) =>
      prev.map((method) =>
        method.id === selectedMethod.id
          ? { ...formData, sequence: Number(formData.sequence) }
          : method
      )
    );
    setIsEditModalOpen(false);
    setSelectedMethod(null);
    setFormData({
      name: "",
      description: "",
      sequence: "",
      mandatory: false,
    });
  };

  const handleDeleteClick = (method) => {
    setSelectedMethod(method);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCommunicationMethods((prev) =>
      prev.filter((method) => method.id !== selectedMethod.id)
    );
    setIsDeleteModalOpen(false);
    setSelectedMethod(null);
  };

  // Form Modal Component
  const FormModal = ({ isOpen, onClose, onSubmit, title, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"></div>

        <div className="flex items-center justify-center min-h-screen px-4 py-6 sm:p-0">
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all sm:w-full">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>{title}</span>
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={onSubmit} className="p-6 space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Method Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Sequence
                  </label>
                  <input
                    type="number"
                    name="sequence"
                    value={formData.sequence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="mandatory"
                    name="mandatory"
                    checked={formData.mandatory}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="mandatory"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mandatory Method
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transform hover:scale-105"
                >
                  {submitText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteModal = ({ isOpen, onClose, onConfirm, methodName }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"></div>

        <div className="flex items-center justify-center min-h-screen px-4 py-6 sm:p-0">
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl transform transition-all sm:w-full">
            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                Delete Communication Method
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete "{methodName}"? This action
                cannot be undone.
              </p>

              <div className="flex justify-center space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Communication Methods
        </h2>
        <button
          onClick={() => {
            setFormData({
              name: "",
              description: "",
              sequence: "",
              mandatory: false,
            });
            setIsAddModalOpen(true);
          }}
          className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add New Method</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sequence
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {communicationMethods.map((method) => (
              <tr
                key={method.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  {method.sequence}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  {method.name}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  {method.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      method.mandatory
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {method.mandatory ? "Mandatory" : "Optional"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleEditClick(method)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(method)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Form Modal */}
      <FormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        title="Add Communication Method"
        submitText="Add Method"
      />

      {/* Edit Form Modal */}
      <FormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMethod(null);
          setFormData({
            name: "",
            description: "",
            sequence: "",
            mandatory: false,
          });
        }}
        onSubmit={handleEditSubmit}
        title="Edit Communication Method"
        submitText="Save Changes"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMethod(null);
        }}
        onConfirm={handleDeleteConfirm}
        methodName={selectedMethod?.name}
      />
    </div>
  );
};

export default AdminCommunicationMethods;
