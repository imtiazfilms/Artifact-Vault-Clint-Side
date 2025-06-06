import { useContext, useEffect, useState } from "react";
import { authContext } from "../Firebase/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyArtifacts = () => {
  const { user } = useContext(authContext);
  const [artifacts, setArtifacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    if (!user) return;

    const fetchUserArtifacts = async () => {
      try {
        setLoading(true); // ✅ Start loading
        const response = await fetch(
          `https://artifact-vault-server-side.vercel.app/my-artifacts/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch artifacts");
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          setArtifacts(data.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // ✅ End loading
      }
    };

    fetchUserArtifacts();
  }, [user]);

  const handleDelete = async (artifactId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the artifact.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://artifact-vault-server-side.vercel.app/artifacts/${artifactId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete artifact");
          }

          setArtifacts(artifacts.filter((artifact) => artifact._id !== artifactId));

          Swal.fire("Deleted!", "The artifact has been deleted.", "success");
        } catch (err) {
          setError(err.message);
          Swal.fire("Error", "Failed to delete the artifact.", "error");
        }
      }
    });
  };

  if (error) return <p className="text-red-600 text-center mt-10">Error: {error}</p>;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!artifacts.length) {
    return <p className="text-center text-gray-500 mt-10">You have not added any artifacts yet.</p>;
  }

  return (
    <div className="my-artifacts container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Artifacts</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <li
            key={artifact._id}
            className="artifact-card bg-white/50 shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={artifact.image || "https://via.placeholder.com/300"}
              alt={artifact.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-700">{artifact.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{artifact.historicalContext}</p>
              <div className="mt-4 flex justify-between">
                <Link to={`/update/${artifact._id}`}>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700">
                    Update
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow hover:from-red-600 hover:to-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyArtifacts;
