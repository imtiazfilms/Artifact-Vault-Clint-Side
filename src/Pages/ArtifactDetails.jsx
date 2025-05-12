import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../Firebase/AuthProvider";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const ArtifactDetails = () => {
    const { id } = useParams();
    const { user } = useContext(authContext);
    const [artifact, setArtifact] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const response = await fetch(`https://artifact-vault-server-side.vercel.app/artifacts/${id}`);
                if (!response.ok) throw new Error("Failed to fetch artifact");

                const data = await response.json();
                setArtifact(data);

                if (data.userActions && user) {
                    setIsLiked(data.userActions[user.email] === "like");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops!",
                    text: error.message,
                });
            }
        };

        fetchArtifact();
    }, [id, user]);

    const handleToggle = async () => {
        if (!artifact) return;

        if (!user) {
            return Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please log in to like or dislike this artifact.",
            });
        }

        const updatedLikeCount = isLiked ? artifact.likeCount - 1 : artifact.likeCount + 1;

        setArtifact({ ...artifact, likeCount: updatedLikeCount });
        setIsLiked(!isLiked);

        try {
            const response = await fetch(`https://artifact-vault-server-side.vercel.app/artifacts/${id}/like`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: user.email, action: isLiked ? "dislike" : "like" }),
            });

            if (!response.ok) {
                throw new Error("Failed to update like status on the server");
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Like Update Failed",
                text: error.message,
            });
        }
    };

    if (!artifact) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-green-50">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-12 h-12 border-4 border-t-transparent border-green-400 rounded-full animate-spin"></div>
                    <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
            </div>
        );
    }

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
                    <h1 className="text-5xl font-bold mb-4 text-base-content">{artifact.name}</h1>
                    <p className="text-lg text-base-content leading-relaxed">{artifact.historicalContext}</p>
                    <div className="mt-6">
                        <p className="text-sm text-base-content/70">
                            <strong>Created At:</strong> {artifact.createdAt}
                        </p>
                        <p className="text-sm text-base-content/70">
                            <strong>Discovered At:</strong> {artifact.discoveredAt}
                        </p>
                        <p className="text-sm text-base-content/70">
                            <strong>Discovered By:</strong> {artifact.discoveredBy}
                        </p>
                        <p className="text-sm text-base-content/70">
                            <strong>Present Location:</strong> {artifact.presentLocation}
                        </p>
                        <p className="text-sm text-base-content/70">
                            <strong>Added By:</strong> {artifact.addedByName} ({artifact.addedByEmail})
                        </p>
                    </div>

                    <div className="flex items-center mt-6">
                        <p className="text-xl text-base-content font-semibold mr-2">
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
