import Banner from "./Banner";
import ContentCreator from "./ContentCreator";
import Popular from "./Popular";
import Winner from "./Winner";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Popular></Popular>
            <Winner></Winner>
            <ContentCreator></ContentCreator>
        </div>
    );
};

export default Home;