import { useContext, useEffect, useState } from "react";
import { authContext } from "../Firebase/AuthProvider";

const LikedArtifacts = () => {
  const { user } = useContext(authContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      if (!user) return;

      try {
        setLoading(true); // ✅ Start loading
        const response = await fetch(
          `https://artifact-vault-server-side.vercel.app/my-liked-artifacts/${user.email}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch liked artifacts");
        }
        const data = await response.json();
        setLikedArtifacts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    fetchLikedArtifacts();
  }, [user]);

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  if (loading) {
    return (
      // ✅ Spinner UI
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
          <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (likedArtifacts.length === 0) {
    return <p className="text-gray-500 text-center mt-10">No liked artifacts found.</p>;
  }

  return (
    <div className="my-liked-artifacts container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">My Liked Artifacts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {likedArtifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="artifact-card bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-64 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{artifact.name}</h2>
            <p className="text-gray-600 text-sm mb-4">{artifact.historicalContext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedArtifacts;
