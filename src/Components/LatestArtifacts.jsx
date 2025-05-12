import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LatestArtifacts = () => {
    const [latestArtifacts, setLatestArtifacts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestArtifacts = async () => {
            try {
                const response = await fetch("https://artifact-vault-server-side.vercel.app/latest-artifacts");
                const data = await response.json();

                if (response.ok) {
                    setLatestArtifacts(data.data);
                } else {
                    setError(data.message || "Failed to fetch latest artifacts");
                }
            } catch (error) {
                setError("Error fetching latest artifacts: " + error.message);
            }
        };

        fetchLatestArtifacts();
    }, []);

    if (error) {
        return <p className="text-red-600 text-center mt-10">{error}</p>;
    }

    return (
        <div className="latest-artifacts container mx-auto p-6 mt-5 bg-white/10 shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-base-content	">Latest Artifacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {latestArtifacts.map((artifact) => (
                    <div key={artifact._id} className="artifact-card bg-black/10 p-4 rounded-lg shadow-lg">
                        <img
                            src={artifact.image}
                            alt={artifact.name}
                            className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-2xl font-semibold text-base-content	">{artifact.name}</h3>
                            <p className="text-gray-700 text-sm mt-2">{artifact.shortDescription}</p>
                            <Link
                                to={`/artifact/${artifact._id}`}
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestArtifacts;
