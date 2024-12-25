import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";

const ArtifactDetails = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not logged in
      return;
    }

    const fetchArtifact = async () => {
      try {
        const response = await fetch(`http://localhost:5000/artifacts/${id}`);
        const data = await response.json();
        setArtifact(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artifact:", error);
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [id, user, navigate]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
      <img
        src={artifact.image}
        alt={artifact.name}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{artifact.name}</h1>
      <p className="text-gray-700 mt-2">{artifact.historicalContext}</p>
      <p className="text-sm text-gray-500 mt-2">Created At: {artifact.createdAt}</p>
      <p className="text-sm text-gray-500">Discovered At: {artifact.discoveredAt}</p>
      <p className="text-sm text-gray-500">Discovered By: {artifact.discoveredBy}</p>
      <p className="text-sm text-gray-500">Present Location: {artifact.presentLocation}</p>
      <p className="text-sm text-gray-500">Likes: {artifact.likeCount}</p>
      <button
        className="btn btn-secondary mt-4"
        onClick={() => alert("Like functionality not implemented yet.")}
      >
        Like
      </button>
    </div>
  );
};

export default ArtifactDetails;
