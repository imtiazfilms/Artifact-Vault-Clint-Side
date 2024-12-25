import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Artifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtifacts = async () => {
            try {
                const response = await fetch("http://localhost:5000/artifacts");
                const result = await response.json();

                // Adjusting to match the response structure
                if (result.success) {
                    setArtifacts(result.data); // Access "data" key in the response
                } else {
                    console.error("Failed to fetch artifacts:", result.message);
                }
            } catch (error) {
                console.error("Error fetching artifacts:", error);
            }
        };

        fetchArtifacts();
    }, []);

    return (
        <div>
            <h1 className="text-center text-5xl font-serif mb-10 text-gray-800">All Artifacts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artifacts.length > 0 ? (
                    artifacts.map((artifact) => (
                        <div key={artifact._id} className="card shadow-lg p-6 bg-black/20 rounded-lg">
                            <img
                                src={artifact.image}
                                alt={artifact.name}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-2xl font-serif font-semibold text-gray-800">{artifact.name}</h2>
                            <p className="text-base text-gray-700 mt-2 leading-relaxed">
                                {artifact.historicalContext.slice(0, 100)}...
                            </p>
                            <div className="mt-6 flex justify-between items-center">
                                <span className="text-sm text-gray-500">Likes: {artifact.likeCount}</span>
                                <button
                                    onClick={() => navigate(`/artifact/${artifact._id}`)}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-amber-800 via-amber-700 to-amber-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-300 dark:focus:ring-amber-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        View Details
                                        <img className="h-[20px]" src="https://i.ibb.co.com/B4QDVqn/icons8-magnifier-48.png" alt="" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No artifacts found.</p>
                )}
            </div>
        </div>

    );
};

export default Artifacts;
