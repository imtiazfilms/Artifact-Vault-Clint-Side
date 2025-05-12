import AddArtifactCTA from "../Components/AddArtifactCTA";
import FAQ from "../Components/FAQ";
import FeaturedArtifacts from "../Components/FeaturedArtifacts";
import HistoryTimeline from "../Components/HistoryTimeline";
import LatestArtifacts from "../Components/LatestArtifacts";
import Newsletter from "../Components/Newsletter";
import Slider from "../Components/Slider";


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <FeaturedArtifacts></FeaturedArtifacts>
            <LatestArtifacts></LatestArtifacts>
            <AddArtifactCTA></AddArtifactCTA>
            <HistoryTimeline></HistoryTimeline>
            <FAQ></FAQ>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;