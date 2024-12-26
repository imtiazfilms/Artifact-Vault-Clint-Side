import { useState, useEffect, useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";

const LikedArtifacts = () => {
  const { user } = useContext(authContext); // Assuming user object contains user information
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      if (!user) return; // Don't fetch if the user is not logged in

      try {
        const response = await fetch("http://localhost:5000/artifacts/liked", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`, // Add token here if using JWT
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch liked artifacts");
        }

        const data = await response.json();
        setLikedArtifacts(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLikedArtifacts();
  }, [user]);

  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
  if (!likedArtifacts.length) return <p className="text-gray-500 text-center mt-10">You haven&#39;t liked any artifacts yet.</p>;

  return (
    <div className="liked-artifacts container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Liked Artifacts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {likedArtifacts.map((artifact) => (
          <div key={artifact.artifactId} className="artifact-card">
            <img src={artifact.artifactImage} alt={artifact.artifactName} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-xl text-gray-800 mt-2">{artifact.artifactName}</h3>
            <p className="text-sm text-gray-500">{artifact.likedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedArtifacts;
