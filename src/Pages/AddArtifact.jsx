import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { authContext } from "../Firebase/AuthProvider";
import axios from "axios";

const AddArtifact = () => {
  const { user } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "Tools",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artifactData = {
      ...formData,
      addedByName: user?.displayName || "Anonymous",
      addedByEmail: user?.email || "unknown@example.com",
      likeCount: 0,
    };

    try {
      const response = await axios.post("http://localhost:5000/artifacts", artifactData);
      if (response.data.success) {
        Swal.fire("Success!", "Artifact added successfully!", "success");
        setFormData({
          name: "",
          image: "",
          type: "Tools",
          historicalContext: "",
          createdAt: "",
          discoveredAt: "",
          discoveredBy: "",
          presentLocation: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to add artifact.");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Artifact</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Artifact Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="Enter artifact name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Artifact Image (URL)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Artifact Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select select-bordered w-full bg-white"
          >
            <option value="Tools">Tools</option>
            <option value="Weapons">Weapons</option>
            <option value="Documents">Documents</option>
            <option value="Writings">Writings</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Historical Context</label>
          <textarea
            name="historicalContext"
            value={formData.historicalContext}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white"
            placeholder="Provide a brief historical context"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <input
            type="text"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="e.g., 100 BC"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discovered At</label>
          <input
            type="text"
            name="discoveredAt"
            value={formData.discoveredAt}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="e.g., 1799"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discovered By</label>
          <input
            type="text"
            name="discoveredBy"
            value={formData.discoveredBy}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="Enter discoverer's name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Present Location</label>
          <input
            type="text"
            name="presentLocation"
            value={formData.presentLocation}
            onChange={handleChange}
            className="input input-bordered w-full bg-white"
            placeholder="Enter present location"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Added By (Name)</label>
          <input
            type="text"
            value={user?.displayName || "Anonymous"}
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Added By (Email)</label>
          <input
            type="email"
            value={user?.email || "unknown@example.com"}
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
          <div className="flex justify-center items-start gap-2">
            Add Artifact
            <img src="https://i.ibb.co.com/wJyXDWM/icons8-send-to-cloud-24.png" alt="" />
          </div>
        </button>

      </form>
    </div>
  );
};

export default AddArtifact;
