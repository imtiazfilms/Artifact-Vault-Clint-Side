import { useEffect, useState, useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";
import { useNavigate } from "react-router-dom";


const LikedArtifacts = () => {
    const { user } = useContext(authContext);
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchLikedArtifacts = async () => {
            if (!user) return;

            try {
                const response = await fetch(`http://localhost:5000/my-liked-artifacts/${user.email}`);
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

    if (likedArtifacts.length === 0) return <p className="text-gray-500 text-center mt-10">No liked artifacts found.</p>;

    return (
        <div className="my-liked-artifacts container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">My Liked Artifacts</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {likedArtifacts.map(artifact => (
                    <div key={artifact._id} className="artifact-card bg-white/40 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <img src={artifact.image} alt={artifact.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{artifact.name}</h2>
                        <p className="text-gray-600 text-sm mb-4">{artifact.historicalContext}</p>
                        <div className="text-center">
                            <button
                                onClick={() => navigate(`/artifact/${artifact._id}`)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikedArtifacts;
