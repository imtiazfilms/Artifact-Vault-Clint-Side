import { useNavigate } from "react-router-dom";

const AddArtifactCTA = () => {
  const navigate = useNavigate();

  const handleAddArtifact = () => {
    navigate("/add-artifact");
  };

  return (
    <section className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 p-8 rounded-lg shadow-lg text-white my-16 w-[90%] mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Want to Share an Artifact?</h2>
      <p className="text-center mb-6 text-white/90">
        Have a historical artifact or interesting piece to showcase? Click below to add it to our collection!
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleAddArtifact}
          className="bg-white text-amber-800 font-semibold px-6 py-2 rounded-md shadow hover:bg-gray-100 transition duration-300"
        >
          Add Artifact Now
        </button>
      </div>
    </section>
  );
};

export default AddArtifactCTA;
