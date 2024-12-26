import FAQ from "../Components/FAQ";
import FeaturedArtifacts from "../Components/FeaturedArtifacts";
import LatestArtifacts from "../Components/LatestArtifacts";
import Slider from "../Components/Slider";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturedArtifacts></FeaturedArtifacts>
            <LatestArtifacts></LatestArtifacts>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;