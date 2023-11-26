import Banner from "./Banner";
import ContentCreator from "./ContentCreator";
import Popular from "./Popular";
import Winner from "./Winner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Popular></Popular>
            <Winner></Winner>
            <ContentCreator></ContentCreator>
        </div>
    );
};

export default Home;