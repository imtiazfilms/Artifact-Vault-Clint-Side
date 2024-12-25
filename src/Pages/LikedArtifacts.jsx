import { useState, useEffect } from "react";

const LikedArtifacts = () => {
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      try {
        const userId = "USER_ID"; // Replace with dynamic user ID (could come from authentication)
        const response = await fetch(`http://localhost:5000/users/${userId}/liked-artifacts`);

        if (!response.ok) {
          throw new Error("No liked artifacts found");
        }

        const data = await response.json();
        setLikedArtifacts(data.data); // Store liked artifacts in the state
      } catch (error) {
        setError(error.message); // Set error if fetching fails
      }
    };

    fetchLikedArtifacts();
  }, []); // Empty dependency array to only fetch once

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (likedArtifacts.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-500">You have not liked any artifacts yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-5">
      <h1 className="text-3xl font-bold mb-4">Liked Artifacts</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {likedArtifacts.map((artifact) => (
          <div key={artifact._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{artifact.name}</h2>
            <p className="text-sm text-gray-500">{artifact.historicalContext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedArtifacts;
