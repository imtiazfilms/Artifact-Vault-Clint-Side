/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const UpdateArtifact = () => {
  const { id } = useParams();

  const [artifact, setArtifact] = useState({
    name: "",
    image: "",
    type: "",
    historicalContext: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await fetch(`https://artifact-vault-server-side.vercel.app/artifacts/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch artifact details. Status: ${response.status}`);
        }
        const data = await response.json();
        setArtifact(data);
      } catch (err) {
        setError("Failed to load artifact details.");
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to load artifact details.",
        });
      }
    };

    fetchArtifact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtifact((prevArtifact) => ({
      ...prevArtifact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Show loading message while updating
      Swal.fire({
        title: "Updating artifact...",
        text: "Please wait while we update the artifact.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(`https://artifact-vault-server-side.vercel.app/artifacts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(artifact),
      });

      if (!response.ok) {
        throw new Error(`Failed to update artifact. Status: ${response.status}`);
      }

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Artifact Updated!",
        text: "The artifact has been successfully updated.",
      });
    } catch (err) {
      // Error alert
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: `An error occurred: ${err.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-base-content">Update Artifact</h1>

      {/* Show error message if there's an error */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="name" className="block text-base-content">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={artifact.name}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="image" className="block text-base-content">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={artifact.image}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="type" className="block text-base-content">Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={artifact.type}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="historicalContext" className="block text-base-content">Historical Context</label>
            <textarea
              id="historicalContext"
              name="historicalContext"
              value={artifact.historicalContext}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="createdAt" className="block text-base-content">Created At</label>
            <input
              type="text"
              id="createdAt"
              name="createdAt"
              value={artifact.createdAt}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="discoveredAt" className="block text-base-content">Discovered At</label>
            <input
              type="text"
              id="discoveredAt"
              name="discoveredAt"
              value={artifact.discoveredAt}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="discoveredBy" className="block text-base-content">Discovered By</label>
            <input
              type="text"
              id="discoveredBy"
              name="discoveredBy"
              value={artifact.discoveredBy}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="presentLocation" className="block text-base-content">Present Location</label>
            <input
              type="text"
              id="presentLocation"
              name="presentLocation"
              value={artifact.presentLocation}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Artifact"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArtifact;
