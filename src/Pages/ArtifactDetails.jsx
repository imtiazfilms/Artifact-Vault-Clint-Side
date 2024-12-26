import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";

const ArtifactDetails = () => {
    const { id } = useParams();
    const { user } = useContext(authContext); // Access the logged-in user's email
    const [artifact, setArtifact] = useState(null);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false); // Track if the artifact is liked by the user

    // Fetch artifact details
    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const response = await fetch(`http://localhost:5000/artifacts/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch artifact");
                }
                const data = await response.json();
                setArtifact(data);

                // Check if the user has liked the artifact
                if (data.userActions && user) {
                    setIsLiked(data.userActions[user.email] === "like");
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchArtifact();
    }, [id, user]);

    // Handle like-dislike toggle
    const handleToggle = async () => {
        if (!artifact || !user) return;

        const updatedLikeCount = isLiked ? artifact.likeCount - 1 : artifact.likeCount + 1;

        // Optimistically update the UI
        setArtifact({ ...artifact, likeCount: updatedLikeCount });
        setIsLiked(!isLiked);

        try {
            const response = await fetch(`http://localhost:5000/artifacts/${id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: user.email, action: isLiked ? "dislike" : "like" }),
            });

            if (!response.ok) {
                console.error("Failed to update like status on the server");
            }
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    // Render error message
    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

    // Render loading message
    if (!artifact) return <p className="text-gray-500 text-center mt-10">Loading artifact details...</p>;

    // Render artifact details
    return (
        <div className="artifact-details container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Artifact Image */}
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={artifact.image}
                        alt={artifact.name}
                        className="w-full h-auto object-contain"
                    />
                </div>

                {/* Artifact Details */}
                <div>
                    <h1 className="text-5xl font-bold mb-4 text-gray-800">{artifact.name}</h1>
                    <p className="text-lg text-gray-700 leading-relaxed">{artifact.historicalContext}</p>
                    <div className="mt-6">
                        <p className="text-sm text-gray-500">
                            <strong>Created At:</strong> {artifact.createdAt}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Discovered At:</strong> {artifact.discoveredAt}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Discovered By:</strong> {artifact.discoveredBy}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Present Location:</strong> {artifact.presentLocation}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Added By:</strong> {artifact.addedByName} ({artifact.addedByEmail})
                        </p>
                    </div>

                    {/* Like/Dislike Button */}
                    <div className="flex items-center mt-6">
                        <p className="text-xl text-gray-700 font-semibold mr-2">
                            Likes: {artifact.likeCount}
                        </p>
                        <button
                            onClick={handleToggle}
                            className="border-2 border-black/20 rounded-full p-1 bg-[#dbca9a98] hover:bg-[#dbca9a] hover:scale-110 transition-all duration-200"
                        >
                            <img
                                src={
                                    isLiked
                                        ? "https://i.ibb.co.com/N7kL8G7/icons8-thumbs-down-50.png"
                                        : "https://i.ibb.co/VQ7htWm/icons8-thumbs-up-50.png"
                                }
                                alt={isLiked ? "Dislike" : "Like"}
                                className="w-6 h-6"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactDetails;
