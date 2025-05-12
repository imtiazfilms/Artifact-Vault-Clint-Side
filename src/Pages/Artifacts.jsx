import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchArtifacts = async (search = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://artifact-vault-server-side.vercel.app/artifacts?search=${search}`
      );
      const result = await response.json();

      if (result.success) {
        setArtifacts(result.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Fetch Failed",
          text: result.message || "Failed to fetch artifacts.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);
    fetchArtifacts(searchQuery);
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-serif mb-10 text-base-content">
        All Artifacts
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Artifact Name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-gray-600"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.length > 0 ? (
            artifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="card shadow-lg p-6 bg-black/20 rounded-lg"
              >
                <img
                  src={artifact.image}
                  alt={artifact.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-serif font-semibold text-base-content">
                  {artifact.name}
                </h2>
                <p className="text-base text-base-content mt-2 leading-relaxed">
                  {artifact.historicalContext.slice(0, 100)}...
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-sm text-base-content/70 font-bold">
                    Likes: {artifact.likeCount}
                  </span>
                  <button
                    onClick={() => navigate(`/artifact/${artifact._id}`)}
                    type="button"
                    className="text-white bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <div className="flex justify-center items-center gap-1">
                      View Details
                      <img
                        className="h-[20px]"
                        src="https://i.ibb.co.com/Lv7FSb3/icons8-file-preview-50-1.png"
                        alt="details logo"
                      />
                    </div>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-base-content">No artifacts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Artifacts;
