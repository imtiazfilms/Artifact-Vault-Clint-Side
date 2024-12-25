import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArtifactDetails = () => {
    const { id } = useParams();
    const [artifact, setArtifact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const response = await fetch(`http://localhost:5000/artifacts/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch artifact");
                }
                const data = await response.json();
                setArtifact(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchArtifact();
    }, [id]);

    const handleLike = async () => {
        if (!artifact) return;

        // Optimistically update the like count in the local state
        const updatedArtifact = { ...artifact, likeCount: artifact.likeCount + 1 };
        setArtifact(updatedArtifact);

        try {
            const response = await fetch(`http://localhost:5000/artifacts/${id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                // Update the artifact state only if the server response is successful
                if (result.success && result.data) {
                    setArtifact(result.data); // Update with the latest like count from the server
                } else {
                    console.error("Failed to update likes on the server");
                }
            } else {
                console.error("Failed to update likes");
            }
        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };




    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
    if (!artifact) return <p className="text-gray-500 text-center mt-10">Artifact not found</p>;

    return (
        <div className="artifact-details container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img
                        src={artifact.image}
                        alt={artifact.name}
                        className="w-full h-auto object-contain"
                    />
                </div>
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
                    <div className="flex items-center mt-6">
                        <p className="text-xl text-gray-700 font-semibold mr-4">
                            Likes: {artifact.likeCount}
                        </p>
                        <button
                            onClick={handleLike}
                            className="w-[40px] border-2 border-black/80 rounded-full p-1 bg-[#dbca9a98] hover:bg-[#dbca9a] hover:scale-110 transition-all duration-200">
                            <img src="https://i.ibb.co.com/VQ7htWm/icons8-thumbs-up-50.png" alt="" />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactDetails;
